# Java Rookie — instructions pour Claude

Site statique pour apprendre **les bases de Java** à des débutants absolus (étudiants de l'ESP-UCAD, Dakar).
Il accompagne le cours « Programmation orientée-objet : Java » du Pr. Samba DIAW et prolonge le site frère `../algo-rookie` (ne jamais modifier algo-rookie).

**Avant toute modification, lis `docs/ETAT.md`** : avancement, décisions prises, prochaines étapes.

## Les décisions de l'utilisateur (non négociables)
- **Juste les bases, environ 2 h 30 visés** (≈ 3 h 15 annoncées honnêtement après mesure) : 6 modules, 27 leçons de ~7 min (bilans 9 min). Les durées viennent du champ `duree` des leçons. Un cours « complet » de 16 h a été explicitement refusé (« personne n'aura la patience »). Ne pas agrandir le parcours sans demander.
- **La fatigue cognitive est une contrainte majeure** : une idée par leçon, des exemples courts, une illustration avant le code, des micro-victoires, un « À retenir » de 3 points maximum et un petit test de 2 à 5 questions. Tout est détaillé dans `docs/principes.md`.
- **« Simple dans la forme, rigoureux dans le fond »** : ne jamais simplifier jusqu'à dire quelque chose de faux, aucun terme technique sans définition.
- **Erreurs des slides du cours** : les corriger ET les signaler (bloc `ecart` : « Le support dit… / En réalité… »), avec respect. Un simple piège que le cours ne signale pas n'est pas une erreur du cours : on le traite avec un bloc `attention`.
- **Ordre pédagogique** plutôt que l'ordre des slides : les bases d'abord, puis l'objet ; les exceptions et les interfaces seulement en aperçu à la fin.
- **Utiliser réellement les agents et les skills spécialisés** (pédagogie, exactitude Java, UX, UI, débutant simulé), puis faire un test de fatigue cognitive sur chaque leçon.
- Tout en français, tutoiement, ton bienveillant.

## Architecture (aucun build ; fonctionne en ouvrant `index.html` en file://)
- **Pages** : `index.html` (parcours), `lecon.html?l=m02-l01`, `lexique.html`, `module.html?m=m02-variables` (fiche de révision).
- **Moteur** (`assets/js/`, chargé dans cet ordre) :
  - `noyau.js` : utilitaires, progression (localStorage), coloration Java, enveloppe « programme complet » ;
  - `blocs.js` : rendu des blocs ;
  - `exercices.js` : quiz, predire, trous, ordre, exo ;
  - `pages.js` : pages leçon, parcours, lexique et fiche.
- **Style** : `assets/styles.css`, avec des jetons de couleur. Les couleurs ont un sens : bleu = action, vert = juste, rouge = faux, ambre = aide.
- **Contenu = données, séparé de l'affichage** :
  - `courses/manifest.js` est **généré** à partir de `docs/carte-pedagogique.md` par `npm run manifeste`. Ne jamais le modifier à la main ; les résumés de modules sont dans `tools/resumes.json`.
  - Une leçon = `courses/<id-module>/<id-leçon>.js`, qui appelle `JR.lecon({...})`. Pas de HTML de mise en page dans une leçon.
  - `courses/lexique.js` contient le lexique.
- **Contrat des leçons** : `docs/format-lecon.md`, qui définit les types de blocs, leurs champs et le champ `run` utilisé par le vérificateur. Leçon de référence : `docs/exemple/lecon-modele.js`.

## Documents de référence (`docs/`)
| Fichier | Rôle |
|---|---|
| `principes.md` | Exigences pédagogiques et périmètre |
| `carte-pedagogique.md` | **La source de vérité du parcours** : modules, leçons, fiche de chaque leçon, glossaire, ⚠ du cours |
| `source-cours.md` | Transcription des slides du professeur (les PDF ne sont pas dans le dépôt), avec les erreurs du support marquées ⚠ |
| `format-lecon.md` | Contrat des blocs |
| `brief-redacteur.md` | Consignes données aux agents rédacteurs |
| `revue-java.md`, `revue-ux.md` | Revues de la carte (contexte des décisions) |
| `qa-java.md`, `qa-pedagogie.md`, `qa-debutant.md` | Relectures qualité des 27 leçons écrites |
| `brief-corrections.md` | Cibles d'allègement : ~300 mots par leçon, test = 2 questions, ≤ 3 interactions, ≤ 1 erreur |
| `archive/carte-complete-134-lecons.md` | Ancienne carte longue, abandonnée (périmètre trop large) : réservoir d'idées seulement |

## Commandes
```bash
npm run verifier                       # tout le contenu : structure + compilation javac --release 21 + sorties
node tools/verifier.mjs m03 --erreurs  # un module ; --erreurs affiche les vrais messages de javac
npm run manifeste                      # régénère courses/manifest.js après une modification de la carte
node tools/mesure.mjs [m03]            # charge de chaque leçon : mots, interactions, test, erreurs (cibles anti-fatigue)
npm run e2e                            # tests navigateur (Playwright) : doit afficher « Tous les tests passent »
npm run serve                          # serveur local http://localhost:8000 (facultatif)
```
Prérequis : JDK 21 ou plus récent (`javac`) et Node. La première fois : `npm install` (Playwright).

## Procédures
- **Modifier ou écrire une leçon** : utiliser le skill de projet `lecon-java-rookie` (`.claude/skills/lecon-java-rookie/`).
- **Changer le parcours** (ajouter, couper ou renommer une leçon) :
  1. modifier la fiche dans `docs/carte-pedagogique.md` (format des titres : `#### mXX-lYY · Titre (N min)`) ;
  2. `npm run manifeste` ;
  3. créer ou renommer le fichier de leçon ;
  4. `npm run verifier`.
- **Modifier le moteur ou le CSS** : `npm run e2e` doit rester vert. Ajouter un test dans `tools/e2e.cjs` pour tout nouveau comportement. Garder des fichiers de moins de 400 lignes.
- **Nouveau type de bloc** : le documenter dans `docs/format-lecon.md`, puis l'implémenter dans `blocs.js` ou `exercices.js`, l'ajouter à `TYPES` et à l'extraction dans `tools/verifier.mjs`, et le tester dans `e2e.cjs`.
- **Après chaque session de travail** : mettre à jour `docs/ETAT.md` (fait / reste à faire / décisions).
- **Commits** : seulement quand l'utilisateur le demande ; messages en `type: description` (feat, fix, docs…).

## Pièges connus
- Les extraits sont compilés avec `--release 21` : pas de `main` simplifié, pas d'instruction avant `super(...)`.
- En mode `main`, le vérificateur ajoute les imports `java.util`/`java.time` et `throws Exception`, sauf pour les blocs `erreur`.
- OneCompiler (l'outil conseillé) tourne en Java 25 : aucun texte ni quiz ne doit dépendre de la version de Java.
- Pas de sortie annoncée qui dépende de la machine (`LocalDate.now()`, `toString` par défaut, format des nombres selon la langue).
- Scanner : champ `entree` pour le vérificateur. Virgule ou point selon la langue de la machine : formuler prudemment.
- Les scripts des pages doivent charger `assets/js/*.js` AVANT `courses/manifest.js`.
