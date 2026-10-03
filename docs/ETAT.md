# État du projet — Java Rookie

> Journal à tenir à jour à la fin de chaque session de travail (le plus récent en haut).

## Où on en est (2026-10-03) — parcours terminé et vérifié

| Élément | État |
|---|---|
| Moteur (`assets/js/`), pages, CSS | ✅ ; tests e2e verts (leçon de test figée `tools/fixture/` + contrôle à 375 px des 27 leçons) |
| Outils | ✅ `verifier.mjs`, `manifeste.mjs` (les durées viennent des leçons), `mesure.mjs`, `e2e.cjs` |
| Carte pédagogique (6 modules, 27 leçons) | ✅ structure de référence. **Le contenu détaillé des leçons a été allégé après la carte : ce sont les fichiers `courses/` qui font foi.** |
| Leçons | ✅ 27/27, allégées (~348 mots par leçon, test = 2, ≤ 3 interactions) ; 0 problème au vérificateur |
| Lexique | ✅ 91 entrées (73 termes, 18 messages d'erreur) |
| Contrôle qualité | ✅ 2 passages du débutant simulé, revue Java, audit pédagogique et de fatigue (`docs/qa-*.md`) ; corrections appliquées |
| Durée | 195 min annoncées (3 h 15, honnête : 7 min par leçon, 9 min par bilan) ; ~3 h 30 réelles sans essais, ~4 h 45 avec les essais sur OneCompiler (débutant simulé) |

Avertissements assumés : « 1 seul exemple de code » en m01-l02, m01-l03, m06-l01, m06-l03 (leçons de concepts ou de lecture d'erreurs).

## Prochaines étapes possibles (à proposer, rien n'est demandé)
1. Si l'utilisateur veut se rapprocher des 2 h 30 : alléger encore les 3 bilans et m03-l03 (les plus longs en réalité, 15 à 18 min), ou passer l'ouverture m06-l06 en facultative.
2. Les points DÉTAIL restants de `docs/qa-debutant-2.md`.
3. Un mode sombre pour la lecture du soir (les jetons CSS le rendent facile).
4. Des captures d'écran datées de OneCompiler dans m01-l01.

## Décisions prises (et pourquoi)
- **Périmètre réduit à environ 2 h 30**, après le retour de l'utilisateur : « 16 h c'est trop, personne n'aura la patience ». L'ancienne carte de 134 leçons est archivée.
- **Ordre** : l'approche objet (partie 1 des slides) est placée en m06, juste avant le Java objet, pour qu'elle s'appuie sur du code déjà connu.
- **Le cadre `main`** est présenté au début comme un « formulaire officiel ». Chaque mot est expliqué au moment où il devient utile (m05, puis m06), et le bloc `cadre` montre l'avancement.
- **Outil en ligne recommandé : OneCompiler**, avec l'installation locale en dépliable. Les extraits sont copiés avec la classe `Main`, qui est compatible avec cet outil.
- **Erreurs des slides** : bloc `ecart`, ton respectueux.
  - p.54 (« la machine virtuelle » choisit la surcharge) : à corriger, c'est le compilateur.
  - p.53 (`div` renvoie une division entière) : c'est un piège, pas une erreur du cours.
- **Vérification avec `javac --release 21`** : JDK 25+ accepte du code que JDK 21 refuse.
- **Fil rouge** : la fiche d'Adama, en 4 versions (m02-l05 → m03-l04 → m04-l06 → classe `Etudiant` en m06).

## Historique
- 2026-10-03 (fin) : passe d'allègement (−25 % de mots, test = 2) et corrections Java ; second passage du débutant simulé (blocages résolus, 6 h → environ 3 h 30 réelles) ; derniers correctifs (notes d'Adama 12.5 / 16.0 / 13.5 = 14.0, `copier: false`, dessins ASCII sans ascenseur sur mobile, prédire copiable) ; durées annoncées honnêtes (3 h 15).
- 2026-10-03 : relectures qualité. Constat : le parcours est 2 fois trop long (environ 464 mots par leçon, 3 h 40 à 6 h réelles). Décision : alléger à environ 300 mots par leçon (brief-corrections.md). Ajout de `tools/mesure.mjs`. Correctifs du moteur : débordement sur mobile (test sur les 27 leçons dans e2e), prédiction tolérante aux accents. Les 3 rédacteurs appliquent les corrections.
- 2026-10-02 (suite) : les 27 leçons et le lexique sont écrits par 3 agents ; le moteur affiche désormais la saisie clavier (`entree`) ; le vérificateur compare désormais strictement les sorties avec saisie. Relectures qualité lancées (débutant simulé, expert Java, pédagogie et fatigue).
- 2026-10-02 : création du projet (moteur, outils, carte, revues), réduction du périmètre, lancement de la rédaction par 3 agents en parallèle (m01-m02 avec le lexique, m03-m04, m05-m06).
