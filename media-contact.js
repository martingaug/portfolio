galleries['UnluckyBoysConsecrations']=['WhatsApp Image 2026-11-17 at 14.53.08.jpeg'];
galleries['Studio sessions']=['WhatsApp Image 2026-11-17 at 14.53.18.jpeg','WhatsApp Image 2026-11-17 at 14.53.08 (1).jpeg'];
const labelProject=projects.find(p=>p.name==='UnluckyBoysConsecrations');
labelProject.text=['J’ai fondé UnluckyBoysConsecrations, un label indépendant qui réunit les artistes Maitrecorbeau, Ephee, 9misa et Belamy. Un espace pour accompagner leurs projets et développer leurs univers musicaux.','I founded UnluckyBoysConsecrations, an independent label bringing together Maitrecorbeau, Ephee, 9misa and Belamy. A space to support their projects and develop their musical worlds.'];
labelProject.links=[['Maitrecorbeau · Spotify','https://open.spotify.com/artist/6FqdkyYVCgDgUapvwBF2gv'],['Spotify · Artiste du label / Label artist','https://open.spotify.com/artist/2tHnqbEwUTgMIHmSfsuklc']];
labelProject.links.unshift(['Instagram @unluckyboysconsecrations','https://www.instagram.com/unluckyboysconsecrations/?hl=fr']);
const maitrecorbeauProject = projects.find(project => project.name === 'Maitrecorbeau');
maitrecorbeauProject.links.unshift(['Instagram @maitrecorbeau_','https://www.instagram.com/maitrecorbeau_/?hl=fr']);
const mediaOpen=openProject;
openProject=function(p){mediaOpen(p);if(p.name==='Studio sessions'){
 const videos=document.createElement('div');videos.className='studio-videos';
 ['WhatsApp Video 2026-11-17 at 14.53.10.mp4','WhatsApp Video 2026-11-17 at 14.53.17.mp4'].forEach((name,i)=>{const figure=document.createElement('figure');const v=document.createElement('video');v.src='assets/'+encodeURIComponent(name);v.controls=true;v.playsInline=true;v.preload='metadata';v.setAttribute('aria-label',(lang==='fr'?'Session studio ':'Studio session ')+(i+1));figure.append(v);videos.append(figure)});$('modalmedia').prepend(videos);
}};
$('detail').addEventListener('close',()=>{$('detail').querySelectorAll('video').forEach(v=>v.pause())});
const cv=document.createElement('a');cv.className='cv-link';cv.href='assets/CV-Martin-Gaugue.pdf';cv.target='_blank';cv.rel='noopener';document.querySelector('.about').append(cv);
const contact=document.createElement('dialog');contact.id='contact-dialog';document.body.append(contact);
function showContact(e){e.preventDefault();contact.innerHTML=`<button class="contact-close" aria-label="${lang==='fr'?'Fermer':'Close'}">✕</button><h2>${lang==='fr'?'Parlons de votre projet.':'Let’s talk about your project.'}</h2><p>${lang==='fr'?'Contactez-moi par e-mail :':'Contact me by email:'}</p><input readonly aria-label="Email" value="martin.gaugue@gmail.com"><div class="contact-actions"><a href="mailto:martin.gaugue@gmail.com">${lang==='fr'?'Ouvrir ma messagerie':'Open email app'} ↗</a><a target="_blank" rel="noopener" href="https://mail.google.com/mail/?view=cm&fs=1&to=martin.gaugue%40gmail.com">Gmail ↗</a><button id="copy-email">${lang==='fr'?'Copier l’adresse':'Copy email'}</button></div><p id="copy-status" role="status"></p>`;contact.querySelector('.contact-close').onclick=()=>contact.close();contact.querySelector('#copy-email').onclick=async()=>{try{await navigator.clipboard.writeText('martin.gaugue@gmail.com');contact.querySelector('#copy-status').textContent=lang==='fr'?'Adresse copiée !':'Email copied!'}catch{const input=contact.querySelector('input');input.focus();input.select();contact.querySelector('#copy-status').textContent=lang==='fr'?'Appuyez sur Ctrl+C pour copier.':'Press Ctrl+C to copy.'}};contact.showModal()}
document.querySelector('footer>a').addEventListener('click',showContact);
const finalRender=render;render=function(){finalRender();cv.textContent=lang==='fr'?'Consulter mon CV ↗':'View my CV ↗'};render();
