import {api} from '../core/api.js';
export async function loadLeaderboard(metric='rating'){return api.leaderboard(metric);}
