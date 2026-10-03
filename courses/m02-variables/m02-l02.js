JR.lecon({
  id: "m02-l02",
  titre: "Changer la valeur, et afficher avec du texte",
  duree: 7,
  objectif: "Changer le contenu d'une variable, et l'afficher au milieu d'une phrase.",
  sections: [
    {
      titre: "Changer le contenu",
      blocs: [
        { type: "pourquoi", html: "Adama a 21 ans. À son anniversaire, il en a 22. Sa boîte <code>age</code> existe déjà : comment changer ce qu'elle contient ? Et comment afficher « Adama a 22 ans » ?" },
        { type: "illus", ascii: " algo :  age ← age + 1\n Java :  age = age + 1;\n          ▲    └──┬──┘\n          │       │\n          └───────┘\n 2. on range   1. on calcule\n    à gauche      à droite", legende: "La flèche de l'algo devient le signe =." },
        { type: "texte", html: "L'<strong>affectation</strong> <code>nom = valeur;</code> range une nouvelle valeur dans une boîte qui existe déjà. Java calcule d'abord ce qui est à droite du <code>=</code>, puis le range à gauche. L'ancienne valeur est perdue." },
        { type: "trace", lignes: ["int age = 21;", "age = age + 1;", "System.out.println(age);"], etapes: [
          { ligne: 0, mem: { age: { val: "21", maj: true } }, note: "La boîte age est créée avec 21." },
          { ligne: 1, mem: { age: { val: "22", maj: true } }, note: "À droite : age + 1 = 21 + 1 = 22. Puis 22 est rangé dans age : le 21 a disparu." },
          { ligne: 2, mem: { age: { val: "22" } }, note: "On affiche le contenu actuel.", sortie: "22" }
        ] },
        { type: "simple", html: "<p>Lis le signe <code>=</code> comme « reçoit » : « age reçoit age + 1 ». Ce n'est pas une équation de maths (qui serait d'ailleurs fausse) : c'est un ordre de rangement.</p>" },
        { type: "quiz", question: "Que fait <code>age = 25;</code> si <code>age</code> valait 22 ?", options: [
          { t: "age vaut maintenant 25", ok: true, pourquoi: "L'affectation remplace l'ancienne valeur." },
          { t: "Java vérifie si age est égal à 25", pourquoi: "Le <code>=</code> range, il ne compare pas. La comparaison s'écrit autrement, on la verra plus tard." },
          { t: "age vaut 47", pourquoi: "On n'ajoute rien : 25 remplace 22." }
        ] }
      ]
    },
    {
      titre: "Une boîte d'abord vide",
      blocs: [
        { type: "code", code: "int note;\nnote = 14;\nSystem.out.println(note);", sortie: "14", lignes: ["Déclaration seule : la boîte existe, mais elle est vide.", "Affectation : elle reçoit 14.", "On peut la lire : elle a une valeur."] },
        { type: "erreur", code: "int x, y;\nint somme = x + y;", message: "error: variable x might not have been initialized", explication: "Traduction : « la variable x n'a peut-être pas été initialisée ». <code>int x, y;</code> déclare deux boîtes d'un coup, sans valeur : on ne peut pas les lire (exemple de la slide 29).", correction: "int x = 4, y = 6;\nint somme = x + y;" }
      ]
    },
    {
      titre: "Afficher une phrase",
      blocs: [
        { type: "texte", html: "Un texte se range dans une boîte de type <strong>String</strong> (avec une majuscule) : c'est le type des textes, écrits entre <code>\" \"</code>." },
        { type: "illus", ascii: "┌───────────┐   ┌────┐   ┌────────┐\n│ \"Adama a \"│ + │ 22 │ + │ \" ans\" │\n└───────────┘   └────┘   └────────┘\n                   ▼\n           \"Adama a 22 ans\"", legende: "Des wagons accrochés les uns aux autres par le +." },
        { type: "texte", html: "Entre un texte et une valeur, le <code>+</code> fait une <strong>concaténation</strong> : il colle les morceaux bout à bout. Les espaces, c'est à toi de les mettre dans les guillemets." },
        { type: "code", code: "String nom = \"Adama\";\nint age = 22;\nSystem.out.println(nom + \" a \" + age + \" ans\");", sortie: "Adama a 22 ans" },
        { type: "exo", niveau: "modifier", enonce: "Ce code affiche <code>Prix:500FCFA</code>. Modifie-le pour afficher <code>Prix : 500 FCFA</code>.", code: "int prix = 500;\nSystem.out.println(\"Prix:\" + prix + \"FCFA\");", indice: "Ajoute les espaces à l'intérieur des guillemets.", corrige: { code: "int prix = 500;\nSystem.out.println(\"Prix : \" + prix + \" FCFA\");", sortie: "Prix : 500 FCFA" } }
      ]
    }
  ],
  retenir: [
    "<code>=</code> range la valeur de droite dans la variable de gauche.",
    "Une variable doit avoir une valeur avant d'être lue.",
    "<code>+</code> colle texte et valeurs : pense aux espaces."
  ],
  test: [
    { type: "predire", code: "int x = 3;\nint y = x;\nx = 10;\nSystem.out.println(y);", reponse: "3", explication: "<code>int y = x;</code> copie la valeur 3 dans y. Changer x ensuite ne touche pas y : ce sont deux boîtes différentes." },
    { type: "quiz", question: "Quelle ligne est refusée par Java ?", options: [
      { t: "<code>int n; n = 4;</code>", pourquoi: "Correct : on remplit la boîte, sans la lire avant." },
      { t: "<code>int n; System.out.println(n);</code>", ok: true, pourquoi: "On lit n alors qu'elle est vide : <code>variable n might not have been initialized</code>." },
      { t: "<code>int n = 4; n = n + 1;</code>", pourquoi: "Correct : n passe de 4 à 5." }
    ] }
  ]
});
