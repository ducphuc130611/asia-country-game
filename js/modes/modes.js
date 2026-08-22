import {runClassic} from './classic.js';
export const modes=[
{id:'classic',icon:'🎯',name:'Classic Mode',description:'10 questions with Easy → Nightmare difficulty.'},
{id:'survival',icon:'❤️',name:'Survival Mode',description:'Keep answering until your lives run out.'},
{id:'timeAttack',icon:'⏱️',name:'Time Attack',description:'Race the clock for the highest score.'},
{id:'suddenDeath',icon:'💀',name:'Sudden Death',description:'One mistake ends the run.'},
{id:'endless',icon:'♾️',name:'Endless Mode',description:'No fixed question limit.'},
{id:'boss',icon:'👹',name:'Boss Mode',description:'Deal damage with correct answers and claim boss rewards.'},
{id:'daily',icon:'🎯',name:'Daily Challenge',description:'A rotating challenge shared by every player.'}
];
export function createMode(id,profile,difficulty='normal'){if(id==='classic')return runClassic(profile,difficulty);return {id,profile,difficulty};}
