---
name: lecon-java-rookie
description: Écrire, modifier ou relire une leçon du site Java Rookie (courses/<module>/<leçon>.js) selon les principes anti-fatigue et le contrat de format, puis la vérifier (javac --release 21, sorties, structure). À utiliser pour toute création ou correction de contenu pédagogique dans ce projet.
---

# Écrire ou modifier une leçon Java Rookie

## 1. Charger le contexte (dans cet ordre)
1. `docs/ETAT.md` : l'état actuel du travail.
2. `docs/principes.md` : exigences et périmètre (environ 2 h 30, juste les bases).
3. `docs/format-lecon.md` : les blocs disponibles et le champ `run`.
4. `docs/exemple/lecon-modele.js` : le ton, le rythme et la densité à imiter.
5. Dans `docs/carte-pedagogique.md` : la **fiche** de la leçon, plus le glossaire, pour savoir ce que l'élève sait déjà et ce qu'il ne sait pas encore.
6. `docs/source-cours.md` : les slides citées dans la fiche et leurs ⚠.
7. La leçon précédente et la leçon suivante, si elles existent (cohérence, fil rouge).

## 2. Écrire
- Fichier `courses/<id-module>/<id-leçon>.js`, avec `JR.lecon({ id, titre, duree, objectif, sections, retenir, test })`. L'id et le titre doivent être identiques à ceux de `courses/manifest.js`.
- 3 à 5 sections. Chacune est une petite étape, avec une pause naturelle à la fin.
- Rythme : explication courte → illustration (`boites`, `illus`, `trace`, `compare`) → mini-exemple (`code`, de 1 à 5 lignes) → question (`quiz`, `predire`, `trous`, `ordre`) → autre exemple → mini-exercice (`exo`).
- Jamais plus de 2 blocs `texte` d'affilée. Aucun terme technique sans le définir, ni avant sa définition dans le parcours.
- Une erreur fréquente : bloc `erreur` avec le vrai message de javac (en anglais), et sa traduction au début de `explication`.
- Un exercice « créer » n'arrive jamais sans un bloc `trous` juste avant.
- `simple` (« Explique-moi simplement ») : une image du quotidien, sans infantiliser, seulement là où la notion résiste.
- À partir de m03 : exactement 1 question avec `rappel: "mXX-lYY"` (une leçon précédente) dans le `test`.
- Le contenu réservé à l'examen ou à la culture générale va dans un `depliable`.
- Une erreur des slides va dans un bloc `ecart` ; un piège que le cours ne signale pas, dans un bloc `attention`.

## 3. Vérifier, en boucle jusqu'à zéro problème
```bash
node tools/verifier.mjs <id-leçon> --erreurs
```
- Zéro « problème ». Lire chaque avertissement et le corriger, sauf raison valable.
- Comparer chaque message d'erreur annoncé avec le message réel affiché par `--erreurs`.
- Ne jamais deviner une sortie : l'outil compare les sorties annoncées avec l'exécution réelle.
- Voir la page : `lecon.html?l=<id>` (ou `npm run e2e` si le moteur a été touché).

## 4. Test de fatigue (obligatoire), puis corriger
Mesure d'abord : `node tools/mesure.mjs <id-leçon>`. Cibles : environ 300 mots sur le chemin principal, au plus 3 interactions, un test de 2 questions, au plus 1 bloc erreur (voir `docs/brief-corrections.md`).

Trop long ? Trop de texte ? Trop de nouveaux concepts ? Assez d'exemples ? Des exemples trop complexes ? Une illustration pourrait-elle remplacer une explication ? Un mur de code ou de texte ? L'élève peut-il faire une pause ? A-t-il une petite réussite avant la suite ? Que peut-on supprimer sans perdre la compréhension ?
Si plusieurs réponses inquiètent : réduire, ou proposer de couper la leçon. Pour couper, il faut modifier la carte et lancer `npm run manifeste` : demander d'abord à l'utilisateur, car le périmètre est limité à environ 2 h 30.

## 5. Pour une relecture qualité (facultatif mais recommandé)
Lancer des agents en parallèle :
- un **expert Java**, qui cherche les erreurs techniques et les simplifications fausses ;
- un **débutant simulé**, qui lit la leçon sans rien savoir d'autre que les leçons précédentes et note chaque endroit où il bloque.

Appliquer leurs remarques, puis vérifier de nouveau.

## 6. Terminer
Mettre à jour `docs/ETAT.md` (leçons touchées, points ouverts).
