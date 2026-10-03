# QA Java du contenu rédigé (27 leçons + lexique)

Relecture du **texte** des leçons `courses/m0*/…js` et de `courses/lexique.js`, avec `docs/principes.md`, `docs/source-cours.md` et `docs/revue-java.md`.
Tous les extraits passent déjà `node tools/verifier.mjs --erreurs` : chaque message d'erreur annoncé correspond au vrai message de `javac` 21. Les points ci-dessous portent donc sur ce que la machine ne vérifie pas.
Les tests sont dans `scratchpad/qa-java/` (t1 à t10). Ils ont été compilés avec `javac --release 21` et exécutés avec JDK 26.0.1, sauf mention contraire.

Gravité :
- **HAUTE** : affirmation fausse, ou contradiction que l'élève rencontrera.
- **MOYENNE** : simplification qui installe une intuition à corriger plus tard, ou incohérence de terminologie.
- **BASSE** : nuance, formulation ou dépendance à la plateforme.

Aucun point CRITIQUE. Aucun bloc `ecart` ne corrige le professeur sur un point où il aurait raison. Le n° 7 est un cas limite, et le ton est respectueux partout.

---

## HAUTE

### 1. m02-l04 · section 1 · `texte` « Un type A est compatible… » + `cle` « Sens automatique… » — et lexique « conversion implicite »
- **Problème** :
  - Le texte dit que la conversion implicite se fait « sans rien perdre ». Le bloc `cle` qui suit liste pourtant `long → float → double`.
  - Le lexique répète « quand elle tient sans perte » avec la même chaîne.
  - La conversion vers `float` peut perdre des chiffres dès `int → float`, et vers `double` dès `long → double`.
  - La leçon le montre elle-même dans son dépliable (`16777217` → `1.6777216E7`) : elle se contredit donc.
- **Preuve (t2)** :
  - `long l = 123456789123456789L; float f = l; double d = l;` → `(long) f = 123456790519087104` et `(long) d = 123456789123456784`.
  - `float g = 16777217;` → `1.6777216E7`.
- **Correction** :
  - Texte, phrase de fin : « Java fait alors une **conversion implicite** : il change le type tout seul. Entre entiers (et vers `double` pour un `int`), rien n'est perdu. Seule exception, vue plus bas : un très grand entier converti en `float` peut perdre ses derniers chiffres. »
  - Lexique : « Java change tout seul le type d'une valeur vers un type « plus grand » : `byte → short → int → long → float → double`, et `char → int`. Pas de perte entre entiers ; vers `float` (ou de `long` vers `double`), un très grand nombre peut perdre ses derniers chiffres. »

### 2. m06-l05 · section 2 · `texte` « Personne est la classe mère… » + test `quiz` n°2, `pourquoi` « une fille reçoit tout ce que contient sa mère » — et lexique « héritage (extends) »
- **Problème** :
  - Le texte dit « elle hérite de **tout** ce que la mère contient », et le lexique dit « reprend tout ce que définit sa classe mère ».
  - Or les **constructeurs ne s'héritent pas**, et un attribut `private` de la mère n'est **pas accessible** dans la fille.
  - Ce cas arrivera tout de suite : la leçon précédente (m06-l04) vient de recommander de mettre les attributs en `private`. Si l'élève écrit `private String nom;` dans `Personne`, son `Etudiant` ne compile plus.
  - La leçon passe d'ailleurs à `protected` sans dire pourquoi.
- **Preuve** :
  - t4 : `private String nom;` dans `Personne`, puis `System.out.println(nom);` dans `Etudiant` → `error: nom has private access in Personne`.
  - t5 : `new Etudiant("Adama")` alors que seule `Personne(String)` existe → `constructor Etudiant in class Etudiant cannot be applied to given types`.
- **Correction** :
  - Texte : « … elle **hérite** des attributs et des méthodes de la mère, et ajoute ce qui lui est propre. Deux exceptions : les constructeurs ne s'héritent pas (d'où `super(…)`), et un attribut `private` de la mère existe bien dans l'objet, mais la fille ne peut pas l'utiliser directement. C'est pourquoi `nom` est ici `protected`. »
  - `pourquoi` du quiz : « Si : une fille reçoit les attributs et méthodes de sa mère, qui les a elle-même reçus de la sienne. »
  - Lexique : « Une classe fille reprend les attributs et méthodes de sa mère (pas ses constructeurs ; les membres `private` ne lui sont pas accessibles) et y ajoute ses particularités… »

