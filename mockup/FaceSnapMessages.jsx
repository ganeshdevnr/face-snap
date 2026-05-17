import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');`;

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#08090F;
  --surface:rgba(255,255,255,0.04);
  --surface-hover:rgba(255,255,255,0.07);
  --surface-active:rgba(255,255,255,0.10);
  --border:rgba(255,255,255,0.07);
  --border-hover:rgba(255,255,255,0.14);
  --primary:#FF3D71;
  --primary-dim:rgba(255,61,113,0.15);
  --primary-glow:rgba(255,61,113,0.3);
  --bubble-sent:rgba(255,61,113,0.28);
  --bubble-sent-border:rgba(255,61,113,0.35);
  --text:#EEEEF5;
  --text-2:#8B8FA8;
  --text-3:#484C63;
  --display:'Syne',sans-serif;
  --body:'DM Sans',sans-serif;
  --r-sm:10px;--r-md:16px;--r-lg:24px;--r-full:9999px;
}
body{background:var(--bg);color:var(--text);font-family:var(--body);min-height:100vh;overflow:hidden;}

.bg-layer{position:fixed;inset:0;background:
  radial-gradient(ellipse 70% 50% at 15% -5%,rgba(255,61,113,0.13) 0%,transparent 60%),
  radial-gradient(ellipse 55% 45% at 85% 105%,rgba(99,60,255,0.09) 0%,transparent 60%),
  #08090F;z-index:0;}

.app{position:relative;z-index:1;height:100vh;display:flex;flex-direction:column;}

/* NAV */
.nav{flex-shrink:0;height:58px;display:flex;align-items:center;padding:0 28px;background:rgba(8,9,15,0.85);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--border);}
.nav-logo{font-family:var(--display);font-size:20px;font-weight:800;letter-spacing:-0.5px;width:200px;flex-shrink:0;background:linear-gradient(135deg,#FF3D71 30%,#FF8A65);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.nav-tabs{flex:1;display:flex;justify-content:center;gap:2px;}
.tab{display:flex;align-items:center;gap:7px;padding:7px 20px;background:none;border:none;color:var(--text-2);font-family:var(--body);font-size:14px;font-weight:500;cursor:pointer;border-radius:var(--r-sm);transition:color 0.2s;position:relative;}
.tab:hover{color:var(--text);}
.tab.on{color:var(--primary);}
.tab.on::after{content:'';position:absolute;bottom:-1px;left:20px;right:20px;height:2px;background:var(--primary);border-radius:2px 2px 0 0;}
.nav-right{width:200px;display:flex;justify-content:flex-end;align-items:center;gap:10px;}
.icon-btn{width:34px;height:34px;border-radius:var(--r-full);background:var(--surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text-2);transition:all 0.18s;position:relative;}
.icon-btn:hover{background:var(--surface-hover);color:var(--text);border-color:var(--border-hover);}
.badge{position:absolute;top:-3px;right:-3px;width:16px;height:16px;border-radius:var(--r-full);background:var(--primary);font-size:9px;font-weight:700;color:#fff;display:flex;align-items:center;justify-content:center;border:2px solid var(--bg);}

/* PAGE */
.page{flex:1;display:flex;align-items:center;justify-content:center;padding:24px;overflow:hidden;}

/* MESSAGES CONTAINER */
.msg-wrap{width:100%;max-width:1000px;height:100%;display:grid;grid-template-columns:280px 1fr;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;backdrop-filter:blur(12px);}

/* SIDEBAR */
.sidebar{border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;}
.sidebar-head{padding:20px 18px 14px;border-bottom:1px solid var(--border);flex-shrink:0;}
.sidebar-title{font-family:var(--display);font-size:15px;font-weight:800;color:var(--text);letter-spacing:-0.2px;}
.conv-list{flex:1;overflow-y:auto;padding:8px;}
.conv-list::-webkit-scrollbar{width:3px;}
.conv-list::-webkit-scrollbar-track{background:transparent;}
.conv-list::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px;}

.conv{display:flex;align-items:center;gap:10px;padding:10px 10px;border-radius:var(--r-md);cursor:pointer;transition:background 0.15s;position:relative;}
.conv:hover{background:var(--surface-hover);}
.conv.active{background:var(--surface-active);}
.conv-info{flex:1;min-width:0;}
.conv-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px;}
.conv-name{font-family:var(--display);font-size:12px;font-weight:700;color:var(--text);}
.conv-time{font-size:10px;color:var(--text-3);}
.conv-preview{font-size:11px;color:var(--text-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}

/* CHAT PANEL */
.chat{display:flex;flex-direction:column;overflow:hidden;}
.chat-head{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;flex-shrink:0;}
.chat-name{font-family:var(--display);font-size:14px;font-weight:700;color:var(--text);}
.chat-status{font-size:11px;color:var(--primary);}
.online-dot{width:7px;height:7px;border-radius:var(--r-full);background:var(--primary);flex-shrink:0;box-shadow:0 0 6px var(--primary-glow);}

/* MESSAGES */
.messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:8px;}
.messages::-webkit-scrollbar{width:3px;}
.messages::-webkit-scrollbar-track{background:transparent;}
.messages::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px;}

