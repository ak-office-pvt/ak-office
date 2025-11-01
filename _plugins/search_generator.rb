require 'json'
require 'fileutils'

module Jekyll
  class SearchIndexGenerator < Generator
    safe true
    priority :low

    def generate(site)
      json = []

      # Scan all pages and static files
      (site.pages + site.static_files).each do |item|
        next if item.path.start_with?('_')
        next if item.path.end_with?('.xml', '.json', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif')
        next if item.path.include?('/assets/')
        next if item.kind_of?(Jekyll::StaticFile) && !item.path.end_with?('.html')

        url = item.respond_to?(:url) ? item.url : '/' + item.path
        url = url.gsub(/index\.html$/, '') # Remove index.html
        url = '/' if url.empty?

        title = 'Untitled'
        if item.respond_to?(:data) && item.data && item.data['title']
          title = item.data['title'].to_s.strip
        else
          title = File.basename(item.path, '.*')
                     .gsub(/[-_]/, ' ')
                     .split
                     .map(&:capitalize)
                     .join(' ')
        end

        body = ''
        if item.respond_to?(:content)
          body = item.content.to_s.gsub(/<[^>]*>/, '').gsub(/\s+/, ' ').strip
          body = body[0..200] + (body.length > 200 ? '...' : '')
        end

        json << { url: url, title: title, body: body }
      end

      # Remove duplicates
      json = json.uniq { |i| i[:url] }

      # Write file
      file_path = File.join(site.dest, 'search-index.json')
      FileUtils.mkdir_p(File.dirname(file_path))
      File.write(file_path, JSON.pretty_generate(json))

      puts "SEARCH INDEX: Generated with #{json.length} entries"
    end
  end
end
