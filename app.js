const toolsGrid = document.getElementById('toolsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

function renderCards(tools) {
  if (tools.length === 0) {
    toolsGrid.innerHTML = `<p class="text-slate-400 col-span-full text-center py-10">Ничего не найдено</p>`;
    return;
  }

  toolsGrid.innerHTML = tools.map(tool => `
    <div class="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 flex flex-col justify-between hover:border-slate-500 transition-colors">
      <div>
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-semibold text-white">${tool.name}</h3>
        </div>
        <p class="text-slate-400 text-sm mb-4 leading-relaxed">${tool.description}</p>
      </div>
      <div>
        <div class="flex flex-wrap gap-1.5 mb-4">
          ${tool.tags.map(tag => `<span class="bg-slate-700/50 text-slate-300 text-xs px-2 py-0.5 rounded">${tag}</span>`).join('')}
        </div>
        <a 
          href="${tool.url}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="block text-center w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          Перейти на сайт
        </a>
      </div>
    </div>
  `).join('');
}

function filterTools() {
  const query = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;

  const filtered = toolsData.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(query) || 
                          tool.description.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || tool.category === category;
    return matchesSearch && matchesCategory;
  });

  renderCards(filtered);
}

searchInput.addEventListener('input', filterTools);
categoryFilter.addEventListener('change', filterTools);

// Первичный рендер
renderCards(toolsData);
