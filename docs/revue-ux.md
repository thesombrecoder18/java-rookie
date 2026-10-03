# Revue UX pédagogique : carte, format et moteur

> Relecture faite en se mettant à la place d'un étudiant de l'ESP-UCAD, débutant absolu en Java, qui apprend seul, le soir, fatigué.
> Documents relus : `principes.md`, `carte-pedagogique.md`, `format-lecon.md`, `courses/m02-variables/m02-l01.js`, `assets/app.js`, `courses/manifest.js`, `index.html`.
> Priorités : **P1** = bloquant (l'étudiant décroche ou ne peut pas avancer) · **P2** = important · **P3** = confort.

## Verdict en bref

La carte est solide : elle part toujours d'un problème, définit chaque terme avant de l'utiliser, signale les erreurs du support et fait grandir un fil rouge cohérent. Les principaux risques ne viennent pas de Java lui-même. Ils viennent de quatre endroits :
1. **L'outillage** : l'étudiant ne sait pas où taper ni comment lancer son code. C'est le premier point d'abandon.
2. **Une douzaine de leçons trop chargées**, qui contiennent 2 ou 3 idées.
3. **Pas de récupération espacée** : les rappels existent, mais ce sont des explications et non des questions.
4. **Un moteur qui laisse l'étudiant passif** devant les exercices (la correction est à un clic) et qui oublie où il s'était arrêté dans une leçon.

---

## 1. Où l'étudiant risque d'être perdu

| Leçon | Problème | Effet sur l'étudiant |
|---|---|---|
| m01-l01 | On demande de taper `javac` / `java` / `ls` dans un terminal **avant** d'avoir vu le moindre programme (HelloWorld n'arrive qu'en l02). L'installation est seulement « prévue » (annexe 0) : aucune page n'existe, aucun lien n'y mène. `ls` ne marche pas sous Windows (`dir`). | Première soirée bloquée sur l'installation, sans aucune victoire. |
| m01-l02 | Le tableau « quand chaque mot sera expliqué » liste 6 mots inconnus (public, static, void, String[] args…) avec des numéros de modules. | Effet « liste de tout ce que je ne comprends pas ». |
| m02-l01 | Ce que la **carte** demande (déclaration sans valeur, identificateurs, mots réservés, camelCase, ⚠ 247 caractères) **ne correspond pas** à la **leçon modèle** (`int age = 20;`, lecture, concaténation, `annee - age`). La leçon modèle empiète déjà sur m02-l02 et m02-l03. | Les leçons l02 et l03 vont répéter l01, ou se contredire. |
| m05-l02 | La carte affirme : « sur un système en français, on tape `12,5` ». Mais les compilateurs en ligne (et beaucoup de Linux) sont en `en_US` : il faut alors taper `12.5`. | Un `InputMismatchException` inexplicable, dans le mode d'exécution le plus probable. |
| m07-l03 | L'exemple enchaîne `sc.nextDouble()` puis `sc.nextLine().charAt(0)`. Le ⏎ restant donne une chaîne vide, et le programme plante avec `StringIndexOutOfBoundsException`. | Plantage incompréhensible : ni `charAt` ni « exception » ne sont encore expliqués. |
| m06-l06 | Exercice [créer] « calculatrice avec `switch` sur un `char` » : lire un `char` au clavier n'est vu qu'en m07-l03. | On demande de créer ce qui n'a pas été vu. |
| m08-l01 | Premier code **hors** de `main` (méthode à côté de `main`). Jusqu'ici, tous les extraits étaient des fragments à coller dans `main`. | « Où est-ce que je colle ça ? » |
| m10-l06 | `java Test Mamadou SOW` : il faut passer des arguments au lancement. Rien n'explique comment faire dans un IDE ou un compilateur en ligne. | Exercice impossible à faire hors du terminal. |
| m10-l07 | Le constat dit : « **trier** les noms oblige à déplacer… ». Le tri n'est jamais enseigné. | Prérequis implicite. |
| m12-l01 | Premier programme sur **plusieurs fichiers** (`javac *.java`, une classe publique par fichier). La plupart des compilateurs en ligne n'acceptent qu'un seul fichier. | Rupture d'outillage au moment le plus délicat (premiers objets). |
| m14-l04 | Les paquetages exigent une arborescence de dossiers, et on compile depuis la racine. | Même rupture, sans guide pour l'IDE. |
| m19-l07 | [créer] « supprimer un étudiant » : un `remove` dans un for-each lève `ConcurrentModificationException`. Ce piège n'est pas signalé. | Plantage au moment du défi final. |
| m20 (tout) | Installer MySQL et ajouter le pilote `.jar` au classpath : aucun guide n'existe. | Module optionnel, mais infaisable en autonomie. |
| m09-l04 | [créer] initiales « A.S. » : `p.charAt(0) + '.'` additionne deux `char` et affiche un **nombre** (le piège de m04-l04). | Résultat surprenant, sans indice pour comprendre. |

## 2. Leçons surchargées et leçons maigres

**À couper** (plus d'une idée, ou trop de termes nouveaux) :

| Leçon | Contenu actuel | Découpage proposé |
|---|---|---|
| m01-l01 | compilateur, bytecode, JVM, `.class`, multiplateforme, historique, LTS, ⚠, terminal | voir R2 : d'abord « faire tourner », ensuite « comprendre javac/java » ; l'historique et les LTS dans un encadré dépliable « Pour ta culture » |
| m02-l01 | déclaration, type, identificateur, mot réservé, camelCase, ⚠ | l01 = boîte (`int age = 20;`, lecture), comme la leçon modèle ; nouvelle leçon « Bien nommer une variable » (règles, camelCase, ⚠) placée après l'actuelle l03 |
| m02-l06 | `char`, `char` vs `String`, `boolean`, tableau des 8 types | garder `char` / `String` ; déplacer `boolean` en m06-l01 (là où on en a besoin) ; le tableau des 8 types va dans le bilan m02-l08 |
| m03-l01 | division entière + piège `"Somme : " + 2 + 3` | déplacer le piège de concaténation en m03-l03 (priorité) |
| m06-l02 | `if/else` + ternaire + `if` sans accolades + `;` | sortir le ternaire dans un encadré du bilan m06-l06 |
| m06-l04 | `&& \|\| !`, table de vérité, court-circuit, `& \| ^`, `5 & 3` en binaire, ⚠ priorités | l04 = `&&`, `\|\|`, `!` ; l04b (courte, marquée « pour l'examen ») = court-circuit, `& \| ^`, ⚠ |
| m07-l04 | somme + compteur + maximum + tableau de trace | l04 = somme et compteur ; l04b = maximum et minimum (avec le piège de l'initialisation) |
| m08-l03 | `return`, type de retour, `return;`, 3 erreurs, exemple p.53 avec 3 solutions, ⚠ `div` | l03 = `return` et type de retour, avec 1 erreur ; l03b = « Les pièges du `return` » (p.53 et ⚠ p.53) |
| m09-l04 | 6 méthodes + immuabilité | l04 = immuabilité (`toUpperCase`, `trim`) ; l04b = découper (`indexOf`, `substring`, fin exclue) |
| m11-l06 | encapsulation, interface UML, 4 visibilités, règles du paquetage, figure p.14 | garder `+` et `-` seulement ; `#` et « paquetage » sont repris là où ils sont codés (m14-l05, m16-l04) |
| m18-l05 | vérifiée / non vérifiée, `throws`, exception personnalisée | l05 = vérifiée et `throws` ; l05b = « Ta propre exception » |
| m19-l05 | `ArrayList`, générique, classes enveloppes, autoboxing, 5 méthodes | l05 = `ArrayList<String>` (`add`, `get`, `size`) ; l05b = `Integer` / `Double` et `remove` |
| m20-l02 | JDBC, pilote, classpath, URL, DriverManager, try-with-resources, `Class.forName` | séparer l'installation et le classpath (annexe B) de la connexion |

**À fusionner** (leçons maigres ou redondantes) :
- **m11-l01** (pourquoi la POO + frise historique) : la fusionner avec m11-l02. Mémoriser des dates n'a aucun intérêt pour un débutant ; la frise devient un encadré dépliable.
- **m11-l04** (UML) : la fusionner avec m12-l01, qui montre déjà l'UML et le Java côte à côte. Résultat : une leçon de moins sans code exécutable (voir §3).
- **m13-l02** (le constructeur par défaut disparaît) : la fusionner avec m13-l04 (surcharge de constructeurs), où le besoin « je veux garder `new Etudiant()` » apparaît naturellement.

Bilan net : environ +12 leçons et −3, soit environ 134 leçons. C'est conforme au principe « le nombre de leçons n'est pas un problème ».

## 3. Micro-victoires et pratique de récupération

- **Micro-victoires.** Elles sont nombreuses dans les leçons (prédire, corriger). Il y a **trois trous** :
  - m01-l01 : aucune exécution réussie avant la leçon 2 ;
  - **m11 : 7 leçons sans aucun code exécutable**, juste au milieu du parcours, là où la motivation baisse ;
  - m20 : rien ne marche tant que la base n'est pas installée.
- **Récupération.** La carte contient beaucoup de liens vers les leçons passées (« coup d'œil en arrière », « rappel m06-l05 », « réutilise m16 »). Mais ce sont des **rappels expliqués**, pas des **questions**. Le `test` de chaque leçon ne porte que sur la leçon elle-même. Or c'est l'effort de rappel qui consolide (testing effect), pas la relecture.
- **Où insérer des rappels espacés** : une question `rappel` dans le `test`, sous forme de `quiz` ou `predire`, avec des intervalles croissants. Chaque ligne ci-dessous cible une confusion de la table « Confusions classiques » :

| Notion d'origine | 1er rappel (proche) | 2e rappel (lointain) |
|---|---|---|
| `"age"` vs `age`, espaces dans la concaténation (m02-l03) | m03-l01 | m09-l05 |
| division entière (m03-l01) | m04-l01 | m10-l03 (moyenne d'un tableau) |
| `=` vs `==` (m06-l01) | m07-l01 | m09-l03 |
| `;` après `if` / `while` (m06-l02) | m07-l02 | m08-l01 |
| piège du ⏎ (m05-l04) | m07-l03 | m09-l06 |
| portée (m07-l06) | m08-l04 | m12-l06 |
| `return` vs `println` (m08-l03) | m09-l01 | m14-l02 (getter) |
| passage par valeur (m08-l04) | m10-l04 | m12-l03 |
| indices à partir de 0 (m09-l02) | m10-l02 | m19-l05 |
| `char` + `char` = nombre (m04-l04) | m09-l02 | m09-l04 |
| immuabilité de `String` (m09-l04) | m13-l05 | m17-l05 |
| surcharge vs redéfinition (m08-l05) | m13-l04 | m16-l03 |

- **Échauffement de module.** La première section de chaque `lXX-l01` (à partir de m03) commence par 2 ou 3 questions sur les modules précédents, en mélangeant les notions. Cela ne coûte rien au moteur.

## 4. Progression des exercices

- **Bonne pratique.** Les bilans suivent bien le chemin v1 → v2 → v3 puis [combiner], et la plupart des [créer] s'appuient sur un exemple vu juste avant.
- **Violations** (on demande de créer ce qui n'a pas été vu, ou un piège attend l'étudiant) : m06-l06 (lire un `char`), m10-l07 (tri), m19-l07 (`remove` dans un for-each), m09-l04 (`char` + `char`). Voir R6, R7 et R14.
- **Sauts de niveau.** Beaucoup de leçons proposent seulement [prédire] puis [créer], sans étape [reproduire] ou [modifier] entre les deux : m03-l02, m09-l01, m09-l02, m10-l03, m10-l05, m16-l06. m16-l06 ([créer] `Forme` + `Cercle` + `Rectangle`) est même un exercice de niveau « combiner » placé dans une leçon ordinaire. Le remède simple est un **exemple à trous** (faded example) avant chaque [créer] (bloc `trous`, R10).
- **Interactions demandées par la carte mais absentes du moteur.** Il n'existe aucun bloc pour :
  - « remettre dans l'ordre » (m01-l01) ;
  - « relier » (m01-l04, m12-l01, m15-l04, m19-l05, m20-l02) ;
  - « classer » (m02-l01, m02-l06, m11-l02, m12-l06) ;
  - « compléter une table de vérité » (m06-l04) ou « un tableau de trace » (m03-l05, m07-l04) ;
  - « tableau à cocher » (m14-l05).

  Les rédacteurs vont improviser. Voir R10 et R11.

## 5. Le fil rouge « carnet de notes »

**Il est motivant.** Le contexte est réel (ESP, Adama, mentions), le problème des tableaux parallèles justifie l'objet de façon convaincante, et le programme grandit visiblement. Il devient une **charge** à quatre conditions :
1. **Chaîne de dépendance.** Si l'étudiant a raté la v6, il ne peut pas faire la v7. Il faut **toujours fournir le point de départ** : le corrigé de la version précédente, à copier en tête de chaque bilan.
2. **Des bilans irréalistes.** Une leçon de 6 min annoncée contient 3 à 4 versions, plus [combiner] et [créer] : c'est plutôt 15 à 25 min. Toutes les durées du manifeste valent 6 (valeur par défaut).
3. **La saisie au clavier à chaque essai** (dès la v1) : il faut retaper nom, âge et 3 notes à chaque test, ce qui épuise le soir. Il faut proposer de « figer » des valeurs de test pendant le développement.
4. **La monotonie.** 15 versions sur le même domaine. Les défis annexes (carte de visite, `CompteBancaire`, `Voiture`) aèrent le parcours : en garder un par module, en **optionnel**.

## 6. Format de leçon et moteur

**Bugs et comportements qui frustrent :**
- **Bloquant.** Le moteur charge `courses/<id du module>/<id de la leçon>.js`, soit `courses/m02-variables-types/m02-l01.js`. Or la leçon modèle se trouve dans `courses/m02-variables/`. Elle s'affiche donc comme « Leçon en préparation ».
- **Progression perdue.** Recharger la page ou revenir le lendemain renvoie à la section 1 : la section atteinte n'est pas enregistrée.
- **« Suivant → » marque la leçon comme terminée**, même si le test n'a pas été fait. Et le bouton « Leçon terminée ✓ » **annule** la progression d'un simple clic (c'est un interrupteur).
- **`predire` est strict** (majuscules, accents, espaces en début de ligne). En cas d'échec, il répond seulement « Pas tout à fait », sans dire où est l'écart. C'est frustrant pour un écart d'un seul caractère.
- **`exo` laisse l'étudiant passif** : il n'y a nulle part où écrire, et la correction est à un clic. L'effet de génération (essayer avant de voir la réponse) est perdu.
- **On ne peut pas copier le code.** Les extraits sont des fragments, qui ne compilent pas seuls hors du cadre `main`.
- **Le lexique est vide** : `courses/lexique.js` n'existe pas.

## 7. Comment le débutant fait-il tourner son code ?

**Ce n'est pas assez guidé : c'est le risque n°1 d'abandon.** L'« annexe 0 » n'est qu'une intention : il n'y a ni page, ni lien, ni vérification. Les pièges à couvrir sont les suivants :
- PATH : `'javac' n'est pas reconnu…` sous Windows ;
- le choix d'un éditeur ;
- les compilateurs en ligne, qui imposent souvent `public class Main` et contredisent donc m01-l02 (« nom du fichier = nom de la classe ») ;
- la langue (`12,5` / `12.5`) ;
- l'entrée clavier (stdin) dans un outil en ligne ;
- les arguments du programme (m10-l06) ;
- plusieurs fichiers (m12-l01) ;
- les paquetages (m14-l04) ;
- le pilote JDBC (m20).

Voir R1, R3 et R4.

---

## Recommandations

### P1 : bloquant

**R1. Créer un module m00 « Préparer ton atelier » (3 leçons courtes, dans le manifeste, avant m01).**
- **m00-l01 « Tester sans rien installer »**, avec **un seul** compilateur en ligne recommandé. Montrer où coller le code, où taper l'entrée clavier, où passer des arguments. Signaler que l'outil impose `Main` comme nom de classe.
- **m00-l02 « Installer Java »** : JDK 21 Temurin, pas à pas pour Windows et pour Linux, avec captures. Vérifier avec `java -version` et `javac -version`. Encadré d'erreur : « 'javac' n'est pas reconnu » (PATH).
- **m00-l03 « Ton éditeur »** : **une seule** recommandation (VS Code et son extension Java). Ouvrir un dossier, lancer. Indiquer où se trouve le terminal.

Ce module sert aussi de référence plus tard : y ajouter les sections « plusieurs fichiers » (lien depuis m12-l01), « paquetages » (m14-l04), « arguments » (m10-l06), et une annexe B « MySQL + pilote » (m20).

**R2. Réordonner m01 pour obtenir une victoire en 5 minutes.**
- m01-l01 devient « Ton premier programme tourne » : copier HelloWorld, le lancer, modifier le texte.
- L'actuelle m01-l01 (javac / java / JVM) devient m01-l02, une fois que l'étudiant a vu son programme tourner.
- L'historique, les LTS et le ⚠ p.20 passent dans un encadré dépliable.
- Dans le cadre de m01-l02, le tableau « quand chaque mot sera expliqué » passe dans un dépliable.

**R3. Ajouter un bouton « Copier pour essayer » aux blocs `code`, `predire`, `exo` (corrigé) et `erreur`** (`app.js`). Il copie l'extrait **déjà enveloppé** dans le cadre complet, avec le même habillage que `tools/verifier.mjs` pour `run: "main"` / `"classe"`, plus le `contexte`, et avec la classe nommée `Main` pour être compatible avec les outils en ligne. Ajouter une ligne fixe sous chaque bloc de code : « Pour l'essayer : m00 ».

**R4. m05-l02 : reformuler la règle de la virgule.** Écrire : « Selon ta machine, Java attend `12,5` ou `12.5`. Essaie la virgule ; si tu obtiens `InputMismatchException`, utilise le point. Les outils en ligne attendent en général le point. » Le `predire` correspondant doit utiliser `entree` avec la convention du vérificateur, et le préciser.

**R5. Corriger le chemin de chargement des leçons.** Renommer `courses/m02-variables/` en `courses/m02-variables-types/` (ou aligner `tools/manifeste.mjs`). Ajouter dans `tools/verifier.mjs` un contrôle : « chaque leçon écrite se trouve dans le dossier de son module ».

**R6. m07-l03 et m06-l05 : lire un caractère avec `sc.next().charAt(0)`, et non `sc.nextLine().charAt(0)`.** `next()` saute le ⏎ restant, ce qui supprime le plantage. Introduire cette recette en m06-l05 (switch sur un `char`), ce qui rend légitime le [créer] « calculatrice » de m06-l06. Mettre à jour m07-l07 et m18-l06 en conséquence.

**R7. Retirer ou préparer les [créer] impossibles.**
- m10-l07 : remplacer « trier » par « **échanger** deux étudiants » (déjà vu en m02-l08).
- m19-l07 : « supprimer » se fait avec une boucle `for` indexée et `remove(i)`, plus un encadré sur le piège du for-each.
- m09-l04 : ajouter l'indice « `"" + p.charAt(0) + "."` » et renvoyer à m04-l04.

**R8. m12-l01 : commencer par une seule classe de fichier.** Mettre `class Etudiant { … }` (non publique) et `public class Main { … }` **dans le même fichier**, ce qui fonctionne partout, y compris en ligne. Le découpage « un fichier par classe publique » vient en m14-l04, avec les paquetages et l'aide de m00. Même principe pour les leçons m13 à m16.

### P2 : important

**R9. Couper les leçons surchargées listées au §2**, et faire les trois fusions proposées. Aligner m02-l01 sur la leçon modèle (déclarer + initialiser + lire), puis ajouter « Bien nommer une variable ». **Retirer de la leçon modèle** la concaténation (`"J'ai " + age`), qui revient à m02-l03, et `annee - age`, qui anticipe m03. Remplacer ces exemples par une 2e et une 3e variable affichées seules.

**R10. Ajouter 2 blocs au format (et rien de plus) :**
- **`trous`** : du code à compléter. Champs : `code` avec des `___`, `reponses: [["int"], ["age", "age "]]`, `explication`. Un champ de saisie par trou, une vérification par trou, des variantes acceptées. C'est l'outil des exemples à trous : à placer avant chaque [créer] de m03-l02, m09-l01, m09-l02, m10-l03, m10-l05 et m16-l06.
- **`ordre`** : remettre des lignes dans l'ordre (problèmes de Parsons). Lignes mélangées et boutons ↑ / ↓, sans glisser-déposer, pour rester utilisable au téléphone et au clavier. Pour m01-l01, m07-l01, m08-l01, m13-l01 et m16-l02.

Les consignes « relier », « classer », « cocher » et « compléter une table » s'écrivent comme une **suite de 3 à 4 `quiz` courts** : le préciser dans `format-lecon.md` pour que les rédacteurs n'improvisent pas.

**R11. Rendre la récupération systématique** (règle de format, sans nouveau bloc). Ajouter un champ optionnel `rappel: "m03-l01"` sur `quiz`, `predire` et `trous`. Le moteur affiche alors un badge « Rappel · m03 » avec un lien vers la leçon. Règle à inscrire dans `format-lecon.md` : à partir de m03, chaque `test` contient **1 question `rappel`** d'un module antérieur (calendrier du §3), et chaque `lXX-l01` commence par un « Échauffement » de 2 ou 3 questions.

**R12. `exo` : faire essayer avant de montrer.** Ajouter une zone « Ton essai » (non notée), le bouton « Copier pour essayer » et le texte « Écris d'abord ta version, puis compare ». Après la correction, deux boutons : « J'ai réussi » / « À revoir ». Les « À revoir » sont stockés et listés sur l'accueil (« 3 exercices à revoir »). C'est une répétition espacée minimale, sans algorithme.

**R13. Mémoriser la position dans la leçon.** Enregistrer `visibles` par leçon (`jr.etape.<id>`) et rouvrir à cette section, avec le message « Tu t'étais arrêté ici ». Sur l'accueil, le bouton « Reprendre » mène à la section exacte (`lecon.html?l=…#etape-3`).

**R14. Durées réelles et bilans en deux temps.** Estimer chaque durée (environ 1 min par section, plus 1 min par interaction) au lieu de 6 partout. Découper chaque bilan :
- **« Défi guidé »** (6 à 8 min), qui **commence par le code de départ fourni** (le corrigé de la version précédente) ;
- **« Défi libre (optionnel) »**, qui reprend les [créer] et les défis annexes.

Dans le fil rouge, à partir de v1, proposer une version « valeurs de test figées » pour ne pas tout retaper à chaque exécution.

**R15. m11 : réduire la traversée sans code.** Avec les fusions R9, on passe à 5 leçons. Ajouter dans chaque leçon de m11 un **aperçu Java qui compile et tourne**, à lancer via R3 : par exemple une classe `Etudiant` déjà écrite, dont l'étudiant modifie seulement les valeurs dans `main`. Fournir un corrigé dessiné pour chaque exercice « dessine le diagramme ».

**R16. `predire` plus tolérant dans son retour, sans être plus laxiste.**
- Comparer ligne par ligne et marquer la première ligne différente.
- Si l'écart ne porte que sur les majuscules ou les espaces, répondre « Presque : regarde les majuscules / les espaces » au lieu de « Pas tout à fait ».
- Ajouter Ctrl+Entrée pour vérifier.

### P3 : confort

**R17. Bouton « Leçon terminée ».** Il ne doit plus être un interrupteur : une fois la leçon terminée, il affiche « Terminée ✓ ». Un petit lien distinct « marquer comme non terminée » permet d'annuler. Le lien « Suivant → » ne marque la leçon comme terminée que si le `test` a été parcouru ; sinon, il affiche « Tu as sauté le petit test : tu peux y revenir ».

**R18. Fiche de module.** Une page `module.html?m=…` regroupe tous les « À retenir » du module. On peut les ajouter au manifeste depuis la carte via `tools/manifeste.mjs`. La page est imprimable : c'est la fiche de révision avant l'examen. Un lien vers elle apparaît à la fin de chaque bilan.

**R19. Fin de leçon apaisante.** Sous le bouton final, ajouter une ligne : « Bien joué. Si tu es fatigué, arrête-toi ici : la prochaine leçon dure ~N min. » Cela respecte la contrainte de fatigue et rend l'arrêt légitime.

**R20. Lexique.** Créer `courses/lexique.js`, généré depuis le glossaire de la carte. Y ajouter le « lexique des messages d'erreur » promis en m01-l04 (message `javac` en anglais → traduction → leçon).

**R21. Encadrés d'examen.** Marquer les contenus utiles pour l'examen mais non indispensables pour programmer d'un label visible « Pour l'examen » (dépliable) : `& | ^`, `a++ + b` (m03-l05), débordement du `byte` (m04-l03), frise historique. L'étudiant fatigué sait ainsi ce qu'il peut sauter ce soir.
