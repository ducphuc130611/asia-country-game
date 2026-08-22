import {ITEMS,SKINS,CHEST_PRICES,RARITIES,ACHIEVEMENTS,RULES,UPDATE_LOG,LEVEL_REWARDS,UPGRADES} from './data/content.js';
import {save,newProfile,normalize} from './core/storage.js';
import {countries,searchCountries} from './data/registry.js';

const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const getProfile=()=>{window.v4State=window.v4State||null;return null};

function hideScreens(){document.querySelectorAll('.screen').forEach(e=>e.classList.remove('active'));}
function activate(id){hideScreens();const e=$(id);if(e)e.classList.add('active');}
function profile(){activate('profileScreen');const q=window.__v4Profile?.()||null;if(!q)return;}

// Capture the state through the existing public save/profile path without touching the V3.5 data model.
function stateProfile(){
  try{
    const raw=localStorage.getItem('asia_country_game_v400');
    const parsed=raw?JSON.parse(raw):null;
    if(parsed?.profile)return normalize(parsed.profile);
  }catch{}
  return normalize(newProfile('Player'));
}
function persistProfile(q){try{const raw=localStorage.getItem('asia_country_game_v400');const data=raw?JSON.parse(raw):{};data.profile=q;localStorage.setItem('asia_country_game_v400',JSON.stringify(data));}catch{}}

// Prevent the old render->screen->render recursion. These renderers activate screens directly.
window.openShop=()=>renderShop();
window.openInventory=()=>renderInventory();
window.openAchievements=()=>renderAchievements();
window.openCountries=()=>renderCountries();
window.openRules=()=>renderRules();
window.openUpdates=()=>renderUpdates();
window.openProfileMenu=()=>renderProfile();
window.openInfo=()=>alert('Asia Country Guessing Game\nV4.0.0\nA country knowledge game built by ducphuc130611.');

function renderProfile(){
  activate('profileScreen');
  const q=stateProfile();
  const d=$('profileDetails');
  if(!d)return;
  d.innerHTML=`<div class="profile-grid"><div>👤 Name<b>${esc(q.name)}</b></div><div>📈 Level<b>${q.level}</b></div><div>✨ XP<b>${q.xp.toLocaleString()}</b></div><div>🪙 Coins<b>${q.coins.toLocaleString()}</b></div><div>🏆 Rating<b>${q.rating}</b></div><div>🎮 Games<b>${q.totalGames}</b></div><div>🎯 Correct<b>${q.totalCorrect}</b></div><div>🔥 Best Combo<b>${q.bestCombo}</b></div><div>🔥 Best Streak<b>${q.streakBest}</b></div><div>🌍 Countries<b>${q.discoveredCountries?.length||q.discovered||0}/${countries.length}</b></div><div>🏆 Achievements<b>${q.achievements.length}/${ACHIEVEMENTS.length}</b></div></div>`;
}
function renderShop(){
  activate('shopScreen');const q=stateProfile();
  $('shopCoins').textContent=q.coins.toLocaleString();
  $('shopItems').innerHTML=Object.entries(ITEMS).filter(([,x])=>!x.bossOnly).map(([n,x])=>`<article class="shop-item"><h3>${x.icon} ${esc(n)}</h3><p>${esc(x.desc)}</p><b>🪙 ${Number(x.price).toLocaleString()}</b><button onclick="window.v4SafeBuyItem('${esc(n)}')">Buy</button></article>`).join('');
  $('skinShop').innerHTML=Object.entries(SKINS).filter(([,x])=>!x.owner).map(([n,x])=>`<article class="shop-item"><h3>🎨 ${esc(n)}</h3><p>${esc(x.power||'')}</p><b>🪙 ${Number(x.price).toLocaleString()}</b><button onclick="window.v4SafeBuySkin('${esc(n)}')">${q.skins?.[n]?'Equip':'Buy'}</button></article>`).join('');
  $('chestShop').innerHTML=RARITIES.map(r=>`<article class="shop-item"><h3>🎁 ${r}</h3><p>Owned ×${q.chests?.[r]||0}</p><b>🪙 ${Number(CHEST_PRICES[r]).toLocaleString()}</b><button onclick="window.v4SafeBuyChest('${r}')">Buy</button><button onclick="window.v4SafeOpenChest('${r}')">Open</button></article>`).join('');
  $('upgradeShop').innerHTML=Object.entries(UPGRADES).map(([n,x])=>{const lv=q.upgrades?.[n]||0,price=Math.round(x.base*Math.pow(x.step,lv));return `<article class="shop-item"><h3>${x.icon||'⚙️'} ${esc(n)}</h3><p>${esc(x.desc)}</p><b>Level ${lv}/${x.max} · 🪙 ${price.toLocaleString()}</b><button onclick="window.v4SafeUpgrade('${esc(n)}')" ${lv>=x.max?'disabled':''}>${lv>=x.max?'MAX':'Upgrade'}</button></article>`}).join('');
}
function write(q){persistProfile(q);}
window.v4SafeBuyItem=n=>{const q=stateProfile(),x=ITEMS[n];if(!x||x.bossOnly)return;if(q.coins<x.price)return alert('Not enough coins');q.coins-=x.price;q.inventory[n]=(q.inventory[n]||0)+1;write(q);renderShop()};
window.v4SafeBuySkin=n=>{const q=stateProfile(),x=SKINS[n];if(!x)return;if(q.skins?.[n]){q.equippedSkin=n;write(q);return renderShop()}if(q.coins<x.price)return alert('Not enough coins');q.coins-=x.price;q.skins[n]=true;q.equippedSkin=n;write(q);renderShop()};
window.v4SafeBuyChest=r=>{const q=stateProfile();if(q.coins<CHEST_PRICES[r])return alert('Not enough coins');q.coins-=CHEST_PRICES[r];q.chests[r]=(q.chests[r]||0)+1;write(q);renderShop()};
window.v4SafeOpenChest=r=>{const q=stateProfile();if(!(q.chests?.[r]>0))return alert('No chest');q.chests[r]--;const pool=Object.entries(ITEMS).filter(([,x])=>!x.bossOnly);const count=r==='Cosmic'?5:r==='Transcendent'?3:r==='Divine'?2:1;const out=[];for(let i=0;i<count;i++){const [n,x]=pool[Math.floor(Math.random()*pool.length)];q.inventory[n]=(q.inventory[n]||0)+1;out.push(`${x.icon} ${n}`)}q.bestChestRarity=r;write(q);alert(`🎁 ${r} Chest\n\n${out.join('\n')}`);renderShop()};
window.v4SafeUpgrade=n=>{const q=stateProfile(),x=UPGRADES[n],lv=q.upgrades?.[n]||0,price=x?Math.round(x.base*Math.pow(x.step,lv)):Infinity;if(!x||lv>=x.max||q.coins<price)return alert('Cannot upgrade');q.coins-=price;q.upgrades[n]=lv+1;write(q);renderShop()};

