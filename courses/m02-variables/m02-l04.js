JR.lecon({
  id: "m02-l04",
  titre: "Passer d'un type à l'autre : compatibilité et cast",
  duree: 7,
  objectif: "Savoir quand Java convertit tout seul, et quand il faut le forcer avec un cast.",
  sections: [
    {
      titre: "Ça rentre, ou pas ?",
      blocs: [
        { type: "pourquoi", html: "<code>long y = x;</code> (avec <code>x</code> de type <code>int</code>) est accepté. Mais <code>int x = 2.9;</code> est refusé. Pourquoi l'un et pas l'autre ?" },
        { type: "illus", ascii: " du petit vers le grand : ça rentre\n ┌───┐       ┌──────┐\n │ 7 │ ────▶ │  7   │   int ▶ long\n └───┘       └──────┘\n du grand vers le petit : on coupe\n ┌──────┐  ✂  ┌───┐\n │ 2.9  │ ──▶ │ 2 │   (int) 2.9\n └──────┘     └───┘", legende: "Un verre versé dans une bouteille rentre toujours ; une bouteille dans un verre, il faut couper." },
        { type: "texte", html: "Un type A est <strong>compatible</strong> avec B si toutes les valeurs de A tiennent dans B. Java fait alors une <strong>conversion implicite</strong> : il change le type tout seul. Entre entiers, ou d'un <code>int</code> vers un <code>double</code>, rien n'est perdu." },
        { type: "cle", html: "Sens automatique : <code>int → long</code>, <code>int → double</code>, <code>char → int</code>. Dans l'autre sens, il faut un cast." },
        { type: "code", code: "int x = 7;\nlong y = x;\ndouble d = x;\nSystem.out.println(y);\nSystem.out.println(d);", sortie: "7\n7.0" }
      ]
    },
    {
      titre: "Forcer avec un cast",
      blocs: [
        { type: "erreur", code: "int x = 2.4;", message: "error: incompatible types: possible lossy conversion from double to int", explication: "Traduction : « conversion avec perte possible de double vers int ». Ranger 2.4 dans un int ferait perdre le .4 : Java veut ton accord.", correction: "int x = (int) 2.4;" },
        { type: "texte", html: "Le <strong>cast</strong> (ou <strong>transtypage</strong>) donne cet accord : <code>(type) valeur</code> convertit la valeur dans le type indiqué. Vers <code>int</code>, c'est une <strong>troncature</strong> : on coupe après la virgule, sans arrondir." },
        { type: "code", code: "int a = (int) 2.9;\nint b = (int) -2.7;\nSystem.out.println(a);\nSystem.out.println(b);", sortie: "2\n-2" },
        { type: "predire", code: "double moyenne = 13.99;\nint note = (int) moyenne;\nSystem.out.println(note);", reponse: "13", explication: "Le cast coupe .99 : il reste 13, pas 14." }
      ]
    },
    {
      titre: "Le cas du char",
      blocs: [
        { type: "texte", html: "Chaque caractère a un numéro, son code (table Unicode). Un <code>char</code> devient tout seul un <code>int</code> : ce numéro. Les chiffres se suivent : <code>'0'</code> vaut 48, <code>'1'</code> vaut 49, <code>'2'</code> vaut 50." },
        { type: "code", code: "char c = '2';\nint code = c;\nSystem.out.println(code);", sortie: "50" },
        { type: "ecart", dit: "« char c='2'; int x=c; » : int et char ne sont pas compatibles (slide 30).", vrai: "C'est compatible, sans cast. Mais <code>x</code> vaut 50, le code de <code>'2'</code>, et non le nombre 2." },
        { type: "quiz", question: "<code>long y = 20;</code> puis <code>int z = y;</code> : compile ou non ?", options: [
          { t: "Compile", pourquoi: "Java ne regarde que le type de y (long), pas sa valeur : du grand vers le petit, refusé." },
          { t: "Refusé : il faut <code>(int) y</code>", ok: true, pourquoi: "<code>possible lossy conversion from long to int</code> : il faut écrire <code>int z = (int) y;</code>." }
        ] },
        { type: "depliable", genre: "examen", titre: "Exceptions et débordements", blocs: [
          { type: "texte", html: "Exception utile, seulement pour les entiers : un nombre entier écrit directement dans le code, qui tient dans <code>byte</code> (ou <code>short</code>, <code>char</code>), est accepté sans cast. <code>byte b = 100;</code> compile, <code>byte b = 128;</code> est refusé (127 est le maximum). Elle ne vaut pas pour les réels : <code>int n = 3.0;</code> est refusé." },
          { type: "texte", html: "Un cast vers un type trop petit ne coupe pas seulement la virgule : la valeur « fait le tour ». Un byte est une roue de 256 crans, de −128 à 127. Après 127, on repart à −128." },
          { type: "code", code: "int x = 130;\nbyte y = (byte) x;\nSystem.out.println(y);\nSystem.out.println((byte) -129);", sortie: "-126\n127" },
          { type: "ecart", dit: "« int x=; byte y=(byte)x → -126 » (slide 31).", vrai: "Il manque la valeur : c'est <code>int x = 130;</code>. Après 127, on repart du bas : 128 → −128, 129 → −127, 130 → −126." },
          { type: "ecart", dit: "Cast optionnel de int vers float « car un int est un float qui lui-même est un double » (slide 33).", vrai: "La conversion est bien permise sans cast, mais un <code>float</code> ne garde pas tous les chiffres d'un grand <code>int</code>. <code>float f = 16777217;</code> affiche <code>1.6777216E7</code> (<code>E7</code> = × 10 puissance 7), soit 16777216 : un de moins." }
        ] }
      ]
    }
  ],
  retenir: [
    "Du petit vers le grand : conversion automatique.",
    "Du grand vers le petit : cast obligatoire, <code>(int) 2.9</code>.",
    "Un cast vers <code>int</code> tronque : il coupe, il n'arrondit pas."
  ],
  test: [
    { type: "predire", code: "System.out.println((int) 7.8);", reponse: "7", explication: "Troncature : on coupe .8, il reste 7." },
    { type: "quiz", question: "Laquelle de ces lignes est refusée ?", options: [
      { t: "<code>long a = 12;</code>", pourquoi: "int vers long : automatique." },
      { t: "<code>int b = 3.0;</code>", ok: true, pourquoi: "3.0 est un double : même sans décimale utile, il faut <code>(int) 3.0</code>." },
      { t: "<code>double c = 7;</code>", pourquoi: "int vers double : automatique, c vaut 7.0." }
    ] }
  ]
});
