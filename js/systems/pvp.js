import {api} from '../core/api.js';
export async function findMatch(token){return api.match(token);}
export async function submitResult(token,matchId,winnerId){return api.result(token,matchId,winnerId);}
