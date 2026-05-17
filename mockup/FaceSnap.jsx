import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');`;

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#08090F;
  --surface:rgba(255,255,255,0.04);
  --surface-hover:rgba(255,255,255,0.07);
  --border:rgba(255,255,255,0.07);
  --border-hover:rgba(255,255,255,0.14);
  --primary:#FF3D71;
  --primary-dim:rgba(255,61,113,0.15);
  --primary-glow:rgba(255,61,113,0.3);
  --text:#EEEEF5;
  --text-2:#8B8FA8;
  --text-3:#484C63;
  --display:'Syne',sans-serif;
  --body:'DM Sans',sans-serif;
  --r-sm:10px;--r-md:16px;--r-lg:24px;--r-full:9999px;
}
body{background:var(--bg);color:var(--text);font-family:var(--body);min-height:100vh;}
.bg-layer{position:fixed;inset:0;background:radial-gradient(ellipse 70% 50% at 15% -5%,rgba(255,61,113,0.13) 0%,transparent 60%),radial-gradient(ellipse 55% 45% at 85% 105%,rgba(99,60,255,0.09) 0%,transparent 60%),#08090F;z-index:0;}
.app{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;}

/* NAV */
.nav{position:sticky;top:0;z-index:100;height:58px;display:flex;align-items:center;padding:0 28px;background:rgba(8,9,15,0.85);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--border);}
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

/* LAYOUT */
.layout{display:grid;grid-template-columns:256px 1fr 272px;gap:22px;max-width:1180px;margin:0 auto;padding:24px;width:100%;}

/* GLASS CARD */
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);transition:border-color 0.2s;}
.card:hover{border-color:var(--border-hover);}