### 3. m01-l01 · section 1 · `depliable` « Sans rien installer : OneCompiler » / m06-l05 · section 3 · `texte` « super(…) appelle… » + test `quiz` n°1 « En dernière ligne… »
- **Problème** :
  - D'après sa propre page, OneCompiler fait tourner **Java 25**, alors que le site fait installer le JDK 21 et vérifie avec `--release 21`. Citation : « Java 25 is the current version running on OneCompiler », relevé le 2026-10-02.
  - Sous Java 25, `super(nom)` placé **après** d'autres instructions compile et s'exécute (constructeurs flexibles, JEP 513).
  - Le `pourquoi` « en Java 21, javac le refuse ailleurs qu'en première ligne » est donc démenti par l'outil que le site recommande. Un élève qui essaie conclura que la leçon se trompe.
  - Même remarque pour un `main` sans `public`. L'encadré de m06-l04 le traite déjà bien.
- **Preuve (t10)** :
  - `Etudiant(String n, String m){ this.matricule = m; super(n); }` avec un `static void main` non public → sous JDK 26 : `Adama 201506SRG`.
  - Avec `--release 21` : `error: flexible constructors is not supported in -source 21`.
- **Correction** :
  - m01-l01, ajouter au dépliable OneCompiler : « OneCompiler utilise une version plus récente de Java (25) que celle conseillée ici (21). Tout ce que montre ce site fonctionne sur les deux ; seules quelques nouveautés récentes, signalées au passage, n'existent pas en Java 21. »
  - m06-l05, `pourquoi` du quiz : « Non : jusqu'à Java 24, javac le refuse ailleurs qu'en première ligne. (Java 25, celui de OneCompiler, l'accepte plus bas sous conditions ; garde la première ligne, qui marche partout.) »

---

## MOYENNE

### 4. m01-l02 · section 2 · `texte` « Pour l'instant, une classe est la boîte… son nom doit être celui du fichier » — lexique « classe » (« son nom = le nom du fichier ») — m06-l02 · section 1 · `texte` « Le mot class déclare un plan… »
- **Problème** : la règle exacte est que la classe **`public`** porte le nom du fichier. Le message `javac` que la leçon cite le dit lui-même (« class HelloWorld **is public**… »). En m06-l02, `Etudiant` vit dans `Main.java` : l'élève voit la règle de m01 contredite, sans qu'on la relie.
- **Preuve** : tous les exemples `run: "fichier"` de m06 compilent avec `class Etudiant` dans `Main.java`.
- **Correction** :
  - m01-l02 : « … une **classe** est la boîte qui contient ton code ; quand elle est `public` (c'est le cas ici), son nom doit être celui du fichier. »
  - Lexique : « (une classe `public` porte le nom du fichier) ».
  - m06-l02, fin du texte : « …sans `public` : un fichier n'a qu'une seule classe publique, et c'est elle qui porte le nom du fichier. »

### 5. m06-l04 · section 5 · `texte` « Tu comprends maintenant le premier mot du cadre… »
- **Problème** : « La classe `Main` et la méthode `main` sont publiques pour que la JVM… puisse les appeler » est faux pour la **classe**. La JVM lance très bien une classe non publique. Seule la méthode `main` doit être publique, jusqu'à Java 24.
- **Preuve (t1)** : `class Main { public static void main… }`, compilé avec `--release 21` → `non public OK`.
- **Correction** : « `public` : visible de partout. La méthode `main` est publique pour que la JVM, qui lance ton programme depuis l'extérieur, puisse l'appeler. La classe `Main` est publique par habitude (et c'est elle qui donne son nom au fichier). »

### 6. m05-l02 · section 2 · `cours` « Les arguments fonctionnent comme des variables initialisées au moment de l'appel » (slide 50)
- **Problème** :
  - Juste avant, la leçon distingue **paramètre** (la variable) et **argument** (la valeur), puis le test l'interroge sur cette distinction.
  - La citation du cours, placée juste après, appelle « arguments » ce que la leçon vient de nommer paramètres. L'élève voit deux définitions contraires sans explication.
  - Le cours n'est pas faux : l'usage mélange souvent les deux mots. Il faut seulement le dire.
- **Correction** : ajouter juste après le bloc `cours` : `{ type: "texte", html: "Le cours emploie ici « arguments » au sens de nos <strong>paramètres</strong> : les deux mots sont souvent mélangés. Dans ce site : paramètre = la variable de la définition, argument = la valeur donnée à l'appel." }`.

### 7. m06-l02 · section 4 · `depliable` « static et la portée classe » · `ecart` « int x=20; : portée classe… »
- **Problème** :
  - Le cours a **raison sur la portée** : la portée d'un attribut est bien toute la classe (JLS §6.3). Le vrai obstacle est le **contexte static**, une autre règle.
  - Le `vrai` actuel laisse croire que le professeur se trompe sur la portée.
  - La phrase qui précède, « Elle ne peut donc pas utiliser un attribut tout seul », est fausse pour un attribut `static`, qui n'est pas enseigné mais existe.
- **Preuve** : le message de `javac` ne parle pas de portée (`cannot find symbol`) mais de contexte : `non-static variable x cannot be referenced from a static context`.
- **Correction** :
  - `vrai` : « La portée de `x` est bien toute la classe. Mais `x` est un attribut : chaque objet a le sien. `main`, qui est `static`, n'a pas d'objet sous la main : il ne peut pas écrire `x` tout seul, il lui faut un objet (`m.x`). »
  - Texte : « … ne peut donc pas utiliser un attribut (non `static`) tout seul… ».

### 8. m06-l03 · section 2 · `texte` « Un constructeur est une méthode spéciale… » — lexique « constructeur » (« Le bloc appelé par new »)
- **Problème** :
  - Pour Java, un constructeur **n'est pas une méthode** (JLS §8.8 : il n'est ni hérité ni appelé par son nom).
  - `principes.md` cite justement « méthode vs constructeur » parmi les confusions à anticiper.
  - La leçon la crée, puis la combat dans le bloc `compare` (« Méthode (pas un constructeur !) »).
  - Le lexique, lui, dit « bloc » : la terminologie diffère d'une source à l'autre.
- **Correction** : « Un **constructeur** est un bloc spécial, qui ressemble à une méthode, appelé par `new` pour préparer l'objet. Il porte *exactement* le nom de la classe et n'a *aucun* type de retour, pas même `void`. »

### 9. m06-l03 · section 1 · `predire` (« Un attribut int jamais rempli vaut 0 ») — contre m02-l02 `retenir` « Une variable doit avoir une valeur avant d'être lue »
- **Problème** : la règle de m02 est absolue, mais elle ne vaut que pour les **variables locales**. Les attributs reçoivent une valeur par défaut. m06-l03 montre `0`, puis `null`, sans relier ce résultat à la règle apprise : l'élève voit une contradiction.
- **Correction** : explication du `predire` : « … Un attribut jamais rempli reçoit une valeur par défaut : 0 pour un nombre, `false` pour un booléen, `null` pour un texte ou un objet. (Ce n'est pas le cas des variables locales de `main` : là, Java refuse qu'on lise une variable vide, m02.) Adama « a 0 an », sans aucun message d'erreur. »

### 10. m06-l04 · section 2 · `code` (classe avec `setAge`) + `predire` « C'est l'intégrité des données »
- **Problème** : bonne pratique incomplète, montrée sans avertissement. Le constructeur range `age` **sans vérifier** : `new Etudiant("Adama", -5)` crée un objet faux, alors que la leçon conclut que « l'objet reste correct ». En outre, le setter ignore la valeur refusée sans rien dire.
- **Preuve** : avec la classe de la leçon, `new Etudiant("Adama", -5).getAge()` → `-5`.
- **Correction** : ajouter un `attention` après le `predire` : « Le constructeur range encore l'âge sans le vérifier : `new Etudiant("Adama", -5)` passe. Pour être complet, il doit appeler `setAge(age);` au lieu de `this.age = age;`. Et un setter qui refuse en silence cache le problème : dans un vrai programme, on prévient (message, ou une exception, aperçue en fin de module). »

### 11. m02-l04 · section 2 · `attention` « Exception utile : une valeur écrite en toutes lettres… »
- **Problème** :
  - « En toutes lettres » veut dire, en français, « écrit avec des mots » (« cent »), alors que la leçon parle d'un nombre écrit directement dans le code.
  - La règle est aussi trop large : elle ne vaut que pour une **constante entière** vers `byte`, `short` ou `char`. Telle qu'elle est écrite, elle contredit le test de la même leçon, où `int b = 3.0;` est refusé alors que 3.0 « tient » dans un `int`.
- **Preuve (t3)** : `byte b = 100;` compile ; `int x = 3.0;` → `possible lossy conversion from double to int` ; `float f = 1.5;` → `possible lossy conversion from double to float`.
- **Correction** : « Exception utile, seulement pour les entiers : un nombre entier écrit directement dans le code, qui tient dans `byte` (ou `short`, `char`), est accepté sans cast. `byte b = 100;` compile, `byte b = 128;` est refusé (127 est le maximum). Elle ne vaut pas pour les réels : `int n = 3.0;` est refusé. »

### 12. lexique · « InputMismatchException » (« ou une virgule au lieu d'un point »)
- **Problème** : c'est vrai en `en_US`, et **faux en `fr_FR`/`fr_SN`**, où c'est le point qui provoque l'exception. Le lexique contredit m03-l03, qui conseille d'essayer d'abord la virgule.
- **Preuve (t9)** :
  - `fr_FR` : `12,5` → 12.5, et `12.5` → `InputMismatchException`.
  - `en_US` : `12,5` → `InputMismatchException`, et `1,500` → **1500.0**, sans aucune erreur.
- **Correction** : « … (un mot, ou un séparateur décimal qui ne correspond pas à la langue de la machine : virgule en français, point en anglais) ».
- **Facultatif**, dans l'`attention` de m03-l03 : « En anglais, `1,500` est même lu 1500, sans erreur. »

### 13. m03-l01 (texte « division entière » : « la division redevient exacte »), m03-l04 (`trous` n°1, test `predire` n°1, `retenir` n°2, titre v1), m04-l06 (`code` v3, ligne « la division est exacte »), m05-l02 (`attention` div : « Pour un résultat exact »), lexique « division entière »
- **Problème** :
  - Le mot « exacte » revient environ 8 fois pour une division en `double`. Il installe l'idée que les `double` calculent exactement.
  - C'est faux, et l'élève le verra tôt ou tard (`0.1 + 0.2`).
  - La leçon m03-l04 affiche d'ailleurs `12.416666666666666`, une valeur arrondie.
- **Preuve (t2)** : `0.1 + 0.2` → `0.30000000000000004` ; `1.0 / 3` → `0.3333333333333333`.
- **Correction** :
  - Remplacer « exacte » par « avec virgule » ou « décimale » : « Dès qu'un des deux nombres est un réel, la division garde la partie décimale » ; « Une moyenne avec virgule demande des `double`… ».
  - Facultatif, dans le dépliable « culture » de m02-l03 : « Un `double` garde environ 16 chiffres : `0.1 + 0.2` affiche `0.30000000000000004`. Ne compare pas deux réels avec `==`. »

---

## BASSE

### 14. m03-l04 · section 2 · `trous` · explication « Java affiche tous les chiffres qu'il a calculés »
- **Problème** : Java affiche le plus court nombre décimal qui désigne ce `double`, pas « tous les chiffres calculés ».
- **Correction** : « Java affiche jusqu'à 16 ou 17 chiffres : c'est normal, un `double` n'en garde pas plus. »

### 15. m01-l02 · section 1 · `depliable` « Un peu d'histoire »
- **Problème** :
  - (a) « Java… racheté par Oracle en 2010 » : Oracle a racheté l'**entreprise Sun**, pas le langage.
  - (b) Dans l'`ecart` LTS, « le terme LTS n'existait pas encore » est contestable : certains fournisseurs (Azul, par exemple) classent aujourd'hui Java 7 comme LTS. Mieux vaut rester sur le fait certain.
- **Correction** :
  - (a) « Java a été créé par l'entreprise Sun en 1995 ; Oracle a racheté Sun, et donc Java, en 2010. »
  - (b) `vrai` : « Les versions LTS sont 8, 11, 17, 21 et 25. Java 7 date d'avant ce calendrier (il a pourtant été suivi longtemps) ; Java 24 n'est pas une LTS. »

### 16. m06-l01 · section 4 · `depliable` culture « Simula (1967) introduit les classes ; Smalltalk (1976) l'encapsulation et l'héritage »
- **Problème** : Simula 67 avait déjà les sous-classes, donc l'héritage. Le cours (p.5) *liste* ces notions pour Smalltalk ; il ne dit pas qu'elles y naissent.
- **Correction** : « Simula (1967) introduit les classes et l'héritage ; Smalltalk (1976) en fait un langage tout objet (encapsulation, messages entre objets) ; … »

### 17. m04-l02 · section 1 · `illus` (interrupteurs), légende « un seul chemin ouvert suffit »
- **Problème** : le schéma dit « UN SEUL **fermé** suffit » et la légende dit « chemin **ouvert** ». Pour un interrupteur, « ouvert » veut justement dire que le courant ne passe pas.
- **Correction** : « En série, le courant passe si les deux interrupteurs sont fermés. En parallèle, un seul fermé suffit. »

### 18. m04-l02 · section 4 · `depliable` examen, `texte` « && fait un court-circuit… »
- **Problème** : seul `&&` est présenté, alors que `||` court-circuite aussi.
- **Correction** : ajouter « De même, `||` ne calcule pas le côté droit si le gauche est vrai. »

### 19. m04-l02 · section 3 · `erreur` `0 <= note <= 20`, explication « Java calcule 0 <= note (true), puis essaie true <= 20 »
- **Problème** : rien n'est calculé, car c'est une erreur de **compilation** : `javac` constate seulement les types.
- **Correction** : « `0 <= note` donne un `boolean` ; `javac` voit ensuite `boolean <= int` : comparer un booléen à un nombre n'a pas de sens. »

### 20. m04-l03 · section 4 · `compare` (« Fonctionne avec int, char et String »)
- **Problème** : la liste semble complète. Un élève essaiera `switch` sur un `double` (une moyenne), ce qui est refusé, tout comme `long` et `boolean`.
- **Correction** : « Fonctionne notamment avec `int`, `char` et `String` (pas avec `double`, `long` ni `boolean`). »

### 21. m03-l02 · section 4 · `attention` « `total += 0.5` range `(int) 0.5` »
- **Problème** : le cast porte sur le **résultat** de l'addition, pas sur 0.5. Exemple : `int t = -1; t += 0.5;` → 0, alors que `-1 + (int) 0.5` vaudrait -1.
- **Correction** : « `total += 0.5` range `(int) (total + 0.5)`, donc 0, sans aucun message. »

### 22. m03-l01 · section 3 · `texte` « C'est le mod de l'algo »
- **Problème** : avec un nombre négatif, `%` garde le signe de gauche : `-7 % 3` vaut -1 (t2), pas 2.
- **Correction** (facultative) : ajouter dans l'`attention` « Avec un nombre négatif, le reste est négatif : `-7 % 3` vaut -1. »

### 23. m04-l05 · section 3 · `erreur` do…while, explication « (Le while simple, lui, n'en prend pas.) »
- **Problème** : `while (i <= 5);` compile, et donne une boucle vide **infinie**. Le piège est le même que celui de `if (…);`, signalé en m04-l01.
- **Correction** : « (Le `while` simple, lui, n'en prend pas : `while (i <= 5);` ferait une boucle vide, infinie.) »

### 24. m01-l01 · section 1 · `depliable` « Sur ton ordinateur »
- **Problème** :
  - (a) Le texte dit « JDK 21 Temurin depuis adoptium.net », mais la commande montrée installe OpenJDK et non Temurin.
  - (b) `openjdk-21-jdk` n'existe qu'à partir d'Ubuntu 22.04.
  - (c) Le message Windows cité est celui de `cmd`. Dans PowerShell, terminal par défaut de Windows 11, il devient « Le terme «javac» n'est pas reconnu comme nom d'applet de commande… ».
- **Correction** :
  - « Sous Linux (Ubuntu 22.04 ou plus récent), une commande installe un JDK 21 équivalent : »
  - « Si tu lis `'javac' n'est pas reconnu…` (ou, dans PowerShell, `Le terme «javac» n'est pas reconnu…`), … »

### 25. m01-l02 · section 3 · `attention` « java HelloWorld.class répond Could not find or load main class… »
- **Problème** : le lanceur `java` est traduit. Sur un système en français, il affiche le message en français.
- **Preuve (t8)** : `Erreur : impossible de trouver ou de charger la classe principale HelloWorld.class`.
- **Correction** : ajouter « (sur un ordinateur en français, le message s'affiche directement en français : `Erreur : impossible de trouver ou de charger la classe principale`) ».

### 26. m01-l03 · section 2 · `erreur` `system.out…`, explication « Traduction : « system n'existe pas » »
- **Problème** : la traduction perd le mot « package ». L'élève ne comprend pas pourquoi Java parle de paquetage.
- **Correction** : « Traduction : « le paquetage system n'existe pas ». Ne connaissant pas `system`, Java devine un nom de paquetage (un groupe de classes). En réalité, c'est une faute de casse : … »

### 27. lexique · « error: ';' expected » (« Le chapeau ^ pointe juste après l'endroit où il manque »)
- **Problème** : le chapeau pointe **là où** le `;` manque, c'est-à-dire juste après la fin de l'instruction (t6 le confirme).
- **Correction** : « Le chapeau `^` pointe là où il manque : juste après la fin de l'instruction. »

### 28. m06-l03 · section 3 · `predire` « null veut dire « aucune valeur » pour un texte »
- **Problème** : avec l'image de la télécommande, `null` veut dire qu'aucun objet n'est désigné. Ce sens vaut pour tout objet, pas seulement pour un texte.
- **Correction** : « `null` veut dire « aucun objet » : la télécommande ne désigne rien. »

### 29. m05-l02 · section 5 · `trous` `moyenne2(12, 15)` / `exo` `moyenne(12, 15, 9)`
- **Problème** : des arguments `int` sont passés à des paramètres `double`, sans un mot d'explication.
- **Correction** : ajouter à l'explication « (12 est un `int` : il est converti tout seul en 12.0, du petit vers le grand, m02) ».

### 30. m05-l03 · section 2 · `ecart` « La machine virtuelle analyse… »
- **Problème** : l'écart est juste et respectueux. Mais la citation n'a pas de référence de slide, contrairement aux autres `ecart`, et elle est absente de `docs/source-cours.md`. La transcription de la p.54 n'y contient que « c'est la signature de l'appel qui choisit ». Le lien avec la source n'est donc pas vérifiable (voir revue-java n°15).
- **Correction** :
  - `dit` : « « La machine virtuelle analyse le type de chacun des paramètres d'appel pour déterminer la signature de la fonction à utiliser » (slide 54). »
  - Recopier la phrase exacte dans `source-cours.md`, p54, après l'avoir vérifiée sur la slide.

### 31. lexique · termes définis en `<strong>` dans les leçons mais absents du lexique
- **Problème** : plusieurs termes importants manquent, d'autres ne sont que noyés dans une autre entrée.
  - Absents : **signature**, **variable locale**, **méthode d'instance**, **this**, **null**, **constructeur par défaut**, **classe abstraite**, **invite**, **UML**, **LTS**.
  - Seulement dans une autre entrée : paquetage, troncature, itération.
- **Correction** : ajouter au minimum :
  - `{ terme: "signature", def: "Le nom d'une méthode et les types de ses paramètres : plus(int, int). Le type de retour n'en fait pas partie.", lecon: "m05-l03" }`
  - `{ terme: "variable locale", def: "Une variable déclarée dans une méthode (ou un bloc) : elle n'existe que pendant l'exécution de ce bloc, et doit recevoir une valeur avant d'être lue.", lecon: "m05-l02" }`
  - `{ terme: "this", def: "Dans une classe, désigne l'objet courant : celui qu'on construit, ou sur lequel la méthode est appelée.", lecon: "m06-l03" }`
  - `{ terme: "null", def: "« Aucun objet » : la valeur d'une référence qui ne désigne rien (par exemple un attribut String jamais rempli).", lecon: "m06-l03" }`
  - `{ terme: "constructeur par défaut", def: "Le constructeur sans paramètre que Java fournit tant que tu n'en écris aucun. Il disparaît dès que tu en écris un.", lecon: "m06-l03" }`

---

## Vérifié et juste (pour mémoire)
- Les 37 messages d'erreur annoncés sont identiques à ceux de `javac` 21 ou de `java`.
- Les « Traduction : » sont fidèles, sauf le n° 26.
- Les `ecart` de la p.20 (24 n'est pas LTS), de la p.24, de la p.30 (char→int, 50), de la p.31 (130 → -126), de la p.33, de la p.36 (`*` avant `+`, priorité de `!`, puis `&`, `^`, `|`), de la p.39 et de la p.54 sont justes et au ton respectueux.
- La sortie javac affichée en m01-l03 est exacte au caractère près (t6).
- `int 2notes` produit bien `not a statement` puis `';' expected` (t7).
- Le comportement du Scanner selon la langue est décrit correctement en m03-l03 (t9).
- « Depuis Java 25, un `main` sans `public` est accepté » est exact (t10).
