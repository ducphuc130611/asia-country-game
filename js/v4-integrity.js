import {loadCountryMetadata} from './data/metadata.js';

const OWNER_FLAG_KEY='asia_country_owner_flags_v4';
const getFlags=()=>{try{return JSON.parse(localStorage.getItem(OWNER_FLAG_KEY)||'{}')}catch{return {}}};

// Keep the world database populated and refresh the visible database after metadata arrives.
loadCountryMetadata().then(()=>{
 const screen=document.getElementById('countriesScreen');
 if(screen?.classList.contains('active')&&typeof window.openCountries==='function')window.openCountries();
});

// Repair the America alias at the public database boundary.
const oldFilter=window.filterDB;
window.filterDB=function(value){return typeof oldFilter==='function'?oldFilter(value==='North America'||value==='South America'?'America':value):undefined};

// Wait for V4 runtime and the compatibility layer to finish loading, then make the public item bridge stable.
let tries=0;
const timer=setInterval(()=>{
 tries++;
 const real=window.__v4RealUse;
 if(typeof real==='function'){
  clearInterval(timer);
  window.__v4RuntimeUse=real;
 }
 if(tries>200)clearInterval(timer);
},50);

// Owner flags are runtime controls, not a second game system. This bridge guarantees they reach the live answer function.
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
