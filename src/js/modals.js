import { importSkill, uploadFile } from './skills.js';
import { renderPlatformGrid } from './remote.js';
import { showToast } from './toast.js';

function showModal(id) {
  document.getElementById(id)?.classList.remove('hidden');
}

function hideModal(id) {
  document.getElementById(id)?.classList.add('hidden');
}

function setupAddMenu() {
  const addBtn = document.querySelector('[data-action="toggle-add-menu"]');
  const menu = document.getElementById('add-menu');
  if (!addBtn || !menu) return;

  addBtn.addEventListener('click', () => menu.classList.toggle('hidden'));

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#add-menu') && !e.target.closest('[data-action="toggle-add-menu"]')) {
      menu.classList.add('hidden');
    }
  });

  menu.querySelector('[data-action="show-import"]')?.addEventListener('click', () => {
    menu.classList.add('hidden');
    showModal('import-modal');
  });
  menu.querySelector('[data-action="show-upload"]')?.addEventListener('click', () => {
    menu.classList.add('hidden');
    showModal('upload-modal');
  });
  menu.querySelector('[data-action="create-skill"]')?.addEventListener('click', () => {
    menu.classList.add('hidden');
    showToast('正在打开技能创建向导...');
  });
}

function setupImportModal() {
  const modal = document.getElementById('import-modal');
  if (!modal) return;

  modal.querySelector('.modal-overlay')?.addEventListener('click', () => hideModal('import-modal'));
  modal.querySelector('[data-action="close-modal"]')?.addEventListener('click', () => hideModal('import-modal'));
  modal.querySelector('[data-action="cancel"]')?.addEventListener('click', () => hideModal('import-modal'));
  modal.querySelector('[data-action="confirm-import"]')?.addEventListener('click', () => {
    if (importSkill()) hideModal('import-modal');
  });
}

function setupUploadModal() {
  const modal = document.getElementById('upload-modal');
  if (!modal) return;

  modal.querySelector('.modal-overlay')?.addEventListener('click', () => hideModal('upload-modal'));
  modal.querySelector('[data-action="close-modal"]')?.addEventListener('click', () => hideModal('upload-modal'));

  const zone = document.getElementById('upload-zone');
  const fileInput = document.getElementById('file-input');

  if (zone && fileInput) {
    zone.addEventListener('click', () => fileInput.click());
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('border-rose-400', 'bg-rose-50');
    });
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('border-rose-400', 'bg-rose-50');
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('border-rose-400', 'bg-rose-50');
      const file = e.dataTransfer.files[0];
      if (file) {
        uploadFile(file);
        hideModal('upload-modal');
      }
    });
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        uploadFile(file);
        hideModal('upload-modal');
      }
    });
  }
}

function setupBindModal() {
  const modal = document.getElementById('platform-bind-modal');
  if (!modal) return;

  modal.querySelector('.modal-overlay')?.addEventListener('click', () => hideModal('platform-bind-modal'));
  modal.querySelector('[data-action="close-bind-modal"]')?.addEventListener('click', () => hideModal('platform-bind-modal'));

  const toggleBtn = document.getElementById('toggle-bind-secret');
  const secretInput = document.getElementById('bind-app-secret');
  if (toggleBtn && secretInput) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = secretInput.type === 'password';
      secretInput.type = isHidden ? 'text' : 'password';
      toggleBtn.querySelector('.eye-off').classList.toggle('hidden', isHidden);
      toggleBtn.querySelector('.eye-on').classList.toggle('hidden', !isHidden);
    });
  }

  document.getElementById('bind-submit-btn')?.addEventListener('click', () => {
    const platformId = modal.getAttribute('data-current-platform');
    const appId = document.getElementById('bind-app-id')?.value?.trim();
    const appSecret = document.getElementById('bind-app-secret')?.value?.trim();

    if (!appId || !appSecret) {
      return;
    }

    try {
      const bindings = JSON.parse(localStorage.getItem('fm_bindings') || '{}');
      bindings[platformId] = { appId, appSecret, boundAt: Date.now() };
      localStorage.setItem('fm_bindings', JSON.stringify(bindings));
    } catch { /* ignore */ }

    hideModal('platform-bind-modal');
    renderPlatformGrid();

    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    if (toast && toastText) {
      toastText.textContent = '绑定成功';
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 2000);
    }
  });
}

export function initModals() {
  setupAddMenu();
  setupImportModal();
  setupUploadModal();
  setupBindModal();
}
