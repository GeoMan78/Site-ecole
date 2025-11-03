// VARIABLES GLOBALES
let typeSelectionne = null; // Stocke le type de robot actuellement sélectionné
let total = 0;              // Stocke le total du prix des pièces ajoutées au panier

// RÉCUPÉRATION DES ÉLÉMENTS DU DOM
const btnTypes = document.querySelectorAll('.type-btn'); // Tous les boutons de type de robot
const pieces = document.querySelectorAll('.piece');      // Toutes les cartes de pièces
const btnAjouts = document.querySelectorAll('.btn-ajout[data-nom]'); 
// Tous les boutons "Ajouter" qui ont un attribut data-nom

const panierEl = document.getElementById('panier');      // Zone où on affiche le panier
const totalEl = document.getElementById('totalPrix');    // Zone où on affiche le total
const champNom = document.getElementById('champNom');    // Champ pour entrer le nom du robot
const btnReinit = document.getElementById('btnReinit');  // Bouton "Réinitialiser"
const btnFinal = document.getElementById('btnFinal');    // Bouton "Finaliser"

// FONCTION : afficher uniquement les pièces correspondant au type sélectionné
function afficherPieces(type) {
  pieces.forEach(p => {
    // Si la pièce n'est pas du type sélectionné, on la cache avec hidden
    p.hidden = p.getAttribute('data-type') !== type;
  });
}

// GESTION DES CLICS SUR LES BOUTONS DE TYPE
btnTypes.forEach(b => {
  b.addEventListener('click', () => {
    // Retire la classe 'actif' de tous les boutons pour désélectionner
    btnTypes.forEach(x => x.classList.remove('actif'));
    // Ajoute la classe 'actif' sur le bouton cliqué
    b.classList.add('actif');

    // Met à jour le type sélectionné
    typeSelectionne = b.getAttribute('data-type');

    // Affiche uniquement les pièces correspondantes
    afficherPieces(typeSelectionne);

    // Vide le panier à chaque changement de type
    viderPanier();
  });
});

// GESTION DES CLICS SUR LES BOUTONS "AJOUTER" DES PIÈCES
btnAjouts.forEach(b => {
  b.addEventListener('click', () => {
    // Récupère le nom et le prix depuis les attributs data
    const nom = b.getAttribute('data-nom');
    const prix = parseInt(b.getAttribute('data-prix'), 10);

    // Ajoute la pièce au panier
    ajouterAuPanier(nom, prix);
  });
});

// FONCTION : AJOUTER UNE PIÈCE AU PANIER
function ajouterAuPanier(nom, prix) {
  total += prix; // Met à jour le total
  const ligne = document.createElement('div'); // Crée une nouvelle ligne dans le panier
  ligne.className = 'ligne-panier'; // Ajoute la classe pour le style
  ligne.innerHTML = `<div>${nom}</div><div>${prix} €</div>`; // Contenu de la ligne
  panierEl.appendChild(ligne); // Ajoute la ligne au DOM
  totalEl.textContent = total + ' €'; // Met à jour le total affiché
}

// FONCTION : VIDER LE PANIER
function viderPanier() {
  total = 0;              // Réinitialise le total
  panierEl.innerHTML = ''; // Vide les lignes dans le DOM
  totalEl.textContent = '0 €'; // Réinitialise l'affichage du total
  champNom.value = '';      // Vide le champ du nom du robot
}

// LIAISON DES BOUTONS DE RÉINITIALISATION ET FINALISATION
btnReinit.addEventListener('click', viderPanier);

btnFinal.addEventListener('click', () => {
  const nomRobot = champNom.value || 'Sans nom'; // Si pas de nom, utiliser "Sans nom"
  const message = `Récapitulatif :\n\nType : ${typeSelectionne || '—'}\nNom : ${nomRobot}\nTotal : ${total} €`;
  // Affiche une alerte avec le récapitulatif
  alert(message);
});

// AU CHARGEMENT DE LA PAGE : cacher toutes les pièces
window.addEventListener('load', () => {
  pieces.forEach(p => (p.hidden = true));
});
