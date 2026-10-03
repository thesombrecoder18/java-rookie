JR.lecon({
  id: "m05-l03",
  titre: "Même nom, paramètres différents : la surcharge",
  duree: 7,
  objectif: "Donner le même nom à plusieurs méthodes qui font la même chose avec des entrées différentes.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Tu as <code>plus(2, 3)</code>. Tu veux aussi <code>plus(2, 3, 4)</code>, sans inventer <code>plus3</code>, <code>plus4</code>… Java te permet de garder le même nom." },
        { type: "illus", ascii: "        guichet « plus »\n   ┌─────────────┬──────────────┐\n   │ fente  2    │ fente  3     │\n   │ (int, int)  │ (int,int,int)│\n   └─────────────┴──────────────┘\n   plus(2, 3)    ──▶ fente 2\n   plus(2, 3, 4) ──▶ fente 3", legende: "Un seul nom de guichet ; ce que tu présentes choisit la fente." }
      ]
    },
    {
      titre: "Signature et surcharge",
      blocs: [
        { type: "texte", html: "La <strong>signature</strong> d'une méthode, c'est son nom plus les types de ses paramètres : <code>plus(int, int)</code>. Le type de retour n'en fait <em>pas</em> partie. La <strong>surcharge</strong>, c'est avoir plusieurs méthodes de même nom, avec des signatures différentes (slide 54)." },
        { type: "code", run: "classe", code: "public static int plus(int a, int b) {\n    return a + b;\n}\npublic static int plus(int a, int b, int c) {\n    return a + b + c;\n}\npublic static void main(String[] args) {\n    System.out.println(plus(8, 5, 1));\n    System.out.println(plus(8, 5));\n}", sortie: "14\n13", lignes: ["Signature plus(int, int).", null, null, "Signature plus(int, int, int) : même nom, un paramètre de plus.", null, null, null, "Trois arguments : la version à 3 paramètres (slide 57).", "Deux arguments : la version à 2 paramètres.", null] },
        { type: "code", code: "System.out.println(20);\nSystem.out.println(\"Adama\");\nSystem.out.println(12.5);", sortie: "20\nAdama\n12.5", lignes: ["Version de println pour un int.", "Version pour un String.", "Version pour un double : println est surchargée, tu t'en sers depuis le premier jour."] }
      ]
    },
    {
      titre: "Qui est appelé ?",
      blocs: [
        { type: "predire", run: "classe", code: "public static void afficher(int n) {\n    System.out.println(\"entier \" + n);\n}\npublic static void afficher(String s) {\n    System.out.println(\"texte \" + s);\n}\npublic static void main(String[] args) {\n    afficher(\"7\");\n    afficher(7);\n}", reponse: "texte 7\nentier 7", explication: "<code>\"7\"</code> est un <code>String</code> : version texte. <code>7</code> est un <code>int</code> : version entier. Ici, c'est le <em>type</em> qui choisit." },
        { type: "quiz", question: "Ces deux méthodes peuvent-elles exister ensemble ?<br><code>int calcul(int a)</code> et <code>double calcul(int a)</code>", options: [
          { t: "Oui, les types de retour sont différents", pourquoi: "Non : le type de retour ne fait pas partie de la signature." },
          { t: "Non, elles ont la même signature", ok: true, pourquoi: "Exact : <code>calcul(int)</code> deux fois. À l'appel <code>calcul(5)</code>, Java ne saurait pas laquelle choisir." }
        ] },
        { type: "depliable", genre: "examen", titre: "Qui choisit la version ? (slide 54)", blocs: [
          { type: "ecart", dit: "« La machine virtuelle analyse le type de chacun des paramètres d'appel pour déterminer la signature de la fonction à utiliser » (slide 54).", vrai: "Ce choix est fait par le <strong>compilateur</strong> (<code>javac</code>), au moment de la compilation. La machine virtuelle exécute ensuite la méthode déjà choisie. L'idée du cours reste juste : c'est la signature de l'appel qui décide." }
        ] }
      ]
    },
    {
      titre: "L'erreur à reconnaître",
      blocs: [
        { type: "erreur", run: "erreur-classe", code: "public static int plus(int a, int b) {\n    return a + b;\n}\npublic static int plus(int x, int y) {\n    return x + y;\n}", message: "error: method plus(int,int) is already defined in class Main", explication: "Traduction : « la méthode plus(int,int) est déjà définie dans la classe Main ». Changer le <em>nom</em> des paramètres ne change pas la signature : seuls les types comptent (slide 56)." },
        { type: "exo", niveau: "corriger", run: "classe", enonce: "Ce code est refusé : les deux <code>aire</code> ont la même signature. Garde la première telle quelle, et change la seconde pour qu'elle rende l'aire d'un rectangle de côtés <code>a</code> et <code>b</code> (garde le type <code>int</code>).", code: "public static int aire(int c) {\n    return c * c;\n}\npublic static double aire(int c) {\n    return c * c;\n}\npublic static void main(String[] args) {\n    System.out.println(aire(3));\n    System.out.println(aire(3, 4));\n}", indice: "Pour surcharger, change les paramètres, pas le type de retour.", corrige: { code: "public static int aire(int c) {\n    return c * c;\n}\npublic static int aire(int a, int b) {\n    return a * b;\n}\npublic static void main(String[] args) {\n    System.out.println(aire(3));\n    System.out.println(aire(3, 4));\n}", sortie: "9\n12" } },
        { type: "depliable", genre: "plus", titre: "Autres erreurs fréquentes", blocs: [
          { type: "erreur", run: "erreur-classe", code: "public static int plus(int a, int b) {\n    return a + b;\n}\npublic static int plus(int a, int b, int c) {\n    return a + b + c;\n}\npublic static void main(String[] args) {\n    System.out.println(plus(4));\n}", message: "error: no suitable method found for plus(int)", explication: "Traduction : « aucune méthode convenable trouvée pour plus(int) ». Il n'existe aucune version de <code>plus</code> à un seul paramètre." }
        ] }
      ]
    }
  ],
  retenir: [
    "Surcharge = même nom, paramètres différents (en nombre ou en types).",
    "La signature = le nom + les types des paramètres ; le type de retour ne compte pas.",
    "C'est la forme de l'appel qui choisit la version."
  ],
  test: [
    { type: "predire", run: "classe", code: "public static int f(int a) {\n    return a * 10;\n}\npublic static int f(int a, int b) {\n    return a + b;\n}\npublic static void main(String[] args) {\n    System.out.println(f(2) + f(2, 3));\n}", reponse: "25", explication: "<code>f(2)</code> appelle la version à un paramètre : 20. <code>f(2, 3)</code> appelle l'autre : 5. Total : 25." },
    { type: "predire", rappel: "m04-l05", code: "int i = 10;\ndo {\n    System.out.println(i);\n    i++;\n} while (i < 5);", reponse: "10", explication: "Un <code>do…while</code> fait toujours au moins un tour : il affiche 10, puis teste <code>11 &lt; 5</code>, qui est faux." }
  ]
});
