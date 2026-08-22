import {countries as allCountries} from './countries.js';
export const countries=allCountries;
export function searchCountries(q='',continent='All'){
 q=q.trim().toLowerCase();
 return countries.filter(c=>(continent==='All'||c.continent===continent)&&(!q||`${c.name} ${c.capital} ${c.currency} ${c.region} ${c.languages}`.toLowerCase().includes(q)));
}
