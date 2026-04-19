/* ── Live time ── */
function updateTime() {
  const el = document.getElementById('live-time');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' }) +
    ' · ' + now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' });
}
updateTime();
setInterval(updateTime, 60000);

/* ── View toggle ── */
function showView(v) {
  ['ai', 'classic', 'crm'].forEach(id => {
    const el = document.getElementById('view-' + id);
    if (el) el.classList.toggle('hidden', id !== v);
  });
  ['ai', 'classic'].forEach(id => {
    document.getElementById('btn-' + id)?.classList.toggle('active', id === v);
  });
  if (v === 'crm') renderLeads();
}

function setNavActive(el) {
  document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
}

/* ── Why panels ── */
function toggleWhy(id, btn) {
  const panel = document.getElementById(id);
  const isOpen = panel.classList.contains('open');
  document.querySelectorAll('.why-panel.open').forEach(p => {
    if (p.id !== id) {
      p.classList.remove('open');
      const b = document.querySelector(`[onclick="toggleWhy('${p.id}',this)"]`);
      if (b) b.style.color = '';
    }
  });
  panel.classList.toggle('open', !isOpen);
  btn.style.color = !isOpen ? '#d4d4d4' : '';
}

/* ── Right sidebar ── */
function openSidebar() {
  const s = document.getElementById('right-sidebar');
  const o = document.getElementById('sidebar-overlay');
  s.classList.remove('translate-x-full');
  o.classList.remove('pointer-events-none');
  setTimeout(() => o.classList.remove('opacity-0'), 10);
}

function closeSidebar() {
  const s = document.getElementById('right-sidebar');
  const o = document.getElementById('sidebar-overlay');
  s.classList.add('translate-x-full');
  o.classList.add('opacity-0');
  setTimeout(() => o.classList.add('pointer-events-none'), 420);
}
