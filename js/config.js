export const VERSION='4.0.0';
export const API_BASE=(window.GAME_API_BASE||'http://localhost:3000/api').replace(/\/$/,'');
export const SAVE_KEY='asia_country_game_v40';
export const DIFFICULTIES={easy:{name:'Easy',types:['capital']},normal:{name:'Normal',types:['capital','country']},hard:{name:'Hard',types:['capital','country','currency','region']},extreme:{name:'Extreme',types:['capital','country','currency','region','population','area']},nightmare:{name:'Nightmare',types:['capital','country','currency','region','population','area','languages']}};
export const MODES=['classic','survival','timeAttack','suddenDeath','endless','boss','daily'];
