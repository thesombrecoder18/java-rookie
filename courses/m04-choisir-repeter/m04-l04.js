JR.lecon({
  id: "m04-l04",
  titre: "for : répéter un nombre de fois connu",
  duree: 7,
  objectif: "Répéter des instructions un nombre de fois choisi, sans copier-coller.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Afficher les nombres de 1 à 100 demanderait 100 <code>println</code>. Il faut dire à Java : « répète ceci 100 fois »." },
        { type: "illus", ascii: "    ┌─────────────────────┐\n    ▼                     │\n [ i <= 5 ? ] ─true─▶ [ bloc ]\n    │                 [ i++  ]\n  false\n    ▼\n suite du programme", legende: "Une flèche qui revient au départ : tant que le test est vrai, on refait un tour, et le compteur i avance." },
        { type: "texte", html: "Une <strong>boucle</strong> répète un bloc d'instructions. Chaque passage s'appelle une <strong>itération</strong> (un tour). Quand on connaît le nombre de tours, on utilise <code>for</code> : c'est le POUR i DE 1 À 5 de l'algo." }
      ]
    },
    {
      titre: "Anatomie d'un for",
      blocs: [
        { type: "code", code: "for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}", sortie: "1\n2\n3\n4\n5", lignes: ["Trois parties séparées par des ; : le départ (i vaut 1), la condition pour continuer (i <= 5), le pas après chaque tour (i++).", "Le bloc répété : il affiche i.", "Fin du bloc : on remonte faire i++, puis le test."] },
        { type: "trace", lignes: ["for (int i = 1; i <= 3; i++) {", "    System.out.println(i);", "}", "System.out.println(\"Fin\");"], etapes: [
          { ligne: 0, mem: { i: { val: "1", maj: true } }, note: "i vaut 1. 1 <= 3 : vrai, on entre." },
          { ligne: 1, mem: { i: { val: "1" } }, sortie: "1", note: "1er tour." },
          { ligne: 0, mem: { i: { val: "2", maj: true } }, note: "i++ : 2. 2 <= 3 : vrai." },
          { ligne: 1, mem: { i: { val: "2" } }, sortie: "2", note: "2e tour." },
          { ligne: 0, mem: { i: { val: "3", maj: true } }, note: "i++ : 3. 3 <= 3 : vrai." },
          { ligne: 1, mem: { i: { val: "3" } }, sortie: "3", note: "3e tour." },
          { ligne: 0, mem: { i: { val: "4", maj: true } }, note: "i++ : 4. 4 <= 3 : faux, on sort." },
          { ligne: 3, mem: {}, sortie: "Fin", note: "Après la boucle, la boîte i a disparu." }
        ] },
        { type: "predire", code: "for (int i = 0; i < 3; i++) {\n    System.out.println(\"Bonjour\");\n}", reponse: "Bonjour\nBonjour\nBonjour", explication: "i prend les valeurs 0, 1 et 2 : trois tours. Avec <code>i &lt; 3</code>, 3 n'est pas compris. <code>&lt;</code> ou <code>&lt;=</code> : vérifie toujours, c'est la cause classique d'un tour de trop." }
      ]
    },
    {
      titre: "Accumuler un résultat",
      blocs: [
        { type: "texte", html: "Un <strong>accumulateur</strong> est une variable qui construit un résultat tour après tour. On la crée <strong>avant</strong> la boucle : créée dedans, elle repartirait de zéro à chaque tour." },
        { type: "code", titre: "Factorielle de 4 (slide 42)", code: "int fact = 1;\nfor (int i = 1; i <= 4; i++) {\n    fact = fact * i;\n}\nSystem.out.println(fact);", sortie: "24", lignes: ["L'accumulateur, créé avant la boucle. 1, car on va multiplier.", "i prend les valeurs 1, 2, 3, 4.", "fact vaut successivement 1, 2, 6, 24.", null, "Après la boucle : le résultat final."] },
        { type: "trous", question: "Complète pour calculer la somme 1 + 2 + … + 100.", code: "int somme = ___;\nfor (int i = 1; i <= ___; i++) {\n    somme += i;\n}\nSystem.out.println(somme);", reponses: [["0"], ["100"]], explication: "Pour une somme, l'accumulateur part de 0 (pour un produit, de 1). La boucle va de 1 à 100 compris.", sortie: "5050" }
      ]
    },
    {
      titre: "Où vit une variable ?",
      blocs: [
        { type: "cle", html: "La <strong>portée</strong> d'une variable, c'est l'ensemble des instructions où elle existe (slide 27) : de sa déclaration jusqu'à la <code>}</code> de son bloc." },
        { type: "erreur", code: "for (int i = 1; i <= 3; i++) {\n    System.out.println(i);\n}\nSystem.out.println(i);", message: "error: cannot find symbol\n  symbol:   variable i", explication: "Traduction : « symbole introuvable : la variable i ». Le <code>i</code> créé dans le <code>for</code> n'existe que jusqu'à la <code>}</code> de la boucle : après, il est hors de sa portée." },
        { type: "depliable", genre: "plus", titre: "Autres erreurs fréquentes", blocs: [
          { type: "erreur", code: "for (int i = 0, i < 5, i++) {\n    System.out.println(i);\n}", message: "error: ';' expected", explication: "Traduction : « ; attendu ». Les trois parties du <code>for</code> sont séparées par des points-virgules, pas des virgules.", correction: "for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}" }
        ] }
      ]
    }
  ],
  retenir: [
    "<code>for</code> quand on connaît le nombre de tours.",
    "L'accumulateur se crée avant la boucle.",
    "Une variable n'existe que jusqu'à la <code>}</code> de son bloc : c'est sa portée."
  ],
  test: [
    { type: "quiz", question: "Combien de tours fait <code>for (int i = 1; i &lt; 10; i++)</code> ?", options: [
      { t: "10", pourquoi: "Avec <code>&lt;</code>, 10 n'est pas compris." },
      { t: "9", ok: true, pourquoi: "i va de 1 à 9 : neuf tours." },
      { t: "11", pourquoi: "Il faudrait partir de 0 et aller jusqu'à 10 compris." }
    ] },
    { type: "predire", rappel: "m03-l02", code: "int i = 2;\nint k = ++i;\nSystem.out.println(i + \" \" + k);", reponse: "3 3", explication: "Pré-incrémentation : i passe d'abord à 3, puis k reçoit 3." }
  ]
});
