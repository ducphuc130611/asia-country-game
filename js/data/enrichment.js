import {countries} from './countries.js';
export async function enrichCountries(){
  try{
    const r=await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,region,population,area,languages');
    if(!r.ok)return;
    const data=await r.json();
    const byName=new Map(data.map(x=>[String(x.name?.common||'').toLowerCase(),x]));
    for(const c of countries){
      const x=byName.get(c.name.toLowerCase());
      if(!x)continue;
      c.population=Number(x.population||0);c.area=Number(x.area||0);c.languages=x.languages?Object.values(x.languages).join(', '):'Unknown';
    }
    window.dispatchEvent(new CustomEvent('countryDataReady'));
  }catch(e){console.warn('Country metadata enrichment unavailable',e)}
}
enrichCountries();
