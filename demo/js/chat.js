const chatHistory = [];

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  addBubble('user', text);
  input.value = '';
  input.style.height = 'auto';

  const btn = document.getElementById('chat-send');
  btn.disabled = true;
  const tid = addTyping();

  chatHistory.push({ role: 'user', parts: [{ text }] });

  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: chatHistory,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
      })
    });
    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
      || (data.error ? `Error: ${data.error.message}` : 'Something went wrong — please try again.');
    removeTyping(tid);
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    addBubble('ai', reply);
  } catch (e) {
    removeTyping(tid);
    addBubble('ai', 'Network error — check your connection and try again.');
  }

  btn.disabled = false;
}

function addBubble(role, text) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-3`;
  const html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
  div.innerHTML = `<div class="max-w-[88%] px-4 py-3 text-[12.5px] leading-relaxed ${role === 'user' ? 'chat-bubble-user text-white' : 'chat-bubble-ai text-[#e0e0e0]'}">${html}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

let _tc = 0;
function addTyping() {
  const id = 'ty-' + (++_tc);
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.id = id;
  div.className = 'flex justify-start mb-3';
  div.innerHTML = `<div class="chat-bubble-ai px-4 py-3 flex items-center gap-1.5">
    <span class="w-1.5 h-1.5 rounded-full bg-[#555] inline-block" style="animation:pulseDot 1.2s .0s infinite"></span>
    <span class="w-1.5 h-1.5 rounded-full bg-[#555] inline-block" style="animation:pulseDot 1.2s .2s infinite"></span>
    <span class="w-1.5 h-1.5 rounded-full bg-[#555] inline-block" style="animation:pulseDot 1.2s .4s infinite"></span>
  </div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return id;
}

function removeTyping(id) {
  document.getElementById(id)?.remove();
}

function openChat() {
  document.getElementById('chat-panel').classList.add('open');
  document.getElementById('help-btn').style.opacity = '0';
  document.getElementById('help-btn').style.pointerEvents = 'none';
  setTimeout(() => document.getElementById('chat-input')?.focus(), 450);
}

function closeChat() {
  document.getElementById('chat-panel').classList.remove('open');
  const btn = document.getElementById('help-btn');
  btn.style.opacity = '1';
  btn.style.pointerEvents = '';
}
