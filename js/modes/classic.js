import {DIFFICULTIES} from '../config.js';
import {countries} from '../data/countries.js';

const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
export function makeQuestion(difficulty){
  const type=pick(DIFFICULTIES[difficulty].types); const c=pick(countries);
  const labels={capital:'Capital',country:'Country',currency:'Currency',region:'Region',population:'Population',area:'Area',languages:'Languages'};
  let answer=c[type]||'Unknown';
  if(type==='capital') answer=c.name; else if(type==='country') answer=c.capital;
  const pool=countries.filter(x=>x.name!==c.name).map(x=>type==='capital'?x.name:(x[type]||'Unknown'));
  const options=[answer,...shuffle([...new Set(pool)]).slice(0,3)];
  return {type,label:labels[type],prompt:type==='capital'?`What is the capital of ${c.name}?`:type==='country'?`Which country has ${c.capital} as its capital?`:`Which country matches this ${labels[type]} clue?`,value:type==='capital'||type==='country'?answer:c[type]||'Unknown',answer,options:shuffle(options),country:c};
}
export function runClassic(profile,difficulty,onFinish){return {profile,difficulty,questions:Array.from({length:10},()=>makeQuestion(difficulty)),onFinish};}
