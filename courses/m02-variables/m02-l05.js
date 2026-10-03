JR.lecon({
  id: "m02-l05",
  titre: "Bilan / défi : la fiche d'Adama (fil rouge v1)",
  duree: 9,
  objectif: "Décrire un étudiant uniquement avec des variables bien typées, puis afficher sa fiche.",
  sections: [
    {
      titre: "Le défi",
      blocs: [
        { type: "pourquoi", html: "Tu sais créer des variables, choisir leur type, les afficher avec du texte et faire un cast. Mettons tout ensemble : la fiche d'Adama SECK, 22 ans, étudiant à l'ESP. Cette fiche grandira dans les modules suivants." },
        { type: "boites", items: [{ nom: "nom", val: "\"Adama SECK\"", type: "String" }, { nom: "initiale", val: "'A'", type: "char" }, { nom: "age", val: "22", type: "int" }, { nom: "note1", val: "12.5", type: "double" }, { nom: "note2", val: "16.0", type: "double" }, { nom: "note3", val: "13.5", type: "double" }, { nom: "inscrit", val: "true", type: "boolean" }], legende: "La fiche d'Adama, en boîtes : une boîte par information, chacune du bon type." },
        { type: "code", titre: "Code de départ", code: "String nom = \"Adama SECK\";\nSystem.out.println(nom);", sortie: "Adama SECK" }
      ]
    },
    {
      titre: "Étape 1 : les boîtes",
      blocs: [
        { type: "trous", question: "Complète avec le bon type pour chaque information.", code: "String nom = \"Adama SECK\";\n___ initiale = 'A';\n___ age = 22;\n___ note1 = 12.5;\n___ inscrit = true;\nSystem.out.println(initiale);", reponses: [["char"], ["int"], ["double"], ["boolean"]], explication: "Un caractère entre <code>' '</code> : <code>char</code>. Un entier : <code>int</code>. Un réel : <code>double</code>. Vrai ou faux : <code>boolean</code>.", sortie: "A" }
      ]
    },
    {
      titre: "Étape 2 : afficher la fiche",
      blocs: [
        { type: "trous", question: "D'abord la première ligne de la fiche. Complète pour afficher <code>Adama SECK (A), 22 ans</code>.", contexte: "String nom = \"Adama SECK\";\nchar initiale = 'A';\nint age = 22;", code: "System.out.println(nom + \" (\" + ___ + \"), \" + ___ + \" ans\");", reponses: [["initiale"], ["age"]], explication: "Les parenthèses, la virgule et les espaces sont dans les guillemets ; les variables, entre les <code>+</code>.", sortie: "Adama SECK (A), 22 ans" },
        { type: "texte", html: "Pour les notes, une seule ligne peut déclarer plusieurs boîtes du même type : <code>double note1 = 12.5, note2 = 16.0, note3 = 13.5;</code>" },
        { type: "exo", niveau: "combiner", enonce: "Complète la fiche pour afficher exactement :<br><code>Adama SECK (A), 22 ans</code><br><code>Notes : 12.5 / 16.0 / 13.5</code><br><code>Inscrit : true</code>", code: "String nom = \"Adama SECK\";\nchar initiale = 'A';\nint age = 22;\ndouble note1 = 12.5, note2 = 16.0, note3 = 13.5;\nboolean inscrit = true;\nSystem.out.println(nom + \" (\" + initiale + \"), \" + age + \" ans\");", indice: "Une ligne par <code>println</code>, et des <code>+</code> entre les morceaux. Vérifie chaque espace dans les guillemets.", corrige: { code: "String nom = \"Adama SECK\";\nchar initiale = 'A';\nint age = 22;\ndouble note1 = 12.5, note2 = 16.0, note3 = 13.5;\nboolean inscrit = true;\nSystem.out.println(nom + \" (\" + initiale + \"), \" + age + \" ans\");\nSystem.out.println(\"Notes : \" + note1 + \" / \" + note2 + \" / \" + note3);\nSystem.out.println(\"Inscrit : \" + inscrit);", sortie: "Adama SECK (A), 22 ans\nNotes : 12.5 / 16.0 / 13.5\nInscrit : true" } },
        { type: "texte", html: "Étape 3 : une note sans ses chiffres après la virgule, grâce au cast <code>(int)</code>. Tu la prédiras dans le petit test." },
        { type: "depliable", genre: "plus", titre: "Défi libre : échanger deux notes", blocs: [
          { type: "texte", html: "On a inversé note1 et note2 par erreur. Échange leurs valeurs. En algo, tu passais par une variable temporaire : même idée ici." },
          { type: "code", titre: "Échange raté", code: "double a = 12.5, b = 16.0;\na = b;\nb = a;\nSystem.out.println(a + \" \" + b);", sortie: "16.0 16.0" },
          { type: "attention", html: "Aucun message d'erreur, mais le résultat est faux : après <code>a = b;</code>, l'ancienne valeur de a (12.5) est perdue. Les deux boîtes valent 16.0." },
          { type: "trous", question: "Complète l'échange avec une boîte <code>temp</code>.", code: "double a = 12.5, b = 16.0;\ndouble temp = ___;\na = b;\nb = ___;\nSystem.out.println(a + \" \" + b);", reponses: [["a"], ["temp"]], explication: "temp garde une copie de a avant qu'elle soit écrasée, puis la rend à b.", sortie: "16.0 12.5" }
        ] }
      ]
    }
  ],
  retenir: [
    "Choisis le type selon la valeur : entier, réel, caractère, vrai/faux, texte.",
    "Donne des noms clairs : <code>note1</code>, <code>inscrit</code>, <code>initiale</code>.",
    "En concaténant, mets les espaces dans les guillemets."
  ],
  test: [
    { type: "predire", question: "Étape 3 : que s'affiche-t-il ?", code: "double note3 = 13.5;\nSystem.out.println(\"Note 3 : \" + (int) note3);", reponse: "Note 3 : 13", explication: "Le cast <code>(int)</code> coupe .5 : il reste 13, pas 14." },
    { type: "quiz", question: "Quelle déclaration convient pour le matricule <code>201506SRG</code> ?", options: [
      { t: "<code>int matricule = 201506SRG;</code>", pourquoi: "Il contient des lettres : ce n'est pas un nombre." },
      { t: "<code>String matricule = \"201506SRG\";</code>", ok: true, pourquoi: "Un mélange de chiffres et de lettres : un texte." },
      { t: "<code>char matricule = '201506SRG';</code>", pourquoi: "Un char ne contient qu'un seul caractère." }
    ] }
  ]
});
