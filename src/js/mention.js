const mentionData = {
  达人: [
    { name: 'BASED', meta: '粉丝数: 2.7m', avatar: 'B' },
    { name: 'quinclips3', meta: '粉丝数: 81.1k', avatar: 'Q' },
    { name: 'Susan Luckhardt', meta: '粉丝数: 208.0k', avatar: 'S' },
    { name: 'Josh Morris', meta: '粉丝数: 247.9k', avatar: 'J' },
    { name: 'yazzy.fashion7', meta: '粉丝数: 49.3k', avatar: 'Y' },
    { name: 'Micro Ingredients', meta: '粉丝数: 156.2k', avatar: 'M' },
    { name: 'glowupwithava', meta: '粉丝数: 1.2m', avatar: 'G' },
    { name: 'beautybykim_', meta: '粉丝数: 523.4k', avatar: 'B' },
  ],
  店铺: [
    { name: 'Tarte Cosmetics', meta: '月销: 12.3k单 · 美妆', avatar: 'T' },
    { name: 'SHEGLAM Official', meta: '月销: 45.6k单 · 美妆', avatar: 'S' },
    { name: 'Halara Official', meta: '月销: 28.1k单 · 服饰', avatar: 'H' },
    { name: 'OQQ Official Store', meta: '月销: 15.7k单 · 服饰', avatar: 'O' },
    { name: 'Anker Official', meta: '月销: 8.9k单 · 3C', avatar: 'A' },
    { name: 'GymShark', meta: '月销: 33.2k单 · 运动', avatar: 'G' },
  ],
  商品: [
    { name: 'Juicy Lip Gloss Set', meta: '销量: 89.2k · $12.99', avatar: '🛍' },
    { name: 'Viral Cloud Cream', meta: '销量: 156.3k · $24.99', avatar: '🛍' },
    { name: 'LED Face Mask Pro', meta: '销量: 42.1k · $39.99', avatar: '🛍' },
    { name: 'Snail Mucin Serum', meta: '销量: 234.5k · $15.99', avatar: '🛍' },
    { name: 'Scalp Massager Brush', meta: '销量: 178.9k · $8.99', avatar: '🛍' },
  ],
  视频: [
    { name: 'Get Ready With Me — Full Routine', meta: '播放: 12.5m · 3天前', avatar: '▶' },
    { name: 'POV: Finding the perfect concealer', meta: '播放: 8.3m · 5天前', avatar: '▶' },
    { name: 'Unboxing $500 Beauty Haul', meta: '播放: 5.1m · 1周前', avatar: '▶' },
    { name: 'TikTok made me buy it — March', meta: '播放: 23.4m · 2天前', avatar: '▶' },
  ],
  直播: [
    { name: 'SHEGLAM春季美妆直播', meta: '观众: 15.2k · 直播中', avatar: '🔴' },
    { name: '美区爆款好物开箱专场', meta: '观众: 8.7k · 直播中', avatar: '🔴' },
    { name: 'Halara新品首发直播', meta: '预约: 3.2k · 今晚 20:00', avatar: '📅' },
  ],
  广告: [
    { name: 'Tarte Juicy Lip — Spark Ad', meta: '花费: $12.5k · CTR: 3.2%', avatar: '📣' },
    { name: 'SHEGLAM Color Bloom — TopView', meta: '花费: $45.0k · CTR: 5.1%', avatar: '📣' },
    { name: 'Halara Legging — In-Feed', meta: '花费: $8.3k · CTR: 2.8%', avatar: '📣' },
    { name: 'Snail Mucin — Shop Ad', meta: '花费: $6.1k · ROAS: 4.2x', avatar: '📣' },
  ],
};

let currentType = '达人';
let onSelect = null;

function renderMentionList(filter = '') {
  const list = document.getElementById('mention-list');
  if (!list) return;

  const items = mentionData[currentType] || [];
  const query = filter.toLowerCase();
  const filtered = query
    ? items.filter(i => i.name.toLowerCase().includes(query) || i.meta.toLowerCase().includes(query))
    : items;

  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="text-center py-10 text-slate-400">
        <svg class="h-10 w-10 mx-auto mb-3 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <p class="text-sm">未找到匹配的${currentType}，请尝试其他关键词</p>
      </div>`;
    return;
  }

  list.innerHTML = filtered.map(item => `
    <div class="mention-item" data-mention-name="${item.name}">
      <div class="mention-avatar">${item.avatar}</div>
      <div class="mention-info">
        <div class="mention-name">${item.name}</div>
        <div class="mention-meta">${item.meta}</div>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.mention-item').forEach(el => {
    el.addEventListener('click', () => {
      const name = el.getAttribute('data-mention-name');
      if (onSelect) onSelect(name, currentType);
      hideMentionModal();
    });
  });
}

function switchMentionTab(type) {
  currentType = type;
  document.querySelectorAll('.mention-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-mention-type') === type);
  });
  const search = document.getElementById('mention-search');
  renderMentionList(search?.value || '');
}

export function showMentionModal(callback) {
  onSelect = callback;
  const modal = document.getElementById('mention-modal');
  if (!modal) return;

  const search = document.getElementById('mention-search');
  if (search) search.value = '';

  currentType = '达人';
  document.querySelectorAll('.mention-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-mention-type') === '达人');
  });

  renderMentionList();
  modal.classList.remove('hidden');
  setTimeout(() => search?.focus(), 100);
}

export function hideMentionModal() {
  document.getElementById('mention-modal')?.classList.add('hidden');
  onSelect = null;
}

export function initMention() {
  document.querySelectorAll('.mention-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchMentionTab(tab.getAttribute('data-mention-type'));
    });
  });

  const search = document.getElementById('mention-search');
  if (search) {
    search.addEventListener('input', () => {
      renderMentionList(search.value);
    });
  }

  const modal = document.getElementById('mention-modal');
  if (modal) {
    modal.querySelector('.modal-overlay')?.addEventListener('click', hideMentionModal);
    modal.querySelector('[data-action="close-mention"]')?.addEventListener('click', hideMentionModal);
  }
}
