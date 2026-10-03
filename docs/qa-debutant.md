# QA « débutante absolue » — le parcours vu par Awa

**Persona** : Awa, 19 ans, L1 à l'ESP. Elle a suivi un cours d'algo en pseudo-code (variables, SI, boucles) mais n'a jamais écrit de Java. Elle travaille seule, le soir, fatiguée, souvent sur son téléphone. Elle ne sait que ce que le site lui a appris.

**Méthode** : lecture des 27 fichiers `courses/<module>/<leçon>.js` dans l'ordre du manifeste, en répondant moi-même à chaque quiz, prédiction, trou et test. J'ai aussi vérifié le rendu réel avec Playwright à 375 px de large (téléphone) et relu le code de « Copier pour essayer » (`JR.programmeComplet`) et des exercices (`assets/js/exercices.js`).

**Notation** : `S2 · quiz · « Que fait… »` = section 2, bloc de type quiz, début du texte. `Test 3` = 3e question du petit test.
Niveaux : **BLOQUANT** (elle est coincée, ou le site l'empêche d'agir) · **GÊNANT** (elle se perd, se décourage ou se fatigue) · **DÉTAIL**.

---

## 0. Problèmes transversaux (tout le parcours)

| Niveau | Où | Ce qui coince | Proposition |
|---|---|---|---|
| **BLOQUANT** (téléphone) | « Petit test » de **19 leçons sur 27** (m01-l02, m02-l02/03/05, m03-l01/02/04, m04-l01/02/03/06, m05 ×3, m06-l02 à l06) | À 375 px, la page entière défile horizontalement (jusqu'à 549 px de large). Le texte des options de quiz est coupé (« Elle construit un objet Etudiant, et e le d… »), comme le code des `predire`. Cause : `.zone-test { display: grid; }` sans `min-width: 0`, donc le `<pre>` le plus large étire toute la colonne. | `.zone-test { grid-template-columns: minmax(0, 1fr); }` (ou `.zone-test > * { min-width: 0; }`). |
| **BLOQUANT** (téléphone) | m01-l02, S1 · ordre | Les boutons ↓ sortent de l'écran : seule la flèche ↑ est visible, et elle est grisée sur la 1re ligne. Sans défiler horizontalement, Awa ne peut pas descendre la 1re ligne, donc pas finir l'exercice. | `.ordre-liste { grid-template-columns: minmax(0,1fr); }` et `.ordre-boutons { flex: none; }`. Laisser le texte des lignes non-Java (`run: "aucun"`) revenir à la ligne. |
| **GÊNANT** | Toutes les leçons : `duree` et la phrase « La prochaine leçon dure environ 6 min » | Les durées annoncées (2 h 40 au total) sont 2 à 2,5 fois trop courtes pour une débutante qui teste sur OneCompiler. Mon estimation : **6 h à 6 h 30**. Fatiguée, Awa se lance dans « 6 min » qui en font 20 et se sent lente. | Afficher une fourchette honnête (« 10 à 15 min ; 20 si tu testes tout »), ou ne compter que la lecture et annoncer le temps des essais à part. |
| **GÊNANT** | Les ASCII larges (cadre m01-l01, javac m01-l02, UML m06-l02, Scanner m03-l03…) | Sur téléphone, la plupart des `illus` dépassent la boîte (320 à 384 px pour 295 disponibles) : le schéma est coupé et se lit avec un ascenseur horizontal. | Limiter les ASCII à environ 36 colonnes, ou réduire la police des `illus` sous 400 px. |
| **GÊNANT** | Les `predire` dont la réponse a des accents : m02-l02 Test 2 « Thiès », m02-l05 S3 « décimales », m04-l03 S3 « Féminin » | Si elle tape `Thies` ou `Feminin` (fréquent au clavier du téléphone), le diagnostic répond « la ligne 1 n'est pas la bonne » : elle croit s'être trompée en Java. | Dans `diagnostic()`, comparer aussi sans accents et répondre « Presque ! Regarde les accents ». |
| **GÊNANT** | Les `exo` en `run: "fichier"` (m01-l01, m06-l02/03/04) | « Copier mon essai pour le tester » copie le texte tel quel. Si elle n'a écrit que les lignes du milieu (ce que m01-l01 S3 lui a appris : « on ne montre souvent que cette zone »), OneCompiler refuse. | Dans l'énoncé, dire explicitement « écris le programme complet, cadre compris », ou détecter l'absence de `class` et l'envelopper. |
| **DÉTAIL** | `exo` : zone d'essai à 3 lignes | Pour m02-l05 (10 lignes) ou m06 (fichiers de 15 lignes), la zone est minuscule sur téléphone. | Fixer `rows` d'après le nombre de lignes du corrigé (plafond 12). |
| **DÉTAIL** | Les renvois « slide 26 », « p.36 »… dans le flux principal (`ecart`, `attention`) | Awa n'a pas toujours les slides sous la main : ces renvois ressemblent à du bruit. Les `ecart` placés hors `depliable` (m02-l04 S3, m03-l01 S4, m05-l03 S2) ajoutent une idée de plus au moment où elle est chargée. | Mettre les `ecart` du flux principal dans un `depliable genre: "examen"`, sauf quand l'erreur du support la piégerait directement. |

---

## 1. Module 1 — Premiers pas

### m01-l01 · Ton premier programme tourne — annoncé 5 min, réel **15-20 min** (ouvrir OneCompiler, coller, relancer)
**Ce qui marche** : voir « Hello World ! » tourner avant toute théorie, c'est la fierté du premier soir. L'ASCII du cadre, avec « ta ligne » au milieu, est limpide. Le Ctrl+Z dédramatise. Le guidage OneCompiler suffit, surtout parce que le modèle par défaut de OneCompiler s'appelle déjà `Main`.
- **GÊNANT** · S3 · exo · « Reprends le programme Hello World… ». Le bloc juste au-dessus dit « on ne montre souvent que cette zone », et le corrigé est un fichier complet en `run: "fichier"`. Si elle tape seulement ses deux `println` puis « Copier mon essai », OneCompiler échoue. → Ajouter « (tout le programme, cadre compris) », ou passer l'exo en `run: "main"`.
- **DÉTAIL** · S1 · texte « Pour l'essayer sans rien installer… ». Sur téléphone, « remplace le code » sous-entend « tout sélectionner, coller ». → Ajouter : « appui long → Tout sélectionner → Coller ».
- **DÉTAIL** · S1 · depliable « Sur ton ordinateur ». Le mot « terminal » n'est pas expliqué. → Ajouter « (la fenêtre où l'on tape des commandes) ».
- Test : 3 questions nettes, sans piège.

