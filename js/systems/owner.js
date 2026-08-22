import {ITEMS,RARITIES,SKINS,ACHIEVEMENTS} from '../data/content.js';
import {OWNER_PASSWORD} from '../config.js';
export function initOwnerPanel({getGame,profile,persist,renderGame,makeQuestion,toast,finishBoss}){
 let overlay=null,unlocked=false;
 const tool=id=>{
  const p=profile(),g=getGame();
  if(!g&&!['coins','xp','level','elo','achievements','skin','give','resetProfile'].includes(id))return toast('Start a game first.');
  if(id==='infinite'){g.owner.infiniteTime=true;toast('⏱️ Infinite time active')}
  if(id==='skip'){g.used.skip=true;toast('⏭️ Question skip armed')}
  if(id==='perfect'){if(g.mode==='boss'){g.used.skip=true;g.answer(g.questions[g.index].answer);return;}g.combo++;g.score+=100+g.combo*10;g.xp+=25;g.coins+=10;g.index++;renderGame();toast('🎯 Perfect Answer executed')}
  if(id==='kill'){if(g.mode!=='boss')return toast('Boss Kill only works in Boss Mode.');g.boss.hp=0;g.rewardChest='Transcendent';g.specialItem='Cosmic Shard';finishBoss(g);return}
  if(id==='lives')g.owner.god=true;
  if(id==='coins'){const v=Number(prompt('Set coins:',String(p.coins)));if(!Number.isFinite(v)||v<0)return toast('❌ Invalid coin value');p.coins=Math.floor(v);persist();toast(`💰 Coins set to ${p.coins.toLocaleString()}`)}
  if(id==='xp'){const v=Number(prompt('Set XP:',String(p.xp)));if(!Number.isFinite(v)||v<0)return toast('❌ Invalid XP value');p.xp=Math.floor(v);p.level=Math.max(1,Math.floor(p.xp/1000)+1);persist();toast(`⭐ XP set to ${p.xp.toLocaleString()}`)}
  if(id==='level'){const v=Number(prompt('Set level:',String(p.level)));if(!Number.isInteger(v)||v<1)return toast('❌ Invalid level');p.level=v;p.xp=Math.max(p.xp,(v-1)*1000);persist();toast(`📈 Level set to ${p.level}`)}
  if(id==='elo'){const v=Number(prompt('Set Elo / Rating:',String(p.rating)));if(!Number.isInteger(v)||v<0)return toast('❌ Invalid Elo');p.rating=v;persist();toast(`🏆 Elo set to ${p.rating}`)}
  if(id==='achievements'){p.achievements=[...new Set(ACHIEVEMENTS.map(a=>a.id))];persist();toast(`🏆 All ${p.achievements.length} achievements unlocked`)}
  if(id==='combo')g.owner.infiniteCombo=true,g.combo=999999,toast('🔥 Infinite combo');
  if(id==='knowledge')toast(`🧠 Answer: ${g.questions[g.index].answer}`);
  if(id==='god')g.owner.god=true,g.owner.infiniteTime=true,g.owner.infiniteCombo=true,toast('🛡️ God Mode active');
  if(id==='reset'){g.questions=Array.from({length:g.questions.length},()=>makeQuestion(g.difficulty));g.index=0;toast('🌍 Question set reset');renderGame()}
  if(id==='blessing')g.owner.blessing=true,toast('👑 Owner Blessing ×10');
  if(id==='skin'){p.skins['👑 OWNER']=true;p.equippedSkin='👑 OWNER';persist();if(g)g.skin=SKINS['👑 OWNER'];toast('👑 Owner Skin equipped')}
  if(id==='give'){for(const n of Object.keys(ITEMS))p.inventory[n]=(p.inventory[n]||0)+99;for(const r of RARITIES)p.chests[r]=(p.chests[r]||0)+10;p.skins.Cosmic=true;persist();toast('🎁 Test inventory granted')}
  if(id==='heal')g.lives=5,toast('❤️ Boss/player lives restored');
  if(id==='maxboss'){if(g.mode!=='boss')return toast('Boss only.');g.boss.hp=g.boss.maxHP;toast('👹 Boss HP restored')}
  if(g)renderGame();
 };
 function open(){if(!unlocked)return unlock();if(overlay){overlay.remove();overlay=null;return;}overlay=document.createElement('div');overlay.id='ownerOverlay';overlay.innerHTML=`<div class="owner-modal"><h2>👑 OWNER PANEL v4.1</h2><p>Developer tools unlocked. Press O to close.</p><div class="owner-grid">${[['infinite','⏱️ Infinite Time'],['skip','⏭️ Skip Question'],['perfect','🎯 Perfect Answer'],['kill','💀 Instant Boss Kill'],['lives','❤️ Infinite Lives'],['coins','💰 Set Coins'],['xp','⭐ Set XP'],['level','📈 Set Level'],['elo','🏆 Set Elo / Rating'],['achievements','🏆 Unlock All Achievements'],['combo','🔥 Infinite Combo'],['knowledge','🧠 Reveal Answer'],['god','🛡️ God Mode'],['reset','🌍 Reset Questions'],['blessing','👑 Reward Blessing'],['skin','🎨 Owner Skin'],['give','🎁 Give All Content'],['heal','❤️ Restore Lives'],['maxboss','👹 Restore Boss HP']].map(([id,label])=>`<button data-owner="${id}">${label}</button>`).join('')}</div><button class="secondary" id="ownerClose">Close</button></div>`;document.body.appendChild(overlay);overlay.querySelectorAll('[data-owner]').forEach(b=>b.onclick=()=>tool(b.dataset.owner));overlay.querySelector('#ownerClose').onclick=open;}
 function unlock(){const pass=prompt('OWNER PANEL PASSWORD');if(pass!==OWNER_PASSWORD)return toast('❌ Incorrect owner password');unlocked=true;open();}
 window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='o'&&!e.ctrlKey&&!e.altKey)open()});return{open,tool};
}