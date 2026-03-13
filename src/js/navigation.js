import { renderSkills } from './skills.js';
import { renderSchedules } from './schedule.js';
import { renderPlatformGrid } from './remote.js';
import { renderOfficialModels } from './models.js';
import { showToast } from './toast.js';

let currentPage = 'home';

export function navigateTo(page) {
  currentPage = page;

  document.querySelectorAll('[data-page]').forEach((p) => p.classList.remove('active'));
  const target = document.querySelector(`[data-page="${page}"]`);
  if (target) target.classList.add('active');

  document.querySelectorAll('[data-nav]').forEach((n) => n.classList.remove('active'));
  const navItem = document.querySelector(`[data-nav="${page}"]`);
  if (navItem) navItem.classList.add('active');

  if (page === 'skills') renderSkills();
  if (page === 'schedule') renderSchedules();
  if (page === 'remote') renderPlatformGrid();
  if (page === 'models') renderOfficialModels();
  window.scrollTo(0, 0);
}

export function getCurrentPage() {
  return currentPage;
}

export function initNavigation() {
  navigateTo('home');

  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const page = el.getAttribute('data-nav');
      navigateTo(page);
    });
  });

  document.querySelectorAll('[data-action="go-home"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('home');
    });
  });

  const memberBadge = document.querySelector('.bg-rose-50.text-rose-600');
  if (memberBadge) {
    memberBadge.style.cursor = 'pointer';
    memberBadge.addEventListener('click', () => {
      showToast('会员升级功能即将上线，敬请期待');
    });
  }
}
