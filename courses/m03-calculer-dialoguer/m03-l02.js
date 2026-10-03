JR.lecon({
  id: "m03-l02",
  titre: "++, -- et les raccourcis",
  duree: 7,
  objectif: "Écrire plus court les calculs qui reviennent sans arrêt.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Tu sais écrire <code>score = score + 5;</code>. Dans un vrai programme, ce genre de ligne revient sans arrêt. Java propose une écriture plus courte." },
        { type: "code", code: "int score = 10;\nscore += 5;\nscore -= 3;\nSystem.out.println(score);", sortie: "12", lignes: [null, "Se lit « score augmente de 5 » : comme score = score + 5. Il vaut 15.", "Comme score = score - 3. Il vaut 12.", null] },
        { type: "boites", items: [{ nom: "score", val: "10" }, { nom: "score", val: "15", maj: true }, { nom: "score", val: "12", maj: true }], legende: "La même boîte, à trois moments : 10, puis 15, puis 12." }
      ]
    },
    {
      titre: "++ et --",
      blocs: [
        { type: "texte", html: "Ajouter 1 est si fréquent qu'il a son propre opérateur. <code>i++</code> fait une <strong>incrémentation</strong> (il ajoute 1 à <code>i</code>). <code>i--</code> fait une <strong>décrémentation</strong> (il retire 1)." },
        { type: "predire", code: "int n = 7;\nn++;\nn += 10;\nn--;\nSystem.out.println(n);", reponse: "17", explication: "7, puis 8 avec <code>n++</code>, puis 18 avec <code>n += 10</code>, puis 17 avec <code>n--</code>." }
      ]
    },
    {
      titre: "i++ ou ++i ?",
      blocs: [
        { type: "texte", html: "Seul sur sa ligne, <code>i++</code> et <code>++i</code> font la même chose. La différence apparaît quand on utilise la valeur dans la même instruction. <code>i++</code> est la <strong>post-incrémentation</strong> (on donne la valeur, puis on ajoute 1) ; <code>++i</code> est la <strong>pré-incrémentation</strong> (on ajoute 1, puis on donne la valeur)." },
        { type: "trace", lignes: ["int i = 2;", "int j = i++;", "int k = ++i;"], etapes: [
          { ligne: 0, mem: { i: { val: "2", maj: true } }, note: "On crée i, qui vaut 2." },
          { ligne: 1, mem: { i: { val: "3", maj: true }, j: { val: "2", maj: true } }, note: "Post : j reçoit l'ancienne valeur (2), PUIS i passe à 3." },
          { ligne: 2, mem: { i: { val: "4", maj: true }, j: { val: "2" }, k: { val: "4", maj: true } }, note: "Pré : i passe d'abord à 4, PUIS k reçoit 4." }
        ] },
        { type: "simple", html: "<p>Au guichet, l'agent qui fait <code>i++</code> te donne ton ticket, puis avance son compteur. Celui qui fait <code>++i</code> avance d'abord son compteur, puis te donne le nouveau numéro.</p>" },
        { type: "quiz", question: "Après <code>int a = 5; int b = a++;</code>, que valent a et b ?", options: [
          { t: "a = 6, b = 6", pourquoi: "Ce serait le cas avec <code>++a</code>." },
          { t: "a = 6, b = 5", ok: true, pourquoi: "Post-incrémentation : b reçoit d'abord 5, puis a passe à 6." },
          { t: "a = 5, b = 6", pourquoi: "C'est a qui est augmenté, pas b." }
        ] }
      ]
    },
    {
      titre: "Le piège de +=",
      blocs: [
        { type: "erreur", code: "int total = 0;\ntotal = total + 0.5;", message: "error: incompatible types: possible lossy conversion from double to int", explication: "Traduction : « conversion avec perte possible de double vers int ». <code>total + 0.5</code> est un <code>double</code> : une boîte <code>int</code> ne peut pas le ranger sans cast.", correction: "double total = 0;\ntotal = total + 0.5;" },
        { type: "code", titre: "Avec le raccourci, Java ne dit plus rien", code: "int total = 0;\ntotal += 0.5;\nSystem.out.println(total);", sortie: "0" },
        { type: "attention", html: "<code>+=</code> contient un cast caché : <code>total += 0.5</code> range <code>(int) (total + 0.5)</code>, donc 0, sans aucun message. Retiens surtout : une somme de notes se range dans un <code>double</code>." },
        { type: "depliable", genre: "examen", titre: "Les exemples du cours (slides 38-39) et un piège rare", blocs: [
          { type: "code", code: "int a = 5, b = 10;\nint c = a++ + b;\nSystem.out.println(a + \" \" + c);", sortie: "6 15", lignes: ["Déclaration de deux variables sur une même ligne.", "a++ donne 5 (puis a passe à 6) : c = 5 + 10 = 15.", null] },
          { type: "code", code: "int a = 5, b = 10;\nint c = ++a + b;\nSystem.out.println(a + \" \" + c);", sortie: "6 16", lignes: [null, "++a passe d'abord à 6 : c = 6 + 10 = 16.", null] },
          { type: "ecart", dit: "Pour l'exemple 2 (slide 39) : « L'opérateur a++ est un opérateur de pré-incrémentation ».", vrai: "L'exemple utilise <code>++a</code>, qui est bien la pré-incrémentation. <code>a++</code>, lui, est la <strong>post</strong>-incrémentation." },
          { type: "attention", html: "Piège rare : <code>x =+ 5;</code> (signes inversés) compile aussi, mais range 5 dans x au lieu d'ajouter 5." }
        ] }
      ]
    }
  ],
  retenir: [
    "<code>x += 5</code> ajoute 5 à x (avec un cast caché vers le type de x).",
    "<code>i++</code> donne la valeur, puis augmente.",
    "<code>++i</code> augmente, puis donne la valeur."
  ],
  test: [
    { type: "quiz", question: "Que contient <code>n</code> après <code>int n = 0; n += 2.7;</code> ?", options: [
      { t: "2.7", pourquoi: "Une boîte <code>int</code> ne peut pas contenir 2.7." },
      { t: "2", ok: true, pourquoi: "Le cast caché de <code>+=</code> tronque 2.7 en 2." },
      { t: "Rien : erreur de compilation", pourquoi: "C'est le piège : avec <code>+=</code>, Java ne dit rien." }
    ] },
    { type: "predire", rappel: "m02-l04", code: "System.out.println((int) 3.8);", reponse: "3", explication: "Un cast vers <code>int</code> coupe la partie décimale : c'est une troncature, pas un arrondi." }
  ]
});
