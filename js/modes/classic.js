import {DIFFICULTIES} from '../config.js';
import {countries} from '../data/countries.js';
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
const clean=v=>String(v??'').trim();
export function makeQuestion(difficulty){
 const types=DIFFICULTIES[difficulty]?.types||DIFFICULTIES.normal.types;const type=pick(types);const c=pick(countries);
 const labels={capital:'Capital',country:'Country',currency:'Currency',region:'Region',population:'Population',area:'Area',languages:'Languages'};const label=labels[type];
 let prompt,value,answer;
 if(type==='capital'){prompt=`What is the capital of ${c.name}?`;value=c.name;answer=c.name;}
 else if(type==='country'){prompt=`Which country has ${c.capital} as its capital?`;value=c.capital;answer=c.capital;}
 else {answer=c.name;prompt='Which country matches these clues?';const clues=[];if(type==='currency')clues.push(`Currency: ${c.currency}`);if(type==='region')clues.push(`Region: ${c.region}`,`Continent: ${c.continent}`);if(type==='population')clues.push(`Population: ${c.population||'Unknown'}`);if(type==='area')clues.push(`Area: ${c.area||'Unknown'} km²`);if(type==='languages')clues.push(`Languages: ${c.languages||'Unknown'}`);clues.push(`Capital: ${c.capital}`);value=clues.join(' • ');}
 const pool=countries.filter(x=>x.name!==c.name).map(x=>type==='capital'?x.name:type==='country'?x.capital:x.name);const options=shuffle([answer,...shuffle([...new Set(pool.filter(x=>clean(x)!==clean(answer)))]).slice(0,3)]);
 return {type,label,prompt,value,answer,options,country:c};
}
export function runClassic(profile,difficulty,onFinish){return {profile,difficulty,questions:Array.from({length:10},()=>makeQuestion(difficulty)),onFinish};}