### m01-l02 · javac, java et le cadre — annoncé 6 min, réel **12-15 min**
**Ce qui marche** : l'image du livre en wolof traduit puis lu, et les « poupées russes ». L'encadré du cadre (tout en gris : « un formulaire officiel ») rassure.
- **BLOQUANT** (téléphone) · S1 · ordre · « Remets les étapes dans l'ordre ». Les flèches ↓ sont hors écran (voir §0).
- **GÊNANT** · S2 · code « HelloWorld.java (slide 21) ». « Copier pour essayer » copie `public class HelloWorld` tel quel (mode `fichier`). Dans OneCompiler, le fichier s'appelle Main.java : l'erreur `class HelloWorld is public, should be declared in a file named HelloWorld.java` tombe **avant** la section qui l'explique. → Retirer `run: "fichier"` pour mettre `run: "aucun"`, ou ajouter sous le bloc : « Pour l'essayer en ligne, renomme HelloWorld en Main ».
- **DÉTAIL** · S1 · code « Dans un terminal » et ordre « Taper javac… ». Awa n'a jamais ouvert de terminal : ces commandes restent abstraites. → Une phrase : « Sur OneCompiler, le bouton Run fait ces deux commandes pour toi » (c'est dit seulement dans l'explication de l'ordre, donc après coup).
- **DÉTAIL** · S2 · code, décomposition, ligne 2 « La méthode principale main ». Le mot « méthode » n'est pas défini. → « méthode (un bloc d'instructions qui porte un nom) ».
- Test : correct.

