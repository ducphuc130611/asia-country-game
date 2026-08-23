import {RARITIES} from '../data/content.js';
import {load,save,normalize} from '../core/storage.js';

const OWNER_FLAG_KEY='asia_country_owner_flags_v4';
function ownerFlags(){try{return JSON.parse(localStorage.getItem(OWNER_FLAG_KEY)||'{}')}catch{return {}}}

export function fightBoss({makeQuestion,showGame,toast,sound,finishBoss}){
 const defs=[['Goblin Scout','Common',220,6,1],['Iron Beast','Rare',520,8,1.25],['Void Tyrant','Epic',1100,10,1.5],['Ancient King','Legend',1900,12,1.8],['Mythic Dragon','Mythic',3600,16,2.15],['Divine Seraph','Divine',6200,20,2.6],['Transcendent Tyrant','Transcendent',15000,25,3.5]];
 const b=defs[Math.floor(Math.random()*defs.length)];
 const state=load();const profile=normalize(state.profile||{});const flags=ownerFlags();
 const hasSlayer=(profile.inventory?.['Boss Slayer']||0)>0;
 const hasDamageBoost=(profile.bossDamageBoost===true);
 if(hasSlayer)profile.inventory['Boss Slayer']--;
 if(hasDamageBoost)profile.bossDamageBoost=false;
 if(hasSlayer||hasDamageBoost){state.profile=profile;save(state)}
 const g={mode:'boss',difficulty:'nightmare',index:0,score:0,xp:0,coins:0,lives:b[4]>=3?2:3,combo:0,owner:{god:!!flags.god,infiniteTime:!!(flags.infiniteTime||flags.god),infiniteCombo:!!(flags.infiniteCombo||flags.god),blessing:!!flags.blessing},boss:{name:b[0],rarity:b[1],maxHP:b[2],hp:b[2],power:b[4]},questions:Array.from({length:b[3]},()=>makeQuestion('nightmare')),bossDamageMult:hasDamageBoost?1.5:1,bossSlayer:hasSlayer,slayerUsed:false,slayerFlat:hasSlayer?20:0,skin:{time:0},used:{}};
 if(flags.bossKill)g.boss.hp=1;
 if(flags.bossHeal)g.boss.hp=g.boss.maxHP;
 if(flags.infiniteLives||flags.god)g.lives=9999;
 g.answer=a=>{
  const q=g.questions[g.index];
  if(g.used.skip||flags.skip){g.used.skip=false;a=q.answer;}
  if(flags.perfect||flags.god||flags.revealAnswer){a=q.answer;}
  if(a===q.answer){
   let dmg=Math.round((35+g.combo*7)*g.bossDamageMult);
   if(flags.bossKill){dmg=g.boss.hp;}
   if(g.bossSlayer&&!g.slayerUsed){dmg*=3;g.slayerUsed=true;toast(`⚔️ BOSS SLAYER STRIKE! ${dmg} damage!`)}else if(g.bossSlayer)dmg+=g.slayerFlat;
   g.boss.hp=Math.max(0,g.boss.hp-dmg);g.combo++;g.xp+=55;g.coins+=35;sound('damage');toast(`⚔️ ${dmg} damage!`);
   if(g.boss.hp<=0){
    const idx=RARITIES.indexOf(g.boss.rarity);let chest=RARITIES[Math.min(idx,6)];
    if(g.boss.rarity==='Transcendent'){const roll=Math.random();if(roll<0.01)chest='Cosmic';else if(roll<0.51)chest='Transcendent';else chest=Math.random()<.5?'Divine':'Mythic';}
    g.rewardChest=chest;g.specialItem=g.rewardChest==='Cosmic'?'Cosmic Shard':g.boss.rarity==='Divine'?'Divine Core':g.boss.rarity==='Mythic'?'Mythic Fang':'Boss Token';
    if(g.owner.blessing){g.xp*=10;g.coins*=10;}
    finishBoss(g);return;
   }
  }else{
   if(!g.owner.infiniteCombo)g.combo=0;
   if(!g.owner.god){g.lives--;sound('wrong');toast(`💥 Boss counterattack! ${g.lives} lives left.`);if(g.lives<=0)return finishBoss({...g,defeat:true,rewardChest:'Common',specialItem:'Boss Token',xp:0,coins:0});}
  }
  g.index++;if(g.index>=g.questions.length)g.questions.push(makeQuestion('nightmare'));showGame(g);
 };
 showGame(g);sound('boss');
}
