import { showToast } from './toast.js';
import { navigateTo } from './navigation.js';
import { skillsData } from '../data/skills.js';

let currentSkillMenuId = null;
let currentFilter = 'all';

const officialSkillsCatalog = [
  { id: 'excel-generator', name: 'excel-generator', desc: '专业的 Excel 电子表格创建工具，注重美观与数据可视化。', tag: '官方' },
  { id: 'similarweb-analytics', name: 'similarweb-analytics', desc: '使用 SimilarWeb 流量数据分析网站和域名。获取流量指标、参与度统计、全球排名、流量来源和地理分布，进行全面的网站研究。', tag: '官方' },
  { id: 'internet-skill-finder', name: 'internet-skill-finder', desc: 'Search and recommend Agent Skills from verified GitHub repositories. Use when users ask to find, discover, search for, or recommend skills/plugins for specific tasks.', tag: '官方' },
  { id: 'github-gem-seeker', name: 'github-gem-seeker', desc: 'Search GitHub for battle-tested solutions instead of reinventing the wheel. Use when the user\'s problem is universal enough that open source developers have probably solved it.', tag: '官方' },
  { id: 'skill-creator', name: 'skill-creator', desc: '创建或更新技能的指南，通过专业知识、工作流或工具集成来扩展 Manus。对于任何修改或改进请求，必须首先阅读此技能并遵循其更新工作流，而不是直接编辑文件。', tag: '官方' },
  { id: 'tiktok-smart-selection', name: 'tiktok-smart-selection', desc: '智能挖掘 TikTok 热门商品及高潜力新品，支持按类目、销量增长率、达人带货力等维度筛选。', tag: '个人', category: 'ecommerce' },
  { id: 'video-generator', name: 'video-generator', desc: '专业的 AI 视频制作工作流。在创建视频、短片、广告或任何使用 AI 生成工具的视频内容时使用。', tag: '官方' },
  { id: 'stock-analysis', name: 'stock-analysis', desc: '使用金融市场数据分析股票和公司。获取公司概况、技术见解、价格图表、内部持股和 SEC 申报文件，进行全面的股票研究。', tag: '官方' },
];

export function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const search = (document.getElementById('skill-search')?.value || '').toLowerCase();
  const filtered = skillsData.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search) || s.desc.toLowerCase().includes(search);
    
    let matchFilter = true;
    if (currentFilter === 'official') {
      matchFilter = s.official;
    } else if (currentFilter === 'personal') {
      matchFilter = !s.official;
    } else if (currentFilter === 'ecommerce') {
      matchFilter = s.category === 'ecommerce';
    }

    return matchSearch && matchFilter;
  });

  grid.innerHTML = filtered
    .map(
      (s) => `
    <div class="bg-white border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-colors relative" data-skill-id="${s.id}">
      <div class="flex items-start justify-between mb-2">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <h4 class="font-semibold text-sm text-slate-900 truncate">${s.name}</h4>
            ${s.official ? '<span class="text-blue-500 flex-shrink-0"><svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></span>' : ''}
          </div>
          <p class="text-xs text-slate-400 mt-1 line-clamp-2">${s.desc}</p>
        </div>
        <div class="flex items-center gap-2 ml-3 flex-shrink-0">
          <div class="toggle-switch ${s.enabled ? 'on' : 'off'}" data-action="toggle-skill" data-skill-id="${s.id}">
            <div class="toggle-dot"></div>
          </div>
          <button data-action="skill-menu" data-skill-id="${s.id}" class="p-1 hover:bg-slate-100 rounded">
            <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01"/></svg>
          </button>
        </div>
      </div>
      <div class="flex items-center gap-2 mt-3">
        ${s.official ? '<span class="text-xs text-slate-400">官方</span><span class="text-slate-300">\u00b7</span>' : ''}
        <span class="text-xs text-slate-400">更新于 ${s.date}</span>
      </div>
    </div>
  `
    )
    .join('');

  bindSkillEvents();
}

