import {countries} from './countries.js';

const BASE='https://api.restcountries.com/countries/v5';
const DEMO_KEY='rc_live_demo';
const CACHE='asia_country_metadata_v4';
const aliases={
 'cape verde':'Cabo Verde','turkey':'Türkiye','south korea':'South Korea','north korea':'North Korea','russia':'Russia','vietnam':'Vietnam','laos':'Laos','moldova':'Moldova','bolivia':'Bolivia','venezuela':'Venezuela','tanzania':'Tanzania','brunei':'Brunei','palestine':'Palestine','syria':'Syria','iran':'Iran','taiwan':'Taiwan','czechia':'Czechia'
};
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
function apply(data){
 const map=new Map();
 for(const x of data||[]){
  const common=x?.names?.common||'';const official=x?.names?.official||'';
  map.set(norm(common),x);map.set(norm(official),x);
 }
 for(const c of countries){
  const target=aliases[c.name.toLowerCase()]||c.name;
  const x=map.get(norm(target))||map.get(norm(c.name));
  if(!x)continue;
  c.population=Number(x.population)||0;
  c.area=Number(x.area?.kilometers)||0;
  c.languages=Array.isArray(x.languages)?x.languages.map(v=>v.name||v).join(', '):'Unknown';
  if(x.region)c.worldRegion=x.region;
  if(x.subregion)c.worldSubregion=x.subregion;
  if(Array.isArray(x.continents)&&x.continents[0])c.worldContinent=x.continents[0];
  if(x.codes?.alpha_3)c.cca3=x.codes.alpha_3;
 }
 return countries;
}
async function fetchPage(offset){
 const url=`${BASE}?limit=100&offset=${offset}&response_fields=names,codes,region,subregion,continents,area,population,languages`;
 const r=await fetch(url,{cache:'no-store',headers:{Authorization:`Bearer ${DEMO_KEY}`}});
 if(!r.ok)throw new Error(`metadata HTTP ${r.status}`);
 const json=await r.json();
 return json?.data?.objects||[];
}
export async function loadCountryMetadata(){
 try{const cached=JSON.parse(localStorage.getItem(CACHE)||'null');if(Array.isArray(cached)&&cached.length)apply(cached)}catch{}
 try{
  const pages=await Promise.all([fetchPage(0),fetchPage(100),fetchPage(200)]);
  const data=pages.flat().filter(Boolean);
  if(data.length){apply(data);try{localStorage.setItem(CACHE,JSON.stringify(data))}catch{}}
 }catch{}
 return countries;
}
