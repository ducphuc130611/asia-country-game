import {countries} from './countries.js';
const aliases={'United States of America':'United States','Czech Republic':'Czechia','Türkiye':'Turkey','Russian Federation':'Russia','Republic of Korea':'South Korea','Korea, Republic of':'South Korea','Viet Nam':'Vietnam','Lao People’s Democratic Republic':'Laos','Moldova':'Moldova'};
const CACHE_KEY='asia_country_metadata_v41';
function applyRecord(c,x){
 if(!x)return;
 if(Number(x.population)>0)c.population=Number(x.population);
 if(Number(x.area)>0)c.area=Number(x.area);
 if(x.languages)c.languages=Object.values(x.languages).join(', ');
 if(x.flags)c.flag=x.flags.svg||x.flags.png||c.flag||'';
 c.code=x.cca3||c.code||'';
 c.borders=x.borders||c.borders||[];
 c.subregion=x.subregion||c.subregion||c.region;
}
function applyCache(){
 try{
  const cache=JSON.parse(localStorage.getItem(CACHE_KEY)||'{}');
  for(const c of countries)if(cache[c.name])applyRecord(c,cache[c.name]);
 }catch(e){console.warn('Country metadata cache unavailable',e)}
}
function saveCache(){
 try{
  const cache={};
  for(const c of countries)cache[c.name]={population:c.population,area:c.area,languages:c.languages,flag:c.flag,code:c.code,borders:c.borders,subregion:c.subregion};
  localStorage.setItem(CACHE_KEY,JSON.stringify(cache));
 }catch(e){console.warn('Country metadata cache save failed',e)}
}
export async function enrichCountries(){
 applyCache();
 try{
  const r=await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,region,subregion,population,area,languages,flags,cca3,borders');
  if(!r.ok)throw new Error(`HTTP ${r.status}`);
  const data=await r.json();const byName=new Map();
  for(const x of data){const n=String(x.name?.common||'');if(n)byName.set(n.toLowerCase(),x)}
  for(const c of countries){const x=byName.get((aliases[c.name]||c.name).toLowerCase());if(x)applyRecord(c,x)}
  saveCache();
 }catch(e){console.warn('Country metadata enrichment unavailable; using cached/static values',e)}
 window.dispatchEvent(new CustomEvent('countryDataReady'));
}
enrichCountries();