function bindSkillEvents() {
  document.querySelectorAll('[data-action="toggle-skill"]').forEach((el) => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.skillId, 10);
      toggleSkill(id);
    });
  });

  document.querySelectorAll('[data-action="skill-menu"]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(el.dataset.skillId, 10);
      showSkillMenu(e, id);
    });
  });
}

function toggleSkill(id) {
  const skill = skillsData.find((s) => s.id === id);
  if (skill) {
    skill.enabled = !skill.enabled;
    renderSkills();
    showToast(skill.enabled ? `已启用 ${skill.name}` : `已禁用 ${skill.name}`);
  }
}

function showSkillMenu(e, id) {
  currentSkillMenuId = id;
  const menu = document.getElementById('skill-context-menu');
  if (!menu) return;

  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';
  menu.classList.remove('hidden');

  requestAnimationFrame(() => {
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) menu.style.left = e.clientX - rect.width + 'px';
    if (rect.bottom > window.innerHeight) menu.style.top = e.clientY - rect.height + 'px';
  });
}

function hideSkillMenu() {
  const menu = document.getElementById('skill-context-menu');
  if (menu) menu.classList.add('hidden');
  currentSkillMenuId = null;
}

export function deleteSkillFromMenu() {
  if (currentSkillMenuId !== null) {
    const idx = skillsData.findIndex((s) => s.id === currentSkillMenuId);
    if (idx > -1) {
      const name = skillsData[idx].name;
      skillsData.splice(idx, 1);
      renderSkills();
      showToast(`已删除技能 ${name}`);
    }
  }
  hideSkillMenu();
}

export function toggleOfficialFilter() {
  showOfficialSkillsModal();
}

function showOfficialSkillsModal() {
  const modal = document.getElementById('official-skills-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  renderOfficialSkillsList();
}

function hideOfficialSkillsModal() {
  const modal = document.getElementById('official-skills-modal');
  if (modal) modal.classList.add('hidden');
}

function renderOfficialSkillsList(search = '') {
  const list = document.getElementById('official-skills-list');
  if (!list) return;

  const filtered = officialSkillsCatalog.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase())
  );

  const alreadyAdded = new Set(skillsData.map(s => s.name));

  list.innerHTML = filtered.map(s => {
    const added = alreadyAdded.has(s.name);
    return `
      <div class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
        <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center flex-shrink-0">
          <svg class="h-5 w-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm text-slate-900">${s.name}</span>
            <span class="text-xs px-1.5 py-0.5 rounded ${s.tag === '官方' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}">${s.tag}</span>
          </div>
          <p class="text-xs text-slate-400 mt-0.5 line-clamp-2">${s.desc}</p>
        </div>
        <button class="flex-shrink-0 text-sm px-3 py-1.5 rounded-lg transition-colors ${added ? 'bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-500' : 'bg-slate-900 text-white hover:bg-slate-700'}" 
                data-action="add-official-skill" data-skill-catalog-id="${s.id}">
          ${added ? '已添加' : '+ 添加'}
        </button>
      </div>
    `;
  }).join('');

  list.querySelectorAll('[data-action="add-official-skill"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const catalogId = btn.getAttribute('data-skill-catalog-id');
      const catalogSkill = officialSkillsCatalog.find(s => s.id === catalogId);
      if (!catalogSkill) return;

      const existingIdx = skillsData.findIndex(s => s.name === catalogSkill.name);
      
      if (existingIdx > -1) {
        skillsData.splice(existingIdx, 1);
        showToast(`已移除技能 ${catalogSkill.name}`);
      } else {
        skillsData.push({
          id: Date.now(),
          name: catalogSkill.name,
          desc: catalogSkill.desc,
          enabled: true,
          official: catalogSkill.tag === '官方',
          category: catalogSkill.category,
          date: '2026年3月13日',
        });
        showToast(`已添加技能 ${catalogSkill.name}`);
      }
      
      renderOfficialSkillsList(document.getElementById('official-skill-search')?.value || '');
      renderSkills();
    });
  });
}

