const officialModels = [
  {
    id: 'minimax-m25',
    name: 'MiniMax M2.5',
    subtitle: '效果成本兼顾',
    badge: '推荐',
    inputPrice: 1401,
    outputPrice: 5618,
    icon: 'minimax',
    selected: false,
  },
  {
    id: 'glm-47',
    name: 'GLM-4.7',
    subtitle: '效果成本兼顾',
    badge: '推荐',
    inputPrice: 1333,
    outputPrice: 5348,
    icon: 'glm',
    selected: false,
  },
  {
    id: 'kimi-k25',
    name: 'Kimi K2.5',
    subtitle: '效果最好',
    badge: '',
    inputPrice: 2375,
    outputPrice: 12500,
    icon: 'kimi',
    selected: false,
  },
  {
    id: 'deepseek-v32',
    name: 'DeepSeek-V3.2',
    subtitle: '性价比最高',
    badge: '',
    inputPrice: 934,
    outputPrice: 1401,
    icon: 'deepseek',
    selected: false,
  },
];

function getIconSvg(icon) {
  const icons = {
    minimax: `<svg class="w-8 h-8" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="#FF4D4F" opacity="0.1"/><path d="M10 20c1-4 3-8 6-8s5 4 6 8" stroke="#FF4D4F" stroke-width="2.5" stroke-linecap="round"/><circle cx="12" cy="14" r="1.5" fill="#FF4D4F"/><circle cx="20" cy="14" r="1.5" fill="#FF4D4F"/></svg>`,
    glm: `<svg class="w-8 h-8" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="#4F8EF7" opacity="0.1"/><path d="M11 16a5 5 0 0110 0" stroke="#4F8EF7" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="12" r="3" stroke="#4F8EF7" stroke-width="2"/></svg>`,
    kimi: `<svg class="w-8 h-8" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="#1A1A2E" opacity="0.08"/><text x="16" y="21" text-anchor="middle" font-size="16" font-weight="bold" fill="#1A1A2E">K</text></svg>`,
    deepseek: `<svg class="w-8 h-8" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="#4C9AFF" opacity="0.1"/><path d="M10 18c2-3 4-6 6-6s4 3 6 6" stroke="#4C9AFF" stroke-width="2" stroke-linecap="round"/><path d="M12 14l4-4 4 4" stroke="#4C9AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  };
  return icons[icon] || icons.deepseek;
}

function getSelectedModel() {
  try {
    return localStorage.getItem('fm_selected_model') || '';
  } catch { return ''; }
}

function setSelectedModel(id) {
  localStorage.setItem('fm_selected_model', id);
}

export function renderOfficialModels() {
  const grid = document.getElementById('official-models-grid');
  if (!grid) return;

  const selected = getSelectedModel();

  grid.innerHTML = officialModels.map(m => `
    <div class="model-card bg-white border ${selected === m.id ? 'border-blue-400 ring-1 ring-blue-100' : 'border-slate-200'} rounded-xl p-5 shadow-sm cursor-pointer transition-all hover:shadow-md"
         data-model="${m.id}">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          ${getIconSvg(m.icon)}
          <div>
            <p class="font-bold text-base text-slate-900">${m.name}</p>
            <p class="text-xs text-slate-400">${m.subtitle}</p>
          </div>
        </div>
        ${m.badge ? `<span class="text-xs px-2 py-0.5 rounded-full border border-green-200 bg-green-50 text-green-600 font-medium">${m.badge}</span>` : ''}
      </div>
      <div class="flex items-center justify-between pt-3 border-t border-slate-100">
        <div class="text-center flex-1">
          <p class="text-xs text-slate-400 mb-0.5">输入</p>
          <p class="text-sm font-semibold text-slate-700">&#x2662; ${m.inputPrice}</p>
          <p class="text-xs text-slate-400">/每百万tokens</p>
        </div>
        <div class="w-px h-8 bg-slate-100"></div>
        <div class="text-center flex-1">
          <p class="text-xs text-slate-400 mb-0.5">输出</p>
          <p class="text-sm font-semibold text-slate-700">&#x2662; ${m.outputPrice}</p>
          <p class="text-xs text-slate-400">/每百万tokens</p>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.model-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-model');
      setSelectedModel(id);
      renderOfficialModels();
    });
  });
}

function setupApiKeyToggle() {
  const btn = document.getElementById('toggle-api-key');
  const input = document.getElementById('custom-api-key');
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    btn.querySelector('.eye-off').classList.toggle('hidden', isHidden);
    btn.querySelector('.eye-on').classList.toggle('hidden', !isHidden);
  });
}

function setupTestConnection() {
  const btn = document.getElementById('test-connection-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const key = document.getElementById('custom-api-key')?.value?.trim();
    const url = document.getElementById('custom-api-url')?.value?.trim();
    const name = document.getElementById('custom-model-name')?.value?.trim();
    const modelId = document.getElementById('custom-model-id')?.value?.trim();
    const result = document.getElementById('test-connection-result');

    if (!key || !url || !modelId) {
      result.textContent = '请填写完整信息';
      result.className = 'ml-3 text-sm text-rose-500';
      result.classList.remove('hidden');
      return;
    }

    btn.disabled = true;
    btn.textContent = '测试中...';
    result.classList.add('hidden');

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = '测试连接';
      result.textContent = '连接成功';
      result.className = 'ml-3 text-sm text-green-600';
      result.classList.remove('hidden');

      localStorage.setItem('fm_custom_model', JSON.stringify({ key, url, name, modelId }));
    }, 1500);
  });
}

export function initModels() {
  renderOfficialModels();
  setupApiKeyToggle();
  setupTestConnection();
}
