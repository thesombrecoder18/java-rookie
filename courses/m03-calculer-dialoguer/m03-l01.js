JR.lecon({
  id: "m03-l01",
  titre: "Calculer : division entière, reste et priorité",
  duree: 7,
  objectif: "Faire calculer Java sans perdre la virgule en route.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Adama a eu 12 et 15. Sa moyenne vaut 13,5. Pourtant, ce programme affiche autre chose. Où est passée la virgule ?" },
        { type: "code", code: "int a = 12;\nint b = 15;\nSystem.out.println((a + b) / 2);", sortie: "13" },
        { type: "texte", html: "Pour calculer, Java utilise des <strong>opérateurs</strong> : des symboles qui font un calcul. <code>+</code>, <code>-</code>, <code>*</code> (multiplication), <code>/</code> (division) et <code>%</code> (reste)." }
      ]
    },
    {
      titre: "La division entière",
      blocs: [
        { type: "illus", ascii: " 7 mangues, 2 personnes\n\n (o o o)  (o o o)    o\n  pers. 1  pers. 2  reste\n\n 7 / 2  →  3  (chacun en a 3)\n 7 % 2  →  1  (il en reste 1)", legende: "/ compte les parts complètes, % compte ce qui reste sur la table." },
        { type: "texte", html: "Entre deux <code>int</code>, <code>/</code> fait une <strong>division entière</strong> : le résultat est un <code>int</code>, la partie après la virgule est coupée. C'est le <code>div</code> de l'algo. Dès qu'un des deux nombres est un réel, la division garde la partie décimale." },
        { type: "code", code: "System.out.println(7 / 2);\nSystem.out.println(7.0 / 2);", sortie: "3\n3.5" },
        { type: "quiz", question: "Que vaut <code>9 / 2</code> en Java ?", options: [
          { t: "4.5", pourquoi: "Ce serait vrai avec <code>9.0 / 2</code>. Ici, 9 et 2 sont deux <code>int</code>." },
          { t: "4", ok: true, pourquoi: "Division entière : 2 rentre 4 fois dans 9, la partie décimale est coupée." },
          { t: "5", pourquoi: "Java n'arrondit pas : il coupe. 4,5 devient 4, jamais 5." }
        ] }
      ]
    },
    {
      titre: "Le reste : %",
      blocs: [
        { type: "texte", html: "<code>%</code> s'appelle le <strong>modulo</strong> : il donne le reste de la division entière (le <code>mod</code> de l'algo). Rien à voir avec un pourcentage. Exemple : 135 minutes, combien d'heures et de minutes ?" },
        { type: "code", code: "int duree = 135;\nSystem.out.println(duree / 60);\nSystem.out.println(duree % 60);", sortie: "2\n15", lignes: [null, "60 rentre 2 fois dans 135 : 2 heures.", "Il reste 135 − 120 = 15 : 15 minutes."] },
        { type: "trous", question: "Complète pour obtenir 3 h et 20 min à partir de 200 minutes.", code: "int h = 200 ___ 60;\nint m = 200 ___ 60;\nSystem.out.println(h + \" h \" + m + \" min\");", reponses: [["/"], ["%"]], explication: "<code>/</code> donne les heures complètes (3), <code>%</code> ce qui reste (20).", sortie: "3 h 20 min" }
      ]
    },
    {
      titre: "Priorité, et la virgule retrouvée",
      blocs: [
        { type: "texte", html: "Comme en maths, il y a une <strong>priorité</strong> : <code>*</code>, <code>/</code> et <code>%</code> passent avant <code>+</code> et <code>-</code>. À priorité égale, Java calcule de gauche à droite. Les parenthèses passent avant tout." },
        { type: "compare", gauche: { titre: "Sans parenthèses", code: "System.out.println(2 + 3 * 4);", html: "3 * 4 d'abord, puis + 2 : <strong>14</strong>" }, droite: { titre: "Avec parenthèses", code: "System.out.println((2 + 3) * 4);", html: "2 + 3 d'abord, puis * 4 : <strong>20</strong>" }, conclusion: "En cas de doute, mets des parenthèses : elles ne coûtent rien." },
        { type: "exo", niveau: "modifier", enonce: "Retour au problème. Ce programme affiche 11 au lieu de 11.5 : modifie-le pour garder la virgule.", code: "int x = 9;\nint y = 14;\nSystem.out.println((x + y) / 2);", indice: "Transforme <code>2</code> en <code>2.0</code>.", corrige: { code: "int x = 9;\nint y = 14;\nSystem.out.println((x + y) / 2.0);", sortie: "11.5", html: "Les parenthèses font l'addition d'abord ; <code>2.0</code> est un <code>double</code>, donc la division n'est plus entière." } },
        { type: "depliable", genre: "examen", titre: "Le tableau des priorités du cours (slide 36)", blocs: [
          { type: "ecart", dit: "Le tableau des priorités (slide 36) place <code>* / %</code> et <code>+ -</code> sur la même ligne.", vrai: "<code>* / %</code> passent <strong>avant</strong> <code>+ -</code>, comme en maths : <code>2 + 3 * 4</code> vaut 14, pas 20." }
        ] },
        { type: "depliable", genre: "plus", titre: "Deux pièges de calcul", blocs: [
          { type: "attention", html: "Avec un texte, l'ordre de gauche à droite compte : <code>\"Somme : \" + 2 + 3</code> affiche <code>Somme : 23</code>, car le texte colle d'abord 2, puis 3. Écris <code>\"Somme : \" + (2 + 3)</code> pour obtenir 5." },
          { type: "attention", html: "Avec un nombre négatif, le reste est négatif : <code>-7 % 3</code> vaut -1." }
        ] }
      ]
    }
  ],
  retenir: [
    "<code>int / int</code> donne un résultat entier : écris <code>2.0</code> pour garder la virgule.",
    "<code>%</code> donne le reste de la division.",
    "<code>*</code>, <code>/</code> et <code>%</code> passent avant <code>+</code> et <code>-</code>."
  ],
  test: [
    { type: "predire", code: "System.out.println(1 + 17 % 5 * 2);", reponse: "5", explication: "<code>%</code> et <code>*</code> d'abord, de gauche à droite : 17 % 5 = 2, puis 2 * 2 = 4. Enfin 1 + 4 = 5." },
    { type: "predire", rappel: "m02-l02", question: "Que va afficher ce programme ? (attention aux espaces)", code: "int age = 22;\nSystem.out.println(\"Adama a\" + age + \"ans\");", reponse: "Adama a22ans", explication: "<code>+</code> colle les morceaux tels quels. Sans espace dans les guillemets, les mots se touchent : il faut écrire <code>\"Adama a \"</code> et <code>\" ans\"</code>." }
  ]
});
