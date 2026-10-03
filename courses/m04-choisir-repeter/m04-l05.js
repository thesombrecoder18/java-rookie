JR.lecon({
  id: "m04-l05",
  titre: "while et do…while : répéter tant que",
  duree: 7,
  objectif: "Répéter tant qu'une condition est vraie, même sans savoir combien de tours il faudra.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Une note hors de [0, 20] doit être redemandée, autant de fois qu'il faut. Combien ? Impossible à savoir : un <code>for</code> ne convient pas." },
        { type: "illus", ascii: " while : on regarde, PUIS on saute\n  [ test ] ─vrai─▶ [ bloc ] ─┐\n     ▲                      │\n     └──────────────────────┘\n  (test faux au départ : 0 tour)\n\n do…while : on saute, PUIS on regarde\n  [ bloc ] ─▶ [ test ] ─vrai─┐\n     ▲                      │\n     └──────────────────────┘", legende: "while teste avant le tour ; do…while teste après." },
        { type: "texte", html: "<code>while (condition) { … }</code> répète le bloc <strong>tant que</strong> la condition est vraie : c'est le TANT QUE de l'algo. Si elle est fausse dès le début, on ne fait aucun tour." }
      ]
    },
    {
      titre: "while, pas à pas",
      blocs: [
        { type: "trace", lignes: ["int a = 10;", "while (a >= 3) {", "    a = a - 3;", "}", "System.out.println(a);"], etapes: [
          { ligne: 0, mem: { a: { val: "10", maj: true } }, note: "Le reste de 10 par 3, en retirant 3 tant que c'est possible (slide 43)." },
          { ligne: 1, mem: { a: { val: "10" } }, note: "10 >= 3 : vrai, on entre." },
          { ligne: 2, mem: { a: { val: "7", maj: true } }, note: "1er tour." },
          { ligne: 1, mem: { a: { val: "7" } }, note: "7 >= 3 : vrai." },
          { ligne: 2, mem: { a: { val: "4", maj: true } }, note: "2e tour." },
          { ligne: 1, mem: { a: { val: "4" } }, note: "4 >= 3 : vrai." },
          { ligne: 2, mem: { a: { val: "1", maj: true } }, note: "3e tour." },
          { ligne: 1, mem: { a: { val: "1" } }, note: "1 >= 3 : faux, on sort." },
          { ligne: 4, mem: { a: { val: "1" } }, sortie: "1", note: "1 : c'est bien 10 % 3." }
        ] },
        { type: "attention", html: "Si rien ne change dans la boucle, la condition reste vraie : c'est une <strong>boucle infinie</strong>, qui ne s'arrête jamais (Ctrl+C dans un terminal)." }
      ]
    },
    {
      titre: "do…while : valider une saisie",
      blocs: [
        { type: "texte", html: "<code>do { … } while (condition);</code> fait le tour, puis teste : <strong>au moins un tour</strong>. Idéal pour une saisie." },
        { type: "code", titre: "Saisie : 25 ⏎ -3 ⏎ 14 ⏎", entree: "25\n-3\n14\n", code: "Scanner sc = new Scanner(System.in);\ndouble note;\ndo {\n    System.out.print(\"Note (0 à 20) : \");\n    note = sc.nextDouble();\n} while (note < 0 || note > 20);\nSystem.out.println(\"Note acceptée : \" + note);", sortie: "Note (0 à 20) : Note (0 à 20) : Note (0 à 20) : Note acceptée : 14.0", lignes: [null, "Déclarée AVANT la boucle : le test est après la }, il doit encore voir note (portée).", "do = « fais » : on entre sans tester.", null, null, "On recommence tant que la note est hors de [0, 20]. Attention au ; final.", null] },
        { type: "erreur", code: "int i = 1;\ndo {\n    i++;\n} while (i <= 5)", message: "error: ';' expected", explication: "Traduction : « ; attendu ». Un <code>do…while</code> finit par un <code>;</code>. Le <code>while</code> simple, lui, n'en prend pas : <code>while (i &lt;= 5);</code> ferait une boucle vide, infinie.", correction: "int i = 1;\ndo {\n    i++;\n} while (i <= 5);" },
        { type: "exo", niveau: "modifier", enonce: "Adapte la validation à un âge <strong>entier</strong> entre 1 et 120. Saisie de test : <code>0 ⏎ 130 ⏎ 22 ⏎</code>.", indice: "Un <code>int</code>, <code>nextInt()</code>, et la condition « âge hors de [1, 120] ».", entree: "0\n130\n22\n", corrige: { code: "Scanner sc = new Scanner(System.in);\nint age;\ndo {\n    System.out.print(\"Âge : \");\n    age = sc.nextInt();\n} while (age < 1 || age > 120);\nSystem.out.println(\"Âge accepté : \" + age);", sortie: "Âge : Âge : Âge : Âge accepté : 22", html: "Trois invites (une par tour), mais seul 22 est accepté." } },
        { type: "quiz", question: "Afficher les 12 mois de l'année, un par ligne. Quelle boucle ?", options: [
          { t: "<code>for</code>", ok: true, pourquoi: "Nombre de tours connu (12) : <code>for</code>." },
          { t: "<code>while</code>", pourquoi: "Possible, mais <code>for</code> est fait pour un nombre de tours connu." },
          { t: "<code>do…while</code>", pourquoi: "<code>do…while</code> sert quand il faut au moins un tour et qu'on ne sait pas combien, comme une saisie." }
        ] },
        { type: "depliable", genre: "examen", titre: "La somme des 5 premiers entiers (slide 45)", blocs: [
          { type: "code", code: "int s = 0;\nint i = 1;\ndo {\n    s += i;\n    i++;\n} while (i <= 5);\nSystem.out.println(s);", sortie: "15", lignes: ["Accumulateur, avant la boucle.", null, null, "s vaut 1, 3, 6, 10, puis 15.", null, "On teste APRÈS le tour.", null] }
        ] },
        { type: "depliable", genre: "plus", titre: "Depuis l'algo : RÉPÉTER … JUSQU'À", blocs: [
          { type: "attention", html: "RÉPÉTER … JUSQU'À donne la condition d'<strong>arrêt</strong> ; <code>do…while</code> donne la condition pour <strong>continuer</strong> : il faut l'inverser. « JUSQU'À note ≥ 0 ET note ≤ 20 » devient <code>while (note &lt; 0 || note &gt; 20)</code>." }
        ] }
      ]
    }
  ],
  retenir: [
    "<code>while</code> peut faire 0 tour, <code>do…while</code> en fait au moins 1.",
    "Quelque chose doit changer dans la boucle, sinon elle ne s'arrête jamais.",
    "Nombre de tours connu → <code>for</code> ; au moins une fois → <code>do…while</code> ; sinon → <code>while</code>."
  ],
  test: [
    { type: "quiz", question: "Combien de tours fait <code>int k = 10; while (k &lt; 5) { k++; }</code> ?", options: [
      { t: "0", ok: true, pourquoi: "Le test est fait avant : 10 < 5 est faux dès le départ." },
      { t: "1", pourquoi: "Ce serait le cas d'un <code>do…while</code>." },
      { t: "Une infinité", pourquoi: "On n'entre même pas dans la boucle." }
    ] },
    { type: "predire", rappel: "m03-l04", question: "Avec la saisie <code>20 ⏎ Adama ⏎</code>, que va afficher ce programme ?", entree: "20\nAdama\n", code: "Scanner sc = new Scanner(System.in);\nint age = sc.nextInt();\nString nom = sc.nextLine();\nSystem.out.println(\"[\" + nom + \"]\");", reponse: "[]", explication: "Le piège du ⏎ : <code>nextInt()</code> laisse le ⏎ après 20, et <code>nextLine()</code> lit cette fin de ligne vide. Il fallait un <code>sc.nextLine();</code> vide entre les deux." }
  ]
});
