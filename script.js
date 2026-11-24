const sidebar = document.getElementById('sidebar');
const menuButton = document.getElementById('menuButton');
const dashboardView = document.getElementById('dashboardView');
const placeholderView = document.getElementById('placeholderView');
const modal = document.getElementById('certificateModal');
const form = document.getElementById('certificateForm');
const toast = document.getElementById('toast');

menuButton.addEventListener('click', () => sidebar.classList.toggle('open'));

document.querySelectorAll('.nav-item[data-view]').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item[data-view]').forEach((nav) => nav.classList.remove('active'));
    item.classList.add('active');
    sidebar.classList.remove('open');

    const view = item.dataset.view;
    if (view === 'dashboard') {
      dashboardView.hidden = false;
      placeholderView.hidden = true;
      document.querySelector('.breadcrumb strong').textContent = 'Incamake';
      return;
    }

    dashboardView.hidden = true;
    placeholderView.hidden = false;

    const titles = {
      students: ['Abanyeshuri', 'Imibare n’amakuru y’abanyeshuri bose, ibyiciro n’ubuzima bwabo.'],
      records: ['Raporo z’Ubuzima', 'Gucunga ibyemezo, ibyanditswe bya muganga n’amateka y’ubuvuzi.'],
      doctors: ['Abaganga', 'Bashinzwe gusuzuma n’kwemeza ibyemezo bya muganga.'],
      reports: ['Raporo za NESA', 'Raporo y’abanyeshuri n’ingobyi z’ubuzima zishyikirizwa NESA.']
    };

    document.getElementById('placeholderTitle').textContent = titles[view][0];
    document.getElementById('placeholderText').textContent = titles[view][1];
    document.querySelector('.breadcrumb strong').textContent = titles[view][0];
  });
});

function openModal() {
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('studentName').focus(), 50);
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
  form.reset();
  document.getElementById('fileLabel').textContent = 'Fungura cyangwa ushushanye dosiye';
}

document.getElementById('uploadCertificate').addEventListener('click', openModal);
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('cancelModal').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });

const fileInput = document.getElementById('certificateFile');
fileInput.addEventListener('change', () => {
  document.getElementById('fileLabel').textContent = fileInput.files[0] ? fileInput.files[0].name : 'Fungura cyangwa ushushanye dosiye';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('studentName').value.trim();
  const studentClass = document.getElementById('studentClass').value;
  const illness = document.getElementById('illness').value.trim();
  if (!name || !illness) return;

  const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><div class="student"><div class="student-avatar cyan">${initials}</div><div><strong>${escapeHtml(name)}</strong><span>${escapeHtml(studentClass)}</span></div></div></td>
    <td>${escapeHtml(illness)}</td>
    <td>24 Nov, 2026</td>
    <td><span class="status pending">Birategereje</span></td>
    <td><button class="row-menu" aria-label="Options">•••</button></td>`;
  document.getElementById('recordsTable').prepend(row);

  const pending = document.getElementById('pendingCases');
  pending.textContent = String(Number(pending.textContent) + 1);
  closeModal();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
});

function escapeHtml(value) {
  const element = document.createElement('div');
  element.textContent = value;
  return element.innerHTML;
}

const roleButton = document.getElementById('roleButton');
const roleLabel = document.getElementById('roleLabel');
const roles = ['Ubuyobozi', 'Umuganga', 'NESA', 'Umunyeshuri'];
let roleIndex = 0;
roleButton.addEventListener('click', () => {
  roleIndex = (roleIndex + 1) % roles.length;
  roleLabel.textContent = roles[roleIndex];
});

document.getElementById('viewAllButton').addEventListener('click', () => {
  document.querySelector('[data-view="records"]').click();
});

document.getElementById('settingsBtn').addEventListener('click', () => {
  alert('Igenamiterere ry’Imboneza Medical System rirategurwa.');
});
