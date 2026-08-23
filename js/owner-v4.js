import { ITEMS, RARITIES, ACHIEVEMENTS } from './data/content.js';
import { countries } from './data/registry.js';
import { OWNER_PASSWORD, SAVE_KEY } from './config.js';
import { normalize } from './core/storage.js';

const FLAG_KEY='asia_country_owner_flags_v4';
let overlay=null, unlocked=sessionStorage.getItem('asia_owner_unlocked')==='1';
let gameplayTimer=null;

function readSave(){try{return JSON.parse(localStorage.getItem(SAVE_KEY)||'{}')}catch{return {}}}
function getProfile(){const data=readSave();return normalize(data.profile)}
function saveProfile(profile){const data=readSave();data.profile=profile;data.version='4.0.0';localStorage.setItem(SAVE_KEY,JSON.stringify(data))}
function toast(message){const e=document.getElementById('toast');if(e){e.textContent=message;e.classList.add('show');clearTimeout(window.__ownerToast);window.__ownerToast=setTimeout(()=>e.classList.remove('show'),2200)}else alert(message)}
function flags(){try{return JSON.parse(localStorage.getItem(FLAG_KEY)||'{}')}catch{return {}}}
function setFlag(id,value=true){const f=flags();f[id]=value;localStorage.setItem(FLAG_KEY,JSON.stringify(f));return f}
function promptNumber(label,current,integer=false){const v=Number(prompt(label,String(current)));if(!Number.isFinite(v)||v<0||(integer&&!Number.isInteger(v)))return null;return integer?Math.floor(v):v}

function correctAnswerIndex(){
 const type=document.getElementById('questionType')?.textContent?.trim()||'';
 const value=document.getElementById('questionValue')?.textContent?.trim()||'';
 const options=[...document.querySelectorAll('#answers .answer-button')].map(x=>x.textContent.trim());
 if(!options.length)return -1;
 let answer=null;
 if(type==='Capital'){const c=countries.find(x=>x.name===value);answer=c?.capital}
 else if(type==='Country'){const c=countries.find(x=>x.capital===value);answer=c?.name}
 else if(type==='Currency'){const c=countries.find(x=>x.name===value);answer=c?.currency}
 else if(type==='Region'){const name=value.split(' • ')[0];answer=countries.find(x=>x.name===name)?.region}
 else if(type==='Language'){const name=value.split(' • ')[0];answer=String(countries.find(x=>x.name===name)?.languages||'').split(',')[0].trim()}
 else if(type==='Population'){const raw=value.split(' people')[0].replace(/,/g,'');const n=Number(raw);answer=countries.find(x=>Number(x.population||0)===n)?.name}
 else if(type==='Area'){const raw=value.replace(/ km².*$/,'').replace(/,/g,'');const n=Number(raw);answer=countries.find(x=>Number(x.area||0)===n)?.name}
 else if(type==='Continent'){const c=countries.find(x=>x.name===value);answer=c?.continent}
 if(answer===null||answer===undefined)return -1;
 return options.findIndex(x=>String(x)===String(answer));
}

function ensureOwnerInventory(){
 const p=getProfile();
 for(const n of ['Second Chance','Lucky Answer','Streak Shield','Extra Lives'])p.inventory[n]=Math.max(p.inventory[n]||0,9999);
 saveProfile(p);
}

function installGameplayBridge(){
 if(window.__ownerV4Bridge)return;
 window.__ownerV4Bridge=true;
 const originalAnswer=window.v4Answer;
 const originalUse=window.v4Use;
 if(typeof originalAnswer==='function'){
  window.v4Answer=function(index){
   const f=flags();
   if(f.perfect||f.god){const i=correctAnswerIndex();if(i>=0)index=i;}
   if(f.skip){
    ensureOwnerInventory();
    if(typeof originalUse==='function'){originalUse('Lucky Answer');return;}
   }
   if(f.infiniteLives||f.god){
    ensureOwnerInventory();
    if(typeof originalUse==='function')originalUse('Second Chance');
   }
   if(f.infiniteCombo||f.god){const i=correctAnswerIndex();if(i>=0)index=i;}
   return originalAnswer(index);
  };
 }
 if(typeof originalUse==='function'){
  window.v4Use=function(name){
   const f=flags();
   if((f.god||f.infiniteLives)&&name==='Second Chance')ensureOwnerInventory();
   return originalUse(name);
  };
 }
 clearInterval(gameplayTimer);
 gameplayTimer=setInterval(()=>{
  const f=flags();
  const timer=document.getElementById('timer');
  if(timer&&(f.infiniteTime||f.god)){timer.textContent='∞';}
  if((f.infiniteLives||f.god)&&document.getElementById('gameScreen'))ensureOwnerInventory();
  if(f.revealAnswer||f.perfect||f.god){const i=correctAnswerIndex();const buttons=[...document.querySelectorAll('#answers .answer-button')];buttons.forEach((b,n)=>{if(n===i)b.dataset.ownerCorrect='1';b.style.outline=n===i?'3px solid gold':'';});}
 },250);
}

