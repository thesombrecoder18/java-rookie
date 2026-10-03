# Revue technique Java de la carte pédagogique

Relecture de `docs/carte-pedagogique.md` (125 leçons), menée avec `docs/source-cours.md` et `docs/principes.md`.
Tous les points marqués « testé » ont été compilés et exécutés avec **JDK 26.0.1** (`javac`/`java`). Quand c'était utile, on a aussi compilé avec `--release 21`. Les fichiers de test sont dans `scratchpad/revue-java/`.

Gravité : **CRITIQUE** = le contenu ou l'outillage laisse passer quelque chose de faux. **HAUTE** = une simplification qui sera fausse plus tard, ou une contradiction que l'élève verra. **MOYENNE** = imprécision, piège non signalé ou message inexact. **BASSE** = nuance, détail de formulation ou dépendance à la plateforme.

---

## A. Problèmes, du plus grave au moins grave

### CRITIQUE

**1. Outillage, conventions, m16-l02 et m15-l04 : la vérification avec JDK 26 ne garantit pas la règle « compile avec JDK 21 »**
- **Problème** : `tools/verifier.mjs` lance `javac -encoding UTF-8 …` **sans `--release 21`**. Or JDK 25 a rendu définitives deux nouveautés : les constructeurs « flexibles » (JEP 513) et la méthode `main` d'instance (JEP 512). Un extrait qui ne marche que sous JDK 25 ou plus passe donc la vérification. Conséquence directe : la règle de m16-l02, « `super(…)` doit être la **première instruction** du constructeur », est **fausse sur le JDK utilisé pour vérifier**.
- **Preuve (testé)** :
  ```java
  Etudiant(String n, String m){ if (n == null) { n = "inconnu"; } super(n); mat = m; }
  ```
  - JDK 26 : compile, et l'exécution affiche `inconnu`.
  - `javac --release 21` : `error: flexible constructors is not supported in -source 21`.
  - De même, `class Main { void main() {…} }` s'exécute sous JDK 26.
- **Correction** :
  - (a) Dans le vérificateur : `javac --release 21 -encoding UTF-8 …`.
  - (b) Texte de m16-l02 : « `super(…)` appelle le constructeur de la classe mère. **Écris-le en première ligne du constructeur** : c'est obligatoire jusqu'à Java 24, et c'est la forme qui fonctionne partout. (Depuis Java 25, on peut placer quelques instructions avant `super(…)`, à condition qu'elles n'utilisent pas encore l'objet.) S'il est absent, Java appelle `super()` sans argument. »
  - (c) Ajouter la même phrase pour `this(…)` en m13-l04.

### HAUTE

**2. m04-l01 (et m02-l04) : « du grand vers le petit, il refuse » est contredit par `byte b = 100;`, que la carte enseigne elle-même**
- **Problème** : `100` est un littéral `int`. Pourtant `byte b = 100;` (m02-l04), `char c = 65;` et `short s = 'A';` compilent. La règle est donc fausse telle qu'elle est écrite, et l'élève attentif le verra tout seul.
- **Preuve (testé)** :
  - `byte b = 100; char c = 65; short s = 'A';` compile et affiche `100 A 65`.
  - `byte x = 128;` → `possible lossy conversion from int to byte`.
- **Correction**, à placer dans « À retenir » ou en encadré de m04-l01 : « Du grand vers le petit, Java refuse, **sauf** pour une valeur constante écrite directement (comme `100`) qui tient dans le petit type : `byte b = 100;` est accepté, `byte b = 128;` est refusé. Avec une **variable**, il refuse toujours : `int n = 100; byte b = n;` → erreur. »

**3. m03-l04 : « `x += 5` ⇔ `x = x + 5` » est faux, car `+=` contient un cast caché**
- **Problème** : avec `+=`, une conversion se fait en silence. Le cas dangereux pour le fil rouge (m07-l04, m07-l07) : `int somme = 0; somme += note;` (avec `note` en `double`) compile et **tronque** chaque note, alors que `somme = somme + note;` serait refusé.
- **Preuve (testé)** :
  - `int total = 0; total += 0.5; total += 0.5;` → `0`.
  - `int i = 5; i += 2.7;` → `7`.
  - `byte k = 10; k += 1000;` → `-14`.
  - `byte k = 10; k = k + 5;` → `possible lossy conversion from int to byte`.