### m01-l03 · Lire un message d'erreur — annoncé 5 min, réel **10 min**
**Ce qui marche** : le schéma fichier / ligne / cause avec le chapeau `^`, très efficace. Les trois erreurs suivies de deux quiz « que vérifies-tu ? » donnent un vrai réflexe. Moment de fierté quand elle corrige les deux erreurs.
- **DÉTAIL** · retenir n°3 « le lexique du site les traduit ». Le lexique n'a jamais été montré. → En faire un lien (`<a href="lexique.html">`).
- **DÉTAIL** · S3 · exo corriger. Les numéros de ligne du message (3 et 4) correspondent au programme complet, mais la plupart des exemples suivants ne montrent que la zone centrale. Plus tard, un message « ligne 7 » ne collera pas au snippet affiché. → Une phrase dans m01-l03 : « Le numéro compte les lignes du fichier complet, cadre compris ».
- Test : correct.

---

## 2. Module 2 — Variables et types

### m02-l01 · Une variable, c'est une boîte — annoncé 6 min, réel **10-12 min**
**Ce qui marche** : boîte, étiquette, contenu. Le pont `age ← 20` avec l'algo, le vestiaire, le trou `prix`. Rythme idéal.
- **DÉTAIL** · S5 · erreur `int age = "20";`. Le message dit `String cannot be converted to int` alors que `String` n'est présenté qu'à la leçon suivante. → Dans `explication` : « (String = le nom que Java donne aux textes) ».
- Test : facile, rassurant.

### m02-l02 · Changer la valeur, afficher avec du texte — annoncé 6 min, réel **12 min**
**Ce qui marche** : l'ASCII `age ← age + 1` → `age = age + 1;`, la trace, le « = se lit reçoit », les wagons de la concaténation. L'exo `Prix : 500 FCFA` est concret.
- **DÉTAIL** · S1 · predire `int y = x; x = 10;`. Première prédiction de la leçon, et c'est un piège : un « raté » d'entrée. Acceptable, mais on pourrait mettre d'abord un predire direct (`age = age + 1`).
- **DÉTAIL** · S4 « print ou println » · quiz « Que fait `age = 25;`… ». Le quiz porte sur l'affectation (S1), pas sur print. → Le déplacer en fin de S1, ou le remplacer par un quiz print/println.
- **DÉTAIL** · Test 2 · « Thiès ». Accent attendu (voir §0).

