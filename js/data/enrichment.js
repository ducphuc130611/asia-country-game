import {countries} from './countries.js';
const aliases={'United States of America':'United States','Czech Republic':'Czechia','Türkiye':'Turkey','Russian Federation':'Russia','Republic of Korea':'South Korea','Korea, Republic of':'South Korea','Viet Nam':'Vietnam','Lao People’s Democratic Republic':'Laos','Moldova':'Moldova'};
export async function enrichCountries(){
 try{
  const r=await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,region,subregion,population,area,languages,flags,cca3,borders');
  if(!r.ok)throw new Error(`HTTP ${r.status}`);const data=await r.json();
  const byName=new Map();for(const x of data){const n=String(x.name?.common||'');byName.set(n.toLowerCase(),x);}
  for(const c of countries){const x=byName.get((aliases[c.name]||c.name).toLowerCase());if(!x)continue;c.population=Number(x.population||0);c.area=Number(x.area||0);c.languages=x.languages?Object.values(x.languages).join(', '):'Unknown';c.flag=x.flags?.svg||x.flags?.png||'';c.code=x.cca3||'';c.borders=x.borders||[];c.subregion=x.subregion||c.region;}
  window.dispatchEvent(new CustomEvent('countryDataReady'));
 }catch(e){console.warn('Country metadata enrichment unavailable',e);window.dispatchEvent(new CustomEvent('countryDataReady'))}
}
enrichCountries();
