// AUTO SCAN PAGES + DESCRIPTION
const searchData = [
  {% for page in site.pages %}
    {% if page.path contains '.html' and page.path != 'search.html' %}
    {
      "url": "{{ page.url | relative_url }}",
      "title": "{{ page.title | default: page.name | remove: '.html' | replace: '-', ' ' | replace: '_', ' ' | split: '/' | last | capitalize }}",
      "desc": "{{ page.description | default: '' | escape }}",
      "image": "{{ page.og_image | default: page.image | default: site.og_image | default: '/assets/img/ak-logo.png' }}"
    }{% unless forloop.last %},{% endunless %}
    {% endif %}
  {% endfor %}
];

let idx;
if (searchData.length > 0) {
  idx = lunr(function () {
    this.ref('url');
    this.field('title');
    this.field('desc');
    searchData.forEach(d => this.add(d));
  });
  document.getElementById('search-status').innerHTML = 
    `<span class="text-success" style="font-family: 'Mulish', sans-serif; font-weight: 700;">Ready! ${searchData.length} pages indexed.</span>`;
}

document.getElementById('search-input').addEventListener('input', function() {
  const q = this.value.trim().toLowerCase();
  const el = document.getElementById('search-results');
  if (!q || !idx) { el.innerHTML = ''; return; }

  const res = idx.search(q + '*');
  if (res.length === 0) {
    el.innerHTML = `<div class="col-12 text-center py-5"><p class="text-muted h5">No results for "<strong style='color:#FFD700'>${q}</strong>"</p></div>`;
    return;
  }

  el.innerHTML = res.map(r => {
    const d = searchData.find(x => x.url === r.ref);
    
    // Title: 6-7 words
    const titleWords = d.title.split(' ').slice(0, 10).join(' ');
    const shortTitle = d.title.split(' ').length > 10 ? titleWords + '...' : titleWords;
    
    // Desc: 10-11 words
    const descWords = (d.desc || 'No description available.').split(' ').slice(0, 15).join(' ');
    const shortDesc = (d.desc || 'No description available.').split(' ').length > 15 ? descWords + '...' : descWords;

    return `
      <div class="col-12 mb-4">
        <div class="result-box d-flex flex-row align-items-stretch" 
             style="background: #1e1e1e; border-radius: 16px; overflow: hidden; border: 1px solid #000; transition: all 0.3s; min-height: 160px;">
          
          <!-- LEFT: OG Image -->
          <div class="flex-shrink-0" style="width: 30%; min-width: 120px;">
            <img src="${d.image}" class="w-100 h-100" alt="${d.title}" 
                 style="object-fit: cover; display: block;">
          </div>
          
          <!-- RIGHT: Content -->
          <div class="p-3 d-flex flex-column flex-grow-1" style="background: #2d2d2d; width: 70%;">
            <!-- Title -->
            <h5 class="text-white mb-1 title-hover" style="font-family: 'Mulish', sans-serif; font-weight: 700; font-size: 1rem; line-height: 1.3;">
              <a href="${d.url}" class="text-decoration-none stretched-link">${shortTitle}</a>
            </h5>
            
            <!-- URL -->
            <p class="text-warning small mb-1 url-hover" style="font-size: 0.8rem;">
              <i class="fa fa-link"></i> ${d.url}
            </p>
            
            <!-- Description -->
            <p class="text-light small flex-grow-1" style="font-style: italic; line-height: 1.4; font-size: 0.85rem; margin-bottom: 0;">
              ${shortDesc}
            </p>
          </div>
        </div>
      </div>
    `;
  }).join('');
});