- **Correction** : « `x += 5` fait **presque** la même chose que `x = x + 5`. Différence : `+=` remet le résultat dans le type de `x` **sans prévenir**. Avec `int somme`, `somme += 12.5` ajoute seulement 12. Un accumulateur de notes doit donc être un `double`. » Ajouter le cas `int somme += note` dans les « Erreur fréquente » de m07-l04.

**4. m11-l06, « À retenir » : « attributs en privé par défaut »**
- **Problème** : en Java, « par défaut » (aucun mot-clé) signifie **paquetage**, pas privé. C'est justement ce qu'enseigne m14-l05 (« aucun mot = paquetage »). La formulation installe donc l'intuition inverse.
- **Correction** : « … · **règle de conduite** : on déclare les attributs privés (`-`). Attention : en Java, un attribut sans mot-clé n'est **pas** privé (m14-l05). »

**5. m05-l02 et Annexe 0 : la virgule au clavier dépend de la langue configurée, et le compilateur en ligne conseillé est souvent en anglais**
- **Problème** : les affirmations de la carte sont justes (testé : en `fr_SN`/`fr_FR`, `12,5` donne 12.5 et `12.5` lève `InputMismatchException`). Mais il faut trois précisions :
  - (a) Sous Linux, si la langue `fr_SN` n'est pas installée, Java revient à `en_US`. Testé : `LANG=fr_SN.UTF-8` donne `Locale=en_US`.
  - (b) La plupart des compilateurs en ligne et beaucoup d'IDE tournent en `en_US`. L'Annexe 0 en propose un.
  - (c) En `en_US`, une saisie « à la française » peut être **mal lue sans aucune erreur**.
- **Preuve (testé)** :
  - `en_US` : `12,5` → `InputMismatchException`, et `1,500` → **1500.0**.
  - `fr_SN` : `1,500` → 1.5.
  - `println` affiche toujours un point (`12.5`), quelle que soit la langue.
- **Correction** : « Au clavier, le séparateur décimal dépend de la langue **configurée** pour Java : virgule si elle est en français (`fr_SN`, `fr_FR`), point si elle est en anglais (cas fréquent des compilateurs en ligne). En cas de doute, essaie les deux. Attention : `println` affiche toujours un point. » Facultatif, en encadré : `sc.useLocale(java.util.Locale.US);` force le point.
- **Pour le vérificateur** : il fixe déjà `-Duser.language=fr -Duser.country=FR`. C'est bien. Le garder, car toute `entree` contenant une virgule en dépend.

### MOYENNE

**6. m02-l04, m03-l01, m07-l02 : le débordement arithmétique silencieux n'est jamais montré**
- **Problème** : le débordement n'apparaît qu'avec les casts (m04-l03). Pourtant la factorielle de m07-l02 déborde dès 13!, et un produit d'`int` déborde même quand on range le résultat dans un `long`.
- **Preuve (testé)** :
  - `2147483647 + 1` → `-2147483648`.
  - `long p = 3000000 * 1000;` → `-1294967296`.
  - Avec `int`, 13! donne `1932053504` (faux, sans aucun message).
- **Correction** (encadré m02-l04, rappel en m07-l02) : « Un calcul qui dépasse la plage d'un `int` ne provoque **aucune erreur** : le résultat « fait le tour » et devient faux. `long p = 3000000 * 1000;` donne −1294967296, car le calcul est fait en `int` **avant** d'être rangé. Écris `3000000L * 1000`. »

**7. m07-l03 : `sc.nextDouble()` puis `sc.nextLine().charAt(0)` font planter le programme**
- **Problème** : les deux lignes sont présentées l'une après l'autre. Si l'élève les enchaîne, le ⏎ laissé par `nextDouble()` produit une ligne vide.
- **Preuve (testé)** : saisie `12,5⏎O⏎` → `StringIndexOutOfBoundsException: Index 0 out of bounds for length 0`.
- **Correction** : séparer clairement les deux exemples, ou insérer `sc.nextLine();` entre eux, avec le commentaire « // le piège du ⏎ (m05-l04) ». Dans m07-l07, donner le vrai symptôme : « … sinon : `StringIndexOutOfBoundsException: Index 0 out of bounds for length 0` ».

