module Jekyll
  class SearchIndexGenerator < Generator
    safe true
    priority :low

    def generate(site)
      json = []
      site.pages.each do |page|
        next if page.path.start_with?('_') || page.path.end_with?('.xml')
        next if page.data['search'] == false

        title = page.data['title'] || page.name.gsub(/[-_]/, ' ').gsub('.html', '').capitalize
        body = page.content.strip[0..200] rescue ""

        json << {
          url: page.url,
          title: title,
          body: body
        }
      end

      file_path = File.join(site.dest, 'search-index.json')
      File.write(file_path, JSON.pretty_generate(json))
    end
  end
end
