JR.lecon({
  id: "m05-l02",
  titre: "Paramètres et return",
  duree: 7,
  objectif: "Donner des valeurs à une méthode, et récupérer le résultat qu'elle calcule.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "<code>afficherLigne()</code> fait toujours la même chose. Il faut une machine qui reçoit des valeurs, et qui rend un résultat réutilisable." },
        { type: "illus", ascii: "      3        7       ◀ ce qu'on donne\n      │        │\n      ▼        ▼\n   ┌──────────────────┐\n   │   plus(a, b)     │\n   │   r = a + b      │\n   └────────┬─────────┘\n            ▼\n           10           ◀ ce qu'elle rend", legende: "Des entrées par le haut (les paramètres), une sortie par le bas (return)." }
      ]
    },
    {
      titre: "Les paramètres : la fente d'entrée",
      blocs: [
        { type: "texte", html: "Un <strong>paramètre</strong> est une variable déclarée entre les parenthèses de la définition. Elle est remplie à l'appel avec la valeur donnée : l'<strong>argument</strong>." },
        { type: "code", run: "classe", code: "public static void saluer(String prenom) {\n    System.out.println(\"Bonjour \" + prenom);\n}\npublic static void main(String[] args) {\n    saluer(\"Adama\");\n    saluer(\"Fatou\");\n}", sortie: "Bonjour Adama\nBonjour Fatou", lignes: ["prenom est le paramètre : une boîte String, remplie à chaque appel.", "La méthode l'utilise comme n'importe quelle variable.", null, null, "\"Adama\" est l'argument : il est rangé dans prenom.", "Nouvel appel : prenom vaut \"Fatou\".", null] }
      ]
    },
    {
      titre: "return : la sortie de la machine",
      blocs: [
        { type: "texte", html: "Pour rendre un résultat, on remplace <code>void</code> par le <strong>type de retour</strong> (le type du résultat), et on écrit <code>return valeur;</code> : la méthode renvoie cette valeur et s'arrête." },
        { type: "code", run: "classe", code: "public static int plus(int a, int b) {\n    int r = a + b;\n    return r;\n}\npublic static void main(String[] args) {\n    int y = plus(3, 7);\n    System.out.println(y);\n}", sortie: "10", lignes: ["int avant le nom : la méthode rend un entier.", null, "On renvoie r.", null, null, "L'appel plus(3, 7) est remplacé par son résultat, 10.", null, null] },
        { type: "compare", gauche: { titre: "Afficher (println)", html: "Écrit à l'écran. Le programme ne peut plus rien faire de la valeur." }, droite: { titre: "Rendre (return)", html: "Donne la valeur à celui qui appelle : il peut la ranger, calculer, afficher." }, conclusion: "Une méthode qui calcule <strong>rend</strong> ; c'est <code>main</code> qui affiche." },
        { type: "attention", html: "Les paramètres et <code>r</code> sont des <strong>variables locales</strong> : elles n'existent que pendant l'appel. <code>main</code> ne voit pas <code>r</code> ; il utilise ce que la méthode a rendu." },
        { type: "predire", run: "classe", code: "public static int plus(int a, int b) {\n    return a + b;\n}\npublic static void main(String[] args) {\n    System.out.println(plus(plus(1, 2), 3));\n}", reponse: "6", explication: "D'abord l'appel intérieur : <code>plus(1, 2)</code> rend 3. Puis <code>plus(3, 3)</code> rend 6." }
      ]
    },
    {
      titre: "L'erreur à reconnaître",
      blocs: [
        { type: "erreur", run: "erreur-classe", code: "public static int maximum(int a, int b) {\n    if (a > b) {\n        return a;\n    }\n}", message: "error: missing return statement", explication: "Traduction : « instruction return manquante ». Si <code>a</code> n'est pas le plus grand, la méthode arrive au bout sans rien rendre. Elle a promis un <code>int</code> : chaque chemin doit finir par un <code>return</code>.", correction: "public static int maximum(int a, int b) {\n    if (a > b) {\n        return a;\n    }\n    return b;\n}" },
        { type: "depliable", genre: "plus", titre: "Autres erreurs fréquentes", blocs: [
          { type: "erreur", run: "erreur-classe", code: "public static void afficherLigne() {\n    System.out.println(\"----------\");\n}\npublic static void main(String[] args) {\n    int x = afficherLigne();\n}", message: "error: incompatible types: void cannot be converted to int", explication: "Traduction : « types incompatibles : void ne peut pas être converti en int ». <code>void</code> ne rend rien : il n'y a rien à ranger dans <code>x</code>." }
        ] },
        { type: "depliable", genre: "examen", titre: "Dans les mots du cours (slides 49 à 53)", blocs: [
          { type: "cours", html: "Une fonction s'écrit : <code>public static type_retour nom(type1 nom1, …) { code }</code>. Les arguments fonctionnent comme des variables initialisées au moment de l'appel.", ref: "slides 49-50" },
          { type: "texte", html: "Le cours emploie ici « arguments » au sens de nos <strong>paramètres</strong> : les deux mots sont souvent mélangés. Dans ce site : paramètre = la variable de la définition, argument = la valeur donnée à l'appel." },
          { type: "erreur", run: "erreur-classe", code: "public static int mul(int a, int b) {\n    float r;\n    r = a * b;\n    return r;\n}", message: "error: incompatible types: possible lossy conversion from float to int", explication: "Traduction : « conversion avec perte possible de float vers int ». Trois solutions, comme dans le cours (slide 53) : un retour en <code>float</code>, un cast <code>return (int) r;</code>, ou <code>r</code> en <code>int</code>." },
          { type: "attention", html: "Dans <code>float div(int a, int b) { … return (a / b); }</code> (slide 53), <code>a / b</code> est une division <strong>entière</strong> : <code>div(7, 2)</code> renvoie 3.0. Pour garder la partie décimale : <code>return (float) a / b;</code>." }
        ] }
      ]
    },
    {
      titre: "À toi : la moyenne",
      blocs: [
        { type: "trous", run: "classe", question: "Complète la méthode qui rend la moyenne de deux notes.", code: "public static ___ moyenne2(double a, double b) {\n    ___ (a + b) / 2;\n}\npublic static void main(String[] args) {\n    System.out.println(moyenne2(12, 15));\n}", reponses: [["double"], ["return"]], explication: "Le résultat a une virgule : type de retour <code>double</code>, et <code>return</code> rend la valeur. (12 est un <code>int</code> : il est converti tout seul en 12.0, du petit vers le grand, m02.)", sortie: "13.5" },
        { type: "exo", niveau: "creer", run: "classe", enonce: "Sur le même modèle, écris <code>moyenne(double a, double b, double c)</code>. Dans <code>main</code>, affiche la moyenne d'Adama : 14, 16 et 12.", indice: "Trois paramètres, et on divise par 3.", corrige: { code: "public static double moyenne(double a, double b, double c) {\n    return (a + b + c) / 3;\n}\npublic static void main(String[] args) {\n    System.out.println(moyenne(14, 16, 12));\n}", sortie: "14.0", html: "Java affiche 14.0, et non 14, car le résultat est un <code>double</code>." } }
      ]
    }
  ],
  retenir: [
    "Les paramètres font entrer des valeurs ; <code>return</code> fait sortir le résultat.",
    "Le type de retour remplace <code>void</code>, et chaque chemin doit finir par un <code>return</code>.",
    "Afficher n'est pas rendre : la méthode rend, <code>main</code> affiche."
  ],
  test: [
    { type: "quiz", question: "Dans <code>saluer(\"Adama\");</code>, que représente <code>\"Adama\"</code> ?", options: [
      { t: "Un paramètre", pourquoi: "Le paramètre est la variable de la définition (<code>prenom</code>)." },
      { t: "Un argument", ok: true, pourquoi: "Exact : la valeur donnée à l'appel, rangée dans le paramètre." },
      { t: "Le type de retour", pourquoi: "Non : il s'écrit dans la définition, avant le nom." }
    ] },
    { type: "quiz", rappel: "m04-l01", question: "Quelle écriture <strong>compare</strong> la note à 10 ?", options: [
      { t: "<code>note = 10</code>", pourquoi: "<code>=</code> range 10 dans <code>note</code>." },
      { t: "<code>note == 10</code>", ok: true, pourquoi: "Exact : <code>==</code> compare et donne <code>true</code> ou <code>false</code>." },
      { t: "<code>note := 10</code>", pourquoi: "Cet opérateur n'existe pas en Java." }
    ] }
  ]
});