function renderInventory(){activate('inventoryScreen');const q=stateProfile();$('inventoryList').innerHTML=Object.entries(ITEMS).map(([n,x])=>`<article class="inventory-card"><strong>${x.icon} ${esc(n)}</strong><small>${esc(x.desc)}</small><b>×${q.inventory?.[n]||0}</b></article>`).join('');}
function renderAchievements(){activate('achievementScreen');const q=stateProfile();$('achievementList').innerHTML=ACHIEVEMENTS.map(a=>`<article class="achievement-item ${q.achievements.includes(a.id)?'unlocked':''}"><h3>${esc(a.name)}</h3><p>${esc(a.desc)}</p><b>${q.achievements.includes(a.id)?'✅ Unlocked':'🔒 Locked'} · +${Number(a.reward).toLocaleString()} 🪙</b></article>`).join('');}
let filter='All',query='';
function renderCountries(){activate('countriesScreen');const q=stateProfile(),list=searchCountries(query,filter);$('countryCount').textContent=list.length;$('countryList').innerHTML=list.map(c=>`<article class="country-card"><h3>${esc(c.name)}</h3><p>🏛️ ${esc(c.capital)} · 💰 ${esc(c.currency)} · 🌐 ${esc(c.region)}</p><p>🌍 ${esc(c.continent)} · 👥 ${c.population?Number(c.population).toLocaleString():'Updating…'} · 📏 ${c.area?Number(c.area).toLocaleString()+' km²':'Updating…'}</p><p>🗣️ ${esc(c.languages||'Updating…')} · Mastery ${q.countryMastery?.[c.name]?.mastery||0}%</p></article>`).join('');}
window.searchDB=()=>{query=$('countrySearch')?.value||'';renderCountries()};window.filterDB=x=>{filter=x;renderCountries()};
function renderRules(){activate('rulesScreen');$('rulesContent').innerHTML=RULES.map(x=>`<li>${esc(x)}</li>`).join('');}
function renderUpdates(){activate('updatesScreen');$('updatesContent').innerHTML=UPDATE_LOG.map(u=>`<article class="update-entry"><h3>${esc(u.title)}</h3><ul>${u.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article>`).join('');}
window.goHome=()=>{activate('homeScreen');if(window.v4Home)window.v4Home()};
window.openStartGame=()=>{if(window.v4Modes)window.v4Modes();};
window.selectMode=m=>{if(m==='boss'){return window.v4Start('boss','hard')}if(m==='classic'){return window.v4Modes?window.v4Modes():null}return window.v4Select?window.v4Select(m):null};
window.startClassic=d=>window.v4Start('classic',d);
window.answerQuestion=i=>window.v4Answer(i);
window.useItem=n=>window.v4Use(n);
window.buyItem=n=>window.v4BuyItem(n);
window.buySkin=n=>window.v4BuySkin(n);
window.buyChest=n=>window.v4BuyChest(n);
window.openChest=n=>window.v4OpenChest(n);
window.upgrade=n=>window.v4Upgrade(n);
window.showShopTab=()=>{};
window.createProfile=()=>{};
