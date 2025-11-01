require 'json'
require 'fileutils'

module Jekyll
  class SearchIndexGenerator < Generator
    safe true
    priority :low

    def generate(site)
      json = []
      
      # 1. Jekyll pages scan kar
      site.pages.each do |page|
        next if page.path.start_with?('_')
        next if page.path.end_with?('.xml')
        next if page.data && page.data['search_exclude']

        raw_title = page.data['title'] || page.basename.to_s
        title = raw_title.to_s.gsub(/[-_]/, ' ').split.map(&:capitalize).join(' ')
        title = title.sub('.html', '').strip

        content = page.content.to_s.gsub(/<[^>]*>/, '').gsub(/\s+/, ' ').strip
        body = content[0..200] + (content.length > 200 ? '...' : '')

        json << {
          url: page.url,
          title: title.empty? ? 'Untitled Page' : title,
          body: body
        }
      end

      # 2. Static files scan kar (custom .html files ke liye)
      site.static_files.each do |file|
        next if file.path.start_with?('_')
        next if file.path.end_with?('.xml', '.json', '.css', '.js', '.png', '.jpg')
        next if file.path.include?('/assets/')

        title = File.basename(file.path, '.*').gsub(/[-_]/, ' ').split.map(&:capitalize).join(' ')
        body = 'Static page content'  # Fallback, as static files have no content

        json << {
          url: '/' + file.path,
          title: title,
          body: body
        }
      end

      # Duplicate URLs remove kar
      json = json.uniq { |item| item[:url] }

      # Write JSON file
      file_path = File.join(site.dest, 'search-index.json')
      FileUtils.mkdir_p(File.dirname(file_path))
      File.write(file_path, JSON.pretty_generate(json))
      
      puts "Search index generated with #{json.length} pages"  # Debug log
    end
  end
end
