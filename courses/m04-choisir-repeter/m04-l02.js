JR.lecon({
  id: "m04-l02",
  titre: "Combiner des conditions : &&, ||, !",
  duree: 7,
  objectif: "Poser une question en deux morceaux : « ceci ET cela », « ceci OU cela ».",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Une note est valide si elle est au moins 0 <strong>et</strong> au plus 20 : deux comparaisons à la fois. Comment les relier dans une seule condition ?" },
        { type: "illus", ascii: " ET (&&) : en série\n ─[ note>=0 ]─[ note<=20 ]─▶ lampe\n   les DEUX fermés\n\n OU (||) : en parallèle\n    ┌─[ note < 0  ]─┐\n ───┤               ├──▶ lampe\n    └─[ note > 20 ]─┘\n   UN SEUL fermé suffit", legende: "En série, le courant passe si les deux interrupteurs sont fermés. En parallèle, un seul fermé suffit." },
        { type: "texte", html: "Les <strong>opérateurs logiques</strong> relient des conditions : <code>&amp;&amp;</code> (ET : les deux vraies), <code>||</code> (OU : au moins une vraie) et <code>!</code> (NON : inverse true et false). Ce sont le ET, le OU et le NON de l'algo." }
      ]
    },
    {
      titre: "ET, OU, NON",
      blocs: [
        { type: "code", code: "double note = 25;\nboolean valide = note >= 0 && note <= 20;\nboolean horsLimites = note < 0 || note > 20;\nSystem.out.println(valide);\nSystem.out.println(horsLimites);\nSystem.out.println(!valide);", sortie: "false\ntrue\ntrue", lignes: [null, "25 >= 0 est vrai, mais 25 <= 20 est faux : ET donne false.", "25 < 0 est faux, mais 25 > 20 est vrai : OU donne true.", null, null, "!valide se lit « non valide » : l'inverse de false."] },
        { type: "quiz", question: "<code>true &amp;&amp; false</code> vaut…", options: [
          { t: "true", pourquoi: "ET demande que les DEUX soient vraies." },
          { t: "false", ok: true, pourquoi: "Un seul côté faux suffit à rendre le ET faux. À l'inverse, <code>true || false</code> vaut true : un seul côté vrai suffit au OU." }
        ] }
      ]
    },
    {
      titre: "Le piège de l'intervalle",
      blocs: [
        { type: "erreur", code: "double note = 12;\nif (0 <= note <= 20) {\n    System.out.println(\"valide\");\n}", message: "error: bad operand types for binary operator '<='", explication: "Traduction : « mauvais types pour l'opérateur &lt;= ». <code>0 &lt;= note</code> donne un <code>boolean</code> ; <code>javac</code> voit ensuite <code>boolean &lt;= int</code> : comparer un booléen à un nombre n'a pas de sens.", correction: "double note = 12;\nif (note >= 0 && note <= 20) {\n    System.out.println(\"valide\");\n}" },
        { type: "attention", html: "« Entre 0 et 20 » se traduit par ET (<code>&amp;&amp;</code>). « En dehors de 0 à 20 » se traduit par OU (<code>||</code>) : une note ne peut pas être à la fois sous 0 et au-dessus de 20." },
        { type: "trous", question: "Complète la condition « la note est en dehors de [0, 20] ».", code: "double note = -3;\nboolean horsLimites = note < 0 ___ note > 20;\nSystem.out.println(horsLimites);", reponses: [["||"]], explication: "En dehors = trop petite OU trop grande. -3 < 0 est vrai : le OU donne true.", sortie: "true" },
        { type: "predire", code: "int age = 20;\nboolean inscrit = true;\nif (age >= 18 && inscrit) {\n    System.out.println(\"Peut voter\");\n} else {\n    System.out.println(\"Ne peut pas voter\");\n}", reponse: "Peut voter", explication: "20 >= 18 est vrai, inscrit est vrai : les deux côtés du ET sont vrais." },
        { type: "depliable", genre: "examen", titre: "&, |, ^, le court-circuit et les priorités (slides 35-36)", blocs: [
          { type: "texte", html: "Sur des booléens, <code>&amp;</code> et <code>|</code> donnent le même résultat que <code>&amp;&amp;</code> et <code>||</code>, mais ils évaluent <strong>toujours</strong> les deux côtés. <code>^</code> est le OU exclusif : vrai si exactement un des deux est vrai. (Sur des entiers, ils calculent sur les bits : hors programme.)" },
          { type: "texte", html: "<code>&amp;&amp;</code> fait un <strong>court-circuit</strong> : si le côté gauche est faux, il ne calcule pas le côté droit. De même, <code>||</code> ne calcule pas le côté droit si le gauche est vrai. Ici, la division par zéro n'a jamais lieu :" },
          { type: "code", code: "int x = 0;\nSystem.out.println(x != 0 && 10 / x > 1);\nSystem.out.println(true ^ true);", sortie: "false\nfalse" },
          { type: "ecart", dit: "Le tableau des priorités (slide 36) place <code>!</code> sur la même ligne que <code>&amp;&amp;</code> et <code>||</code>, et met <code>^ &amp; |</code> dans cet ordre.", vrai: "<code>!</code> passe très tôt (comme <code>++</code>), <code>&amp;</code> passe avant <code>^</code>, qui passe avant <code>|</code>, et <code>&amp;&amp;</code> avant <code>||</code>. Par exemple, <code>!true || true</code> vaut <code>true</code> : <code>!true</code> est calculé d'abord." }
        ] }
      ]
    }
  ],
  retenir: [
    "<code>&amp;&amp;</code> : les deux doivent être vraies.",
    "<code>||</code> : au moins une doit être vraie.",
    "Un intervalle, c'est deux comparaisons : <code>note &gt;= 0 &amp;&amp; note &lt;= 20</code>."
  ],
  test: [
    { type: "quiz", question: "Quelle condition dit « h est entre 8 et 18 (compris) » ?", options: [
      { t: "<code>h &gt;= 8 || h &lt;= 18</code>", pourquoi: "Avec OU, tout nombre passe : 30 est bien >= 8." },
      { t: "<code>h &gt;= 8 &amp;&amp; h &lt;= 18</code>", ok: true, pourquoi: "Entre = les deux comparaisons vraies à la fois." },
      { t: "<code>8 &lt;= h &lt;= 18</code>", pourquoi: "Java refuse cette écriture : il faut deux comparaisons reliées." }
    ] },
    { type: "quiz", rappel: "m03-l03", question: "Adama doit taper sa note, 12.5. Quelle commande la lit ?", options: [
      { t: "<code>sc.nextInt()</code>", pourquoi: "<code>nextInt()</code> lit un entier : 12.5 provoquerait une erreur d'exécution." },
      { t: "<code>sc.nextDouble()</code>", ok: true, pourquoi: "Un réel se lit avec <code>nextDouble()</code>." },
      { t: "<code>sc.next()</code>", pourquoi: "<code>next()</code> lit un mot (un texte), pas un nombre." }
    ] }
  ]
});
