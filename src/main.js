import './styles/main.css';
import { initNavigation } from './js/navigation.js';
import { initChat } from './js/chat.js';
import { initSkills } from './js/skills.js';
import { initSchedule } from './js/schedule.js';
import { initSidebar } from './js/sidebar.js';
import { initModals } from './js/modals.js';
import { initRemote } from './js/remote.js';
import { initModels } from './js/models.js';
import { initMention } from './js/mention.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initChat();
  initSkills();
  initSchedule();
  initSidebar();
  initModals();
  initRemote();
  initModels();
  initMention();
});