.msg-group{display:flex;flex-direction:column;gap:4px;}
.msg-group.mine{align-items:flex-end;}
.msg-group.theirs{align-items:flex-start;}

.msg-row{display:flex;align-items:flex-end;gap:8px;}
.msg-group.mine .msg-row{flex-direction:row-reverse;}

.bubble{max-width:320px;padding:10px 14px;border-radius:18px;font-size:13px;line-height:1.5;position:relative;}
.mine .bubble{background:var(--bubble-sent);border:1px solid var(--bubble-sent-border);color:var(--text);border-bottom-right-radius:4px;}
.theirs .bubble{background:var(--surface-active);color:var(--text);border-bottom-left-radius:4px;}

.bubble-meta{display:flex;align-items:center;gap:4px;margin-top:4px;}
.msg-group.mine .bubble-meta{justify-content:flex-end;}
.msg-time{font-size:10px;color:var(--text-3);}
.tick{color:rgba(255,255,255,0.6);font-size:10px;}

/* INPUT */
.chat-input{padding:16px 20px;border-top:1px solid var(--border);display:flex;align-items:center;gap:10px;flex-shrink:0;}
.input-wrap{flex:1;display:flex;align-items:center;background:var(--surface-hover);border:1px solid var(--border);border-radius:var(--r-full);padding:10px 16px;transition:border-color 0.18s;}
.input-wrap:focus-within{border-color:var(--border-hover);}
.msg-input{flex:1;background:none;border:none;outline:none;color:var(--text);font-family:var(--body);font-size:13px;}
.msg-input::placeholder{color:var(--text-3);}
.send-btn{width:38px;height:38px;border-radius:var(--r-full);background:var(--primary);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;color:#fff;transition:all 0.18s;}
.send-btn:hover{background:#ff5a85;box-shadow:0 0 18px var(--primary-glow);transform:scale(1.05);}
.send-btn:active{transform:scale(0.97);}

/* ANIMATIONS */
.conv{animation:fadeIn 0.3s ease both;}
@keyframes fadeIn{from{opacity:0;transform:translateX(-8px);}to{opacity:1;transform:translateX(0);}}
`;

const GRADS = [
  ['#FF3D71','#FF8A65'],['#A855F7','#6366F1'],['#0EA5E9','#06B6D4'],
  ['#10B981','#059669'],['#F59E0B','#EF4444'],['#EC4899','#8B5CF6'],
];

function Av({ name, size = 36, idx = 0 }) {
  const init = name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
  const [a, b] = GRADS[idx % GRADS.length];
  return (
    <div style={{width:size,height:size,borderRadius:'9999px',background:`linear-gradient(135deg,${a},${b})`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontSize:size*0.34,fontWeight:700,color:'#fff',flexShrink:0}}>
      {init}
    </div>
  );
}

const CONVOS = [
  { id:1, name:'Hattie Hannant', preview:'hello', time:'2d ago', g:0 },
  { id:2, name:'Sallyanne Dragoe', preview:'Test Message. Status should updat...', time:'2d ago', g:1 },
  { id:3, name:'Alfie Kubicka', preview:'Hello Alfie Kubicka. How was your d...', time:'2d ago', g:2 },
];

const MSGS = [
  { id:1, text:'Hi. Welcome to FaceSnap', mine:false, time:'2d ago', status:null },
  { id:2, text:'Hi. Thank you', mine:true, time:'2d ago', status:'read' },
  { id:3, text:'How are you doing?', mine:true, time:'2d ago', status:'read' },
  { id:4, text:'When you are coming?', mine:true, time:'2d ago', status:'read' },
  { id:5, text:'How are you doing?', mine:true, time:'2d ago', status:'read' },
  { id:6, text:'Hey', mine:true, time:'2d ago', status:'delivered' },
  { id:7, text:'Hey There!', mine:false, time:'2d ago', status:null },
  { id:8, text:'Test Message. Status should update to delivered automatically.', mine:true, time:'2d ago', status:'delivered' },
  { id:9, text:'Test Message. Status should update to delivered automatically.', mine:false, time:'2d ago', status:null },
];

function ReadTick() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path d="M1 5l3 3 5-7" stroke="var(--text-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 5l3 3 5-7" stroke="var(--text-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function SingleTick() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 5l3 3 5-6" stroke="var(--text-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function SendIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
}
function BellIcon() {
  return <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
}

export default function FaceSnapMessages() {
  const [activeConvo, setActiveConvo] = useState(2);
  const [messages, setMessages] = useState(MSGS);
  const [input, setInput] = useState('');
  const [tab, setTab] = useState('Messages');

  const active = CONVOS.find(c => c.id === activeConvo);

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { id: Date.now(), text: input.trim(), mine: true, time: 'just now', status: 'delivered' }]);
    setInput('');
  };

  return (
    <>
      <style>{FONTS + CSS}</style>
      <div className="bg-layer" />
      <div className="app">

        {/* NAVBAR */}
        <nav className="nav">
          <div className="nav-logo">FaceSnap</div>
          <div className="nav-tabs">
            {[
              { label:'Feed', icon:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
              { label:'Friends', icon:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85"/></svg> },
              { label:'Messages', icon:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
            ].map(({label, icon}) => (
              <button key={label} className={`tab ${tab===label?'on':''}`} onClick={()=>setTab(label)}>
                {icon}{label}
              </button>
            ))}
          </div>
          <div className="nav-right">
            <div className="icon-btn">
              <BellIcon />
              <span className="badge">3</span>
            </div>
            <Av name="Ganesh" size={32} idx={4} />
          </div>
        </nav>

        {/* PAGE */}
        <div className="page">
          <div className="msg-wrap">

            {/* SIDEBAR */}
            <div className="sidebar">
              <div className="sidebar-head">
                <div className="sidebar-title">Messages</div>
              </div>
              <div className="conv-list">
                {CONVOS.map((c, i) => (
                  <div
                    key={c.id}
                    className={`conv ${activeConvo===c.id?'active':''}`}
                    style={{animationDelay:`${i*0.07}s`}}
                    onClick={()=>setActiveConvo(c.id)}
                  >
                    <Av name={c.name} size={38} idx={c.g} />
                    <div className="conv-info">
                      <div className="conv-row">
                        <span className="conv-name">{c.name}</span>
                        <span className="conv-time">{c.time}</span>
                      </div>
                      <div className="conv-preview">{c.preview}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CHAT PANEL */}
            <div className="chat">
              {/* Header */}
              <div className="chat-head">
                <Av name={active.name} size={36} idx={active.g} />
                <div>
                  <div className="chat-name">{active.name}</div>
                  <div className="chat-status">Active now</div>
                </div>
                <div style={{flex:1}} />
                <div className="online-dot" />
              </div>

              {/* Messages */}
              <div className="messages">
                {messages.map((msg, i) => {
                  const groupClass = msg.mine ? 'mine' : 'theirs';
                  return (
                    <div key={msg.id} className={`msg-group ${groupClass}`} style={{animationDelay:`${i*0.03}s`}}>
                      <div className="msg-row">
                        {!msg.mine && <Av name={active.name} size={26} idx={active.g} />}
                        <div>
                          <div className={`bubble`}>{msg.text}</div>
                          <div className="bubble-meta">
                            <span className="msg-time">{msg.time}</span>
                            {msg.mine && (msg.status === 'read' ? <ReadTick /> : <SingleTick />)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input */}
              <div className="chat-input">
                <div className="input-wrap">
                  <input
                    className="msg-input"
                    placeholder="Write a message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && send()}
                  />
                </div>
                <button className="send-btn" onClick={send}>
                  <SendIcon />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
