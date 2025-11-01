require 'json'  # <-- YEH LINE ADD KARNA ZAROORI HAI!

module Jekyll
  class SearchIndexGenerator < Generator
    safe true
    priority :low

    def generate(site)
      json = []
      site.pages.each do |page|
        # Skip layout files, XML, and hidden
        next if page.path.start_with?('_')
        next if page.path.end_with?('.xml')
        next if page.data['search'] == false

        # Title: from front matter, else from filename
        title = page.data['title']
        title ||= page.name
                  .gsub('.html', '')
                  .gsub(/[-_]/, ' ')
                  .split
                  .map(&:capitalize)
                  .join(' ')

        # Body: first 200 chars of content
        body = page.content.gsub(/<[^>]*>/, '').strip[0..200] rescue ""

        json << {
          url: page.url,
          title: title.strip,
          body: body
        }
      end

      # Write search-index.json in _site
      file_path = File.join(site.dest, 'search-index.json')
      FileUtils.mkdir_p(File.dirname(file_path))
      File.write(file_path, JSON.pretty_generate(json))
    end
  end
end