**8. m05-l03 : `next()` puis `nextLine()` à la suite**
- **Problème** : présentés ainsi, les deux appels laissent croire que `ligne` vaudra « Adama Seck ».
- **Preuve (testé)** : saisie `Adama Seck⏎` → `mot = "Adama"`, `ligne = " Seck"` (avec un espace au début).
- **Correction** : écrire « // programme 1 » et « // programme 2 », ou en faire un exercice [prédire] dont la réponse est `" Seck"`.

**9. m13-l04 : l'explication « Java a choisi le constructeur le plus proche » est fausse**
- **Problème** : le message est juste, mais l'explication ne l'est pas. Le compilateur ne choisit **aucun** constructeur. `javac` **simplifie** son message, et le signale par une note.
- **Preuve (testé)** :
  ```
  error: incompatible types: int cannot be converted to String
  Note: Some messages have been simplified; recompile with -Xdiags:verbose to get full output
  ```
  Avec `-Xdiags:verbose` : `no suitable constructor found for Etudiant(int,String)`, suivi de la liste des deux constructeurs non applicables.
- **Correction** : « (vérifié : aucun constructeur ne convient. `javac` affiche un message simplifié, qui parle du seul constructeur à 2 paramètres, et le dit en note : *Some messages have been simplified*.) »

