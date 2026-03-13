let timer = null;

export function showToast(msg) {
  const toast = document.getElementById('toast');
  const text = document.getElementById('toast-text');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.remove('hidden');

  clearTimeout(timer);
  timer = setTimeout(() => toast.classList.add('hidden'), 2500);
}
