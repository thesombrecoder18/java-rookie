# Carte pédagogique — Java Rookie (version compacte)

> Document de travail pour les rédacteurs. **Juste les bases, à l'échelle d'Algo Rookie** : 6 modules, 27 leçons de 5 à 6 minutes (bilans : 8 min), **environ 2 h 40 au total**. Voir la section « Périmètre » de `docs/principes.md`.
> La carte complète (134 leçons) est archivée dans `docs/archive/carte-complete-134-lecons.md`. On peut y puiser des idées d'exemples, mais elle ne fait pas foi.
> À lire avec `docs/principes.md`, `docs/format-lecon.md`, `docs/exemple/lecon-modele.js` et `docs/source-cours.md`.
>
> **Conventions**
> - `mXX-lYY` = identifiant de leçon ; le titre se termine par la durée estimée.
> - « Cours p.N » = numéro de slide. « Hors PDF » = notion absente des slides fournies : ajouter une fois par module « compare avec tes notes de cours ».
> - **Blocs** :
>   - `ecart` (« Le cours dit… / En réalité… ») seulement pour une affirmation **fausse** du support, avec un ton respectueux ;
>   - `attention` pour un piège que le cours ne signale pas ;
>   - `depliable`, de genre « examen » (utile pour l'examen, facultatif ce soir), « culture » ou « outil » ;
>   - `cadre` : encadré « Où en est-on du cadre ? », où les mots de `public static void main(String[] args)` déjà compris sont en vert ;
>   - `trous` (code à compléter) et `ordre` (remettre des lignes dans l'ordre).
>
>   « Relier / classer » s'écrit comme une suite de 3 ou 4 quiz courts.
> - **Compilation** : tout code compile avec `javac --release 21` (pas de `main` simplifié, `super(…)` en première ligne, pas de `var`). Les messages d'erreur cités sont ceux de javac (en anglais : toujours donner la traduction). Ne jamais figer dans une sortie les codes du type `Etudiant@1dbd16a6`.
> - **Un seul fichier** pour tout le parcours : la classe publique s'appelle `Main`. En m06, `class Etudiant` (sans `public`) est placée dans le même fichier. Ça fonctionne partout, y compris dans l'outil en ligne.
> - **Rappels** :
>   - à partir de m03, **une** question `rappel: "mXX-lYY"` dans le `test` de chaque leçon (voir la ligne « Rappel (test) » de chaque fiche et le calendrier en fin de document) ;
>   - pas d'échauffement obligatoire : une seule question de rappel au début de m04-l01 et de m06-l01.
> - **Bilans** (m02, m03, m04) :
>   - **Défi guidé**, compté dans la durée : il commence par le code de départ fourni (le corrigé de la version précédente) et utilise des valeurs de test figées (dans le code ou dans STDIN) ;
>   - **Défi libre (optionnel)**, non compté.

---

## 0. L'ordre choisi, en bref

1. **Faire tourner d'abord** (m01). Une victoire dès la première leçon ; `javac`, `java` et le cadre viennent juste après. L'outil en ligne et l'installation locale sont des dépliables « outil ».
2. **Les fondamentaux des slides** :
   - ranger des valeurs et leurs types, conversions comprises (m02) ;
   - calculer et lire au clavier (m03). Scanner vient avant les conditions, car un `if` sans saisie n'a pas d'intérêt ;
   - choisir et répéter (m04) ;
   - découper en méthodes (m05).

   Chaque fois que c'est possible, on fait le pont avec le cours d'algo (`←` devient `=`, SI devient `if`, POUR devient `for`).
3. **L'approche objet en dernier** (m06). La partie 1 du cours (objet, classe, instance, UML) est placée **juste avant** le code objet, et non en tête : un débutant n'a rien à quoi rattacher « état, comportement, identité » tant qu'il n'a pas écrit de programme. Le module se termine par une **ouverture** : un aperçu des exceptions et des interfaces, puis la liste « pour aller plus loin ».
4. **Hors périmètre** : tableaux, méthodes de `String`, `ArrayList`, dates, enums, JDBC. Ils sont seulement cités dans la dernière leçon.

**Le cadre `public static void main(String[] args)`.** On le recopie d'abord tel quel (m01-l01). En m01-l02, c'est un « formulaire officiel » ; le tableau ci-dessous est dans un dépliable. Chaque mot est expliqué quand il devient utile :

| Mot | Explication |
|---|---|
| `main` | m01-l02 (point de départ), puis m05-l01 (c'est une méthode : la méthode principale) |
| `void` | m05-l01 |
| `static` | m05-l01 (provisoire), m06-l02 (sens complet) |
| `class` | m01-l02 (provisoire), m06-l02 |
| `public` | m06-l04 |
| `String[] args` | m06-l06 |

Le bloc `cadre` apparaît en m01-l02 (rien en vert), en m05-l01 (`main`, `static`, `void`) et en m06-l06 (tout en vert).

**Fil rouge léger : « la fiche d'Adama »** (Adama SECK, matricule 201506SRG, 22 ans, comme dans le cours). Quatre versions seulement :
- **v1** : variables (m02-l05) ;
- **v2** : moyenne et saisie (m03-l04) ;
- **v3** : validation et mention (m04-l06) ;
- **v4** : la classe `Etudiant`, construite par petits exercices de m06-l02 à m06-l05.

---

## Les modules

### m01-premiers-pas — Premiers pas : ton premier programme
**À la fin de ce module, tu sauras…**
- faire tourner un premier programme, en ligne ou sur ton ordinateur ;
- expliquer ce que font `javac` et `java`, et reconnaître le cadre obligatoire ;
- lire un message d'erreur de compilation.

**Prérequis** : aucun.

#### m01-l01 · Ton premier programme tourne (5 min)
- **Problème** : voir un programme Java fonctionner tout de suite, avant toute théorie.
- **Notions et termes** : **programme** (une suite d'instructions que l'ordinateur exécute) ; `System.out.println("…");` affiche le texte placé entre guillemets ; le reste est un **cadre** à recopier tel quel (compris en m01-l02).
- **Dépliable « outil » : sans rien installer.** Un seul outil : **OneCompiler** (onecompiler.com/java). On colle le code, on clique sur « Run », la sortie s'affiche. L'onglet **STDIN** sert à taper à l'avance ce que le programme lira au clavier (utile en m03). L'outil impose une classe nommée `Main`. Formulation prudente : « si un bouton porte un autre nom, cherche "Run" et un onglet "STDIN" / "Input" ». Vérifier l'outil au moment de la rédaction.
- **Dépliable « outil » : sur ton ordinateur.**
  - Installer le **JDK** 21 Temurin (adoptium.net) ou, sous Linux, `sudo apt install openjdk-21-jdk`.
  - Vérifier avec `java -version` et `javac -version`.
  - Éditeur : VS Code avec l'« Extension Pack for Java », puis lien « Run ».
  - Erreur classique : `'javac' n'est pas reconnu…` → le PATH n'est pas réglé : réinstaller en cochant l'option PATH, puis rouvrir le terminal.
- **Illustration** : le programme avec le cadre en gris et une seule ligne en vert : « ta ligne ».
- **Mini-exemples** :
  ```java
  public class Main {
      public static void main(String[] args) {
          System.out.println("Hello World !");
      }
  }
  ```
  Puis, dans la zone verte seulement : deux `println` à la suite (deux lignes affichées).
- **Erreur fréquente** : effacer le `;` ou un guillemet → le programme ne se lance pas et affiche un message (lu en m01-l03). Réflexe : Ctrl+Z.
- **Micro-exercices** : [reproduire] lancer Hello World. [modifier] afficher ton prénom puis ta filière, sur deux lignes.
- **À retenir** : un programme Java tourne dans un cadre · tu écris dans la zone verte · `println` affiche le texte entre guillemets.
- **Cours** : p.21.

#### m01-l02 · javac, java et le cadre obligatoire (6 min)
- **Problème** : l'ordinateur ne comprend que des 0 et des 1. Qu'a-t-il fait quand tu as cliqué sur « Run » ? Et que sont les lignes grises ?
- **Notions et termes** :
  - **compilateur** `javac` : il traduit `Main.java` en **bytecode** (`Main.class`) ;
  - **JVM** (machine virtuelle Java) : `java Main` exécute ce bytecode, sur n'importe quel système ;
  - **classe** (provisoire : « la boîte qui contient ton code ; son nom = le nom du fichier, majuscules comprises ») ;
  - **méthode principale** `main` (« le point de départ ») ;
  - **bloc** `{ }`, **instruction** (terminée par `;`), **casse** (Java distingue majuscules et minuscules), **commentaire** `//` (ignoré par Java).

  Le cadre est un « formulaire officiel » : le tableau « quand chaque mot sera expliqué » est dans un dépliable. Bloc `cadre` : aucun mot en vert.
- **Dépliable « culture »** : Sun 1995, Oracle depuis 2010, versions LTS (suivies longtemps). ⚠ p.20 (`ecart`) : « Versions LTS actuelles : 7, 8, 11 & 17, … 24, 25 ». **En réalité**, les versions LTS sont 8, 11, 17, 21 et 25. Java 7 a eu un support étendu, mais le terme « LTS » n'existait pas encore ; Java 24 n'est pas LTS.
- **Illustration** : `Main.java` → `javac` (traducteur) → `Main.class` → JVM (cuisinier présent sur Windows, Linux et Mac). Puis les poupées russes : fichier ⊃ classe ⊃ `main` ⊃ instructions.
- **Mini-exemples** :
  ```
  javac HelloWorld.java    ← crée HelloWorld.class
  java HelloWorld          ← exécute (sans « .class »)
  ```
  Le cadre `public class HelloWorld { … }` de la p.21, à enregistrer dans `HelloWorld.java`.
- **Erreur fréquente** : enregistrer `public class HelloWorld` dans `Hello.java` → `class HelloWorld is public, should be declared in a file named HelloWorld.java`.
- **Confusions** : compiler ≠ exécuter ; `java HelloWorld.class` → « impossible de trouver ou de charger la classe principale » (on donne le nom de la **classe**).
- **Explique-moi simplement** : un formulaire administratif. Les cases imprimées ne bougent pas ; tu remplis seulement la zone prévue.
- **Micro-exercices** : [comprendre] bloc `ordre` : écrire / `javac` / `.class` apparaît / `java`. [corriger] un cadre avec `system` et une `}` manquante.
- **À retenir** : `javac` traduit, `java` exécute · tout code est dans une classe, et le programme démarre dans `main` · chaque instruction finit par `;`.
- **Cours** : p.19-21.

#### m01-l03 · Lire un message d'erreur sans paniquer (5 min)
- **Problème** : tu as oublié un `;` et `javac` refuse de compiler. Que te dit-il ?
- **Notions et termes** : **erreur de compilation** ; anatomie d'un message (`Main.java:3: error: …`), avec le chapeau `^` sous l'endroit ; on corrige **la première** erreur, puis on recompile.
- **Illustration** : le contrôleur à l'entrée, qui entoure en rouge la ligne fautive.
- **Mini-exemples** (code faux → message) :
  ```java
  System.out.println("a")      // error: ';' expected
  system.out.println("a");     // error: package system does not exist
  System.out.println("a);      // error: unclosed string literal
  ```
- **Erreur fréquente** : croire que `^` désigne toujours la faute exacte. Pour un `;` oublié, il pointe juste **après**.
- **Explique-moi simplement** : le correcteur d'orthographe : il souligne, tu corriges, tu relances.
- **Micro-exercices** : [comprendre] 3 messages → 3 causes (suite de quiz). [corriger] un programme de 4 lignes avec 2 erreurs.
- **À retenir** : fichier, ligne, cause · la 1re erreur d'abord · les messages sont en anglais : garde le petit lexique sous la main.
- **Cours** : p.19.

---

### m02-variables — Ranger des valeurs : variables et types
**À la fin de ce module, tu sauras…**
- créer une variable, changer sa valeur et l'afficher avec du texte ;
- choisir le bon type primitif, et distinguer `' '` de `" "` ;
- passer d'un type à l'autre (conversion automatique et cast).

**Prérequis** : m01. **Fil rouge** : v1, la fiche d'Adama en variables.

#### m02-l01 · Une variable, c'est une boîte (6 min)
- **Problème** : pour réutiliser l'âge d'un étudiant à plusieurs endroits, il faut le **ranger** quelque part.
- **Notions et termes** (identiques à la leçon modèle `lecon-modele.js`) :
  - **variable** (« boîte qui contient une donnée », p.24 : une case de mémoire qui porte un nom) ;
  - le **type** (`int` = nombre entier), le **nom**, la **valeur** ;
  - `int age = 20;` = **déclaration** avec **initialisation** ;
  - on lit la valeur en écrivant le nom, sans guillemets.
- **Dépliable « examen »** : règles de nommage. Lettres, chiffres, `_` et `$` ; pas de chiffre au début ; pas un **mot réservé** (`int`, `class`…) ; casse ; convention camelCase (`noteMaths`). ⚠ p.24 (`ecart`) : « maximum 247 caractères ». **En réalité**, Java n'impose aucune limite pratique.
- **Illustration** : une boîte étiquetée `age` contenant 20. Passerelle algo : `age ← 20` devient `int age = 20;`.
- **Mini-exemples** : `int age = 20; System.out.println(age);` → 20 ; une 2e variable affichée seule.
- **Erreur fréquente** : `int age = "20";` → `incompatible types: String cannot be converted to int`.
- **Confusions** : `println("age")` affiche le mot, `println(age)` affiche 20.
- **Micro-exercices** : [reproduire] `annee` = 2026, puis l'afficher. [prédire] `int x = 7; System.out.println(x);`.
- **À retenir** : une variable = une boîte nommée · type, nom, valeur · on lit la valeur par le nom, sans guillemets.
- **Cours** : p.24, p.26.

#### m02-l02 · Changer la valeur, et afficher avec du texte (6 min)
- **Problème** : l'âge d'Adama change à son anniversaire. Et comment afficher « Adama a 21 ans » ?
- **Notions et termes** :
  - **affectation** `nom = expression;` (le `←` de l'algo : on calcule à droite, on range à gauche, l'ancienne valeur est perdue) ;
  - déclaration seule `int x;` (boîte vide) ;
  - **concaténation** (`+` entre un texte et une valeur colle les morceaux) ;
  - `String` = le type des **textes** (entre `" "`, avec une majuscule) ;
  - `print` (sans retour à la ligne) vs `println`.
- **Illustration** : la flèche `←` couchée en `=` ; puis des wagons : `"Adama a "` + `21` + `" ans"`.
- **Mini-exemples** :
  ```java
  int age = 20;
  age = age + 1;                                   // 21 : pas une équation
  String nom = "Adama";
  System.out.println(nom + " a " + age + " ans");  // Adama a 21 ans
  ```
- **Erreur fréquente** : `int x, y; int somme = x + y;` → `variable x might not have been initialized` (exemple du cours p.29).
- **Confusions** : `=` (ranger) ≠ égalité des maths (`==` arrive en m04) ; espaces oubliés : `"Adama a" + age + "ans"` donne `Adama a21ans`.
- **Explique-moi simplement** : `=` se lit « reçoit » : « age reçoit age + 1 ».
- **Micro-exercices** : [prédire] valeurs après 3 affectations (`int x = 3; int y = x; x = 10;` : y vaut toujours 3). [modifier] ajouter les espaces manquants.
- **À retenir** : `=` range la valeur de droite dans la variable de gauche · une variable doit avoir une valeur avant d'être lue · `+` colle texte et valeurs.
- **Cours** : p.26, p.29, p.34.

#### m02-l03 · Les types primitifs : entiers, réels, caractères, booléens (6 min)
- **Problème** : une moyenne de 12,5 ne rentre pas dans un `int`, et 8 milliards non plus. Il faut des boîtes de formes différentes.
- **Notions et termes** :
  - **type primitif** (type de base de Java, il en existe 8) ;
  - entiers `byte` (8 bits, −128..127), `short`, `int`, `long` (suffixe `L`), avec min = −2^(n−1) et max = 2^(n−1)−1 ;
  - réels `double` (par défaut) et `float` (suffixe `f`), avec un **point** décimal ;
  - `char` (un seul caractère entre `' '`) ;
  - `boolean` (`true` / `false`, le VRAI / FAUX de l'algo) ;
  - rappel : `String` n'est pas primitif.
- **Illustration** : des récipients de tailles croissantes (gobelet → bidon) ; une case unique (`char`) face à un collier de perles (`String`).
- **Mini-exemples** :
  ```java
  long population = 8000000000L;
  double moyenne = 12.5;    float pi = 3.14f;
  char initiale = 'A';      boolean admis = true;
  ```
- **Erreur fréquente** : `char c = "A";` → `incompatible types: String cannot be converted to char` ; `float pi = 3.14;` → `possible lossy conversion from double to float`.
- **Confusions** : `' '` vs `" "` ; `'7'` (un caractère) vs `7` (un nombre) ; virgule française vs point du code.
- **Dépliable « culture »** : un calcul `int` qui dépasse sa plage ne prévient pas : `2147483647 + 1` vaut −2147483648.
- **Micro-exercices** : [comprendre] quel type pour : âge, moyenne, initiale, « admis ? » (suite de quiz). [corriger] 3 déclarations fausses.
- **À retenir** : entiers `int`/`long`, réels `double` · `char` entre `' '`, texte entre `" "` · `boolean` = `true` ou `false`.
- **Cours** : p.25-26. Note : la slide p.26 donne `float pi=3.14f;` et `double pi=3.14;`. Recopiées dans un même `main`, ces deux lignes déclenchent `variable pi is already defined` (bloc `attention`).

#### m02-l04 · Passer d'un type à l'autre : compatibilité et cast (6 min)
- **Problème** : `long y = x;` (avec `x` de type `int`) compile, mais `int x = 2.9;` est refusé. Pourquoi ?
- **Notions et termes** :
  - **compatibilité** (la plage de A est incluse dans celle de B, p.30) ;
  - **conversion implicite** `byte → short → int → long → float → double` (et `char → int`) ;
  - **cast / transtypage** `(type) expression` ;
  - **troncature** (on coupe, on n'arrondit pas).
  - Exception à la règle : une constante qui tient dans le petit type est acceptée (`byte b = 100;`).
- **Illustration** : un verre versé dans une bouteille (ça rentre toujours) ; une bouteille dans un verre (il faut couper : le massicot du cast).
- **Mini-exemples** :
  ```java
  int x = (int) 2.9;           // 2
  long y = x;                  // automatique
  char c = '2';  int code = c; // 50
  ```
- **Erreur fréquente** : `int x = 2.4;` → `possible lossy conversion from double to int`.
- **Confusions** : troncature ≠ arrondi ; `'2'` vaut 50, pas 2.
- **Dépliable « examen »** :
  - débordement d'un cast : `(byte) 130` → −126, `(byte) -129` → 127 (roue de 256 crans, p.31-32). ⚠ p.31 (`ecart`) : coquille « int x=; » ; **en réalité** `int x = 130;`.
  - ⚠ p.33 (`ecart`) : « un int est un float qui lui-même est un double ». **En réalité**, la conversion est permise sans cast, mais `int` → `float` peut perdre des chiffres : `float f = 16777217;` affiche `1.6777216E7` (`E7` = × 10⁷).
- **Micro-exercices** : [prédire] compile ou non, pour 4 affectations. [prédire] `(int) 2.99` et `(int) -2.7`.
- **À retenir** : du petit vers le grand, automatique · du grand vers le petit, cast obligatoire · un cast vers `int` tronque.
- **Cours** : p.30-33. ⚠ p.30 (`ecart`, dans la leçon principale) : « char c='2'; int x=c; int et char non compatibles ». **En réalité**, c'est compatible : `x` vaut 50, le code de `'2'`.

#### m02-l05 · Bilan / défi : la fiche d'Adama (fil rouge v1) (8 min)
- **Problème** : décrire un étudiant uniquement avec des variables.
- **Notions** : aucune nouvelle.
- **Défi guidé** (8 min). Code de départ fourni : le cadre `Main` avec `String nom = "Adama";`. Étapes :
  - v1 : ajouter `char initiale`, `int age = 22`, trois notes `double`, `boolean inscrit` ;
  - v2 : afficher la fiche avec la concaténation ;
  - v3 : afficher une note sans décimales grâce à `(int)`.
- **Défi libre (optionnel)** : échanger deux notes avec une variable `temp` (passerelle algo).
- **Erreur fréquente** : échanger avec `a = b; b = a;` (les deux valent alors la même chose) ; `'A'` vs `"A"`.
- **À retenir** : choisir le bon type · nommer clairement · concaténer avec des espaces.
- **Cours** : p.24-34.

---

### m03-calculer-dialoguer — Calculer et dialoguer
**À la fin de ce module, tu sauras…**
- calculer avec `+ - * / %` sans tomber dans le piège de la division entière ;
- utiliser `++`, `--` et `+=`, et distinguer `i++` de `++i` ;
- lire des nombres et du texte au clavier avec `Scanner`.

**Prérequis** : m02. **Fil rouge** : v2, la moyenne d'Adama.

#### m03-l01 · Calculer : division entière, reste et priorité (6 min)
- **Problème** : la moyenne de 12, 15 et 9 donne 12 au lieu de 12,33. Où est passée la virgule ?
- **Notions et termes** :
  - **opérateurs** `+ - * / %` ;
  - **division entière** (`int / int` donne un `int` : le `div` de l'algo) ;
  - `%` = **modulo**, reste de la division (le `mod` de l'algo) ;
  - **priorité** : `* / %` avant `+ -`, puis de gauche à droite ; parenthèses.
- **Illustration** : 7 mangues pour 2 personnes : 3 chacune (`/`), il en reste 1 (`%`).
- **Mini-exemples** :
  ```java
  System.out.println(7 / 2);           // 3
  System.out.println(7.0 / 2);         // 3.5
  System.out.println(7 % 3);           // 1
  System.out.println(2 + 3 * 4);       // 14
  ```
- **Erreur fréquente** : `(12 + 15 + 9) / 3` → 12 ; `12 + 15 + 9 / 3` → 30. Correction : `(12 + 15 + 9) / 3.0`.
- **Confusions** : `"Somme : " + 2 + 3` affiche `Somme : 23` (de gauche à droite) ; `%` n'est pas un pourcentage.
- **Explique-moi simplement** : `/` compte les paquets complets, `%` compte ce qui reste sur la table.
- **Micro-exercices** : [prédire] 4 calculs. [trous] 135 minutes : `int h = 135 ___ 60; int m = 135 ___ 60;`.
- **À retenir** : `int / int` = résultat entier · `%` = reste · `*` et `/` passent avant `+` et `-`.
- **Rappel (test)** : `rappel: "m02-l02"` (concaténation et espaces).
- **Cours** : p.35-36. ⚠ p.36 (`ecart`) : la table met `* / %` et `+ -` au même niveau. **En réalité**, `* / %` passent **avant** `+ -`. Les autres points de la p.36 sont en m04-l02.

#### m03-l02 · ++, -- et les raccourcis (5 min)
- **Problème** : `compteur = compteur + 1;` revient sans arrêt. Java a plus court.
- **Notions et termes** :
  - `+=`, `-=` ;
  - **incrémentation** `++` (+1), **décrémentation** `--` (−1) ;
  - **post-incrémentation** `i++` (on donne la valeur, puis on augmente) vs **pré-incrémentation** `++i` (on augmente, puis on donne la valeur).
- **Illustration** : un guichet. « Je te donne ton ticket, puis j'avance le compteur » (post) vs « j'avance, puis je te donne » (pré).
- **Mini-exemples** :
  ```java
  int i = 2; int j = i++;     // j = 2, i = 3  (p.37)
  int k = 2; int m = ++k;     // m = 3, k = 3
  ```
- **Erreur fréquente** : `i = i++;` → i ne change pas ; `i =+ 5;` compile, mais met 5 dans i.
- **Attention, piège** : `+=` contient un cast caché : `int total = 0; total += 0.5;` → 0. Une somme de notes doit être un `double`.
- **Dépliable « examen »** : exemples 1 et 2 du cours. `int a = 5, b = 10; int c = a++ + b;` → a = 6, c = 15 (p.38) ; `c = ++a + b` (avec a = 5) → a = 6, c = 16 (p.39). ⚠ p.39 (`ecart`) : « L'opérateur a++ est un opérateur de pré-incrémentation ». **En réalité**, l'exemple utilise `++a` ; `a++` est la **post**-incrémentation.
- **Micro-exercices** : [prédire] un tableau de trace de 3 lignes (bloc `trace`).
- **À retenir** : `x += 5` ≈ `x = x + 5` · `i++` utilise puis augmente · `++i` augmente puis utilise.
- **Rappel (test)** : `rappel: "m02-l04"` (cast).
- **Cours** : p.35, p.37-39.

#### m03-l03 · Lire au clavier avec Scanner (6 min)
- **Problème** : la fiche est figée dans le code. Adama veut taper ses propres notes.
- **Notions et termes** :
  - recette en 2 lignes : `import java.util.Scanner;` (en haut du fichier : « dans quel rayon trouver l'outil ») et `Scanner sc = new Scanner(System.in);` (« un lecteur branché sur le clavier » ; `new` est expliqué en m06-l02) ;
  - `nextInt()`, `nextDouble()`, `next()` (un mot), `nextLine()` (la ligne entière) ;
  - **invite** (message affiché avant la saisie) ;
  - **erreur d'exécution** (le programme a compilé, mais il s'arrête en route). En ligne, la saisie se met dans STDIN.
- **Illustration** : un guichet. Le programme s'arrête et attend ta réponse, puis la touche Entrée.
- **Mini-exemples** :
  ```java
  Scanner sc = new Scanner(System.in);
  System.out.print("Ton âge : ");
  int age = sc.nextInt();
  String nom = sc.nextLine();
  ```
- **Erreur fréquente** : oubli de l'import → `cannot find symbol … class Scanner`.
- **Attention, piège 1 : le ⏎ oublié.** `nextInt()` laisse le retour à la ligne : le `nextLine()` suivant renvoie `""`. Correction : un `sc.nextLine();` vide entre les deux.
- **Attention, piège 2 : virgule ou point.** Selon la langue de ta machine, Java attend `12,5` ou `12.5`. Essaie la virgule ; si tu obtiens `InputMismatchException`, utilise le point (les outils en ligne attendent en général le point). En anglais, `1,500` est lu 1500 sans aucune erreur.
- **Confusions** : `next()` vs `nextLine()` ; erreur de compilation vs erreur d'exécution.
- **Micro-exercices** : [reproduire] lire deux nombres et afficher leur somme. [prédire] `nextInt()` puis `nextLine()` avec la saisie `20⏎Adama⏎`.
- **À retenir** : `import` + `new Scanner(System.in)` · un `next…` par type · le piège du ⏎.
- **Rappel (test)** : `rappel: "m02-l03"` (types).
- **Cours** : p.58-59.

#### m03-l04 · Bilan / défi : la moyenne d'Adama (fil rouge v2) (8 min)
- **Problème** : calculer et afficher la moyenne d'Adama à partir de notes saisies.
- **Défi guidé** (8 min). Code de départ fourni : la v1 corrigée. Étapes :
  - v1 : moyenne exacte en `double`, avec les notes figées ;
  - v2 : saisie des 3 notes (valeurs dans STDIN) ;
  - v3 : durée d'examen en h/min avec `/` et `%`.
- **Défi libre (optionnel)** : convertir un nombre de secondes en h/min/s.
- **Erreur fréquente** : moyenne entière ; le piège du ⏎ quand on lit le nom après l'âge.
- **À retenir** : `.0` ou `(double)` pour une moyenne exacte · `Scanner` pour dialoguer.
- **Rappel (test)** : `rappel: "m01-l03"` (lire une erreur).
- **Cours** : p.35-39, p.58-59.

---

### m04-choisir-repeter — Choisir et répéter
**À la fin de ce module, tu sauras…**
- faire choisir le programme avec `if`/`else`, `&&`, `||`, `!` et `switch` ;
- répéter avec `for`, `while` et `do…while` ;
- dire où une variable existe (sa portée).

**Prérequis** : m03. **Fil rouge** : v3, validation et mention.

#### m04-l01 · if … else : choisir un chemin (6 min)
- **Échauffement** (1 question) : `rappel: "m03-l01"`, que vaut `7 / 2` ?
- **Problème** : afficher « Admis » seulement si la moyenne est ≥ 10, sinon « Ajourné ».
- **Notions et termes** :
  - **opérateurs de comparaison** `< > <= >= == !=` ;
  - **condition** (expression qui vaut `true` ou `false`) ;
  - `if (…) { … } else { … }`, cascade `else if` (le premier test vrai l'emporte).
- **Illustration** : un aiguillage de train (VRAI à gauche, FAUX à droite), dont les voies se rejoignent après.
- **Mini-exemples** :
  ```java
  if (moyenne >= 10) { System.out.println("Admis"); } else { System.out.println("Ajourné"); }
  int b = -4;
  if (b > 0) { … } else if (b <= -5) { … } else { … }      // p.46
  ```
- **Erreur fréquente** : `if (x = 5)` → `incompatible types: int cannot be converted to boolean`. Et `if (moyenne >= 10);` : le `;` termine le `if`, donc « Admis » s'affiche toujours (aucun message).
- **Confusions** : `=` (ranger) vs `==` (comparer) ; ordre des `else if` (tester `>= 10` avant `>= 16` donne une mention fausse).
- **Explique-moi simplement** : « s'il pleut, je prends le parapluie ; sinon, la casquette ».
- **Dépliable « examen »** : l'opérateur ternaire `String r = (moyenne >= 10) ? "Admis" : "Ajourné";` (p.35).
- **Micro-exercices** : [prédire] la branche suivie pour b = −4, 0, −7 (p.46). [reproduire] pair ou impair avec `%`.
- **À retenir** : `==` compare, `=` range · jamais de `;` après `if (…)` · le premier test vrai l'emporte.
- **Rappel (test)** : `rappel: "m03-l02"` (`i++` / `++i`).
- **Cours** : p.35, p.46.

#### m04-l02 · Combiner des conditions : &&, ||, ! (5 min)
- **Problème** : une note est valide si elle est ≥ 0 **et** ≤ 20.
- **Notions et termes** : **opérateurs logiques** `&&` (ET), `||` (OU), `!` (NON) ; table de vérité (en suite de quiz).
- **Illustration** : deux interrupteurs en série (ET) et en parallèle (OU).
- **Mini-exemples** :
  ```java
  boolean valide = note >= 0 && note <= 20;
  boolean horsLimites = note < 0 || note > 20;
  boolean ajourne = !admis;
  ```
- **Erreur fréquente** : `if (0 <= note <= 20)` → `bad operand types for binary operator '<='`.
- **Confusions** : `&&` vs `||` (« entre » = ET, « en dehors » = OU).
- **Dépliable « examen »** :
  - `&`, `|`, `^` (p.35 : sur des booléens, ils évaluent toujours les deux côtés ; `^` = OU exclusif ; `5 & 3` vaut 1) ;
  - le **court-circuit** de `&&` (`x != 0 && 10 / x > 1` évite la division par 0) ;
  - ⚠ p.36 (`ecart`) : la table place `!` avec `&&` et `||`. **En réalité**, `!` passe très tôt, `&` avant `^` avant `|`, et `&&` avant `||` (`!true || true` vaut `true`).
- **Micro-exercices** : [prédire] 4 combinaisons. [trous] la condition « note hors de [0, 20] ».
- **À retenir** : `&&` = les deux · `||` = au moins un · un intervalle = deux comparaisons.
- **Rappel (test)** : `rappel: "m03-l03"` (`next()` vs `nextLine()`).
- **Cours** : p.35-36.

#### m04-l03 · switch : choisir parmi des cas (5 min)
- **Problème** : un menu 1/2/3, ou le sexe `'M'`/`'F'`, donnent une longue cascade de `else if` sur des égalités.
- **Notions et termes** : `switch`, `case`, `break`, `default`. Le `switch` ne teste que l'**égalité** (`int`, `char`, `String`) ; sans `break`, on continue dans le cas suivant.
- **Illustration** : un ascenseur qui s'arrête à l'étage demandé ; sans `break`, il continue à descendre.
- **Mini-exemples** :
  ```java
  char sexe = 'F';
  switch (sexe) {
      case 'M': System.out.println("Masculin"); break;
      case 'F': System.out.println("Féminin"); break;
      default:  System.out.println("Erreur");
  }
  ```
- **Erreur fréquente** : `break` oublié → avec `'M'`, on obtient « Masculin Féminin Erreur » (aucun message).
- **Confusions** : `switch` (égalités) vs `if` (intervalles : impossible d'écrire `case note >= 16`).
- **Micro-exercices** : [prédire] la sortie sans `break`. [modifier] un menu `switch (choix)` à 3 cas.
- **À retenir** : un `break` par cas · `default` = tous les autres · égalités seulement.
- **Rappel (test)** : `rappel: "m02-l03"` (`char` vs `String`).
- **Cours** : p.47.

#### m04-l04 · for : répéter un nombre de fois connu (5 min)
- **Problème** : afficher 10 lignes sans copier-coller 10 fois.
- **Notions et termes** :
  - **boucle**, **itération** (un tour) ;
  - `for (départ; condition; pas)` ;
  - **accumulateur** (variable initialisée **avant** la boucle) ;
  - **portée** (« ensemble des instructions où la variable existe », p.27) : le `i` du `for` disparaît à la fin de la boucle.
  - Passerelle algo : POUR i DE 1 À 4.
- **Illustration** : une flèche qui revient au départ, avec un compteur qui avance.
- **Mini-exemples** :
  ```java
  for (int i = 1; i <= 5; i++) { System.out.println(i); }
  int fact = 1;
  for (int i = 1; i <= 4; i++) { fact = fact * i; }   // 24 (p.42)
  ```
- **Erreur fréquente** : `for (int i = 0, i < 5, i++)` → `';' expected`. Utiliser `i` après la boucle → `cannot find symbol` (portée).
- **Confusions** : `<` vs `<=` (un tour de trop ou de moins) ; accumulateur déclaré dans la boucle (remis à zéro à chaque tour).
- **Micro-exercices** : [prédire] le nombre de tours. [trous] la somme de 1 à 100 (5050).
- **À retenir** : `for` quand on connaît le nombre de tours · accumulateur avant la boucle · une variable vit jusqu'à la `}` de son bloc.
- **Rappel (test)** : `rappel: "m03-l02"` (`+=`).
- **Cours** : p.27, p.41-42.

#### m04-l05 · while et do…while : répéter tant que (6 min)
- **Problème** : redemander une note tant qu'elle est invalide. On ne sait pas combien de fois.
- **Notions et termes** :
  - `while (condition) { … }` (condition de continuation) ;
  - **boucle infinie** ;
  - `do { … } while (condition);` (au moins un tour, avec un `;` final).
- **Illustration** : `while` = regarder avant de sauter ; `do…while` = sauter, puis regarder.
- **Mini-exemples** :
  ```java
  int a = 10;
  while (a >= 3) { a = a - 3; }                  // 1 : le reste de 10 par 3 (p.43)
  int s = 0, i = 1;
  do { s += i; i++; } while (i <= 5);            // 15 (p.45)
  ```
- **Erreur fréquente** : oubli de `i++` → boucle infinie (Ctrl+C) ; oubli du `;` après `while (…)` dans un `do…while` → `';' expected`.
- **Confusions** : RÉPÉTER … JUSQU'À (algo) donne une condition d'**arrêt**, `do…while` une condition de **continuation** : il faut l'inverser. Choisir sa boucle : nombre de tours connu → `for` ; au moins une fois → `do…while` ; sinon → `while`.
- **Micro-exercices** : [prédire] la trace du reste de 10 par 3. [modifier] validation : `do { note = sc.nextDouble(); } while (note < 0 || note > 20);`.
- **À retenir** : `while` peut faire 0 tour, `do…while` au moins 1 · quelque chose doit changer dans la boucle.
- **Rappel (test)** : `rappel: "m03-l01"` (division entière).
- **Cours** : p.41, p.43-45.

#### m04-l06 · Bilan / défi : validation et mention (fil rouge v3) (8 min)
- **Problème** : n'accepter que des notes valides, puis afficher la moyenne et la mention.
- **Défi guidé** (8 min). Code de départ fourni : la v2 corrigée. Valeurs dans STDIN, avec au moins une note invalide. Étapes :
  - v1 : chaque note est validée par un `do…while` ;
  - v2 : la mention par `else if` (≥ 16 Très bien, ≥ 14 Bien, ≥ 12 Assez bien, ≥ 10 Passable, sinon Ajourné) ;
  - v3 : N notes avec un `for` et un accumulateur `double`.
- **Défi libre (optionnel)** : un menu `switch` (1 = moyenne, 2 = mention), ou une table de multiplication.
- **Erreur fréquente** : accumulateur `int` ou déclaré dans la boucle ; mentions dans le mauvais ordre.
- **À retenir** : `if` pour choisir, boucle pour répéter, accumulateur hors de la boucle.
- **Rappel (test)** : `rappel: "m02-l04"` (cast).
- **Cours** : p.41-47.

---

### m05-methodes — Découper : les méthodes
**À la fin de ce module, tu sauras…**
- écrire et appeler une méthode, et comprendre `static` et `void` ;
- passer des paramètres et renvoyer un résultat avec `return` ;
- surcharger une méthode.

**Prérequis** : m04.

#### m05-l01 · Créer ta méthode (6 min)
- **Problème** : le même bloc d'affichage revient trois fois dans le programme.
- **Notions et termes** :
  - **méthode** (le cours dit « fonction », p.49 : un bloc de code nommé qu'on exécute à la demande) ; **définition** vs **appel** ;
  - où l'écrire : dans la classe, **à côté** de `main`, jamais dedans (montrer le fichier complet) ;
  - `void` (la méthode ne rend aucun résultat) ;
  - `static` (provisoire : « on peut l'appeler directement, sans rien fabriquer avant » ; sens complet en m06-l02) ;
  - `public` (expliqué en m06-l04, le cours dit « on y reviendra ») ;
  - `main` **est une méthode** : la méthode principale.

  Bloc `cadre` : `main`, `static` et `void` passent au vert.
- **Illustration** : une machine avec un bouton. Appeler la méthode, c'est appuyer sur le bouton ; l'exécution saute dans la méthode, puis revient.
- **Mini-exemples** :
  ```java
  public static void afficherLigne() {
      System.out.println("----------");
  }
  // dans main :
  afficherLigne();  afficherLigne();
  ```
- **Erreur fréquente** : définir la méthode dans `main` → `illegal start of expression`.
- **Confusions** : définir (écrire la recette) ≠ appeler (cuisiner).
- **Micro-exercices** : [comprendre] bloc `ordre` : les lignes d'un fichier avec une méthode. [prédire] l'ordre des affichages.
- **À retenir** : une méthode = un bloc nommé, à côté de `main` · on la définit une fois, on l'appelle autant de fois qu'on veut · `void` = ne rend rien.
- **Rappel (test)** : `rappel: "m04-l04"` (`for`).
- **Cours** : p.49.

#### m05-l02 · Paramètres et return (6 min)
- **Problème** : `afficherLigne()` dessine toujours 10 tirets, et une méthode qui affiche une somme ne permet pas de la réutiliser.
- **Notions et termes** :
  - **paramètre** (variable de la définition, remplie à l'appel, p.50) et **argument** (valeur donnée à l'appel) ;
  - **type de retour** et `return expression;` (renvoie la valeur et sort de la méthode) ;
  - **variable locale** : la méthode travaille sur une copie ; ses variables disparaissent après l'appel.
- **Illustration** : la machine reçoit une fente d'entrée (paramètres) et une goulotte de sortie (`return`).
- **Mini-exemples** :
  ```java
  public static int plus(int a, int b) { int r = 0; r = a + b; return (r); }   // p.51
  int y = plus(3, 7);                                                           // 10
  public static void saluer(String prenom) { System.out.println("Bonjour " + prenom); }
  ```
- **Erreur fréquente** : `missing return statement` (un chemin ne renvoie rien) ; `int x = afficherLigne();` → `void cannot be converted to int`.
- **Confusions** : **rendre** (`return`) ≠ **afficher** (`println`) ; paramètre ≠ argument.
- **Dépliable « examen »** :
  - p.53 : `int mul(int a, int b) { float r; r = a * b; return r; }` → `possible lossy conversion from float to int`. Trois solutions : retour en `float`, cast `(int)`, ou `r` en `int`.
  - Bloc `attention` (piège non signalé, pas une erreur du cours) : dans `float div(int a, int b) { … return (a / b); }`, `a / b` est une division **entière** : `div(7, 2)` renvoie 3.0. Correction : `return (float) a / b;`.
- **Micro-exercices** : [prédire] `plus(plus(1, 2), 3)`. [trous] puis [créer] `double moyenne(double a, double b, double c)`.
- **À retenir** : paramètres pour entrer, `return` pour sortir · le type de retour doit correspondre · afficher n'est pas renvoyer.
- **Rappel (test)** : `rappel: "m04-l01"` (`=` vs `==`).
- **Cours** : p.50-53.

#### m05-l03 · Même nom, paramètres différents : la surcharge (5 min)
- **Problème** : on veut `plus(2, 3)` **et** `plus(2, 3, 4)` sans inventer `plus3`.
- **Notions et termes** : **signature** (nom + types des paramètres ; le type de retour n'en fait pas partie) ; **surcharge** (même nom, signatures différentes).
- **Illustration** : un guichet « Paiement » avec deux fentes ; ce que tu présentes choisit la fente.
- **Mini-exemples** :
  ```java
  public static int plus(int a, int b) { return a + b; }
  public static int plus(int a, int b, int c) { return a + b + c; }
  System.out.println(plus(8, 5, 1));     // 14 (p.57)
  ```
- **Erreur fréquente** : redéclarer `plus(int x, int y)` → `method plus(int,int) is already defined in class Main`. `plus(4)` → `no suitable method found for plus(int)`.
- **Micro-exercices** : [prédire] quelle version est appelée (3 appels). [corriger] une surcharge invalide.
- **Défi libre (optionnel)** : découper la v3 du fil rouge en méthodes `moyenne(...)` et `mention(...)`.
- **À retenir** : surcharge = même nom, paramètres différents · le type de retour ne compte pas.
- **Rappel (test)** : `rappel: "m04-l05"` (`do…while`).
- **Cours** : p.54-57. ⚠ p.54 (`ecart`, ton respectueux) : « La machine virtuelle analyse le type de chacun des paramètres d'appel pour déterminer la signature de la fonction à utiliser. » **En réalité**, ce choix est fait par le **compilateur** (`javac`), au moment de la compilation ; la machine virtuelle exécute ensuite la méthode déjà choisie. L'idée du cours (c'est la signature de l'appel qui décide) reste juste.

---

### m06-objets — Penser objet, et premiers pas en Java objet
**À la fin de ce module, tu sauras…**
- expliquer objet, classe, instance, encapsulation et héritage (partie 1 du cours) ;
- écrire une classe avec des attributs, un constructeur, `private` et des get/set ;
- créer une classe fille avec `extends` et `super`.

**Prérequis** : m05. **Fil rouge** : v4, la classe `Etudiant`. Le code objet Java est hors PDF : le signaler une fois, en m06-l02.

#### m06-l01 · Penser objet : état, comportement, identité (5 min)
- **Échauffement** (1 question) : `rappel: "m05-l02"`, `return` ou `println` ?
- **Problème** : pour 30 étudiants, il faudrait `nom1`, `age1`, `nom2`, `age2`… Il faudrait plutôt un dossier par étudiant.
- **Notions et termes** :
  - **programmation orientée objet** (regrouper les données et ce qu'on en fait, p.3) ;
  - **objet** (« représentation abstraite d'une entité du monde réel ou virtuel », p.7) = **état** (valeurs de ses **attributs**) + **comportement** (ses **opérations**) + **identité** ;
  - **classe** (description commune d'objets semblables, p.8) ; **instance** (objet créé à partir d'une classe) ; **instanciation** (p.9) ;
  - **UML** : rectangle à 3 compartiments, nom / attributs / opérations (p.10).
- **Dépliable « culture »** : Simula 1967, Smalltalk 1976, C++, Java 1995. ⚠ p.5 (`ecart`) : C++ « 1er compilateur normalisé par l'ANSI » (1980). **En réalité**, l'ancêtre de C++ date bien de 1979-1980, mais la première norme ISO/ANSI date de **1998**.
- **Illustration** : un plan d'architecte et trois maisons ; la fiche d'Adama (état à gauche, boutons de comportement à droite, numéro unique en haut).
- **Mini-exemples** :
  ```
  Etudiant : NumEtudiant = 201506SRG, Prénom = Adama, Nom = SECK, Age = 22
  ┌──────────────┐
  │   Voiture    │   marque : String, vitesse : int
  │              │   demarrer(), accelerer(), freiner()
  └──────────────┘
  ```
- **Erreur fréquente** : dire « la classe Adama » (Adama est une **instance** de la classe Etudiant).
- **Confusions** : classe (le plan) vs objet (la maison) ; état vs identité (deux bouteilles d'eau identiques restent deux objets).
- **Explique-moi simplement** : des jumeaux, même taille, mêmes habits : ce sont pourtant deux personnes.
- **Micro-exercices** : [comprendre] état ou comportement ? pour un téléphone (suite de quiz). [comprendre] classe ou instance ?
- **À retenir** : objet = état + comportement + identité · la classe est le plan, l'objet est une instance · UML : nom, attributs, opérations.
- **Rappel (test)** : `rappel: "m05-l01"` (définir vs appeler).
- **Cours** : p.3-10.

#### m06-l02 · Ta première classe Java : attributs et new (6 min)
- **Problème** : traduire le rectangle UML `Etudiant` en Java, puis fabriquer Adama.
- **Notions et termes** :
  - `class` (enfin expliqué : il **déclare un plan**) ;
  - **attribut** (variable déclarée dans la classe, hors des méthodes) ;
  - `new Etudiant()` fabrique l'objet (on comprend enfin `new Scanner(…)`) ;
  - la variable contient une **référence** : une télécommande vers l'objet ;
  - le point `e.nom` ;
  - **méthode d'instance** (sans `static`) : elle agit sur l'objet sur lequel on l'appelle, `e.afficher()`.

  `class Etudiant` (sans `public`) est écrite dans le même fichier que `public class Main`. Bloc `cadre` : `class` passe au vert.
- **Illustration** : le plan → la maison ; l'étiquette `e` reliée à la maison par une flèche (télécommande).
- **Mini-exemples** :
  ```java
  class Etudiant { String nom; int age;
      void afficher() { System.out.println(nom + " (" + age + " ans)"); } }
  // dans main :
  Etudiant e = new Etudiant();  e.nom = "Adama";  e.age = 22;  e.afficher();
  ```
- **Erreur fréquente** : `Etudiant e; e.nom = "Adama";` → `variable e might not have been initialized`.
- **Confusions** : `Etudiant e2 = e;` ne copie pas l'objet : deux télécommandes pour une seule maison.
- **Dépliable « examen »** : `static` en entier. Une méthode `static` appartient à la classe, sans objet courant ; c'est pourquoi `main` ne peut pas utiliser directement un attribut. ⚠ p.28 (`ecart`) : « int x=20 ; portée classe, utilisable dans toutes les fonctions de la classe ». **En réalité**, `x` est une variable d'instance : dans `main` (static), `System.out.println(x);` → `non-static variable x cannot be referenced from a static context`. Il faut un objet.
- **Micro-exercices** : [reproduire] la classe `Voiture` (p.10) et une voiture. [prédire] après `e2.age = 23;`, que vaut `e.age` ?
- **À retenir** : `class` = le plan · `new` = un objet · la variable est une télécommande vers l'objet.
- **Rappel (test)** : `rappel: "m05-l02"` (paramètres et return).
- **Cours** : p.9-10, p.27-28.

#### m06-l03 · Le constructeur : naître complet (5 min)
- **Problème** : `new Etudiant()` suivi de 3 affectations ; si on en oublie une, l'objet reste à moitié vide.
- **Notions et termes** :
  - **constructeur** : même nom que la classe, aucun type de retour, appelé par `new` ;
  - `this.nom = nom;` : `this` désigne l'objet en cours (le paramètre cache l'attribut) ;
  - le **constructeur par défaut** n'existe que si l'on n'en écrit aucun ;
  - plusieurs constructeurs = surcharge (m05-l03).
- **Illustration** : la maternité. Chaque objet sort avec son bracelet déjà rempli.
- **Mini-exemples** :
  ```java
  Etudiant(String nom, int age) { this.nom = nom; this.age = age; }
  Etudiant e = new Etudiant("Adama", 22);
  ```
- **Erreur fréquente** : `new Etudiant()` une fois le constructeur écrit → `constructor Etudiant in class Etudiant cannot be applied to given types;`. Et `nom = nom;` (sans `this`) : aucune erreur, mais rien n'est rempli.
- **Confusions** : constructeur vs méthode (`void Etudiant(…)` est une méthode, pas un constructeur).
- **Micro-exercices** : [corriger] un constructeur avec `void` et sans `this`. [reproduire] `Voiture(String marque)`.
- **À retenir** : même nom que la classe, pas de type de retour · `this.attribut = parametre` · on en écrit un, le défaut disparaît.
- **Rappel (test)** : `rappel: "m05-l03"` (surcharge).
- **Cours** : hors PDF.

#### m06-l04 · Encapsulation : private, get et set (6 min)
- **Problème** : `e.age = -5;` est accepté sans broncher.
- **Notions et termes** :
  - **encapsulation** (cacher les détails, n'offrir que des services, p.11) ;
  - `private` (visible seulement dans la classe) ;
  - **accesseur** `getAge()` et **mutateur** `setAge(…)`, qui peut refuser une valeur (**intégrité** des données) ;
  - les 4 visibilités, Java ↔ UML (p.12-13) : `public` (+, partout), `protected` (#, paquetage + classes filles, m06-l05), aucun mot (paquetage), `private` (−).
  - Enfin `public` : la classe `Main` et `main` doivent être visibles de l'extérieur, par la JVM.

  Bloc `cadre` : `public` passe au vert.
- **Illustration** : un distributeur de billets : boutons visibles, coffre caché.
- **Mini-exemples** :
  ```java
  private int age;
  public int getAge() { return age; }
  public void setAge(int age) { if (age >= 0 && age <= 120) { this.age = age; } }
  ```
- **Erreur fréquente** : `e.age = -5;` depuis `Main` → `age has private access in Etudiant`.
- **Confusions** : un attribut sans mot-clé n'est **pas** privé (il est visible dans tout le paquetage) ; public = « se passer de l'encapsulation » (p.13).
- **Micro-exercices** : [comprendre] qui voit quoi dans `Salarie` (`+nom`, `#age`, `-salaire`, p.13) : suite de quiz. [modifier] protéger l'attribut `age` du fil rouge.
- **À retenir** : attributs `private`, accès par get/set · le setter garde les valeurs correctes · `+ # ~ -` en UML (le cours note « rien » pour le paquetage).
- **Rappel (test)** : `rappel: "m04-l02"` (`&&` dans une validation).
- **Cours** : p.11-14.

#### m06-l05 · L'héritage : extends et super (6 min)
- **Problème** : `Etudiant` et `Enseignant` répètent `nom` et `prenom`. Ce sont des personnes.
- **Notions et termes** :
  - hiérarchie, **généralisation** / **spécialisation** (p.15) ;
  - **classe mère** / **classe fille** ; `extends` (« est un ») ; une seule mère en Java ;
  - `super(…)` appelle le constructeur de la mère, **en première ligne** ;
  - `protected` (#) : visible par les filles.
- **Illustration** : l'arbre de la p.15 : Personne → Etudiant, Enseignant ; Etudiant → Doctorant.
- **Mini-exemples** :
  ```java
  class Personne { protected String nom; Personne(String nom) { this.nom = nom; } }
  class Etudiant extends Personne { String matricule;
      Etudiant(String nom, String matricule) { super(nom); this.matricule = matricule; } }
  class Doctorant extends Etudiant { … }
  ```
- **Erreur fréquente** : oublier `super(nom)` → `constructor Personne in class Personne cannot be applied to given types;`. `class C extends A, B` → `'{' expected`.
- **Confusions** : hériter « parce que c'est pratique » (le bon test : la fille **est un** cas particulier de la mère).
- **Dépliable « examen »** : classe **abstraite** (p.9, p.15 : Personne, non instanciable). `abstract class Personne` ; `new Personne(…)` → `Personne is abstract; cannot be instantiated`.
- **Micro-exercices** : [trous] le constructeur de `Enseignant` avec `super`. [comprendre] relation « est un » : vrai ou faux ?
- **À retenir** : `extends` = hérite de · `super(…)` en 1re ligne · une seule classe mère.
- **Rappel (test)** : `rappel: "m05-l02"` (paramètres).
- **Cours** : p.14-15.

#### m06-l06 · Pour aller plus loin : exceptions, interfaces, et la suite (6 min)
- **Problème** : tu connais les bases. Voici, en aperçu, deux outils que tu croiseras vite, puis la carte de la suite. Leçon d'**ouverture** : rien n'est à maîtriser ce soir.
- **Notions et termes** :
  - **exception** : un objet qui décrit un problème survenu à l'exécution (tu en as vu une en m03 : `InputMismatchException`) ; `try { … } catch (…) { … }` la rattrape au lieu de laisser le programme s'arrêter ;
  - **interface** : un **contrat**, une liste de méthodes promises ; une classe le signe avec `implements` et doit fournir ces méthodes, en `public`.

  Bloc `cadre` final : tout est vert. Dépliable : `String[] args` = les mots tapés au lancement (`java Test Mamadou SOW` → `args[0]` vaut `"Mamadou"`, p.22). `[]` désigne une liste de cases, les **tableaux**, à découvrir ensuite.
- **Illustration** : un filet sous le trapéziste (`try/catch`) ; un contrat signé par plusieurs entreprises (interface).
- **Mini-exemples** :
  ```java
  int zero = 0;
  try { System.out.println(10 / zero); }
  catch (ArithmeticException ex) { System.out.println("Division par zéro : " + ex.getMessage()); }
  interface Affichable { void afficherFiche(); }        // Etudiant implements Affichable
  ```
- **Erreur fréquente** : un `catch` vide, qui avale l'erreur sans rien dire ; oublier `public` sur la méthode promise → `afficherFiche() in Etudiant cannot implement afficherFiche() in Affichable`.
- **Pour aller plus loin** (une ligne chacun, sans exercice) :
  - les **tableaux** (ranger 30 notes) ;
  - les méthodes de `String` (et `equals` au lieu de `==`) ;
  - `ArrayList` (une liste qui grandit) ;
  - les **enum** ;
  - les dates (`LocalDate`) ;
  - les exceptions vérifiées (`throws`) ;
  - JDBC (bases de données).

  La carte complète archivée (`docs/archive/`) en donne une progression.
- **Micro-exercices** : [prédire] la sortie du `try/catch` ci-dessus. [comprendre] quiz : à quoi sert une interface ?
- **À retenir** : `try/catch` rattrape une erreur d'exécution · une interface est un contrat · tu as les bases : la suite se construit dessus.
- **Rappel (test)** : `rappel: "m04-l05"` (boucles).
- **Cours** : p.22 ; exceptions et interfaces hors PDF.

---

## Confusions classiques → leçon qui les traite

| Confusion | Leçon |
|---|---|
| compiler vs exécuter ; nom du fichier = nom de la classe | m01-l02 |
| `"age"` vs `age` ; espaces dans la concaténation | m02-l01, m02-l02 |
| `=` (ranger) vs `==` (comparer) | m02-l02, m04-l01 |
| `' '` vs `" "` ; `char` vs `String` ; `'7'` vs `7` | m02-l03 |
| virgule (clavier) vs point (code) | m02-l03, m03-l03 |
| troncature vs arrondi ; `'2'` vaut 50 | m02-l04 |
| `7/2` vs `7/2.0` (division entière) | m03-l01 |
| `i++` vs `++i` ; cast caché de `+=` | m03-l02 |
| `next()` vs `nextLine()` ; piège du ⏎ ; erreur de compilation vs d'exécution | m03-l03 |
| `if (…);` ; ordre des `else if` | m04-l01 |
| `&&` vs `||` | m04-l02 |
| `switch` sans `break` ; `switch` vs `if` | m04-l03 |
| `<` vs `<=` ; portée d'une variable de boucle | m04-l04 |
| `for` / `while` / `do…while` ; RÉPÉTER…JUSQU'À inversé | m04-l05 |
| définir vs appeler une méthode | m05-l01 |
| `return` vs `println` ; paramètre vs argument | m05-l02 |
| classe vs objet ; état vs identité | m06-l01 |
| copier la télécommande ≠ copier l'objet | m06-l02 |
| méthode vs constructeur ; `nom = nom` sans `this` | m06-l03 |
| attribut sans mot-clé ≠ `private` | m06-l04 |

## Glossaire minimal (terme → leçon de 1re définition)

| Terme | Leçon | Terme | Leçon |
|---|---|---|---|
| programme, cadre | m01-l01 | JDK, OneCompiler, STDIN (dépliables) | m01-l01 |
| compilateur `javac`, bytecode, JVM | m01-l02 | classe (prov.), méthode principale `main` | m01-l02 (m06-l02, m05-l01) |
| bloc, instruction, casse, commentaire | m01-l02 | erreur de compilation | m01-l03 |
| variable, type, déclaration, initialisation | m02-l01 | mot réservé, camelCase (dépliable) | m02-l01 |
| affectation, concaténation, `String` (texte) | m02-l02 | type primitif, `int`, `long`, `double`, `float`, `char`, `boolean` | m02-l03 |
| compatibilité, conversion implicite, cast, troncature | m02-l04 | opérateur, division entière, modulo, priorité | m03-l01 |
| incrémentation, pré / post-incrémentation | m03-l02 | `Scanner`, `import` (prov.), invite, erreur d'exécution | m03-l03 |
| comparaison, condition, `if` / `else` | m04-l01 | opérateurs logiques `&&` `||` `!` | m04-l02 |
| `switch`, `case`, `break`, `default` | m04-l03 | boucle, itération, `for`, accumulateur, portée | m04-l04 |
| `while`, `do…while`, boucle infinie | m04-l05 | méthode, appel, `void`, `static` (prov.) | m05-l01 (static : m06-l02) |
| paramètre, argument, `return`, type de retour, variable locale | m05-l02 | signature, surcharge | m05-l03 |
| POO, objet, état, comportement, identité, attribut | m06-l01 | classe (déf.), instance, instanciation, UML | m06-l01 |
| `class` (Java), `new`, référence, méthode d'instance | m06-l02 | constructeur, `this` | m06-l03 |
| encapsulation, `private`, get / set, `public`, `protected`, paquetage | m06-l04 | héritage, `extends`, `super`, classe mère / fille | m06-l05 |
| exception, `try` / `catch`, interface, `implements`, tableau (mention) | m06-l06 | | |

Vérification de la relecture :
- **`new`** (m03-l03) et **`import`** sont des recettes, expliquées en m06-l02 ; `import` est seulement décrit comme « le rayon où trouver l'outil ».
- **`static`** et **`public`** sont écrits dès m01 (cadre), avec le calendrier ci-dessus.
- **« exception »** n'apparaît en m03-l03 que comme le nom affiché par Java (« erreur d'exécution ») ; il est défini en m06-l06.
- **`String`** n'est que « le type des textes ».
- **[créer]** : le seul (m05-l02) est précédé d'un `trous`.

## Récapitulatif des ⚠ du cours

| ⚠ | Traité | Où |
|---|---|---|
| p.20 versions LTS | oui (dépliable « culture ») | m01-l02 |
| p.24 « 247 caractères » | oui (dépliable « examen ») | m02-l01 |
| p.30 « int et char non compatibles » | oui (leçon principale) | m02-l04 |
| p.31 coquille `int x=;` (130 → −126) | oui (dépliable « examen ») | m02-l04 |
| p.33 « un int est un float… » | oui (dépliable « examen ») | m02-l04 |
| p.36 priorités | oui : `* / %` avant `+ -` en m03-l01 ; le reste en dépliable « examen » m04-l02 | m03-l01, m04-l02 |
| p.39 « a++ … pré-incrémentation » | oui (dépliable « examen ») | m03-l02 |
| p.53 `div` : division entière | oui, en `attention` (piège non signalé, pas une erreur du cours) | m05-l02 |
| p.54 « La machine virtuelle analyse… » | oui (`ecart`, ton respectueux) | m05-l03 |
| p.28 « portée classe » | oui (dépliable « examen ») | m06-l02 |
| p.5 C++ « normalisé ANSI » | oui (dépliable « culture ») | m06-l01 |
| p.26 `float pi` / `double pi` (même nom) | oui (`attention`) | m02-l03 |
| p.44 `sc.nextLine().charAt(0)` | **non** : la lecture d'un `char` au clavier est hors périmètre | — |

## Calendrier des rappels (une question `rappel` dans le test, à partir de m03)

| Leçon | Rappel | Leçon | Rappel |
|---|---|---|---|
| m03-l01 | m02-l02 | m04-l06 | m02-l04 |
| m03-l02 | m02-l04 | m05-l01 | m04-l04 |
| m03-l03 | m02-l03 | m05-l02 | m04-l01 |
| m03-l04 | m01-l03 | m05-l03 | m04-l05 |
| m04-l01 | m03-l02 (+ échauffement m03-l01) | m06-l01 | m05-l01 (+ échauffement m05-l02) |
| m04-l02 | m03-l03 | m06-l02 | m05-l02 |
| m04-l03 | m02-l03 | m06-l03 | m05-l03 |
| m04-l04 | m03-l02 | m06-l04 | m04-l02 |
| m04-l05 | m03-l01 | m06-l05 | m05-l02 |
| | | m06-l06 | m04-l05 |