**10. m10-l02 et m13-l05 : `[I@1b6d3586` n'est pas « une adresse », et ce code change à chaque exécution**
- **Problème** : on voit le nom du type, puis `@`, puis le **code de hachage** en hexadécimal. Ce n'est pas l'adresse mémoire, et la valeur varie d'une exécution à l'autre. De plus, si la classe est dans un paquetage, le nom affiché est complet (`esp.notes.Etudiant@…`).
- **Preuve (testé)** : `[I@2b2fa4f7` et `Etudiant@1dbd16a6`, différents de la carte.
- **Correction** :
  - m10-l02 : « affiche quelque chose comme `[I@2b2fa4f7` (`[I` = « tableau d'int », puis un code qui change à chaque exécution) : pas le contenu. »
  - m13-l05 : « affiche quelque chose comme `Etudiant@1dbd16a6` ». Dans les blocs `sortie`/`predire`, ne jamais exiger ce code exact.

**11. m15-l02 : « elle n'utilise aucun attribut d'instance / ne voit pas les attributs d'instance »**
- **Problème** : la leçon suivante (m15-l03) montre justement `main` (static) qui utilise `p.x`. Ce qui manque à une méthode `static`, c'est un **objet courant**, pas l'accès aux attributs.
- **Correction** : « Une méthode `static` n'a **pas d'objet courant** (pas de `this`). Elle ne peut donc pas écrire `nom` tout seul. Elle peut en revanche utiliser les attributs d'un objet qu'elle reçoit ou qu'elle crée : `p.nom`. »

**12. m13-l01 : constructeur par défaut, « il ne fait rien »**
- **Problème** : les initialisations écrites dans les déclarations (`int x = 5;`) s'exécutent quand même. Testé : `new Etudiant().x` vaut `5`. Le constructeur par défaut appelle aussi `super()`, à relier à m16-l02.
- **Correction** : « il ne contient aucune instruction de ta part : les attributs gardent leur valeur par défaut (0, false, null), ou la valeur écrite dans leur déclaration. »

**13. m14-l05 (et m15-l04) : « `public` … la JVM doit pouvoir l'appeler »**
- **Problème** : c'est vrai jusqu'à JDK 24. Depuis JDK 25, `static void main(String[] a)` sans `public` s'exécute (testé sous JDK 26 : « main non public OK »).
- **Correction** : « `public` : jusqu'à Java 24, la JVM exige un `main` public pour pouvoir l'appeler de l'extérieur. Depuis Java 25, ce n'est plus obligatoire, mais on garde la forme complète, qui fonctionne partout. » Formulation à aligner avec l'encadré de m15-l04.

**14. m08-l05 et m16-l03 : la surcharge n'a pas lieu seulement « dans la même classe »**
- **Problème** : une fille qui ajoute `afficher(String)` à côté de `afficher()`, hérité de la mère, **surcharge** la méthode, elle ne la redéfinit pas. Avec la seule définition du cours (p.54), l'élève ne saura pas classer ce cas, qui est pourtant l'erreur visée en m16-l07 (« surcharge au lieu de redéfinition »).
- **Correction** (m16-l03, Confusions) : « surcharge = même nom, **paramètres différents**, y compris entre une méthode héritée et une méthode de la fille. Redéfinition = **même signature** dans la fille. Le cours parle de « même classe » : c'est le cas le plus simple. »

**15. m08-l05 : le ⚠ p.54 risque de corriger le professeur à tort**
- **Problème** : `source-cours.md` transcrit seulement « c'est la signature de l'appel qui choisit ». Cette phrase est **juste**. La carte ajoute « (sous-entendu : à l'exécution) » : c'est une interprétation.
- **Correction** : vérifier sur la slide. Si elle ne mentionne ni la JVM ni l'exécution, remplacer le bloc `ecart` par un complément : « Précision : ce choix est fait par le **compilateur**, au moment de la compilation, d'après les types des arguments. » Même remarque pour le ⚠ p.53 (`div`) : le cours ne dit rien de faux, il omet un piège. Utiliser donc un bloc `attention`, pas « Le cours dit… / En réalité… ».

**16. m10-l03 : le for-each « ne permet pas de modifier les cases »**
- **Problème** : c'est vrai pour un tableau de primitifs. Dans un tableau d'objets (m12-l07, `Etudiant[]`), on peut modifier **l'objet** désigné par chaque case.
- **Preuve (testé)** :
  - `for (double n : notes) { n = 0; }` → `notes[0]` reste `10.0`.
  - `for (StringBuilder s : sb) { s.append("b"); }` → l'objet est modifié (`ab`).
- **Correction** : « Le for-each donne une **copie** du contenu de chaque case : `n = 0;` ne change pas le tableau. Pour remplacer une case, il faut le `for` avec indice. »

**17. m19-l05 : trois pièges des classes enveloppes non signalés**
- **Problème** : la carte dit « Java convertit automatiquement `int` ↔ `Integer` ». C'est vrai, mais cela ne va pas plus loin.
- **Preuve (testé)** :
  - (a) `ArrayList<Double> notes; notes.add(12);` → `incompatible types: int cannot be converted to Double`.
  - (b) `Integer x = 1000, y = 1000; x == y` → `false`, alors que `100 == 100` → `true`. Cela touche directement le message « `==` vs `equals` ».
  - (c) `ArrayList<Integer> l = [5, 7]; l.remove(5);` → `IndexOutOfBoundsException: Index 5 out of bounds for length 2` (5 est pris comme un **indice**).
- **Correction** (encadré) : « Pour une `ArrayList<Double>`, écris `12.0` et pas `12`. Compare deux `Integer` avec `equals`, jamais avec `==`. »

**18. m16-l04 et m14-l05 : `protected` « accessible dans les classes filles (même dans un autre paquetage) »**
- **Problème** : depuis un autre paquetage, la fille accède au membre `protected` **de ses propres objets** (`nom`, `this.nom`, `e2.nom` avec `e2` de type `Etudiant`), mais pas à travers une variable de type mère.
- **Preuve (testé)** : dans `q.Etudiant extends p.Personne`, `autre.nom` (avec `autre` de type `Personne`) → `nom has protected access in Personne`.
- **Correction** : ne pas l'enseigner en détail. Ajouter une demi-ligne : « (dans un autre paquetage : seulement sur ses propres objets, par exemple `this.nom`) ».

### BASSE

**19. m12-l04 : le message de `NullPointerException` dépend des options de compilation**
- **Preuve (testé)** :
  - `javac` seul, et aussi `java Main.java` : `because "<local1>" is null`.
  - Avec `javac -g` (le cas des IDE) : `because "e" is null`.
- **Correction** : « `NullPointerException: Cannot read field "nom" because "e" is null` (selon la façon de compiler, Java peut écrire `"<local1>"` au lieu du nom de la variable) ».

**20. m13-l02 : le message dépend du nombre de constructeurs**
- **Preuve (testé)** :
  - Avec un seul constructeur : `constructor Etudiant in class Etudiant cannot be applied to given types;`.
  - Avec deux ou plus : `no suitable constructor found for Etudiant(no arguments)`.
- **Correction** : citer les deux formes.
- Même remarque pour m08-l05, `plus(4)` : `no suitable method found for plus(int)` s'il existe plusieurs `plus`, mais `method plus in class Main cannot be applied to given types;` s'il n'y en a qu'un (testé).

**21. m12-l01 : le message du lanceur `java` en français est confus**
- **Preuve (testé)** :
  - En français : `Erreur : la méthode principale n'est pas Etudiant dans la classe javafx.application.Application, définissez la méthode principale comme suit : …` (traduction défectueuse du JDK).
  - En anglais : `Error: Main method not found in class Etudiant, please define the main method as: public static void main(String[] args) or a JavaFX application class must extend javafx.application.Application`.
- **Correction** : citer la version anglaise et sa traduction, et prévenir que la version française est mal traduite.

**22. m04-l04 : « pour les caractères courants, c'est le même que le code ASCII »**
- **Problème** : ASCII ne couvre que les codes 0 à 127. Le `é`, courant en français, vaut 233 (testé).
- **Correction** : « pour les lettres sans accent, les chiffres et la ponctuation (codes 0 à 127), c'est le code ASCII vu en algo ».

**23. m04-l01 : deux compléments à la perte de précision**
- **Problème** : `long` → `float` et `long` → `double` perdent aussi des chiffres. Testé : `(long)(double)123456789012345678L` → `123456789012345680`. Par ailleurs, la sortie `1.6777216E7` montre une notation que l'élève ne connaît pas.
- **Correction** : dans le ⚠, écrire « `int`/`long` → `float` et `long` → `double` peuvent perdre des chiffres ». Expliquer « `E7` = × 10⁷ » la première fois que la notation apparaît.

**24. m07-l06 : interdiction de redéclarer un nom dans un bloc intérieur**
- **Problème** : la règle n'est pas mentionnée, alors qu'elle diffère de certains langages et de l'intuition « chaque pièce a ses boîtes ».
- **Preuve (testé)** : `int x = 1; { int x = 2; }` → `variable x is already defined in method main(String[])`.
- **Correction** : ajouter « un bloc intérieur ne peut pas redéclarer une variable qui existe déjà autour de lui ».

**25. m15-l01 : « accès `Etudiant.nbEtudiants` » alors que l'exemple le déclare `private`**
- **Problème** : écrit depuis `Main`, cet accès est refusé (`… has private access`).
- **Correction** : écrire l'accès via `Etudiant.getNbEtudiants()` (m15-l02), ou préciser « depuis la classe elle-même ».

**26. m10-l04 et m10-l05 : `clone()` d'une matrice ne copie que la première dimension**
- **Preuve (testé)** : `h = g.clone(); h[0][0] = 99;` → `g[0][0]` vaut aussi 99.
- **Correction** : une ligne en m10-l05 : « `clone()` sur une matrice copie seulement les flèches des lignes ».

**27. m09-l04 : « une String ne change jamais »**
- **Problème** : la phrase peut faire croire que la **variable** est figée, ce qui la confond avec `final`.
- **Correction** : « l'objet `String` ne change jamais ; la variable, elle, peut recevoir une **nouvelle** chaîne : `nom = nom.toUpperCase();` ».

**28. m18 : trois formulations absolues**
- m18-l01 : « objet créé **par Java** ». En m18-l04, c'est toi qui le crées avec `throw new`. Écrire plutôt « un objet qui décrit un problème survenu à l'exécution ».
- m18-l03 : « `finally` s'exécute toujours ». Ajouter « (sauf arrêt brutal du programme, comme `System.exit`) ».
- m18-l05 : les exceptions non vérifiées sont `RuntimeException`, ses filles **et** `Error`.

**29. m06-l05 et m17-l02 : précisions sur `switch`**
- Les types acceptés sont aussi `byte`, `short` et les classes enveloppes. `long`, `double` et `boolean` sont refusés.
- Depuis Java 21, `case Mention.BIEN:` (nom qualifié) est aussi accepté : testé avec `--release 21`. Écrire donc « on peut écrire `BIEN` seul » plutôt qu'une forme obligatoire.

**30. m02-l01 : `int class;` ne donne pas exactement « la même chose » que `int 2prix;`**
- **Preuve (testé)** : on obtient `not a statement`, `';' expected` **et** `<identifier> expected`. C'est un détail.
- Pour ta culture : `_` seul est un mot réservé depuis Java 9, et les lettres accentuées (`prénom`) sont **autorisées** par Java. La règle « pas d'accents » du format est une **convention**, à présenter comme telle.

**31. ⚠ p.5 et ⚠ p.20 : nuancer pour rester juste envers le cours**
- p.5 : « C with Classes », l'ancêtre de C++, date de 1979-1980. Le cours n'a donc pas tort sur la date d'origine. Ce qui est faux, c'est la « normalisation ANSI » (1998).
- p.20 : le terme « LTS » n'existait pas encore à l'époque de Java 7. Java 7 a bien eu un support étendu, mais il n'est pas classé LTS. La correction 8, 11, 17, 21, 25 est juste.

**32. Source p.26 (information)**
- Recopier `float pi=3.14f; double pi=3.14;` dans un même `main` donne `variable pi is already defined`. La carte les sépare déjà, c'est bien. Si la slide les présente ensemble, ajouter un ⚠ : « deux variables ne peuvent pas porter le même nom dans le même bloc ».

---

## B. Sorties qui dépendent de la plateforme, de la langue ou de la version

| Leçon | Élément | Ce qui varie |
|---|---|---|
| m05-l02, m05-l05, m18-l06 | `nextDouble`/`nextFloat` | La langue configurée (voir point 5). Langue non installée sous Linux → `en_US`. |
| m09-l06 | `printf("%.2f")` | `12,35` en français, `12.35` en anglais (testé). |
| m10-l02, m13-l05 | `[I@…`, `Etudiant@…` | Le code de hachage change à chaque exécution ; préfixe de paquetage éventuel. |
| m12-l04 | Message de `NullPointerException` | `"<local1>"` ou `"e"`, selon `-g`. |
| m01-l01, m12-l01 | Messages du lanceur `java` | Français ou anglais selon la langue du système. La version française de « Main method not found » est mal traduite. |
| m17-l03 à m17-l05 | `LocalDate.now()`, `auj.plusDays(15)`, âge calculé | Dépendent de la date et du fuseau horaire : jamais de `sortie` figée. |
| m02-l05, m04-l01 et partout | Affichage des `double`/`float` | L'algorithme de `Double.toString` a changé avec JDK 19 (exemple : `2e23` affiche `2.0E23` en 19 et plus, `1.9999999999999998E23` avant). Notation `E` à partir de 10⁷ (testé : `1.0E7`, `1.23456789E7`). Les compilateurs en ligne en JDK 17 ou moins peuvent différer. |
| m18-l01, m09-l02 | Piles d'appels | Les premières lignes `at java.base/jdk.internal.util.Preconditions…` dépendent de la version du JDK. Seule la 1re ligne est stable. |
| m15-l04, m16-l02, m14-l05 | `main` simplifié, `super` non premier, `main` non public | Acceptés en JDK 25 et plus, refusés en JDK 21 (voir points 1 et 13). |

---

## C. Vérifié OK (testé avec JDK 26)

- **Messages `javac`** :
  - `';' expected` (le chapeau pointe juste après la `)`), `package system does not exist`, `unclosed string literal`, `cannot find symbol`.
  - `variable x might not have been initialized`, `variable age is already defined in method main(String[])`.
  - `possible lossy conversion` (int→byte, long→int, double→int, double→float, float→int p.53), `integer number too large`.
  - `<identifier> expected` (`12,5`), `')' or ',' expected`, `illegal start of expression` (`18%`), `unclosed character literal`, `cannot assign a value to final variable`.
  - `int cannot be converted to boolean`, `bad operand types for binary operator '<='` et `'<'`.
  - `';' expected` (for avec des virgules, do…while), `array dimension missing`, `']' expected`.
  - `missing return statement`, `void cannot be converted to int`, `unexpected return value`, `method plus(int,int) is already defined`, `int cannot be converted to String` (message simplifié pour `saluer(5)`).
  - `non-static method/variable … from a static context`, `toString() … cannot override … weaker access`, `'{' expected` (extends A, B), `does not override or implement a method from a supertype`, `is abstract; cannot be instantiated` (Personne, Affichable, List), `is not abstract and does not override abstract method`, `has private access`, `is not public in P; cannot be accessed from outside package`.
  - `different case kinds used in the switch`, `String cannot be converted to Mention`, `constructor LocalDate … cannot be applied to given types` (pour `new LocalDate()`), `exception NumberFormatException has already been caught`, `unreported exception InterruptedException`, `interface abstract methods cannot have body`, `cannot implement … weaker access`, `unexpected type required: reference found: int`, `class HelloWorld is public, should be declared in a file named HelloWorld.java`.
- **Lanceur** : `java HelloWorld.class` → « Erreur : impossible de trouver ou de charger la classe principale HelloWorld.class ».
- **Calculs** :
  - Opérations : `7/2=3`, `7.0/2=3.5`, `"Somme : "+2+3` → `Somme : 23`, `-7 % 3 = -1`, `2+3*4=14`, `1+2*3%4=3`, `12+15+9/3=30`.
  - Incrémentation : `i =+ 5` → 5, `i = i++` → inchangé, p.38 (6/10/15), p.39 (6/16).
  - Casts : `(byte)` 127, -125, 130→-126, -129→127, 128→-128, 256→0, -130→126 ; `(int)-2.7=-2` ; `(double)37/3=12.333333333333334` ; `(double)(7/2)=3.0` ; `float f = 16777217` → `1.6777216E7`.
  - Caractères : `'2'`→50, `'A'+1=66`, `(char)('A'+1)=B`, `'7'-'0'=7`, `'a'+'b'=195`.
  - Divers : `0.1+0.2=0.30000000000000004`, `1000*(1+0.18)=1180.0`, `div(7,2)=3.0` contre `(float)a/b=3.5`, `!true||true=true`, `5&3=1`, `Math.round(12.5)=13`, `Math.sqrt(16)=4.0`.
- **Chaînes et tableaux** :
  - `"1"+2+3=123`, `1+2+"3"=33`, `s1==new String` → false et `equals` → true, `toUpperCase` non récupéré → inchangé, `indexOf(' ')=5`, `"ESP-UCAD".substring(4,8)=UCAD`.
  - Exceptions : `StringIndexOutOfBoundsException: Index 5 out of bounds for length 5`, `NumberFormatException: For input string: "12a"`, `ArrayIndexOutOfBounds… Index 5 … length 5` et `Index 0 … length 0` (args), `IndexOutOfBoundsException: Index 2 out of bounds for length 2`, `ArithmeticException: / by zero`, `5.0/0=Infinity`.
- **Scanner** : en `fr_SN`/`fr_FR`, `12,5` est lu et `12.5` lève `InputMismatchException`. `nextInt` puis `nextLine` donne `nom = ""`.
- **Dates** : 2006-11-13 = `MONDAY` ; 2025-02-28 + 1 = 2025-03-01 ; 2025-12-31 + 1 = 2026-01-01 ; `Invalid date 'FEBRUARY 30'` ; `dd/mm/yyyy` → `Unsupported field: MinuteOfHour` ; `DateTimeParseException` ; `Period.getYears()` correct.
- **Les ⚠ du cours sont justes** : p.20 (LTS 8/11/17/21/25), p.24 (testé : identifiant de 1000 caractères accepté), p.28 (x d'instance inutilisable dans `main`), p.30 (char→int = 50), p.31 (130 → −126), p.33 (perte au-delà de 2²⁴ : 16777217 → 16777216), p.36 (priorités), p.39 (`++a`), p.53 (division entière). p.54 est à revoir (point 15).
