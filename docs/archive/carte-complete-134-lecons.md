# Carte pédagogique — Java Rookie

> Document de travail pour les rédacteurs. Chaque leçon décrite ici devient une page (5 à 10 minutes, UNE idée).
> À lire avec `docs/principes.md` (exigences), `docs/format-lecon.md` (format des leçons) et `docs/source-cours.md` (cours du Pr. Samba DIAW, avec ses ⚠).
> Version 2 : intègre `docs/revue-java.md` (corrections techniques) et `docs/revue-ux.md` (R1, R2, R4, R6 à R9, R11, R14, R15, R21).
>
> **Conventions de ce document**
> - `mXX-lYY` = identifiant de leçon. Le titre de chaque leçon se termine par sa **durée estimée** (environ 1 min par section + 1 min par interaction). Le dernier numéro de chaque module (sauf m00) est toujours la leçon « Bilan / défi ».
> - « Cours p.N » = numéro de slide du support officiel. « Hors PDF » = notion du sommaire officiel absente des PDF fournis : rédiger d'après la progression classique et ajouter la note « à vérifier avec le support officiel ».
> - **Écarts avec le cours.** Bloc `ecart` (« Le cours dit… / En réalité… ») seulement pour une affirmation **fausse** du support, avec un ton respectueux. Pour un piège que le cours ne signale pas, sans rien affirmer de faux : bloc `attention` (« Attention, piège »).
> - **Compilation.** Tout code doit compiler avec **`javac --release 21`**. Donc : pas de `main` simplifié, pas d'instruction avant `super(…)` ou `this(…)`, pas de `var`. On peut **mentionner** que les JDK récents (25 et plus) assouplissent certaines règles, mais on enseigne la forme du cours. Les messages d'erreur cités ont été vérifiés avec javac, sauf mention « en substance ». `javac` les affiche **en anglais** : toujours donner la traduction française à côté. Le lanceur `java`, lui, peut afficher ses messages en français selon la langue du système.
> - **Sorties dépendantes de la plateforme.** Ne jamais figer dans une `sortie` ou un `predire` :
>   - les codes `[I@…` et `Etudiant@…` (ils changent à chaque exécution) ;
>   - `LocalDate.now()` et ses dérivés ;
>   - une pile d'appels complète (seule la 1re ligne est stable) ;
>   - `printf("%.2f")` (affiche `12,35` en français, `12.35` en anglais) ;
>   - les nombres saisis avec une virgule (le vérificateur fonctionne en langue française : le dire dans la consigne).
> - **Fichier unique jusqu'en m14-l04.** Tous les exemples tiennent dans un seul fichier dont la classe publique s'appelle `Main` : en m12 et m13, `class Etudiant` (non publique) est placé dans le même fichier que `public class Main`. Un fichier par classe publique : à partir de m14-l04.
> - **Blocs disponibles** (voir `format-lecon.md`) :
>   - `trous` (code à compléter), `ordre` (remettre des lignes dans l'ordre), `cadre` (encadré « Où en est-on du cadre ? » : les mots de `public static void main(String[] args)` déjà compris en vert) ;
>   - `depliable`, de genre « examen » (utile pour l'examen, facultatif ce soir), « culture » ou « outil » (aide pratique : installation, lancement, arguments…) ;
>   - champ `rappel: "mXX-lYY"` sur `quiz` / `predire` / `trous` (badge Rappel).
>
>   « Relier / classer / cocher / compléter une table » s'écrit comme une **suite de 3 ou 4 quiz courts**.
> - **Récupération espacée (R11).**
>   - À partir de m03, la 1re leçon de chaque module commence par un **Échauffement** de 2 ou 3 questions sur les modules précédents, en mélangeant les notions.
>   - Chaque leçon à partir de m03 contient dans son `test` **une question `rappel`** vers un module antérieur (ligne « Rappel (test) » de chaque leçon ; calendrier complet en fin de document).
> - **Bilans en deux temps (R14).**
>   - **Défi guidé** (8 à 10 min, compté dans la durée) : il **commence toujours par le code de départ fourni** (le corrigé de la version précédente du fil rouge), avec des **valeurs de test figées** dans le code (ou dans STDIN), pour ne pas tout retaper à chaque essai.
>   - **Défi libre (optionnel)** : non compté, il reprend les [créer] et les défis annexes.
> - Niveaux d'exercice : comprendre → reproduire → modifier → prédire → corriger → créer → combiner. Avant un [créer], un exemple à `trous` quand le saut est grand.

---

## 0. Pourquoi cet ordre ?

**Avant tout : l'atelier (m00), puis une victoire en 5 minutes (m01-l01).** Le premier point d'abandon d'un débutant seul, ce n'est pas Java : c'est « où est-ce que je tape ça ? ». Le module m00 donne un seul outil en ligne (OneCompiler, qui accepte une entrée clavier et une classe `Main`), puis l'installation du JDK 21 et VS Code. La première leçon de m01 fait tourner un programme **avant** toute théorie. `javac`, `java` et la JVM viennent juste après (m01-l02), quand l'étudiant a vu son programme tourner.

Ensuite, on part de ce qu'il peut **voir fonctionner tout de suite** : ranger des valeurs (m02), calculer (m03), convertir (m04) et dialoguer avec l'utilisateur (m05). Viennent ensuite deux structures qu'il connaît déjà en pseudo-code, choisir (m06) et répéter (m07), puis le découpage en méthodes `static` (m08). Ces modules servent de **passerelle avec le cours d'algo** : `←` devient `=`, SI devient `if`, POUR devient `for`, fonction devient méthode. Puis deux types « composés » indispensables : les chaînes (m09) et les tableaux (m10). Le module m10 introduit la **référence** (la flèche) sur un cas concret, avant qu'on en ait besoin pour les objets.

**Placement de la partie 1 du cours (approche objet).** Le sommaire officiel la met en tête. Nous la plaçons en **m11, juste avant les classes Java**, pour trois raisons :
1. Un débutant qui n'a jamais écrit de code n'a rien à quoi rattacher « état, comportement, identité ».
2. À la fin de m10, il ressent un vrai problème : la promo gérée avec des **tableaux parallèles** se désynchronise au moindre échange. L'objet arrive comme **la solution**.
3. Le vocabulaire est frais au moment où on le code (m12 à m16).

Le module m11 est réduit à 5 leçons, et chacune contient un **aperçu Java qui tourne**, pour éviter une longue traversée sans code. Les leçons suivent l'ordre du cours (objet, classe, encapsulation, hiérarchie). L'encapsulation n'y montre que `+` et `-`. `#` et l'accès paquetage sont vus là où on les code (m14-l05, m16-l04). Le dessin UML détaillé (p.10) est fusionné avec la première classe Java (m12-l01).

Ensuite, l'objet est découpé en une idée à la fois : classes et objets (m12), constructeurs (m13), encapsulation et paquetages (m14), `static` (m15, placé **après** les objets, car « static » ne se comprend que par contraste avec « d'instance »), héritage (m16). Les énumérations et les dates (m17) viennent après l'objet, car elles s'appuient sur les objets, les méthodes `static` et l'immuabilité. Les exceptions (m18) viennent **après l'héritage**, car créer sa propre exception demande `extends`. Les interfaces et classes d'implémentation (m19) viennent **tard**, illustrées par `List` / `ArrayList`. JDBC (m20) ferme la marche en **module optionnel**, avec sa propre leçon d'installation.

**Écarts avec l'ordre du sommaire officiel, et pourquoi**

| Sommaire officiel | Ici | Raison |
|---|---|---|
| Approche objet (partie 1) en premier | m11 | Besoin d'un ancrage concret (voir ci-dessus). |
| « Les classes » avant « Structures de contrôle » | m12, après conditions, boucles, méthodes, chaînes et tableaux | Une classe utile contient des méthodes, des `if` et des boucles. |
| Scanner (p.58-59), en fin de PDF | m05, **avant** les conditions | Un `if` sans saisie n'a aucun intérêt : la valeur testée est connue d'avance. |
| Fonctions (p.49-57) dans « structures de contrôle » | module m08 dédié | Idée majeure, qui demande sa propre progression. |
| « Le type Date » avant « Tableaux » | m17, avec les enums | `LocalDate` est un objet immuable, créé par des méthodes `static`. |
| UML (p.10) dans la partie 1 | rectangle simple en m11-l02 ; détail et traduction Java en m12-l01 | Le dessin prend son sens quand on l'écrit en Java. |
| Visibilités `#` et « paquetage » (p.12-14) dans la partie 1 | m14-l05 et m16-l04 | Un seul nouveau signe à la fois, au moment où il est codé. |
| Portée « classe » (p.27-28) | portée de bloc en m07-l07 ; portée « classe » en m15-l03 | « Variable d'instance » et `static` ne sont pas encore définis en m07. |

**Volume.** 21 modules (m00 + 19 obligatoires + m20 optionnel) et 134 leçons. La durée totale est donnée dans la liste des modules, en fin de document. C'est plus que la cible indicative de départ : la règle « une leçon = une idée » passe avant le nombre de leçons.

### Stratégie pour `public static void main(String[] args)`

En m01-l01, le cadre est recopié tel quel (« ta ligne » en vert). En m01-l03, on le présente comme un **« formulaire officiel »** : les lignes grises ne changent jamais. Le tableau « quand chaque mot sera expliqué » est rangé dans un **dépliable**, pour ne pas afficher d'un coup six mots inconnus.

| Mot | Explication provisoire (m01-l03) | Explication réelle |
|---|---|---|
| `class` | « la boîte qui contient ton code ; son nom = le nom du fichier » | m11-l02 (concept), m12-l01 (en Java) |
| `main` | « la méthode principale : le point de départ » | m08-l01 (c'est une méthode) |
| `void` | — | m08-l03 (« ne rend rien ») |
| `String[] args` | — | m10-l06 |
| `public` | — | m14-l05 |
| `static` | — | m15-l02 et m15-l03 |
| Récapitulatif mot par mot | — | m15-l04 |

Le bloc `cadre` apparaît en m01-l03 (aucun mot en vert), m08-l07, m10-l06, m12-l01, m14-l05 et m15-l04 (tous les mots en vert).

### Fil rouge : « Le carnet de notes ESP »

Un programme de gestion des notes d'une promo de l'ESP. Il grandit de version en version :
v0 fiche en variables (m02) → v1 saisie clavier (m05) → v2 mention (m06) → v3 N notes (m07) → v4 méthodes (m08) → v5 identité texte (m09) → v6 promo en tableaux (m10) → modèle objet (m11) → v7 classe `Etudiant` (m12) → v8 constructeurs (m13) → v9 encapsulation et paquetage (m14) → v10 matricule automatique (m15) → v11 `Personne` / `Etudiant` / `Enseignant` (m16) → v12 `Mention` + âge (m17) → v13 saisie robuste (m18) → v14 `List<Etudiant>` (m19) → v15 sauvegarde en base (m20).

**Chaque défi guidé fournit le corrigé de la version précédente** : un étudiant qui a raté une version peut quand même avancer. Les **valeurs de test figées** (`String nom = "Adama"; // = sc.nextLine();`) évitent de tout retaper à chaque essai : on ne branche les saisies qu'à la fin, ou on les met dans STDIN. Défis annexes (carte de visite, `CompteBancaire`, `Voiture`, `Forme`) : toujours en « Défi libre (optionnel) ».

Personnages récurrents, repris du cours : Adama SECK (matricule 201506SRG, 22 ans), Mamadou SOW (p.22), Awa, Fatou. Classes reprises du cours : `Voiture`, `Ascenseur`, `Salarie`, `Employe`, `Personne`.

---

## Les modules

### m00-atelier — Préparer ton atelier
**À la fin de ce module, tu sauras…**
- faire tourner un programme Java en ligne, sans rien installer, et lui donner une entrée clavier ;
- installer un JDK 21 (ou plus récent) et vérifier qu'il fonctionne ;
- écrire, enregistrer et lancer un programme avec VS Code ;
- savoir où revenir quand une leçon demande un outil particulier.

**Prérequis** : aucun. **Fil rouge** : aucun. Module « atelier » : **aucune notion Java**. Le code montré est à recopier tel quel ; on le comprend en m01. Les fiches pratiques des leçons suivantes renvoient ici (dépliables « outil » en m10-l06, m14-l04 et m20-l02).

#### m00-l01 · Tester sans rien installer (6 min)
- **Problème** : tu veux voir un programme Java tourner **ce soir**, sur n'importe quel ordinateur (même au cybercafé), sans rien installer.
- **Notions et termes** : **compilateur en ligne** (site web qui transforme ton code et l'exécute). On recommande **un seul outil : OneCompiler** (onecompiler.com/java), car il accepte une entrée clavier et utilise une classe nommée `Main`. Les quatre zones à repérer : l'éditeur de code ; le bouton d'exécution (« Run ») ; **l'onglet d'entrée (STDIN)**, où l'on tape **à l'avance** ce que le programme lira au clavier ; la zone de sortie. L'outil impose que la classe s'appelle `Main` : c'est pourquoi les exemples du site utilisent `Main`.
- **Formulation prudente (consigne aux rédacteurs)** : les sites changent. Écrire : « si un bouton porte un autre nom, cherche "Run" / "Exécuter" et un onglet "STDIN" / "Input" ». Vérifier l'outil au moment de la rédaction et dater les captures. Ne rien promettre d'autre que : coller du code, l'exécuter, fournir une entrée, lire la sortie. Ajouter : « selon l'outil, passer des arguments au lancement ou utiliser plusieurs fichiers peut être impossible ; pour cela, l'installation (m00-l02, m00-l03) ». Signaler aussi que ces outils fonctionnent en général en anglais : pour les nombres à virgule tapés au clavier, voir m05-l02.
- **Illustration** : une capture annotée de l'outil, avec 4 zones numérotées (1 code, 2 Run, 3 STDIN, 4 sortie).
- **Mini-exemples** (à copier tel quel, non expliqués) :
  ```java
  public class Main {
      public static void main(String[] args) {
          System.out.println("Bonjour l'ESP !");
      }
  }
  ```
  Puis : changer le texte entre guillemets et relancer. Puis un programme qui lit une ligne : mettre `Awa` dans STDIN, et la sortie devient `Bonjour Awa`.
  ```java
  import java.util.Scanner;
  public class Main {
      public static void main(String[] args) {
          Scanner sc = new Scanner(System.in);
          System.out.println("Bonjour " + sc.nextLine());
      }
  }
  ```
- **Erreur fréquente** : STDIN laissé vide pour le 2e programme → le programme s'arrête avec `java.util.NoSuchElementException: No line found` (« aucune ligne trouvée »). Autre erreur : renommer la classe (`public class Bonjour`) → l'outil refuse (en substance : la classe publique doit s'appeler comme le fichier, ici `Main`).
- **Micro-exercices** : [reproduire] faire afficher ton prénom. [modifier] changer le contenu de STDIN et relancer.
- **À retenir** : un seul outil, OneCompiler · la classe s'appelle `Main` · ce que le programme lit au clavier se tape à l'avance dans STDIN.
- **Cours** : hors cours (outillage).

#### m00-l02 · Installer Java sur ton ordinateur (8 min)
- **Problème** : l'outil en ligne a des limites (connexion internet, un seul fichier, pas toujours d'arguments au lancement). Pour la suite du parcours (m10, m14, m20), il te faut Java chez toi.
- **Notions et termes** : **JDK** (Java Development Kit : la boîte à outils pour programmer en Java ; ses deux commandes principales, `javac` et `java`, sont expliquées en m01-l02) ; version **21** (une version suivie longtemps ; une version plus récente convient aussi) ; distribution recommandée : **Eclipse Temurin** (adoptium.net) ; **terminal** (la fenêtre où l'on tape des commandes : « Invite de commandes » ou PowerShell sous Windows, « Terminal » sous Linux) ; **PATH** (la liste des dossiers dans lesquels le système cherche les commandes).
- **Pas à pas, avec captures** :
  - Windows : installeur `.msi` de Temurin 21, en cochant l'ajout au PATH et la variable JAVA_HOME (vérifier les libellés exacts au moment de la rédaction).
  - Linux (Debian, Ubuntu) : `sudo apt install openjdk-21-jdk`, ou l'archive Temurin.
- **Illustration** : 4 vignettes numérotées : télécharger → installer → ouvrir un terminal → vérifier.
- **Mini-exemples** (commandes) :
  ```
  java -version     → openjdk version "21.0.x" …
  javac -version    → javac 21.0.x
  ```
- **Erreur fréquente** :
  - Windows : `'javac' n'est pas reconnu en tant que commande interne ou externe…` → le dossier `bin` du JDK n'est pas dans le PATH. Fermer et rouvrir le terminal, sinon réinstaller en cochant l'option PATH.
  - Linux : `javac: command not found` → seul l'environnement d'exécution est installé. Installer le paquet `-jdk`.
- **Confusions** : JDK (pour programmer, contient `javac`) vs JRE (seulement pour exécuter). Une version 25 ou 26 fonctionne aussi : le site n'enseigne que des formes valables dès Java 21.
- **Micro-exercices** : [reproduire] taper les deux commandes et noter le numéro de version. [corriger] (suite de quiz) « javac n'est pas reconnu » : que faire ?
- **À retenir** : installer un JDK 21 (ou plus récent) · vérifier avec `java -version` et `javac -version` · « n'est pas reconnu » = problème de PATH.
- **Cours** : hors cours.

#### m00-l03 · Ton éditeur : écrire et lancer avec VS Code (7 min)
- **Problème** : écrire dans le Bloc-notes, c'est travailler sans couleurs ni aide. On veut un éditeur qui lance le programme d'un clic.
- **Notions et termes** : **éditeur de code** ; une seule recommandation : **VS Code**, avec l'extension « Extension Pack for Java » (Microsoft). Ouvrir un **dossier** (Fichier > Ouvrir le dossier) ; créer `Main.java` ; le lien « Run » au-dessus de `main` ; le **terminal intégré** (Affichage > Terminal), où s'affiche la sortie et où l'on tape la saisie clavier (puis Entrée).
- **Illustration** : capture annotée : explorateur de fichiers, éditeur, lien « Run », terminal.
- **Mini-exemples** : dossier `java-rookie`, fichier `Main.java` contenant le programme de m00-l01 ; lancer avec « Run » ; puis le même lancement à la main dans le terminal (expliqué en m01-l02) :
  ```
  javac Main.java
  java Main
  ```
- **Erreur fréquente** : fichier enregistré sous `main.java` (minuscule) alors que la classe s'appelle `Main` → `class Main is public, should be declared in a file named Main.java`. Sous Windows, un fichier qui s'appelle en réalité `Main.java.txt` : afficher les extensions de fichiers.
- **Micro-exercices** : [reproduire] créer, lancer, modifier. [comprendre] quiz : où taper la saisie quand le programme attend ? (dans le terminal, puis Entrée).
- **À retenir** : un dossier par projet · un fichier `Main.java` · « Run », ou `javac` puis `java` dans le terminal.
- **Cours** : hors cours.

---

### m01-premiers-pas — Premiers pas : ton premier programme Java
**À la fin de ce module, tu sauras…**
- faire tourner un premier programme et le modifier ;
- expliquer ce que font `javac` et `java` (compiler, puis exécuter) ;
- reconnaître le cadre obligatoire d'un programme Java ;
- choisir entre `println` et `print`, et lire un message d'erreur de compilation.

**Prérequis** : m00 (un outil pour lancer du code). **Fil rouge** : pas encore. Le défi du module est une « carte de visite ».

#### m01-l01 · Ton premier programme tourne (5 min)
- **Problème** : avant toute théorie, voir un programme Java fonctionner, et le modifier soi-même.
- **Notions et termes** : **programme** (une suite d'instructions que l'ordinateur exécute) ; lancer un programme ; la ligne `System.out.println("…");` affiche le texte placé entre guillemets. Tout le reste est un **cadre** à recopier tel quel : on le comprend en m01-l02 et m01-l03. Aucun autre vocabulaire.
- **Illustration** : le programme avec le cadre en gris et une seule ligne en vert, « ta ligne ».
- **Mini-exemples** :
  ```java
  public class Main {
      public static void main(String[] args) {
          System.out.println("Hello World !");
      }
  }
  ```
  Puis, dans la zone verte uniquement : `System.out.println("Je suis à l'ESP");` ; deux `println` à la suite (deux lignes affichées) ; un texte avec accents.
- **Erreur fréquente** : effacer un guillemet ou le `;` → le programme ne se lance pas et affiche un message (on apprend à le lire en m01-l05). Réflexe : annuler (Ctrl+Z) et relancer.
- **Micro-exercices** : [reproduire] lancer Hello World. [modifier] afficher ton prénom puis ta filière, sur deux lignes.
- **À retenir** : un programme Java tourne dans un cadre · tu écris dans la zone verte · `println` affiche le texte entre guillemets.
- **Cours** : p.21 (exemple Hello World).

#### m01-l02 · Comment l'ordinateur comprend-il Java ? (7 min)
- **Problème** : ton programme a tourné (m01-l01). Mais l'ordinateur ne comprend que des 0 et des 1 : qu'a-t-il fait quand tu as cliqué sur « Run » ?
- **Notions et termes** : code source, langage de programmation, **compilateur** (`javac`), **bytecode** (fichier `.class`), **machine virtuelle Java (JVM)**, exécuter. Java est « multiplateforme » (p.19). L'outil en ligne et le bouton « Run » de VS Code font ces deux étapes pour toi. Dépliable « culture » : Sun 1995, Oracle depuis 2010, versions LTS (versions suivies longtemps) et le ⚠ p.20.
- **Illustration** : une chaîne de montage. `HelloWorld.java` (une recette écrite en « français de programmeur ») → `javac` (le traducteur) → `HelloWorld.class` (la recette en langue universelle) → la JVM (un cuisinier présent sur Windows, Linux et Mac), qui exécute.
- **Mini-exemples** (commandes du terminal) :
  ```
  javac HelloWorld.java      ← traduit : crée HelloWorld.class
  java HelloWorld            ← exécute (sans « .class » !)
  ```
  ```
  ls (Linux)  ou  dir (Windows)   →  HelloWorld.java   HelloWorld.class
  ```
- **Erreur fréquente** : `java HelloWorld.class` → « Erreur : impossible de trouver ou de charger la classe principale HelloWorld.class ». On donne le **nom de la classe**, pas le nom du fichier.
- **Confusions** : compiler ≠ exécuter. `javac` prend un nom de fichier (avec `.java`), `java` prend un nom de classe.
- **Explique-moi simplement** : l'interprète d'une conférence. Tu parles français, l'interprète traduit une fois pour toutes, et chaque pays peut écouter la traduction.
- **Micro-exercices** : [comprendre] bloc `ordre` : remettre dans l'ordre « écrire `.java` / `javac` / `.class` apparaît / `java` ». [prédire] après `javac Bonjour.java`, quel nouveau fichier apparaît ?
- **À retenir** : `javac` traduit le `.java` en `.class` · `java NomDeClasse` exécute · le `.class` tourne partout où il y a une JVM.
- **Cours** : p.19-21. ⚠ p.20 (dans le dépliable « culture ») : « Versions LTS actuelles : 7, 8, 11 & 17, … 24, 25 ». **En réalité**, les versions LTS sont 8, 11, 17, 21 et 25. Java 24 n'en est pas une. Java 7 a eu un support étendu, mais l'appellation « LTS » n'existait pas encore à son époque. Préciser que le site utilise JDK 21 ou plus récent.

#### m01-l03 · Le cadre obligatoire : HelloWorld (7 min)
- **Problème** : en m01-l01, tu as recopié les lignes grises sans les comprendre. Que sont-elles ? Java refuse une instruction « en vrac » : il exige un cadre.
- **Notions et termes** : **classe** (définition provisoire : « la boîte qui contient ton code ; elle porte le même nom que le fichier, majuscules comprises »), **méthode principale** `main` (provisoire : « l'endroit où le programme commence »), **bloc** `{ }`, **instruction**, le `;` qui termine chaque instruction, la **casse** (Java distingue majuscules et minuscules). Le tableau « quand chaque mot sera expliqué » (section 0) va dans un **dépliable**, pour ne pas afficher d'un coup six mots inconnus. Premier bloc `cadre` : aucun mot n'est encore en vert. Signaler que l'outil en ligne impose le nom `Main`, ce qui respecte la règle « nom du fichier = nom de la classe », puisqu'il crée lui-même `Main.java`.
- **Illustration** : des boîtes emboîtées, comme des poupées russes : fichier ⊃ classe ⊃ main ⊃ instructions. La zone où l'on écrit est surlignée en vert.
- **Mini-exemples** :
  ```java
  public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello World !");
      }
  }
  ```
  On ne change que la zone verte : deux `println` à la suite. Puis le même cadre pour une classe `Bonjour` dans `Bonjour.java`.
- **Erreur fréquente** : enregistrer le cadre ci-dessus dans `Hello.java` → `class HelloWorld is public, should be declared in a file named HelloWorld.java` (la classe publique HelloWorld doit être dans un fichier nommé HelloWorld.java).
- **Confusions** : `helloworld` ≠ `HelloWorld` (casse). Le nom du fichier doit être identique au nom de la classe.
- **Explique-moi simplement** : un formulaire administratif. Les cases imprimées ne bougent pas ; tu remplis seulement la zone prévue.
- **Micro-exercices** : [reproduire] écrire le cadre pour une classe `Salut` qui affiche « Salut l'ESP ! ». [corriger] un cadre avec trois fautes : `system`, une `}` manquante, un nom de fichier différent.
- **À retenir** : tout code Java est dans une classe · le programme commence dans `main` · chaque instruction finit par `;`.
- **Cours** : p.19 (casse, `{}`, `;`, une instruction peut tenir sur plusieurs lignes), p.21.

#### m01-l04 · Afficher : println et print (6 min)
- **Problème** : tu sais afficher une ligne avec `println`. Comment afficher plusieurs morceaux sur une **même** ligne ?
- **Notions et termes** : `System.out.println` (affiche puis va à la ligne), `System.out.print` (affiche sans aller à la ligne), texte entre guillemets (on dira « **chaîne de caractères** », ou texte), `println()` vide = ligne vide. Encadré final : les **commentaires** `//` et `/* … */` (écrits pour les humains, ignorés par Java).
- **Illustration** : une machine à écrire. `println` tape le texte puis fait le retour chariot ; `print` tape et laisse le curseur sur la même ligne.
- **Mini-exemples** :
  ```java
  System.out.println("Bonjour");
  System.out.print("Ba");  System.out.print("ye");   // affiche : Baye
  System.out.println(2 + 3);     // 5
  System.out.println("2 + 3");   // 2 + 3
  System.out.println();          // ligne vide
  // ceci est un commentaire : Java l'ignore
  ```
- **Erreur fréquente** : `System.out.println(Bonjour);` → `cannot find symbol` (symbole introuvable). Sans guillemets, Java cherche quelque chose qui s'appelle Bonjour.
- **Confusions** : `print` vs `println` ; `"2 + 3"` (un texte) vs `2 + 3` (un calcul).
- **Micro-exercices** : [prédire] la sortie d'un mélange de 3 `print` et `println`. [créer] afficher un triangle de 3 lignes d'étoiles.
- **À retenir** : `println` va à la ligne, `print` non · entre guillemets, Java affiche le texte tel quel · `//` = commentaire.
- **Cours** : p.34.

#### m01-l05 · Lire un message d'erreur sans paniquer (6 min)
- **Problème** : tu as oublié un `;` et `javac` refuse de compiler. Que te dit-il exactement ?
- **Notions et termes** : **erreur de compilation**, anatomie d'un message (`Fichier.java:3: error: description`), le chapeau `^` qui montre l'endroit, corriger **la première erreur d'abord** et recompiler.
- **Illustration** : le contrôleur à l'entrée. Il refuse le dossier, mais il entoure en rouge la ligne fautive.
- **Mini-exemples** (code faux → message) :
  ```java
  System.out.println("a")      // error: ';' expected
  system.out.println("a");     // error: package system does not exist
  System.out.println("a);      // error: unclosed string literal
  ```
  Une `}` manquante en fin de fichier → `reached end of file while parsing` (fin de fichier atteinte en pleine lecture).
- **Erreur fréquente** : croire que le chapeau `^` désigne toujours la faute exacte. Pour un `;` oublié, il pointe juste **après** l'endroit fautif.
- **Explique-moi simplement** : le correcteur d'orthographe. Il souligne, tu corriges, tu relances.
- **Micro-exercices** : [comprendre] relier 4 messages à 4 causes. [corriger] un programme de 4 lignes contenant 2 erreurs.
- **À retenir** : le message donne le fichier, la ligne et la cause · on corrige la 1re erreur, puis on recompile · les messages sont en anglais : garde le mini-lexique sous la main.
- **Cours** : p.19 (casse, `;`). Prévoir un « lexique des messages d'erreur » en annexe du site, enrichi à chaque module.

#### m01-l06 · Bilan / défi : ta carte de visite (9 min)
- **Problème** : combiner tout le module dans un vrai petit programme.
- **Notions** : aucune nouvelle. Réutilise le cadre, `println`/`print`, les commentaires et la lecture d'erreurs.
- **Illustration** : la carte de visite finale, encadrée d'étoiles.
- **Défi guidé** (9 min). Code de départ fourni : le cadre `Main` avec une ligne `println`. Étapes : v1 trois `println` (nom, filière, ESP) → v2 un cadre `*****` → v3 une ligne construite avec trois `print`.
- **Défi libre (optionnel)** : ta carte de visite sur 5 lignes, avec le dessin de ton choix.
- **Erreur fréquente** : on fournit une version qui contient 3 erreurs à corriger (casse, `;`, guillemet).
- **Micro-exercices** : [corriger] la version piégée (dans le défi guidé).
- **À retenir** : cadre + affichage = ton premier vrai programme.
- **Cours** : p.21, p.34.

---

### m02-variables-types — Ranger des valeurs : variables et types primitifs
**À la fin de ce module, tu sauras…**
- déclarer une variable, lui donner une valeur et l'afficher avec du texte ;
- choisir le bon type : `int`, `long`, `byte`, `short`, `double`, `float`, `char`, et distinguer `char` de `String` ;
- nommer correctement une variable ;
- créer une constante avec `final`.

**Prérequis** : m01. **Fil rouge** : v0, la fiche d'Adama sous forme de variables.

#### m02-l01 · Une variable, c'est une boîte (6 min)
- **Problème** : l'âge d'Adama apparaît à trois endroits de ton programme. Pour pouvoir le réutiliser, il faut le **ranger** quelque part.
- **Notions et termes** (alignées sur la leçon modèle `lecon-modele.js`) : **variable** (« boîte qui contient une donnée », p.24 : une case de mémoire qui porte un nom et contient une valeur) ; une ligne, trois informations : le **type** (pour l'instant `int` = nombre entier), le **nom**, la **valeur** de départ. `int age = 20;` est une **déclaration** (création de la boîte) avec **initialisation** (valeur de départ) ; lire la valeur = écrire le nom de la variable, sans guillemets. Les règles de nommage viennent en m02-l04 ; la concaténation en m02-l03.
- **Illustration** : une boîte étiquetée. Sa forme dépend du type `int`, l'étiquette porte `age`. Passerelle algo : `age : entier` puis `age ← 20` deviennent `int age = 20;`.
- **Mini-exemples** :
  ```java
  int age = 20;
  System.out.println(age);          // 20
  int annee = 2026;
  System.out.println(annee);        // 2026 (deux boîtes indépendantes)
  ```
  Consigne pour la leçon modèle : retirer la concaténation (`"J'ai " + age`), qui revient en m02-l03, et `annee - age`, qui anticipe m03. Les remplacer par une 2e et une 3e variable affichées seules.
- **Erreur fréquente** : `int age = "20";` → `incompatible types: String cannot be converted to int` ("20" entre guillemets est un texte).
- **Confusions** : `println("age")` (affiche le mot age) vs `println(age)` (affiche 20).
- **Micro-exercices** : [reproduire] créer `annee` qui vaut 2026 et l'afficher. [prédire] `int x = 7; System.out.println(x);`.
- **À retenir** : une variable = une boîte nommée qui garde une valeur · type, nom, valeur : `int age = 20;` · pour lire la valeur, on écrit le nom, sans guillemets.
- **Cours** : p.24, p.26.

#### m02-l02 · Changer la valeur : l'affectation `=` (7 min)
- **Problème** : la boîte `age` vaut 20. Comment changer son contenu ? Et peut-on créer une boîte d'abord, et la remplir plus tard ?
- **Notions et termes** : **déclaration** seule `type nom;` (la boîte existe, mais elle est vide), **affectation** `nom = expression;` (rappel : déclarer et affecter en une ligne = initialisation, m02-l01), **expression** (calcul à droite, évalué d'abord), écrasement de l'ancienne valeur, interdiction de redéclarer la même variable.
- **Illustration** : la flèche `←` de l'algo, couchée en `=`. On calcule à droite, puis on range à gauche ; l'ancienne valeur tombe de la boîte.
- **Mini-exemples** :
  ```java
  int age;  age = 20;
  int age2 = 20;                 // initialisation
  age = age + 1;                 // 21 : ce n'est pas une équation
  int x = 3; int y = x; x = 10;  // y vaut toujours 3
  ```
- **Erreur fréquente** : `int x, y; int somme = x + y;` → `variable x might not have been initialized` (variable peut-être pas initialisée). Exemple du cours p.29. Aussi : `int age = 20; int age = 21;` → `variable age is already defined in method main(String[])`.
- **Confusions** : `=` (ranger) vs l'égalité des maths. Le test d'égalité `==` est annoncé pour m06-l01.
- **Explique-moi simplement** : « mets 20 dans la boîte age ». Le `=` se lit « reçoit ».
- **Micro-exercices** : [prédire] valeurs de `a` et `b` après 4 affectations. [corriger] le code de la p.29.
- **À retenir** : `=` range la valeur de droite dans la variable de gauche · l'ancienne valeur est perdue · une variable doit avoir une valeur avant d'être lue.
- **Cours** : p.26, p.29.

#### m02-l03 · Afficher une variable avec du texte : la concaténation (6 min)
- **Problème** : `println(age)` affiche `20` tout seul. On veut afficher « Adama a 20 ans ».
- **Notions et termes** : **concaténation** (`+` entre un texte et une valeur colle les morceaux) ; avec guillemets = texte, sans guillemets = valeur de la variable ; les espaces sont à ajouter soi-même. **`String`** (définition provisoire : « le type des textes ; il s'écrit avec une majuscule ; ce n'est pas un type comme les autres, on le verra en m09 »).
- **Illustration** : des wagons accrochés : `"Adama a "` + `20` + `" ans"`.
- **Mini-exemples** :
  ```java
  System.out.println("Âge : " + age);
  System.out.println("age");     // affiche le mot age
  String prenom = "Adama";
  System.out.println(prenom + " a " + age + " ans");
  ```
- **Erreur fréquente** : `System.out.println("Âge : " age);` → `')' or ',' expected`. Il manque le `+`.
- **Confusions** : `"age"` vs `age`. Les espaces oubliés : `"Adama a" + age + "ans"` donne `Adama a20ans`.
- **Micro-exercices** : [prédire] 3 affichages. [modifier] ajouter les espaces manquants.
- **À retenir** : `+` colle un texte et une valeur · entre guillemets = texte tel quel · pense aux espaces.
- **Cours** : p.34 ; p.22 (`args[0] + " " + args[1]`, à revoir en m10).

#### m02-l04 · Bien nommer une variable (6 min)
- **Problème** : `age moyen`, `2prix`, `note-1` : quels noms Java accepte-t-il ? Et lesquels aideront à relire ton code dans un mois ?
- **Notions et termes** : **identificateur** (le nom d'une variable) et ses règles : lettres, chiffres, `_` et `$` ; pas de chiffre au début ; pas d'espace ; pas un **mot réservé** (mot que Java garde pour lui : `int`, `class`, `public`…) ; sensible à la casse. Convention camelCase (`noteMaths`). Convention du site : pas d'accents dans les noms (`prenom`). Ce n'est **qu'une convention** : Java accepte `prénom`. Dépliable « culture » : `_` seul est un mot réservé depuis Java 9.
- **Illustration** : un contrôleur d'étiquettes, avec un tampon vert ou rouge sur 6 étiquettes.
- **Mini-exemples** :
  ```java
  int nombre;
  long _x1;          // exemple du cours (p.24)
  int $test;
  int noteMaths;     // camelCase : conseillé
  ```
- **Erreur fréquente** : `int 2prix;` → `not a statement` + `';' expected` (Java ne reconnaît pas une déclaration). `int class;` → mêmes messages, plus `<identifier> expected` : `class` est un mot réservé.
- **Confusions** : `Age` et `age` sont deux noms différents.
- **Micro-exercices** : [corriger] suite de 4 quiz courts « valide ou non ? » : `age moyen`, `note-1`, `_total`, `2eme`, `int`, `noteFinale`. [modifier] renommer `a`, `b`, `c` d'un petit programme en noms parlants.
- **À retenir** : pas de chiffre au début, pas d'espace, pas de mot réservé · camelCase · un nom parlant.
- **Cours** : p.24. ⚠ p.24 : « maximum 247 caractères ». **En réalité**, Java n'impose aucune limite pratique à la longueur d'un nom. La vraie règle : un nom parlant et raisonnable.

#### m02-l05 · Les entiers : byte, short, int, long (7 min)
- **Problème** : un `int` peut-il ranger la population mondiale (8 milliards) ? Non : les boîtes ont une taille.
- **Notions et termes** : **type primitif** (type de base intégré à Java ; la boîte contient directement la valeur ; il en existe 8), **bit**, **plage** (min = −2^(n−1), max = 2^(n−1) − 1), `byte` 8 bits (−128..127), `short` 16, `int` 32 (environ ±2,1 milliards), `long` 64, **littéral** (valeur écrite directement), suffixe `L`.
- **Illustration** : 4 récipients de taille croissante (gobelet, verre, bouteille, bidon), chacun avec sa plage.
- **Mini-exemples** :
  ```java
  byte b = 100;            // 100 tient dans un byte : accepté (détails m04-l01)
  short ligne = 40;              // p.26
  int var1 = 20;                 // p.26
  long population = 8000000000L;
  ```
- **Erreur fréquente** : `byte x = 128;` → `incompatible types: possible lossy conversion from int to byte` (perte possible). `long p = 8000000000;` → `integer number too large` : il manque le `L`.
- **Attention, piège** (encadré, rappelé en m07-l02) : un calcul qui dépasse la plage d'un `int` ne provoque **aucune erreur** : le résultat « fait le tour » et devient faux. `2147483647 + 1` vaut −2147483648. `long p = 3000000 * 1000;` donne −1294967296, car le calcul est fait en `int` **avant** d'être rangé. Écrire `3000000L * 1000`.
- **Confusions** : `L` est un suffixe, pas une variable. Préférer `L` majuscule (`l` ressemble à `1`).
- **Micro-exercices** : [comprendre] choisir le type pour : âge, nombre d'étudiants de l'ESP, distance Terre–Soleil en mètres. [prédire] `byte x = -129;` compile-t-il ?
- **À retenir** : 4 types d'entiers, du plus petit au plus grand · `int` par défaut · `L` pour les grands `long`.
- **Cours** : p.25-26, p.30.

#### m02-l06 · Les nombres à virgule : double et float (6 min)
- **Problème** : une moyenne de 12,5 ne rentre pas dans un `int`.
- **Notions et termes** : `double` (le type par défaut des nombres à virgule), `float` (simple précision, suffixe `f`), le **point** décimal dans le code, nombres à virgule approchés (pas toujours exacts).
- **Illustration** : une règle graduée très fine, mais pas infiniment fine (loupe sur `0.30000000000000004`).
- **Mini-exemples** :
  ```java
  double moyenne = 12.5;
  float pi = 3.14f;            // p.26
  double x = 7;                // affiche 7.0
  System.out.println(0.1 + 0.2);   // 0.30000000000000004
  ```
- **Erreur fréquente** : `float pi = 3.14;` → `possible lossy conversion from double to float`. `double m = 12,5;` → `<identifier> expected` : dans le code, on écrit un point, pas une virgule.
- **Attention, piège** (p.26) : la slide donne `float pi=3.14f;` et `double pi=3.14;`. Recopiées dans un même `main`, ces deux lignes donnent `variable pi is already defined in method main(String[])` : deux variables ne peuvent pas porter le même nom dans le même bloc.
- **Confusions** : la virgule française vs le point du code. Annonce : au **clavier**, ce sera virgule ou point selon la langue de ta machine (m05-l02).
- **Micro-exercices** : [corriger] 3 déclarations fausses. [prédire] l'affichage de `double d = 5;`.
- **À retenir** : `double` pour les nombres à virgule · point dans le code · `f` pour un `float`.
- **Cours** : p.25-26.

#### m02-l07 · Une lettre : le type char (et pourquoi ' ' n'est pas " ") (6 min)
- **Problème** : ranger l'initiale d'un prénom, ou le sexe `'F'`.
- **Notions et termes** : `char` (un seul caractère, entre apostrophes, codé en Unicode sur 16 bits) ; différence avec `String` (zéro, un ou plusieurs caractères, entre guillemets). `boolean` est vu en m06-l01, là où l'on en a besoin. Le tableau des 8 types est dans le bilan m02-l09.
- **Illustration** : une case à une seule place (`char`) à côté d'un collier de perles (`String`).
- **Mini-exemples** :
  ```java
  char c = 'A';
  char sexe = 'F';
  char chiffre = '7';          // un caractère, pas le nombre 7
  String nom = "Adama";
  ```
- **Erreur fréquente** : `char c = "A";` → `incompatible types: String cannot be converted to char`. `String s = 'Bonjour';` → `unclosed character literal` (des apostrophes ne peuvent contenir qu'un seul caractère).
- **Confusions** : `' '` vs `" "` ; `'7'` vs `7` (approfondi en m04-l04) ; `char` vs `String`.
- **Explique-moi simplement** : apostrophe = une seule lettre ; guillemets = un mot ou une phrase.
- **Micro-exercices** : [corriger] 4 déclarations. [comprendre] suite de quiz « char, String ou nombre ? » : `'a'`, `"a"`, `7`, `'7'`.
- **À retenir** : `char` = un caractère entre `' '` · `String` = texte entre `" "` · `String` n'est pas un type primitif.
- **Cours** : p.25-26.

#### m02-l08 · Une boîte verrouillée : final (5 min)
- **Problème** : le nombre de matières vaut 3 et ne doit jamais changer. Comment empêcher une modification par erreur ?
- **Notions et termes** : `final`, **constante**, convention `MAJUSCULES_AVEC_SOULIGNES`. Passerelle algo : la section CONSTANTES.
- **Illustration** : une boîte fermée par un cadenas.
- **Mini-exemples** :
  ```java
  final int NB_MATIERES = 3;
  final double TVA = 0.18;
  double prixTTC = 1000 * (1 + TVA);
  ```
- **Erreur fréquente** : `NB_MATIERES = 4;` → `cannot assign a value to final variable NB_MATIERES`.
- **Micro-exercices** : [modifier] transformer en constantes les valeurs « magiques » d'un code. [prédire] lequel des deux codes compile.
- **À retenir** : `final` = valeur définitive · nom en MAJUSCULES · on l'utilise pour les valeurs fixes.
- **Cours** : hors PDF (complément). `static final` sera vu en m15-l01.

#### m02-l09 · Bilan / défi : la fiche d'Adama (fil rouge v0) (10 min)
- **Problème** : décrire un étudiant uniquement avec des variables.
- **Notions** : réutilise m01 et m02. Récapitulatif : le **tableau des 8 types primitifs** (`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`). `boolean` y est seulement annoncé : « deux valeurs, `true` ou `false`, utilisé dès m06 ». Défi sans terme nouveau : **échanger deux variables** avec une variable temporaire (passerelle algo).
- **Illustration** : deux verres et un troisième verre vide pour échanger leur contenu.
- **Défi guidé** (10 min). Code de départ fourni : un `main` contenant `String nom = "Adama";`. Étapes : v1 ajouter `char initiale`, `int age`, 3 `double` notes, `final int NB_MATIERES` → v2 afficher une fiche → v3 échange :
  ```java
  int a = 5, b = 8;
  int temp = a;  a = b;  b = temp;
  ```
  (déclaration multiple, p.26 : `int x, y, z;`)
- **Défi libre (optionnel)** : la fiche de ton/ta meilleur(e) ami(e), puis l'échange de deux de ses notes.
- **Erreur fréquente** : faire `a = b; b = a;` sans variable temporaire : les deux valent 8.
- **Micro-exercices** : [prédire] le résultat du mauvais échange (dans le défi guidé).
- **À retenir** : choisir le bon type pour chaque information · nommer clairement · `temp` pour échanger.
- **Cours** : p.24-26, p.29, p.34.

---

### m03-operateurs — Calculer : les opérateurs
**À la fin de ce module, tu sauras…**
- calculer avec `+ - * / %` et éviter le piège de la division entière ;
- prévoir l'ordre des calculs (priorité, parenthèses) ;
- utiliser `+=`, `++`, `--` ;
- distinguer `i++` de `++i`.

**Prérequis** : m02. **Fil rouge** : moyenne des 3 notes de la fiche.

#### m03-l01 · Les quatre opérations… et la surprise de la division (7 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] `int x = 3; x = 10;` : que vaut x ? (m02-l02) · [quiz] `'A'` ou `"A"` pour un `char` ? (m02-l07) · [prédire] `println("age")` (m02-l01).
- **Problème** : calculer la moyenne des notes de la fiche.
- **Notions et termes** : **opérateur**, **opérande**, `+ - * /`, **division entière** (deux `int` donnent un `int` : la partie après la virgule est perdue) ; si l'un des deux nombres est un `double`, le résultat est un `double` (règle admise ici, expliquée en m04).
- **Illustration** : partager 7 mangues entre 2 personnes : chacune en reçoit 3, il en reste 1. En `int`, pas de demi-mangue.
- **Mini-exemples** :
  ```java
  System.out.println(7 / 2);      // 3
  System.out.println(7.0 / 2);    // 3.5
  System.out.println(1 / 3);      // 0
  int s = 12 + 15;                // 27
  ```
- **Erreur fréquente** : `int m = 7 / 2.0;` → `possible lossy conversion from double to int`.
- **Confusions** : `/` entre entiers = le `div` de l'algo ; `7/2` vs `7/2.0`.
- **Micro-exercices** : [prédire] 5 calculs. [corriger] une moyenne qui donne 12 au lieu de 12.333….
- **À retenir** : `int / int` donne un `int` (tronqué) · ajoute `.0` pour obtenir une division à virgule · `/` entre entiers = le `div` de l'algo.
- **Rappel (test)** : une question `rappel: "m02-l03"` (quiz ou predire) sur « Afficher une variable avec du texte : la concaténation ».
- **Cours** : p.35. Annonce du piège p.53 (m08-l04).

#### m03-l02 · Le reste : l'opérateur % (6 min)
- **Problème** : comment savoir si un nombre est pair ? Comment convertir 135 minutes en heures et minutes ?
- **Notions et termes** : `%` (**modulo** : reste de la division entière, le `mod` de l'algo).
- **Illustration** : ranger des minutes par paquets de 60 : nombre de paquets = `/`, minutes restantes = `%`.
- **Mini-exemples** :
  ```java
  System.out.println(7 % 3);      // 1
  System.out.println(10 % 2);     // 0  → pair
  int h = 135 / 60, m = 135 % 60; // 2 h 15
  System.out.println(-7 % 3);     // -1 (le signe suit le premier nombre)
  ```
- **Erreur fréquente** : croire que `%` veut dire pourcentage : `double p = 18%;` → `illegal start of expression`.
- **Micro-exercices** : [prédire] `17 % 5`, `20 % 4`, `3 % 7`. [trous] compléter `int min = 200 ___ 60; int sec = 200 ___ 60;`. [créer] convertir 7 500 secondes en heures, minutes et secondes.
- **À retenir** : `%` = reste · `n % 2 == 0` ⇔ n est pair (le `==` vient en m06) · `/` et `%` vont ensemble.
- **Rappel (test)** : une question `rappel: "m02-l02"` (quiz ou predire) sur « Changer la valeur : l'affectation `=` ».
- **Cours** : p.35 ; p.43 (le reste calculé par soustractions successives, revu en m07).

#### m03-l03 · Qui calcule en premier ? La priorité (6 min)
- **Problème** : `12 + 15 + 9 / 3` donne 30, pas 12. Et `"Somme : " + 2 + 3` affiche `Somme : 23`. Pourquoi ?
- **Notions et termes** : **priorité des opérateurs** (`* / %` avant `+ -`), lecture de gauche à droite à priorité égale, parenthèses.
- **Illustration** : une file d'attente avec passage prioritaire : `*`, `/` et `%` passent devant.
- **Mini-exemples** :
  ```java
  System.out.println(2 + 3 * 4);       // 14
  System.out.println((2 + 3) * 4);     // 20
  System.out.println(10 - 4 - 3);      // 3
  System.out.println(1 + 2 * 3 % 4);   // 3
  System.out.println("Somme : " + 2 + 3);    // Somme : 23 (de gauche à droite)
  System.out.println("Somme : " + (2 + 3));  // Somme : 5
  ```
- **Erreur fréquente** : moyenne sans parenthèses (`12 + 15 + 9 / 3` → 30).
- **Micro-exercices** : [prédire] 4 expressions. [corriger] la moyenne.
- **À retenir** : `* / %` avant `+ -` · à égalité, de gauche à droite (même avec un texte) · en cas de doute, des parenthèses.
- **Rappel (test)** : une question `rappel: "m02-l05"` (quiz ou predire) sur « Les entiers : byte, short, int, long ».
- **Cours** : p.36. ⚠ « Le cours dit » : `() ; ++ ; -- ; * / % + - ; …`. **En réalité**, `* / %` passent **avant** `+ -` (ils ne sont pas au même niveau). Les autres points du ⚠ p.36 (`!`, `& ^ |`) sont traités en m06-l05.

#### m03-l04 · Les raccourcis : +=, -=, ++, -- (6 min)
- **Problème** : `score = score + 5;` répète deux fois le nom. Java propose plus court.
- **Notions et termes** : opérateurs d'affectation composés `+= -= *= /=` (`x += 5` fait **presque** la même chose que `x = x + 5` : `+=` remet en plus le résultat dans le type de `x` **sans prévenir**), **incrémentation** `++` (+1), **décrémentation** `--` (−1).
- **Illustration** : un compteur à cliquer.
- **Mini-exemples** :
  ```java
  int score = 10;  score += 5;   // 15
  score -= 3;                    // 12
  int i = 0;  i++;               // 1
  i--;                           // 0
  ```
- **Attention, piège** (cast caché de `+=`) : `int total = 0; total += 0.5; total += 0.5;` → 0 ; `int i = 5; i += 2.7;` → 7. Avec `int somme`, `somme += 12.5` n'ajoute que 12 : un accumulateur de notes doit être un `double` (rappelé en m07-l04). Alors que `somme = somme + 12.5;` est refusé à la compilation.
- **Erreur fréquente** (piège silencieux) : `i =+ 5;` compile, mais met 5 dans `i` (c'est `i = +5`). Autre erreur : `int i; i++;` → `variable i might not have been initialized`.
- **Micro-exercices** : [modifier] réécrire 4 lignes avec les raccourcis. [prédire] la valeur finale.
- **À retenir** : `x += 5` ≈ `x = x + 5`, avec un cast caché · `i++` ajoute 1 · attention à `=+`.
- **Rappel (test)** : une question `rappel: "m02-l02"` (quiz ou predire) sur « Changer la valeur : l'affectation `=` ».
- **Cours** : p.35, p.37.

#### m03-l05 · i++ ou ++i : quand l'ordre compte (6 min)
- **Problème** : seul sur sa ligne, `i++` et `++i` font la même chose. Mais dans `int j = i++;` ?
- **Notions et termes** : **post-incrémentation** `i++` (donne l'ancienne valeur, puis incrémente), **pré-incrémentation** `++i` (incrémente, puis donne la nouvelle valeur).
- **Illustration** : un guichet. Version « post » : « je te donne ton ticket, puis j'avance le compteur ». Version « pré » : « j'avance le compteur, puis je te donne ton ticket ».
- **Mini-exemples** :
  ```java
  int i = 2; int j = i++;        // j = 2, i = 3   (p.37)
  int k = 2; int m = ++k;        // m = 3, k = 3
  ```
- **Dépliable « examen »** (contenu utile pour l'examen, facultatif ce soir) : les exemples du cours `int a = 5, b = 10; int c = a++ + b;` → a=6 b=10 c=15 (p.38) ; `c = ++a + b` (avec a=5) → a=6 c=16 (p.39).
- **Erreur fréquente** : `i = i++;` → `i` ne change pas (vérifié : 5 reste 5). Conseil : utiliser `++` seul sur sa ligne.
- **Explique-moi simplement** : « plus-plus après » = « utilise d'abord, augmente ensuite ».
- **Micro-exercices** : [prédire] un tableau de trace sur 3 lignes. [corriger] un code piégé.
- **À retenir** : `x++` utilise puis augmente · `++x` augmente puis utilise · seul sur une ligne, c'est pareil.
- **Rappel (test)** : une question `rappel: "m02-l08"` (quiz ou predire) sur « Une boîte verrouillée : final ».
- **Cours** : p.37-39. ⚠ p.39 : « L'opérateur a++ est un opérateur de pré-incrémentation ». **En réalité**, l'exemple utilise `++a` ; `a++` est la **post**-incrémentation.

#### m03-l06 · Bilan / défi : la calculatrice de la fiche (fil rouge) (10 min)
- **Problème** : calculer la moyenne exacte et quelques informations utiles.
- **Notions** : toutes celles de m03, plus les variables et `final` (m02).
- **Défi guidé** (10 min). Code de départ fourni : la fiche v0 corrigée (m02-l09). Valeurs de test figées dans le code. Étapes : v1 `double moyenne = (n1 + n2 + n3) / NB_MATIERES;` → v2 durée d'examen en h/min avec `/` et `%` → v3 un compteur `nbNotes++`.
- **Défi libre (optionnel)** : prédire 5 expressions mélangées, puis vérifier en les exécutant.
- **Erreur fréquente** : des notes en `int` donnent une moyenne tronquée. On l'annonce : la solution propre vient en m04-l02.
- **Micro-exercices** : [combiner] fiche + moyenne + durée (c'est le défi guidé).
- **À retenir** : la division entière est le piège n°1 · parenthèses · `%` pour les restes.
- **Rappel (test)** : une question `rappel: "m02-l07"` (quiz ou predire) sur « Une lettre : le type char (et pourquoi ' ' n'est pas " ") ».
- **Cours** : p.35-39.

---

### m04-conversions — Passer d'un type à l'autre : compatibilité et transtypage
**À la fin de ce module, tu sauras…**
- dire quand Java convertit tout seul (élargissement) ;
- forcer une conversion avec un cast `(type)` et prévoir la troncature ;
- prévoir le résultat d'un cast qui déborde ;
- passer d'un `char` à son code numérique, et inversement.

**Prérequis** : m02, m03. **Fil rouge** : moyenne exacte avec des notes entières.

#### m04-l01 · Du petit au grand : la conversion automatique (8 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] `7 / 2` et `7 % 2` (m03-l01, m03-l02) · [prédire] `2 + 3 * 4` (m03-l03) · [quiz] quel type pour une moyenne ? (m02-l06).
- **Problème** : `long y = x;` (avec `x` de type `int`) compile, mais `int z = y;` refuse. Pourquoi ?
- **Notions et termes** : **compatibilité** (A est compatible avec B si la plage de A est incluse dans celle de B), **conversion implicite** (ou élargissement), hiérarchie `byte → short → int → long → float → double` (et `char → int`).
- **Illustration** : verser un verre dans une bouteille : ça rentre toujours.
- **Mini-exemples** :
  ```java
  int x = 127;  long y = x;     // OK
  double d = 5;                 // 5.0
  float f = 16777217;           // affiche 1.6777216E7 : un chiffre perdu !
  byte b = 100;                 // valeur constante qui tient dans un byte : acceptée
  ```
- **Erreur fréquente** : `long y = 20; int z = y;` → `possible lossy conversion from long to int`.
- **Confusions** : « automatique » ne veut pas dire « toujours exact » (`int` → `float`). Notation `1.6777216E7` : `E7` signifie « × 10⁷ » (Java l'utilise pour afficher les grands nombres à virgule).
- **Attention, exception à la règle** : du grand vers le petit, Java refuse, **sauf** pour une valeur constante écrite directement (comme `100`) qui tient dans le petit type. `byte b = 100;` est accepté, `byte b = 128;` est refusé. Avec une **variable**, il refuse toujours : `int n = 100; byte b = n;` → erreur.
- **Micro-exercices** : [prédire] compile / ne compile pas, pour 6 affectations.
- **À retenir** : du petit vers le grand, Java convertit seul · du grand vers le petit, il refuse (sauf une constante qui tient dans le petit type) · `int` ou `long` → `float` peut perdre des chiffres.
- **Rappel (test)** : une question `rappel: "m03-l01"` (quiz ou predire) sur « Les quatre opérations… et la surprise de la division ».
- **Cours** : p.30-31, p.33. ⚠ p.33 : « un int est un float qui lui-même est un double ». **En réalité**, la conversion est autorisée sans cast, mais `int` ou `long` → `float` peuvent perdre des chiffres (au-delà de 2^24 = 16 777 216), et `long` → `double` aussi. `int` → `double`, lui, est toujours exact.

#### m04-l02 · Du grand au petit : le cast (transtypage) (7 min)
- **Problème** : on veut quand même ranger 2.9 dans un `int`, ou obtenir une moyenne exacte avec des notes entières.
- **Notions et termes** : **transtypage / cast** `(type) expression` (on dit à Java : « je sais, j'assume »), **troncature** (on coupe la partie décimale ; ce n'est pas un arrondi).
- **Illustration** : un massicot qui coupe tout ce qui dépasse après la virgule.
- **Mini-exemples** :
  ```java
  int x = (int) 2.4;             // 2
  int y = (int) 2.9999999;       // 2 (p.33)
  int z = (int) -2.7;            // -2
  double moy = (double) 37 / 3;  // 12.333…
  ```
- **Erreur fréquente** : `int x = 2.4;` → `possible lossy conversion from double to int` (p.30).
- **Confusions** : `(double)(7/2)` = 3.0 (trop tard, la division entière est déjà faite) vs `(double)7/2` = 3.5. Troncature vs arrondi (l'arrondi `Math.round` vient en m15-l02).
- **Explique-moi simplement** : le cast, c'est signer une décharge : « je sais que je peux perdre quelque chose ».
- **Micro-exercices** : [prédire] 5 casts. [corriger] la moyenne du fil rouge.
- **À retenir** : `(type)` force la conversion · un cast vers `int` tronque · place le cast **avant** la division.
- **Rappel (test)** : une question `rappel: "m03-l03"` (quiz ou predire) sur « Qui calcule en premier ? La priorité ».
- **Cours** : p.30-33.

#### m04-l03 · Quand le cast déborde : (byte) 130 vaut −126 (6 min)
- **Statut** : leçon marquée « Pour l'examen » (label visible) : utile pour l'examen, pas indispensable pour programmer.
- **Problème** : `(byte) 130` ne donne ni 130 ni 127. D'où vient −126 ?
- **Notions et termes** : **débordement** : un `byte` n'a que 256 valeurs possibles ; au-delà de 127, on « fait le tour » et on repart de −128.
- **Illustration** : une roue de 256 crans, de −128 à 127. 130, c'est 3 crans après 127 : −128, −127, −126.
- **Mini-exemples** :
  ```java
  System.out.println((byte) 127);    // 127  (cas 1, p.32)
  System.out.println((byte) -125);   // -125 (cas 2)
  System.out.println((byte) 130);    // -126 (cas 3)
  System.out.println((byte) -129);   // 127  (cas 4)
  ```
- **Erreur fréquente** : `byte b = 130;` sans cast → refusé à la compilation. Avec cast, c'est accepté mais faux en silence.
- **Explique-moi simplement** : le compteur kilométrique d'une vieille voiture qui repasse à zéro.
- **Micro-exercices** : [prédire] `(byte) 128`, `(byte) 256`, `(byte) -130`.
- **À retenir** : un cast peut déformer la valeur sans aucun message · calcul : ajouter ou retirer 256 jusqu'à tomber dans [−128, 127].
- **Rappel (test)** : une question `rappel: "m02-l05"` (quiz ou predire) sur « Les entiers : byte, short, int, long ».
- **Cours** : p.31-32. ⚠ p.31 : coquille « int x=; byte y=(byte)x → -126 ». **En réalité**, il faut lire `int x = 130;` : 130 − 256 = −126.

#### m04-l04 · Un char est aussi un nombre (6 min)
- **Problème** : `char c = '2'; int x = c;` compile-t-il ? Et que vaut `x` ?
- **Notions et termes** : **code d'un caractère** (chaque `char` a un numéro Unicode ; pour les lettres sans accent, les chiffres et la ponctuation, codes 0 à 127, c'est le code ASCII vu en algo ; `'é'` vaut 233), `char → int` implicite, `int → char` par cast.
- **Illustration** : la table ASCII sous forme de casiers numérotés : `'A'` est au casier 65, `'2'` au casier 50.
- **Mini-exemples** :
  ```java
  char c = '2';  int x = c;          // 50
  System.out.println('A' + 1);       // 66
  System.out.println((char) ('A' + 1));  // B
  int chiffre = '7' - '0';           // 7
  ```
- **Erreur fréquente** : croire que `'2'` vaut 2 (en réalité 50). Autre surprise : `'a' + 'b'` affiche 195, pas `ab`.
- **Confusions** : `'2'` vs `2` ; `char + int` donne un nombre.
- **Micro-exercices** : [prédire] 4 sorties. [créer] afficher la lettre suivant `'K'`.
- **À retenir** : un `char` est un petit nombre · `char` → `int` est automatique · `(char)` pour revenir à la lettre.
- **Rappel (test)** : une question `rappel: "m02-l07"` (quiz ou predire) sur « Une lettre : le type char (et pourquoi ' ' n'est pas " ") ».
- **Cours** : p.30. ⚠ p.30 : « int et char non compatibles ». **En réalité**, c'est **faux** : `char` → `int` est un élargissement implicite ; `x` vaut 50, le code de `'2'`.

#### m04-l05 · Bilan / défi : la moyenne exacte (fil rouge) (9 min)
- **Problème** : des notes entières, une moyenne exacte, et l'affichage de quelques codes.
- **Notions** : m02, m03 et m04.
- **Défi guidé** (9 min). Code de départ fourni : la calculatrice m03-l06 corrigée, avec des notes `int` figées. Étapes : v1 moyenne exacte par `(double)` → v2 moyenne tronquée à une décimale : `(int) (moy * 10) / 10.0` → v3 initiale suivante avec `(char)`.
- **Défi libre (optionnel)** : quiz de 6 conversions (élargissement, cast, débordement, `char`).
- **Erreur fréquente** : le cast mal placé `(double)(somme / 3)`.
- **Micro-exercices** : [combiner] la fiche complète (défi guidé).
- **À retenir** : élargissement automatique, rétrécissement par cast · troncature · un `char` est un nombre.
- **Rappel (test)** : une question `rappel: "m03-l05"` (quiz ou predire) sur « i++ ou ++i : quand l'ordre compte ».
- **Cours** : p.30-33.

---

### m05-clavier — Dialoguer : lire au clavier avec Scanner
**À la fin de ce module, tu sauras…**
- demander un nombre ou un texte à l'utilisateur ;
- choisir entre `nextInt`, `nextDouble`, `next` et `nextLine` ;
- éviter le piège du retour à la ligne ;
- distinguer une erreur de compilation d'une erreur d'exécution.

**Prérequis** : m02-m04. **Fil rouge** : v1, la fiche saisie au clavier.

**Stratégie de vocabulaire** : `import` et `new` sont présentés comme une **recette** expliquée plus tard (`new` : m12-l02 ; `import` : m14-l04). On ne prononce **pas** le mot « méthode » avant m08. On dit « on demande au scanner de lire un entier » (le vrai mot, « appel de méthode », viendra en m08 et m09).

#### m05-l01 · Demander une valeur à l'utilisateur (7 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] `(int) 2.9` (m04-l02) · [prédire] `(double) 7 / 2` (m04-l02) · [quiz] le `;` manquant : quel message ? (m01-l05).
- **Problème** : la fiche est figée dans le code. Adama veut taper ses propres notes.
- **Notions et termes** : **saisie**, `import java.util.Scanner;` (« indique à Java dans quel rayon trouver l'outil Scanner » ; ligne placée tout en haut du fichier), `Scanner sc = new Scanner(System.in);` (« fabrique un lecteur branché sur le clavier » ; `System.in` = le clavier), `sc.nextInt()`, **invite** (message affiché avant la saisie).
- **Illustration** : un guichet. Le programme s'arrête et attend que tu tapes ta réponse, puis la touche Entrée.
- **Mini-exemples** :
  ```java
  import java.util.Scanner;              // en haut du fichier
  Scanner sc = new Scanner(System.in);   // une seule fois
  System.out.print("Ton âge : ");
  int age = sc.nextInt();
  ```
- **Erreur fréquente** : oubli de l'import → `cannot find symbol … symbol: class Scanner`.
- **Explique-moi simplement** : `Scanner` est un employé à qui tu demandes « lis-moi un entier ».
- **Micro-exercices** : [reproduire] lire un âge et l'afficher. [modifier] lire deux nombres et afficher leur somme.
- **À retenir** : `import` en haut · un seul Scanner · `print` pour l'invite, puis `nextInt()`.
- **Rappel (test)** : une question `rappel: "m04-l02"` (quiz ou predire) sur « Du grand au petit : le cast (transtypage) ».
- **Cours** : p.58.

#### m05-l02 · Lire un nombre à virgule… et les erreurs de saisie (7 min)
- **Problème** : lire une note comme 12,5 ; et que se passe-t-il si l'utilisateur tape « abc » ?
- **Notions et termes** : `nextDouble()`, `nextFloat()` ; **erreur d'exécution** (le programme a compilé, mais il s'arrête pendant qu'il tourne). Java l'appelle **exception** : simple mot pour l'instant, il sera défini et traité en m18. **Règle neutre pour la virgule** : selon la machine, Java attend `12,5` ou `12.5`. Le séparateur dépend de la langue **configurée** pour Java : virgule en français (`fr_SN`, `fr_FR`), point en anglais (cas des outils en ligne, et des Linux où la langue française n'est pas installée). Essaie la virgule ; si tu obtiens `InputMismatchException`, utilise le point. `println` affiche toujours un point (`12.5`).
- **Illustration** : deux barrières. Le compilateur contrôle **avant** le départ ; l'erreur d'exécution est une panne **en route**.
- **Mini-exemples** :
  ```java
  double note = sc.nextDouble();   // 12,5 ou 12.5 selon ta machine
  float f = sc.nextFloat();
  int n = sc.nextInt();            // taper abc → arrêt : InputMismatchException
  ```
  Les blocs `predire` qui utilisent `entree` suivent la convention du vérificateur (langue française : virgule) et le disent dans la consigne.
- **Erreur fréquente** : un séparateur qui ne correspond pas à la langue → `Exception in thread "main" java.util.InputMismatchException`.
- **Attention, piège** : en anglais, `1,500` est lu **1500** (la virgule y sépare les milliers), sans aucune erreur. Une saisie « à la française » peut donc être mal lue en silence. Si la valeur affichée est bizarre, vérifie le séparateur.
- **Dépliable « outil »** (pour aller plus loin, facultatif) : `sc.useLocale(java.util.Locale.US);` force le point. Ce n'est pas dans la leçon principale.
- **Confusions** : erreur de compilation (le `.class` n'est pas créé) vs erreur d'exécution (le programme démarre puis s'arrête). Point dans le code / virgule ou point au clavier, selon la machine.
- **Micro-exercices** : [prédire] « compilation ou exécution ? » pour 4 situations. [reproduire] lire 3 notes à virgule.
- **À retenir** : `nextDouble()` pour une note · virgule ou point selon la langue de ta machine : essaie, puis adapte · une mauvaise saisie arrête le programme (solution en m18).
- **Rappel (test)** : une question `rappel: "m02-l06"` (quiz ou predire) sur « Les nombres à virgule : double et float ».
- **Cours** : p.58.

#### m05-l03 · Lire du texte : next() ou nextLine() ? (5 min)
- **Problème** : on tape « Adama Seck » et le programme ne garde que « Adama ».
- **Notions et termes** : `next()` lit un mot (s'arrête au premier espace) ; `nextLine()` lit toute la ligne, jusqu'à la touche Entrée.
- **Illustration** : deux paires de ciseaux. L'une coupe au premier espace, l'autre coupe en fin de ligne.
- **Mini-exemples** (deux programmes **séparés**) :
  ```java
  // programme 1 — saisie : Adama Seck
  String mot = sc.next();          // "Adama"
  ```
  ```java
  // programme 2 — saisie : Adama Seck
  String ligne = sc.nextLine();    // "Adama Seck"
  ```
- **Erreur fréquente** : utiliser `next()` pour un nom composé.
- **Micro-exercices** : [prédire] avec la saisie `Adama Seck⏎`, `next()` **puis** `nextLine()` dans le même programme : que contient la 2e variable ? (réponse : `" Seck"`, avec un espace au début). [modifier] corriger la lecture d'une adresse.
- **À retenir** : `next()` = un mot · `nextLine()` = la ligne entière.
- **Rappel (test)** : une question `rappel: "m02-l04"` (quiz ou predire) sur « Bien nommer une variable ».
- **Cours** : p.58-59.

#### m05-l04 · Le piège du retour à la ligne (6 min)
- **Problème** : après `nextInt()`, le `nextLine()` suivant renvoie un texte vide, sans attendre la saisie !
- **Notions et termes** : la touche Entrée produit un caractère « retour à la ligne » ; `nextInt()` lit le nombre mais laisse ce retour à la ligne en attente ; correction : un `sc.nextLine();` « à vide » pour le consommer. `sc.close()` en fin de programme.
- **Illustration** : un tapis roulant qui transporte `1 2 ⏎ A d a m a ⏎`. `nextInt` prend `12` et laisse le premier `⏎` sur le tapis ; `nextLine` prend tout jusqu'au `⏎`, c'est-à-dire… rien.
- **Mini-exemples** :
  ```java
  int age = sc.nextInt();
  sc.nextLine();                  // consomme le ⏎ restant
  String nom = sc.nextLine();     // maintenant ça marche
  sc.close();
  ```
- **Erreur fréquente** : sans la ligne de « nettoyage », `nom` vaut `""` (vérifié).
- **Micro-exercices** : [corriger] un programme âge puis nom. [prédire] le contenu de `nom`.
- **À retenir** : après `nextInt` ou `nextDouble`, et avant un `nextLine`, ajouter un `sc.nextLine();` · fermer avec `sc.close()`.
- **Rappel (test)** : une question `rappel: "m03-l02"` (quiz ou predire) sur « Le reste : l'opérateur % ».
- **Cours** : p.59.

#### m05-l05 · Bilan / défi : la fiche saisie (fil rouge v1) (10 min)
- **Problème** : remplacer toutes les valeurs écrites dans le code par des saisies.
- **Notions** : m02 à m05.
- **Défi guidé** (10 min). Code de départ fourni : la fiche m04-l05 corrigée. Étapes : v1 nom (`nextLine`) → v2 + âge (`nextInt` + nettoyage) → v3 + 3 notes (`nextDouble`) et moyenne. **Valeurs de test figées** : pendant la mise au point, garder les lignes `String nom = "Adama"; // = sc.nextLine();`, et ne brancher les saisies qu'à la fin (ou mettre les saisies dans STDIN, m00-l01).
- **Défi libre (optionnel)** : un convertisseur de minutes en h/min, saisi au clavier.
- **Erreur fréquente** : l'ordre nom / âge inversé provoque le piège du ⏎. Laisser l'étudiant le provoquer, puis le réparer.
- **Micro-exercices** : [combiner] la fiche complète (défi guidé).
- **À retenir** : invite + lecture · le bon `next…` pour chaque type · le piège du ⏎.
- **Rappel (test)** : une question `rappel: "m04-l01"` (quiz ou predire) sur « Du petit au grand : la conversion automatique ».
- **Cours** : p.58-59.

---

### m06-conditions — Faire des choix : les conditions
**À la fin de ce module, tu sauras…**
- écrire une condition avec `< > <= >= == !=` et `&&`, `||`, `!` ;
- exécuter un bloc ou un autre avec `if` / `else` / `else if` ;
- choisir parmi plusieurs cas avec `switch` ;
- éviter les pièges `=` / `==` et le `;` après un `if`.

**Prérequis** : m05. **Fil rouge** : v2, mention et validation de la note.

#### m06-l01 · Poser une question : comparaisons et booléens (7 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [quiz] `next()` ou `nextLine()` pour « Adama Seck » ? (m05-l03) · [prédire] `10 % 3` (m03-l02) · [quiz] `int x = 2.5;` compile-t-il ? (m04-l02).
- **Problème** : pour afficher « Admis » seulement si la moyenne est ≥ 10, il faut d'abord savoir poser la question à Java.
- **Notions et termes** : **`boolean`** (type primitif à deux valeurs, `true` et `false` : le VRAI / FAUX de l'algo ; c'est le 8e type primitif, annoncé en m02-l09) ; **opérateurs de comparaison** `< > <= >= == !=` ; **condition** (expression qui vaut `true` ou `false`) ; `==` compare, `=` range.
- **Illustration** : une balance qui affiche seulement VRAI ou FAUX.
- **Mini-exemples** :
  ```java
  boolean majeur = true;
  System.out.println(5 == 5);              // true
  System.out.println(3 != 3);              // false
  boolean admis = moyenne >= 10;
  boolean pair = n % 2 == 0;
  ```
- **Erreur fréquente** : `boolean b = (x = 5);` → `incompatible types: int cannot be converted to boolean`.
- **Confusions** : `=` vs `==`. Passerelle algo : `=` (test) devient `==`, `≠` devient `!=`, `≥` devient `>=`.
- **Micro-exercices** : [prédire] 6 comparaisons. [corriger] `=` / `==`.
- **À retenir** : une comparaison donne `true` ou `false` · `==` pour comparer · `!=` pour « différent ».
- **Rappel (test)** : une question `rappel: "m05-l03"` (quiz ou predire) sur « Lire du texte : next() ou nextLine() ? ».
- **Cours** : p.35.

#### m06-l02 · if … else : deux chemins (7 min)
- **Problème** : afficher « Admis » OU « Ajourné » selon la moyenne.
- **Notions et termes** : `if (condition) { … }`, `else { … }`, bloc conditionnel, indentation. (Le ternaire est dans un dépliable du bilan m06-l07.)
- **Illustration** : un aiguillage de train. VRAI → voie de gauche, FAUX → voie de droite ; les deux voies se rejoignent après.
- **Mini-exemples** :
  ```java
  if (moyenne >= 10) { System.out.println("Admis"); }
  if (moyenne >= 10) { System.out.println("Admis"); } else { System.out.println("Ajourné"); }
  ```
- **Erreur fréquente** : `if (moyenne >= 10); { System.out.println("Admis"); }` compile, et affiche **toujours** « Admis » : le `;` termine le `if`. Autre erreur : `if (x = 5)` → `int cannot be converted to boolean`.
- **Confusions** : un `if` sans accolades ne contrôle que la première instruction : toujours mettre des `{ }`.
- **Explique-moi simplement** : « S'il pleut, je prends le parapluie ; sinon, la casquette. »
- **Micro-exercices** : [reproduire] pair / impair. [prédire] le code piégé avec `;`.
- **À retenir** : `if (condition) { }` · `else` = sinon · jamais de `;` juste après `if (…)`.
- **Rappel (test)** : une question `rappel: "m03-l02"` (quiz ou predire) sur « Le reste : l'opérateur % ».
- **Cours** : p.46.

#### m06-l03 · else if : plus de deux chemins (6 min)
- **Problème** : une mention a 5 valeurs possibles, pas 2.
- **Notions et termes** : cascade `if … else if … else` ; le premier test vrai l'emporte, les suivants sont ignorés.
- **Illustration** : des tamis superposés : la note s'arrête au premier tamis qui la retient.
- **Mini-exemples** :
  ```java
  int b = -4;
  if (b > 0) { System.out.println("strictement positive"); }
  else if (b <= -5) { System.out.println("entre -∞ et -5"); }
  else { System.out.println("entre -5 (ouvert) et 0 (fermé)"); }   // p.46
  ```
  Mention : `>= 16` Très bien, `>= 14` Bien, `>= 12` Assez bien, `>= 10` Passable, sinon Ajourné.
- **Erreur fréquente** : tester `>= 10` en premier : 18 donne « Passable » (aucune erreur de compilation, mais un résultat faux).
- **Micro-exercices** : [prédire] la branche suivie pour b = −4, 0, −7. [corriger] l'ordre des mentions.
- **À retenir** : le premier test vrai gagne · ordonner du plus restrictif au plus large · le `else` final attrape tout le reste.
- **Rappel (test)** : une question `rappel: "m04-l02"` (quiz ou predire) sur « Du grand au petit : le cast (transtypage) ».
- **Cours** : p.46.

#### m06-l04 · Combiner : && (ET), || (OU), ! (NON) (6 min)
- **Problème** : une note est valide si elle est ≥ 0 **et** ≤ 20. Comment l'écrire ?
- **Notions et termes** : **opérateurs logiques** `&&` (ET), `||` (OU), `!` (NON) ; table de vérité (en suite de quiz courts). Le court-circuit, `& | ^` et les priorités sont dans la leçon suivante, marquée « Pour l'examen ».
- **Illustration** : deux interrupteurs. En série = ET (les deux doivent être fermés), en parallèle = OU.
- **Mini-exemples** :
  ```java
  boolean valide = note >= 0 && note <= 20;
  boolean weekEnd = jour == 6 || jour == 7;
  boolean ajourne = !admis;
  ```
- **Erreur fréquente** : `if (0 <= note <= 20)` → `bad operand types for binary operator '<='` (`0 <= note` donne un `boolean`, qu'on ne peut pas comparer à 20).
- **Confusions** : `&&` vs `||` (« entre 0 et 20 » = ET ; « hors de [0, 20] » = `note < 0 || note > 20`).
- **Micro-exercices** : [prédire] table de vérité de `&&` en 4 quiz courts. [créer] la condition « hors de [0, 20] ».
- **À retenir** : `&&` = les deux · `||` = au moins un · un intervalle s'écrit avec deux comparaisons.
- **Rappel (test)** : une question `rappel: "m02-l07"` (quiz ou predire) sur « Une lettre : le type char (et pourquoi ' ' n'est pas " ") ».
- **Cours** : p.35.

#### m06-l05 · Pour l'examen : court-circuit, & | ^ et priorités (5 min)
- **Statut** : leçon marquée « Pour l'examen » (label visible).
- **Problème** : le cours cite aussi `&`, `|` et `^`, et une table de priorités. Que faut-il en savoir ?
- **Notions et termes** : **court-circuit** (`&&` n'évalue pas la partie droite si la gauche est fausse ; `||` ne l'évalue pas si la gauche est vraie) ; `&`, `|`, `^` (le cours les classe « bit à bit » : sur des booléens, `&` et `|` évaluent **toujours** les deux côtés, et `^` est le OU exclusif ; sur des entiers, ils travaillent bit par bit : `5 & 3` vaut 1).
- **Illustration** : un vigile qui arrête la file dès qu'une condition échoue (court-circuit).
- **Mini-exemples** :
  ```java
  boolean sur = x != 0 && 10 / x > 1;     // pas de division par 0
  System.out.println(true ^ true);        // false
  System.out.println(5 & 3);              // 1
  System.out.println(!true || true);      // true
  ```
- **Erreur fréquente** : `x != 0 & 10 / x > 1` avec `x = 0` → `ArithmeticException: / by zero` (les deux côtés sont évalués).
- **Micro-exercices** : [prédire] 3 expressions. [comprendre] quiz : pourquoi `&&` protège-t-il la division ?
- **À retenir** : `&&` et `||` s'arrêtent dès que le résultat est connu · `&`, `|`, `^` : pour l'examen · `!` passe avant `&&`, qui passe avant `||`.
- **Rappel (test)** : une question `rappel: "m03-l03"` (quiz ou predire) sur « Qui calcule en premier ? La priorité ».
- **Cours** : p.35-36. ⚠ p.36 : la priorité place `!` avec `&&` et `||`, et regroupe `^ & |`. **En réalité**, `!` est unaire et passe très tôt (avec `++` et `--`) ; `&` passe avant `^`, qui passe avant `|`, et `&&` passe avant `||`. Exemple : `!true || true` vaut `true`.

#### m06-l06 · switch : choisir parmi des cas (8 min)
- **Problème** : un menu 1/2/3 ou le sexe `'M'`/`'F'` donnent une longue cascade de `else if` sur des égalités.
- **Notions et termes** : `switch (valeur)`, `case`, `break`, `default` ; le `switch` ne teste que l'**égalité**, sur `int`, `char`, `String` (et `byte`, `short`, `enum` plus tard ; jamais `long`, `double` ni `boolean`) ; oublier `break` fait continuer dans le cas suivant. **Recette pour lire un caractère** : `char op = sc.next().charAt(0);` (`next()` lit un mot ; `charAt(0)` en prend le 1er caractère, expliqué en m09-l02 ; `next()` saute aussi le ⏎ laissé par un `nextInt()`, ce qui évite le piège de m05-l04). Le switch « flèche » est annoncé pour m17-l02.
- **Illustration** : un ascenseur. On descend à l'étage demandé ; sans `break`, on continue à descendre.
- **Mini-exemples** :
  ```java
  char sexe = 'F';
  switch (sexe) {
      case 'M': System.out.println("Masculin"); break;
      case 'F': System.out.println("Féminin"); break;
      default:  System.out.println("Erreur");          // p.47
  }
  ```
  Plus un menu `switch (choix)` avec `case 1:` et `case 2:`.
- **Erreur fréquente** : sans `break`, avec `sexe = 'M'`, on obtient « Masculin Féminin Erreur » : ça compile, mais c'est faux. Écrire `case note >= 16:` est impossible : il faut un `if`.
- **Micro-exercices** : [prédire] la sortie sans `break`. [modifier] remplacer une cascade de `if` par un `switch`.
- **À retenir** : `switch` = égalités seulement · `break` à chaque cas · `default` = tous les autres cas.
- **Rappel (test)** : une question `rappel: "m05-l04"` (quiz ou predire) sur « Le piège du retour à la ligne ».
- **Cours** : p.47.

#### m06-l07 · Bilan / défi : mention et menu (fil rouge v2) (10 min)
- **Problème** : saisir une note, la valider, afficher la mention, proposer un menu.
- **Notions** : m05 et m06.
- **Défi guidé** (10 min). Code de départ fourni : la fiche saisie m05-l05 corrigée, avec des valeurs figées. Étapes : v1 validation `&&` → v2 mention `else if` → v3 menu `switch` (1 = mention, 2 = admis ?).
- **Défi libre (optionnel)** : une calculatrice à 4 opérations avec `switch` sur un `char` lu par `sc.next().charAt(0)` (recette de m06-l06).
- **Dépliable « examen »** : l'**opérateur ternaire** `condition ? valeurA : valeurB` (p.35), un `if/else` qui sert juste à choisir une valeur : `String r = (moyenne >= 10) ? "Admis" : "Ajourné";`.
- **Erreur fréquente** : un `;` après `if`, un `break` oublié, `=` au lieu de `==` : un code piégé à réparer.
- **Micro-exercices** : [combiner] le programme complet (défi guidé). [corriger] le code piégé.
- **À retenir** : `if` pour les intervalles, `switch` pour les égalités · toujours des `{ }`.
- **Rappel (test)** : une question `rappel: "m05-l02"` (quiz ou predire) sur « Lire un nombre à virgule… et les erreurs de saisie ».
- **Cours** : p.35-36, p.46-47.

---

### m07-boucles — Répéter : les boucles
**À la fin de ce module, tu sauras…**
- répéter avec `while`, `for` et `do…while`, et choisir la bonne boucle ;
- accumuler une somme, compter, chercher un maximum ;
- imbriquer deux boucles ;
- dire où une variable existe (sa portée).

**Prérequis** : m06. **Fil rouge** : v3, saisie de N notes validées.

#### m07-l01 · while : répéter tant que (7 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] `5 == 5` et `3 != 3` (m06-l01) · [quiz] mention de 15 avec une cascade donnée (m06-l03) · [prédire] `switch` sans `break` (m06-l06).
- **Problème** : afficher « Hello World ! » 5 fois sans copier-coller 5 lignes.
- **Notions et termes** : **boucle**, **itération** (un tour de boucle), **condition de continuation**, compteur, **boucle infinie**.
- **Illustration** : une flèche qui revient au panneau « condition ? » ; la sortie est indiquée par un panneau STOP.
- **Mini-exemples** :
  ```java
  int i = 0;
  while (i < 5) { System.out.println("Hello World !"); i++; }   // p.21
  int a = 10;
  while (a >= 3) { a = a - 3; }   // a vaut 1 : le reste de 10 par 3 (p.43)
  ```
- **Erreur fréquente** : oubli de `i++` → boucle infinie (arrêter avec Ctrl+C). `while (i < 5);` → boucle infinie silencieuse.
- **Micro-exercices** : [prédire] le nombre de tours. [modifier] un compte à rebours de 10 à 1.
- **À retenir** : `while (condition) { }` répète tant que c'est vrai · quelque chose doit changer dans la boucle · pas de `;` après `while (…)`.
- **Rappel (test)** : une question `rappel: "m06-l01"` (quiz ou predire) sur « Poser une question : comparaisons et booléens ».
- **Cours** : p.21, p.41, p.43.

#### m07-l02 · for : la boucle à compteur (7 min)
- **Problème** : avec `while`, le compteur est éparpillé sur 3 lignes. Quand on connaît le nombre de tours, on peut faire plus compact.
- **Notions et termes** : `for (initialisation; condition; mise à jour)`. Passerelle algo : POUR i DE 1 À 4.
- **Illustration** : un tableau de bord à trois cadrans (départ, test, pas).
- **Mini-exemples** :
  ```java
  int fact = 1;
  for (int i = 1; i <= 4; i++) { fact = fact * i; }   // 24 (p.42)
  for (int i = 10; i >= 1; i--) { System.out.print(i + " "); }
  for (int i = 0; i <= 10; i += 2) { System.out.println(i); }
  ```
- **Erreur fréquente** : `for (int i = 0, i < 5, i++)` → `';' expected` (des virgules au lieu de points-virgules).
- **Attention, piège** (rappel du débordement, m02-l05) : avec `int fact`, 13! donne 1932053504, un résultat faux, sans aucun message. Pour de grandes factorielles, utiliser `long`.
- **Confusions** : `while` vs `for` (nombre de tours connu → `for`) ; `i < 5` vs `i <= 5` (un tour de trop ou de moins).
- **Micro-exercices** : [prédire] combien de tours font `i = 0; i < 5` et `i = 1; i <= 5` ? [modifier] réécrire un `while` en `for`.
- **À retenir** : `for` = départ ; condition ; pas · idéal quand on connaît le nombre de tours · surveille `<` / `<=`.
- **Rappel (test)** : une question `rappel: "m06-l02"` (quiz ou predire) sur « if … else : deux chemins ».
- **Cours** : p.42.

#### m07-l03 · do … while : au moins une fois (7 min)
- **Problème** : redemander une note tant qu'elle est invalide. Il faut forcément la demander une première fois.
- **Notions et termes** : `do { … } while (condition);` (on teste après le tour, donc au moins 1 tour) ; lire un caractère avec la recette de m06-l06 : `sc.next().charAt(0)`.
- **Illustration** : goûter la sauce, puis décider s'il faut recommencer.
- **Mini-exemples** (trois programmes **séparés**) :
  ```java
  int s = 0, i = 1;
  do { s += i; i++; } while (i <= 5);       // 15 (p.45)
  ```
  ```java
  do { note = sc.nextDouble(); } while (note < 0 || note > 20);
  ```
  ```java
  char reponse = sc.next().charAt(0);       // p.44 : 'O' ou 'N'
  ```
- **Erreur fréquente** : oubli du `;` final → `';' expected`. Et si l'on utilise `sc.nextLine().charAt(0)` juste après un `nextDouble()` (comme le fait la p.44, avec `nextLine`) : le ⏎ restant donne une ligne vide → `StringIndexOutOfBoundsException: Index 0 out of bounds for length 0`. D'où la recette `sc.next().charAt(0)`.
- **Confusions** : RÉPÉTER … JUSQU'À (algo) donne une condition d'**arrêt** ; `do … while` attend une condition de **continuation** : il faut l'inverser.
- **Micro-exercices** : [modifier] le menu O/N de la p.44 (« Bonjour X, comment vas-tu ? »). [corriger] une condition non inversée.
- **À retenir** : `do…while` = au moins un tour · `;` à la fin · la condition dit quand **continuer**.
- **Rappel (test)** : une question `rappel: "m05-l04"` (quiz ou predire) sur « Le piège du retour à la ligne ».
- **Cours** : p.44-45 ; p.58 (pas de lecture directe d'un `char`). Le cours écrit `sc.nextLine().charAt(0)` : c'est correct tant qu'aucun `nextInt` / `nextDouble` ne précède. On enseigne `next()`, qui marche dans tous les cas.

#### m07-l04 · Accumuler : somme et compteur (6 min)
- **Problème** : calculer la moyenne de N notes saisies une par une.
- **Notions et termes** : **accumulateur** (variable initialisée avant la boucle et mise à jour à chaque tour), compteur ; **tableau de trace** (suivre les variables tour par tour, à la main ; bloc `trace`).
- **Illustration** : une tirelire qui grossit à chaque tour.
- **Mini-exemples** :
  ```java
  int somme = 0;
  for (int i = 1; i <= 100; i++) { somme += i; }        // 5050
  int nbPairs = 0;
  for (int i = 1; i <= 10; i++) { if (i % 2 == 0) { nbPairs++; } }
  ```
- **Erreur fréquente** : déclarer `int somme = 0;` **dans** la boucle : remise à zéro à chaque tour (et invisible après la boucle, cf. m07-l07).
- **Attention, piège** (rappel de m03-l04) : `int somme = 0; … somme += note;` avec une `note` en `double` compile, mais tronque chaque note. Un accumulateur de notes est un `double`.
- **Micro-exercices** : [prédire] compléter un tableau de trace. [modifier] compter les notes ≥ 10.
- **À retenir** : initialiser l'accumulateur avant la boucle · le mettre à jour dedans · le bon type (`double` pour des notes).
- **Rappel (test)** : une question `rappel: "m03-l04"` (quiz ou predire) sur « Les raccourcis : +=, -=, ++, -- ».
- **Cours** : p.42, p.45.

#### m07-l05 · Chercher le plus grand (et le plus petit) (6 min)
- **Problème** : parmi les notes saisies, quelle est la meilleure ? La plus faible ?
- **Notions et termes** : recherche du **maximum** (garder la plus grande valeur vue jusqu'ici) et du minimum ; initialiser avec la **première** valeur, pas avec 0.
- **Illustration** : un podium : chaque nouvelle note défie la championne actuelle.
- **Mini-exemples** :
  ```java
  double max = sc.nextDouble();               // 1re note = championne
  for (int i = 2; i <= n; i++) {
      double note = sc.nextDouble();
      if (note > max) { max = note; }
  }
  ```
  Même schéma pour le minimum, avec `<`.
- **Erreur fréquente** : `int max = 0;` avec des valeurs toutes négatives (−3, −1, −7) → le résultat affiché est 0, une valeur qui n'est même pas dans la liste (vérifié). Aucune erreur de compilation.
- **Micro-exercices** : [prédire] une trace sur 4 valeurs. [modifier] transformer le max en min.
- **À retenir** : la championne de départ = la 1re valeur · `if (x > max) max = x;` · même schéma pour le min.
- **Rappel (test)** : une question `rappel: "m06-l03"` (quiz ou predire) sur « else if : plus de deux chemins ».
- **Cours** : hors slides.

#### m07-l06 · Une boucle dans une boucle (7 min)
- **Problème** : afficher une table de multiplication complète, ou un rectangle d'étoiles.
- **Notions et termes** : **boucles imbriquées** (la boucle intérieure fait tous ses tours à chaque tour de la boucle extérieure).
- **Illustration** : une horloge. L'aiguille des minutes fait 60 tours pendant que celle des heures avance d'un cran.
- **Mini-exemples** :
  ```java
  for (int l = 1; l <= 3; l++) {
      for (int c = 1; c <= 5; c++) { System.out.print("*"); }
      System.out.println();
  }
  ```
  Puis un triangle (`c <= l`) et une table de multiplication 1 à 5.
- **Erreur fréquente** : réutiliser `i` pour les deux boucles → `variable i is already defined in method main(String[])`.
- **Micro-exercices** : [prédire] combien d'étoiles ? [modifier] le rectangle en triangle.
- **À retenir** : boucle intérieure = un tour complet par tour extérieur · deux noms de compteurs différents.
- **Rappel (test)** : une question `rappel: "m06-l04"` (quiz ou predire) sur « Combiner : && (ET), || (OU), ! (NON) ».
- **Cours** : hors slides (prépare les matrices de m10).

#### m07-l07 · Où vit une variable ? La portée (7 min)
- **Problème** : après la boucle, `System.out.println(j);` refuse de compiler. Pourtant, `j` a bien été déclaré !
- **Notions et termes** : **portée** (« ensemble des instructions où la variable existe », p.27) ; elle finit à la `}` du bloc où la variable est déclarée ; variable de bloc, variable de `main`. Le compteur d'un `for` n'existe que dans la boucle.
- **Illustration** : les pièces d'une maison. Ce qui est rangé dans la chambre n'existe pas au salon ; depuis la chambre, on voit le contenu du salon (bloc englobant).
- **Mini-exemples** :
  ```java
  int i = 0;                        // portée : tout main
  while (i < 3) { int j = 5; i++; } // j : seulement dans la boucle
  // System.out.println(j);         // erreur
  for (int k = 0; k < 3; k++) { }   // k disparaît après la }
  ```
- **Erreur fréquente** : `System.out.println(j);` hors du bloc → `cannot find symbol … symbol: variable j` (p.28).
- **Confusions** : déclarer **avant** la boucle une variable dont on a besoin **après**. Un bloc intérieur ne peut pas redéclarer une variable qui existe déjà autour de lui : `int x = 1; { int x = 2; }` → `variable x is already defined in method main(String[])`.
- **Micro-exercices** : [corriger] le code p.28. [prédire] quelles lignes compilent.
- **À retenir** : une variable vit jusqu'à la `}` de son bloc · un bloc intérieur voit les variables de l'extérieur, pas l'inverse.
- **Rappel (test)** : une question `rappel: "m06-l06"` (quiz ou predire) sur « switch : choisir parmi des cas ».
- **Cours** : p.27-28. ⚠ p.28 : « int x=20 // portée classe, utilisable dans toutes les fonctions de la classe ». Ici, on ne traite que les portées de bloc et de fonction. Encadré : « Le cours parle aussi d'une portée "classe" : on la verra en m15-l03, car elle cache un piège avec `main`. »

#### m07-l08 · Bilan / défi : N notes validées (fil rouge v3) (10 min)
- **Problème** : saisir un nombre N de notes, chacune validée, puis afficher la moyenne, le maximum et la mention.
- **Notions** : m05, m06 et m07.
- **Défi guidé** (10 min). Code de départ fourni : la v2 corrigée (m06-l07), avec des valeurs figées. Étapes : v1 `for` sur N saisies → v2 `do…while` de validation à l'intérieur → v3 max + mention + « Recommencer (O/N) ? » lu avec `sc.next().charAt(0)`.
- **Défi libre (optionnel)** : un histogramme d'étoiles (une ligne par note).
- **Erreur fréquente** : accumulateur dans la boucle ou de type `int` ; `<=` en trop ; `nextLine().charAt(0)` après un `nextDouble()` → `StringIndexOutOfBoundsException: Index 0 out of bounds for length 0`.
- **Micro-exercices** : [combiner] le programme (défi guidé).
- **À retenir** : choisir la boucle selon le besoin · accumulateur hors de la boucle · portée.
- **Rappel (test)** : une question `rappel: "m04-l02"` (quiz ou predire) sur « Du grand au petit : le cast (transtypage) ».
- **Cours** : p.41-45.

---

### m08-methodes — Découper : les méthodes
**À la fin de ce module, tu sauras…**
- écrire et appeler une méthode, avec ou sans paramètres ;
- renvoyer un résultat avec `return`, en respectant le type de retour ;
- expliquer pourquoi une méthode travaille sur des copies (variables locales) ;
- surcharger une méthode.

**Prérequis** : m07. **Fil rouge** : v4, `lireNote`, `calculerMoyenne`, `mention`.

**Vocabulaire** : le cours dit « fonction » (p.49) ; on enseigne « **méthode** » (le mot de Java) et on signale l'équivalence. On écrit `public static`, comme le cours, en disant : « `public` et `static` seront expliqués en m14 et m15 ; le cours lui-même dit "on y reviendra". »

#### m08-l01 · Donner un nom à un bout de code : ta première méthode (8 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] nombre de tours de `for (int i = 1; i <= 5; i++)` (m07-l02) · [quiz] où meurt `j` ? (m07-l07) · [prédire] somme avec accumulateur (m07-l04).
- **Problème** : le fil rouge répète trois fois le même bloc d'affichage d'en-tête.
- **Notions et termes** : **méthode** (un bloc de code nommé, qu'on peut exécuter à la demande), **définition** vs **appel**, `void` (la méthode ne rend aucun résultat ; mot vu ici seulement en passant, détaillé en l03), le chemin d'exécution (on saute dans la méthode, puis on revient). **`main` est une méthode** : la méthode principale. On place les méthodes dans la classe, **à côté** de `main`, pas dedans. C'est le **premier code écrit hors de `main`** : montrer le fichier complet (cadre + méthode + appel), et non un fragment. Bloc `ordre` : remettre dans l'ordre les lignes d'un fichier avec une méthode.
- **Illustration** : une machine avec un bouton. Appeler la méthode, c'est appuyer sur le bouton.
- **Mini-exemples** :
  ```java
  public static void afficherLigne() {
      System.out.println("----------");
  }
  // dans main :
  afficherLigne();  afficherLigne();
  ```
- **Erreur fréquente** : définir la méthode **dans** `main` → `illegal start of expression`. Oublier les parenthèses à l'appel (`afficherLigne;`) → `not a statement`.
- **Confusions** : définir (écrire la recette) ≠ appeler (cuisiner).
- **Micro-exercices** : [prédire] l'ordre des affichages avec 2 appels. [reproduire] une méthode `afficherEntete()`.
- **À retenir** : une méthode = un bloc nommé · on la définit une fois, on l'appelle autant de fois qu'on veut · `main` est la méthode principale.
- **Rappel (test)** : une question `rappel: "m06-l02"` (quiz ou predire) sur « if … else : deux chemins ».
- **Cours** : p.49.

#### m08-l02 · Donner des entrées : paramètres et arguments (7 min)
- **Problème** : `afficherLigne()` dessine toujours 10 tirets. On voudrait choisir la longueur.
- **Notions et termes** : **paramètre** (variable déclarée dans la définition, initialisée au moment de l'appel, p.50), **argument** (valeur donnée à l'appel), correspondance du nombre, de l'ordre et des types.
- **Illustration** : la fente d'entrée de la machine, avec une forme qui correspond au type attendu.
- **Mini-exemples** :
  ```java
  public static void saluer(String prenom) { System.out.println("Bonjour " + prenom); }
  saluer("Awa");
  public static void afficherLigne(int n) { for (int i = 0; i < n; i++) { System.out.print("-"); } System.out.println(); }
  public static void afficherSomme(int a, int b) { System.out.println(a + b); }
  ```
- **Erreur fréquente** : `saluer();` → `method saluer in class … cannot be applied to given types` (en substance : il manque l'argument String). `saluer(5);` → `incompatible types: int cannot be converted to String`.
- **Confusions** : paramètre (dans la définition) vs argument (dans l'appel).
- **Micro-exercices** : [prédire] 3 appels. [modifier] ajouter un paramètre `char motif`.
- **À retenir** : les paramètres sont des variables remplies par l'appel · l'ordre et les types doivent correspondre.
- **Rappel (test)** : une question `rappel: "m07-l02"` (quiz ou predire) sur « for : la boucle à compteur ».
- **Cours** : p.49-50.

#### m08-l03 · Rendre un résultat : return (6 min)
- **Problème** : `afficherSomme` affiche la somme, mais on ne peut pas la réutiliser pour calculer autre chose.
- **Notions et termes** : **type de retour** (`int`, `double`… ou `void` = rien), `return expression;` (renvoie la valeur et termine la méthode), appel utilisé dans une expression. `return (r);` = `return r;` (style du cours). `return;` seul dans une méthode `void` (p.52).
- **Illustration** : la machine a maintenant une goulotte de sortie ; `void` = pas de goulotte.
- **Mini-exemples** :
  ```java
  public static int plus(int a, int b) { int r = 0; r = a + b; return r; }   // p.51
  int y = plus(3, 7);                     // 10
  public static double moyenne(double a, double b) { return (a + b) / 2; }
  public static void afficherPositif(int n) { if (n < 0) { return; } System.out.println(n); }
  ```
- **Erreur fréquente** : `int f(int a) { if (a > 0) return 1; }` → `missing return statement` (si `a <= 0`, la méthode ne rendrait rien). Les autres pièges sont dans la leçon suivante.
- **Confusions** : **rendre** (`return`) ≠ **afficher** (`println`). Une méthode qui affiche ne renvoie rien.
- **Micro-exercices** : [prédire] `plus(plus(1, 2), 3)`. [créer] `carre(int n)`.
- **À retenir** : le type de retour annonce ce qui sort · `return` renvoie la valeur **et** sort · `void` = rien à rendre.
- **Rappel (test)** : une question `rappel: "m07-l04"` (quiz ou predire) sur « Accumuler : somme et compteur ».
- **Cours** : p.50-52. Le cas p.52 `if (mess == null) return;` utilise `null`, défini en m12-l04 : ici, adapter l'exemple avec `n < 0`.

#### m08-l04 · Les pièges du return (7 min)
- **Problème** : ta méthode compile mal, ou rend un résultat bizarre. Les erreurs autour de `return` sont les plus fréquentes du chapitre.
- **Notions et termes** : cohérence entre le type de retour et la valeur renvoyée ; une méthode `void` ne rend rien ; on ne peut pas ranger le « résultat » d'une méthode `void`.
- **Illustration** : la goulotte de sortie de la machine : elle n'accepte qu'une seule forme d'objet.
- **Mini-exemples** :
  ```java
  public static int mul(int a, int b) { int r; r = a * b; return r; }        // solution 3
  public static float mul2(int a, int b) { float r; r = a * b; return r; }   // solution 1
  public static float div(int a, int b) { if (b == 0) return (-1); return ((float) a / b); }
  ```
- **Erreur fréquente** :
  - `int x = afficherLigne();` → `void cannot be converted to int`.
  - Un `return 3;` dans une méthode `void` → `unexpected return value`.
  - Exemple p.53 : `int mul(int a, int b) { float r; r = a * b; return r; }` → `possible lossy conversion from float to int`. Trois solutions : retour en `float`, cast `(int) r`, ou `r` déclaré en `int`.
- **Attention, piège** (exemple p.53, sans commentaire sur la slide) : `public static float div(int a, int b) { if (b == 0) return (-1); return (a / b); }`. Ici, `a / b` est une division **entière** : `div(7, 2)` renvoie 3.0, et non 3.5. Correction : `return (float) a / b;`. Le cours ne dit rien de faux : il ne s'attarde pas sur ce point, et on le signale.
- **Confusions** : **rendre** (`return`) ≠ **afficher** (`println`).
- **Micro-exercices** : [corriger] le `mul` de la p.53 (3 versions). [prédire] `div(7, 2)` avant et après correction.
- **À retenir** : le type renvoyé doit correspondre au type annoncé · `void` = rien à rendre, rien à récupérer · attention à la division entière dans un `return`.
- **Rappel (test)** : une question `rappel: "m04-l01"` (quiz ou predire) sur « Du petit au grand : la conversion automatique ».
- **Cours** : p.53.

#### m08-l05 · Chaque méthode a ses propres boîtes : variables locales (6 min)
- **Problème** : `doubler(x)` ne double pas `x` ! Pourquoi ?
- **Notions et termes** : **variable locale** (déclarée dans une méthode, y compris ses paramètres ; elle disparaît à la fin de l'appel), **passage par valeur** (la méthode reçoit une **copie** de la valeur de l'argument), deux méthodes peuvent avoir chacune une variable `n` : ce sont deux boîtes différentes.
- **Illustration** : la photocopie. La méthode gribouille sur la photocopie, l'original reste intact.
- **Mini-exemples** :
  ```java
  public static void doubler(int n) { n = n * 2; }
  int x = 5;  doubler(x);  System.out.println(x);   // 5
  public static int doubler2(int n) { return n * 2; }
  x = doubler2(x);                                   // 10
  ```
- **Erreur fréquente** : utiliser dans `main` une variable déclarée dans une autre méthode → `cannot find symbol`.
- **Micro-exercices** : [prédire] la valeur après l'appel. [corriger] une méthode `incrementer` pour qu'elle serve vraiment.
- **À retenir** : la méthode reçoit une copie · ses variables meurent à la fin de l'appel · pour rendre un résultat : `return`.
- **Rappel (test)** : une question `rappel: "m07-l07"` (quiz ou predire) sur « Où vit une variable ? La portée ».
- **Cours** : p.50 (« les arguments fonctionnent comme des variables initialisées à l'appel »), p.27 (portée « fonction »). Annonce : avec les tableaux (m10-l04), la copie est celle d'une **flèche**.

#### m08-l06 · Même nom, entrées différentes : la surcharge (7 min)
- **Problème** : on veut `plus(2, 3)` **et** `plus(2, 3, 4)` sans inventer `plus3`.
- **Notions et termes** : **signature** (nom + liste ordonnée des types des paramètres ; le type de retour n'en fait **pas** partie), **surcharge** (plusieurs méthodes de même nom, dans la même classe, avec des signatures différentes) ; le choix de la méthode appelée se fait d'après les arguments.
- **Illustration** : un même guichet « Paiement » avec deux fentes : billets ou carte. La forme de ce que tu présentes choisit la fente.
- **Mini-exemples** :
  ```java
  public static int plus(int a, int b) { return a + b; }
  public static int plus(int a, int b, int c) { return a + b + c; }
  System.out.println(plus(8, 5, 1));          // 14 (p.57)
  public static double plus(double a, double b) { return a + b; }
  ```
- **Erreur fréquente** : redéclarer `plus(int x, int y)` → `method plus(int,int) is already defined in class …` (changer les noms des paramètres ou seulement le type de retour ne suffit pas). `plus(4)` → `no suitable method found for plus(int)` quand plusieurs `plus` existent ; s'il n'y en a qu'un : `method plus in class Main cannot be applied to given types;`.
- **Micro-exercices** : [prédire] quelle version est appelée, pour 4 appels. [corriger] une surcharge invalide.
- **À retenir** : surcharge = même nom, paramètres différents · la signature = nom + types des paramètres · le type de retour ne compte pas.
- **Rappel (test)** : une question `rappel: "m07-l03"` (quiz ou predire) sur « do … while : au moins une fois ».
- **Cours** : p.54-57. Bloc `ecart`, au ton respectueux. **Le cours dit** (p.54) : « La machine virtuelle analyse le type de chacun des paramètres d'appel pour déterminer la signature de la fonction à utiliser. » **En réalité**, ce choix est fait par le **compilateur** (`javac`), au moment de la compilation, d'après les types des arguments. La machine virtuelle exécute ensuite la méthode déjà choisie. L'idée du cours (c'est la signature de l'appel qui décide) reste juste. La surcharge existe aussi entre une méthode héritée et une méthode de la classe fille (m16-l03).

#### m08-l07 · Bilan / défi : le carnet découpé (fil rouge v4) (10 min)
- **Problème** : `main` est devenu trop long : on le découpe en méthodes.
- **Notions** : m05 à m08.
- **Défi guidé** (10 min). Code de départ fourni : la v3 corrigée (m07-l08), avec des valeurs figées. Étapes : v1 `public static double lireNote(Scanner sc)` (avec validation `do…while`) → v2 `calculerMoyenne(double a, double b, double c)` → v3 `String mention(double moy)` → v4 `main` en 6 lignes.
- **Défi libre (optionnel)** : `estAdmis(double moy)`, qui renvoie un `boolean`.
- **Bloc `cadre`** : `main` (méthode principale) et `void` passent au vert ; restent `String[] args` (m10), `public` (m14) et `static` (m15).
- **Erreur fréquente** : une méthode qui affiche au lieu de renvoyer, ce qui empêche de réutiliser le résultat.
- **Micro-exercices** : [combiner] le découpage complet (défi guidé).
- **À retenir** : une méthode = une tâche · des paramètres pour entrer, `return` pour sortir.
- **Rappel (test)** : une question `rappel: "m07-l05"` (quiz ou predire) sur « Chercher le plus grand (et le plus petit) ».
- **Cours** : p.49-57.

---

### m09-chaines — Les chaînes de caractères (String)
**À la fin de ce module, tu sauras…**
- appeler une méthode sur une chaîne (`length`, `charAt`, `toUpperCase`…) ;
- comparer deux chaînes correctement avec `equals` ;
- extraire, transformer et parcourir un texte ;
- convertir un texte en nombre, et inversement.

**Prérequis** : m08. **Fil rouge** : v5, identité de l'étudiant. **Cours** : hors PDF (« à vérifier avec le support officiel »).

#### m09-l01 · Une String sait faire des choses : length() (7 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] `doubler(x)` ne change pas x (m08-l05) · [quiz] quelle méthode est appelée parmi deux surcharges ? (m08-l06) · [prédire] une boucle `for` qui affiche 1 2 3 (m07-l02).
- **Problème** : vérifier qu'un matricule saisi a bien 9 caractères (`201506SRG`).
- **Notions et termes** : `String` = suite de caractères ; ce n'est pas un type primitif, c'est un **objet**. Définition provisoire : « une valeur qui transporte ses propres méthodes ; on les appelle avec un point » (définition complète en m11 et m12). `texte.length()`. Coup d'œil en arrière : `sc.nextInt()` et `System.out.println(…)` suivaient déjà ce schéma « point + méthode ».
- **Illustration** : un collier de perles, avec un bouton « combien de perles ? ».
- **Mini-exemples** :
  ```java
  String mat = "201506SRG";
  System.out.println(mat.length());          // 9
  System.out.println("".length());           // 0
  System.out.println("Adama Seck".length()); // 10 (l'espace compte)
  ```
- **Erreur fréquente** : `mat.length` sans parenthèses → `cannot find symbol … symbol: variable length`.
- **Micro-exercices** : [prédire] 4 longueurs. [trous] `if (mdp.___() ___ 8) { … }`. [créer] vérifier qu'un mot de passe a au moins 8 caractères.
- **À retenir** : une `String` est un objet · `objet.methode()` · `length()` = nombre de caractères.
- **Rappel (test)** : une question `rappel: "m08-l03"` (quiz ou predire) sur « Rendre un résultat : return ».

#### m09-l02 · Prendre un caractère : charAt et les indices (7 min)
- **Problème** : obtenir l'initiale d'un prénom ; et comprendre enfin la recette `sc.next().charAt(0)` (m06-l06).
- **Notions et termes** : **indice** (position d'un caractère, **à partir de 0**), `charAt(i)` renvoie un `char` ; dernier indice = `length() - 1`.
- **Illustration** : des perles numérotées 0, 1, 2… ; la première perle porte le numéro 0.
- **Mini-exemples** :
  ```java
  String p = "Adama";
  char c0 = p.charAt(0);                    // 'A'
  char der = p.charAt(p.length() - 1);      // 'a'
  int nb = 0;
  for (int i = 0; i < p.length(); i++) { if (p.charAt(i) == 'a') { nb++; } }
  ```
- **Erreur fréquente** : `"Adama".charAt(5)` → `StringIndexOutOfBoundsException: Index 5 out of bounds for length 5` (erreur d'exécution).
- **Confusions** : `charAt` renvoie un `char` : on le compare avec `'a'`, pas avec `"a"`.
- **Micro-exercices** : [prédire] `"ESP-UCAD".charAt(3)`. [trous] compléter la boucle de comptage des `'a'`. [créer] compter les espaces d'une phrase.
- **À retenir** : les indices commencent à 0 · le dernier est `length() - 1` · `charAt` donne un `char`.
- **Rappel (test)** : une question `rappel: "m04-l04"` (quiz ou predire) sur « Un char est aussi un nombre ».

#### m09-l03 · Comparer deux textes : equals, pas == (6 min)
- **Problème** : l'utilisateur tape « oui », et pourtant `if (rep == "oui")` est faux.
- **Notions et termes** : `equals` compare le **contenu** ; `==` vérifie s'il s'agit du **même objet en mémoire** (explication complète avec les références en m10-l04 et m12-l03) ; `equalsIgnoreCase`.
- **Illustration** : deux cahiers identiques sur deux tables : même contenu (`equals` vrai), mais ce ne sont pas le même cahier (`==` faux).
- **Mini-exemples** :
  ```java
  String rep = sc.nextLine();
  if (rep.equals("oui")) { … }
  if (rep.equalsIgnoreCase("OUI")) { … }
  String s1 = "abc"; String s2 = new String("abc");
  System.out.println(s1 == s2);       // false
  System.out.println(s1.equals(s2));  // true
  ```
- **Erreur fréquente** : `==` sur des chaînes. Il n'y a aucune erreur de compilation, mais le résultat est faux, surtout avec une saisie clavier.
- **Micro-exercices** : [prédire] `==` ou `equals`, 4 cas. [corriger] le test du menu « oui / non ».
- **À retenir** : chaînes → `equals` · `==` = même objet · `equalsIgnoreCase` ignore les majuscules.
- **Rappel (test)** : une question `rappel: "m06-l01"` (quiz ou predire) sur « Poser une question : comparaisons et booléens ».

#### m09-l04 · Transformer une chaîne (sans jamais la modifier) (5 min)
- **Problème** : afficher le nom en majuscules (SECK). Pourtant, `nom.toUpperCase();` n'a rien changé !
- **Notions et termes** : `toUpperCase()`, `toLowerCase()`, `trim()`, `replace(…)` ; **immuable** : l'**objet** `String` ne change jamais, ces méthodes **renvoient une nouvelle chaîne**. La **variable**, elle, peut recevoir cette nouvelle chaîne : `nom = nom.toUpperCase();` (à ne pas confondre avec `final`, m02-l08).
- **Illustration** : une photocopieuse qui rend une copie transformée ; l'original reste dans le bac.
- **Mini-exemples** :
  ```java
  String nom = "seck";
  nom.toUpperCase();                               // nom vaut toujours "seck"
  nom = nom.toUpperCase();                         // "SECK"
  String rep = "  oui ".trim();                    // "oui"
  ```
- **Erreur fréquente** : `nom.toUpperCase();` seul sur une ligne → `nom` reste en minuscules (vérifié), sans aucune erreur.
- **Micro-exercices** : [prédire] 3 lignes, avec ou sans récupération du résultat. [corriger] un programme qui « oublie » de récupérer le résultat.
- **À retenir** : un objet String ne change jamais · on récupère le résultat : `s = s.methode()` · la variable peut changer, l'objet non.
- **Rappel (test)** : une question `rappel: "m08-l05"` (quiz ou predire) sur « Chaque méthode a ses propres boîtes : variables locales ».

#### m09-l05 · Découper un texte : indexOf et substring (6 min)
- **Problème** : extraire le prénom de « Adama Seck », ou les 4 derniers caractères d'un matricule.
- **Notions et termes** : `indexOf(…)` (position de la 1re occurrence, −1 si absente) ; `substring(debut, fin)` (de `debut` inclus à `fin` **exclue**) ; `substring(debut)` (jusqu'à la fin).
- **Illustration** : des perles numérotées et deux ciseaux, posés avant la perle `debut` et avant la perle `fin`.
- **Mini-exemples** :
  ```java
  String complet = "Adama Seck";
  int esp = complet.indexOf(' ');                  // 5
  String prenom = complet.substring(0, esp);       // "Adama"
  String nom = complet.substring(esp + 1);         // "Seck"
  ```
- **Erreur fréquente** : `"Adama".substring(0, 6)` → `StringIndexOutOfBoundsException` (en substance : fin hors limites).
- **Attention, piège** (rappel m04-l04) : pour les initiales, `p.charAt(0) + '.'` additionne deux `char` et affiche un **nombre** (`'A' + '.'` vaut 111). Commencer par un texte : `"" + p.charAt(0) + "."`.
- **Micro-exercices** : [prédire] `"ESP-UCAD".substring(4, 8)`. [créer] les initiales « A.S. » à partir de « Adama Seck » (indice : `"" + …`).
- **À retenir** : `indexOf` trouve une position · `substring(debut, fin)` exclut `fin` · pour coller des `char`, partir de `""`.
- **Rappel (test)** : une question `rappel: "m04-l04"` (quiz ou predire) sur « Un char est aussi un nombre ».

#### m09-l06 · Texte et nombres : concaténer et convertir (7 min)
- **Problème** : `"1" + 2 + 3` donne `123` ; et comment transformer le texte `"25"` en nombre 25 ?
- **Notions et termes** : la concaténation se lit de gauche à droite ; dès qu'un texte apparaît, `+` colle. Conversions : `Integer.parseInt(texte)`, `Double.parseDouble(texte)` (attend un point : `"12.5"`), `String.valueOf(n)` ou `"" + n`.
- **Illustration** : un aimant à texte. Une fois le texte rencontré, tout ce qui suit est collé.
- **Mini-exemples** :
  ```java
  System.out.println("1" + 2 + 3);       // 123
  System.out.println(1 + 2 + "3");       // 33
  int n = Integer.parseInt("25");        // 25
  String s = String.valueOf(25);         // "25"
  ```
- **Erreur fréquente** : `Integer.parseInt("12a")` → `NumberFormatException: For input string: "12a"` (à l'exécution). `int n = "25";` → `String cannot be converted to int` (rappel de m02).
- **Micro-exercices** : [prédire] 4 concaténations. [reproduire] additionner deux nombres donnés sous forme de texte.
- **À retenir** : `+` additionne jusqu'au premier texte, puis colle · `parseInt` : texte → nombre · `valueOf` : nombre → texte.
- **Rappel (test)** : une question `rappel: "m02-l03"` (quiz ou predire) sur « Afficher une variable avec du texte : la concaténation ».

#### m09-l07 · Bilan / défi : l'identité de l'étudiant (fil rouge v5) (10 min)
- **Problème** : saisir prénom et nom, puis produire une identité propre.
- **Notions** : m09 + boucles et méthodes.
- **Défi guidé** (10 min). Code de départ fourni : la v4 corrigée (m08-l07) + `String prenom = "adama", nom = "seck";` (valeurs figées). Étapes : v1 `formaterNom(String p, String n)` → « SECK Adama » → v2 initiales → v3 `matriculeValide(String m)` (longueur 9) → v4 réponse O/N avec `equalsIgnoreCase`.
- **Défi libre (optionnel)** : compter les voyelles d'un prénom.
- **Dépliable « outil »** : `System.out.printf("%.2f%n", moy);` affiche 2 décimales. Le résultat dépend de la langue : `12,35` en français, `12.35` en anglais (vérifié).
- **Erreur fréquente** : `==` entre chaînes, résultat d'un `toUpperCase` non récupéré, `charAt(length())`, `char + char`.
- **Micro-exercices** : [combiner] l'identité complète (défi guidé).
- **À retenir** : `equals`, indices à partir de 0, immuabilité.
- **Rappel (test)** : une question `rappel: "m05-l04"` (quiz ou predire) sur « Le piège du retour à la ligne ».

---

### m10-tableaux — Les tableaux : vecteurs et matrices
**À la fin de ce module, tu sauras…**
- créer un tableau, lire et écrire ses cases, le parcourir ;
- expliquer qu'une variable de tableau contient une **référence** ;
- manipuler une matrice (tableau à 2 dimensions) ;
- comprendre et utiliser `String[] args`.

**Prérequis** : m07-m09. **Fil rouge** : v6, la promo en tableaux (et ses limites). **Cours** : p.22 ; le reste est hors PDF.

#### m10-l01 · Trente notes, une seule variable : créer un tableau (7 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] `"Adama".charAt(1)` (m09-l02) · [quiz] `==` ou `equals` pour deux String ? (m09-l03) · [prédire] la sortie d'un `for` de 0 à 4 (m07-l02).
- **Problème** : 30 notes, ce n'est pas 30 variables `note1` … `note30`.
- **Notions et termes** : **tableau** (suite de cases numérotées, toutes du même type, de taille fixe) ; le cours dit **vecteur** pour un tableau à une dimension ; `type[] nom = new type[taille];` (`new` « fabrique les cases en mémoire », mot détaillé en m12-l02) ; initialisation directe `{ … }` ; **valeurs par défaut** (0, 0.0, false ; pour un tableau de `String` : `null`, qui veut dire « rien », vu en m12-l04).
- **Illustration** : un casier de vestiaire numéroté 0, 1, 2, 3, 4. Passerelle algo : `T : tableau[1..5] d'entiers`, mais en Java on numérote à partir de 0.
- **Mini-exemples** :
  ```java
  double[] notes = new double[5];          // 5 cases à 0.0
  int[] t = {12, 15, 9};
  String[] jours = {"lundi", "mardi"};
  ```
- **Erreur fréquente** : `int[] t = new int[];` → `array dimension missing`. `int t[5];` (style C) → `']' expected`.
- **Micro-exercices** : [comprendre] combien de cases, quel type, quelle valeur par défaut ? [reproduire] un tableau des 7 jours.
- **À retenir** : `new type[n]` crée n cases · numérotées de 0 à n−1 · taille fixe.
- **Rappel (test)** : une question `rappel: "m07-l02"` (quiz ou predire) sur « for : la boucle à compteur ».

#### m10-l02 · Lire et écrire une case : indices et length (7 min)
- **Problème** : ranger une note dans la case 2 et l'afficher ; savoir combien de cases a un tableau.
- **Notions et termes** : `t[i]` (lecture et écriture), `t.length` (attribut **sans parenthèses**), dernière case `t[t.length - 1]` ; afficher tout le tableau avec `Arrays.toString(t)` (`import java.util.Arrays;`).
- **Illustration** : le casier, avec la main qui dépose un objet dans la case 2.
- **Mini-exemples** :
  ```java
  notes[0] = 12.5;
  System.out.println(notes[0]);
  System.out.println(notes.length);                  // 5
  System.out.println(Arrays.toString(t));            // [12, 15, 9]
  ```
- **Erreur fréquente** : `notes[5]` → `ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5`. `System.out.println(t);` affiche quelque chose comme `[I@2b2fa4f7` (`[I` = « tableau d'int », puis un code qui change à chaque exécution) : pas le contenu. Dans les blocs `predire`, ne jamais exiger ce code exact.
- **Confusions** : `t.length` (tableau, sans `()`) vs `s.length()` (String, avec `()`) : les deux erreurs donnent `cannot find symbol`.
- **Micro-exercices** : [prédire] le contenu après 4 affectations. [corriger] l'indice hors limites.
- **À retenir** : indices de 0 à `length - 1` · `length` sans parenthèses · `Arrays.toString` pour afficher.
- **Rappel (test)** : une question `rappel: "m09-l02"` (quiz ou predire) sur « Prendre un caractère : charAt et les indices ».

#### m10-l03 · Parcourir un tableau : for et for-each (7 min)
- **Problème** : additionner toutes les notes sans écrire `t[0] + t[1] + …`.
- **Notions et termes** : parcours avec `for (int i = 0; i < t.length; i++)` ; boucle **for-each** `for (double n : notes)` (« pour chaque note n du tableau ») : lecture seule, sans indice.
- **Illustration** : un doigt qui avance de case en case.
- **Mini-exemples** :
  ```java
  double somme = 0;
  for (int i = 0; i < notes.length; i++) { somme += notes[i]; }
  for (double n : notes) { System.out.println(n); }
  for (int i = 0; i < notes.length; i++) { notes[i] = sc.nextDouble(); }
  ```
- **Erreur fréquente** : `i <= notes.length` → `ArrayIndexOutOfBoundsException` au dernier tour.
- **Confusions** : le for-each donne une **copie** du contenu de chaque case : `for (double n : notes) { n = 0; }` ne change pas le tableau (vérifié). Pour remplacer une case, il faut le `for` avec indice.
- **Micro-exercices** : [prédire] une trace de somme. [trous] compléter `for (int i = 0; i < ___; i++) { somme ___ notes[i]; }`. [créer] la position de la meilleure note (schéma du max, m07-l05).
- **À retenir** : `i < t.length` · for-each pour lire · `for` classique pour écrire ou quand on a besoin de l'indice.
- **Rappel (test)** : une question `rappel: "m03-l01"` (quiz ou predire) sur « Les quatre opérations… et la surprise de la division ».

#### m10-l04 · Copier un tableau ? Le piège de la référence (8 min)
- **Problème** : `int[] u = t; u[0] = 99;` et `t[0]` vaut aussi 99 ! Et une méthode peut modifier les cases d'un tableau, alors qu'elle ne pouvait pas modifier un `int` (m08-l05).
- **Notions et termes** : **référence** (la variable ne contient pas les cases ; elle contient une **flèche** vers le tableau, rangé ailleurs en mémoire) ; type primitif (la valeur est dans la boîte) vs **type référence** (une flèche est dans la boîte) ; copie de la flèche vs vraie copie (`t.clone()` ou une boucle) ; une méthode reçoit une copie de la flèche, donc **le même tableau**.
- **Illustration** : deux télécommandes pour la même télévision.
- **Mini-exemples** :
  ```java
  int[] t = {1, 2, 3};
  int[] u = t;  u[0] = 99;         // t[0] vaut 99
  int[] c = t.clone();  c[1] = 0;  // t[1] inchangé
  public static void raz(int[] tab) { tab[0] = 0; }   // modifie le tableau de l'appelant
  ```
- **Erreur fréquente** : croire avoir fait une copie avec `=`. Aucun message d'erreur : seulement un résultat surprenant.
- **Confusions** : passage par valeur (m08-l05) : c'est toujours une copie, mais ici on copie une **flèche**. Lien avec m09-l03 : `==` compare des flèches.
- **Explique-moi simplement** : donner l'adresse de ta maison n'est pas donner une maquette de la maison ; celui qui a l'adresse peut repeindre la vraie.
- **Micro-exercices** : [prédire] le contenu de `t` après 3 lignes. [corriger] une « copie » ratée.
- **À retenir** : une variable de tableau contient une flèche (une référence) · `=` copie la flèche, pas les cases · une méthode peut modifier le tableau reçu.
- **Rappel (test)** : une question `rappel: "m08-l05"` (quiz ou predire) sur « Chaque méthode a ses propres boîtes : variables locales ».

#### m10-l05 · Les matrices : un tableau de tableaux (8 min)
- **Problème** : ranger les notes de 3 étudiants dans 4 matières.
- **Notions et termes** : **matrice** (tableau à 2 dimensions : lignes × colonnes), `int[][] m = new int[3][4];`, `m[ligne][colonne]`, `m.length` (nombre de lignes), `m[0].length` (nombre de colonnes), double boucle (m07-l06).
- **Illustration** : une salle de cinéma : rangée, puis siège.
- **Mini-exemples** :
  ```java
  double[][] notes = new double[3][4];
  notes[1][2] = 14.5;                       // étudiant 1, matière 2
  int[][] g = {{1, 2}, {3, 4}};
  for (int l = 0; l < g.length; l++) { for (int c = 0; c < g[l].length; c++) { System.out.print(g[l][c] + " "); } System.out.println(); }
  ```
- **Erreur fréquente** : `notes[3][0]` → `ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3`. Inversion ligne / colonne.
- **Attention, piège** : `clone()` sur une matrice ne copie que les flèches des lignes : `int[][] h = g.clone(); h[0][0] = 99;` modifie aussi `g[0][0]` (vérifié).
- **Micro-exercices** : [prédire] l'affichage de `g`. [trous] compléter la double boucle d'affichage. [créer] la moyenne de chaque ligne.
- **À retenir** : `[ligne][colonne]` · `m.length` = nombre de lignes · deux boucles imbriquées.
- **Rappel (test)** : une question `rappel: "m07-l06"` (quiz ou predire) sur « Une boucle dans une boucle ».

#### m10-l06 · Enfin : String[] args, les arguments du programme (7 min)
- **Problème** : que veut dire `String[] args` dans le cadre de `main` ?
- **Notions et termes** : **arguments de ligne de commande** : les mots écrits après `java NomClasse` sont rangés dans le tableau de `String` nommé `args`.
- **Illustration** : un bon de commande glissé au moment du lancement.
- **Mini-exemples** :
  ```java
  System.out.println(args[0] + " " + args[1]);   // java Test Mamadou SOW → Mamadou SOW (p.22)
  System.out.println(args.length);
  int n = Integer.parseInt(args[0]);             // java Carre 7
  ```
- **Erreur fréquente** : lancer sans argument → `ArrayIndexOutOfBoundsException: Index 0 out of bounds for length 0`.
- **Dépliable « outil »** (renvoi vers m00) : comment passer des arguments. Dans le terminal : `java Test Mamadou SOW`. Dans VS Code : lancer depuis le terminal intégré (`javac Test.java` puis `java Test Mamadou SOW`). Selon l'outil en ligne, ce n'est pas toujours possible : faire alors cette leçon avec l'installation locale (m00-l02, m00-l03).
- **Bloc `cadre`** : `String[] args` passe au vert.
- **Micro-exercices** : [prédire] `java Test Awa` avec `args.length`. [créer] un programme qui salue chaque argument.
- **À retenir** : `args` = tableau des mots tapés au lancement · ce sont des `String` (convertir avec `parseInt`) · vérifier `args.length`.
- **Rappel (test)** : une question `rappel: "m09-l06"` (quiz ou predire) sur « Texte et nombres : concaténer et convertir ».
- **Cours** : p.22.

#### m10-l07 · Bilan / défi : la promo en tableaux (fil rouge v6) (10 min)
- **Problème** : gérer 3 étudiants : noms, âges et notes dans 4 matières.
- **Notions** : m07 à m10.
- **Défi guidé** (10 min). Code de départ fourni : `String[] noms = {"Adama", "Awa", "Fatou"}; int[] ages = {22, 20, 21};` et une matrice `notes` figée (3 × 4). Étapes : v1 afficher chaque étudiant → v2 `moyenneEtudiant(double[][] n, int i)` → v3 major de promo.
- **Constat final, qui prépare m11** : **échanger** deux étudiants (comme l'échange de m02-l09) oblige à échanger en même temps `noms[i]`, `ages[i]` et toute la ligne `notes[i]`. Un oubli, et Adama hérite des notes de Fatou. « Il faudrait un dossier par étudiant… »
- **Défi libre (optionnel)** : la moyenne de chaque matière (par colonne).
- **Erreur fréquente** : décaler un seul des tableaux parallèles.
- **Micro-exercices** : [combiner] le programme (défi guidé). [prédire] l'effet d'un échange incomplet.
- **À retenir** : un tableau = des cases du même type · des tableaux parallèles = fragiles.
- **Rappel (test)** : une question `rappel: "m08-l06"` (quiz ou predire) sur « Même nom, entrées différentes : la surcharge ».

---

### m11-penser-objet — Penser objet (partie 1 du cours)
**À la fin de ce module, tu sauras…**
- définir un objet par son état, son comportement et son identité ;
- distinguer une classe de ses instances, et lire un rectangle de classe UML ;
- expliquer l'encapsulation (partie visible `+`, partie cachée `-`) ;
- reconnaître une hiérarchie de classes (généralisation et spécialisation).

**Prérequis** : m10 (le problème des tableaux parallèles). **Fil rouge** : le modèle de l'ESP. Module **conceptuel**, mais chaque leçon contient un **aperçu Java qui compile et tourne** : une classe déjà écrite, où l'étudiant ne modifie que les valeurs dans `main` (« tu sauras l'écrire en m12 »). Chaque exercice « dessine » a un **corrigé dessiné**.

#### m11-l01 · Pourquoi des objets ? État, comportement, identité (8 min)
- **Problème** : les tableaux parallèles de m10-l07 dispersent les informations d'un même étudiant. Comment décrire « Adama » d'un seul bloc ?
- **Notions et termes** : **programmation orientée objet (POO)** : regrouper les données **et** la logique qui les concerne (p.3) ; **objet** (« représentation abstraite d'une entité du monde réel ou virtuel », p.7) ; **attribut** (une caractéristique) ; **état** (valeurs de tous les attributs à un instant donné) ; **comportement** (les services que l'objet sait rendre ; on dit aussi **opérations**) ; **identité** (ce qui distingue deux objets, même quand leurs états sont identiques).
- **Illustration** : trois bureaux couverts de fiches éparpillées, à côté d'une armoire avec un dossier par étudiant. Puis la fiche d'Adama : état à gauche, boutons de comportement à droite, numéro unique en haut.
- **Mini-exemples** :
  ```
  Etudiant  NumEtudiant = 201506SRG, Prénom = Adama, Nom = SECK, Age = 22
  comportement : s'inscrire(), passerExamen(), afficherReleve()
  ```
  Aperçu Java (fichier complet fourni, `run: "fichier"` ; l'étudiant change seulement les valeurs) :
  ```java
  class Etudiant { String nom; int age; }
  public class Main { public static void main(String[] args) {
      Etudiant e = new Etudiant(); e.nom = "Adama"; e.age = 22;
      System.out.println(e.nom + " " + e.age); } }
  ```
- **Dépliable « examen »** : la frise du cours : 1967 Simula, 1976 Smalltalk, C++ (années 1980), 1995 Java, puis Python, Ruby, C#. ⚠ p.5 : C++ (1980) est présenté comme le « 1er compilateur normalisé par l'ANSI ». **En réalité**, l'ancêtre de C++ (« C with Classes ») date bien de 1979-1980, mais la **première norme officielle** (ISO/ANSI) date de **1998**.
- **Erreur fréquente** : confondre état et identité. Deux bouteilles d'eau neuves identiques ont le même état, mais ce sont deux objets. Penser aussi que la POO remplace ce qu'on sait déjà : les `if`, les boucles et les méthodes restent, mais ils sont rangés **dans** les objets.
- **Explique-moi simplement** : des jumeaux, même taille, mêmes habits : ce sont pourtant deux personnes.
- **Micro-exercices** : [comprendre] pour un téléphone, classer 8 éléments en état ou comportement (suite de quiz courts). [modifier] dans l'aperçu, créer Awa à la place d'Adama.
- **À retenir** : POO = regrouper les données et ce qu'on en fait · objet = état + comportement + identité · état = valeurs des attributs.
- **Rappel (test)** : une question `rappel: "m10-l04"` (quiz ou predire) sur « Copier un tableau ? Le piège de la référence ».
- **Cours** : p.3, p.5, p.7.

#### m11-l02 · Une classe : le plan qui fabrique les objets (7 min)
- **Problème** : 300 étudiants, c'est 300 fiches qui ont la même forme. Comment décrire cette forme une seule fois ?
- **Notions et termes** : **classe** (description commune d'objets : même sémantique, mêmes propriétés, même comportement, mêmes relations, p.8). Le cours la dessine en **UML** (langage de dessin standard) : un rectangle à 3 compartiments, nom / attributs / opérations ; la correspondance avec Java vient en m12-l01. Autres termes : **instance** (un objet créé à partir d'une classe), **instanciation** (l'action de créer une instance), généralités dans la classe / particularités dans les objets ; classe **concrète** (instanciable) vs classe **abstraite** (non instanciable, codée en m16-l06).
- **Illustration** : un plan d'architecte et trois maisons construites d'après ce plan ; ou un moule à gâteau et ses gâteaux.
- **Mini-exemples** : `Etudiant` (classe) → Adama, Awa, Fatou (instances). `Filière`, `Cours` (p.8). Le rectangle UML `Etudiant` (nom, age ; s'inscrire()). Aperçu Java qui tourne : la classe de m11-l01 et **deux** instances, Adama et Awa ; l'étudiant en ajoute une troisième.
- **Erreur fréquente** : dire « la classe Adama ». Adama est une instance de la classe Etudiant.
- **Confusions** : **classe vs objet** (le plan vs la maison).
- **Micro-exercices** : [comprendre] classe ou instance ? (Voiture, ma Toyota, Cours, « Java du lundi »…, en suite de quiz). [modifier] ajouter Fatou dans l'aperçu.
- **À retenir** : la classe = le plan · l'objet = une instance du plan · instancier = fabriquer.
- **Rappel (test)** : une question `rappel: "m10-l01"` (quiz ou predire) sur « Trente notes, une seule variable : créer un tableau ».
- **Cours** : p.8-9.

#### m11-l03 · L'encapsulation : ce qu'on montre, ce qu'on cache (8 min)
- **Problème** : si n'importe qui peut écrire « âge = −5 » dans la fiche d'Adama, les données deviennent fausses.
- **Notions et termes** : **encapsulation** (masquer les détails et n'offrir qu'une **interface**, c'est-à-dire la vue externe : les services proposés) ; intégrité des données ; **visibilité** en UML, réduite ici à deux signes : `+` public (visible de tous) et `-` privé (visible seulement dans la classe). Le cours présente aussi `#` (protégé) et l'absence de signe (paquetage) : on les verra quand on les codera (m14-l05, m16-l04).
- **Illustration** : un distributeur de billets. Les boutons et l'écran sont visibles (interface) ; le coffre est caché.
- **Mini-exemples** :
  ```
  Salarie   + nom : String   - salaire : int
            + donnerSalaire()   - calculerPrime()
  ```
  Aperçu Java qui tourne : une classe `Compte` avec `private double solde` et une méthode publique `deposer(double m)`. L'étudiant appelle `deposer` dans `main` ; un bloc `erreur` montre que `c.solde = -5;` est refusé (`solde has private access in Compte`).
- **Erreur fréquente** : tout mettre en `+` public. Le cours le dit : cela « revient à se passer de l'encapsulation ».
- **Confusions** : ici, « interface » = vue externe d'une classe. Le mot-clé Java `interface` (m19) est une notion voisine mais distincte : le signaler dès maintenant.
- **Explique-moi simplement** : la télécommande. Tu utilises les boutons sans ouvrir le boîtier.
- **Micro-exercices** : [comprendre] dans `Salarie`, qui peut voir `salaire` ? (quiz). [créer] annoter `Etudiant` avec `+` et `-` (corrigé dessiné fourni).
- **À retenir** : encapsuler = cacher les détails, montrer des services · `-` privé, `+` public · règle de conduite : attributs privés (`-`). Attention : en Java, un attribut **sans mot-clé** n'est **pas** privé (m14-l05).
- **Rappel (test)** : une question `rappel: "m09-l03"` (quiz ou predire) sur « Comparer deux textes : equals, pas == ».
- **Cours** : p.11-13. La figure p.14 (paquetage Production, `#prénom`) est reprise en m16-l04, où `protected` est codé.

#### m11-l04 · Des familles de classes : généralisation et spécialisation (7 min)
- **Problème** : Etudiant, Enseignant et Technicien ont tous un nom et un prénom : ce sont des personnes.
- **Notions et termes** : **hiérarchie de classes**, **généralisation** (on remonte vers le cas général), **spécialisation** (on descend vers le cas particulier), **classe mère** / **classe fille**, **héritage** (la fille reçoit tout ce que la mère définit), classe racine (souvent abstraite).
- **Illustration** : l'arbre de la p.15 : Personne → Etudiant, Enseignant, Technicien ; Etudiant → Doctorant, Primo-entrant.
- **Mini-exemples** : le diagramme UML avec la flèche à pointe triangulaire vide, dirigée de la fille vers la mère. Aperçu Java qui tourne (fichier fourni, détaillé en m16) : `class Personne { String nom; }`, puis `class Etudiant extends Personne { String matricule; }` et un `main` qui remplit `e.nom` et `e.matricule`.
- **Erreur fréquente** : faire hériter « parce que c'est pratique » (Moteur hérite de Voiture ?). Le bon test : « une fille **est un** cas particulier de la mère ».
- **Micro-exercices** : [créer] une hiérarchie Véhicule / Voiture / Moto / Camion (corrigé dessiné). [comprendre] relation « est un » : vrai ou faux ?
- **À retenir** : généraliser = remonter, spécialiser = descendre · une classe fille **est une** sorte de sa classe mère.
- **Rappel (test)** : une question `rappel: "m08-l06"` (quiz ou predire) sur « Même nom, entrées différentes : la surcharge ».
- **Cours** : p.15.

#### m11-l05 · Bilan / défi : modéliser l'ESP (9 min)
- **Problème** : remplacer les tableaux parallèles par un modèle objet, sur papier.
- **Notions** : tout m11.
- **Défi guidé** (9 min). Point de départ fourni : le rectangle `Etudiant` à moitié rempli. Étapes : v1 compléter `Etudiant` (attributs `-`, opérations `+`) → v2 ajouter `Filiere` et `Cours` → v3 hiérarchie Personne / Etudiant / Enseignant. Corrigé dessiné à chaque étape.
- **Défi libre (optionnel)** : modéliser une bibliothèque (Livre, Lecteur, Emprunt).
- **Erreur fréquente** : un diagramme rempli de valeurs, ou dont tous les attributs sont publics.
- **Micro-exercices** : [comprendre] relever les instances d'un scénario (suite de quiz).
- **À retenir** : classe = plan · objet = état + comportement + identité · encapsulation + hiérarchie.
- **Rappel (test)** : une question `rappel: "m10-l03"` (quiz ou predire) sur « Parcourir un tableau : for et for-each ».
- **Cours** : p.3-15.

---

### m12-classes-objets — Classes et objets en Java
**À la fin de ce module, tu sauras…**
- écrire une classe avec des attributs et des méthodes d'instance ;
- créer des objets avec `new` et les manipuler par leur référence ;
- éviter `NullPointerException` ;
- distinguer un attribut d'une variable locale.

**Prérequis** : m11, m08, m10-l04. **Fil rouge** : v7, la classe `Etudiant`. **Cours** : « Les classes » (hors PDF).

#### m12-l01 · Écrire une classe : les attributs (9 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] `int[] u = t; u[0] = 9;` : que vaut `t[0]` ? (m10-l04) · [quiz] classe ou instance : « Adama » ? (m11-l02) · [quiz] que signifie `-` en UML ? (m11-l03).
- **Problème** : traduire en Java le rectangle UML `Etudiant`, puis faire tourner un programme qui l'utilise.
- **Notions et termes** : le rectangle UML en détail (p.10 : `nom : Type` dans les attributs, `nom()` dans les opérations, compartiments supprimables) et sa traduction Java ; le mot-clé `class` (enfin expliqué : il **déclare un plan**) ; **attribut** en Java (variable déclarée dans la classe, hors de toute méthode ; on dit aussi champ ou variable d'instance). **Un seul fichier** pour commencer : `class Etudiant { … }` (sans `public`) et `public class Main { … }` dans le **même** fichier `Main.java`. Ça marche partout, y compris en ligne. Un fichier par classe viendra en m14-l04.
- **Illustration** : le rectangle UML et le code Java côte à côte, reliés par des flèches.
- **Mini-exemples** :
  ```java
  class Etudiant {             // pas de public : même fichier que Main
      String nom;
      int age;
  }
  ```
  Puis `public class Main` en dessous, avec `main`. Puis la classe `Voiture` de la p.10 (marque, vitesse) et l'Ascenseur réduit à ses opérations.
- **Erreur fréquente** : écrire `public class Etudiant` dans `Main.java` → `class Etudiant is public, should be declared in a file named Etudiant.java` (une seule classe publique par fichier, celle qui porte son nom).
- **Bloc `cadre`** : `class` passe au vert.
- **Micro-exercices** : [reproduire] la classe `Voiture` de la p.10 (attributs seulement). [comprendre] relier chaque ligne UML à sa ligne Java (suite de quiz).
- **À retenir** : `class` = le plan · attributs = variables de la classe · pour l'instant, un seul fichier et une seule classe `public` (Main).
- **Rappel (test)** : une question `rappel: "m11-l02"` (quiz ou predire) sur « Une classe : le plan qui fabrique les objets ».
- **Cours** : p.10.

#### m12-l02 · Fabriquer un objet : new (7 min)
- **Problème** : on a le plan ; comment construire Adama ?
- **Notions et termes** : `new Etudiant()` (instanciation en Java : réserve la mémoire de l'objet), la variable contient une **référence** vers l'objet (rappel m10-l04), accès aux attributs avec le point : `e.nom`. Coup d'œil en arrière : `new Scanner(System.in)` et `new int[5]`.
- **Illustration** : le plan, la maison construite, et l'étiquette `e` reliée à la maison par une flèche.
- **Mini-exemples** :
  ```java
  Etudiant e = new Etudiant();
  e.nom = "Adama";
  e.age = 22;
  System.out.println(e.nom + " a " + e.age + " ans");
  ```
- **Erreur fréquente** : `Etudiant e; e.nom = "Adama";` → `variable e might not have been initialized`.
- **Micro-exercices** : [reproduire] créer Awa. [prédire] l'affichage.
- **À retenir** : `new` fabrique l'objet · la variable garde une flèche vers lui · `objet.attribut`.
- **Rappel (test)** : une question `rappel: "m10-l04"` (quiz ou predire) sur « Copier un tableau ? Le piège de la référence ».

#### m12-l03 · Plusieurs objets, une seule classe (6 min)
- **Problème** : Adama et Awa sont-ils mélangés si on utilise la même classe ?
- **Notions et termes** : chaque objet a son propre état ; **identité** en Java : `==` compare les références ; deux objets au même état restent différents ; `e2 = e1` crée deux flèches vers **un seul** objet.
- **Illustration** : deux maisons du même plan, peintes de couleurs différentes ; puis deux télécommandes pour une seule maison.
- **Mini-exemples** :
  ```java
  Etudiant a = new Etudiant();  a.nom = "Adama";
  Etudiant b = new Etudiant();  b.nom = "Adama";
  System.out.println(a == b);       // false : deux objets
  Etudiant c = a;  c.nom = "Awa";   // a.nom vaut "Awa"
  ```
- **Erreur fréquente** : croire que `c = a` fait une copie.
- **Micro-exercices** : [prédire] 3 scénarios avec des flèches à dessiner. [comprendre] combien d'objets ont été créés ? (on compte les `new`).
- **À retenir** : un `new` = un objet · `==` = même objet ? · `=` copie la flèche.
- **Rappel (test)** : une question `rappel: "m08-l05"` (quiz ou predire) sur « Chaque méthode a ses propres boîtes : variables locales ».
- **Cours** : p.7 (identité).

#### m12-l04 · null : la flèche qui ne pointe vers rien (6 min)
- **Problème** : un tableau `Etudiant[]` neuf contient des cases… qui ne pointent vers rien.
- **Notions et termes** : `null` (« aucun objet »), valeur par défaut des attributs et des cases de type référence ; **NullPointerException** : utiliser le point sur `null`.
- **Illustration** : une étiquette dont le fil ne mène à rien.
- **Mini-exemples** :
  ```java
  Etudiant e = null;
  if (e == null) { System.out.println("pas d'étudiant"); }
  Etudiant[] promo = new Etudiant[3];   // 3 cases à null
  promo[0] = new Etudiant();
  ```
- **Erreur fréquente** : `e.nom` avec `e` qui vaut `null` → `NullPointerException: Cannot read field "nom" because "e" is null` (erreur d'exécution ; selon la façon de compiler, Java peut écrire `"<local1>"` au lieu du nom de la variable).
- **Micro-exercices** : [prédire] quelles lignes plantent. [corriger] remplir le tableau avant de l'utiliser.
- **À retenir** : `null` = pas d'objet · on teste `== null` avant d'utiliser le point · `new` pour chaque case.
- **Rappel (test)** : une question `rappel: "m10-l01"` (quiz ou predire) sur « Trente notes, une seule variable : créer un tableau ».
- **Cours** : p.52 (`if (mess == null) return;` est enfin expliqué).

#### m12-l05 · Le comportement : les méthodes d'instance (8 min)
- **Problème** : l'affichage d'un étudiant est écrit dans `main` ; il devrait appartenir à l'étudiant lui-même.
- **Notions et termes** : **méthode d'instance** (sans `static` : elle agit sur un objet précis), appel `e.afficher()`, **objet courant** (celui sur lequel la méthode est appelée) ; la méthode utilise directement les attributs de cet objet.
- **Illustration** : chaque maison a sa propre sonnette ; sonner chez Adama fait réagir la maison d'Adama.
- **Mini-exemples** :
  ```java
  void afficher() { System.out.println(nom + " (" + age + " ans)"); }
  boolean estMajeur() { return age >= 18; }
  void feterAnniversaire() { age++; }
  a.afficher();  b.afficher();      // deux résultats différents
  ```
- **Erreur fréquente** : écrire `afficher();` tout seul dans `main`. Dans `Main` → `cannot find symbol` ; si `main` est dans la même classe que `afficher` → `non-static method afficher() cannot be referenced from a static context`. Dans les deux cas : « appelle-la sur un objet : `a.afficher()` » (explication complète en m15-l03).
- **Confusions** : méthode `static` de m08 (n'a besoin d'aucun objet) vs méthode d'instance (s'appelle sur un objet).
- **Micro-exercices** : [prédire] après `a.feterAnniversaire()`, que vaut `b.age` ? [créer] `Voiture.accelerer(int delta)`.
- **À retenir** : méthode d'instance = comportement de l'objet · appel `objet.methode()` · elle voit les attributs de son objet.
- **Rappel (test)** : une question `rappel: "m08-l03"` (quiz ou predire) sur « Rendre un résultat : return ».

#### m12-l06 · Attribut ou variable locale ? (7 min)
- **Problème** : pourquoi `int total;` fonctionne sans valeur comme attribut, et pas comme variable locale ?
- **Notions et termes** : attribut (vit aussi longtemps que l'objet, valeur par défaut 0 / false / null, visible dans toutes les méthodes d'instance) vs variable locale (vit pendant l'appel, doit être initialisée, visible dans son bloc) ; **masquage** : un paramètre qui porte le même nom qu'un attribut le cache.
- **Illustration** : le carnet de l'objet (attributs) et le brouillon jeté à la fin de chaque méthode (variables locales).
- **Mini-exemples** :
  ```java
  class Compteur {
      int total;                                   // attribut : 0 au départ
      void ajouter() { int pas = 1; total += pas; } // pas : locale
  }
  ```
  Cliffhanger : `void changerAge(int age) { age = age; }` compile, mais ne change rien (masquage ; solution en m13-l02).
- **Erreur fréquente** : le masquage ci-dessus (aucune erreur, aucun effet).
- **Confusions** : **variable locale vs attribut**.
- **Micro-exercices** : [comprendre] classer 5 variables. [prédire] la valeur de `total` après 3 appels.
- **À retenir** : attribut = mémoire de l'objet · locale = brouillon de la méthode · même nom = masquage.
- **Rappel (test)** : une question `rappel: "m07-l07"` (quiz ou predire) sur « Où vit une variable ? La portée ».
- **Cours** : p.27-28 (portée).

#### m12-l07 · Bilan / défi : la classe Etudiant (fil rouge v7) (10 min)
- **Problème** : remplacer les tableaux parallèles de m10-l07 par des objets.
- **Notions** : m12 + tableaux, boucles et méthodes.
- **Défi guidé** (10 min). Code de départ fourni : la promo en tableaux (m10-l07 corrigé) et la classe `Etudiant` vide, dans un même fichier. Étapes : v1 `Etudiant` avec `nom` et `double[] notes` → v2 `double moyenne()` (méthode d'instance) → v3 `Etudiant[] promo = new Etudiant[3];` rempli avec une boucle, à partir des valeurs figées → v4 major de promo.
- **Défi libre (optionnel)** : la classe `Voiture` avec `accelerer(int delta)` et un garage de 3 voitures.
- **Erreur fréquente** : oublier le `new` de chaque case (NullPointerException) ; `notes` jamais créé (`notes` vaut `null`).
- **Micro-exercices** : [combiner] la promo objet (défi guidé).
- **À retenir** : un objet regroupe ses données et ses méthodes · un tableau d'objets = un tableau de flèches.
- **Rappel (test)** : une question `rappel: "m10-l03"` (quiz ou predire) sur « Parcourir un tableau : for et for-each ».

---

### m13-constructeurs — Les constructeurs
**À la fin de ce module, tu sauras…**
- écrire un constructeur pour qu'un objet naisse complet ;
- utiliser `this` pour lever le masquage ;
- proposer plusieurs constructeurs ;
- afficher un objet proprement avec `toString()`.

**Prérequis** : m12. **Fil rouge** : v8. **Cours** : hors PDF.

#### m13-l01 · Naître complet : le constructeur (7 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] `a == b` pour deux `new` (m12-l03) · [quiz] valeur par défaut d'un attribut `int` (m12-l06) · [prédire] méthode d'instance `feterAnniversaire()` (m12-l05).
- **Problème** : `new Etudiant()` puis 3 lignes d'affectation ; si on en oublie une, l'objet reste à moitié vide.
- **Notions et termes** : **constructeur** (bloc spécial : même nom que la classe, **aucun type de retour**, exécuté automatiquement par `new`) ; **constructeur par défaut** (fourni automatiquement par Java quand on n'en écrit aucun : il ne contient aucune instruction de ta part ; les attributs gardent leur valeur par défaut, 0 / false / null, ou la valeur écrite dans leur déclaration, comme `int x = 5;`).
- **Illustration** : une maternité. Chaque objet sort avec son bracelet déjà rempli.
- **Mini-exemples** :
  ```java
  Etudiant(String n, int a) { nom = n; age = a; }
  Etudiant e = new Etudiant("Adama", 22);
  Etudiant f = new Etudiant("Awa", 20);
  ```
- **Erreur fréquente** : `void Etudiant(String n, int a) { … }` compile, mais c'est une **méthode** ordinaire, pas un constructeur ; `new Etudiant("Adama", 22)` échoue alors.
- **Confusions** : **méthode vs constructeur** (le constructeur n'a pas de type de retour, porte le nom de la classe et est appelé par `new`).
- **Micro-exercices** : [reproduire] un constructeur pour `Voiture(String marque)`. [corriger] le constructeur avec `void`. Bloc `ordre` : classe, attributs, constructeur, `new`.
- **À retenir** : constructeur = même nom que la classe, pas de type de retour · `new` l'appelle · il initialise les attributs.
- **Rappel (test)** : une question `rappel: "m12-l02"` (quiz ou predire) sur « Fabriquer un objet : new ».

#### m13-l02 · this : moi, l'objet en cours (6 min)
- **Problème** : `Etudiant(String nom, int age) { nom = nom; }` ne remplit rien (le cliffhanger de m12-l06).
- **Notions et termes** : `this` (référence vers l'objet courant) ; `this.nom` = l'attribut, `nom` = le paramètre qui le masque.
- **Illustration** : dans une classe, chacun dit « moi » pour se désigner lui-même.
- **Mini-exemples** :
  ```java
  Etudiant(String nom, int age) { this.nom = nom; this.age = age; }
  void changerAge(int age) { this.age = age; }
  ```
- **Erreur fréquente** : `nom = nom;` (aucune erreur, aucun effet).
- **Micro-exercices** : [corriger] 2 constructeurs. [prédire] la valeur des attributs.
- **À retenir** : `this` = l'objet courant · `this.attribut = parametre;` · indispensable en cas de nom identique.
- **Rappel (test)** : une question `rappel: "m12-l06"` (quiz ou predire) sur « Attribut ou variable locale ? ».

#### m13-l03 · Plusieurs façons de naître : surcharge de constructeurs (8 min)
- **Problème** : après avoir ajouté `Etudiant(String nom, int age)`, l'ancien `new Etudiant()` ne compile plus. Et on veut aussi pouvoir créer un étudiant sans connaître son âge.
- **Notions et termes** : le constructeur par défaut n'est fourni **que si l'on n'écrit aucun constructeur** ; pour garder `new Etudiant()`, il faut l'écrire soi-même. Surcharge de constructeurs (rappel de la surcharge, m08-l06). `this(…)` appelle un autre constructeur de la même classe (évite de dupliquer le code). **Écris-le en première ligne du constructeur** : c'est obligatoire jusqu'à Java 24, et c'est la forme qui fonctionne partout. (Les JDK récents, depuis Java 25, assouplissent cette règle ; on enseigne la forme du cours, qui compile avec Java 21.)
- **Illustration** : un formulaire d'inscription en version courte et en version longue.
- **Mini-exemples** :
  ```java
  Etudiant(String nom, int age) { this.nom = nom; this.age = age; }
  Etudiant(String nom) { this(nom, 18); }
  Etudiant() { this("inconnu"); }           // pour garder new Etudiant()
  new Etudiant("Fatou");  new Etudiant("Adama", 22);
  ```
- **Erreur fréquente** :
  - `new Etudiant()` sans constructeur sans argument → `constructor Etudiant in class Etudiant cannot be applied to given types;` (s'il n'existe qu'un constructeur). S'il y en a plusieurs : `no suitable constructor found for Etudiant(no arguments)`.
  - `new Etudiant(22, "Adama")` (ordre inversé) → `incompatible types: int cannot be converted to String`. En réalité, **aucun** constructeur ne convient : `javac` affiche un message simplifié, et le signale en note (*Some messages have been simplified*).
- **Micro-exercices** : [prédire] lesquels de ces 4 `new` compilent. [créer] `Voiture(String marque)` et `Voiture(String marque, int vitesseMax)`.
- **À retenir** : tu écris un constructeur → le constructeur par défaut disparaît · plusieurs constructeurs = signatures différentes · `this(…)` en 1re ligne.
- **Rappel (test)** : une question `rappel: "m08-l06"` (quiz ou predire) sur « Même nom, entrées différentes : la surcharge ».

#### m13-l04 · Afficher un objet : toString() (6 min)
- **Problème** : `System.out.println(e);` affiche quelque chose comme `Etudiant@1dbd16a6` (le nom de la classe, puis un code qui change à chaque exécution ; ne jamais exiger ce code dans un `predire`).
- **Notions et termes** : la méthode `toString()`, appelée automatiquement par `println` et par la concaténation `+`. Recette exacte : `public String toString()`. On l'écrit avec `public` obligatoirement (pourquoi : m14-l05 et m16-l03).
- **Illustration** : la carte de visite que l'objet tend quand on lui demande de se présenter.
- **Mini-exemples** :
  ```java
  public String toString() { return nom + " (" + age + " ans)"; }
  System.out.println(e);              // Adama (22 ans)
  String s = "Major : " + e;
  ```
- **Erreur fréquente** : `String toString()` sans `public` → `toString() in Etudiant cannot override toString() in Object` (en substance : accès trop restreint). `toString()` qui affiche au lieu de renvoyer.
- **Micro-exercices** : [créer] `toString()` de `Voiture`. [prédire] l'affichage d'une concaténation.
- **À retenir** : `toString()` renvoie (et n'affiche pas) un texte · `println(objet)` l'utilise.
- **Rappel (test)** : une question `rappel: "m09-l04"` (quiz ou predire) sur « Transformer une chaîne (sans jamais la modifier) ».

#### m13-l05 · Bilan / défi : des objets bien nés (fil rouge v8) (10 min)
- **Notions** : m12 + m13.
- **Défi guidé** (10 min). Code de départ fourni : la v7 corrigée (m12-l07). Étapes : v1 `Etudiant(String nom, int age)` + `toString` → v2 classe `Cours(String code, int coef)` → v3 promo construite à partir des valeurs figées (puis des saisies).
- **Défi libre (optionnel)** : une classe piégée à corriger (`void` devant le constructeur, `this` oublié, ordre des arguments).
- **Erreur fréquente** : constructeur avec `void`, oubli de `this`, ordre des arguments.
- **Micro-exercices** : [combiner] la promo complète (défi guidé).
- **À retenir** : un objet naît complet grâce au constructeur · `this` · `toString`.
- **Rappel (test)** : une question `rappel: "m12-l04"` (quiz ou predire) sur « null : la flèche qui ne pointe vers rien ».

---

### m14-encapsulation — L'encapsulation en Java : private, accesseurs, paquetages
**À la fin de ce module, tu sauras…**
- protéger les attributs avec `private` ;
- écrire des accesseurs (getters) et des mutateurs (setters) qui contrôlent les valeurs ;
- ranger tes classes dans des paquetages et utiliser `import` ;
- choisir entre `public`, `private`, `protected` et l'accès « paquetage ».

**Prérequis** : m13, m11-l03. **Fil rouge** : v9, un `Etudiant` protégé.

#### m14-l01 · Protéger les attributs : private (7 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] `nom = nom;` dans un constructeur (m13-l02) · [quiz] `toString` affiche-t-il ou renvoie-t-il ? (m13-l04) · [quiz] que signifie `-` en UML ? (m11-l03).
- **Problème** : `e.age = -5;` est accepté sans broncher.
- **Notions et termes** : `private` (accessible seulement à l'intérieur de la classe) ; correspond au `-` de l'UML.
- **Illustration** : un coffre fermé à clé dans la maison.
- **Mini-exemples** :
  ```java
  private String nom;
  private int age;
  e.age = -5;      // refusé depuis une autre classe
  ```
- **Erreur fréquente** : `e.age = -5;` → `age has private access in Etudiant`.
- **Micro-exercices** : [prédire] quelles lignes de `Main` compilent. [modifier] rendre privés les attributs de `Voiture`.
- **À retenir** : attributs `private` · la classe elle-même y accède librement · les autres classes passent par des méthodes.
- **Rappel (test)** : une question `rappel: "m11-l03"` (quiz ou predire) sur « L'encapsulation : ce qu'on montre, ce qu'on cache ».
- **Cours** : p.11-13.

#### m14-l02 · Lire et modifier sous contrôle : getters et setters (6 min)
- **Problème** : `Main` a quand même besoin de lire le nom.
- **Notions et termes** : **accesseur** (getter, `getNom()`, `isMajeur()` pour un `boolean`) et **mutateur** (setter, `setNom(…)`) ; conventions de nommage.
- **Illustration** : un guichet devant le coffre.
- **Mini-exemples** :
  ```java
  public String getNom() { return nom; }
  public void setNom(String nom) { this.nom = nom; }
  System.out.println(e.getNom());
  ```
- **Erreur fréquente** : un getter qui ne renvoie rien (`void getNom()`).
- **Micro-exercices** : [reproduire] getters et setters de `Departement` (p.14 : `getNomDep`, `setNomDep(String)`).
- **À retenir** : get = lire, set = modifier · pas de setter = attribut en lecture seule.
- **Rappel (test)** : une question `rappel: "m08-l03"` (quiz ou predire) sur « Rendre un résultat : return ».
- **Cours** : p.14.

#### m14-l03 · Un setter qui dit non : garantir l'intégrité (6 min)
- **Problème** : avec un simple setter, `setAge(-5)` passe toujours.
- **Notions et termes** : validation dans le setter ; le constructeur appelle le setter pour bénéficier du même contrôle ; **intégrité des données** (p.11). Pour l'instant on refuse avec un message ; la version avec exception viendra en m18-l04.
- **Illustration** : le guichetier qui vérifie la pièce d'identité.
- **Mini-exemples** :
  ```java
  public void setNote(double note) {
      if (note < 0 || note > 20) { System.out.println("Note refusée"); return; }
      this.note = note;
  }
  ```
- **Erreur fréquente** : le constructeur qui fait `this.note = note;` directement contourne le contrôle.
- **Micro-exercices** : [prédire] l'état après 3 appels de `setNote`. [créer] `setAge` qui refuse les âges négatifs.
- **À retenir** : le setter est le gardien de l'attribut · le constructeur passe par lui.
- **Rappel (test)** : une question `rappel: "m06-l04"` (quiz ou predire) sur « Combiner : && (ET), || (OU), ! (NON) ».
- **Cours** : p.11.

#### m14-l04 · Ranger ses classes : paquetages et import (9 min)
- **Problème** : un seul fichier avec 6 classes devient illisible ; et que veut dire `import java.util.Scanner;` ?
- **Notions et termes** : **un fichier par classe publique** (`Etudiant.java`, `Main.java`), à compiler ensemble : `javac *.java` ; **paquetage** (`package esp.notes;` en première ligne ; il correspond au dossier `esp/notes/`) ; nom complet `java.util.Scanner` ; `import` évite de répéter ce nom complet ; `java.lang` (`String`, `System`, `Math`) est importé automatiquement. Compilation depuis la racine : `javac esp/notes/*.java`, puis `java esp.notes.Main`.
- **Illustration** : une bibliothèque avec ses rayons : `import` = « je vais au rayon java.util ».
- **Mini-exemples** :
  ```java
  package esp.notes;
  import java.util.Scanner;
  import java.util.Arrays;
  ```
- **Erreur fréquente** : utiliser une classe d'un autre paquetage sans `import` → `cannot find symbol`.
- **Autre erreur** (lancer une classe sans `main`) : `java Etudiant` → message anglais : `Error: Main method not found in class Etudiant, please define the main method as: public static void main(String[] args) …` (« pas de méthode main dans la classe Etudiant »). Prévenir que la version française de ce message, affichée sur certains systèmes, est mal traduite (elle parle de `javafx.application.Application`).
- **Dépliable « outil »** (renvoi vers m00-l03) : plusieurs fichiers et des paquetages dans VS Code (ouvrir le dossier racine, arborescence `esp/notes/`). Les outils en ligne n'acceptent souvent qu'un seul fichier : faire cette leçon avec l'installation locale.
- **Micro-exercices** : [comprendre] dans quel dossier se trouve `esp.notes.Etudiant` ? [reproduire] déplacer le fil rouge dans un paquetage.
- **À retenir** : paquetage = dossier · `import` = raccourci vers une classe · `java.lang` est automatique.
- **Rappel (test)** : une question `rappel: "m05-l01"` (quiz ou predire) sur « Demander une valeur à l'utilisateur ».
- **Cours** : p.13-14 (paquetage).

#### m14-l05 · public, private, protected, rien : qui voit quoi ? (8 min)
- **Problème** : on connaît `private` et `public`. Mais que se passe-t-il quand on n'écrit rien ? Et que sont les signes `#` et « rien » que le cours montre en UML ?
- **Notions et termes** : les 4 niveaux d'accès Java ↔ UML (p.12-13) : `public` (+, partout), `protected` (#, même paquetage + classes filles ; codé en m16-l04, dans un autre paquetage seulement sur ses propres objets), aucun mot (UML : rien ; on dit accès **paquetage** : toutes les classes du même paquetage), `private` (−, la classe seule). Enfin, pourquoi `public class` (le fichier et la classe sont utilisables partout) et pourquoi `public static void main` : jusqu'à Java 24, la JVM exige un `main` public pour pouvoir l'appeler de l'extérieur. Depuis Java 25, ce n'est plus obligatoire, mais on garde la forme complète, qui fonctionne partout.
- **Illustration** : 4 cercles concentriques (classe ⊂ paquetage ⊂ paquetage + filles ⊂ monde).
- **Mini-exemples** :
  ```java
  public String nom;      // visible partout
  protected int age;      // paquetage + classes filles
  double moyenne;         // paquetage seulement
  private int salaire;    // classe seulement
  ```
- **Erreur fréquente** : un attribut sans mot-clé, utilisé depuis un autre paquetage → `nom is not public in P; cannot be accessed from outside package`.
- **Bloc `cadre`** : `public` passe au vert. Il ne reste que `static`.
- **Micro-exercices** : [comprendre] qui voit quoi ? en suite de 4 quiz courts (exemple Salarié p.13 complet : `+nom`, `#age`, `-salaire`).
- **À retenir** : attributs `private`, méthodes de service `public` · aucun mot = paquetage · `protected` pour la famille.
- **Rappel (test)** : une question `rappel: "m12-l05"` (quiz ou predire) sur « Le comportement : les méthodes d'instance ».
- **Cours** : p.12-14.

#### m14-l06 · Bilan / défi : un Etudiant protégé (fil rouge v9) (10 min)
- **Notions** : m12 à m14.
- **Défi guidé** (10 min). Code de départ fourni : la v8 corrigée (m13-l05). Étapes : v1 attributs privés + getters → v2 `setNote` validé → v3 paquetage `esp.notes`, avec un fichier par classe (installation locale).
- **Défi libre (optionnel)** : `CompteBancaire` (solde privé, `deposer`, `retirer` qui refuse un solde négatif).
- **Erreur fréquente** : un setter public pour le solde (ce qui casse l'intégrité).
- **Micro-exercices** : [combiner] le fil rouge v9 (défi guidé).
- **À retenir** : cacher les attributs, contrôler les modifications, ranger en paquetages.
- **Rappel (test)** : une question `rappel: "m13-l02"` (quiz ou predire) sur « this : moi, l'objet en cours ».

---

### m15-static — Ce qui appartient à la classe : static
**À la fin de ce module, tu sauras…**
- créer un attribut partagé par toutes les instances ;
- distinguer méthode `static` et méthode d'instance, et utiliser `Math` ;
- expliquer l'erreur « non-static … from a static context » ;
- expliquer chaque mot de `public static void main(String[] args)`.

**Prérequis** : m14. **Fil rouge** : v10, le matricule automatique.

#### m15-l01 · Un attribut partagé par tous : static (8 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [quiz] `e.age = -5;` depuis Main, avec `age` privé ? (m14-l01) · [prédire] un setter qui refuse une note de 25 (m14-l03) · [quiz] que signifie l'absence de mot-clé ? (m14-l05).
- **Problème** : compter combien d'étudiants ont été créés. Un attribut `int nb` dans chaque objet ne marche pas : chacun aurait son propre compteur.
- **Notions et termes** : **attribut de classe** (`static`, une seule copie partagée par toute la classe) vs **attribut d'instance** (une copie par objet) ; accès `NomClasse.attribut` (`Etudiant.nbEtudiants` depuis la classe elle-même ; depuis `Main`, l'attribut étant privé, on passe par `Etudiant.getNbEtudiants()`, m15-l02) ; **constante de classe** `static final`.
- **Illustration** : le tableau d'affichage de la salle (un seul, pour tous) à côté du cahier de chaque élève.
- **Mini-exemples** :
  ```java
  private static int nbEtudiants = 0;
  Etudiant(String nom) { this.nom = nom; nbEtudiants++; }
  public static final double NOTE_MAX = 20;
  System.out.println(Math.PI);
  ```
- **Erreur fréquente** : un compteur sans `static`, qui reste à 1 pour chaque objet.
- **Confusions** : **static vs non-static** (de la classe vs de l'objet).
- **Micro-exercices** : [prédire] la valeur du compteur après 3 `new`. [modifier] rendre `NOTE_MAX` constante de classe.
- **À retenir** : `static` = partagé, appartient à la classe · `NomClasse.attribut` · `static final` = constante de classe.
- **Rappel (test)** : une question `rappel: "m14-l01"` (quiz ou predire) sur « Protéger les attributs : private ».

#### m15-l02 · Des méthodes sans objet : les méthodes static (7 min)
- **Problème** : pourquoi écrit-on `Math.sqrt(16)` sans jamais faire `new Math()` ? Et pourquoi nos méthodes de m08 étaient-elles `static` ?
- **Notions et termes** : **méthode de classe** (`static`) : elle n'a **pas d'objet courant** (pas de `this`). Elle ne peut donc pas écrire `nom` tout seul, mais elle peut utiliser les attributs d'un objet qu'elle reçoit ou qu'elle crée (`p.nom`). Elle s'appelle avec `NomClasse.methode()` ; `Math.sqrt`, `Math.max`, `Math.abs`, `Math.round` (l'arrondi promis en m04-l02), `Integer.parseInt` (m09). Quand choisir `static` : quand la méthode ne dépend d'aucun objet.
- **Illustration** : une calculatrice publique posée sur le bureau : pas besoin de la fabriquer pour s'en servir.
- **Mini-exemples** :
  ```java
  double r = Math.sqrt(16);          // 4.0
  int m = Math.max(12, 15);          // 15
  long a = Math.round(12.5);         // 13
  public static int getNbEtudiants() { return nbEtudiants; }
  ```
- **Erreur fréquente** : une méthode `static` qui utilise `nom` → `non-static variable nom cannot be referenced from a static context`.
- **Micro-exercices** : [comprendre] static ou non, pour 5 méthodes. [reproduire] une classe utilitaire `Notes` avec `static double moyenne(double[] t)`.
- **À retenir** : méthode `static` = pas d'objet nécessaire · `Classe.methode()` · pas d'objet courant : elle passe par un objet pour lire `p.nom`.
- **Rappel (test)** : une question `rappel: "m09-l06"` (quiz ou predire) sur « Texte et nombres : concaténer et convertir ».

#### m15-l03 · Pourquoi main ne voit pas tes attributs (6 min)
- **Problème** : l'exemple du cours, `int x = 20;` dans la classe, puis `x` utilisé dans `main`, ne compile pas.
- **Notions et termes** : `main` est `static`, donc il n'y a pas d'objet courant (pas de `this`) ; solutions : créer un objet, ou déclarer `x` en `static`.
- **Illustration** : le tableau d'affichage ne peut pas lire « le » cahier d'un élève : lequel ? Il y en a 30, ou aucun.
- **Mini-exemples** :
  ```java
  public class Portee {
      int x = 20;
      public static void main(String[] args) { Portee p = new Portee(); System.out.println(p.x); }
  }
  ```
  Variante : `static int x = 20;`.
- **Erreur fréquente** : `System.out.println(x);` dans `main` → `non-static variable x cannot be referenced from a static context` (vérifié).
- **Micro-exercices** : [corriger] le code p.28, de deux façons.
- **À retenir** : `static` ne voit pas l'instance · on crée un objet ou on rend le membre `static`.
- **Rappel (test)** : une question `rappel: "m07-l07"` (quiz ou predire) sur « Où vit une variable ? La portée ».
- **Cours** : p.27-28. ⚠ p.28 : `int x=20; // portée classe, utilisable dans toutes les fonctions de la classe`. **En réalité**, `x` est une **variable d'instance** : elle n'est utilisable directement que dans les méthodes **d'instance** ; `main`, qui est `static`, ne peut pas l'utiliser sans objet.

#### m15-l04 · public static void main(String[] args) : chaque mot enfin expliqué (6 min)
- **Problème** : le « formulaire officiel » de m01-l03 n'a plus de secret. On le relit mot par mot.
- **Notions et termes** (récapitulatif) : `public` (m14-l05 : exigé par la JVM jusqu'à Java 24), `static` (m15 : la JVM l'appelle sans créer d'objet), `void` (m08-l03 : ne rend rien), `main` (le nom que la JVM cherche : la méthode principale), `String[] args` (m10-l06), `class` (m12-l01). Encadré honnête : depuis **JDK 25**, Java accepte aussi des formes simplifiées (`void main()` sans `static` ni `args`, et un `main` non public). Elles ne compilent pas avec Java 21 : on garde la forme complète, celle du cours, qui fonctionne sur toutes les versions. Aucun extrait du site n'utilise ces formes. Bloc `cadre` : tous les mots sont au vert.
- **Illustration** : le cadre de m01-l03 où tous les mots sont maintenant passés au vert.
- **Mini-exemples** : le cadre complet, annoté mot par mot, puis `public class Bonjour { … }`.
- **Erreur fréquente** : `Public static void Main(…)` (casse) : `Public` → erreur de compilation ; `Main` compile, mais la JVM ne trouve pas `main`.
- **Micro-exercices** : [comprendre] chaque mot → son rôle (suite de 4 quiz). Bloc `ordre` : reconstituer la ligne du `main`.
- **À retenir** : chaque mot du cadre a un rôle précis · `main` = le point d'entrée que la JVM appelle sans objet.
- **Rappel (test)** : une question `rappel: "m10-l06"` (quiz ou predire) sur « Enfin : String[] args, les arguments du programme ».

#### m15-l05 · Bilan / défi : matricule automatique (fil rouge v10) (9 min)
- **Notions** : m12 à m15.
- **Défi guidé** (9 min). Code de départ fourni : la v9 corrigée (m14-l06). Étapes : v1 compteur `static` → v2 matricule `"2026-" + numero` attribué dans le constructeur → v3 classe utilitaire `Notes` (méthodes `static`) utilisée par `Etudiant.moyenne()`.
- **Défi libre (optionnel)** : `Math.max` et `Math.round` pour arrondir les moyennes au dixième.
- **Erreur fréquente** : un compteur d'instance, ou une méthode utilitaire non `static` appelée sans objet.
- **Micro-exercices** : [combiner] le fil rouge v10 (défi guidé). [prédire] le matricule du 3e étudiant.
- **À retenir** : `static` = la classe · non-static = l'objet.
- **Rappel (test)** : une question `rappel: "m13-l03"` (quiz ou predire) sur « Plusieurs façons de naître : surcharge de constructeurs ».

---

### m16-heritage — L'héritage
**À la fin de ce module, tu sauras…**
- faire hériter une classe d'une autre avec `extends` et appeler `super(…)` ;
- redéfinir une méthode (`@Override`) sans la confondre avec la surcharge ;
- utiliser `protected` ;
- manipuler des objets par le type de leur classe mère (polymorphisme) et créer une classe abstraite.

**Prérequis** : m13-m15, m11-l04. **Fil rouge** : v11, `Personne`, `Etudiant`, `Enseignant`. **Cours** : p.14-15 (concepts) ; le code est hors PDF.

#### m16-l01 · Ne pas tout réécrire : extends (8 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] un compteur `static` après 3 `new` (m15-l01) · [quiz] `private` est-il visible dans une autre classe ? (m14-l01) · [quiz] surcharge : même nom, quoi de différent ? (m08-l06).
- **Problème** : `Etudiant` et `Enseignant` répètent tous deux `nom`, `prenom` et `afficher()`.
- **Notions et termes** : `extends` ; **classe mère** (on dit aussi superclasse) / **classe fille** (sous-classe) ; la fille hérite des attributs et des méthodes ; relation « est un » ; héritage **simple** (une seule classe mère).
- **Illustration** : l'arbre de la p.15.
- **Mini-exemples** :
  ```java
  class Personne { String nom; void afficher() { System.out.println(nom); } }
  class Etudiant extends Personne { String matricule; }
  Etudiant e = new Etudiant();  e.nom = "Adama";  e.afficher();
  ```
- **Erreur fréquente** : `class C extends A, B` → `'{' expected` (Java n'autorise qu'une seule classe mère).
- **Micro-exercices** : [reproduire] `Enseignant extends Personne` avec `grade`. [prédire] quels appels compilent.
- **À retenir** : `extends` = hérite de · la fille a tout ce qu'a la mère, plus ses ajouts · une seule mère.
- **Rappel (test)** : une question `rappel: "m15-l01"` (quiz ou predire) sur « Un attribut partagé par tous : static ».
- **Cours** : p.14-15.

#### m16-l02 · Construire la partie mère : super(…) (6 min)
- **Problème** : `Personne` a un constructeur `Personne(String nom)` ; comment `Etudiant` le remplit-il ?
- **Notions et termes** : `super(…)` appelle le constructeur de la classe mère. **Écris-le en première ligne du constructeur** : c'est obligatoire jusqu'à Java 24, et c'est la forme qui fonctionne partout. (Depuis Java 25, on peut placer quelques instructions avant `super(…)`, à condition qu'elles n'utilisent pas encore l'objet ; ce n'est pas enseigné ici.) S'il est absent, Java appelle `super()` sans argument (c'est aussi ce que fait le constructeur par défaut de m13-l01).
- **Illustration** : construire le rez-de-chaussée (la mère) avant l'étage (la fille).
- **Mini-exemples** :
  ```java
  Personne(String nom) { this.nom = nom; }
  Etudiant(String nom, String matricule) { super(nom); this.matricule = matricule; }
  ```
- **Erreur fréquente** : oublier `super(nom)` quand la mère n'a pas de constructeur sans argument → `constructor Personne in class Personne cannot be applied to given types;`.
- **Micro-exercices** : [corriger] un constructeur sans `super`. [prédire] l'ordre des affichages mère / fille. Bloc `ordre` : les lignes d'un constructeur de fille.
- **À retenir** : `super(…)` en 1re ligne · la mère est construite d'abord.
- **Rappel (test)** : une question `rappel: "m13-l03"` (quiz ou predire) sur « Plusieurs façons de naître : surcharge de constructeurs ».

#### m16-l03 · Faire autrement : redéfinir une méthode (@Override) (7 min)
- **Problème** : `afficher()` de `Personne` ne montre pas le matricule de l'étudiant.
- **Notions et termes** : **redéfinition** (la fille réécrit une méthode de la mère avec **la même signature**), `super.afficher()` (réutiliser la version de la mère), **annotation** `@Override` (une note pour le compilateur : « vérifie que je redéfinis bien quelque chose »). Coup d'œil en arrière : `toString()` (m13-l04) était déjà une redéfinition, celle de la méthode de `Object`.
- **Illustration** : la recette de famille, que la fille adapte à sa façon.
- **Mini-exemples** :
  ```java
  @Override
  void afficher() { super.afficher(); System.out.println("Matricule : " + matricule); }
  @Override
  public String toString() { return nom + " [" + matricule + "]"; }
  ```
- **Erreur fréquente** : `@Override public String toSting()` → `toSting() in … does not override or implement a method from a supertype`. Sans l'annotation, la faute de frappe passerait inaperçue.
- **Confusions** : **surcharge** = même nom, **paramètres différents**, y compris entre une méthode héritée et une méthode de la fille (une fille qui ajoute `afficher(String)` à côté de l'`afficher()` hérité **surcharge**). **Redéfinition** = **même signature** dans la fille. Le cours parle de « même classe » : c'est le cas le plus simple.
- **Micro-exercices** : [comprendre] surcharge ou redéfinition ? (4 cas). [créer] redéfinir `afficher()` dans `Enseignant`.
- **À retenir** : redéfinir = même signature dans la fille · `@Override` toujours · `super.methode()` pour réutiliser.
- **Rappel (test)** : une question `rappel: "m08-l06"` (quiz ou predire) sur « Même nom, entrées différentes : la surcharge ».

#### m16-l04 · protected : un secret de famille (7 min)
- **Problème** : `nom` est `private` dans `Personne`, et `Etudiant` ne peut plus y accéder !
- **Notions et termes** : un membre `private` n'est pas accessible dans la classe fille ; `protected` (UML : `#`, présenté dans le cours p.12 et annoncé en m11-l03 et m14-l05) est accessible dans les classes filles et dans le même paquetage (dans un autre paquetage : seulement sur ses propres objets, par exemple `this.nom`) ; alternative : passer par les getters.
- **Illustration** : la clé de la maison familiale, confiée aux enfants mais pas aux voisins.
- **Mini-exemples** :
  ```java
  class Personne { protected String nom; private int salaire; }
  class Etudiant extends Personne { void f() { nom = "Awa"; } }   // OK
  ```
  Reprise de la figure p.14 (déplacée depuis m11) : paquetage Production (Employe `+nom`, `#prénom`, `-salaire` ; Département) ; hors paquetage, Ouvrier et Technicien héritent d'Employe et accèdent à `#prénom` ; Ingénieur, qui n'hérite pas, n'y accède pas.
- **Erreur fréquente** : accéder à `salaire` (privé) depuis la fille → `salaire has private access in Personne`.
- **Micro-exercices** : [comprendre] l'exemple p.14 : Ingénieur (qui n'hérite pas) voit-il `prénom` ? Réponse : seulement s'il est dans le même paquetage.
- **À retenir** : `private` = même les filles n'y ont pas accès · `protected` = la famille (et le paquetage).
- **Rappel (test)** : une question `rappel: "m14-l05"` (quiz ou predire) sur « public, private, protected, rien : qui voit quoi ? ».
- **Cours** : p.12-14.

#### m16-l05 · Un Etudiant est une Personne : le polymorphisme (8 min)
- **Problème** : ranger étudiants et enseignants dans un même tableau.
- **Notions et termes** : une variable de type mère peut désigner un objet fille (`Personne p = new Etudiant(…)`) ; **polymorphisme** (« plusieurs formes » : le même appel `p.afficher()` exécute la version de l'objet réel) ; `Object` est la classe mère de toutes les classes. Distinction : le **type de la variable** décide de ce qu'on a le droit d'appeler, le **type de l'objet** décide de la version qui s'exécute.
- **Illustration** : une télécommande universelle « Personne » : le même bouton « afficher » donne un résultat différent selon l'appareil visé.
- **Mini-exemples** :
  ```java
  Personne p = new Etudiant("Adama", "201506SRG");
  p.afficher();                    // version Etudiant
  Personne[] tous = { new Etudiant("Awa", "X1"), new Enseignant("Diaw", "Pr") };
  for (Personne q : tous) { q.afficher(); }
  ```
- **Erreur fréquente** : `p.getMatricule()` → `cannot find symbol` (pour le compilateur, `p` est seulement une Personne). `Etudiant e = new Personne("A");` → `incompatible types: Personne cannot be converted to Etudiant`.
- **Confusions** : type de la variable vs type de l'objet.
- **Micro-exercices** : [prédire] quelle version de `afficher()` s'exécute (4 cas). [corriger].
- **À retenir** : une fille peut se ranger dans une variable mère · l'objet réel choisit la version · on n'appelle que ce que le type de la variable connaît.
- **Rappel (test)** : une question `rappel: "m12-l03"` (quiz ou predire) sur « Plusieurs objets, une seule classe ».
- **Cours** : complément (nécessaire pour m19).

#### m16-l06 · Une classe qu'on n'instancie pas : abstract (7 min)
- **Problème** : créer une « Personne » tout court n'a pas de sens à l'ESP : on est étudiant, enseignant ou technicien.
- **Notions et termes** : **classe abstraite** (`abstract class` : on ne peut pas l'instancier), **méthode abstraite** (déclarée sans corps ; chaque fille concrète doit la fournir).
- **Illustration** : le plan général « Personne », avec des cases « à compléter par chaque spécialité ».
- **Mini-exemples** :
  ```java
  abstract class Personne { abstract String role(); }
  class Etudiant extends Personne { String role() { return "étudiant"; } }
  Personne p = new Etudiant();     // OK
  ```
- **Erreur fréquente** : `new Personne()` → `Personne is abstract; cannot be instantiated`. Une fille qui n'implémente pas la méthode → `Etudiant is not abstract and does not override abstract method role() in Personne`.
- **Micro-exercices** : [prédire] compile ou non ? [trous] `Forme` abstraite et `Rectangle` sont fournis ; compléter `Cercle` (`___ double aire() { return ___; }`). [modifier] ajouter `Carre`.
- **À retenir** : abstraite = non instanciable · méthode abstraite = « chaque fille doit la fournir ».
- **Rappel (test)** : une question `rappel: "m11-l02"` (quiz ou predire) sur « Une classe : le plan qui fabrique les objets ».
- **Cours** : p.9, p.15.

#### m16-l07 · Bilan / défi : la famille ESP (fil rouge v11) (10 min)
- **Notions** : m12 à m16.
- **Défi guidé** (10 min). Code de départ fourni : la v10 corrigée (m15-l05) et une classe `Personne` vide. Étapes : v1 `abstract class Personne` (nom, prénom `protected`) → v2 `Etudiant`, `Enseignant` avec `super` et `@Override toString` → v3 `Doctorant extends Etudiant` (p.15) → v4 `Personne[]` affiché en polymorphisme.
- **Défi libre (optionnel)** : `Forme`, `Cercle`, `Rectangle` à partir de zéro, et un tableau de formes dont on calcule l'aire totale.
- **Erreur fréquente** : oublier `super`, `private` au lieu de `protected`, surcharge au lieu de redéfinition.
- **Micro-exercices** : [combiner] la hiérarchie de la p.15 (défi guidé). [prédire] les affichages du tableau polymorphe.
- **À retenir** : `extends`, `super`, `@Override`, `abstract`.
- **Rappel (test)** : une question `rappel: "m13-l04"` (quiz ou predire) sur « Afficher un objet : toString() ».

---

### m17-enums-dates — Énumérations et dates
**À la fin de ce module, tu sauras…**
- créer une énumération et l'utiliser dans un `switch` (classique et « flèche ») ;
- créer et afficher une date avec `LocalDate` ;
- comparer des dates et calculer un âge ;
- lire et afficher une date au format `jj/mm/aaaa`.

**Prérequis** : m15 (méthodes `static`), m16. **Fil rouge** : v12, la `Mention` en enum et l'âge calculé. **Cours** : « Les énumérations » et « Le type Date » (hors PDF, « à vérifier avec le support officiel »).

#### m17-l01 · Une liste fermée de valeurs : enum (8 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [quiz] `switch` sans `break` (m06-l06) · [prédire] polymorphisme : quelle version d'`afficher()` ? (m16-l05) · [quiz] `final` : peut-on réaffecter ? (m02-l08).
- **Problème** : une mention rangée en `String` accepte n'importe quoi (`"Tres bien"`, `"très  bien"`, `"TB"`…).
- **Notions et termes** : **énumération** (`enum`) : un type dont les valeurs possibles sont fixées une fois pour toutes ; constantes en MAJUSCULES ; comparaison avec `==` (autorisée ici, car chaque valeur est unique) ; `values()`, `name()`.
- **Illustration** : un menu déroulant fermé, impossible d'y taper autre chose.
- **Mini-exemples** :
  ```java
  enum Mention { TRES_BIEN, BIEN, ASSEZ_BIEN, PASSABLE, AJOURNE }
  Mention m = Mention.BIEN;
  if (m == Mention.BIEN) { … }
  for (Mention x : Mention.values()) { System.out.println(x); }
  ```
- **Erreur fréquente** : `Mention m = "BIEN";` → `incompatible types: String cannot be converted to Mention`. `Mention.EXCELLENT` → `cannot find symbol`.
- **Micro-exercices** : [créer] `enum Sexe { MASCULIN, FEMININ }`. [prédire] la sortie de la boucle `values()`.
- **À retenir** : `enum` = liste fermée · `Type.VALEUR` · `==` autorisé pour les enums.
- **Rappel (test)** : une question `rappel: "m02-l08"` (quiz ou predire) sur « Une boîte verrouillée : final ».

#### m17-l02 · enum et switch (et le switch « flèche ») (6 min)
- **Problème** : afficher un message différent pour chaque mention.
- **Notions et termes** : `switch` sur une enum (dans `case`, on peut écrire `BIEN` seul ; depuis Java 21, `Mention.BIEN` est aussi accepté) ; le **switch « flèche »** (Java 14 et plus) : `case X -> …`, sans `break` et sans risque de « tomber » dans le cas suivant.
- **Illustration** : l'ascenseur de m06-l06, maintenant équipé de portes qui s'arrêtent à un seul étage.
- **Mini-exemples** :
  ```java
  switch (m) {
      case TRES_BIEN: System.out.println("Bravo !"); break;
      default: System.out.println("Continue");
  }
  switch (m) {
      case TRES_BIEN, BIEN -> System.out.println("Bravo !");
      default -> System.out.println("Continue");
  }
  ```
- **Erreur fréquente** : oubli de `break` dans la forme classique (rappel m06-l06) ; mélanger `:` et `->` dans le même `switch` → `different case kinds used in the switch`.
- **Micro-exercices** : [modifier] réécrire le `switch` de la p.47 avec `enum Sexe` et des flèches. [prédire].
- **À retenir** : `case VALEUR` (préfixe facultatif) · la forme flèche n'a pas besoin de `break`.
- **Rappel (test)** : une question `rappel: "m06-l06"` (quiz ou predire) sur « switch : choisir parmi des cas ».
- **Cours** : p.47 (revu).

#### m17-l03 · Le type date : créer une LocalDate (7 min)
- **Problème** : ranger la date de naissance d'Adama. Trois `int` (jour, mois, année) ne savent pas que le 30 février n'existe pas.
- **Notions et termes** : `java.time.LocalDate` ; on crée une date avec des méthodes `static` (pas avec `new`) : `LocalDate.now()`, `LocalDate.of(a, m, j)` ; affichage ISO `2004-05-10`. Encadré : l'ancienne classe `java.util.Date` (Java 1.0), que le cours utilise peut-être (à vérifier) : elle est mal conçue et la plupart de ses méthodes sont dépréciées (mois numérotés de 0 à 11, années comptées depuis 1900) ; aujourd'hui, on utilise `java.time` (depuis Java 8).
- **Illustration** : un calendrier qui connaît les mois de 28, 29, 30 et 31 jours.
- **Mini-exemples** (aucune `sortie` figée pour `now()` : la date dépend du jour et du fuseau horaire) :
  ```java
  import java.time.LocalDate;
  LocalDate auj = LocalDate.now();
  LocalDate naissance = LocalDate.of(2004, 5, 10);
  System.out.println(naissance);                 // 2004-05-10
  ```
- **Erreur fréquente** : `LocalDate.of(2025, 2, 30)` → `DateTimeException: Invalid date 'FEBRUARY 30'` (à l'exécution). `new LocalDate()` → `constructor LocalDate in class LocalDate cannot be applied to given types;` (on crée une date avec `of` ou `now`, pas avec `new`).
- **Micro-exercices** : [reproduire] la date d'aujourd'hui et ta date de naissance. [prédire] laquelle de 3 dates provoque une erreur.
- **À retenir** : `LocalDate.of(année, mois, jour)` · mois de 1 à 12 · une date invalide est refusée.
- **Rappel (test)** : une question `rappel: "m15-l02"` (quiz ou predire) sur « Des méthodes sans objet : les méthodes static ».

#### m17-l04 · Lire et comparer des dates (6 min)
- **Problème** : quel jour de la semaine est né Adama ? La date limite d'inscription est-elle dépassée ?
- **Notions et termes** : `getYear()`, `getMonthValue()`, `getDayOfMonth()`, `getDayOfWeek()` (renvoie une **enum** `DayOfWeek` : on réutilise l01) ; `isBefore`, `isAfter`, `equals`.
- **Illustration** : une frise chronologique avec deux curseurs.
- **Mini-exemples** :
  ```java
  LocalDate d = LocalDate.of(2006, 11, 13);
  System.out.println(d.getDayOfWeek());       // MONDAY
  System.out.println(d.getMonthValue());      // 11
  if (auj.isAfter(limite)) { System.out.println("Trop tard"); }
  ```
- **Erreur fréquente** : comparer deux dates avec `<` → `bad operand types for binary operator '<'`.
- **Micro-exercices** : [prédire] `isBefore` pour 3 couples de dates. [créer] « Inscriptions ouvertes ? ».
- **À retenir** : des getters pour chaque morceau · `isBefore` / `isAfter` pour comparer.
- **Rappel (test)** : une question `rappel: "m09-l03"` (quiz ou predire) sur « Comparer deux textes : equals, pas == ».

#### m17-l05 · Calculer avec les dates : plusDays et Period (6 min)
- **Problème** : calculer l'âge exact d'Adama, ou la date d'échéance d'un devoir (aujourd'hui + 15 jours).
- **Notions et termes** : `plusDays`, `plusMonths`, `minusYears` ; **immuable** (comme `String`) : ces méthodes renvoient une **nouvelle** date ; `Period.between(d1, d2).getYears()`.
- **Illustration** : la photocopieuse de m09-l04, appliquée aux dates.
- **Mini-exemples** (pas de `sortie` figée pour ce qui dépend de `now()`) :
  ```java
  LocalDate fin = LocalDate.of(2025, 2, 28).plusDays(1);   // 2025-03-01
  LocalDate echeance = auj.plusDays(15);
  int age = Period.between(naissance, auj).getYears();
  ```
- **Erreur fréquente** : `d.plusDays(1);` seul → `d` est inchangée (aucune erreur).
- **Micro-exercices** : [prédire] 2025-12-31 + 1 jour. [créer] `getAge()`.
- **À retenir** : les dates sont immuables · `plusXxx` renvoie une nouvelle date · `Period.between` pour une durée.
- **Rappel (test)** : une question `rappel: "m09-l04"` (quiz ou predire) sur « Transformer une chaîne (sans jamais la modifier) ».

#### m17-l06 · Afficher et saisir une date au format français (6 min)
- **Problème** : afficher `13/11/2006` plutôt que `2006-11-13` ; lire une date tapée sous la forme `jj/mm/aaaa`.
- **Notions et termes** : `DateTimeFormatter.ofPattern("dd/MM/yyyy")`, `date.format(f)`, `LocalDate.parse(texte, f)` ; `MM` = mois, `mm` = minutes.
- **Illustration** : un pochoir qui donne sa forme à la date.
- **Mini-exemples** :
  ```java
  DateTimeFormatter f = DateTimeFormatter.ofPattern("dd/MM/yyyy");
  System.out.println(d.format(f));                    // 13/11/2006
  LocalDate n = LocalDate.parse("13/11/2006", f);
  ```
- **Erreur fréquente** : `"dd/mm/yyyy"` → `UnsupportedTemporalTypeException: Unsupported field: MinuteOfHour` (une `LocalDate` n'a pas de minutes). `parse("13-11-2006", f)` → `DateTimeParseException`.
- **Micro-exercices** : [corriger] un motif faux. [reproduire] saisir une date au clavier.
- **À retenir** : `dd/MM/yyyy` (MM en majuscules) · `format` pour afficher, `parse` pour lire.
- **Rappel (test)** : une question `rappel: "m09-l06"` (quiz ou predire) sur « Texte et nombres : concaténer et convertir ».

#### m17-l07 · Bilan / défi : mention et âge (fil rouge v12) (10 min)
- **Notions** : m17 + objets.
- **Défi guidé** (10 min). Code de départ fourni : la v11 corrigée (m16-l07), avec une date de naissance figée (`LocalDate.of(2004, 5, 10)`) et une date « aujourd'hui » figée pour les tests. Étapes : v1 `Mention mention()` dans `Etudiant`, calculée à partir de la moyenne → v2 attribut `LocalDate dateNaissance` + `getAge()` → v3 message via un switch « flèche ».
- **Défi libre (optionnel)** : `enum Filiere { DIC, DUT, LICENCE }` et la liste des étudiants par filière.
- **Erreur fréquente** : `"MM"` / `"mm"` ; résultat de `plusDays` non récupéré ; mention gardée en `String`.
- **Micro-exercices** : [combiner] le fil rouge v12 (défi guidé).
- **À retenir** : une `enum` pour les listes fermées · `LocalDate` pour les dates.
- **Rappel (test)** : une question `rappel: "m16-l03"` (quiz ou predire) sur « Faire autrement : redéfinir une méthode (@Override) ».

---

### m18-exceptions — Les exceptions
**À la fin de ce module, tu sauras…**
- lire une exception et sa pile d'appels ;
- rattraper une exception avec `try` / `catch` / `finally` ;
- lancer une exception avec `throw` ;
- distinguer exceptions vérifiées et non vérifiées (`throws`) et créer ta propre exception.

**Prérequis** : m16 (héritage), m05. **Fil rouge** : v13, une saisie qui ne plante plus. **Cours** : hors PDF.

#### m18-l01 · Lire un plantage : exception et pile d'appels (8 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [prédire] `t[3]` sur un tableau de 3 cases (m10-l02) · [quiz] erreur de compilation ou d'exécution ? (m05-l02) · [quiz] `extends` et `super` (m16-l02).
- **Problème** : depuis m05, plusieurs programmes se sont arrêtés avec un message rouge (`InputMismatchException`, `ArrayIndexOutOfBoundsException`, `NullPointerException`…). Qu'est-ce que c'est, exactement ?
- **Notions et termes** : **exception** (définition complète : un objet qui décrit un problème survenu à l'exécution ; on dit qu'elle est « lancée », par Java ou, en m18-l04, par toi) ; **pile d'appels** (stack trace) : la 1re ligne donne le type et le message, les lignes `at …(Fichier.java:12)` indiquent le chemin parcouru. Récapitulatif des exceptions déjà rencontrées ; `5 / 0` → `ArithmeticException: / by zero` (mais `5.0 / 0` donne `Infinity`).
- **Illustration** : une alarme incendie qui remonte les étages jusqu'à trouver quelqu'un qui la gère ; si personne ne la gère, on évacue (le programme s'arrête).
- **Mini-exemples** :
  ```java
  int[] t = new int[3];  t[3] = 1;        // ArrayIndexOutOfBoundsException
  Integer.parseInt("12a");                // NumberFormatException
  System.out.println(5 / 0);              // ArithmeticException: / by zero
  ```
- **Attention, piège** : les premières lignes `at java.base/…` dépendent de la version du JDK ; seule la 1re ligne est stable. Ne jamais figer une pile complète dans un `predire`.
- **Erreur fréquente** : lire la pile d'appels par la fin. On commence par la 1re ligne (le type et le message), puis la 1re ligne `at` qui pointe vers **ton** fichier.
- **Micro-exercices** : [comprendre] dans une pile d'appels fournie, trouver le type, le message, le fichier et la ligne. [prédire] quelle exception pour 4 codes.
- **À retenir** : exception = problème détecté à l'exécution · 1re ligne = quoi · lignes `at` = où.
- **Rappel (test)** : une question `rappel: "m10-l02"` (quiz ou predire) sur « Lire et écrire une case : indices et length ».

#### m18-l02 · Rattraper une exception : try / catch (7 min)
- **Problème** : si l'utilisateur tape « abc », le programme ne doit pas mourir.
- **Notions et termes** : `try { … }` (le code risqué), `catch (TypeException e) { … }` (la réaction), `e.getMessage()` ; après le `catch`, le programme continue normalement.
- **Illustration** : un filet sous le trapéziste.
- **Mini-exemples** :
  ```java
  try {
      int n = Integer.parseInt(texte);
      System.out.println(n * 2);
  } catch (NumberFormatException e) { System.out.println("Pas un nombre : " + texte); }
  ```
- **Erreur fréquente** : variable déclarée dans le `try` et utilisée après → `cannot find symbol` (portée, m07-l07). Un `catch` vide qui avale l'erreur sans rien dire (mauvaise pratique).
- **Micro-exercices** : [prédire] la sortie avec `"21"` puis avec `"x"`. [reproduire] protéger une division par une saisie.
- **À retenir** : `try` = j'essaie · `catch` = si ça casse, je fais ceci · ne jamais laisser un `catch` vide.
- **Rappel (test)** : une question `rappel: "m07-l07"` (quiz ou predire) sur « Où vit une variable ? La portée ».

#### m18-l03 · Plusieurs catch, et finally (6 min)
- **Problème** : un même bloc peut échouer de deux façons différentes ; et le Scanner doit être fermé dans tous les cas.
- **Notions et termes** : plusieurs `catch`, du plus précis au plus général (`Exception` en dernier) ; `finally` (bloc exécuté dans tous les cas, sauf arrêt brutal du programme, comme `System.exit`) ; la hiérarchie des exceptions (`NumberFormatException` est une sorte d'`Exception` : réutilise m16).
- **Illustration** : des tamis du plus fin au plus large (m06-l03).
- **Mini-exemples** :
  ```java
  try { … }
  catch (NumberFormatException e) { System.out.println("Format"); }
  catch (ArithmeticException e) { System.out.println("Division par 0"); }
  finally { System.out.println("Fin du calcul"); }
  ```
- **Erreur fréquente** : `catch (Exception e)` placé avant `catch (NumberFormatException e)` → `exception NumberFormatException has already been caught`.
- **Micro-exercices** : [prédire] quel `catch` s'exécute. [corriger] l'ordre des `catch`.
- **À retenir** : du plus précis au plus général · `finally` s'exécute toujours (sauf arrêt brutal).
- **Rappel (test)** : une question `rappel: "m06-l03"` (quiz ou predire) sur « else if : plus de deux chemins ».

#### m18-l04 · Lancer soi-même : throw (6 min)
- **Problème** : en m14-l03, `setNote(25)` affichait juste « Note refusée ». L'appelant ne le savait même pas.
- **Notions et termes** : `throw new IllegalArgumentException("message");` interrompt la méthode et prévient l'appelant ; c'est l'appelant qui décide quoi faire (`try/catch`).
- **Illustration** : un arbitre qui siffle et arrête le jeu.
- **Mini-exemples** :
  ```java
  public void setNote(double note) {
      if (note < 0 || note > 20) { throw new IllegalArgumentException("Note hors de [0, 20] : " + note); }
      this.note = note;
  }
  ```
  Côté appelant : `try { e.setNote(25); } catch (IllegalArgumentException ex) { System.out.println(ex.getMessage()); }`.
- **Erreur fréquente** : `throw IllegalArgumentException("…")` sans `new` → `cannot find symbol` (Java cherche une méthode portant ce nom).
- **Micro-exercices** : [modifier] `setAge` avec `throw`. [prédire] ce qui est affiché.
- **À retenir** : `throw new …` signale le problème à l'appelant · le message doit être clair.
- **Rappel (test)** : une question `rappel: "m14-l03"` (quiz ou predire) sur « Un setter qui dit non : garantir l'intégrité ».

#### m18-l05 · Exceptions vérifiées : throws (6 min)
- **Problème** : `Thread.sleep(1000);` refuse de compiler. Pourquoi Java exige-t-il de traiter celle-ci, et pas `NumberFormatException` ?
- **Notions et termes** : **exception vérifiée** (le compilateur oblige à la rattraper ou à la déclarer) vs **non vérifiée** (`RuntimeException` et ses filles, ainsi que `Error`) ; `throws` dans la signature (« cette méthode peut lancer… »).
- **Illustration** : un colis recommandé, qu'il faut signer (gérer) ou faire suivre (`throws`).
- **Mini-exemples** :
  ```java
  try { Thread.sleep(1000); } catch (InterruptedException e) { System.out.println("Réveil forcé"); }
  public static void pause() throws InterruptedException { Thread.sleep(1000); }
  ```
- **Erreur fréquente** : `Thread.sleep(10);` seul → `unreported exception InterruptedException; must be caught or declared to be thrown` (vérifié).
- **Micro-exercices** : [corriger] de deux façons (`try` ou `throws`). [comprendre] vérifiée ou non ? (4 exceptions, en suite de quiz).
- **À retenir** : exception vérifiée = le compilateur t'oblige à décider · `throws` = « je la fais suivre » · non vérifiées : `RuntimeException`, ses filles et `Error`.
- **Rappel (test)** : une question `rappel: "m16-l01"` (quiz ou predire) sur « Ne pas tout réécrire : extends ».

#### m18-l06 · Ta propre exception (6 min)
- **Problème** : `IllegalArgumentException` est trop vague pour dire « cette note est invalide ». On veut un nom qui parle, et que l'appelant soit **obligé** d'y penser.
- **Notions et termes** : créer sa propre exception vérifiée : une classe qui `extends Exception` (héritage, m16-l01), avec un constructeur qui appelle `super(message)` (m16-l02) ; on la lance avec `throw new …` et on la déclare avec `throws`.
- **Illustration** : un formulaire de réclamation officiel, à ton nom.
- **Mini-exemples** :
  ```java
  class NoteInvalideException extends Exception {
      NoteInvalideException(String msg) { super(msg); }
  }
  void setNote(double n) throws NoteInvalideException { if (n < 0 || n > 20) { throw new NoteInvalideException("Note " + n); } this.note = n; }
  ```
  Côté appelant : `try { e.setNote(25); } catch (NoteInvalideException ex) { System.out.println(ex.getMessage()); }`.
- **Erreur fréquente** : appeler `setNote` sans `try` ni `throws` → `unreported exception NoteInvalideException; must be caught or declared to be thrown`.
- **Micro-exercices** : [trous] compléter la classe d'exception. [modifier] `setAge` qui lance `AgeInvalideException`.
- **À retenir** : ta propre exception `extends Exception` · `super(message)` · le compilateur oblige l'appelant à la traiter.
- **Rappel (test)** : une question `rappel: "m16-l02"` (quiz ou predire) sur « Construire la partie mère : super(…) ».

#### m18-l07 · Bilan / défi : la saisie incassable (fil rouge v13) (10 min)
- **Notions** : m18 + m05 + m07.
- **Défi guidé** (10 min). Code de départ fourni : la v12 corrigée (m17-l07). Étapes : v1 `do…while` + `try/catch (InputMismatchException e)` + `sc.nextLine();` pour vider la saisie erronée (rappel m05-l04 : sans cela, la boucle tourne à l'infini) → v2 `NoteInvalideException` → v3 `finally { sc.close(); }`. Tester avec STDIN figé : `abc`, puis `25`, puis `14`.
- **Défi libre (optionnel)** : rendre robuste aussi la lecture de la date de naissance (`DateTimeParseException`).
- **Erreur fréquente** : boucle infinie parce que la saisie erronée n'a pas été consommée.
- **Micro-exercices** : [combiner] la lecture robuste de N notes (défi guidé). [prédire] la trace d'une saisie « abc », puis « 25 », puis « 14 ».
- **À retenir** : on rattrape là où l'on sait réagir · on vide la saisie fautive · on signale clairement.
- **Rappel (test)** : une question `rappel: "m05-l04"` (quiz ou predire) sur « Le piège du retour à la ligne ».

---

### m19-interfaces — Interfaces et classes d'implémentation
**À la fin de ce module, tu sauras…**
- définir une interface et l'implémenter dans une ou plusieurs classes ;
- utiliser une interface comme type (polymorphisme) ;
- choisir entre interface et classe abstraite ;
- utiliser `ArrayList` à travers l'interface `List`.

**Prérequis** : m16, m18. **Fil rouge** : v14, une promo qui grandit. **Cours** : hors PDF.

#### m19-l01 · Un contrat : l'interface (8 min)
- **Échauffement** (2 à 3 questions de rappel, mélangées, en début de 1re section) : [quiz] `abstract` : peut-on faire `new` ? (m16-l06) · [prédire] polymorphisme (m16-l05) · [quiz] exception vérifiée ou non ? (m18-l05).
- **Problème** : `Etudiant`, `Enseignant` **et** `Salle` doivent tous savoir produire une fiche. Mais une Salle n'est pas une Personne : l'héritage ne convient pas.
- **Notions et termes** : **interface** (mot-clé Java) : une liste de méthodes **promises**, sans corps (implicitement `public abstract`) ; c'est un **contrat**. Lien avec m11-l03 : là-bas, « interface » voulait dire « vue externe » ; le mot-clé Java en est la version officielle.
- **Illustration** : un cahier des charges signé par plusieurs entreprises différentes.
- **Mini-exemples** :
  ```java
  interface Affichable {
      void afficherFiche();
  }
  ```
- **Erreur fréquente** : donner un corps à la méthode → `interface abstract methods cannot have body` (en substance).
- **Confusions** : interface au sens UML (vue externe) vs interface Java (mot-clé).
- **Micro-exercices** : [comprendre] quelles classes pourraient signer `Affichable` ? [créer] `interface Payable { double montant(); }`.
- **À retenir** : interface = contrat de méthodes · pas d'attributs d'instance, pas de corps (ici) · pas de lien « est un ».
- **Rappel (test)** : une question `rappel: "m16-l06"` (quiz ou predire) sur « Une classe qu'on n'instancie pas : abstract ».

#### m19-l02 · Signer le contrat : implements et classe d'implémentation (7 min)
- **Problème** : comment une classe déclare-t-elle qu'elle respecte le contrat ?
- **Notions et termes** : `implements` ; **classe d'implémentation** (classe qui fournit le corps de toutes les méthodes de l'interface) ; les méthodes fournies doivent être `public` ; `extends` et `implements` peuvent se combiner.
- **Illustration** : le contrat, avec la signature de chaque entreprise en bas.
- **Mini-exemples** :
  ```java
  class Salle implements Affichable {
      public void afficherFiche() { System.out.println("Salle " + numero); }
  }
  class Etudiant extends Personne implements Affichable { public void afficherFiche() { … } }
  ```
- **Erreur fréquente** : oublier une méthode → `Salle is not abstract and does not override abstract method afficherFiche() in Affichable`. Oublier `public` → `afficherFiche() in Salle cannot implement afficherFiche() in Affichable` (accès trop restreint).
- **Micro-exercices** : [corriger] 2 classes. [reproduire] `Enseignant implements Affichable`.
- **À retenir** : `implements` = je signe · toutes les méthodes, en `public`.
- **Rappel (test)** : une question `rappel: "m14-l05"` (quiz ou predire) sur « public, private, protected, rien : qui voit quoi ? ».

#### m19-l03 · L'interface comme type (6 min)
- **Problème** : afficher la fiche de tout ce qui est `Affichable`, quelle que soit la classe.
- **Notions et termes** : variable et tableau de type interface ; polymorphisme (m16-l05) ; on ne peut pas instancier une interface.
- **Illustration** : une prise électrique standard : n'importe quel appareil conforme s'y branche.
- **Mini-exemples** :
  ```java
  Affichable[] fiches = { new Salle(12), new Etudiant("Adama", "201506SRG") };
  for (Affichable a : fiches) { a.afficherFiche(); }
  ```
- **Erreur fréquente** : `new Affichable()` → `Affichable is abstract; cannot be instantiated`.
- **Micro-exercices** : [prédire] les affichages. [créer] `double total(Payable[] t)`.
- **À retenir** : une interface est un type · elle accepte tout objet qui l'implémente · on ne l'instancie pas.
- **Rappel (test)** : une question `rappel: "m16-l05"` (quiz ou predire) sur « Un Etudiant est une Personne : le polymorphisme ».

#### m19-l04 · Interface ou classe abstraite ? (6 min)
- **Problème** : `Forme` (m16-l06) aurait-elle pu être une interface ?
- **Notions et termes** : tableau comparatif. Classe abstraite : attributs, constructeurs, une seule mère, relation « est un ». Interface : contrat, une classe peut en implémenter **plusieurs**, relation « sait faire ». Mention : les interfaces peuvent aussi contenir des méthodes `default` (reporté).
- **Illustration** : diplôme (ce que tu **es**) vs permis de conduire (ce que tu **sais faire**) ; on peut avoir plusieurs permis.
- **Mini-exemples** :
  ```java
  class Etudiant extends Personne implements Affichable, Comparable<Etudiant> { … }
  ```
  (`Comparable` est montré comme exemple de nom seulement ; les chevrons `<…>` sont expliqués en l05.)
- **Erreur fréquente** : `class X extends A, B` (rappel m16-l01) alors qu'il fallait des interfaces.
- **Confusions** : **interface vs classe abstraite**.
- **Micro-exercices** : [comprendre] interface ou classe abstraite ? (4 situations).
- **À retenir** : une seule classe mère, plusieurs interfaces · abstraite = « est un », interface = « sait faire ».
- **Rappel (test)** : une question `rappel: "m16-l01"` (quiz ou predire) sur « Ne pas tout réécrire : extends ».

#### m19-l05 · Un tableau qui grandit : ArrayList (6 min)
- **Problème** : un nouvel étudiant s'inscrit, mais le tableau `Etudiant[3]` est plein (sa taille est fixe, m10-l01).
- **Notions et termes** : `ArrayList<Type>` : une liste dont la taille s'adapte ; `add`, `get(i)`, `size()` ; `<Type>` = le type des éléments (on parle de type **générique**, version minimale : entre chevrons, le type de ce qu'on range). Ici, uniquement des `String` (les nombres viennent à la leçon suivante).
- **Illustration** : un accordéon de cases, comparé au casier fixe de m10.
- **Mini-exemples** :
  ```java
  import java.util.ArrayList;
  ArrayList<String> noms = new ArrayList<>();
  noms.add("Adama");  noms.add("Awa");
  System.out.println(noms.get(0) + " " + noms.size());   // Adama 2
  ```
- **Erreur fréquente** : `noms.get(2)` sur une liste de 2 éléments → `IndexOutOfBoundsException: Index 2 out of bounds for length 2`.
- **Confusions** : **tableau vs ArrayList** (taille fixe vs variable ; `t[i]` vs `get(i)`) ; `length` / `length()` / `size()`.
- **Micro-exercices** : [comprendre] relier `length`, `length()` et `size()` à tableau, String et ArrayList (suite de quiz). [reproduire] une liste de 3 prénoms, affichée avec un for-each.
- **À retenir** : `ArrayList` grandit toute seule · `add`, `get`, `size` · indices à partir de 0.
- **Rappel (test)** : une question `rappel: "m09-l02"` (quiz ou predire) sur « Prendre un caractère : charAt et les indices ».

#### m19-l06 · Des nombres dans une liste : Integer, Double et remove (7 min)
- **Problème** : `ArrayList<int>` est refusé. Comment ranger des notes dans une liste ?
- **Notions et termes** : pas de type primitif dans les chevrons : on utilise les **classes enveloppes** `Integer`, `Double` (une classe qui « emballe » une valeur primitive) ; Java convertit automatiquement `int` ↔ `Integer` ; `set(i, x)` et `remove(i)`.
- **Illustration** : chaque nombre glissé dans une petite boîte-cadeau avant d'entrer dans la liste.
- **Mini-exemples** :
  ```java
  ArrayList<Double> notes = new ArrayList<>();
  notes.add(12.5);  notes.add(14.0);
  notes.set(0, 13.0);
  notes.remove(1);                  // retire la case d'indice 1
  ```
- **Erreur fréquente** : `ArrayList<int>` → `unexpected type` (« required: reference, found: int »). `notes.add(12);` dans une `ArrayList<Double>` → `incompatible types: int cannot be converted to Double` : écrire `12.0`.
- **Attention, pièges** (encadré) : deux `Integer` se comparent avec `equals`, jamais avec `==` (`Integer x = 1000, y = 1000;` → `x == y` vaut `false`, alors que pour 100, cela vaut `true` ; rappel de m09-l03). `liste.remove(5)` dans une `ArrayList<Integer>` retire l'**indice** 5, pas la valeur 5.
- **Micro-exercices** : [prédire] le contenu après `set` et `remove`. [corriger] `notes.add(12)`.
- **À retenir** : `Integer` / `Double` dans les chevrons · `12.0` pour un `Double` · `equals` pour comparer deux `Integer`.
- **Rappel (test)** : une question `rappel: "m09-l03"` (quiz ou predire) sur « Comparer deux textes : equals, pas == ».

#### m19-l07 · List et ArrayList : interface et classe d'implémentation dans la bibliothèque Java (6 min)
- **Problème** : pourquoi voit-on souvent `List<Etudiant> promo = new ArrayList<>();` ?
- **Notions et termes** : `List` est une **interface** de la bibliothèque Java ; `ArrayList` (et `LinkedList`) en sont des **classes d'implémentation** ; on déclare la variable avec l'interface (on pourra changer d'implémentation sans changer le reste du code) ; for-each sur une liste.
- **Illustration** : le contrat « liste » et deux entreprises qui le réalisent différemment.
- **Mini-exemples** :
  ```java
  import java.util.List;
  List<Etudiant> promo = new ArrayList<>();
  promo.add(new Etudiant("Fatou", "X3"));
  for (Etudiant e : promo) { System.out.println(e); }
  ```
- **Erreur fréquente** : `new List<>()` → `List is abstract; cannot be instantiated`.
- **Micro-exercices** : [modifier] remplacer `ArrayList` par `LinkedList` : qu'est-ce qui change ? (une seule ligne). [prédire].
- **À retenir** : `List` = l'interface · `ArrayList` = une classe d'implémentation · déclarer avec l'interface.
- **Rappel (test)** : une question `rappel: "m10-l03"` (quiz ou predire) sur « Parcourir un tableau : for et for-each ».

#### m19-l08 · Bilan / défi : la promo dynamique (fil rouge v14) (10 min)
- **Notions** : m19 + m18 + m16.
- **Défi guidé** (10 min). Code de départ fourni : la v13 corrigée (m18-l07). Étapes : v1 `List<Etudiant>` remplie par la saisie robuste (STDIN figé) → v2 `Affichable` implémentée par `Etudiant` et `Enseignant` → v3 recherche par matricule (`equals`) + moyenne générale.
- **Défi libre (optionnel)** : supprimer un étudiant. Méthode enseignée : chercher sa position avec une boucle `for` indexée (`int pos = -1; … if (…) { pos = i; }`), puis, **après** la boucle, `if (pos != -1) { promo.remove(pos); }`.
- **Attention, piège** (encadré) : supprimer **pendant** un for-each (`for (Etudiant e : promo) { promo.remove(e); }`) provoque `java.util.ConcurrentModificationException` (vérifié).
- **Erreur fréquente** : `==` sur les matricules, `ArrayList<double>`, une méthode d'interface non `public`, `remove` dans un for-each.
- **Micro-exercices** : [combiner] le menu complet : ajouter, lister, chercher (défi guidé).
- **À retenir** : interface = contrat · `List` / `ArrayList` = l'exemple quotidien.
- **Rappel (test)** : une question `rappel: "m18-l02"` (quiz ou predire) sur « Rattraper une exception : try / catch ».

---

### m20-jdbc — (Optionnel) Connexion à une base de données : JDBC
**À la fin de ce module, tu sauras…**
- installer MySQL et le pilote JDBC, et expliquer leur rôle ;
- ouvrir une connexion et la fermer automatiquement ;
- lire des lignes (`SELECT`) et en écrire (`INSERT`) avec `PreparedStatement` ;
- gérer `SQLException`.

**Prérequis** : m18, m19, et des notions de SQL (cours de bases de données). **Fil rouge** : v15, la promo sauvegardée. **Cours** : « Connexion JDBC » (hors PDF). Exemples avec MySQL (pilote Connector/J), avec une note pour PostgreSQL.

#### m20-l01 · Pourquoi une base de données ? (SQL en 4 phrases) (7 min)
- **Problème** : à la fin du programme, la `List<Etudiant>` disparaît. Tout est perdu.
- **Notions et termes** : persistance, base de données, table, ligne, colonne ; `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- **Illustration** : la mémoire vive (un tableau blanc effacé chaque soir) vs la base (un registre archivé).
- **Mini-exemples** :
  ```sql
  CREATE TABLE etudiant (matricule VARCHAR(20) PRIMARY KEY, nom VARCHAR(50), moyenne DOUBLE);
  INSERT INTO etudiant VALUES ('201506SRG', 'SECK', 14.5);
  SELECT nom, moyenne FROM etudiant WHERE moyenne >= 10;
  ```
- **Erreur fréquente** : des guillemets doubles en SQL pour le texte (selon le SGBD) : utiliser `' '`.
- **Micro-exercices** : [prédire] le résultat d'un `SELECT` sur une table donnée.
- **À retenir** : une table = des lignes et des colonnes · 4 ordres de base.
- **Rappel (test)** : une question `rappel: "m19-l07"` (quiz ou predire) sur « List et ArrayList : interface et classe d'implémentation dans la bibliothèque Java ».

#### m20-l02 · Installer MySQL et le pilote JDBC (9 min)
- **Problème** : pour parler à une base de données, il faut un serveur de base, et un « adaptateur » côté Java. Rien ne marche tant qu'ils ne sont pas installés.
- **Notions et termes** : **serveur MySQL** (le programme qui garde les tables) ; **pilote** JDBC (driver : un fichier `.jar` fourni par MySQL, Connector/J) ; **classpath** (la liste des endroits où Java cherche les classes) : `java -cp .:mysql-connector-j.jar Main`, avec `;` au lieu de `:` sous Windows.
- **Pas à pas, avec captures** (vérifier les versions au moment de la rédaction) :
  - installer MySQL Community Server (Windows) ou `sudo apt install mysql-server` (Linux) ;
  - créer la base `esp` et un utilisateur ;
  - télécharger Connector/J ;
  - placer le `.jar` à côté de `Main.java`.
  - Dans VS Code : ajouter le `.jar` aux « Referenced Libraries » (dépliable « outil »).
  - Note pour PostgreSQL : même démarche, avec le pilote PostgreSQL.
- **Illustration** : 3 boîtes reliées : ton programme → pilote (`.jar`) → serveur MySQL.
- **Mini-exemples** (commandes) :
  ```
  mysql -u root -p
  CREATE DATABASE esp;
  javac Main.java
  java -cp .:mysql-connector-j.jar Main
  ```
- **Erreur fréquente** : oublier `-cp …jar` au lancement → `No suitable driver found for jdbc:mysql://…` (en substance). Serveur arrêté → `Communications link failure` (en substance).
- **Micro-exercices** : [reproduire] installer, puis créer la base `esp`. [comprendre] quiz : à quoi sert le classpath ?
- **À retenir** : un serveur MySQL + un pilote `.jar` · `-cp` pour donner le pilote à Java · `;` sous Windows, `:` sous Linux.
- **Rappel (test)** : une question `rappel: "m14-l04"` (quiz ou predire) sur « Ranger ses classes : paquetages et import ».
- **Cours** : hors PDF.

#### m20-l03 · Ouvrir une connexion : JDBC et DriverManager (7 min)
- **Problème** : MySQL et le pilote sont installés (m20-l02). Comment le programme ouvre-t-il la conversation avec la base ?
- **Notions et termes** : **JDBC** (ensemble d'interfaces standard `java.sql` : `Connection`, `Statement`… ; le pilote installé en m20-l02 en fournit les classes d'implémentation : application directe de m19) ; URL `jdbc:mysql://localhost:3306/esp` ; `DriverManager.getConnection(url, user, mdp)` ; **try-with-resources** `try (Connection c = …) { }` (fermeture automatique) ; `SQLException` est vérifiée (m18-l05). Note : `Class.forName(...)` n'est plus nécessaire depuis JDBC 4 ; le signaler si le cours l'utilise.
- **Illustration** : une prise universelle (JDBC) + un adaptateur propre à chaque pays (le pilote).
- **Mini-exemples** :
  ```java
  String url = "jdbc:mysql://localhost:3306/esp";
  try (Connection c = DriverManager.getConnection(url, "etudiant", motDePasse)) {
      System.out.println("Connecté !");
  } catch (SQLException e) { System.out.println("Échec : " + e.getMessage()); }
  ```
- **Erreur fréquente** : mauvais mot de passe ou base inexistante → `SQLException` (en substance : accès refusé / base inconnue) ; afficher `e.getMessage()` pour savoir laquelle. Rappel : pilote absent du classpath → `No suitable driver found` (m20-l02).
- **Sécurité** : ne pas écrire un vrai mot de passe en dur dans un projet réel (le lire, par exemple, dans une variable d'environnement).
- **Micro-exercices** : [reproduire] se connecter et afficher « Connecté ! ». [comprendre] relier JDBC / pilote / SGBD (suite de quiz).
- **À retenir** : JDBC = interfaces, pilote = implémentation · `DriverManager.getConnection(url, user, mdp)` · try-with-resources ferme la connexion tout seul.
- **Rappel (test)** : une question `rappel: "m18-l05"` (quiz ou predire) sur « Exceptions vérifiées : throws ».

#### m20-l04 · Lire des données : Statement et ResultSet (7 min)
- **Problème** : afficher tous les étudiants enregistrés.
- **Notions et termes** : `Statement`, `executeQuery`, `ResultSet` (un curseur ligne par ligne), `rs.next()`, `rs.getString("nom")`, `rs.getDouble("moyenne")`.
- **Illustration** : un doigt qui descend les lignes d'un registre.
- **Mini-exemples** :
  ```java
  try (Statement st = c.createStatement();
       ResultSet rs = st.executeQuery("SELECT nom, moyenne FROM etudiant")) {
      while (rs.next()) { System.out.println(rs.getString("nom") + " " + rs.getDouble("moyenne")); }
  }
  ```
- **Erreur fréquente** : lire `rs.getString(…)` avant le premier `rs.next()` → `SQLException` (en substance : curseur avant la première ligne). Faute de frappe dans le nom de colonne → `SQLException` (colonne introuvable).
- **Micro-exercices** : [modifier] n'afficher que les admis (`WHERE`). [prédire].
- **À retenir** : `executeQuery` pour un `SELECT` · `while (rs.next())` · `getXxx("colonne")`.
- **Rappel (test)** : une question `rappel: "m07-l01"` (quiz ou predire) sur « while : répéter tant que ».

#### m20-l05 · Écrire des données : PreparedStatement (8 min)
- **Problème** : insérer un étudiant saisi au clavier. Coller la saisie dans le texte SQL est dangereux.
- **Notions et termes** : `PreparedStatement` avec des `?` ; `setString(1, …)`, `setDouble(2, …)` (paramètres numérotés à partir de **1**) ; `executeUpdate()` renvoie le nombre de lignes modifiées ; **injection SQL** (une saisie malveillante qui modifie la requête).
- **Illustration** : un formulaire à trous, que personne ne peut réécrire.
- **Mini-exemples** :
  ```java
  String sql = "INSERT INTO etudiant VALUES (?, ?, ?)";
  try (PreparedStatement ps = c.prepareStatement(sql)) {
      ps.setString(1, e.getMatricule()); ps.setString(2, e.getNom()); ps.setDouble(3, e.moyenne());
      int n = ps.executeUpdate();
  }
  ```
- **Erreur fréquente** : `"… VALUES ('" + nom + "')"` (concaténation) : vulnérable à l'injection et cassé dès qu'un nom contient une apostrophe (`N'Diaye`). Ou bien `setString(0, …)` → `SQLException` (les indices commencent à 1).
- **Micro-exercices** : [corriger] une requête concaténée. [créer] un `UPDATE` de moyenne.
- **À retenir** : toujours `PreparedStatement` + `?` · les indices commencent à 1 · `executeUpdate` pour écrire.
- **Rappel (test)** : une question `rappel: "m09-l06"` (quiz ou predire) sur « Texte et nombres : concaténer et convertir ».

#### m20-l06 · Gérer les erreurs SQL proprement (6 min)
- **Problème** : la base est arrêtée, ou le matricule existe déjà : le programme doit l'expliquer clairement.
- **Notions et termes** : `SQLException` (`getMessage()`), plusieurs ressources dans un même try-with-resources, `throws SQLException` pour faire remonter l'erreur (m18-l05), message clair pour l'utilisateur et détail pour le développeur.
- **Illustration** : le standardiste qui traduit un problème technique en phrase compréhensible.
- **Mini-exemples** :
  ```java
  public void enregistrer(Etudiant e) throws SQLException { … }
  try { dao.enregistrer(e); } catch (SQLException ex) { System.out.println("Enregistrement impossible : " + ex.getMessage()); }
  ```
- **Erreur fréquente** : un `catch (SQLException e) {}` vide (l'erreur disparaît en silence).
- **Micro-exercices** : [prédire] le comportement lors de l'insertion d'un doublon. [modifier].
- **À retenir** : `SQLException` est vérifiée · on ferme avec try-with-resources · on informe l'utilisateur.
- **Rappel (test)** : une question `rappel: "m18-l03"` (quiz ou predire) sur « Plusieurs catch, et finally ».

#### m20-l07 · Bilan / défi : la promo sauvegardée (fil rouge v15) (10 min)
- **Notions** : m20 + tout l'objet.
- **Défi guidé** (10 min). Code de départ fourni : la v14 corrigée (m19-l08) et une classe `EtudiantDAO` vide. Étapes : v1 `EtudiantDAO` (une classe dédiée à l'accès aux données) avec `enregistrer(Etudiant)` → v2 `List<Etudiant> lister()` → v3 menu complet : saisie robuste, enregistrement, liste.
- **Défi libre (optionnel)** : `supprimer(String matricule)`.
- **Erreur fréquente** : concaténation SQL, connexion jamais fermée, indices commençant à 0.
- **Micro-exercices** : [combiner] l'application finale (défi guidé).
- **À retenir** : objets en mémoire ↔ lignes en base · `PreparedStatement` · try-with-resources.
- **Rappel (test)** : une question `rappel: "m19-l07"` (quiz ou predire) sur « List et ArrayList : interface et classe d'implémentation dans la bibliothèque Java ».

---

## Notions volontairement reportées (et pourquoi)

| Notion | Statut | Raison |
|---|---|---|
| `var` (inférence de type) | non enseigné | Le cours écrit les types explicitement ; le type écrit en toutes lettres aide à penser « boîte d'un type donné ». |
| `main` simplifié, `main` non public, instructions avant `super(…)` / `this(…)` (JDK 25 et plus) | simple mention (m15-l04, m13-l03, m16-l02, m14-l05) | Refusé par `--release 21` et différent du cours ; on garde la forme universelle. |
| `sc.useLocale(…)` | dépliable « outil » en m05-l02 | La règle neutre « virgule ou point selon ta machine » suffit. |
| `break` / `continue` dans les boucles | non enseigné (la suppression en m19-l08 se fait sans `break`) | Absent du cours ; une condition de boucle claire est plus formatrice. `break` n'est enseigné que pour le `switch`. |
| Opérateurs bit à bit en profondeur, décalages `<< >> >>>` | `& | ^` dans la leçon « Pour l'examen » m06-l05 | Le cours les cite sans les exploiter ; ils demandent la représentation binaire. |
| Opérateur ternaire | dépliable « examen » du bilan m06-l07 | Raccourci, pas une idée nouvelle. |
| `printf` / `String.format` complets | dépliable « outil » en m09-l07 | Utile, mais introduit une mini-syntaxe (`%d`, `%.2f`) et des effets de langue. |
| `StringBuilder` | reporté | Ne sert qu'à optimiser des concaténations nombreuses. |
| Switch « expression », `yield`, motifs, `record`, `sealed`, blocs de texte | reportés | Java moderne avancé, hors du cours. |
| Redéfinition de `equals` / `hashCode` | mention en m16-l05 | Contrat subtil ; on compare les matricules avec `equals` sur `String`. |
| Génériques au-delà de `List<Type>` | reportés | La syntaxe `<Type>` suffit pour utiliser `ArrayList`. |
| Autres collections (`HashMap`, `Set`), tri (`Collections.sort`, `Comparable` / `Comparator`) | reportés (`Comparable` juste cité en m19-l04) | Hors sommaire. Le tri n'est **jamais** demandé dans un exercice : le constat de m10-l07 utilise l'échange. |
| Méthodes `default` / `static` dans les interfaces | citées en m19-l04 | Brouillent la définition « interface = contrat sans corps ». |
| Classes internes, anonymes, lambdas, streams | reportés | Exigence des principes. |
| Fichiers (`java.io`, `java.nio`), threads, interfaces graphiques | reportés | Hors sommaire officiel. |
| Tests unitaires, Maven / Gradle, IDE en détail | reportés | Outillage : m00 se limite à un outil en ligne, au JDK et à VS Code. |
| `java.util.Date` / `Calendar` | encadré en m17-l03 | API ancienne et piégeuse ; citée parce que le cours parle du « type Date ». |
| `Class.forName` (JDBC), pools, transactions, ORM | reportés (`Class.forName` mentionné en m20-l03) | JDBC est déjà optionnel. |
| SOLID, patrons de conception, Spring | exclus | Exigence des principes. |

---

## Confusions classiques → leçon qui les traite

| Confusion | Leçon(s) |
|---|---|
| compiler vs exécuter ; `javac Fichier.java` vs `java NomClasse` | m01-l02 |
| JDK vs JRE ; « javac n'est pas reconnu » (PATH) | m00-l02 |
| nom du fichier vs nom de la classe ; casse ; classe `Main` imposée en ligne | m00-l01, m01-l03 |
| `print` vs `println` ; `"2 + 3"` vs `2 + 3` | m01-l04 |
| `=` (affectation) vs égalité mathématique vs `==` | m02-l02, m06-l01, m06-l02 |
| `"age"` vs `age` (texte vs variable) | m02-l01, m02-l03 |
| `' '` vs `" "` ; `char` vs `String` ; `'7'` vs `7` | m02-l07, m04-l04 |
| virgule ou point au clavier selon la langue ; `1,500` lu 1500 en anglais | m02-l06, m05-l02 |
| débordement silencieux d'un calcul `int` | m02-l05, m07-l02 |
| `7/2` vs `7/2.0` (division entière) | m03-l01, m04-l02, m08-l04 |
| `%` reste vs pourcentage | m03-l02 |
| `"Somme : " + 2 + 3` vs `"Somme : " + (2 + 3)` ; `"1"+2+3` vs `1+2+"3"` | m03-l03, m09-l06 |
| `x += 0.5` (cast caché) vs `x = x + 0.5` | m03-l04, m07-l04 |
| `i++` vs `++i` ; `=+` vs `+=` | m03-l05, m03-l04 |
| constante (`byte b = 100;` accepté) vs variable (`byte b = n;` refusé) | m04-l01 |
| troncature vs arrondi ; `(double)(7/2)` vs `(double)7/2` | m04-l02 |
| `'2'` vaut 50 ; `char + char` = nombre | m04-l04, m09-l05 |
| erreur de compilation vs erreur d'exécution | m05-l02, m18-l01 |
| `next()` vs `nextLine()` ; piège du ⏎ | m05-l03, m05-l04, m07-l03 |
| `&&` vs `||` ; `&&` vs `&` | m06-l04, m06-l05 |
| `if (…);` ; `if` sans accolades | m06-l02 |
| `else if` mal ordonné | m06-l03 |
| `switch` sans `break` ; `switch` impossible sur un intervalle | m06-l06, m17-l02 |
| `while` vs `for` ; `<` vs `<=` | m07-l02 |
| `do…while` vs RÉPÉTER…JUSQU'À (condition inversée) | m07-l03 |
| accumulateur déclaré dans la boucle, ou en `int` | m07-l04 |
| maximum initialisé à 0 | m07-l05 |
| portée : variable de bloc utilisée hors du bloc, redéclaration dans un bloc intérieur | m07-l07, m18-l02 |
| définir vs appeler une méthode | m08-l01 |
| paramètre vs argument | m08-l02 |
| `return` (rendre) vs `println` (afficher) | m08-l03, m08-l04, m13-l04 |
| passage par valeur : la méthode ne modifie pas l'`int` de l'appelant | m08-l05 |
| surcharge vs redéfinition (y compris surcharge d'une méthode héritée) | m08-l06, m16-l03 |
| `==` vs `equals` (String, objets, `Integer`) | m09-l03, m12-l03, m19-l06 |
| `s.toUpperCase();` sans récupérer le résultat ; objet immuable vs variable `final` | m09-l04, m17-l05 |
| `length` (tableau) vs `length()` (String) vs `size()` (ArrayList) | m10-l02, m19-l05 |
| indices à partir de 0 ; `<= length` ; `substring` qui exclut la fin | m09-l02, m09-l05, m10-l02, m10-l03 |
| for-each : copie de la valeur, impossible de remplacer une case | m10-l03 |
| copier un tableau vs copier la référence ; `clone()` d'une matrice | m10-l04, m10-l05 |
| classe vs objet (instance) | m11-l02, m12-l02 |
| état vs identité | m11-l01, m12-l03 |
| « interface » (vue externe, UML) vs `interface` Java | m11-l03, m19-l01 |
| attribut sans mot-clé (paquetage) vs `private` | m11-l03, m14-l05 |
| variable locale vs attribut ; masquage | m12-l06, m13-l02 |
| méthode `static` vs méthode d'instance ; static vs non-static | m12-l05, m15-l01, m15-l02, m15-l03 |
| méthode vs constructeur (`void Etudiant(…)`) | m13-l01 |
| constructeur par défaut qui disparaît | m13-l03 |
| `public` vs `private` (vs `protected` vs paquetage) | m14-l01, m14-l05, m16-l04 |
| type de la variable vs type de l'objet | m16-l05 |
| classe abstraite vs classe concrète | m11-l02, m16-l06 |
| interface vs classe abstraite | m19-l04 |
| tableau vs `ArrayList` ; `remove(5)` = indice | m19-l05, m19-l06 |
| supprimer pendant un for-each | m19-l08 |
| `MM` (mois) vs `mm` (minutes) | m17-l06 |
| exception vérifiée vs non vérifiée | m18-l05 |
| concaténation SQL vs `PreparedStatement` | m20-l05 |

---

## Glossaire minimal (terme → leçon de 1re définition)

Règle pour les rédacteurs : **un terme n'apparaît pas dans une leçon antérieure à celle indiquée**, sauf annonce explicite (« on le verra en mXX »). « (prov.) » = définition provisoire, complétée plus tard à la leçon indiquée entre parenthèses.

| Terme | 1re définition | Terme | 1re définition |
|---|---|---|---|
| compilateur en ligne, STDIN | m00-l01 | JDK, terminal, PATH | m00-l02 |
| éditeur de code, terminal intégré | m00-l03 | programme, cadre (prov.) | m01-l01 (m01-l03) |
| code source, langage, compilateur, `javac` | m01-l02 | bytecode, `.class`, JVM, exécuter, LTS | m01-l02 |
| classe (prov.) | m01-l03 (m11-l02, m12-l01) | méthode principale `main` (prov.) | m01-l03 (m08-l01) |
| bloc, accolades, instruction, `;`, casse | m01-l03 | chaîne de caractères (prov.) | m01-l04 (m09-l01) |
| `println`, `print`, commentaire | m01-l04 | erreur de compilation | m01-l05 |
| variable, type (prov. `int`), nom, valeur | m02-l01 (type : m02-l05) | déclaration, initialisation | m02-l01 |
| affectation, expression | m02-l02 | concaténation, `String` (prov.) | m02-l03 (m09-l01) |
| identificateur, mot réservé, camelCase | m02-l04 | type primitif, bit, plage, littéral | m02-l05 |
| `byte`, `short`, `int`, `long`, suffixe `L` | m02-l05 | débordement (calcul) | m02-l05 (cast : m04-l03) |
| `double`, `float`, suffixe `f` | m02-l06 | `char`, Unicode | m02-l07 |
| `final`, constante | m02-l08 | opérateur, opérande, division entière | m03-l01 |
| modulo `%` | m03-l02 | priorité des opérateurs | m03-l03 |
| affectation composée `+=`, incrémentation, décrémentation | m03-l04 | pré- / post-incrémentation | m03-l05 |
| compatibilité, conversion implicite (élargissement), notation `E` | m04-l01 | transtypage / cast, troncature | m04-l02 |
| débordement d'un cast | m04-l03 | code d'un caractère (ASCII / Unicode) | m04-l04 |
| saisie, invite, `Scanner`, `System.in` | m05-l01 | `import` (prov.) | m05-l01 (m14-l04) |
| `new` (prov.) | m05-l01 (m10-l01, m12-l02) | erreur d'exécution, exception (prov.) | m05-l02 (m18-l01) |
| retour à la ligne (⏎) | m05-l04 | `boolean`, `true` / `false` | m06-l01 |
| opérateur de comparaison, condition | m06-l01 | `if`, `else`, bloc conditionnel | m06-l02 |
| `else if` (cascade) | m06-l03 | opérateurs logiques `&&` `||` `!`, table de vérité | m06-l04 |
| court-circuit ; `&` `|` `^` | m06-l05 | `switch`, `case`, `break`, `default` | m06-l06 |
| recette `sc.next().charAt(0)` | m06-l06 (`charAt` : m09-l02) | opérateur ternaire | m06-l07 (dépliable) |
| boucle, itération, condition de continuation | m07-l01 | boucle infinie, compteur | m07-l01 |
| `for` | m07-l02 | `do … while` | m07-l03 |
| accumulateur, tableau de trace | m07-l04 | maximum / minimum | m07-l05 |
| boucles imbriquées | m07-l06 | portée | m07-l07 |
| méthode, définition, appel | m08-l01 | `void` | m08-l01 (détaillé m08-l03) |
| paramètre, argument | m08-l02 | type de retour, `return` | m08-l03 |
| variable locale, passage par valeur | m08-l05 | signature, surcharge | m08-l06 |
| objet (prov.), méthode appelée avec un point | m09-l01 (m11-l01) | indice | m09-l02 |
| `equals`, `equalsIgnoreCase` | m09-l03 | immuable | m09-l04 |
| `indexOf`, `substring` | m09-l05 | `parseInt`, `parseDouble`, `valueOf` | m09-l06 |
| tableau, vecteur, valeur par défaut | m10-l01 | `length` (tableau), `Arrays.toString` | m10-l02 |
| for-each | m10-l03 | référence, type référence | m10-l04 |
| matrice | m10-l05 | arguments de ligne de commande, `args` | m10-l06 |
| POO, objet (déf. complète), attribut, état | m11-l01 | comportement, opération, identité | m11-l01 |
| classe (concept), instance, instanciation | m11-l02 | UML (rectangle de classe) | m11-l02 (détail : m12-l01) |
| classe concrète / abstraite (concept) | m11-l02 | encapsulation, interface (vue externe) | m11-l03 |
| visibilité, `+` public, `-` privé (UML) | m11-l03 | hiérarchie, généralisation, spécialisation | m11-l04 |
| classe mère / fille, héritage (concept) | m11-l04 | `class` (Java), champ, variable d'instance | m12-l01 |
| `new` (déf. complète) | m12-l02 | `null`, `NullPointerException` | m12-l04 |
| méthode d'instance, objet courant | m12-l05 | masquage | m12-l06 |
| constructeur, constructeur par défaut | m13-l01 | `this` | m13-l02 |
| `this(…)` | m13-l03 | `toString` | m13-l04 |
| `private` | m14-l01 | accesseur (getter), mutateur (setter) | m14-l02 |
| intégrité des données | m14-l03 | paquetage `package`, `import` (déf. complète), `java.lang` | m14-l04 |
| un fichier par classe publique | m14-l04 | `public`, accès paquetage (Java), `#` UML | m14-l05 |
| `protected` (codé) | m16-l04 (annoncé m14-l05) | `static`, attribut de classe / d'instance | m15-l01 |
| `static final` (constante de classe) | m15-l01 | méthode de classe, `Math` | m15-l02 |
| `extends`, superclasse, sous-classe | m16-l01 | `super(…)` | m16-l02 |
| redéfinition, `@Override`, annotation | m16-l03 | polymorphisme, `Object` | m16-l05 |
| `abstract` (classe, méthode) | m16-l06 | `enum`, `values()` | m17-l01 |
| switch « flèche » | m17-l02 | `LocalDate`, `java.time` | m17-l03 |
| `DayOfWeek`, `isBefore` / `isAfter` | m17-l04 | `Period`, `plusDays` | m17-l05 |
| `DateTimeFormatter`, `format`, `parse` | m17-l06 | exception (déf. complète), pile d'appels | m18-l01 |
| `try`, `catch`, `getMessage` | m18-l02 | `finally` | m18-l03 |
| `throw` | m18-l04 | exception vérifiée / non vérifiée, `throws`, `RuntimeException`, `Error` | m18-l05 |
| exception personnalisée | m18-l06 | `interface` (Java), contrat | m19-l01 |
| `implements`, classe d'implémentation | m19-l02 | `ArrayList`, générique `<Type>` | m19-l05 |
| classe enveloppe (`Integer`, `Double`) | m19-l06 | `List` | m19-l07 |
| base de données, table, SQL, persistance | m20-l01 | serveur MySQL, pilote, classpath | m20-l02 |
| JDBC, `DriverManager`, `Connection`, try-with-resources | m20-l03 | `Statement`, `ResultSet` | m20-l04 |
| `PreparedStatement`, injection SQL | m20-l05 | `SQLException` (gestion) | m20-l06 |
| DAO | m20-l07 | | |

### Vérification « aucun terme avant sa définition » (relecture faite sur la version 2)
Points sensibles vérifiés, et comment ils sont traités :
- **m00** ne contient aucune notion Java : le code y est « à recopier ». `JDK`, `PATH` et « terminal » y sont définis.
- **`String`** est utilisé dès m02-l03 avec une définition provisoire (« le type des textes ») ; le mot « objet » n'apparaît qu'en m09-l01.
- **`boolean`** est défini en m06-l01 (déplacé depuis m02). En m02-l09, il est seulement annoncé dans le tableau des 8 types.
- **`new`, `import`, `Scanner`** en m05 sont une recette, avec un renvoi. Le mot « méthode » est banni de m05.
- **`charAt(0)`** en m06-l06 et m07-l03 est la recette `sc.next().charAt(0)`, expliquée en m09-l02.
- **« exception »** n'apparaît en m05-l02 que comme le nom affiché par Java ; il est défini en m18-l01.
- **`null`** : la p.52 est adaptée en m08-l03 ; `null` est défini en m12-l04 (cité comme « rien » en m10-l01).
- **UML** : défini en m11-l02 (le rectangle), avant son usage en m11-l03 (`+`, `-`) et m11-l04 (flèche d'héritage). `#` et « paquetage » n'apparaissent qu'en m14-l05.
- **« classe fille »** : définie en m11-l04. `protected` n'est codé qu'en m16-l04, après `extends`.
- **Aperçus Java de m11** : ce sont des fichiers fournis, dont on ne modifie que les valeurs ; `new` et `extends` y sont marqués « tu sauras l'écrire en m12 / m16 ».
- **`public` dans `toString()`** (m13-l04) est une recette, expliquée en m14-l05 et m16-l03.
- **`static`** est écrit dès m00, m01 et m08 (cadre et méthodes, comme dans le cours, qui dit lui-même « on y reviendra ») ; il est expliqué en m15.
- **« référence »** est définie en m10-l04, avant les objets ; **« polymorphisme »** en m16-l05, avant m19-l03.
- **« générique »** est défini en m19-l05 et **« classe enveloppe »** en m19-l06 ; `Comparable<Etudiant>` en m19-l04 est un simple nom, avec renvoi.
- **[créer]** : chacun s'appuie sur des notions déjà vues.
  - m06-l07 (calculatrice) : recette `char` de m06-l06.
  - m09-l05 (initiales) : indice `""` + rappel m04-l04.
  - m10-l07 : échange au lieu de tri.
  - m16-l06 : remplacé par `trous` + [modifier].
  - m19-l08 : suppression par indice, hors du for-each.
  - Les [créer] de m03-l02, m09-l01, m09-l02, m10-l03 et m10-l05 sont précédés d'un `trous`.

### Récapitulatif des ⚠ du cours et de la leçon qui les traite
| ⚠ (slide) | Bloc | Leçon |
|---|---|---|
| p.5 : C++ « 1er compilateur normalisé ANSI » (l'origine 1979-80 est juste ; la norme date de 1998) | `ecart`, dans le dépliable « examen » | m11-l01 |
| p.20 : versions LTS (7 et 24 ne sont pas LTS ; le terme n'existait pas à l'époque de Java 7) | `ecart`, dans le dépliable « culture » | m01-l02 |
| p.24 : « maximum 247 caractères » | `ecart` | m02-l04 |
| p.28 : « portée classe » (variable d'instance, inutilisable dans `main`) | annonce m07-l07 ; `ecart` | m15-l03 |
| p.30 : « int et char non compatibles » | `ecart` | m04-l04 |
| p.31 : coquille `int x=;` (130) | `ecart` | m04-l03 |
| p.33 : « un int est un float… » (perte de précision, aussi `long` → `float` / `double`) | `ecart` | m04-l01 |
| p.36 : priorités (`* / %` avant `+ -` ; `!` ; `& ^ |`) | `ecart` | m03-l03, m06-l05 |
| p.39 : « a++ … pré-incrémentation » | `ecart` | m03-l05 |
| p.44 : `sc.nextLine().charAt(0)` (juste, sauf après `nextInt` / `nextDouble`) | `attention` | m07-l03 |
| p.53 : `div` → division entière non commentée | `attention` (pas `ecart`) | m08-l04 |
| p.54 : « La machine virtuelle analyse le type de chacun des paramètres d'appel… » (c'est le compilateur) | `ecart`, ton respectueux | m08-l06 |
| p.26 : `float pi=3.14f; double pi=3.14;` (deux variables de même nom si recopiées ensemble) | `attention`, si la slide les montre ensemble | m02-l06 |

---

## Calendrier des rappels (une question `rappel` par leçon, à partir de m03)

| Leçon | Rappel vers | Sujet |
|---|---|---|
| m03-l01 | m02-l03 | Afficher une variable avec du texte : la concaténation |
| m03-l02 | m02-l02 | Changer la valeur : l'affectation `=` |
| m03-l03 | m02-l05 | Les entiers : byte, short, int, long |
| m03-l04 | m02-l02 | Changer la valeur : l'affectation `=` |
| m03-l05 | m02-l08 | Une boîte verrouillée : final |
| m03-l06 | m02-l07 | Une lettre : le type char (et pourquoi ' ' n'est pas " ") |
| m04-l01 | m03-l01 | Les quatre opérations… et la surprise de la division |
| m04-l02 | m03-l03 | Qui calcule en premier ? La priorité |
| m04-l03 | m02-l05 | Les entiers : byte, short, int, long |
| m04-l04 | m02-l07 | Une lettre : le type char (et pourquoi ' ' n'est pas " ") |
| m04-l05 | m03-l05 | i++ ou ++i : quand l'ordre compte |
| m05-l01 | m04-l02 | Du grand au petit : le cast (transtypage) |
| m05-l02 | m02-l06 | Les nombres à virgule : double et float |
| m05-l03 | m02-l04 | Bien nommer une variable |
| m05-l04 | m03-l02 | Le reste : l'opérateur % |
| m05-l05 | m04-l01 | Du petit au grand : la conversion automatique |
| m06-l01 | m05-l03 | Lire du texte : next() ou nextLine() ? |
| m06-l02 | m03-l02 | Le reste : l'opérateur % |
| m06-l03 | m04-l02 | Du grand au petit : le cast (transtypage) |
| m06-l04 | m02-l07 | Une lettre : le type char (et pourquoi ' ' n'est pas " ") |
| m06-l05 | m03-l03 | Qui calcule en premier ? La priorité |
| m06-l06 | m05-l04 | Le piège du retour à la ligne |
| m06-l07 | m05-l02 | Lire un nombre à virgule… et les erreurs de saisie |
| m07-l01 | m06-l01 | Poser une question : comparaisons et booléens |
| m07-l02 | m06-l02 | if … else : deux chemins |
| m07-l03 | m05-l04 | Le piège du retour à la ligne |
| m07-l04 | m03-l04 | Les raccourcis : +=, -=, ++, -- |
| m07-l05 | m06-l03 | else if : plus de deux chemins |
| m07-l06 | m06-l04 | Combiner : && (ET), || (OU), ! (NON) |
| m07-l07 | m06-l06 | switch : choisir parmi des cas |
| m07-l08 | m04-l02 | Du grand au petit : le cast (transtypage) |
| m08-l01 | m06-l02 | if … else : deux chemins |
| m08-l02 | m07-l02 | for : la boucle à compteur |
| m08-l03 | m07-l04 | Accumuler : somme et compteur |
| m08-l04 | m04-l01 | Du petit au grand : la conversion automatique |
| m08-l05 | m07-l07 | Où vit une variable ? La portée |
| m08-l06 | m07-l03 | do … while : au moins une fois |
| m08-l07 | m07-l05 | Chercher le plus grand (et le plus petit) |
| m09-l01 | m08-l03 | Rendre un résultat : return |
| m09-l02 | m04-l04 | Un char est aussi un nombre |
| m09-l03 | m06-l01 | Poser une question : comparaisons et booléens |
| m09-l04 | m08-l05 | Chaque méthode a ses propres boîtes : variables locales |
| m09-l05 | m04-l04 | Un char est aussi un nombre |
| m09-l06 | m02-l03 | Afficher une variable avec du texte : la concaténation |
| m09-l07 | m05-l04 | Le piège du retour à la ligne |
| m10-l01 | m07-l02 | for : la boucle à compteur |
| m10-l02 | m09-l02 | Prendre un caractère : charAt et les indices |
| m10-l03 | m03-l01 | Les quatre opérations… et la surprise de la division |
| m10-l04 | m08-l05 | Chaque méthode a ses propres boîtes : variables locales |
| m10-l05 | m07-l06 | Une boucle dans une boucle |
| m10-l06 | m09-l06 | Texte et nombres : concaténer et convertir |
| m10-l07 | m08-l06 | Même nom, entrées différentes : la surcharge |
| m11-l01 | m10-l04 | Copier un tableau ? Le piège de la référence |
| m11-l02 | m10-l01 | Trente notes, une seule variable : créer un tableau |
| m11-l03 | m09-l03 | Comparer deux textes : equals, pas == |
| m11-l04 | m08-l06 | Même nom, entrées différentes : la surcharge |
| m11-l05 | m10-l03 | Parcourir un tableau : for et for-each |
| m12-l01 | m11-l02 | Une classe : le plan qui fabrique les objets |
| m12-l02 | m10-l04 | Copier un tableau ? Le piège de la référence |
| m12-l03 | m08-l05 | Chaque méthode a ses propres boîtes : variables locales |
| m12-l04 | m10-l01 | Trente notes, une seule variable : créer un tableau |
| m12-l05 | m08-l03 | Rendre un résultat : return |
| m12-l06 | m07-l07 | Où vit une variable ? La portée |
| m12-l07 | m10-l03 | Parcourir un tableau : for et for-each |
| m13-l01 | m12-l02 | Fabriquer un objet : new |
| m13-l02 | m12-l06 | Attribut ou variable locale ? |
| m13-l03 | m08-l06 | Même nom, entrées différentes : la surcharge |
| m13-l04 | m09-l04 | Transformer une chaîne (sans jamais la modifier) |
| m13-l05 | m12-l04 | null : la flèche qui ne pointe vers rien |
| m14-l01 | m11-l03 | L'encapsulation : ce qu'on montre, ce qu'on cache |
| m14-l02 | m08-l03 | Rendre un résultat : return |
| m14-l03 | m06-l04 | Combiner : && (ET), || (OU), ! (NON) |
| m14-l04 | m05-l01 | Demander une valeur à l'utilisateur |
| m14-l05 | m12-l05 | Le comportement : les méthodes d'instance |
| m14-l06 | m13-l02 | this : moi, l'objet en cours |
| m15-l01 | m14-l01 | Protéger les attributs : private |
| m15-l02 | m09-l06 | Texte et nombres : concaténer et convertir |
| m15-l03 | m07-l07 | Où vit une variable ? La portée |
| m15-l04 | m10-l06 | Enfin : String[] args, les arguments du programme |
| m15-l05 | m13-l03 | Plusieurs façons de naître : surcharge de constructeurs |
| m16-l01 | m15-l01 | Un attribut partagé par tous : static |
| m16-l02 | m13-l03 | Plusieurs façons de naître : surcharge de constructeurs |
| m16-l03 | m08-l06 | Même nom, entrées différentes : la surcharge |
| m16-l04 | m14-l05 | public, private, protected, rien : qui voit quoi ? |
| m16-l05 | m12-l03 | Plusieurs objets, une seule classe |
| m16-l06 | m11-l02 | Une classe : le plan qui fabrique les objets |
| m16-l07 | m13-l04 | Afficher un objet : toString() |
| m17-l01 | m02-l08 | Une boîte verrouillée : final |
| m17-l02 | m06-l06 | switch : choisir parmi des cas |
| m17-l03 | m15-l02 | Des méthodes sans objet : les méthodes static |
| m17-l04 | m09-l03 | Comparer deux textes : equals, pas == |
| m17-l05 | m09-l04 | Transformer une chaîne (sans jamais la modifier) |
| m17-l06 | m09-l06 | Texte et nombres : concaténer et convertir |
| m17-l07 | m16-l03 | Faire autrement : redéfinir une méthode (@Override) |
| m18-l01 | m10-l02 | Lire et écrire une case : indices et length |
| m18-l02 | m07-l07 | Où vit une variable ? La portée |
| m18-l03 | m06-l03 | else if : plus de deux chemins |
| m18-l04 | m14-l03 | Un setter qui dit non : garantir l'intégrité |
| m18-l05 | m16-l01 | Ne pas tout réécrire : extends |
| m18-l06 | m16-l02 | Construire la partie mère : super(…) |
| m18-l07 | m05-l04 | Le piège du retour à la ligne |
| m19-l01 | m16-l06 | Une classe qu'on n'instancie pas : abstract |
| m19-l02 | m14-l05 | public, private, protected, rien : qui voit quoi ? |
| m19-l03 | m16-l05 | Un Etudiant est une Personne : le polymorphisme |
| m19-l04 | m16-l01 | Ne pas tout réécrire : extends |
| m19-l05 | m09-l02 | Prendre un caractère : charAt et les indices |
| m19-l06 | m09-l03 | Comparer deux textes : equals, pas == |
| m19-l07 | m10-l03 | Parcourir un tableau : for et for-each |
| m19-l08 | m18-l02 | Rattraper une exception : try / catch |
| m20-l01 | m19-l07 | List et ArrayList : interface et classe d'implémentation dans la bibliothèque Java |
| m20-l02 | m14-l04 | Ranger ses classes : paquetages et import |
| m20-l03 | m18-l05 | Exceptions vérifiées : throws |
| m20-l04 | m07-l01 | while : répéter tant que |
| m20-l05 | m09-l06 | Texte et nombres : concaténer et convertir |
| m20-l06 | m18-l03 | Plusieurs catch, et finally |
| m20-l07 | m19-l07 | List et ArrayList : interface et classe d'implémentation dans la bibliothèque Java |

---

## Liste des modules et durées

| Module | Leçons | Durée totale (défis libres non comptés) |
|---|---|---|
| `m00-atelier` — Préparer ton atelier | 3 | 21 min (≈ 0,3 h) |
| `m01-premiers-pas` — Premiers pas : ton premier programme Java | 6 | 40 min (≈ 0,7 h) |
| `m02-variables-types` — Ranger des valeurs : variables et types primitifs | 9 | 59 min (≈ 1,0 h) |
| `m03-operateurs` — Calculer : les opérateurs | 6 | 41 min (≈ 0,7 h) |
| `m04-conversions` — Passer d'un type à l'autre : compatibilité et transtypage | 5 | 36 min (≈ 0,6 h) |
| `m05-clavier` — Dialoguer : lire au clavier avec Scanner | 5 | 35 min (≈ 0,6 h) |
| `m06-conditions` — Faire des choix : les conditions | 7 | 49 min (≈ 0,8 h) |
| `m07-boucles` — Répéter : les boucles | 8 | 57 min (≈ 0,9 h) |
| `m08-methodes` — Découper : les méthodes | 7 | 51 min (≈ 0,8 h) |
| `m09-chaines` — Les chaînes de caractères (String) | 7 | 48 min (≈ 0,8 h) |
| `m10-tableaux` — Les tableaux : vecteurs et matrices | 7 | 54 min (≈ 0,9 h) |
| `m11-penser-objet` — Penser objet (partie 1 du cours) | 5 | 39 min (≈ 0,7 h) |
| `m12-classes-objets` — Classes et objets en Java | 7 | 53 min (≈ 0,9 h) |
| `m13-constructeurs` — Les constructeurs | 5 | 37 min (≈ 0,6 h) |
| `m14-encapsulation` — L'encapsulation en Java : private, accesseurs, paquetages | 6 | 46 min (≈ 0,8 h) |
| `m15-static` — Ce qui appartient à la classe : static | 5 | 36 min (≈ 0,6 h) |
| `m16-heritage` — L'héritage | 7 | 53 min (≈ 0,9 h) |
| `m17-enums-dates` — Énumérations et dates | 7 | 49 min (≈ 0,8 h) |
| `m18-exceptions` — Les exceptions | 7 | 49 min (≈ 0,8 h) |
| `m19-interfaces` — Interfaces et classes d'implémentation | 8 | 56 min (≈ 0,9 h) |
| `m20-jdbc` — (Optionnel) Connexion à une base de données : JDBC | 7 | 54 min (≈ 0,9 h) |
| **Total** | **134** | **963 min (≈ 16,1 h)** |