### m02-l03 · Les types primitifs — annoncé 6 min, réel **14 min**
**Ce qui marche** : les trois petits quiz « quel type pour… » (âge, moyenne, inscrit) sont rapides et valorisants. Le collier de perles pour String.
- **GÊNANT** · S1 · six types d'un coup (byte, short, int, long + L, double, float + f). C'est la section la plus dense du module, et elle tombe en fin de soirée. → Ne garder dans le flux que `int`, `long` et `double`. Mettre `byte`/`short`/`float` dans le `depliable` « examen » (l'erreur `float pi = 3.14` peut y aller aussi).
- **DÉTAIL** · S3 · attention « La slide 26 montre `float pi=3.14f;` puis… ». C'est une 3e idée (nom déjà défini) dans une section sur les erreurs de forme. → Mettre ce bloc en `depliable examen`.
- Test : correct. `note + " " + moyenne` avec un char passe bien.

### m02-l04 · Compatibilité et cast — annoncé 6 min, réel **14 min**
**Ce qui marche** : verre et bouteille, et le `compare` troncature / arrondi, très clair. Le predire 13.99 → 13 marque les esprits.
- **GÊNANT** · Test 3 · predire `char c = '0'; int n = c;` → `48`. Rien dans la leçon ne donne le code de '0'. Il faut déduire de '2' = 50 que « les chiffres se suivent », ce que seule l'explication dit, *après*. Pour une débutante, c'est un piège. → Écrire dans S3 : « les chiffres se suivent : '0' vaut 48, '1' vaut 49, '2' vaut 50 ». Ou changer le test en `'2'`.
- **DÉTAIL** · S2 · attention « Exception utile : … `byte b = 100;` ». Une exception à la règle juste après la règle, sur un type (byte) qu'elle n'utilisera jamais. → La mettre en `depliable examen`.
- **DÉTAIL** · S3 · le terme « code » du caractère n'est pas nommé (ASCII / Unicode). → « son code (un numéro dans la table Unicode) ».
- **DÉTAIL** · depliable · « 130 dépasse 127 de 3 crans, on arrive à −128 + 2 ». Le calcul est juste mais déroutant. → « 128 → −128, 129 → −127, 130 → −126 ».

### m02-l05 · Bilan : la fiche d'Adama v1 — annoncé 8 min, réel **20-25 min**
**Ce qui marche** : les 7 boîtes, le trou des types, puis le défi qui affiche une vraie fiche. **Gros moment de fierté** quand les trois lignes sortent exactement.
- **GÊNANT** · S3 · exo combiner « Ajoute note2… affiche exactement : `Adama SECK (A), 22 ans`… ». Dix lignes à taper, des parenthèses et des virgules **dans** les guillemets, aucun trou intermédiaire. Sur téléphone, c'est 15 minutes et beaucoup d'erreurs d'espace. → Mettre avant un `trous` sur la 1re ligne seulement : `nom + " (" + ___ + "), " + ___ + " ans"`.
- **GÊNANT** · Test 3 · predire « échange raté » (`14.0 14.0`). Le sujet n'est traité que dans le `depliable` « Défi libre », qu'on lui dit facultatif. Si elle l'a sauté, le test l'interroge sur ce qu'elle a eu le droit de ne pas lire. On peut le déduire de m02-l02, mais c'est subtil. → Mettre l'« échange raté » (code + attention) dans le flux principal, ou remplacer ce test.
- **DÉTAIL** · S4 · versions v2. `double note1 = 12.5, note2 = 15.0, note3 = 9.75;` (plusieurs déclarations initialisées sur une ligne) n'a été vu que dans une correction d'erreur (m02-l02). → Une ligne d'explication dans `ajout`.

---

## 3. Module 3 — Calculer et dialoguer

### m03-l01 · Division entière, reste, priorité — annoncé 6 min, réel **13 min**
**Ce qui marche** : le problème de départ (13 au lieu de 13,5), les mangues, `div`/`mod` reliés à l'algo, le piège `"Somme : " + 2 + 3`. Elle se sent forte : elle reconnaît son cours d'algo.
- **DÉTAIL** · S5 · exo · indice « Un seul caractère à ajouter (ou deux) ». C'est obscur : `2.` (un caractère) est valide mais jamais montré, `.0` en fait deux. → « Transforme 2 en 2.0 ».
- **DÉTAIL** · S4 · ecart « p.36 » dans le flux (voir §0).
- Test : 4 questions, dont le rappel `"Adama a" + age + "ans"`. Bon.

### m03-l02 · ++, -- et raccourcis — annoncé 5 min, réel **11 min**
**Ce qui marche** : la trace `i++` / `++i` et l'image du guichet. Les predire sont bien dosés.
- **GÊNANT** · S4 · « cast caché » de `+=` puis, dans le même `attention`, le piège `x =+ 5`. Deux subtilités d'expert d'affilée, et la première est testée (Test 3 : `n += 2.7`). → Garder le cast caché mais déplacer `x =+ 5` en depliable. Annoncer clairement : « c'est un piège rare, retiens juste : une somme de notes en double ».
- Test : correct, Test 3 cohérent avec ce qui a été enseigné.

### m03-l03 · Lire au clavier avec Scanner — annoncé 6 min, réel **20-25 min** (STDIN, essais)
**Ce qui marche** : le guichet qui attend, la « recette » à recopier, le `compare` terminal / sortie qui explique pourquoi la saisie n'apparaît pas. Le `new` « expliqué en m06 » rassure.
- **GÊNANT** · leçon la plus longue du parcours (5 sections : import, new, invite, STDIN, 4 `next…`, piège `nextInt`/`nextLine`, virgule ou point, deux types d'erreurs, exo). Fatigue garantie. → Couper : déplacer S4 « Deux pièges » (⏎ restant + virgule/point) vers le début de m03-l04, ou dans un `depliable plus`.
- **GÊNANT** · S4 · predire « Avec la saisie `20 ⏎ Adama ⏎`… » → `[]`. On lui demande de prédire un comportement que rien ne permet de deviner (le ⏎ laissé par `nextInt`). Elle échoue à coup sûr, dans la leçon déjà la plus lourde. → En faire un `code` avec sortie commentée (« surprise ! ») suivi de la correction, ou un quiz « Que contient nom ? » dont une option est « un texte vide ».
- **DÉTAIL** · S4 · attention « Virgule ou point ? … Essaie la virgule ; si tu obtiens… ». Elle lui fait provoquer une exception exprès alors qu'elle teste sur OneCompiler (point). → « Sur OneCompiler : le point. Sur ton ordinateur en français : peut-être la virgule ».
- Test : correct.

### m03-l04 · Bilan : la moyenne d'Adama v2 — annoncé 8 min, réel **15-20 min**
**Ce qui marche** : le predire 30.75 (« une moyenne de 30,75 sur 20 ! ») fait sourire et marque les esprits. La remarque « Java affiche tous les chiffres… c'est normal » évite une panique devant 12.416666666666666.
- **DÉTAIL** · défi peu actif : seulement des trous, et l'assemblage final est montré dans `versions` sans jamais être demandé. → Un `exo combiner` (non facultatif) : « Écris la v3 complète et teste-la dans OneCompiler avec 14, 16, 12 en STDIN ».
- **DÉTAIL** · S1 · texte « on ne gardera ensuite que le nom et les notes ». Le fil rouge perd l'initiale, l'âge et l'inscription sans dire pourquoi. Acceptable.
- Test : correct, et le rappel m01-l03 est bien choisi.

---

## 4. Module 4 — Choisir et répéter

### m04-l01 · if … else — annoncé 6 min, réel **14 min**
**Ce qui marche** : l'échauffement, le `compare` SI/SINON/FINSI ↔ if/else (Awa se sent en terrain connu), le parapluie et la casquette. L'erreur `if (x = 5)` arrive au bon moment.
- **DÉTAIL** · S3 · compare « En algo (Algo Rookie) ». Si elle n'a pas utilisé Algo Rookie, le nom ne lui dit rien. → « En algo (pseudo-code) ».
- **DÉTAIL** · S4 · attention sur l'ordre des mentions. Le mot « Passable » arrive sans le barème, qui n'est donné qu'en m04-l06.
- Test : correct, avec une bonne question à la limite (10 > 10).

### m04-l02 · &&, ||, ! — annoncé 5 min, réel **10 min**
**Ce qui marche** : les interrupteurs en série et en parallèle, le piège `0 <= note <= 20`, les trois mini-quiz de table de vérité (rapides, valorisants).
- **GÊNANT** · S4, titre « Pour l'examen ». La section entière porte ce titre alors qu'elle contient, hors du depliable, le predire « Peut voter ». Une étudiante fatiguée saute la section et rate la seule prédiction qui combine `if` et `&&`. → Titre « Une condition à deux morceaux », avec le depliable examen en dessous.
- **DÉTAIL** · depliable · « `5 & 3` vaut 1 » : du bit à bit sans explication. Facultatif, mais ça inquiète. → Retirer, ou dire « (calcul sur les bits, hors programme) ».

### m04-l03 · switch — annoncé 5 min, réel **12 min**
**Ce qui marche** : l'ascenseur, l'exemple wolof (« Nanga def ? » fait sourire), le `compare` switch / if.
- **DÉTAIL** · S3 · predire « Les `break` ont été oubliés… ». On lui demande de prédire avant d'avoir expliqué le « passage » d'un cas à l'autre. Elle répond « Masculin » et se trompe. Défendable (on découvre en se trompant), mais à ce stade c'est un 2e échec « surprise » dans le module. → Ajouter dans la question : « Indice : sans break, rien n'arrête l'exécution ».
- **DÉTAIL** · S3 · réponse attendue « Féminin » (accent, voir §0).
- Test : correct. Test 1 (break manquant dans le cas 2) est bien progressif.

### m04-l04 · for — annoncé 5 min, réel **12 min**
**Ce qui marche** : la trace pas à pas (la boîte i qui disparaît à la fin), le `compare` POUR ↔ for, le trou de la somme 1..100 = 5050. Une des meilleures leçons.
- Aucun problème notable. **DÉTAIL** : la `portée` est définie à l'intérieur d'un bloc `erreur`. → La reprendre en `cle`.

### m04-l05 · while et do…while — annoncé 6 min, réel **15 min**
**Ce qui marche** : l'ASCII « on regarde puis on saute / on saute puis on regarde », la trace 10 % 3, la validation de saisie qui sert vraiment.
- **DÉTAIL** · S3 · attention RÉPÉTER … JUSQU'À. L'idée d'inverser la condition est juste mais abstraite. → Un exemple : « JUSQU'À note ≥ 0 ET note ≤ 20 » devient « `while (note < 0 || note > 20)` ».
- Test : correct (0 tour / 1 tour bien contrastés).

### m04-l06 · Bilan : validation et mention v3 — annoncé 8 min, réel **20 min**
**Ce qui marche** : les trous `do` et `||`, les quatre seuils, le quiz « et si on testait ≥ 10 en premier ? ».
- **GÊNANT** · S4 · code « La v3 complète », **24 lignes** (`do…while` dans un `for`, puis une cascade de 5 `if`). C'est un mur de code en fin de module, et elle n'a rien à faire dessus. → Le présenter en `versions` (v3a : boucle + validation ; v3b : + mention), ou en `ordre`/`trous` sur la partie boucle seulement.
- **GÊNANT** · défi passif : aucun exercice non facultatif ne lui demande d'écrire. → Un `exo combiner` : « Change n en 4 et teste avec 5 valeurs en STDIN dont une invalide ».
- **DÉTAIL** · depliable · « Bonus : un menu switch… dans ta fiche » sans corrigé.

---

## 5. Module 5 — Méthodes

### m05-l01 · Créer ta méthode — annoncé 6 min, réel **14 min**
**Ce qui marche** : la machine et son bouton, la trace « le programme démarre dans main, pas en haut du fichier », la recette dans le cahier, et la révélation « main est une méthode » avec le cadre qui verdit. Grand moment de compréhension.
- **DÉTAIL** · S2 · cours « `public static type_retour nom(type1 nom1, …)` ». La forme générale, avec type de retour et paramètres, arrive avant même la première méthode. Ça impressionne. → Montrer cette slide en m05-l02, ou la mettre en depliable.
- **DÉTAIL** · S5 · erreur « illegal start of expression ». Le snippet ne montre pas le `main` qui l'entoure : « Ce code est placé dans main » n'est pas visible. → Montrer `public static void main(...) {` autour.
- Test : correct.

### m05-l02 · Paramètres et return — annoncé 6 min, réel **16 min**
**Ce qui marche** : la machine avec entrées et sortie, le `compare` afficher / rendre (très utile), l'exo `moyenne(a, b, c)` réussi juste après le trou `moyenne2`. Bonne progression vers l'exercice « créer ».
- **DÉTAIL** · S2 · predire `ligne(int n)`. Il contient `System.out.println();` vide, jamais vu, et une boucle dans une méthode. → Une ligne de décomposition ou un mot dans la question.
- **DÉTAIL** · S5 · exo. Le corrigé affiche `12.0`. Elle peut attendre `12`. → Ajouter dans `corrige.html` : « 12.0 car le résultat est un double ».
- Test : correct. Le quiz paramètre / argument est utile.

### m05-l03 · La surcharge — annoncé 5 min, réel **13 min**
**Ce qui marche** : le guichet à plusieurs fentes, et « println est surchargée, tu t'en sers depuis le premier jour » (vrai déclic).
- **DÉTAIL** · S4 · exo corriger. Le code à corriger est écrit dans l'énoncé (`<code>` en ligne), pas dans un bloc : pas de bouton « Copier », elle doit tout retaper, et sans `main`. Le corrigé change aussi `double` en `int` sans le dire. → Mettre le code fautif dans `code:` avec un `main`. Dire « garde int ».
- **DÉTAIL** · S4 · depliable « Défi libre : la fiche d'Adama en méthodes ». Il n'a pas de corrigé, et `String mention(double moy)` demande plusieurs `return` dans un `if`, ce qui n'a jamais été montré.
- **DÉTAIL** · S2 · ecart JVM / compilateur dans le flux (voir §0).
- Test : correct.

---

## 6. Module 6 — Objets

### m06-l01 · Penser objet — annoncé 5 min, réel **10 min**
**Ce qui marche** : leçon sans code, reposante. Le téléphone (état / comportement), les jumeaux (identité), le plan d'architecte. Quiz courts.
- **DÉTAIL** · S3 · cours « Une classe décrit une abstraction d'objets ayant une sémantique commune… ». Une phrase de 40 mots de jargon. Le texte qui suit rattrape bien, mais elle décroche à cet endroit. → Mettre la citation en depliable « dans les mots du cours » et garder seulement le texte simple.
- **DÉTAIL** · S2 · « comportement = opérations ». Le lien opérations = méthodes n'est pas dit. → « (en Java, ce seront des méthodes) ».

### m06-l02 · Première classe : attributs et new — annoncé 6 min, réel **18 min**
**Ce qui marche** : la télécommande (référence), le predire `e2 = e` → 23 (vrai « aha »), le rappel « tu l'avais déjà écrit dans `new Scanner` ».
- **GÊNANT** · S5 · exo reproduire « classe Voiture ». C'est le premier fichier à deux classes écrit de zéro, sans trou avant. → Ajouter un `trous` (`class ___ {`, `___ v = new ___();`).
- **DÉTAIL** · S1 · pourquoi « *Le code Java objet de ce module… n'est pas dans les slides fournies : compare avec tes notes de cours.* ». Elle ne comprend pas ce qu'on attend d'elle. → Le déplacer en note `depliable culture`, ou supprimer.
- **DÉTAIL** · S1 et S4 · code « Le plan » et la classe avec `afficher()`. « Copier pour essayer » copie une classe sans `main` : OneCompiler échoue. → `run: "aucun"` (pas de bouton) ou un `main` d'exemple.
- **DÉTAIL** · S4 · cadre. Le sens complet de `static` arrive en même temps que la méthode d'instance : dense, mais bien expliqué.
- Test : correct.

### m06-l03 · Le constructeur — annoncé 5 min, réel **14 min**
**Ce qui marche** : la maternité et son bracelet, `this.nom = nom` bien lu à voix haute.
- **GÊNANT** · S1 · predire → `Adama (0 ans)`. Elle doit prédire une valeur par défaut (0) jamais enseignée. Elle répondra « erreur » ou « Adama ( ans) ».
- **GÊNANT** · S3 · predire → `null`. Le mot `null` n'existe pas encore pour elle : impossible à trouver. **Deux prédictions « infaisables » dans la même leçon** : c'est décourageant. → Pour la 1re, ajouter dans la question « (un attribut int jamais rempli vaut 0) ». Pour la 2e, en faire un quiz avec les options « Adama / null (aucune valeur) / erreur de compilation ».
- **GÊNANT** · S4 · exo corriger « Ce constructeur a deux défauts… pour que le programme affiche Toyota ». Seule la ligne fautive est donnée, en ligne : ni la classe ni le `main` (« le programme » n'existe pas à l'écran). → Donner le fichier complet fautif dans `code:`.
- Test : correct.

### m06-l04 · Encapsulation — annoncé 6 min, réel **16 min**
**Ce qui marche** : le distributeur de billets, le predire du setter qui refuse -5 (22 puis 23), « Enfin public » avec le cadre presque vert. Fierté.
- **GÊNANT** · S3 « Les quatre visibilités ». `protected`, « paquetage » et « classes filles » arrivent avant l'héritage, avec un tableau, du code, du texte, une attention et 3 quiz. C'est la section la plus dense du module. → Garder `public`/`private` (et « rien ») ; reporter `protected` à m06-l05, où il sert vraiment.
- **GÊNANT** · S4 · exo modifier « Reprends la classe Etudiant… ». Il n'y a pas de bloc de départ à copier : elle doit tout réassembler depuis les leçons précédentes, sur téléphone. → Fournir le code de départ dans `code:`.
- **DÉTAIL** · S3 · quiz « … peut-elle lire `salaire` ? ». La bonne réponse est « Non », et son explication commence par « Oui : privé… ». Elle lit « Bravo ! Oui : » après avoir cliqué « Non » et doute. → Commencer par « Exact : ».
- **DÉTAIL** · S1 · cours « L'encapsulation consiste à masquer… en définissant une interface ». Le mot « interface » reviendra en m06-l06 avec un autre sens. → « (ici, interface = les services visibles) ».
- **DÉTAIL** · S4 · cadre « Depuis Java 25, un main sans public est accepté… ». C'est une information de version inutile pour elle à ce stade. → La supprimer.

### m06-l05 · Héritage : extends et super — annoncé 6 min, réel **14 min**
**Ce qui marche** : « est une », l'arbre de la slide 15, le quiz `Voiture extends Personne` (drôle et clair), le predire `e.nom` hérité.
- **DÉTAIL** · S3 · texte « obligatoire jusqu'à Java 24 » et Test 1 « en Java 21, javac le refuse ». Elle ne sait pas quelle version elle utilise : ce discours sur les versions sème le doute. → « Écris-le toujours en première ligne », sans numéro de version.
- **DÉTAIL** · S4 · erreur `class C extends A, B` → `'{' expected`. Le message ne parle pas d'héritage multiple, et l'explication le dit bien. OK.
- Test : correct.

### m06-l06 · Pour aller plus loin — annoncé 6 min, réel **10 min**
**Ce qui marche** : « rien n'est à maîtriser ce soir » (parfait pour une étudiante fatiguée), le trapéziste et son filet, le quiz « une interface n'est pas une fenêtre ». **Le cadre enfin tout vert, c'est la récompense du parcours.** La carte de la suite donne envie.
- **DÉTAIL** · S4 · `String[] args`. Elle ne pourra pas l'essayer dans OneCompiler. → Une phrase : « En ligne, pas besoin ; sur ton ordinateur : `java Main Awa` ».
- Test : correct, sans piège.

---

## 7. Réponses d'Awa au petit test : questions piégeuses ou discutables

| Leçon | Question | Verdict |
|---|---|---|
| m02-l04 | Test 3 `'0'` → 48 | **Piège** : à déduire de '2' = 50, jamais posé comme règle. |
| m02-l05 | Test 3 échange raté | Porte sur un contenu présenté comme facultatif. |
| m03-l03 | S4 predire `[]` | Infaisable sans connaître le ⏎ résiduel (dans la leçon, pas dans le test). |
| m06-l03 | S1 `0 ans`, S3 `null` | Infaisables : valeurs par défaut jamais enseignées. |
| m06-l04 | quiz « salaire » → « Non » / « Oui : … » | Formulation contradictoire. |
| m06-l05 | Test 1 « en Java 21… » | Juste, mais la mention de version trouble. |
| m02-l02, m02-l05, m04-l03 | réponses accentuées | Rejet sur un accent, avec un message trompeur. |

Les autres questions (environ 80) sont nettes, avec une seule bonne réponse indiscutable et des `pourquoi` bienveillants.

---

## 8. Temps réel estimé (Awa, fatiguée, teste sur OneCompiler)

| Module | Annoncé | Estimé |
|---|---|---|
| m01 | 16 min | 40-45 min |
| m02 | 32 min | 70-75 min |
| m03 | 25 min | 60-70 min |
| m04 | 35 min | 85-90 min |
| m05 | 17 min | 43 min |
| m06 | 34 min | 80-85 min |
| **Total** | **≈ 2 h 40** | **≈ 6 h - 6 h 30** |

---

## 9. Top 10 des corrections les plus utiles

1. **Corriger le débordement horizontal sur téléphone** du « Petit test » (19 leçons) et de l'exercice `ordre` (flèches ↓ invisibles) : `.zone-test` et `.ordre-liste` → `grid-template-columns: minmax(0, 1fr)`.
2. **Annoncer des durées réalistes** (×2 à ×2,5), au moins dans le message « La prochaine leçon dure environ… ».
3. **m06-l03** : rendre faisables les prédictions `0 ans` et `null` (indice dans la question, ou un quiz à options).
4. **m03-l03** : alléger la leçon la plus lourde. Sortir « Deux pièges » (⏎ résiduel, virgule/point) vers m03-l04 ou un depliable, et transformer le predire `[]` en démonstration.
5. **m01-l02** : le `HelloWorld` copiable échoue sur OneCompiler avant que l'erreur soit expliquée. Passer en `run: "aucun"` ou ajouter « renomme en Main pour l'essayer ».
6. **Exercices en mode fichier** (m01-l01, m06-l02/03/04) : fournir le code de départ complet dans `code:`, et dire « écris le programme complet, cadre compris ».
7. **m04-l06** : découper le mur de 24 lignes en `versions`, et ajouter un vrai exercice d'écriture au bilan.
8. **m02-l04 Test 3** (`'0'` → 48) et **m02-l05 Test 3** (échange) : rendre la règle explicite avant de la tester, ou remonter le contenu facultatif dans le flux principal.
9. **`predire` tolérant aux accents** : message « Regarde les accents » au lieu de « la ligne 1 n'est pas la bonne ».
10. **Désépaissir les sections les plus denses** : m02-l03 S1 (byte/short/float en depliable), m06-l04 S3 (reporter `protected` à l'héritage), m04-l02 S4 (renommer la section « Pour l'examen » qui cache un exercice obligatoire).
