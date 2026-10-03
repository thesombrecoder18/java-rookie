JR.lecon({
  id: "m04-l01",
  titre: "if … else : choisir un chemin",
  duree: 7,
  objectif: "Faire suivre au programme un chemin ou un autre, selon une condition.",
  sections: [
    {
      titre: "Échauffement, puis le problème",
      blocs: [
        { type: "quiz", rappel: "m03-l01", question: "Pour se remettre en route : que vaut <code>7 / 2</code> en Java ?", options: [
          { t: "3.5", pourquoi: "Ce serait <code>7.0 / 2</code>. Entre deux <code>int</code>, la division est entière." },
          { t: "3", ok: true, pourquoi: "Division entière : la partie décimale est coupée." },
          { t: "4", pourquoi: "Java n'arrondit pas, il coupe." }
        ] },
        { type: "pourquoi", html: "Le programme doit <strong>décider</strong> : « Admis » si la moyenne est au moins 10, sinon « Ajourné ». Il faut pouvoir sauter des lignes." }
      ]
    },
    {
      titre: "Comparer deux valeurs",
      blocs: [
        { type: "texte", html: "Les <strong>opérateurs de comparaison</strong> sont <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code> (≤), <code>&gt;=</code> (≥), <code>==</code> (égal) et <code>!=</code> (différent). Une comparaison vaut <code>true</code> ou <code>false</code> : c'est une <strong>condition</strong>." },
        { type: "code", code: "double moyenne = 12.5;\nSystem.out.println(moyenne >= 10);\nSystem.out.println(moyenne == 20);", sortie: "true\nfalse" }
      ]
    },
    {
      titre: "Deux chemins : if … else",
      blocs: [
        { type: "illus", ascii: "      moyenne >= 10 ?\n        ╱        ╲\n     true         false\n       │            │\n   « Admis »   « Ajourné »\n        ╲        ╱\n         ▼      ▼\n    suite du programme", legende: "Un chemin à deux directions : on n'en prend qu'un seul, puis les deux se rejoignent." },
        { type: "code", code: "double moyenne = 12.5;\nif (moyenne >= 10) {\n    System.out.println(\"Admis\");\n} else {\n    System.out.println(\"Ajourné\");\n}", sortie: "Admis", lignes: [null, "if = « si ». La condition est entre parenthèses.", "Exécuté seulement si la condition vaut true.", "else = « sinon » : le chemin pour false.", "Exécuté seulement si la condition vaut false.", "Fin du bloc : les deux chemins se rejoignent ici."] },
        { type: "compare", gauche: { titre: "En algo (pseudo-code)", html: "<code>SI moyenne ≥ 10 ALORS</code><br><code>&nbsp;&nbsp;afficher \"Admis\"</code><br><code>SINON</code><br><code>&nbsp;&nbsp;afficher \"Ajourné\"</code><br><code>FINSI</code>" }, droite: { titre: "En Java", html: "<code>if (moyenne &gt;= 10) {</code><br><code>&nbsp;&nbsp;…</code><br><code>} else {</code><br><code>&nbsp;&nbsp;…</code><br><code>}</code>" }, conclusion: "SI devient <code>if</code>, SINON devient <code>else</code>, et les accolades remplacent FINSI." }
      ]
    },
    {
      titre: "Plus de deux chemins : else if",
      blocs: [
        { type: "texte", html: "Au-delà de deux cas, on enchaîne des <code>else if</code> (SINON SI). Java teste dans l'ordre : <strong>le premier test vrai l'emporte</strong>." },
        { type: "code", titre: "L'exemple du cours (slide 46)", code: "int b = -4;\nif (b > 0) {\n    System.out.println(\"strictement positif\");\n} else if (b <= -5) {\n    System.out.println(\"entre -infini et -5\");\n} else {\n    System.out.println(\"entre -5 (exclu) et 0\");\n}", sortie: "entre -5 (exclu) et 0" },
        { type: "quiz", question: "Dans ce même code, avec <code>int b = -7;</code>, quel message s'affiche ?", options: [
          { t: "strictement positif", pourquoi: "-7 > 0 est faux : on passe au test suivant." },
          { t: "entre -infini et -5", ok: true, pourquoi: "-7 > 0 est faux, puis -7 <= -5 est vrai : ce chemin l'emporte." },
          { t: "entre -5 (exclu) et 0", pourquoi: "Le <code>else</code> final ne sert que si tous les tests sont faux." }
        ] },
        { type: "attention", html: "L'ordre compte : si « au moins 10 » est testé avant « au moins 16 », un 17 s'arrête au premier test. Teste du plus haut au plus bas." }
      ]
    },
    {
      titre: "Les pièges",
      blocs: [
        { type: "erreur", code: "int x = 3;\nif (x = 5) {\n    System.out.println(\"cinq\");\n}", message: "error: incompatible types: int cannot be converted to boolean", explication: "Traduction : « types incompatibles : un int ne peut pas être converti en boolean ». <code>x = 5</code> <em>range</em> 5 dans x, ce n'est pas une question. Pour comparer, il faut <code>==</code>.", correction: "int x = 3;\nif (x == 5) {\n    System.out.println(\"cinq\");\n}" },
        { type: "attention", html: "Jamais de <code>;</code> après <code>if (…)</code> : il termine le <code>if</code>, et le bloc suivant s'exécute <strong>toujours</strong>, sans aucun message." },
        { type: "exo", niveau: "reproduire", enonce: "Avec <code>int n = 7;</code>, affiche « pair » si n est pair, sinon « impair ».", indice: "Un nombre est pair quand le reste de sa division par 2 vaut 0 : <code>n % 2 == 0</code>.", corrige: { code: "int n = 7;\nif (n % 2 == 0) {\n    System.out.println(\"pair\");\n} else {\n    System.out.println(\"impair\");\n}", sortie: "impair" } },
        { type: "depliable", genre: "examen", titre: "L'opérateur ternaire (slide 35)", blocs: [
          { type: "texte", html: "Un <code>if … else</code> qui choisit seulement une valeur peut s'écrire sur une ligne : <code>condition ? valeurSiVrai : valeurSiFaux</code>." },
          { type: "code", code: "double moyenne = 8.5;\nString r = (moyenne >= 10) ? \"Admis\" : \"Ajourné\";\nSystem.out.println(r);", sortie: "Ajourné" }
        ] }
      ]
    }
  ],
  retenir: [
    "<code>==</code> compare, <code>=</code> range.",
    "Jamais de <code>;</code> juste après <code>if (…)</code>.",
    "Dans une cascade de <code>else if</code>, le premier test vrai l'emporte."
  ],
  test: [
    { type: "predire", code: "int note = 10;\nif (note > 10) {\n    System.out.println(\"Bien\");\n} else {\n    System.out.println(\"Juste\");\n}", reponse: "Juste", explication: "10 > 10 vaut false (10 n'est pas strictement plus grand que 10) : on prend le <code>else</code>." },
    { type: "predire", rappel: "m03-l02", code: "int i = 5;\nint j = i++;\nSystem.out.println(i + \" \" + j);", reponse: "6 5", explication: "Post-incrémentation : j reçoit d'abord 5, puis i passe à 6." }
  ]
});
