JR.lecon({
  id: "m02-l03",
  titre: "Les types primitifs : entiers, réels, caractères, booléens",
  duree: 7,
  objectif: "Choisir la bonne boîte selon la valeur à ranger : entier, réel, caractère ou vrai/faux.",
  sections: [
    {
      titre: "Des boîtes de formes différentes",
      blocs: [
        { type: "pourquoi", html: "Une moyenne de 12,5 ne rentre pas dans un <code>int</code>, qui ne garde que des entiers. Et la population mondiale, 8 milliards, est trop grande pour lui. Il faut des boîtes de formes différentes." },
        { type: "texte", html: "Java propose 8 <strong>types primitifs</strong> : les types de base, déjà fournis par le langage. Chacun accepte une sorte de valeur précise. Au quotidien, trois suffisent pour les nombres." },
        { type: "illus", ascii: "  int        long             double\n ┌────┐   ┌──────────┐     ┌────────┐\n │ 22 │   │8000000000│     │  12.5  │\n └────┘   └──────────┘     └────────┘\n entier   très grand       nombre à\n          entier           virgule", legende: "Des boîtes de formes différentes, selon la valeur à ranger." },
        { type: "code", code: "int age = 22;\nlong population = 8000000000L;\ndouble moyenne = 12.5;\nSystem.out.println(population);\nSystem.out.println(moyenne);", sortie: "8000000000\n12.5", lignes: ["int : un entier, jusqu'à environ 2 milliards.", "long : un très grand entier. Le L final dit à Java « ce nombre est un long ».", "double : un réel. Dans le code, la virgule s'écrit avec un point.", null, null] },
        { type: "depliable", genre: "examen", titre: "Les autres types numériques", blocs: [
          { type: "texte", html: "La mémoire compte en <strong>bits</strong> (un bit = un 0 ou un 1). Entiers : <code>byte</code> (8 bits, de −128 à 127), <code>short</code> (16 bits), <code>int</code> (32 bits), <code>long</code> (64 bits). Pour n bits : min = −2^(n−1) et max = 2^(n−1) − 1. Pour un byte (n = 8) : −2^7 = −128 et 2^7 − 1 = 127." },
          { type: "texte", html: "Réels : <code>double</code> (le choix par défaut) et <code>float</code>, moins précis, qui demande un <code>f</code> à la fin : <code>float pi = 3.14f;</code>" },
          { type: "erreur", code: "float pi = 3.14;", message: "error: incompatible types: possible lossy conversion from double to float", explication: "Traduction : « conversion avec perte possible de double vers float ». Sans <code>f</code>, <code>3.14</code> est un double, plus précis qu'un float : Java refuse de le rétrécir en silence.", correction: "float pi = 3.14f;" },
          { type: "attention", html: "La slide 26 montre <code>float pi=3.14f;</code> puis <code>double pi=3.14;</code> : ce sont deux exemples séparés. Recopiés dans le même <code>main</code>, ils donnent <code>variable pi is already defined</code> (« la variable pi est déjà définie ») : un nom ne sert qu'une fois." }
        ] }
      ]
    },
    {
      titre: "Un caractère, un vrai/faux",
      blocs: [
        { type: "illus", ascii: " char :   ┌───┐\n          │ A │          entre ' '\n          └───┘\n String : ┌───┬───┬───┬───┬───┐\n          │ A │ d │ a │ m │ a │  \" \"\n          └───┴───┴───┴───┴───┘", legende: "Un char est une seule case ; un String est une suite de caractères, comme un collier de perles." },
        { type: "texte", html: "<code>char</code> range <strong>un seul</strong> caractère, entre apostrophes <code>' '</code>. <code>boolean</code> range <code>true</code> (vrai) ou <code>false</code> (faux) : le VRAI / FAUX de l'algo." },
        { type: "code", code: "char initiale = 'A';\nboolean admis = true;\nSystem.out.println(initiale);\nSystem.out.println(admis);", sortie: "A\ntrue" },
        { type: "attention", html: "<code>String</code> n'est <strong>pas</strong> un type primitif (sa majuscule le trahit) : c'est le type des textes, entre <code>\" \"</code>. Et <code>'7'</code> est un caractère, pas le nombre <code>7</code>." },
        { type: "quiz", question: "Quel type pour la moyenne 13,75 ?", options: [
          { t: "<code>int</code>", pourquoi: "Un int perdrait la partie après la virgule." },
          { t: "<code>double</code>", ok: true, pourquoi: "Un réel, écrit <code>13.75</code> dans le code." },
          { t: "<code>boolean</code>", pourquoi: "Un boolean ne vaut que true ou false." }
        ] },
        { type: "quiz", question: "Et pour « l'étudiant est-il inscrit ? »", options: [
          { t: "<code>String</code>", pourquoi: "On pourrait écrire \"oui\", mais Java a un type fait pour ça." },
          { t: "<code>char</code>", pourquoi: "'O' ou 'N' marcherait, mais c'est moins clair." },
          { t: "<code>boolean</code>", ok: true, pourquoi: "Une question oui/non : true ou false." }
        ] }
      ]
    },
    {
      titre: "L'erreur de forme",
      blocs: [
        { type: "erreur", code: "char c = \"A\";", message: "error: incompatible types: String cannot be converted to char", explication: "Traduction : « types incompatibles : un String ne peut pas être converti en char ». Avec des guillemets doubles, \"A\" est un texte.", correction: "char c = 'A';" },
        { type: "exo", niveau: "corriger", enonce: "Corrige ces trois déclarations.", code: "double note = 12,5;\nchar lettre = \"B\";\nlong grand = 9000000000;", indice: "Un point pour les décimales, des apostrophes pour un char, un L pour un très grand entier.", corrige: { code: "double note = 12.5;\nchar lettre = 'B';\nlong grand = 9000000000L;\nSystem.out.println(note + \" \" + lettre + \" \" + grand);", sortie: "12.5 B 9000000000" } },
        { type: "depliable", genre: "culture", titre: "Les limites des nombres", blocs: [
          { type: "code", code: "int max = 2147483647;\nmax = max + 1;\nSystem.out.println(max);", sortie: "-2147483648" },
          { type: "texte", html: "2147483647 est le plus grand <code>int</code>. Un de plus, et on repart du plus petit, sans aucun message. Pour de très grands nombres, choisis <code>long</code>." },
          { type: "code", code: "System.out.println(0.1 + 0.2);", sortie: "0.30000000000000004" },
          { type: "texte", html: "Un <code>double</code> garde environ 16 chiffres : il calcule de façon très proche, mais pas toujours exacte. C'est normal." }
        ] }
      ]
    }
  ],
  retenir: [
    "Entiers : <code>int</code> (ou <code>long</code>) ; réels : <code>double</code>, avec un point.",
    "<code>char</code> entre <code>' '</code> (un caractère), texte entre <code>\" \"</code>.",
    "<code>boolean</code> vaut <code>true</code> ou <code>false</code>."
  ],
  test: [
    { type: "quiz", question: "Quel type pour l'âge d'un étudiant ?", options: [
      { t: "<code>int</code>", ok: true, pourquoi: "Un âge est un nombre entier." },
      { t: "<code>double</code>", pourquoi: "Possible, mais un âge n'a pas de virgule : <code>int</code> est le bon choix." },
      { t: "<code>char</code>", pourquoi: "Un char ne contient qu'un seul caractère, pas un nombre comme 22." }
    ] },
    { type: "predire", code: "char mention = 'B';\ndouble moyenne = 14.5;\nSystem.out.println(mention + \" \" + moyenne);", reponse: "B 14.5", explication: "Le char B, une espace, puis le réel 14.5, collés par la concaténation." }
  ]
});
