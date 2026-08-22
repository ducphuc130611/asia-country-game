import {ITEMS,RARITIES,SKINS} from '../data/content.js';
import {OWNER_PASSWORD} from '../config.js';
export function initOwnerPanel({getGame,profile,persist,renderGame,makeQuestion,toast,finishBoss}){
 let overlay=null,unlocked=false;
 const tool=id=>{const p=profile(),g=getGame();if(!g&&!['coins','xp','skin','give','resetProfile'].includes(id))return toast('Start a game first.');
  if(id==='infinite'){g.owner.infiniteTime=true;toast('⏱️ Infinite time active')}
  if(id==='skip'){g.used.skip=true;toast('⏭️ Question skip armed')}
  if(id==='perfect'){if(g.mode==='boss'){g.used.skip=true;g.answer(g.questions[g.index].answer);return;}g.combo++;g.score+=100+g.combo*10;g.xp+=25;g.coins+=10;g.index++;renderGame();toast('🎯 Perfect Answer executed')}
  if(id==='kill'){if(g.mode!=='boss')return toast('Boss Kill only works in Boss Mode.');g.boss.hp=0;g.rewardChest='Transcendent';g.specialItem='Cosmic Shard';finishBoss(g);return}
  if(id==='lives')g.owner.god=true;
  if(id==='coins'){p.coins+=1000000;persist();toast('💰 +1,000,000 coins')}
  if(id==='xp'){p.xp+=1000000;p.level=Math.floor(p.xp/1000)+1;persist();toast('⭐ +1,000,000 XP')}
  if(id==='combo'){g.owner.infiniteCombo=true;g.combo=999999;toast('🔥 Infinite combo')}
  if(id==='knowledge'){toast(`🧠 Answer: ${g.questions[g.index].answer}`)}
  if(id==='god'){g.owner.god=true;g.owner.infiniteTime=true;g.owner.infiniteCombo=true;toast('🛡️ God Mode active')}
  if(id==='reset'){g.questions=Array.from({length:g.questions.length},()=>makeQuestion(g.difficulty));g.index=0;toast('🌍 Question set reset');renderGame()}
  if(id==='blessing'){g.owner.blessing=true;toast('👑 Owner Blessing ×10')}
  if(id==='skin'){p.skins['👑 OWNER']=true;p.equippedSkin='👑 OWNER';persist();if(g)g.skin=SKINS['👑 OWNER'];toast('👑 Owner Skin equipped')}
  if(id==='give'){for(const n of Object.keys(ITEMS))p.inventory[n]=(p.inventory[n]||0)+99;for(const r of RARITIES)p.chests[r]=(p.chests[r]||0)+10;p.skins.Cosmic=true;persist();toast('🎁 Test inventory granted')}
  if(id==='heal'){g.lives=5;toast('❤️ Boss/player lives restored')}
  if(id==='maxboss'){if(g.mode!=='boss')return toast('Boss only.');g.boss.hp=g.boss.maxHP;toast('👹 Boss HP restored')}
  renderGame();
 };
 function open(){if(!unlocked)return unlock();if(overlay){overlay.remove();overlay=null;return;}overlay=document.createElement('div');overlay.id='ownerOverlay';overlay.innerHTML=`<div class="owner-modal"><h2>👑 OWNER PANEL v4.0</h2><p>Developer tools unlocked. Press O to close.</p><div class="owner-grid">${[['infinite','⏱️ Infinite Time'],['skip','⏭️ Skip Question'],['perfect','🎯 Perfect Answer'],['kill','💀 Instant Boss Kill'],['lives','❤️ Infinite Lives'],['coins','💰 Coin Storm'],['xp','⭐ XP Storm'],['combo','🔥 Infinite Combo'],['knowledge','🧠 Reveal Answer'],['god','🛡️ God Mode'],['reset','🌍 Reset Questions'],['blessing','👑 Reward Blessing'],['skin','🎨 Owner Skin'],['give','🎁 Give All Content'],['heal','❤️ Restore Lives'],['maxboss','👹 Restore Boss HP']].map(([id,label])=>`<button data-owner="${id}">${label}</button>`).join('')}</div><button class="secondary" id="ownerClose">Close</button></div>`;document.body.appendChild(overlay);overlay.querySelectorAll('[data-owner]').forEach(b=>b.onclick=()=>tool(b.dataset.owner));overlay.querySelector('#ownerClose').onclick=open;}
 function unlock(){const p=prompt('OWNER PANEL PASSWORD');if(p!==OWNER_PASSWORD)return toast('❌ Incorrect owner password');unlocked=true;open();}
 window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='o'&&!e.ctrlKey&&!e.altKey)open()});return{open,tool};
}
