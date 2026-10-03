JR.lecon({
  id: "m05-l01",
  titre: "Créer ta méthode",
  duree: 7,
  objectif: "Écrire un bloc de code une seule fois, et le lancer autant de fois que tu veux.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Dans la fiche d'Adama, la même ligne de tirets revient trois fois. Pour la changer, il faut corriger trois endroits." },
        { type: "code", code: "System.out.println(\"----------\");\nSystem.out.println(\"Adama SECK\");\nSystem.out.println(\"----------\");\nSystem.out.println(\"Moyenne : 14.0\");\nSystem.out.println(\"----------\");", sortie: "----------\nAdama SECK\n----------\nMoyenne : 14.0\n----------" }
      ]
    },
    {
      titre: "Une méthode, c'est une machine",
      blocs: [
        { type: "texte", html: "Une <strong>méthode</strong> (le cours dit « fonction ») est un bloc de code qui porte un nom. On l'écrit une fois : c'est la <strong>définition</strong>. On la lance en écrivant son nom : c'est l'<strong>appel</strong>." },
        { type: "illus", ascii: "   main\n    │  afficherLigne();   ◀ l'appel\n    │\n    └──────▶ ┌───────────────┐\n             │ afficherLigne │\n             │ affiche ----- │\n    ┌─────── └───────────────┘\n    │\n    ▼  main reprend à la ligne suivante", legende: "Appeler, c'est appuyer sur le bouton de la machine : l'exécution saute dans la méthode, puis revient." }
      ]
    },
    {
      titre: "Où l'écrire ?",
      blocs: [
        { type: "code", run: "fichier", code: "public class Main {\n    public static void afficherLigne() {\n        System.out.println(\"----------\");\n    }\n\n    public static void main(String[] args) {\n        afficherLigne();\n        System.out.println(\"Adama SECK\");\n        afficherLigne();\n    }\n}", sortie: "----------\nAdama SECK\n----------", lignes: [null, "La définition, dans la classe : public static void, le nom, puis ().", "Ce que fait la machine.", "Fin de la méthode.", null, "main, à côté de la méthode : jamais l'une dans l'autre.", "Appel : on saute dans afficherLigne, puis on revient ici.", null, "Deuxième appel : la même machine, relancée.", null, null] },
        { type: "quiz", question: "Tu veux ajouter une méthode <code>afficherTitre()</code>. Où l'écris-tu ?", options: [
          { t: "Dans <code>main</code>, entre deux instructions", pourquoi: "Non : une méthode ne s'écrit jamais dans une autre méthode." },
          { t: "Dans la classe <code>Main</code>, au-dessus ou en dessous de <code>main</code>", ok: true, pourquoi: "Oui : les méthodes sont côte à côte dans la classe, dans l'ordre que tu veux." },
          { t: "Après la dernière <code>}</code> du fichier", pourquoi: "Non : tout code est dans une classe." }
        ] }
      ]
    },
    {
      titre: "Définir n'est pas appeler",
      blocs: [
        { type: "trace", lignes: ["public static void bonjour() {", "    System.out.println(\"Bonjour\");", "}", "public static void main(String[] args) {", "    System.out.println(\"Début\");", "    bonjour();", "    System.out.println(\"Fin\");", "}"], etapes: [
          { ligne: 4, note: "Le programme démarre dans main, pas en haut du fichier.", sortie: "Début" },
          { ligne: 5, note: "Appel : on saute dans bonjour." },
          { ligne: 1, note: "On exécute le corps de bonjour.", sortie: "Bonjour" },
          { ligne: 6, note: "Retour dans main, juste après l'appel.", sortie: "Fin" }
        ] },
        { type: "simple", html: "<p>Définir une méthode, c'est écrire une recette dans ton cahier : tant que personne ne cuisine, rien ne sort du four. Appeler, c'est cuisiner la recette, aussi souvent que tu veux.</p>" }
      ]
    },
    {
      titre: "L'erreur fréquente, et le cadre",
      blocs: [
        { type: "erreur", run: "erreur-classe", code: "public static void main(String[] args) {\n    public static void afficherLigne() {\n        System.out.println(\"----------\");\n    }\n}", message: "error: illegal start of expression", explication: "Traduction : « début d'expression interdit ». La méthode est écrite <em>dans</em> <code>main</code>. Sors-la, et place-la à côté.", correction: "public static void afficherLigne() {\n    System.out.println(\"----------\");\n}\npublic static void main(String[] args) {\n    afficherLigne();\n}" },
        { type: "texte", html: "Regarde la ligne <code>public static void main(…)</code> : c'est la même forme que ta méthode. <code>main</code> <strong>est une méthode</strong> : la <strong>méthode principale</strong>, celle que Java appelle en premier." },
        { type: "cadre", connus: ["main", "static", "void"], html: "<code>void</code> (« vide ») : la méthode ne rend aucun résultat. <code>static</code>, pour l'instant : on l'appelle directement, sans rien fabriquer avant (la suite en m06). <code>public</code> : on y reviendra." },
        { type: "trous", run: "classe", question: "Complète pour définir <code>afficherTitre</code>, puis l'appeler.", code: "public static ___ afficherTitre() {\n    System.out.println(\"FICHE ÉTUDIANT\");\n}\npublic static void main(String[] args) {\n    ___;\n}", reponses: [["void"], ["afficherTitre()"]], explication: "<code>void</code> car la méthode ne rend rien ; l'appel : le nom, <code>()</code>, puis <code>;</code>.", sortie: "FICHE ÉTUDIANT" }
      ]
    }
  ],
  retenir: [
    "Une méthode = un bloc de code nommé, écrit dans la classe, à côté de <code>main</code>.",
    "On la définit une fois, on l'appelle autant de fois qu'on veut.",
    "<code>void</code> = ne rend aucun résultat ; <code>main</code> est aussi une méthode."
  ],
  test: [
    { type: "quiz", question: "La méthode <code>saluer()</code> est définie, mais <code>main</code> ne l'appelle jamais. Que se passe-t-il ?", options: [
      { t: "Elle s'exécute quand même, au début", pourquoi: "Non : le programme démarre dans <code>main</code>." },
      { t: "Elle ne s'exécute jamais", ok: true, pourquoi: "Exact : une recette écrite mais jamais cuisinée ne produit rien." },
      { t: "Java refuse de compiler", pourquoi: "Non : une méthode non appelée est permise." }
    ] },
    { type: "predire", rappel: "m04-l04", run: "classe", code: "public static void point() {\n    System.out.print(\".\");\n}\npublic static void main(String[] args) {\n    for (int i = 0; i < 3; i++) {\n        point();\n    }\n}", reponse: "...", explication: "La boucle fait 3 tours (i vaut 0, 1, 2) : 3 appels, et <code>print</code> ne va pas à la ligne." }
  ]
});