function tool(id){
 installGameplayBridge();
 const p=getProfile();
 if(id==='coins'){const v=promptNumber('Set coins',p.coins,true);if(v===null)return toast('Invalid coin value');p.coins=v;saveProfile(p);toast(`💰 Coins set to ${v.toLocaleString()}`);return}
 if(id==='xp'){const v=promptNumber('Set XP',p.xp,true);if(v===null)return toast('Invalid XP value');p.xp=v;p.level=Math.max(1,Math.floor(v/1000)+1);saveProfile(p);toast(`⭐ XP set to ${v.toLocaleString()}`);return}
 if(id==='level'){const v=promptNumber('Set level',p.level,true);if(v===null||v<1)return toast('Invalid level');p.level=v;p.xp=Math.max(p.xp,(v-1)*1000);saveProfile(p);toast(`📈 Level set to ${v}`);return}
 if(id==='elo'){const v=promptNumber('Set Elo / Rating',p.rating,true);if(v===null)return toast('Invalid rating');p.rating=v;saveProfile(p);toast(`🏆 Rating set to ${v}`);return}
 if(id==='achievements'){p.achievements=[...new Set(ACHIEVEMENTS.map(a=>a.id))];saveProfile(p);toast(`🏆 ${p.achievements.length} achievements unlocked`);return}
 if(id==='skin'){p.skins['👑 OWNER']=true;p.equippedSkin='👑 OWNER';saveProfile(p);toast('👑 Owner Skin equipped');return}
 if(id==='give'){for(const n of Object.keys(ITEMS))p.inventory[n]=(p.inventory[n]||0)+99;for(const r of RARITIES)p.chests[r]=(p.chests[r]||0)+10;p.skins.Cosmic=true;saveProfile(p);toast('🎁 99× items + 10× chests granted');return}
 if(id==='heal'){ensureOwnerInventory();setFlag('infiniteLives');toast('❤️ Infinite Lives enabled');return}
 if(id==='infinite'){setFlag('infiniteTime');toast('⏱️ Infinite Time enabled');return}
 if(id==='skip'){setFlag('skip');toast('⏭️ Skip Question enabled');return}
 if(id==='perfect'){setFlag('perfect');toast('🎯 Perfect Answer enabled');return}
 if(id==='kill'){setFlag('bossKill');toast('💀 Instant Boss Kill enabled');return}
 if(id==='lives'){ensureOwnerInventory();setFlag('infiniteLives');toast('❤️ Infinite Lives enabled');return}
 if(id==='combo'){setFlag('infiniteCombo');toast('🔥 Infinite Combo enabled');return}
 if(id==='knowledge'){setFlag('revealAnswer');toast('🧠 Reveal Answer enabled');return}
 if(id==='god'){ensureOwnerInventory();setFlag('god');setFlag('infiniteTime');setFlag('infiniteLives');setFlag('infiniteCombo');setFlag('perfect');toast('🛡️ God Mode enabled');return}
 if(id==='reset'){setFlag('resetQuestions');toast('🌍 Reset Questions enabled');return}
 if(id==='blessing'){setFlag('blessing');toast('👑 Owner Blessing enabled');return}
 if(id==='maxboss'){setFlag('bossHeal');toast('👹 Restore Boss HP enabled');return}
 if(typeof window.v4Use==='function'&&ITEMS[id]){window.v4Use(id);return}
 toast('Tool is not available in the current V4 runtime.');
}

function open(){
 if(!unlocked){const pass=prompt('OWNER PANEL PASSWORD');if(pass!==OWNER_PASSWORD)return toast('❌ Incorrect owner password');unlocked=true;sessionStorage.setItem('asia_owner_unlocked','1')}
 if(overlay){overlay.remove();overlay=null;return}
 installGameplayBridge();render();
}
function render(){
 if(overlay)overlay.remove();
 overlay=document.createElement('div');overlay.id='ownerOverlay';
 overlay.innerHTML=`<div class="owner-modal"><h2>👑 OWNER PANEL V4.0</h2><p>Private developer/testing tools.</p><div class="owner-grid">${[['infinite','⏱️ Infinite Time'],['skip','⏭️ Skip Question'],['perfect','🎯 Perfect Answer'],['kill','💀 Instant Boss Kill'],['lives','❤️ Infinite Lives'],['coins','💰 Set Coins'],['xp','⭐ Set XP'],['level','📈 Set Level'],['elo','🏆 Set Elo / Rating'],['achievements','🏆 Unlock All Achievements'],['combo','🔥 Infinite Combo'],['knowledge','🧠 Reveal Answer'],['god','🛡️ God Mode'],['reset','🌍 Reset Questions'],['blessing','👑 Reward Blessing'],['skin','🎨 Owner Skin'],['give','🎁 Give All Content'],['heal','❤️ Restore Lives'],['maxboss','👹 Restore Boss HP']].map(([id,label])=>`<button data-owner="${id}">${label}</button>`).join('')}</div><button class="secondary" id="ownerClose">Close</button></div>`;
 document.body.appendChild(overlay);
 overlay.querySelectorAll('[data-owner]').forEach(b=>b.onclick=()=>tool(b.dataset.owner));
 overlay.querySelector('#ownerClose').onclick=()=>{overlay.remove();overlay=null};
}
window.openOwnerPanel=open;
window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='o'&&!e.ctrlKey&&!e.altKey&&!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)){e.preventDefault();open()}});
installGameplayBridge();