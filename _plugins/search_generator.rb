require 'json'
require 'fileutils'

module Jekyll
  class SearchIndexGenerator < Generator
    safe true
    priority :low

    def generate(site)
      json = []
      site.pages.each do |page|
        # Skip unwanted files
        next if page.path.start_with?('_')
        next if page.path.end_with?('.xml')
        next if page.data['search'] == false

        # Title: front matter se, warna filename se
        raw_title = page.data['title'] || page.name.gsub('.html', '')
        title = raw_title.to_s.strip
        title = title.split(/[-_]/).map(&:capitalize).join(' ') if title.match?(/[-_]/)

        # Body: first 200 chars, HTML tags hata ke
        body = page.content.gsub(/<[^>]*>/, '').gsub(/\s+/, ' ').strip
        body = body[0..200] + (body.length > 200 ? '...' : '')

        json << {
          url: page.url,
          title: title.empty? ? 'Untitled' : title,
          body: body
        }
      end

      # Write file
      file_path = File.join(site.dest, 'search-index.json')
      FileUtils.mkdir_p(File.dirname(file_path))
      File.write(file_path, JSON.pretty_generate(json))
    end
  end
end
