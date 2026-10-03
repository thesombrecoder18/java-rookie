JR.lecon({
  id: "m04-l06",
  titre: "Bilan / défi : validation et mention (fil rouge v3)",
  duree: 9,
  objectif: "Rendre la fiche d'Adama fiable : refuser les notes impossibles, puis donner la mention.",
  sections: [
    {
      titre: "Le point de départ",
      blocs: [
        { type: "pourquoi", html: "La v2 lit trois notes et calcule la moyenne. Mais si Adama tape 25 par erreur, le programme l'accepte, et il ne dit pas si Adama est admis." },
        { type: "code", titre: "Code de départ : la v2 (saisie : 14 ⏎ 16 ⏎ 12 ⏎)", entree: "14\n16\n12\n", code: "Scanner sc = new Scanner(System.in);\nString nom = \"Adama SECK\";\nSystem.out.print(\"Note 1 : \");\ndouble note1 = sc.nextDouble();\nSystem.out.print(\"Note 2 : \");\ndouble note2 = sc.nextDouble();\nSystem.out.print(\"Note 3 : \");\ndouble note3 = sc.nextDouble();\ndouble moyenne = (note1 + note2 + note3) / 3;\nSystem.out.println(nom + \" a \" + moyenne + \" de moyenne\");", sortie: "Note 1 : Note 2 : Note 3 : Adama SECK a 14.0 de moyenne" },
        { type: "texte", html: "Le défi : <strong>1.</strong> refuser une note hors de [0, 20] ; <strong>2.</strong> afficher la mention ; <strong>3.</strong> lire N notes avec une boucle. (On laisse de côté la durée de l'examen.)" }
      ]
    },
    {
      titre: "Étape 1 : refuser une note invalide",
      blocs: [
        { type: "illus", ascii: " ┌─▶ « Note 1 : », lecture\n │          │\n │          ▼\n └─vrai─ [ hors de 0..20 ? ]\n                │\n              faux\n                ▼\n         note acceptée", legende: "Tant que la note est hors limites, on redemande. Au moins une fois : c'est un do…while." },
        { type: "trous", question: "Complète la validation de la première note (saisie de test : <code>25 ⏎ 14 ⏎</code>).", entree: "25\n14\n", contexte: "Scanner sc = new Scanner(System.in);", code: "double note1;\n___ {\n    System.out.print(\"Note 1 : \");\n    note1 = sc.nextDouble();\n} while (note1 < 0 ___ note1 > 20);\nSystem.out.println(\"Acceptée : \" + note1);", reponses: [["do"], ["||"]], explication: "<code>do</code> pour faire au moins un tour ; <code>||</code> car la note est invalide si elle est trop petite OU trop grande. 25 est refusé, 14 accepté.", sortie: "Note 1 : Note 1 : Acceptée : 14.0" }
      ]
    },
    {
      titre: "Étape 2 : la mention",
      blocs: [
        { type: "texte", html: "Barème : ≥ 16 Très bien, ≥ 14 Bien, ≥ 12 Assez bien, ≥ 10 Passable, sinon Ajourné. Ce sont des intervalles : un travail pour <code>else if</code>, pas pour <code>switch</code>." },
        { type: "trous", question: "Complète les seuils, dans le bon ordre.", contexte: "double moyenne = 14.0;", code: "if (moyenne >= ___) {\n    System.out.println(\"Très bien\");\n} else if (moyenne >= ___) {\n    System.out.println(\"Bien\");\n} else if (moyenne >= ___) {\n    System.out.println(\"Assez bien\");\n} else if (moyenne >= ___) {\n    System.out.println(\"Passable\");\n} else {\n    System.out.println(\"Ajourné\");\n}", reponses: [["16"], ["14"], ["12"], ["10"]], explication: "Du plus haut au plus bas : le premier test vrai l'emporte. Dans l'autre ordre, un 17 s'arrêterait à « ≥ 10 » et serait « Passable ».", sortie: "Bien" }
      ]
    },
    {
      titre: "Étape 3 : N notes avec un for",
      blocs: [
        { type: "texte", html: "Recopier trois fois la validation, c'est long. On la met <strong>dans</strong> un <code>for</code> : chaque note acceptée s'ajoute à un accumulateur <code>somme</code>, de type <code>double</code>, créé avant la boucle. Voici la v3 en deux temps, avec la saisie 25, 14, 16, -2, 12." },
        { type: "code", titre: "v3a · boucle + validation", entree: "25\n14\n16\n-2\n12\n", code: "Scanner sc = new Scanner(System.in);\nString nom = \"Adama SECK\";\nint n = 3;\ndouble somme = 0;\nfor (int i = 1; i <= n; i++) {\n    double note;\n    do {\n        System.out.print(\"Note \" + i + \" : \");\n        note = sc.nextDouble();\n    } while (note < 0 || note > 20);\n    somme += note;\n}\ndouble moyenne = somme / n;\nSystem.out.println(nom + \" a \" + moyenne + \" de moyenne\");", sortie: "Note 1 : Note 1 : Note 2 : Note 3 : Note 3 : Adama SECK a 14.0 de moyenne", lignes: [null, null, "Le nombre de notes : change-le, tout le reste suit.", "L'accumulateur, avant la boucle.", "Un tour par note.", null, "La validation de l'étape 1, écrite une seule fois.", null, null, "25 et -2 sont refusés : « Note 1 » et « Note 3 » s'affichent deux fois.", "On ajoute la note acceptée.", null, null, null] },
        { type: "code", titre: "v3b · la fin du programme, avec la mention", entree: "25\n14\n16\n-2\n12\n", contexte: "Scanner sc = new Scanner(System.in);\nString nom = \"Adama SECK\";\nint n = 3;\ndouble somme = 0;\nfor (int i = 1; i <= n; i++) {\n    double note;\n    do {\n        System.out.print(\"Note \" + i + \" : \");\n        note = sc.nextDouble();\n    } while (note < 0 || note > 20);\n    somme += note;\n}", code: "double moyenne = somme / n;\nSystem.out.println(nom + \" a \" + moyenne + \" de moyenne\");\nif (moyenne >= 16) {\n    System.out.println(\"Très bien\");\n} else if (moyenne >= 14) {\n    System.out.println(\"Bien\");\n} else if (moyenne >= 12) {\n    System.out.println(\"Assez bien\");\n} else if (moyenne >= 10) {\n    System.out.println(\"Passable\");\n} else {\n    System.out.println(\"Ajourné\");\n}", sortie: "Note 1 : Note 1 : Note 2 : Note 3 : Note 3 : Adama SECK a 14.0 de moyenne\nBien" },
        { type: "exo", niveau: "combiner", enonce: "Assemble la v3 complète (v3a + mention), passe <code>n</code> à 4, et teste-la avec <code>14 ⏎ 21 ⏎ 16 ⏎ 12 ⏎ 18 ⏎</code> en STDIN.", indice: "Seule la ligne <code>int n = 3;</code> change. 21 doit être refusé : la moyenne porte sur 14, 16, 12 et 18.", entree: "14\n21\n16\n12\n18\n", corrige: { code: "Scanner sc = new Scanner(System.in);\nString nom = \"Adama SECK\";\nint n = 4;\ndouble somme = 0;\nfor (int i = 1; i <= n; i++) {\n    double note;\n    do {\n        System.out.print(\"Note \" + i + \" : \");\n        note = sc.nextDouble();\n    } while (note < 0 || note > 20);\n    somme += note;\n}\ndouble moyenne = somme / n;\nSystem.out.println(nom + \" a \" + moyenne + \" de moyenne\");\nif (moyenne >= 16) {\n    System.out.println(\"Très bien\");\n} else if (moyenne >= 14) {\n    System.out.println(\"Bien\");\n} else if (moyenne >= 12) {\n    System.out.println(\"Assez bien\");\n} else if (moyenne >= 10) {\n    System.out.println(\"Passable\");\n} else {\n    System.out.println(\"Ajourné\");\n}", sortie: "Note 1 : Note 2 : Note 2 : Note 3 : Note 4 : Adama SECK a 15.0 de moyenne\nBien" } },
        { type: "attention", html: "Deux erreurs fréquentes : un accumulateur <code>int</code> (le <code>+=</code> couperait les décimales sans rien dire), ou créé <strong>dans</strong> la boucle (il repartirait de 0 à chaque tour)." },
        { type: "depliable", genre: "plus", titre: "Défi libre (facultatif) : une table de multiplication", blocs: [
          { type: "exo", niveau: "combiner", enonce: "Avec <code>int t = 7;</code>, affiche la table de 7, de <code>7 x 1 = 7</code> à <code>7 x 10 = 70</code>.", indice: "Un <code>for</code> de 1 à 10, et une concaténation : <code>t + \" x \" + i + \" = \" + (t * i)</code>.", corrige: { code: "int t = 7;\nfor (int i = 1; i <= 10; i++) {\n    System.out.println(t + \" x \" + i + \" = \" + (t * i));\n}", sortie: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70" } }
        ] }
      ]
    }
  ],
  retenir: [
    "<code>if</code> pour choisir, une boucle pour répéter.",
    "<code>do…while</code> pour redemander une saisie invalide.",
    "L'accumulateur se crée avant la boucle, en <code>double</code> pour une moyenne."
  ],
  test: [
    { type: "predire", code: "double moyenne = 11.5;\nif (moyenne >= 16) {\n    System.out.println(\"Très bien\");\n} else if (moyenne >= 14) {\n    System.out.println(\"Bien\");\n} else if (moyenne >= 12) {\n    System.out.println(\"Assez bien\");\n} else if (moyenne >= 10) {\n    System.out.println(\"Passable\");\n} else {\n    System.out.println(\"Ajourné\");\n}", reponse: "Passable", explication: "11.5 n'atteint ni 16, ni 14, ni 12, mais atteint 10 : « Passable »." },
    { type: "predire", rappel: "m02-l04", code: "double moyenne = 14.67;\nSystem.out.println((int) moyenne);", reponse: "14", explication: "Le cast vers <code>int</code> tronque : il coupe la partie décimale, sans arrondir." }
  ]
});
