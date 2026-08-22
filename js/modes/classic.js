import {DIFFICULTIES} from '../config.js';
import {countries} from '../data/registry.js';
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
const clean=v=>String(v??'').trim();
const valueOf=(c,type)=>type==='capital'?c.name:type==='country'?c.capital:type==='currency'?c.currency:type==='region'?c.region:type==='language'?c.languages:type==='population'?c.population:type==='area'?c.area:type==='continent'?c.continent:c.name;
const labels={capital:'Capital',country:'Country',currency:'Currency',region:'Region',language:'Language',population:'Population',area:'Area',continent:'Continent'};
export function makeQuestion(difficulty='normal',forcedType=null){
 const types=DIFFICULTIES[difficulty]?.types||DIFFICULTIES.normal.types;let type=forcedType||pick(types);let c=pick(countries);
 if((type==='population'||type==='area'||type==='language')&&(!c.population&&!c.area&&type!=='language'||!c.languages)) c=pick(countries.filter(x=>x.population||x.area||x.languages));
 let prompt,value,answer;
 if(type==='capital'){prompt=`What is the capital of ${c.name}?`;value=c.name;answer=c.capital;}
 else if(type==='country'){prompt=`Which country has ${c.capital} as its capital?`;value=c.capital;answer=c.name;}
 else if(type==='currency'){prompt=`What is the currency of ${c.name}?`;value=c.name;answer=c.currency;}
 else if(type==='region'){prompt=`Which region is ${c.name} located in?`;value=`${c.name} • ${c.continent}`;answer=c.region;}
 else if(type==='language'){prompt=`Which language is associated with ${c.name}?`;value=`${c.name} • ${c.region}`;answer=String(c.languages||'Unknown').split(',')[0].trim();}
 else if(type==='population'){prompt=`Which country has this population?`;value=`${Number(c.population||0).toLocaleString()} people • ${c.continent}`;answer=c.name;}
 else if(type==='area'){prompt=`Which country has an area of about ${Number(c.area||0).toLocaleString()} km²?`;value=`Area clue • ${c.region}`;answer=c.name;}
 else {prompt=`Which continent is ${c.name} in?`;value=c.name;answer=c.continent;}
 const pool=countries.filter(x=>x.name!==c.name).map(x=>valueOf(x,type));
 const options=shuffle([answer,...shuffle([...new Set(pool.filter(x=>clean(x)!==clean(answer)))]).slice(0,3)]);
 return {type,label:labels[type]||type,prompt,value,answer,options,country:c};
}
export function runClassic(profile,difficulty,onFinish){return{profile,difficulty,questions:Array.from({length:10},()=>makeQuestion(difficulty)),onFinish};}
