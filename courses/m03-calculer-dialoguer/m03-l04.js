JR.lecon({
  id: "m03-l04",
  titre: "Bilan / défi : la moyenne d'Adama (fil rouge v2)",
  duree: 9,
  objectif: "Faire grandir la fiche d'Adama : calculer sa moyenne à partir de notes tapées au clavier.",
  sections: [
    {
      titre: "Le point de départ",
      blocs: [
        { type: "pourquoi", html: "La fiche d'Adama du module 2 affiche ses notes, mais pas sa moyenne, et les notes sont figées dans le code." },
        { type: "code", titre: "Code de départ : la fiche v1 (corrigé du module 2)", code: "String nom = \"Adama SECK\";\nchar initiale = 'A';\nint age = 22;\ndouble note1 = 12.5, note2 = 16.0, note3 = 13.5;\nboolean inscrit = true;\nSystem.out.println(nom + \" (\" + initiale + \"), \" + age + \" ans\");\nSystem.out.println(\"Notes : \" + note1 + \" / \" + note2 + \" / \" + note3);\nSystem.out.println(\"Inscrit : \" + inscrit);\nSystem.out.println(\"Note 3 : \" + (int) note3);", sortie: "Adama SECK (A), 22 ans\nNotes : 12.5 / 16.0 / 13.5\nInscrit : true\nNote 3 : 13" },
        { type: "texte", html: "Le défi, en trois étapes : <strong>1.</strong> la moyenne ; <strong>2.</strong> les notes lues au clavier ; <strong>3.</strong> la durée de l'examen en heures et minutes. Pour garder le code court, on ne garde que le nom et les notes." }
      ]
    },
    {
      titre: "Étape 1 : la moyenne",
      blocs: [
        { type: "predire", question: "Première tentative. Que va afficher ce code ?", code: "double note1 = 12.5, note2 = 16.0, note3 = 13.5;\nSystem.out.println(note1 + note2 + note3 / 3);", reponse: "33.0", explication: "La division passe avant l'addition : 13.5 / 3 = 4.5, puis 12.5 + 16.0 + 4.5 = 33.0. Une moyenne de 33 sur 20 : il manque des parenthèses." },
        { type: "code", titre: "Avec les parenthèses", code: "double note1 = 12.5, note2 = 16.0, note3 = 13.5;\ndouble moyenne = (note1 + note2 + note3) / 3;\nSystem.out.println(moyenne);", sortie: "14.0" },
        { type: "texte", html: "42.0 / 3 = 14.0. Les notes sont des <code>double</code> : la division garde la partie décimale." }
      ]
    },
    {
      titre: "Étape 2 : saisir les notes",
      blocs: [
        { type: "trous", question: "Complète la lecture des notes (saisie de test : <code>14 ⏎ 16 ⏎ 12 ⏎</code>, dans STDIN si tu es en ligne).", entree: "14\n16\n12\n", code: "Scanner sc = new Scanner(System.in);\nString nom = \"Adama SECK\";\nSystem.out.print(\"Note 1 : \");\ndouble note1 = sc.___();\nSystem.out.print(\"Note 2 : \");\ndouble note2 = sc.___();\nSystem.out.print(\"Note 3 : \");\ndouble note3 = sc.nextDouble();\ndouble moyenne = (note1 + note2 + note3) / 3;\nSystem.out.println(nom + \" a \" + moyenne + \" de moyenne\");", reponses: [["nextDouble"], ["nextDouble"]], explication: "Une note est un <code>double</code> : on la lit avec <code>nextDouble()</code>. N'oublie pas l'<code>import java.util.Scanner;</code> en haut du fichier.", sortie: "Note 1 : Note 2 : Note 3 : Adama SECK a 14.0 de moyenne" },
        { type: "boites", items: [{ nom: "note1", val: "14.0", maj: true }, { nom: "note2", val: "16.0", maj: true }, { nom: "note3", val: "12.0", maj: true }, { nom: "moyenne", val: "14.0", maj: true }], legende: "Après la saisie 14, 16, 12 : les boîtes sont remplies par le clavier, plus par le code. Les nombres tapés n'apparaissent pas dans la sortie." }
      ]
    },
    {
      titre: "Le piège du ⏎",
      blocs: [
        { type: "texte", html: "Et si on lisait aussi le nom au clavier, <strong>après</strong> un nombre ? Surprise :" },
        { type: "code", titre: "Surprise · saisie : 20 ⏎ Adama ⏎", entree: "20\nAdama\n", code: "Scanner sc = new Scanner(System.in);\nint age = sc.nextInt();\nString nom = sc.nextLine();\nSystem.out.println(\"[\" + nom + \"]\");", sortie: "[]", lignes: [null, "Lit 20… mais laisse le ⏎ qui suit.", "Lit la fin de cette ligne : rien. nom reçoit \"\", un texte vide.", null] },
        { type: "simple", html: "<p><code>nextInt()</code> prend le nombre et laisse le ⏎ sur le comptoir. <code>nextLine()</code> ramasse ce ⏎ et croit avoir lu une ligne… vide.</p>" },
        { type: "code", titre: "Correction · même saisie", entree: "20\nAdama\n", code: "Scanner sc = new Scanner(System.in);\nint age = sc.nextInt();\nsc.nextLine();\nString nom = sc.nextLine();\nSystem.out.println(\"[\" + nom + \"]\");", sortie: "[Adama]", lignes: [null, null, "Un nextLine() vide, qui avale le ⏎ laissé par nextInt().", null, null] }
      ]
    },
    {
      titre: "Étape 3 : à toi d'écrire la v2",
      blocs: [
        { type: "exo", niveau: "combiner", enonce: "Pars de la v2 ci-dessous et ajoute à la fin <code>int duree = 135;</code>, affichée <code>Examen : 2 h 15 min</code>. Teste avec <code>14 ⏎ 16 ⏎ 12 ⏎</code> en STDIN.", code: "Scanner sc = new Scanner(System.in);\nString nom = \"Adama SECK\";\nSystem.out.print(\"Note 1 : \");\ndouble note1 = sc.nextDouble();\nSystem.out.print(\"Note 2 : \");\ndouble note2 = sc.nextDouble();\nSystem.out.print(\"Note 3 : \");\ndouble note3 = sc.nextDouble();\ndouble moyenne = (note1 + note2 + note3) / 3;\nSystem.out.println(nom + \" a \" + moyenne + \" de moyenne\");", indice: "<code>duree / 60</code> donne les heures, <code>duree % 60</code> les minutes. Pas besoin de parenthèses : <code>/</code> et <code>%</code> passent avant le <code>+</code> qui colle le texte.", entree: "14\n16\n12\n", corrige: { code: "Scanner sc = new Scanner(System.in);\nString nom = \"Adama SECK\";\nSystem.out.print(\"Note 1 : \");\ndouble note1 = sc.nextDouble();\nSystem.out.print(\"Note 2 : \");\ndouble note2 = sc.nextDouble();\nSystem.out.print(\"Note 3 : \");\ndouble note3 = sc.nextDouble();\ndouble moyenne = (note1 + note2 + note3) / 3;\nSystem.out.println(nom + \" a \" + moyenne + \" de moyenne\");\nint duree = 135;\nSystem.out.println(\"Examen : \" + duree / 60 + \" h \" + duree % 60 + \" min\");", sortie: "Note 1 : Note 2 : Note 3 : Adama SECK a 14.0 de moyenne\nExamen : 2 h 15 min" } },
        { type: "depliable", genre: "plus", titre: "Défi libre (facultatif) : des secondes en h, min, s", blocs: [
          { type: "exo", niveau: "creer", enonce: "Un enregistrement dure 4000 secondes. Affiche-le sous la forme <code>1 h 6 min 40 s</code>.", indice: "Une heure = 3600 s. Commence par les heures avec <code>/</code>, puis travaille sur le reste <code>% 3600</code>.", corrige: { code: "int total = 4000;\nint h = total / 3600;\nint reste = total % 3600;\nint m = reste / 60;\nint s = reste % 60;\nSystem.out.println(h + \" h \" + m + \" min \" + s + \" s\");", sortie: "1 h 6 min 40 s" } }
        ] }
      ]
    }
  ],
  retenir: [
    "Des parenthèses pour additionner avant de diviser.",
    "Une moyenne avec virgule demande des <code>double</code> (ou <code>/ 3.0</code>).",
    "<code>Scanner</code> lit les valeurs : le programme dialogue avec l'utilisateur."
  ],
  test: [
    { type: "quiz", question: "Pour 95 minutes, que vaut <code>95 % 60</code> ?", options: [
      { t: "1", pourquoi: "C'est <code>95 / 60</code> : le nombre d'heures complètes." },
      { t: "35", ok: true, pourquoi: "95 − 60 = 35 : il reste 35 minutes." },
      { t: "1.58", pourquoi: "<code>%</code> donne un reste, pas une division à virgule." }
    ] },
    { type: "quiz", rappel: "m01-l03", question: "En ajoutant la saisie, Java affiche <code>Main.java:7: error: ';' expected</code> puis deux autres erreurs. Que fais-tu d'abord ?", options: [
      { t: "Je corrige la dernière erreur de la liste", pourquoi: "Les erreurs suivantes sont souvent des conséquences de la première." },
      { t: "Je regarde la ligne 7 et je corrige cette première erreur, puis je recompile", ok: true, pourquoi: "Fichier, ligne, cause : on corrige la première erreur, puis on relance la compilation." },
      { t: "J'efface tout et je recommence", pourquoi: "Le message dit précisément où regarder : inutile de tout effacer." }
    ] }
  ]
});
