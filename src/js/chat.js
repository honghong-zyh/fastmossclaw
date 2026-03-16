import { showToast } from './toast.js';
import { navigateTo } from './navigation.js';
import { showMentionModal } from './mention.js';
import { skillsData } from '../data/skills.js';

export function sendMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;

  const historyList = document.getElementById('chat-history');
  const li = document.createElement('li');
  const preview = msg.substring(0, 15);
  li.innerHTML = `<a class="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md truncate cursor-pointer" data-action="go-home">• ${preview}...</a>`;
  li.querySelector('a').addEventListener('click', () => navigateTo('home'));
  historyList.prepend(li);

  input.value = '';
  showToast('消息已发送，AI 正在处理...');
}

export function fillPrompt(el) {
  const text =
    el.querySelector('h3')?.textContent ||
    el.querySelector('span:last-child')?.textContent ||
    '';
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = text;
    input.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function startNewChat() {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = '';
    input.focus();
  }
}

function insertMentionTag(name, type) {
  const input = document.getElementById('chat-input');
  if (!input) return;

  const tag = `@${type}:${name} `;
  const pos = input.selectionStart || input.value.length;
  const before = input.value.substring(0, pos);
  
  if (before.endsWith('@')) {
    input.value = before.slice(0, -1) + tag + input.value.substring(pos);
    const newPos = pos - 1 + tag.length;
    input.focus();
    input.setSelectionRange(newPos, newPos);
  } else {
    input.value = input.value.substring(0, pos) + tag + input.value.substring(pos);
    input.focus();
    const newPos = pos + tag.length;
    input.setSelectionRange(newPos, newPos);
  }
}

function switchTab(btn) {
  const container = document.getElementById('home-tabs');
  if (!container) return;

  container.querySelectorAll('button').forEach((b) => {
    b.className =
      'pb-3 px-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors';
  });
  btn.className = 'pb-3 px-2 text-sm font-bold text-rose-600 border-b-2 border-rose-600';

  const category = btn.textContent.trim();
  document.querySelectorAll('#cards-grid > div').forEach((card) => {
    card.style.display =
      category === '全部' || card.dataset.category === category ? '' : 'none';
  });
}

function showSkillsPicker(showSearch = false) {
  const picker = document.getElementById('skills-picker');
  if (!picker) return;

  const btn = document.querySelector('[data-action="open-skills-picker"]');
  if (btn) {
    const rect = btn.getBoundingClientRect();
    picker.style.left = rect.left + 'px';
    picker.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
    picker.style.top = 'auto';
  }

  const searchContainer = document.getElementById('skills-picker-search-container');
  const searchInput = document.getElementById('skills-picker-search');
  
  if (searchContainer) {
    if (showSearch) {
      searchContainer.classList.remove('hidden');
      if (searchInput) {
        searchInput.value = '';
        setTimeout(() => searchInput.focus(), 50);
      }
    } else {
      searchContainer.classList.add('hidden');
    }
  }

  picker.classList.remove('hidden');
  renderSkillsPicker();
}

function hideSkillsPicker() {
  document.getElementById('skills-picker')?.classList.add('hidden');
}

function renderSkillsPicker(search = '') {
  const list = document.getElementById('skills-picker-list');
  if (!list) return;

  const enabledSkills = skillsData.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  if (enabledSkills.length === 0) {
    list.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">暂无技能</p>';
    return;
  }

  list.innerHTML = enabledSkills.map(s => `
    <button class="w-full text-left flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors" data-action="select-skill" data-skill-name="${s.name}">
      <div class="w-7 h-7 rounded-md bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center flex-shrink-0">
        <svg class="h-3.5 w-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
      </div>
      <div class="flex-1 min-w-0">
        <span class="text-xs font-medium text-slate-800 block truncate">${s.name}</span>
        <span class="text-xs text-slate-400 block truncate">${s.desc}</span>
      </div>
      ${s.official ? '<span class="text-blue-500 flex-shrink-0"><svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></span>' : ''}
    </button>
  `).join('');

  list.querySelectorAll('[data-action="select-skill"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-skill-name');
      const input = document.getElementById('chat-input');
      if (input) {
        const cursor = input.selectionStart;
        const val = input.value;
        const lastSlash = val.lastIndexOf('/', cursor);
        
        if (lastSlash !== -1) {
           const tag = `/${name} `;
           const newVal = val.slice(0, lastSlash) + tag + val.slice(cursor);
           input.value = newVal;
           const newPos = lastSlash + tag.length;
           input.focus();
           input.setSelectionRange(newPos, newPos);
        }
      }
      hideSkillsPicker();
    });
  });
}

