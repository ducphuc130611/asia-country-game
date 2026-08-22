import {SAVE_KEY} from '../config.js';

const blank=()=>({name:'Guest',xp:0,coins:100,level:1,rating:1000,wins:0,losses:0,totalGames:0,totalCorrect:0,totalWrong:0,bestScore:0,bestCombo:0,bossesDefeated:0,achievements:[],inventory:{Hint:3,'Mega Hint':1,'Double XP':0,'Score Boost':0,'Second Chance':0,'Lucky Answer':0,'Extra Lives':0,'Time Freeze':0},skins:{Explorer:true},equippedSkin:'Explorer',chests:{Common:0,Rare:0,Epic:0,Legend:0,Mythic:0,Divine:0,Transcendent:0},stats:{classic:0,survival:0,timeAttack:0,suddenDeath:0,endless:0,boss:0,daily:0}});

export function load(){
  try{const d=JSON.parse(localStorage.getItem(SAVE_KEY)||'null'); if(d?.profile)return d;}
  catch(e){console.warn('Storage migration failed',e)}
  // One-time migration from the previous monolithic game.
  try{const old=JSON.parse(localStorage.getItem('asia_country_game_v30')||'null'); if(old?.profiles?.length){const p=old.profiles.find(x=>x.name===old.currentProfile)||old.profiles[0]; return {profile:normalize(p),token:null};}}
  catch(e){}
  return {profile:null,token:null};
}
export function normalize(p){const n=Object.assign(blank(),p||{}); n.inventory=Object.assign(blank().inventory,p?.inventory||{}); n.chests=Object.assign(blank().chests,p?.chests||{}); n.skins=Object.assign(blank().skins,p?.skins||{}); return n;}
export function save(state){localStorage.setItem(SAVE_KEY,JSON.stringify(state));}
export function newProfile(name){return normalize({name:name.trim().slice(0,20)||'Player'});}
