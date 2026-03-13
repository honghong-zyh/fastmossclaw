export function toggleSidebar() {
  const aside = document.querySelector('aside');
  const main = document.querySelector('main');
  if (!aside || !main) return;

  if (aside.style.display === 'none') {
    aside.style.display = '';
    main.style.marginLeft = '240px';
  } else {
    aside.style.display = 'none';
    main.style.marginLeft = '0';
  }
}

export function initSidebar() {
  const toggleBtn = document.querySelector('[data-action="toggle-sidebar"]');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleSidebar);
  }
}