export function initChat() {
  const input = document.getElementById('chat-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    input.addEventListener('input', (e) => {
      const val = input.value;
      const cursor = input.selectionStart;
      const char = e.data;
      
      // Check for / trigger
      const lastSlash = val.lastIndexOf('/', cursor);
      if (lastSlash !== -1) {
        const beforeSlash = val.slice(0, lastSlash);
        if (lastSlash === 0 || beforeSlash.endsWith(' ') || beforeSlash.endsWith('\n')) {
          const query = val.slice(lastSlash + 1, cursor);
          // Only show if query doesn't contain spaces (simple command mode)
          if (!query.includes(' ')) {
            showSkillsPicker(false); // Do not show search input
            renderSkillsPicker(query);
          } else {
            hideSkillsPicker();
          }
        } else {
            hideSkillsPicker();
        }
      } else {
        hideSkillsPicker();
      }

      // Check for @ trigger
      if (char === '@' || (val.slice(0, cursor).endsWith('@'))) {
        const beforeAt = val.slice(0, cursor - 1);
        if (cursor === 1 || beforeAt.endsWith(' ') || beforeAt.endsWith('\n')) {
          showMentionModal(insertMentionTag);
        }
      }
    });
  }

  const sendBtn = document.querySelector('[data-action="send-message"]');
  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  const mentionBtn = document.querySelector('[data-action="open-mention"]');
  if (mentionBtn) {
    mentionBtn.addEventListener('click', () => {
      showMentionModal(insertMentionTag);
    });
  }

  const skillsPickerBtn = document.querySelector('[data-action="open-skills-picker"]');
  if (skillsPickerBtn) {
    skillsPickerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const picker = document.getElementById('skills-picker');
      if (picker && !picker.classList.contains('hidden')) {
        hideSkillsPicker();
      } else {
        showSkillsPicker(true); // Show search input
      }
    });
  }

  const skillsPickerSearch = document.getElementById('skills-picker-search');
  if (skillsPickerSearch) {
    skillsPickerSearch.addEventListener('input', () => renderSkillsPicker(skillsPickerSearch.value));
  }

  document.querySelector('[data-action="go-to-skills-page"]')?.addEventListener('click', () => {
    hideSkillsPicker();
    navigateTo('skills');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#skills-picker') && !e.target.closest('[data-action="open-skills-picker"]')) {
      hideSkillsPicker();
    }
  });

  const newChatBtn = document.querySelector('[data-action="new-chat"]');
  if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
      navigateTo('home');
      startNewChat();
    });
  }

  document.querySelectorAll('[data-action="fill-prompt"]').forEach((el) => {
    el.addEventListener('click', () => fillPrompt(el));
  });

  document.querySelectorAll('#home-tabs button').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn));
  });

  const refreshBtn = document.querySelector('[data-action="refresh-prompts"]');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      const prompts = document.querySelectorAll('#quick-prompts > div');
      prompts.forEach(p => {
        p.style.opacity = '0.5';
        p.style.transform = 'scale(0.98)';
      });
      setTimeout(() => {
        prompts.forEach(p => {
          p.style.opacity = '1';
          p.style.transform = 'scale(1)';
        });
        showToast('已刷新推荐问题');
      }, 300);
    });
  }

  document.querySelectorAll('[data-action="go-home"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('home');
    });
  });
}
