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

  let html = `
    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden custom-shadow">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <th class="px-6 py-4">任务名称</th>
            <th class="px-6 py-4">提示词</th>
            <th class="px-6 py-4">执行时间</th>
            <th class="px-6 py-4">状态</th>
            <th class="px-6 py-4 text-right">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
  `;

  html += schedules
    .map(
      (s, i) => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="px-6 py-4">
        <div class="font-medium text-slate-900 text-sm">${s.title}</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-xs text-slate-500 truncate max-w-[200px]" title="${s.prompt}">${s.prompt}</div>
      </td>
      <td class="px-6 py-4">
        <div class="flex items-center gap-1.5 text-sm text-slate-600">
          <svg class="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>${s.repeat === '不重复' ? s.date : s.repeat} ${s.time}</span>
        </div>
      </td>
      <td class="px-6 py-4">
        <button class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          s.enabled ? 'bg-rose-500' : 'bg-slate-200'
        }" data-action="toggle-schedule" data-index="${i}">
          <span class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            s.enabled ? 'translate-x-4' : 'translate-x-0'
          }"></span>
        </button>
      </td>
      <td class="px-6 py-4 text-right">
        <button data-action="delete-schedule" data-index="${i}" class="text-slate-400 hover:text-rose-500 transition-colors p-1">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </td>
    </tr>
  `
    )
    .join('');

  html += `
        </tbody>
      </table>
    </div>
  `;

  list.innerHTML = html;
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
