import {API_BASE} from '../config.js';

async function request(path,options={}){const r=await fetch(API_BASE+path,{headers:{'Content-Type':'application/json',...(options.token?{Authorization:`Bearer ${options.token}`}:{})},...options,body:options.body?JSON.stringify(options.body):undefined}); const data=await r.json().catch(()=>({})); if(!r.ok)throw new Error(data.error||`HTTP ${r.status}`); return data;}
export const api={
  guest:(name)=>request('/auth/guest',{method:'POST',body:{name}}),
  me:(token)=>request('/me',{token}),
  progress:(token,xp,coins)=>request('/me/progress',{method:'POST',token,body:{xp,coins}}),
  leaderboard:(metric='rating')=>request(`/leaderboard?metric=${encodeURIComponent(metric)}`),
  match:(token)=>request('/pvp/match',{method:'POST',token}),
  result:(token,id,winner)=>request(`/pvp/${id}/result`,{method:'POST',token,body:{winner}})
};
