# Source : cours « Programmation orientée-objet : Java » — Pr. Samba DIAW (ESP-UCAD, Dépt Génie Informatique)

Transcription fidèle des deux PDF fournis par l'étudiant. Les numéros (p.) sont ceux des slides.
Les ⚠ signalent une erreur ou imprécision du support, à corriger ET signaler dans le site (encadré « Le cours dit… / En réalité… »).

## Sommaire officiel du cours
1. Présentation de l'approche objet : histoire de la POO, notion d'objet, notion de classe, encapsulation
2. Codage en Java : Introduction · Variable et types primitifs · La méthode principale (main) · Les opérateurs · Les classes · Structures de contrôle · Chaînes de caractères · Le type Date · Tableaux (vecteurs et matrices) · Les énumérations · Interface et classe d'implémentation · Les exceptions · Connexion JDBC

Les PDF fournis couvrent : partie 1 (approche objet) + partie 2 jusqu'à la classe Scanner.
Classes en Java, chaînes, dates, tableaux, énumérations, interfaces, exceptions, JDBC : PAS dans les PDF → rédigés d'après la progression classique, avec une note « à vérifier avec le support officiel ».

## PARTIE 1 — Approche objet
- p3 Intro : écrire un programme = coder dans un langage ; les programmes s'appuient sur des données et sur la logique ; le programmeur dit à l'ordinateur quoi faire et comment.
- p5 Histoire : 1967 Simula (1er à implémenter le type abstrait via des classes) ; 1976 Smalltalk (encapsulation, agrégation, héritage via classes, associations, hiérarchies de classes, messages entre objets) ; 1980 C++ (« 1er compilateur normalisé par l'ANSI » ⚠ la norme ANSI/ISO de C++ date de 1998 ; C++ apparaît vers 1983–85) ; puis Eiffel, Objective C, Loops, Java, Python, Ruby, C#.
- p7 Objet : « représentation abstraite d'une entité du monde réel ou virtuel ». Objet = État + Comportement + Identité.
  - État : valeurs instantanées de tous les attributs (ex. un Etudiant : NumEtudiant=201506SRG, Prénom=Adama, Nom=SECK, Age=22).
  - Comportement : les compétences de l'objet (services proposés).
  - Identité : permet de distinguer sans ambiguïté deux objets qui ont le même état.
- p8 Classe : décrit une abstraction d'objets ayant 1) une sémantique commune 2) des propriétés similaires 3) un comportement commun 4) des relations identiques avec les autres objets. Ex : Etudiant, Filière, Cours.
- p9 : un objet créé par une classe = instance de cette classe. Généralités dans la classe, particularités dans les objets. Instanciation. Classe concrète (instanciable) / classe abstraite (non instanciable).
- p10 UML : rectangle à 3 compartiments (nom / attributs / opérations), compartiments supprimables. Ex. Voiture (Marque:String, Type:String, Vitesse:int, Vitesse max:int ; Démarrer(), Accélérer(), Freiner()) ; Ascenseur (Monter(), Descendre()).
- p11 Encapsulation : masquer les détails d'implémentation en définissant une interface (vue externe, services offerts). Garantit l'intégrité des données en restreignant l'accès direct aux attributs. Partie visible / partie masquée.
- p12-13 Visibilité UML : + public, # protégé, - privé, rien = paquetage.
  - privé : visible seulement dans la classe.
  - paquetage : visible dans toutes les classes du même paquetage.
  - protégé : visible dans les classes du même paquetage ET dans les classes filles.
  - public : visible partout (« revient à se passer de l'encapsulation »).
  - Ex : Salarié (+nom:String, #age:int, -salaire:int ; +donnerSalaire(), #changerSalaire(), -calculerPrime()).
- p14 Illustration : paquetage Production contient Employe (+nom, #prénom, -salaire ; +calculerSalaire(), #changerSalaire(), -calculerPrime()) et Département (-nomDep, locali ; +getNomDep(), +setNomDep(String)). Hors paquetage : Ouvrier et Technicien héritent d'Employe ; Ingénieur (Profil, getProfil()) n'hérite pas.
- p15 Hiérarchies : généralisation/spécialisation. Personne (abstraite, racine) → Etudiant, Enseignant, Technicien ; Etudiant → Doctorant, Primo-entrant (concrètes).

## PARTIE 2 — Codage en Java
- p19 Intro : Java = langage orienté objet multi-plateforme ; syntaxe inspirée du C ; sensible à la casse ; blocs entre {} ; chaque instruction finit par ; ; une instruction peut tenir sur plusieurs lignes.
- p20 Historique : créé 1994/1995 par SUN ; initialement pour des programmes interactifs sur le Web ; libre (GPL) depuis nov. 2006 ; racheté par Oracle en 2010 (rachat de Sun) ; « Versions LTS actuelles : 7, 8, 11 & 17, … 24, 25 » ⚠ les LTS sont 8, 11, 17, 21, 25 (7 et 24 ne sont pas LTS).
- p21 Structure : tout code dans une classe ; description dans un bloc { } ; fichier de même nom que la classe (casse comprise) HelloWorld.java ; point d'entrée main. Exemple : while (i<5) println("Hello World !"). Compilation `javac HelloWorld.java` → HelloWorld.class ; exécution `java HelloWorld`.
- p22 Exécution paramétrée : `System.out.println(args[0] + " " + args[1]);` ; `java Test Mamadou SOW` → « Mamadou SOW ».
- p24 Variable : « boîte qui contient une donnée » ; « maximum 247 caractères » ⚠ (Java n'impose pas de limite) ; lettres, chiffres, _ et $ ; ne commence pas par un chiffre ; pas un mot réservé ; décrite par nom + type ; nom explicite. Ex : `int nombre; long _x1; String $test;`
- p25 Types primitifs : boolean ; entiers sur n bits min=-2^(n-1), max=2^(n-1)-1 : byte 8 bits (-128..127), short 16, int 32, long 64 ; réels float (simple précision), double (double) ; char unicode 16 bits.
- p26 Déclaration `Type nom;` Ex : int var1=20; short ligne=40; char c='A'; float pi=3.14f; double pi=3.14; déclaration multiple int x, y, z;
- p27-28 Portée : ensemble des instructions où la variable existe ; finit à la fin du bloc } ; variable non déclarée → erreur de compilation. Exemple : classe Portée { int x=20; // « portée classe, utilisable dans toutes les fonctions de la classe » ⚠ (x est une variable d'instance : main, qui est static, ne peut pas l'utiliser directement) ; main { int i=0 (portée fonction) ; while { int j=5 (portée bloc) } ; println(j) // erreur } ; int s=x+i; // erreur i hors portée }.
- p29 Affectation : nom = expression ; variable utilisée sans être initialisée → erreur de compilation. Ex : `int x, y; int somme = x + y;` (erreur, variables locales non initialisées).
- p30 Compatibilité : type A compatible avec B si plage A ⊂ plage B. « char c='2'; int x=c; int et char non compatibles » ⚠ FAUX : char→int est un élargissement implicite, x vaut 50 (code de '2'). byte x=128 erreur ; byte x=-129 erreur. Cast : (type) expression ; int x = 2.4 erreur → int x = (int) 2.4;
- p31 : int→long OK ; long y=20; int z=y; erreur → (int) y ; hiérarchie byte→short→int→long→float→double ; int x=127; (byte)x → 127 ; « int x=; byte y=(byte)x → -126 » ⚠ coquille : int x = 130 ; 130 = 1 0000010 → -128+2 = -126.
- p32 Casting : cas 1 127→127 ; cas 2 -125→-125 ; cas 3 130→-126 ; cas 4 -129→127.
- p33 : int→float et int→double : cast optionnel « car un int est un float qui lui-même est un double » ⚠ imprécis : conversion implicite autorisée, mais int→float peut perdre de la précision (au-delà de 2^24). double→int : cast obligatoire, troncature : (int)1.23 → 1 ; (int)2.9999999 → 2.
- p34 Affichage : System.out.println(nombre);
- p35 Opérateurs : arithmétiques + * / - % ; assignation = += -= ; comparaison < > <= >= == != ; bit à bit & ^ | ; logiques && || ! ; ++ -- ; ternaire x = condition ? b : c.
- p36 Priorité (selon le cours) : () ; ++ ; -- ; * / % + - ; comparaison ; bit à bit ^ & | ; logiques && || ! ; affectation. ⚠ ! est unaire et a une priorité haute (avec ++ --), pas au niveau de && || ; * / % passent avant + - ; & avant ^ avant |.
- p37 ++ : post-fixé int i=2; int j=i++; → j=2, i=3 ; pré-fixé j=++i → i=3, j=3.
- p38 Exemple 1 : a=5,b=10 ; c = a++ + b ; → a=6, b=10, c=15.
- p39 Exemple 2 : c = ++a + b → a=6, b=10, c=16 ; ⚠ le texte dit « L'opérateur a++ est un opérateur de pré-incrémentation » : il s'agit de ++a.
- p41 Structures : boucles for, while, do…while ; branchements if, switch.
- p42 for : factorielle de 4 : fact=1; for(i=1;i<=4;i++) fact=fact*i; → 24.
- p43 while : reste de 10 par 3 par soustractions successives → 1.
- p44 while + Scanner : tant que reponse=='O', demander un prénom, afficher « Bonjour X, comment vas-tu ? », redemander (O/N) via sc.nextLine().charAt(0).
- p45 do…while : somme des 5 premiers entiers → 15.
- p46 if : b=-4 ; if b>0 « strictement positive » ; else if b<=-5 « entre -∞ et -5 fermé » ; else « entre -5 ouvert et 0 fermé ».
- p47 switch sur char sexe='F' : case 'M' Masculin break ; case 'F' Féminin break ; default Erreur.
- p49 Fonctions : `public static type_retour nom(type1 nom1, …) { code }` ; public = portée, static : « on y reviendra ».
- p50 : les arguments fonctionnent comme des variables initialisées à l'appel ; return; met fin ; return(expression); retourne la valeur ; obligatoire si type ≠ void.
- p51 : plus(int a,int b) { int r=0; r=a+b; return(r); } appelée par y=plus(x,7) → 10.
- p52 : affiche(String mess) { if (mess==null) return; println(mess); }
- p53 : int mul(int a,int b){ float r; r=a*b; return r; } erreur (float→int) ; solutions : retour float, cast (int), ou r en int. float div(int a,int b){ if(b==0) return -1; return a/b; } ⚠ piège non signalé : a/b est une division ENTIÈRE (7/2 → 3, renvoyé 3.0).
- p54 Surcharge : même nom, même classe, signatures différentes ; c'est la signature de l'appel qui choisit (⚠ le choix est fait par le COMPILATEUR, pas par la machine virtuelle).
- p55-56 : plus(int,int) et plus(int,int,int) OK ; redéclarer plus(int a,int b) → erreur (même signature) ; plus(4) → erreur (signature inexistante).
- p57 : main appelle plus(8,5,1) → 14.
- p58 Scanner : import java.util.Scanner ; new Scanner(System.in) ; nextLine() (chaîne avec espaces), next() (mot sans espace), nextInt(), nextFloat(), nextDouble() ; pas de méthode pour char.
- p59 : next() lit jusqu'à l'espace et laisse le curseur sur la ligne ; avant nextLine() après next()/nextInt() il faut un sc.nextLine() « pour consommer le retour à la ligne » ; sc.close().
