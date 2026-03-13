import { showToast } from './toast.js';
import { navigateTo } from './navigation.js';
import { showMentionModal } from './mention.js';

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
  input.value = input.value.substring(0, pos) + tag + input.value.substring(pos);
  input.focus();
  const newPos = pos + tag.length;
  input.setSelectionRange(newPos, newPos);
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

export function initChat() {
  const input = document.getElementById('chat-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
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
