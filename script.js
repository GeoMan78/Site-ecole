let typeSelectionne = null;
let total = 0;

const btnTypes = document.querySelectorAll('.type-btn');
const pieces = document.querySelectorAll('.piece');
const btnAjouts = document.querySelectorAll('.btn-ajout[data-nom]');
const panierEl = document.getElementById('panier');
const totalEl = document.getElementById('totalPrix');
const champNom = document.getElementById('champNom');
const btnReinit = document.getElementById('btnReinit');
const btnFinal = document.getElementById('btnFinal');

function afficherPieces(type) {
  pieces.forEach(p => {
    p.hidden = p.getAttribute('data-type') !== type;
  });
}

btnTypes.forEach(b => {
  b.addEventListener('click', () => {
    btnTypes.forEach(x => x.classList.remove('actif'));
    b.classList.add('actif');
    typeSelectionne = b.getAttribute('data-type');
    afficherPieces(typeSelectionne);
    viderPanier();
  });
});

btnAjouts.forEach(b => {
  b.addEventListener('click', () => {
    const nom = b.getAttribute('data-nom');
    const prix = parseInt(b.getAttribute('data-prix'), 10);
    ajouterAuPanier(nom, prix);
  });
});

function ajouterAuPanier(nom, prix) {
  total += prix;
  const ligne = document.createElement('div');
  ligne.className = 'ligne-panier';
  ligne.innerHTML = `<div>${nom}</div><div>${prix} €</div>`;
  panierEl.appendChild(ligne);
  totalEl.textContent = total + ' €';
}

function viderPanier() {
  total = 0;
  panierEl.innerHTML = '';
  totalEl.textContent = '0 €';
  champNom.value = '';
}

btnReinit.addEventListener('click', viderPanier);

btnFinal.addEventListener('click', () => {
  const nomRobot = champNom.value || 'Sans nom';
  const message = `Récapitulatif :\n\nType : ${typeSelectionne || '—'}\nNom : ${nomRobot}\nTotal : ${total} €`;
  alert(message);
});

window.addEventListener('load', () => {
  pieces.forEach(p => (p.hidden = true));
});
