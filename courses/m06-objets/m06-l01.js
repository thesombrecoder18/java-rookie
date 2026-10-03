JR.lecon({
  id: "m06-l01",
  titre: "Penser objet : état, comportement, identité",
  duree: 7,
  objectif: "Voir un programme comme un ensemble d'objets, chacun avec ses données et ce qu'il sait faire.",
  sections: [
    {
      titre: "Échauffement, puis le problème",
      blocs: [
        { type: "quiz", rappel: "m05-l02", question: "Une méthode <code>moyenne(…)</code> doit fournir un résultat que <code>main</code> réutilisera dans un calcul. Elle doit…", options: [
          { t: "faire <code>System.out.println</code> du résultat", pourquoi: "Afficher écrit à l'écran, mais <code>main</code> ne récupère rien." },
          { t: "faire <code>return</code> du résultat", ok: true, pourquoi: "Exact : <code>return</code> rend la valeur à celui qui appelle." }
        ] },
        { type: "pourquoi", html: "Pour 30 étudiants, faut-il écrire <code>nom1</code>, <code>age1</code>, <code>nom2</code>, <code>age2</code>… jusqu'à 30 ?" },
        { type: "code", code: "String nom1 = \"Adama SECK\";\nint age1 = 22;\nString nom2 = \"Fatou DIOP\";\nint age2 = 20;\n// … et ainsi de suite, 30 fois", lignes: ["Les données d'Adama…", "…éparpillées dans des variables sans lien entre elles.", "Un deuxième étudiant : deux nouvelles variables.", null, "Rien ne dit que nom1 et age1 vont ensemble."] },
        { type: "texte", html: "Mieux : <strong>un dossier par étudiant</strong>. C'est l'idée de la <strong>programmation orientée objet</strong> (POO) : regrouper les données et les opérations." }
      ]
    },
    {
      titre: "Un objet : état, comportement, identité",
      blocs: [
        { type: "cours", html: "Un objet est une représentation abstraite d'une entité du monde réel ou virtuel.<br>Objet = État + Comportement + Identité.", ref: "slide 7" },
        { type: "illus", ascii: "   identité : un objet unique, à part\n  ┌──────────────────┬───────────────┐\n  │ ÉTAT             │ COMPORTEMENT  │\n  │ NumEtudiant :    │ [afficher]    │\n  │   201506SRG      │ [s'inscrire]  │\n  │ Prénom : Adama   │               │\n  │ Nom : SECK       │               │\n  │ Age : 22         │               │\n  └──────────────────┴───────────────┘", legende: "L'objet Adama (slide 7) : son état à gauche, ses boutons à droite." },
        { type: "texte", html: "<strong>État</strong> : les valeurs de ses <strong>attributs</strong>. <strong>Comportement</strong> : ses <strong>opérations</strong> (en Java, des méthodes). <strong>Identité</strong> : ce qui le distingue de tout autre objet, même au même état." },
        { type: "quiz", question: "Pour un objet <em>téléphone</em>, « appeler un numéro », c'est…", options: [
          { t: "de l'état", pourquoi: "Non : ce n'est pas une valeur, c'est quelque chose qu'il fait." },
          { t: "du comportement", ok: true, pourquoi: "Exact : une opération. Son niveau de batterie, lui, est de l'état." }
        ] }
      ]
    },
    {
      titre: "La classe : le plan",
      blocs: [
        { type: "illus", ascii: "        ┌─────────────────┐\n        │ PLAN : Etudiant │  la classe\n        └────────┬────────┘\n    ┌────────────┼───────────┐\n    ▼            ▼           ▼\n ┌───────┐   ┌───────┐  ┌────────┐\n │ Adama │   │ Fatou │  │ Moussa │\n └───────┘   └───────┘  └────────┘\n   les objets (instances de Etudiant)", legende: "Un seul plan, trois étudiants construits d'après lui." },
        { type: "texte", html: "La <strong>classe</strong> est le plan ; chaque objet construit d'après elle est une <strong>instance</strong>. On ne dit donc pas « la classe Adama » : Adama est une instance de la classe <code>Etudiant</code>." },
        { type: "simple", html: "<p>Deux jumeaux ont la même taille et portent les mêmes habits : même état. Ce sont pourtant deux personnes, chacune avec son acte de naissance. C'est l'identité.</p>" },
        { type: "depliable", genre: "examen", titre: "Dans les mots du cours (slides 8-9)", blocs: [
          { type: "cours", html: "Une classe décrit une abstraction d'objets ayant une sémantique commune, des propriétés similaires, un comportement commun et des relations identiques avec les autres objets. Un objet créé par une classe est une instance de cette classe.", ref: "slides 8-9" }
        ] },
        { type: "quiz", question: "« Voiture », c'est…", options: [
          { t: "une classe", ok: true, pourquoi: "Exact : le plan commun à toutes les voitures." },
          { t: "une instance", pourquoi: "Non : une instance serait une voiture précise." }
        ] }
      ]
    },
    {
      titre: "Dessiner une classe en UML",
      blocs: [
        { type: "texte", html: "En <strong>UML</strong> (une façon standard de dessiner), une classe est un rectangle à trois compartiments (slide 10)." },
        { type: "illus", ascii: "  ┌──────────────────────┐\n  │       Voiture        │ ◀ nom\n  ├──────────────────────┤\n  │ marque : String      │\n  │ vitesse : int        │ ◀ attributs\n  ├──────────────────────┤\n  │ demarrer()           │\n  │ accelerer()          │ ◀ opérations\n  │ freiner()            │\n  └──────────────────────┘", legende: "La classe Voiture du cours, en UML." },
        { type: "depliable", genre: "culture", titre: "Un peu d'histoire", blocs: [
          { type: "texte", html: "Simula (1967) introduit les classes et l'héritage ; Smalltalk (1976) en fait un langage tout objet (encapsulation, messages entre objets) ; puis viennent C++, Eiffel, Objective C, Java (1995), Python, Ruby, C#." },
          { type: "ecart", dit: "C++ (1980) : « 1er compilateur normalisé par l'ANSI » (slide 5).", vrai: "L'ancêtre de C++ date bien de 1979-1980, mais la première norme ISO/ANSI de C++ date de <strong>1998</strong>." }
        ] }
      ]
    }
  ],
  retenir: [
    "Un objet = un état (ses attributs) + un comportement (ses opérations) + une identité.",
    "La classe est le plan ; un objet construit d'après elle est une instance.",
    "En UML : un rectangle avec le nom, les attributs, les opérations."
  ],
  test: [
    { type: "quiz", question: "Deux bouteilles d'eau identiques, même marque, même volume. Combien d'objets ?", options: [
      { t: "Un seul, puisque leur état est le même", pourquoi: "Même état ne veut pas dire même objet." },
      { t: "Deux", ok: true, pourquoi: "Exact : l'identité distingue deux objets, même quand leur état est identique." }
    ] },
    { type: "quiz", rappel: "m05-l01", question: "Une méthode <code>afficherLigne()</code> est définie dans la classe, mais <code>main</code> ne l'appelle pas. Elle…", options: [
      { t: "ne s'exécute jamais", ok: true, pourquoi: "Exact : définir, c'est écrire la recette ; seul l'appel la fait tourner." },
      { t: "s'exécute une fois, au démarrage", pourquoi: "Non : le programme démarre dans <code>main</code>." }
    ] }
  ]
});
