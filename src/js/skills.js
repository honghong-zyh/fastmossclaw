import { showToast } from './toast.js';
import { skillsData } from '../data/skills.js';

let currentSkillMenuId = null;
let officialOnly = false;

export function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const search = (document.getElementById('skill-search')?.value || '').toLowerCase();
  const filtered = skillsData.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search) || s.desc.toLowerCase().includes(search);
    const matchOfficial = officialOnly ? s.official : true;
    return matchSearch && matchOfficial;
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
  officialOnly = !officialOnly;
  const btn = document.getElementById('filter-official');
  if (btn) {
    btn.className = officialOnly
      ? 'flex items-center gap-1 px-3 py-2 border border-rose-300 bg-rose-50 text-rose-600 rounded-lg text-sm'
      : 'flex items-center gap-1 px-3 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50';
  }
  renderSkills();
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

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#skill-context-menu')) {
      hideSkillMenu();
    }
  });

  const ctxMenu = document.getElementById('skill-context-menu');
  if (ctxMenu) {
    ctxMenu.querySelector('[data-action="try-skill"]')?.addEventListener('click', () => {
      hideSkillMenu();
      showToast('正在启动技能试用...');
    });
    ctxMenu.querySelector('[data-action="download-skill"]')?.addEventListener('click', () => {
      hideSkillMenu();
      showToast('开始下载技能...');
    });
    ctxMenu.querySelector('[data-action="edit-skill"]')?.addEventListener('click', () => {
      hideSkillMenu();
      showToast('正在使用 Manus 打开编辑器...');
    });
    ctxMenu.querySelector('[data-action="replace-skill"]')?.addEventListener('click', () => {
      hideSkillMenu();
      document.getElementById('upload-modal')?.classList.remove('hidden');
    });
    ctxMenu.querySelector('[data-action="delete-skill"]')?.addEventListener('click', () => {
      deleteSkillFromMenu();
    });
  }
}
