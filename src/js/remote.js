import { showToast } from './toast.js';

const platforms = [
  { id: 'console',   name: 'Console',            type: '内置', enabled: true,  prefix: '未设置', guideUrl: '', fields: [] },
  { id: 'dingtalk',  name: 'DingTalk',            type: '内置', enabled: true,  prefix: '未设置', guideUrl: 'https://molili.dangbei.com/dingtalk.html', fields: ['App Key', 'App Secret'] },
  { id: 'imessage',  name: 'iMessage',            type: '内置', enabled: true,  prefix: '未设置', guideUrl: 'https://molili.dangbei.com/imessage.html', fields: ['Apple ID', 'App Password'] },
  { id: 'qq',        name: 'QQ',                  type: '内置', enabled: true,  prefix: '未设置', guideUrl: 'https://molili.dangbei.com/qq.html', fields: ['App ID', 'App Secret'] },
  { id: 'feishu',    name: 'Feishu',              type: '内置', enabled: false, prefix: '未设置', guideUrl: 'https://molili.dangbei.com/feishu.html', fields: ['APP ID', 'APP Secret'] },
  { id: 'discord',   name: 'Discord',             type: '内置', enabled: false, prefix: '未设置', guideUrl: 'https://molili.dangbei.com/discord.html', fields: ['Bot Token', 'Application ID'] },
  { id: 'telegram',  name: 'Telegram',            type: '内置', enabled: false, prefix: '未设置', guideUrl: 'https://molili.dangbei.com/telegram.html', fields: ['Bot Token', 'Chat ID'] },
  { id: 'mqtt',      name: 'MQTT',                type: '内置', enabled: false, prefix: '未设置', guideUrl: 'https://molili.dangbei.com/mqtt.html', fields: ['Broker URL', 'Token'] },
  { id: 'twilio',    name: 'Twilio',              type: '内置', enabled: false, prefix: '未设置', guideUrl: 'https://molili.dangbei.com/twilio.html', fields: ['Account SID', 'Auth Token'] },
  { id: 'wechat',    name: 'WeChat',              type: '内置', enabled: false, prefix: '未设置', guideUrl: 'https://molili.dangbei.com/wechat.html', fields: ['App ID', 'App Secret'] },
  { id: 'line',      name: 'LINE',                type: '内置', enabled: false, prefix: '未设置', guideUrl: 'https://molili.dangbei.com/line.html', fields: ['Channel ID', 'Channel Secret'] },
  { id: 'whatsapp',  name: 'WhatsApp',            type: '内置', enabled: false, prefix: '未设置', guideUrl: 'https://molili.dangbei.com/whatsapp.html', fields: ['Phone Number ID', 'Access Token'] },
  { id: 'messenger', name: 'Facebook Messenger',  type: '内置', enabled: false, prefix: '未设置', guideUrl: 'https://molili.dangbei.com/messenger.html', fields: ['Page Access Token', 'App Secret'] },
];

function getPlatformState() {
  try {
    const saved = localStorage.getItem('fm_platforms');
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return null;
}

function savePlatformState(data) {
  localStorage.setItem('fm_platforms', JSON.stringify(data));
}

export function getPlatforms() {
  const saved = getPlatformState();
  if (saved) {
    return platforms.map(p => {
      const s = saved.find(x => x.id === p.id);
      return s ? { ...p, enabled: s.enabled, prefix: s.prefix || p.prefix } : p;
    });
  }
  return platforms;
}

export function togglePlatform(id) {
  const list = getPlatforms();
  const item = list.find(p => p.id === id);
  if (item) item.enabled = !item.enabled;
  savePlatformState(list.map(({ id, enabled, prefix }) => ({ id, enabled, prefix })));
  return list;
}

export function getPlatformById(id) {
  return platforms.find(p => p.id === id) || null;
}

export function renderPlatformGrid() {
  const grid = document.getElementById('platform-grid');
  if (!grid) return;

  const list = getPlatforms();
  grid.innerHTML = list.map(p => `
    <div class="platform-card bg-white border ${p.enabled ? 'border-blue-400 ring-1 ring-blue-100' : 'border-slate-200'} rounded-xl p-5 shadow-sm cursor-pointer transition-all hover:shadow-md"
         data-platform="${p.id}">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-sm text-slate-900">${p.name}</span>
          <span class="text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium">${p.type}</span>
        </div>
        <button class="platform-toggle flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors" data-toggle-platform="${p.id}">
          <span class="w-2 h-2 rounded-full ${p.enabled ? 'bg-green-500' : 'bg-gray-400'}"></span>
          <span class="text-xs ${p.enabled ? 'text-green-600' : 'text-slate-400'}">${p.enabled ? '已启用' : '已禁用'}</span>
          <svg class="h-3 w-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
      </div>
      <p class="text-xs text-slate-400 mb-1">机器人前缀: ${p.prefix}</p>
      <p class="text-xs text-blue-500 hover:text-blue-600 mt-2">点击卡片进行编辑</p>
    </div>
  `).join('');

  grid.querySelectorAll('.platform-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-toggle-platform');
      togglePlatform(id);
      renderPlatformGrid();
      const list = getPlatforms();
      const p = list.find(x => x.id === id);
      if (p) showToast(p.enabled ? `已启用 ${p.name}` : `已禁用 ${p.name}`);
    });
  });

  grid.querySelectorAll('.platform-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-platform');
      openBindModal(id);
    });
  });
}

function openBindModal(platformId) {
  const p = getPlatformById(platformId);
  if (!p) return;

  const modal = document.getElementById('platform-bind-modal');
  if (!modal) return;

  document.getElementById('bind-modal-title').textContent = `绑定${p.name}`;

  const step1Label = modal.querySelector('.text-sm.font-medium.text-slate-700');
  if (p.fields.length >= 2) {
    step1Label.textContent = `点击下方链接，按步骤获取${p.name}机器人 ${p.fields[0]} 和 ${p.fields[1]}：`;
  } else if (p.id === 'console') {
    step1Label.textContent = `Console 为内置终端，无需额外配置：`;
  }

  const link = document.getElementById('bind-guide-link');
  if (p.guideUrl) {
    link.href = p.guideUrl;
    link.textContent = p.guideUrl;
    link.style.display = '';
  } else {
    link.style.display = 'none';
  }

  const step2Label = document.getElementById('bind-step2-label');
  if (p.fields.length >= 2) {
    step2Label.textContent = `填入 ${p.fields[0]} 和 ${p.fields[1]} 绑定你的${p.name}`;
  } else {
    step2Label.textContent = `配置 ${p.name} 连接参数`;
  }

  const appIdInput = document.getElementById('bind-app-id');
  const appSecretInput = document.getElementById('bind-app-secret');
  appIdInput.placeholder = p.fields[0] ? `输入获取到的 ${p.fields[0]}` : '输入配置参数';
  appSecretInput.placeholder = p.fields[1] ? `输入获取到的 ${p.fields[1]}` : '输入密钥';
  appIdInput.value = '';
  appSecretInput.value = '';

  modal.setAttribute('data-current-platform', platformId);
  modal.classList.remove('hidden');
}

export function initRemote() {
  renderPlatformGrid();
}