export function importSkill() {
  const urlInput = document.getElementById('import-url');
  const url = urlInput?.value.trim();
  if (!url) {
    showToast('请输入技能 URL');
    return;
  }
  const name = url.split('/').filter(Boolean).pop() || 'imported-skill';
  skillsData.push({
    id: Date.now(),
    name,
    desc: '从 URL 导入的技能: ' + url,
    enabled: true,
    official: false,
    date: '2026年3月12日',
  });
  if (urlInput) urlInput.value = '';
  renderSkills();
  showToast(`已成功导入技能 ${name}`);
  return true;
}

export function uploadFile(file) {
  const name = file.name.replace(/\.(zip|skill)$/, '');
  skillsData.push({
    id: Date.now(),
    name,
    desc: '上传的本地技能包',
    enabled: true,
    official: false,
    date: '2026年3月12日',
  });
  renderSkills();
  showToast(`已成功上传技能 ${name}`);
}

export function initSkills() {
  const searchInput = document.getElementById('skill-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderSkills());
  }

  const filterBtn = document.getElementById('filter-official');
  if (filterBtn) {
    filterBtn.addEventListener('click', toggleOfficialFilter);
  }

  const filterTypeBtn = document.getElementById('filter-type-btn');
  const filterTypeMenu = document.getElementById('filter-type-menu');
  
  if (filterTypeBtn && filterTypeMenu) {
    filterTypeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      filterTypeMenu.classList.toggle('hidden');
    });
    
    document.addEventListener('click', (e) => {
      if (!filterTypeBtn.contains(e.target) && !filterTypeMenu.contains(e.target)) {
        filterTypeMenu.classList.add('hidden');
      }
    });

    filterTypeMenu.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        renderSkills();
        filterTypeMenu.classList.add('hidden');
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#skill-context-menu')) {
      hideSkillMenu();
    }
  });

  // Official skills modal
  const officialModal = document.getElementById('official-skills-modal');
  if (officialModal) {
    officialModal.querySelector('.modal-overlay')?.addEventListener('click', hideOfficialSkillsModal);
    officialModal.querySelector('[data-action="close-official-skills"]')?.addEventListener('click', hideOfficialSkillsModal);
    const officialSearch = document.getElementById('official-skill-search');
    if (officialSearch) {
      officialSearch.addEventListener('input', () => renderOfficialSkillsList(officialSearch.value));
    }
  }

  const ctxMenu = document.getElementById('skill-context-menu');
  if (ctxMenu) {
    ctxMenu.querySelector('[data-action="try-skill"]')?.addEventListener('click', () => {
      const skill = skillsData.find(s => s.id === currentSkillMenuId);
      hideSkillMenu();
      if (skill) {
        navigateTo('home');
        setTimeout(() => {
          const input = document.getElementById('chat-input');
          if (input) {
            input.value = `我刚为 fastmoss ai 添加了 /${skill.name} 技能。你能用一些优秀的例子来演示它吗？`;
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
          }
        }, 100);
      }
    });
    ctxMenu.querySelector('[data-action="download-skill"]')?.addEventListener('click', () => {
      hideSkillMenu();
      showToast('开始下载技能...');
    });
    ctxMenu.querySelector('[data-action="edit-skill"]')?.addEventListener('click', () => {
      const skill = skillsData.find(s => s.id === currentSkillMenuId);
      hideSkillMenu();
      if (skill) {
        navigateTo('home');
        setTimeout(() => {
          const input = document.getElementById('chat-input');
          if (input) {
            input.value = `帮我一起使用 /skill-creator 编辑技能 ${skill.name}。`;
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
          }
        }, 100);
      }
    });
    ctxMenu.querySelector('[data-action="replace-skill"]')?.addEventListener('click', () => {
      hideSkillMenu();
      document.getElementById('import-modal')?.classList.remove('hidden');
    });
    ctxMenu.querySelector('[data-action="delete-skill"]')?.addEventListener('click', () => {
      deleteSkillFromMenu();
    });
  }
}