/* PROFILE */
.profile{padding:28px 20px;display:flex;flex-direction:column;align-items:center;text-align:center;position:sticky;top:82px;height:fit-content;}
.avatar-ring{width:84px;height:84px;border-radius:var(--r-full);padding:2.5px;background:linear-gradient(135deg,#FF3D71,#FF8A65,#A855F7);margin-bottom:16px;}
.avatar-inner{width:100%;height:100%;border-radius:var(--r-full);background:linear-gradient(135deg,#1E1530,#162030);display:flex;align-items:center;justify-content:center;font-family:var(--display);font-size:26px;font-weight:800;color:var(--text);border:3px solid var(--bg);}
.p-name{font-family:var(--display);font-size:17px;font-weight:800;color:var(--text);margin-bottom:3px;letter-spacing:-0.3px;}
.p-role{font-size:10px;color:var(--primary);font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;}
.p-bio{font-size:13px;color:var(--text-2);line-height:1.65;margin-bottom:20px;padding:0 2px;}
.stats{display:grid;grid-template-columns:1fr 1fr 1fr;width:100%;border:1px solid var(--border);border-radius:var(--r-md);overflow:hidden;margin-bottom:18px;}
.stat{padding:12px 4px;display:flex;flex-direction:column;align-items:center;gap:2px;border-right:1px solid var(--border);}
.stat:last-child{border-right:none;}
.stat-n{font-family:var(--display);font-size:16px;font-weight:700;color:var(--text);}
.stat-l{font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.4px;font-weight:500;}
.edit-btn{width:100%;padding:9px;border-radius:var(--r-md);background:var(--surface);border:1px solid var(--border);color:var(--text-2);font-family:var(--body);font-size:13px;font-weight:500;cursor:pointer;transition:all 0.18s;}
.edit-btn:hover{background:var(--surface-hover);color:var(--text);border-color:var(--border-hover);}

/* FEED */
.feed{display:flex;flex-direction:column;gap:14px;}
.post{padding:20px;animation:up 0.4s ease both;}
@keyframes up{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
.ph{display:flex;align-items:center;gap:11px;margin-bottom:14px;}
.pu{flex:1;}
.pname{font-family:var(--display);font-size:13px;font-weight:700;color:var(--text);margin-bottom:1px;}
.ptime{font-size:11px;color:var(--text-3);}
.menu-btn{width:26px;height:26px;border-radius:var(--r-full);background:none;border:none;color:var(--text-3);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.15s;}
.menu-btn:hover{background:var(--surface-hover);color:var(--text-2);}
.pbody{font-size:13.5px;color:var(--text-2);line-height:1.72;margin-bottom:16px;}
.divider{height:1px;background:var(--border);margin-bottom:12px;}
.actions{display:flex;gap:2px;}
.act{display:flex;align-items:center;gap:6px;padding:7px 11px;border-radius:var(--r-sm);background:none;border:none;color:var(--text-2);font-family:var(--body);font-size:12px;font-weight:500;cursor:pointer;transition:all 0.15s;}
.act:hover{background:var(--surface-hover);color:var(--text);}
.act.liked{color:var(--primary);}
.act.liked:hover{background:var(--primary-dim);}

/* SUGGESTIONS */
.sugg{padding:20px;position:sticky;top:82px;height:fit-content;}
.sugg-title{font-family:var(--display);font-size:13px;font-weight:700;color:var(--text);margin-bottom:14px;letter-spacing:-0.1px;}
.sitem{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);}
.sitem:last-child{border-bottom:none;}
.sinfo{flex:1;min-width:0;}
.sname{font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.shandle{font-size:10px;color:var(--text-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.add-btn{padding:5px 11px;border-radius:var(--r-full);background:var(--primary);border:none;color:#fff;font-family:var(--body);font-size:11px;font-weight:600;cursor:pointer;transition:all 0.18s;white-space:nowrap;flex-shrink:0;}
.add-btn:hover{background:#ff5a85;box-shadow:0 0 18px var(--primary-glow);transform:translateY(-1px);}
.add-btn.ghost{background:var(--surface);color:var(--text-2);border:1px solid var(--border);}
.add-btn.ghost:hover{background:var(--surface-hover);box-shadow:none;transform:none;}
`;

const GRADS = [
  ['#FF3D71','#FF8A65'],['#A855F7','#6366F1'],['#0EA5E9','#06B6D4'],
  ['#10B981','#059669'],['#F59E0B','#EF4444'],['#EC4899','#8B5CF6'],
  ['#14B8A6','#3B82F6'],['#F97316','#EAB308'],
];

function Av({ name, size = 40, idx = 0 }) {
  const init = name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
  const [a, b] = GRADS[idx % GRADS.length];
  return (
    <div style={{width:size,height:size,borderRadius:'9999px',background:`linear-gradient(135deg,${a},${b})`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontSize:size*0.34,fontWeight:700,color:'#fff',flexShrink:0}}>
      {init}
    </div>
  );
}

const POSTS = [
  {id:1,user:'Jerome Stutely',time:'2 min ago',g:0,likes:192,comments:18,shares:17,text:"His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind."},
  {id:2,user:'Amye Goodlet',time:'14 min ago',g:1,likes:859,comments:3,shares:21,text:'He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect.'},
  {id:3,user:'Angelo Allflatt',time:'32 min ago',g:2,likes:1448,comments:29,shares:10,text:"Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. He scolded himself for not having prepared these better in advance."},
];

const PEOPLE = [
  {name:'Jerome Stutely',handle:'@1df19c3a',g:0,ghost:true},
  {name:'Amye Goodlet',handle:'@2d508d59',g:1,ghost:true},
  {name:'Angelo Allflatt',handle:'@02093421',g:2,ghost:true},
  {name:'Loreen Klem',handle:'@ff47598f',g:3,ghost:false},
  {name:'Wilmar Mac',handle:'@8d5d5048',g:4,ghost:false},
  {name:'Francyne Bo',handle:'@967874d0',g:5,ghost:false},
  {name:'Godiva MacA',handle:'@1653c2fc',g:6,ghost:false},
  {name:'Ranee Loftin',handle:'@c447e359',g:7,ghost:false},
];

function HeartIcon({filled}) {
  return <svg width="14" height="14" fill={filled?'currentColor':'none'} stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
}
function ChatIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
}
function ShareIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
}
function BellIcon() {
  return <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
}
function DotsIcon() {
  return <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>;
}

export default function FaceSnap() {
  const [tab, setTab] = useState('Feed');
  const [liked, setLiked] = useState({});
  const [added, setAdded] = useState({});

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
              {label:'Feed', icon:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>},
              {label:'Friends', icon:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85"/></svg>},
              {label:'Messages', icon:<ChatIcon />},
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

        {/* CONTENT */}
        <div className="layout">

          {/* PROFILE SIDEBAR */}
          <div className="card profile">
            <div className="avatar-ring">
              <div className="avatar-inner">G</div>
            </div>
            <div className="p-name">Ganesh</div>
            <div className="p-role">Photographer</div>
            <div className="p-bio">Lover of light and landscapes. Capturing moments one snap at a time.</div>
            <div className="stats">
              {[['97','Posts'],['1.2K','Followers'],['346','Following']].map(([n,l])=>(
                <div key={l} className="stat">
                  <span className="stat-n">{n}</span>
                  <span className="stat-l">{l}</span>
                </div>
              ))}
            </div>
            <button className="edit-btn">Edit Profile</button>
          </div>

          {/* FEED */}
          <div className="feed">
            {POSTS.map((p, i) => (
              <div key={p.id} className="card post" style={{animationDelay:`${i*0.09}s`}}>
                <div className="ph">
                  <Av name={p.user} size={38} idx={p.g} />
                  <div className="pu">
                    <div className="pname">{p.user}</div>
                    <div className="ptime">{p.time}</div>
                  </div>
                  <button className="menu-btn"><DotsIcon /></button>
                </div>
                <p className="pbody">{p.text}</p>
                <div className="divider" />
                <div className="actions">
                  <button className={`act ${liked[p.id]?'liked':''}`} onClick={()=>setLiked(l=>({...l,[p.id]:!l[p.id]}))}>
                    <HeartIcon filled={!!liked[p.id]} />
                    {liked[p.id] ? p.likes+1 : p.likes}
                  </button>
                  <button className="act"><ChatIcon />{p.comments}</button>
                  <button className="act"><ShareIcon />{p.shares}</button>
                </div>
              </div>
            ))}
          </div>

          {/* FRIEND SUGGESTIONS */}
          <div className="card sugg">
            <div className="sugg-title">People you may know</div>
            {PEOPLE.map((s,i) => {
              const isAdded = added[s.name];
              const isGhost = s.ghost;
              return (
                <div key={s.name} className="sitem">
                  <Av name={s.name} size={34} idx={s.g} />
                  <div className="sinfo">
                    <div className="sname">{s.name}</div>
                    <div className="shandle">{s.handle}</div>
                  </div>
                  <button
                    className={`add-btn ${isGhost || isAdded ? 'ghost' : ''}`}
                    onClick={() => !isGhost && setAdded(a=>({...a,[s.name]:!a[s.name]}))}
                  >
                    {isGhost ? 'Pending' : isAdded ? 'Sent ✓' : '+ Add'}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
