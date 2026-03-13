import { showToast } from './toast.js';

const schedules = [];

export function renderSchedules() {
  const list = document.getElementById('schedule-list');
  const empty = document.getElementById('schedule-empty');
  if (!list || !empty) return;

  if (schedules.length === 0) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  list.innerHTML = schedules
    .map(
      (s, i) => `
    <div class="bg-white border border-slate-200 rounded-xl p-5 custom-shadow flex items-start justify-between">
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-sm text-slate-900">${s.title}</h4>
        <p class="text-xs text-slate-400 mt-1 truncate">${s.prompt}</p>
        <div class="flex items-center gap-3 mt-3 text-xs text-slate-400">
          <span class="flex items-center gap-1">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            ${s.repeat} \u00b7 ${s.date} ${s.time}
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2 ml-4">
        <div class="toggle-switch ${s.enabled ? 'on' : 'off'}" data-action="toggle-schedule" data-index="${i}">
          <div class="toggle-dot"></div>
        </div>
        <button data-action="delete-schedule" data-index="${i}" class="p-1.5 hover:bg-rose-50 rounded text-slate-400 hover:text-rose-500">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    </div>
  `
    )
    .join('');

  bindScheduleEvents();
}

function bindScheduleEvents() {
  document.querySelectorAll('[data-action="toggle-schedule"]').forEach((el) => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.index, 10);
      schedules[idx].enabled = !schedules[idx].enabled;
      renderSchedules();
    });
  });

  document.querySelectorAll('[data-action="delete-schedule"]').forEach((el) => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.index, 10);
      schedules.splice(idx, 1);
      renderSchedules();
      showToast('定时任务已删除');
    });
  });
}

export function saveSchedule() {
  const title = document.getElementById('sched-title')?.value.trim() || 'AI 新闻摘要';
  const prompt =
    document.getElementById('sched-prompt')?.value.trim() ||
    '搜索昨天最具影响力的 AI 新闻...';
  const repeat = document.getElementById('sched-repeat')?.value || '不重复';
  const date = document.getElementById('sched-date')?.value || '2026-03-12';
  const time = document.getElementById('sched-time')?.value || '17:45';

  schedules.push({ title, prompt, repeat, date, time, enabled: true });
  renderSchedules();
  showToast('定时任务已创建');
  return true;
}

export function showScheduleModal() {
  const titleInput = document.getElementById('sched-title');
  const promptInput = document.getElementById('sched-prompt');
  const dateInput = document.getElementById('sched-date');
  if (titleInput) titleInput.value = '';
  if (promptInput) promptInput.value = '';
  if (dateInput) dateInput.valueAsDate = new Date();
  document.getElementById('schedule-modal')?.classList.remove('hidden');
}

export function hideScheduleModal() {
  document.getElementById('schedule-modal')?.classList.add('hidden');
}

export function initSchedule() {
  const addBtn = document.querySelector('[data-action="add-schedule"]');
  if (addBtn) {
    addBtn.addEventListener('click', showScheduleModal);
  }

  const saveBtn = document.querySelector('[data-action="save-schedule"]');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      saveSchedule();
      hideScheduleModal();
    });
  }

  const cancelBtn = document.querySelector('[data-action="cancel-schedule"]');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', hideScheduleModal);
  }

  const overlay = document.querySelector('#schedule-modal .modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', hideScheduleModal);
  }

  const closeBtn = document.querySelector('#schedule-modal [data-action="close-modal"]');
  if (closeBtn) {
    closeBtn.addEventListener('click', hideScheduleModal);
  }
}
