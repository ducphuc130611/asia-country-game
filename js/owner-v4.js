import { ITEMS, RARITIES, SKINS, ACHIEVEMENTS } from './data/content.js';
import { OWNER_PASSWORD, SAVE_KEY } from './config.js';
import { normalize } from './core/storage.js';

function getProfile(){
  try{
    const data=JSON.parse(localStorage.getItem(SAVE_KEY)||'{}');
    return normalize(data.profile);
  }catch{return normalize(null)}
}
function saveProfile(profile){
  try{
    const data=JSON.parse(localStorage.getItem(SAVE_KEY)||'{}');
    data.profile=profile;
    data.version='4.0.0';
    localStorage.setItem(SAVE_KEY,JSON.stringify(data));
  }catch(e){console.error('Owner save failed',e)}
}
function toast(message){
  const e=document.getElementById('toast');
  if(e){e.textContent=message;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}else alert(message);
}
function promptNumber(label,current,integer=false){
  const v=Number(prompt(label,String(current)));
  if(!Number.isFinite(v)||v<0||(integer&&!Number.isInteger(v)))return null;
  return integer?Math.floor(v):v;
}
let overlay=null;
let unlocked=false;
function tool(id){
  const p=getProfile();
  if(id==='coins'){const v=promptNumber('Set coins',p.coins,true);if(v===null)return toast('Invalid coin value');p.coins=v}
  else if(id==='xp'){const v=promptNumber('Set XP',p.xp,true);if(v===null)return toast('Invalid XP value');p.xp=v;p.level=Math.max(1,Math.floor(v/1000)+1)}
  else if(id==='level'){const v=promptNumber('Set level',p.level,true);if(v===null||v<1)return toast('Invalid level');p.level=v;p.xp=Math.max(p.xp,(v-1)*1000)}
  else if(id==='elo'){const v=promptNumber('Set Elo / Rating',p.rating,true);if(v===null)return toast('Invalid rating');p.rating=v}
  else if(id==='achievements'){p.achievements=[...new Set(ACHIEVEMENTS.map(a=>a.id))];toast(`🏆 ${p.achievements.length} achievements unlocked`)}
  else if(id==='skin'){p.skins['👑 OWNER']=true;p.equippedSkin='👑 OWNER';toast('👑 Owner Skin equipped')}
  else if(id==='give'){for(const n of Object.keys(ITEMS))p.inventory[n]=(p.inventory[n]||0)+99;for(const r of RARITIES)p.chests[r]=(p.chests[r]||0)+10;p.skins.Cosmic=true;toast('🎁 Test inventory granted')}
  else if(id==='resetProfile'){if(!confirm('Reset the current V4 profile? This cannot be undone.'))return;localStorage.removeItem(SAVE_KEY);toast('♻️ V4 profile reset')}
  saveProfile(p);
  if(window.goHome)window.goHome();
}
function open(){
  if(!unlocked){const pass=prompt('OWNER PANEL PASSWORD');if(pass!==OWNER_PASSWORD)return toast('❌ Incorrect owner password');unlocked=true}
  if(overlay){overlay.remove();overlay=null;return}
  overlay=document.createElement('div');overlay.id='ownerOverlay';
  overlay.innerHTML=`<div class="owner-modal"><h2>👑 OWNER PANEL V4.0</h2><p>Developer/testing tools. Press O to close.</p><div class="owner-grid">${[['coins','💰 Set Coins'],['xp','⭐ Set XP'],['level','📈 Set Level'],['elo','🏆 Set Elo / Rating'],['achievements','🏆 Unlock All Achievements'],['skin','🎨 Owner Skin'],['give','🎁 Give All Content'],['resetProfile','♻️ Reset V4 Profile']].map(([id,label])=>`<button data-owner="${id}">${label}</button>`).join('')}</div><button class="secondary" id="ownerClose">Close</button></div>`;
  document.body.appendChild(overlay);
  overlay.querySelectorAll('[data-owner]').forEach(b=>b.onclick=()=>tool(b.dataset.owner));
  overlay.querySelector('#ownerClose').onclick=open;
}
window.openOwnerPanel=open;
window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='o'&&!e.ctrlKey&&!e.altKey)open()});
