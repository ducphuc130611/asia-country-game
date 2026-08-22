import {countries} from './countries.js';

// V4.1 HOTFIX: the game must never depend on a third-party browser API.
// GitHub Pages is a static origin and REST Countries v3.x does not allow
// browser requests from this origin. Metadata is therefore cache/static-first.
const CACHE_KEY='asia_country_metadata_v41';

function applyRecord(c,x){
 if(!x)return;
 if(Number(x.population)>0)c.population=Number(x.population);
 if(Number(x.area)>0)c.area=Number(x.area);
 if(x.languages)c.languages=Array.isArray(x.languages)?x.languages.join(', '):String(x.languages);
 if(x.flag)c.flag=x.flag;
 if(x.flags)c.flag=x.flags.svg||x.flags.png||c.flag||'';
 if(x.cca3)c.code=x.cca3;
 if(x.code)c.code=x.code;
 if(Array.isArray(x.borders))c.borders=x.borders;
 if(x.subregion)c.subregion=x.subregion;
}

function applyCache(){
 try{
  const cache=JSON.parse(localStorage.getItem(CACHE_KEY)||'{}');
  for(const c of countries){
   if(cache[c.name])applyRecord(c,cache[c.name]);
  }
 }catch(e){
  // Storage may be disabled/private. This must never stop the game.
 }
}

function saveCache(){
 try{
  const cache={};
  for(const c of countries){
   cache[c.name]={
    population:c.population,
    area:c.area,
    languages:c.languages,
    flag:c.flag,
    code:c.code,
    borders:c.borders,
    subregion:c.subregion
   };
  }
  localStorage.setItem(CACHE_KEY,JSON.stringify(cache));
 }catch(e){
  // Optional cache only; never fail gameplay.
 }
}

export async function enrichCountries(){
 // IMPORTANT: do not fetch restcountries.com from the browser.
 // That request is blocked by CORS and is not required to start the game.
 applyCache();
 saveCache();
 window.dispatchEvent(new CustomEvent('countryDataReady'));
}

enrichCountries();
