import {loadCountryMetadata} from './data/metadata.js';

const OWNER_FLAG_KEY='asia_country_owner_flags_v4';
const getFlags=()=>{try{return JSON.parse(localStorage.getItem(OWNER_FLAG_KEY)||'{}')}catch{return {}}};
const setFlag=(id,value=true)=>{const f=getFlags();f[id]=value;localStorage.setItem(OWNER_FLAG_KEY,JSON.stringify(f));return f};

loadCountryMetadata().then(()=>{
 const screen=document.getElementById('countriesScreen');
 if(screen?.classList.contains('active')&&typeof window.openCountries==='function')window.openCountries();
});

const oldFilter=window.filterDB;
window.filterDB=function(value){return typeof oldFilter==='function'?oldFilter(value==='North America'||value==='South America'?'America':value):undefined};

const publicClean=()=>{
 const banned=/(owner panel|owner password|ownerv40|developer\/testing)/i;
 for(const root of [document.getElementById('rulesContent'),document.getElementById('updatesContent')]){
  if(!root)continue;
  root.querySelectorAll('li,p,h1,h2,h3,h4').forEach(el=>{if(banned.test(el.textContent||''))el.remove()});
 }
};
let publicTries=0;
const publicTimer=setInterval(()=>{publicTries++;publicClean();if(publicTries>200)clearInterval(publicTimer)},50);

// Owner buttons are developer controls. Re-assert their runtime flags so the controls work even if module load order changes.
const ownerClick=e=>{
 const b=e.target.closest?.('#ownerOverlay [data-owner]');if(!b)return;
 const id=b.dataset.owner;
 if(id==='infinite')setFlag('infiniteTime');
 if(id==='skip')setFlag('skip');
 if(id==='perfect')setFlag('perfect');
 if(id==='kill')setFlag('bossKill');
 if(id==='lives'||id==='heal')setFlag('infiniteLives');
 if(id==='combo')setFlag('infiniteCombo');
 if(id==='knowledge')setFlag('revealAnswer');
 if(id==='god'){setFlag('god');setFlag('infiniteTime');setFlag('infiniteLives');setFlag('infiniteCombo');setFlag('perfect')}
 if(id==='reset')setFlag('resetQuestions');
 if(id==='blessing')setFlag('blessing');
 if(id==='maxboss')setFlag('bossHeal');
};
document.addEventListener('click',ownerClick,true);

let tries=0;
const timer=setInterval(()=>{
 tries++;
 const real=window.__v4RealUse;
 if(typeof real==='function'){clearInterval(timer);window.__v4RuntimeUse=real}
 if(tries>200)clearInterval(timer);
},50);

// Keep infinite-time Owner mode alive by automatically answering correctly before the normal timer can expire.
let answerTries=0;
const answerTimer=setInterval(()=>{
 answerTries++;
 const answer=window.v4Answer;
 if(typeof answer==='function'&&!answer.__integrityWrapped){
  const wrapped=function(index){
   const f=getFlags();
   if(f.perfect||f.god||f.infiniteCombo||f.skip){
    const buttons=[...document.querySelectorAll('#answers .answer-button')];
    const correct=buttons.findIndex(b=>b.dataset.ownerCorrect==='1');
    if(correct>=0)index=correct;
   }
   return answer(index);
  };
  wrapped.__integrityWrapped=true;
  window.v4Answer=wrapped;
  clearInterval(answerTimer);
 }
 if(answerTries>200)clearInterval(answerTimer);
},50);

setInterval(()=>{
 const f=getFlags();
 if(!(f.infiniteTime||f.god))return;
 const timerEl=document.getElementById('timer');
 const buttons=[...document.querySelectorAll('#answers .answer-button')];
 const correct=buttons.findIndex(b=>b.dataset.ownerCorrect==='1');
 if(timerEl){const n=Number(timerEl.textContent);timerEl.textContent='∞';if(Number.isFinite(n)&&n<=1&&correct>=0&&typeof window.v4Answer==='function')window.v4Answer(correct)}
},100);
