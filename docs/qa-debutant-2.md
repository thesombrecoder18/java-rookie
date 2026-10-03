# QA « débutante absolue », 2e passage : Awa après l'allègement

**Méthode** : j'ai relu les 27 leçons dans l'ordre du manifeste, en répondant à chaque interaction et à chaque test. J'ai aussi fait un rendu Playwright à 375 px de large (les 27 leçons, sections et dépliables ouverts) et relu `JR.programmeComplet` et `exercices.js`. Je n'ai modifié aucun fichier du projet.
**Rappel des niveaux** : BLOQUANT (Awa est coincée) · GÊNANT (elle se perd ou se fatigue) · DÉTAIL.

## 1. Suivi des points BLOQUANT et GÊNANT du 1er rapport

| Niv. | Point (1er rapport) | État | Constat |
|---|---|---|---|
| BLOQUANT | Petit test qui déborde sur téléphone (19 leçons) | **Résolu** | Largeur de page = 375 px sur les 27 leçons. |
| BLOQUANT | m01-l02, `ordre` : flèches ↓ hors écran | **Résolu** | Les boutons ↑ et ↓ sont visibles (x = 236 à 328 px). |
| GÊNANT | Durées annoncées trop courtes | **Partiel** | Total annoncé : 2 h 48. Réel estimé : 4 h 45 à 5 h (voir §3). L'écart passe de ×2,3 à ×1,8. |
| GÊNANT | ASCII trop larges sur téléphone | **Partiel** | La page ne défile plus, mais 14 leçons ont encore un `illus` plus large que sa boîte (298 à 376 px pour 295 px), avec un ascenseur interne : m01-l01, m01-l02, m02-l02, m02-l03, m05-l01, m05-l02, m06-l01 (×3), m06-l02 (×2), m06-l03, m06-l04 (×2), m06-l05. |
| GÊNANT | `predire` refusé à cause d'un accent | **Résolu** | Message « Presque ! Regarde les accents ». |
| GÊNANT | Exos en mode fichier sans programme complet | **Résolu** | m01-l01 : « Garde tout le programme ». m06-l02/03/04 : fichier de départ complet dans `code:`. |
| GÊNANT | m01-l01 S3, exo | **Résolu** | |
| GÊNANT | m01-l02 S2, `HelloWorld` copiable | **Partiel** | Une `attention` dit « garde le nom Main », mais le bouton « Copier pour essayer » copie toujours `public class HelloWorld` (mode `fichier`, copié tel quel), et OneCompiler le refuse. → `copier: false` sur ce bloc. |
| GÊNANT | m02-l03 S1, six types d'un coup | **Résolu** | `byte`, `short` et `float` sont dans un dépliable « examen ». |
| GÊNANT | m02-l04 Test 3, `'0'` → 48 | **Résolu** | La règle est en S3, et la question a été remplacée. |
| GÊNANT | m02-l05, combiner sans trou avant | **Résolu** | Un `trous` sur la 1re ligne a été ajouté. |
| GÊNANT | m02-l05 Test 3, échange raté (contenu facultatif) | **Résolu** | Remplacé par un test sur le cast. |
| GÊNANT | m03-l02, `+=` puis `x =+ 5` | **Résolu** | `x =+ 5` est dans un dépliable. |
| GÊNANT | m03-l03, leçon la plus lourde | **Partiel** | La virgule et l'oubli d'`import` sont passés en dépliable, mais la leçon a reçu `print` / `println` (voir N1). Il reste 5 sections. |
| GÊNANT | m03-l03, `predire` `[]` infaisable | **Résolu** | Devenu une démonstration « Surprise », suivie de la correction. |
| GÊNANT | m04-l02 S4, titre « Pour l'examen » | **Résolu** | Section « Le piège de l'intervalle ». |
| GÊNANT | m04-l06, mur de 24 lignes | **Résolu** | Découpé en v3a puis v3b. |
| GÊNANT | m04-l06, défi passif | **Résolu** | `exo combiner` avec n = 4 et une note invalide. |
| GÊNANT | m06-l02, exo `Voiture` de zéro | **Résolu** | Remplacé par « ajoute `double moyenne` », avec le code de départ. |
| GÊNANT | m06-l03, `predire` `0 ans` | **Résolu** | Indice donné dans la question. |
| GÊNANT | m06-l03, `predire` `null` | **Résolu** | Devenu un quiz à options. |
| GÊNANT | m06-l03, exo corriger sans fichier | **Résolu** | Fichier fautif complet. |
| GÊNANT | m06-l04, `protected` trop tôt | **Résolu** | Il arrive en m06-l05. |
| GÊNANT | m06-l04, exo sans code de départ | **Résolu** | `setMoyenne`, avec le fichier complet. |

