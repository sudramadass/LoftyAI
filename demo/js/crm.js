let crmFilter = 'All';
let crmSearch = '';

function setLeadFilter(type) {
  crmFilter = type;
  document.querySelectorAll('.filter-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.filter === type);
  });
  renderLeads();
}

function filterLeads() {
  crmSearch = (document.getElementById('crm-search')?.value || '').toLowerCase();
  renderLeads();
}

function renderLeads() {
  const container = document.getElementById('crm-lead-list');
  if (!container) return;

  const filtered = LEADS
    .filter(l => {
      const matchType = crmFilter === 'All' || l.type === crmFilter;
      const term = crmSearch;
      const matchSearch = !term ||
        (l.first + ' ' + l.last).toLowerCase().includes(term) ||
        (l.email || '').toLowerCase().includes(term) ||
        (l.city || '').toLowerCase().includes(term) ||
        l.type.toLowerCase().includes(term);
      return matchType && matchSearch;
    })
    .sort((a, b) => b.score - a.score);

  container.innerHTML = filtered.length
    ? filtered.map(l => `
        <div class="crm-row border-b border-[rgba(255,255,255,.04)]" onclick="openLeadDetail(${l.id})">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
               style="background:rgba(255,255,255,.09);">${l.initials}</div>
          <div class="min-w-0">
            <div class="text-[13px] font-semibold text-white truncate">${l.first} ${l.last}${l.birthday ? ' 🎂' : ''}${l.urgent ? ' ⚠' : ''}</div>
            <div class="text-[11px] text-[#555] truncate">${l.email || l.phone}</div>
          </div>
          <div><span class="type-badge">${l.type}</span></div>
          <div>
            <div class="text-[13px] font-semibold text-white mb-1">${l.score}</div>
            <div class="crm-score-bar"><div class="crm-score-fill" style="width:${l.score}%"></div></div>
          </div>
          <div class="text-[12px] text-[#666]">${l.source}</div>
          <div class="text-[11.5px] text-[#555]">${l.minPrice ? '$' + Math.round(l.minPrice/1000) + 'K–$' + Math.round(l.maxPrice/1000) + 'K' : (l.city || '—')}</div>
        </div>
      `).join('')
    : `<div class="px-6 py-8 text-[13px] text-[#444] text-center">No leads match your filter.</div>`;
}

/* ── Lead Detail Modal ── */
function openLeadDetail(id) {
  const l = LEADS.find(x => x.id === id);
  if (!l) return;

  const modal = document.getElementById('lead-modal');
  const content = document.getElementById('lead-modal-content');
  const fmt = n => '$' + Math.round(n / 1000) + 'K';

  content.innerHTML = `
    <div class="p-6">
      <div class="flex items-start justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-[14px] font-bold text-white flex-shrink-0"
               style="background:rgba(255,255,255,.09);">${l.initials}</div>
          <div>
            <div class="text-[17px] font-bold text-white leading-tight">${l.first} ${l.last}</div>
            <span class="type-badge mt-1">${l.type}</span>
          </div>
        </div>
        <div class="text-right ml-4">
          <div class="text-[10px] text-[#555] mb-0.5">AI Score</div>
          <div class="text-[28px] font-bold text-white leading-none">${l.score}</div>
        </div>
      </div>
      <div class="crm-score-bar mb-4"><div class="crm-score-fill" style="width:${l.score}%"></div></div>
      <div class="space-y-2.5 mb-5">
        ${l.email ? `<div class="flex items-center gap-3"><span class="material-symbols-outlined text-[15px] text-[#555] flex-shrink-0">mail</span><span class="text-[12.5px] text-[#aaa]">${l.email}</span></div>` : ''}
        <div class="flex items-center gap-3"><span class="material-symbols-outlined text-[15px] text-[#555] flex-shrink-0">phone</span><span class="text-[12.5px] text-[#aaa]">${l.phone}</span></div>
        <div class="flex items-center gap-3"><span class="material-symbols-outlined text-[15px] text-[#555] flex-shrink-0">hub</span><span class="text-[12.5px] text-[#aaa]">Source: ${l.source}</span></div>
        ${l.city ? `<div class="flex items-center gap-3"><span class="material-symbols-outlined text-[15px] text-[#555] flex-shrink-0">location_on</span><span class="text-[12.5px] text-[#aaa]">${l.city}, AZ</span></div>` : ''}
        ${l.minPrice ? `<div class="flex items-center gap-3"><span class="material-symbols-outlined text-[15px] text-[#555] flex-shrink-0">attach_money</span><span class="text-[12.5px] text-[#aaa]">Budget: ${fmt(l.minPrice)} – ${fmt(l.maxPrice)}</span></div>` : ''}
        <div class="flex items-center gap-3"><span class="material-symbols-outlined text-[15px] text-[#555] flex-shrink-0">schedule</span><span class="text-[12.5px] text-[#aaa]">Last contact: ${l.daysAgo === 0 ? 'Today' : l.daysAgo + ' days ago'}</span></div>
        ${l.birthday ? `<div class="flex items-center gap-3"><span class="material-symbols-outlined text-[15px] text-[#555] flex-shrink-0">cake</span><span class="text-[12.5px] text-[#aaa]">Birthday today — great time to reach out</span></div>` : ''}
      </div>
      <div class="flex gap-2 mb-3">
        <button class="btn-primary flex-1 justify-center" onclick="closeLeadModal()">
          <span class="material-symbols-outlined text-[14px]">phone</span> Call
        </button>
        <button class="btn-secondary flex-1 justify-center" onclick="closeLeadModal()">
          <span class="material-symbols-outlined text-[14px]">sms</span> Text
        </button>
        <button class="btn-secondary flex-1 justify-center" onclick="closeLeadModal()">
          <span class="material-symbols-outlined text-[14px]">mail</span> Email
        </button>
      </div>
      <button onclick="closeLeadModal()" class="w-full text-center text-[11.5px] text-[#444] hover:text-[#888] transition-colors py-1">Dismiss</button>
    </div>
  `;

  modal.classList.remove('opacity-0', 'pointer-events-none');
}

function closeLeadModal() {
  document.getElementById('lead-modal').classList.add('opacity-0', 'pointer-events-none');
}
