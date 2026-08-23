import {countries as allCountries} from './countries.js';
export const countries=allCountries;
const continentAliases={All:'All',Asia:'Asia',Europe:'Europe',Africa:'Africa',America:'America',Oceania:'Oceania','North America':'America','South America':'America'};
export function searchCountries(q='',continent='All'){
 q=q.trim().toLowerCase();
 const wanted=continentAliases[continent]||continent;
 return countries.filter(c=>{
  const cc=continentAliases[c.continent]||c.continent;
  const continentOK=wanted==='All'||cc===wanted;
  const text=`${c.name} ${c.capital} ${c.currency} ${c.region} ${c.languages}`.toLowerCase();
  return continentOK&&(!q||text.includes(q));
 });
}
