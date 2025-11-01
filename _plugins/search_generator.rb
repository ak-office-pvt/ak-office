require 'json'
require 'fileutils'

module Jekyll
  class SearchIndexGenerator < Generator
    safe true
    priority :low

    def generate(site)
      json = []
      
      # Saare pages scan kar (including .html files)
      site.pages.each do |page|
        # Skip hidden, layouts, XML
        next if page.path.start_with?('_')
        next if page.path.end_with?('.xml', '.md') && !page.output_ext == '.html'
        next if page.data['search_exclude'] == true

        # Title: front matter se, warna filename se
        raw_title = page.data['title'] || page.basename
        title = raw_title.to_s.strip
        if title.empty?
          title = page.basename.to_s.gsub(/[-_]/, ' ').split.map(&:capitalize).join(' ')
        end

        # Body: content se first 200 chars (HTML tags hata ke)
        content = page.content.to_s.gsub(/<[^>]*>/, '').gsub(/\s+/, ' ').strip
        body = content[0..200] + (content.length > 200 ? '...' : '')

        json << {
          url: page.url,
          title: title,
          body: body
        }
      end

      # Write JSON file in _site
      file_path = File.join(site.dest, 'search-index.json')
      FileUtils.mkdir_p(File.dirname(file_path))
      File.write(file_path, JSON.pretty_generate(json))
      
      puts "Generated search index with #{json.length} pages"  # Debug log
    end
  end
end
