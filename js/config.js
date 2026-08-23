export const VERSION='4.0.0';
export const SAVE_KEY='asia_country_game_v400';
export const LEGACY_SAVE_KEYS=['asia_country_game_v355','asia_country_game_v35','asia_country_game_v30','asia_country_game_v25','asia_country_game_v20'];
export const OWNER_PASSWORD='OWNERV40';
export const RANKS=[
 {name:'Bronze',min:0,icon:'🥉'},
 {name:'Silver',min:1000,icon:'🥈'},
 {name:'Gold',min:1200,icon:'🥇'},
 {name:'Platinum',min:1400,icon:'💠'},
 {name:'Diamond',min:1600,icon:'💎'},
 {name:'Master',min:1800,icon:'👑'},
 {name:'Grandmaster',min:2000,icon:'🌟'},
 {name:'Cosmic',min:2300,icon:'🌌'}
];
export const DIFFICULTIES={
 easy:{name:'Easy',types:['capital']},
 normal:{name:'Normal',types:['capital','country','currency']},
 hard:{name:'Hard',types:['capital','country','currency','region','language']},
 extreme:{name:'Extreme',types:['capital','country','currency','region','language','population','area']},
 nightmare:{name:'Nightmare',types:['capital','country','currency','region','language','population','area','continent']}
};
export const MODES=['classic','survival','timeAttack','suddenDeath','endless','boss','daily','streak','hardcore','ranked'];
import('./v4-integrity.js').catch(err=>console.error('V4 integrity bootstrap failed:',err));
