copy.fr.a.intro = 'Martin Gaugue. <strong>Étudiant ingénieur</strong> en <strong>Master 2 Creative Technology</strong>, je relie <strong>électronique, son et création</strong> pour concevoir des installations interactives.';
copy.en.a.intro = 'Martin Gaugue. <strong>Final-year engineering student</strong> in <strong>Creative Technology</strong>, combining <strong>electronics, sound and artistic practice</strong> to design interactive installations.';

const internship = projects.find(project => project.name === 'PROTEOR USA');
internship.text = [
  'Pendant mon stage en R&D biomécanique chez PROTEOR USA à Irvine, j’ai comparé deux façons de mesurer la marche : la capture vidéo avec deux smartphones via OpenCap et les données enregistrées par un genou prothétique Quattro.\n\nJ’ai préparé les essais au sol et sur tapis roulant, installé les caméras et travaillé avec le testeur et l’équipe R&D. En Python, j’ai synchronisé les enregistrements, associé les foulées entre les deux systèmes et comparé leur durée, leur longueur et l’angle du genou. J’ai résumé les écarts et proposé des améliorations du protocole de capture.\n\nCe travail fait partie d’un projet de recherche interne. Je peux présenter ma démarche, mais les données, les résultats détaillés et certains aspects techniques restent confidentiels.',
  'During my biomechanics R&D internship at PROTEOR USA in Irvine, I compared two ways of measuring gait: two-smartphone video capture with OpenCap and data recorded by a Quattro prosthetic knee.\n\nI prepared overground and treadmill trials, set up cameras and worked with the test participant and R&D team. Using Python, I synchronised recordings, matched strides across systems and compared stride duration, stride length and knee angle. I summarised differences and recommended improvements to the capture protocol.\n\nThis was an internal research project. I can share my approach, while the data, detailed results and some technical aspects remain confidential.'
];

const sleeve = $('flip');
const deck = document.createElement('div');
deck.className = 'vinyl-deck';
sleeve.before(deck);
deck.append(sleeve);

const pull = document.createElement('button');
pull.type = 'button';
pull.className = 'vinyl-pull';
pull.setAttribute('aria-controls', 'vinyl-tracks');
deck.prepend(pull);

const hint = document.createElement('span');
hint.className = 'sleeve-hint';
deck.append(hint);

const trackList = document.createElement('ol');
trackList.className = 'vinyl-tracks';
trackList.id = 'vinyl-tracks';
deck.append(trackList);

let recordOut = false;
function renderTracks() {
  pull.setAttribute('aria-expanded', String(recordOut));
  pull.textContent = recordOut ? '←' : '→';
  pull.setAttribute('aria-label', lang === 'fr'
    ? (recordOut ? 'Ranger le vinyle' : 'Tirer le vinyle pour découvrir les projets')
    : (recordOut ? 'Slide the record back in' : 'Pull the record to browse projects'));
  deck.classList.toggle('record-out', recordOut);
  trackList.hidden = !recordOut;
  trackList.replaceChildren();
  if (!recordOut) return;
  for (const project of projects.filter(project => project.side === side)) {
    const row = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = project.name;
    button.addEventListener('click', () => openProject(project));
    row.append(button);
    trackList.append(row);
  }
}

let pullStart;
let pulledByDrag = false;
pull.addEventListener('pointerdown', event => {
  if (event.button !== 0) return;
  pulledByDrag = false;
  pullStart = { x: event.clientX, id: event.pointerId };
  pull.setPointerCapture(event.pointerId);
});
pull.addEventListener('pointermove', event => {
  if (pullStart?.id !== event.pointerId) return;
  const distance = event.clientX - pullStart.x;
  const progress = Math.max(0, Math.min(1, (recordOut ? 1 : 0) + distance / 80));
  if (Math.abs(distance) > 7) deck.style.setProperty('--pull-progress', progress);
});
pull.addEventListener('pointerup', event => {
  if (pullStart?.id !== event.pointerId) return;
  const distance = event.clientX - pullStart.x;
  pulledByDrag = Math.abs(distance) > 7;
  if (distance > 30) recordOut = true;
  if (distance < -30) recordOut = false;
  renderTracks();
});
pull.addEventListener('lostpointercapture', () => {
  pullStart = undefined;
  deck.style.removeProperty('--pull-progress');
});
pull.addEventListener('click', event => {
  if (event.detail && pulledByDrag) {
    pulledByDrag = false;
    return;
  }
  recordOut = !recordOut;
  renderTracks();
});

const renderBeforeSleeve = render;
render = function () {
  renderBeforeSleeve();
  if (side === 'a') $('intro').innerHTML = copy[lang].a.intro;
  hint.textContent = lang === 'fr'
    ? 'Pochette : glisser pour incliner, cliquer pour retourner. Vinyle : tirer la flèche.'
    : 'Sleeve: drag to tilt, click to flip. Vinyl: pull the arrow.';
  renderTracks();
};

let drag;
let suppressClick = false;
sleeve.addEventListener('pointerdown', event => {
  if (event.button !== 0) return;
  suppressClick = false;
  drag = { x: event.clientX, y: event.clientY, id: event.pointerId };
  sleeve.setPointerCapture(event.pointerId);
});
sleeve.addEventListener('pointermove', event => {
  if (drag?.id !== event.pointerId) return;
  const x = event.clientX - drag.x;
  const y = event.clientY - drag.y;
  if (Math.hypot(x, y) < 7 && !suppressClick) return;
  suppressClick = true;
  sleeve.classList.add('tilting');
  sleeve.style.setProperty('--rx', Math.max(-65, Math.min(65, -y / 2)) + 'deg');
  sleeve.style.setProperty('--ry', Math.max(-75, Math.min(75, x / 2)) + 'deg');
});
sleeve.addEventListener('lostpointercapture', () => {
  drag = undefined;
  sleeve.classList.remove('tilting');
  sleeve.style.removeProperty('--rx');
  sleeve.style.removeProperty('--ry');
});
sleeve.addEventListener('click', event => {
  if (event.detail && suppressClick) {
    suppressClick = false;
    event.stopImmediatePropagation();
    return;
  }
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sleeve.animate([{ transform: 'perspective(950px) rotateY(-90deg)' }, { transform: 'perspective(950px) rotateY(0deg)' }], { duration: 360, easing: 'ease-out' });
  }
}, true);
render();
