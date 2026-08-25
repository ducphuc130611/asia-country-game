const SHOP_SECTIONS={items:'shopItems',skins:'skinShop',chests:'chestShop',upgrades:'upgradeShop'};
function showShopTab(tab='items'){
  Object.values(SHOP_SECTIONS).forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});
  const target=document.getElementById(SHOP_SECTIONS[tab]||SHOP_SECTIONS.items);
  if(target)target.style.display='grid';
  document.querySelectorAll('.shop-tabs button').forEach(btn=>{
    const active=btn.getAttribute('onclick')===`showShopTab('${tab}')`;
    btn.classList.toggle('active',active);
  });
}
function ensureDatabaseFilters(){
  const box=document.querySelector('.database-filters');
  if(!box)return;
  const wanted=[['All','All'],['Asia','🌏 Asia'],['Europe','🇪🇺 Europe'],['Africa','🌍 Africa'],['America','🌎 America'],['Oceania','🌊 Oceania']];
  wanted.forEach(([value,label])=>{
    if([...box.querySelectorAll('button')].some(b=>b.dataset.region===value))return;
    const b=document.createElement('button');b.dataset.region=value;b.textContent=label;b.onclick=()=>window.filterDB?.(value);box.appendChild(b);
  });
}
function applyV45UI(){
  document.querySelectorAll('#version,#footerVersion').forEach(e=>e.textContent='v4.5.0');
  ensureDatabaseFilters();
  if(typeof window.showShopTab==='function')window.showShopTab=showShopTab;
  showShopTab('items');
}
window.showShopTab=showShopTab;
window.addEventListener('load',()=>setTimeout(applyV45UI,0));
setTimeout(applyV45UI,250);
