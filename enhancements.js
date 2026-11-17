// Local asset names: copy the supplied photographs into assets with these names.
const galleries={
 'Digit LED':['IP(2).jpeg','IP2(2).jpeg'],
 'PROTEOR USA':['stage(2).jpeg'],
 'Vision & faune':['projet p2ip reconnaisance danimaux par ia(2).PNG'],
 'Pochettes':['kickstarter pochette(2).jpeg','kisckstatret2(2).jpeg'],
 'LMRT':['projet1(2).PNG'],
 'Maitrecorbeau':['projetcollabMC(2).PNG','affiche concert(1).PNG','affiche concert 1(1).PNG','affiche concert 1 suite(1).PNG']
};
function assetImage(name,title){const img=new Image();img.src='assets/'+encodeURIComponent(name);img.alt=title;img.loading='lazy';img.onerror=()=>img.remove();return img}
function decorateCards(){document.querySelectorAll('.card').forEach(card=>{const title=card.querySelector('.card-meta span').textContent;const files=galleries[title];if(!files)return;const art=card.querySelector('.art');const img=assetImage(files[0],title);img.onload=()=>{art.querySelector('strong').hidden=true;art.classList.add('photographic')};art.prepend(img)})}
const baseRender=render;render=function(){baseRender();decorateCards()};
const baseOpen=openProject;openProject=function(p){baseOpen(p);const files=galleries[p.name]||[];const gallery=document.createElement('div');gallery.className='gallery';files.forEach(name=>gallery.append(assetImage(name,p.name)));$('modalmedia').prepend(gallery)};
const header=document.querySelector('header');let previousY=window.scrollY,travel=0,direction=0;
window.addEventListener('scroll',()=>{const y=Math.max(0,window.scrollY),delta=y-previousY,dir=Math.sign(delta);if(dir!==direction)travel=0;travel+=Math.abs(delta);if(y<90)header.classList.remove('nav-hidden');else if(travel>10)header.classList.toggle('nav-hidden',dir>0);previousY=y;direction=dir},{passive:true});
document.querySelector('.identity').addEventListener('click',e=>{e.preventDefault();$('detail').close();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});header.classList.remove('nav-hidden')});
header.addEventListener('focusin',()=>header.classList.remove('nav-hidden'));
decorateCards();
