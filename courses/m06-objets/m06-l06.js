JR.lecon({
  id: "m06-l06",
  titre: "Pour aller plus loin : exceptions, interfaces, et la suite",
  duree: 7,
  objectif: "Découvrir en aperçu deux outils que tu croiseras vite, comprendre tout le cadre, et voir la suite du chemin.",
  sections: [
    {
      titre: "Une leçon d'ouverture",
      blocs: [
        { type: "pourquoi", html: "Tu as les bases. Cette dernière leçon est un <strong>aperçu</strong> : rien n'est à maîtriser ce soir." },
        { type: "erreur", run: "erreur-execution", code: "int zero = 0;\nSystem.out.println(10 / zero);\nSystem.out.println(\"Fin\");", message: "Exception in thread \"main\" java.lang.ArithmeticException: / by zero", explication: "Traduction : « exception dans main : erreur arithmétique, division par zéro ». Le programme compile, mais s'arrête en route : « Fin » ne s'affiche jamais (comme avec <code>InputMismatchException</code>, au module 3)." }
      ]
    },
    {
      titre: "Les exceptions : un filet de sécurité",
      blocs: [
        { type: "illus", ascii: "      try { le numéro risqué }\n               │\n          ça rate ?\n         ╱         ╲\n       non          oui\n        │            ▼\n        │   ~~~~~~~~~~~~~~~~~~~\n        │   catch : le filet\n        ▼            ▼\n      le spectacle continue", legende: "Le trapéziste tente son numéro au-dessus d'un filet : s'il tombe, le spectacle continue." },
        { type: "texte", html: "Une <strong>exception</strong> est un objet qui décrit un problème survenu à l'exécution. <code>try</code> entoure le code risqué ; <code>catch</code> <strong>rattrape</strong> l'exception au lieu de laisser le programme s'arrêter." },
        { type: "code", code: "int zero = 0;\ntry {\n    System.out.println(10 / zero);\n} catch (ArithmeticException ex) {\n    System.out.println(\"Division par zéro : \" + ex.getMessage());\n}\nSystem.out.println(\"Fin\");", sortie: "Division par zéro : / by zero\nFin", lignes: [null, "On tente le code risqué.", "La division par zéro lance une ArithmeticException.", "Le filet : il rattrape ce type d'exception, rangée dans ex.", "ex est un objet : getMessage() rend son message.", null, "Le programme continue normalement."] },
        { type: "attention", html: "Un <code>catch</code> vide avale l'erreur sans rien dire. Affiche toujours au moins un message." }
      ]
    },
    {
      titre: "Les interfaces : un contrat",
      blocs: [
        { type: "texte", html: "Une <strong>interface</strong> est un <strong>contrat</strong> : une liste de méthodes promises, sans leur code. Une classe signe le contrat avec <code>implements</code> ; elle doit alors fournir chacune de ces méthodes, en <code>public</code>." },
        { type: "code", run: "fichier", copier: false, code: "interface Affichable {\n    void afficherFiche();\n}\n\nclass Etudiant implements Affichable {\n    public void afficherFiche() {\n        System.out.println(\"Fiche : Adama SECK\");\n    }\n}", lignes: ["Le contrat Affichable…", "…promet une méthode afficherFiche(), sans dire comment.", null, null, "Etudiant signe le contrat.", "Il tient sa promesse : il fournit la méthode, en public.", null, null, null] },
        { type: "texte", html: "Un <code>Enseignant</code> pourrait signer le même contrat, avec sa propre fiche." },
        { type: "quiz", question: "À quoi sert une interface ?", options: [
          { t: "À dessiner la fenêtre d'un programme", pourquoi: "Non : ici, « interface » ne veut pas dire écran. C'est un contrat entre classes." },
          { t: "À promettre des méthodes que les classes signataires devront fournir", ok: true, pourquoi: "Exact : un contrat, signé avec <code>implements</code>." },
          { t: "À rattraper les erreurs d'exécution", pourquoi: "Non : ça, c'est le rôle de <code>try/catch</code>." }
        ] },
        { type: "depliable", genre: "plus", titre: "Autres erreurs fréquentes", blocs: [
            { type: "erreur", run: "erreur-fichier", code: "interface Affichable {\n    void afficherFiche();\n}\n\nclass Etudiant implements Affichable {\n    void afficherFiche() {\n        System.out.println(\"Fiche\");\n    }\n}", message: "error: afficherFiche() in Etudiant cannot implement afficherFiche() in Affichable", explication: "Traduction : « afficherFiche() dans Etudiant ne peut pas réaliser afficherFiche() de Affichable ». Les méthodes d'une interface sont publiques : la classe doit les fournir en <code>public</code>." }
        ] }
      ]
    },
    {
      titre: "Le cadre, enfin tout vert",
      blocs: [
        { type: "texte", html: "Il restait <code>String[] args</code>. <code>args</code> reçoit les mots tapés au lancement du programme, après son nom. <code>[]</code> veut dire « plusieurs cases » : c'est un <strong>tableau</strong> de textes, une notion à découvrir ensuite. En ligne, tu n'en as pas besoin ; sur ton ordinateur : <code>java Main Awa</code>." },
        { type: "cadre", connus: ["public", "class", "static", "void", "main", "String[]", "args"], html: "Tu comprends chaque mot de la ligne recopiée au premier jour." },
        { type: "depliable", genre: "examen", titre: "L'exécution paramétrée (slide 22)", blocs: [
          { type: "code", run: "aucun", code: "System.out.println(args[0] + \" \" + args[1]);", titre: "Dans le main de la classe Test" },
          { type: "code", run: "aucun", code: "java Test Mamadou SOW", titre: "Dans le terminal", sortie: "Mamadou SOW" },
          { type: "texte", html: "<code>args[0]</code> est la première case (on compte à partir de 0) : elle vaut <code>\"Mamadou\"</code> ; <code>args[1]</code> vaut <code>\"SOW\"</code>." }
        ] }
      ]
    },
    {
      titre: "La suite du chemin",
      blocs: [
        { type: "illus", ascii: " ● tu es ici : les bases\n │\n ├─▶ tableaux : ranger 30 notes\n ├─▶ String : equals au lieu de ==\n ├─▶ ArrayList : une liste qui grandit\n ├─▶ enum : des valeurs fixes\n ├─▶ dates : LocalDate\n ├─▶ exceptions vérifiées : throws\n └─▶ JDBC : les bases de données", legende: "Chaque nouvelle notion se construit sur ce que tu sais déjà." },
        { type: "cle", html: "Tu sais écrire un programme Java, le découper en méthodes et le penser en objets : la base de tout le reste." }
      ]
    }
  ],
  retenir: [
    "<code>try { … } catch (…) { … }</code> rattrape une erreur d'exécution au lieu d'arrêter le programme.",
    "Une interface est un contrat : la classe qui l'<code>implements</code> fournit ses méthodes, en <code>public</code>.",
    "Tu as les bases : la suite se construit dessus."
  ],
  test: [
    { type: "predire", code: "int zero = 0;\ntry {\n    System.out.println(\"A\");\n    System.out.println(5 / zero);\n    System.out.println(\"B\");\n} catch (ArithmeticException ex) {\n    System.out.println(\"C\");\n}", reponse: "A\nC", explication: "A s'affiche, puis la division par zéro saute dans le <code>catch</code> : pas de B, mais C." },
    { type: "predire", rappel: "m04-l01", code: "double moyenne = 17;\nif (moyenne >= 10) {\n    System.out.println(\"Passable\");\n} else if (moyenne >= 16) {\n    System.out.println(\"Très bien\");\n}", reponse: "Passable", explication: "Le premier test vrai l'emporte : <code>17 >= 10</code> est vrai, donc le <code>else if</code> n'est jamais regardé. Il fallait tester <code>>= 16</code> d'abord." }
  ]
});
