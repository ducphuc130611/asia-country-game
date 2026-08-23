import {countries} from './countries.js';

const API='https://restcountries.com/v3.1/all?fields=name,capital,population,area,languages,region,subregion,continents,cca3';
const CACHE='asia_country_metadata_v4';
const aliases={
 'cape verde':'Cabo Verde','czechia':'Czechia','eswatini':'Eswatini','micronesia':'Micronesia','south korea':'South Korea','north korea':'North Korea','russia':'Russia','turkey':'Türkiye','vietnam':'Vietnam','laos':'Laos','moldova':'Moldova','bolivia':'Bolivia','venezuela':'Venezuela','tanzania':'Tanzania','brunei':'Brunei','palestine':'Palestine','syria':'Syria','iran':'Iran','taiwan':'Taiwan'
};
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
function apply(data){
 const map=new Map();
 for(const x of data||[]){
  const official=x?.name?.common||x?.name?.official||'';
  map.set(norm(official),x);map.set(norm(x?.name?.official||''),x);
 }
 for(const c of countries){
  const target=aliases[c.name.toLowerCase()]||c.name;
  const x=map.get(norm(target))||map.get(norm(c.name));
  if(!x)continue;
  c.population=Number(x.population)||0;
  c.area=Number(x.area)||0;
  c.languages=x.languages?Object.values(x.languages).join(', '):'Unknown';
  if(x.region)c.worldRegion=x.region;
  if(x.subregion)c.worldSubregion=x.subregion;
  if(Array.isArray(x.continents)&&x.continents[0])c.worldContinent=x.continents[0];
  c.cca3=x.cca3||c.cca3;
 }
 return countries;
}
export function loadCountryMetadata(){
 try{const cached=JSON.parse(localStorage.getItem(CACHE)||'null');if(Array.isArray(cached)&&cached.length)apply(cached)}catch{}
 return fetch(API,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`metadata HTTP ${r.status}`);return r.json()}).then(data=>{apply(data);try{localStorage.setItem(CACHE,JSON.stringify(data))}catch{};return countries}).catch(()=>countries);
}