La plupart des DÉTAIL du 1er rapport sont réglés : mentions de version, « Bravo ! Oui », forme générale d'une méthode, `main` autour de l'erreur, `ecart` placés en dépliable… Trois restent ouverts : la zone d'essai des exos fait toujours 3 lignes, l'`ecart` de m02-l04 S3 reste dans le flux (acceptable, car c'est un piège direct), et la citation `cours` de m06-l01 S2 aussi.

## 2. Nouveaux problèmes créés par l'allègement

Rien n'est BLOQUANT. `print` n'est jamais utilisé avant m03-l03, et aucune question de test ne repose uniquement sur un dépliable (sauf D4, qui reste déductible).

### GÊNANT

| # | Bloc | Problème | Correction proposée |
|---|---|---|---|
| N1 | m03-l03 S2 · `compare` print / println | `print` a été déplacé dans la leçon déjà la plus lourde. La section S2 enchaîne maintenant `import`, `new`, `print`, l'invite et STDIN. En S4, le piège du ⏎ (2 codes et un `simple`) arrive ensuite. | Supprimer le `compare` : la décomposition dit déjà « print (sans retour à la ligne) » ; une phrase suffit. Déplacer S4 « Le piège du ⏎ » dans m03-l04 Étape 2 (la carte le prévoit comme erreur fréquente du bilan), et faire pointer vers m03-l04 le rappel de m04-l05 Test 2. |
| N2 | m04-l03 S3 · exo « Corrige le menu ci-dessus » | Le menu est dans un `predire`, qui n'a pas de bouton « Copier », et l'exo n'a pas de `code:`. Awa doit retaper 10 lignes sur son téléphone. | Mettre le menu sans `break` dans le `code:` de l'exo. |
| N3 | m03-l04 S4 · exo combiner « Reprends le programme de l'étape 2 » | L'étape 2 est un `trous` (pas de bouton « Copier »). Il faut retaper 10 lignes avant d'ajouter les 2 nouvelles. | Donner la v2 complète (trous remplis) dans le `code:` de l'exo. |
| N4 | m02-l04 S1 · `cle` « Sens automatique : byte → short → int → long → float → double (… voir le dépliable) » | La phrase-clé, celle qu'on demande de retenir, cite trois types qui n'existent plus que dans le dépliable de m02-l03. | `cle` : « Sens automatique : int → long → double ». Mettre la chaîne complète et la remarque sur `float` dans le dépliable « examen ». |

### DÉTAIL

| # | Bloc | Problème | Correction proposée |
|---|---|---|---|
| D1 | Fil rouge : m02-l05 et m03-l04 Étape 1 | Les notes de la v1 (12.5 / 15.0 / 9.75) donnent une moyenne de 12.42. Dès l'étape 2, on passe à 14 / 16 / 12, soit 14.0, sans explication : Adama « change de notes ». | Notes v1 : 12.5 / 16.0 / 13.5. La moyenne vaut alors 14.0, et le `predire` donne 12.5 + 16.0 + 4.5 = 33.0, un nombre net. Le test de m02-l05 devient « Note 3 : 13 ». |
| D2 | m03-l04 S1 · code « corrigé du module 2 » | La ligne `Note 3 sans décimales : 9` n'apparaît dans aucun corrigé de m02-l05 (le test affiche « Note 3 : 9 »). | Aligner le libellé sur le test de m02-l05. |
| D3 | m02-l05 S3 · texte « Étape 3 : … Tu la prédiras dans le petit test » | Une étape est annoncée, mais elle est vide : on a l'impression qu'un morceau manque. | Retirer « Étape 3 » ; garder « Dans le petit test, tu prédiras… ». |
| D4 | m02-l04 Test 2 · `int b = 3.0;` | La règle « refusé même sans décimale utile » n'est écrite que dans le dépliable « examen ». On peut la déduire du `pourquoi` du quiz de S3. | Une demi-phrase en S2 : « même 3.0 : Java regarde le type, pas la valeur ». |
| D5 | m01-l02 Test 2 · `public class Moyenne` | La règle « nom du fichier = nom de la classe » n'apparaît plus que dans la décomposition de la ligne 1 (l'erreur est partie dans le dépliable « Sur ton ordinateur »). | La redire dans le `texte` de S2, ou dans `retenir`. |
| D6 | Rappels redondants | `next` / `nextLine` est demandé 3 fois (m03-l03 S3, m03-l03 Test 1, m04-l02 Test 2). m04-l04 Test 2 (`total += 2.7`) reprend presque mot pour mot m03-l02 Test 1 (`n += 2.7`). | m04-l04 : rappel `int i = 2; int k = ++i;` → `3 3`. m04-l02 : rappel « quelle commande pour lire 12.5 ? » → `nextDouble()`. |
| D7 | m05-l01 S1 · pourquoi « Dans la fiche d'Adama, la même ligne de tirets revient » | La fiche n'a jamais eu de tirets. | « Imagine la fiche d'Adama encadrée de tirets… » |
| D8 | m06-l02 S1 · pourquoi « Tu sais dessiner la classe Etudiant en UML » | m06-l01 a dessiné `Voiture` en UML. `Etudiant` n'y apparaît que comme objet. | « Tu as vu Voiture en UML ; voici Etudiant. » |

## 3. Temps réel estimé (Awa, fatiguée, sur téléphone)

| Module | Annoncé | 1er passage | 2e passage, avec essais OneCompiler | Sans essais |
|---|---|---|---|---|
| m01 | 18 min | 40-45 min | 30-35 min | 22 min |
| m02 | 32 min | 70-75 min | 50-55 min | 38 min |
| m03 | 26 min | 60-70 min | 50-55 min | 35 min |
| m04 | 38 min | 85-90 min | 65-70 min | 48 min |
| m05 | 18 min | 43 min | 32-35 min | 24 min |
| m06 | 36 min | 80-85 min | 60-65 min | 45 min |
| **Total** | **2 h 48** | **6 h - 6 h 30** | **≈ 4 h 45 - 5 h** | **≈ 3 h 30** |

C'est un gain réel d'environ 1 h 15 à 1 h 30. Les leçons « ordinaires » prennent maintenant 8 à 11 minutes. Trois postes restent lourds : m03-l03 (15-18 min) et les bilans m03-l04 et m04-l06 (15-18 min chacun). L'annonce « 6 min » ne correspond qu'à une lecture sans essais par une lectrice reposée. Un libellé « 6 min de lecture, 10 avec les essais » serait honnête.
