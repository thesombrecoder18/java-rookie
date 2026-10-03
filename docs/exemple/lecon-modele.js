JR.lecon({
  id: "m02-l01",
  titre: "Une variable, c'est une boîte",
  duree: 6,
  objectif: "Garder une information en mémoire pour pouvoir la réutiliser.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Tu sais afficher un texte avec <code>System.out.println</code>. Mais si ton programme doit se souvenir de l'âge d'un étudiant pour l'utiliser trois fois, il faut le <strong>ranger</strong> quelque part." },
        { type: "illus", ascii: "      étiquette\n         │\n         ▼\n      ┌──────┐\n      │  20  │   ◀── le contenu\n      └──────┘\n         age", legende: "Une boîte, une étiquette (age), un contenu (20)." },
        { type: "texte", html: "Cette boîte s'appelle une <strong>variable</strong> : une case de la mémoire de l'ordinateur, à laquelle on donne un nom, et qui contient une valeur." }
      ]
    },
    {
      titre: "Créer sa première variable",
      blocs: [
        { type: "code", code: "int age = 20;", lignes: ["On crée une boîte nommée age, faite pour ranger un nombre entier (int), et on y met 20."] },
        { type: "boites", items: [{ nom: "age", val: "20", type: "int", maj: true }], legende: "Après cette ligne, la mémoire contient une boîte age qui vaut 20." },
        { type: "texte", html: "Une ligne, trois informations : le <strong>type</strong> (<code>int</code>, la sorte de valeur que la boîte accepte), le <strong>nom</strong> (<code>age</code>), et la <strong>valeur</strong> de départ (<code>20</code>)." },
        { type: "simple", html: "<p>Pense aux casiers d'un vestiaire. Tu colles une étiquette « age » sur un casier et tu y déposes le nombre 20. Plus tard, quand tu as besoin de l'âge, tu ouvres le casier « age » : pas besoin de te souvenir du nombre toi-même.</p>" },
        { type: "cle", html: "Type, nom, valeur : c'est la carte d'identité de toute variable." }
      ]
    },
    {
      titre: "Lire ce qu'il y a dedans",
      blocs: [
        { type: "texte", html: "Pour utiliser la valeur, on écrit simplement le nom de la variable. Java va chercher ce qu'il y a dans la boîte." },
        { type: "code", code: "int age = 20;\nSystem.out.println(age);", sortie: "20" },
        { type: "attention", html: "Avec des guillemets, ce n'est plus la variable : c'est un texte. <code>System.out.println(\"age\");</code> affiche le mot <code>age</code>, pas 20." },
        { type: "quiz", question: "Que fait <code>System.out.println(\"age\");</code> ?", options: [
          { t: "Il affiche 20", pourquoi: "Les guillemets transforment age en simple texte : Java ne regarde pas dans la boîte." },
          { t: "Il affiche age", ok: true, pourquoi: "Entre guillemets, c'est un texte, recopié tel quel." },
          { t: "Il provoque une erreur", pourquoi: "Afficher un texte est tout à fait permis." }
        ] }
      ]
    },
    {
      titre: "Plusieurs boîtes",
      blocs: [
        { type: "texte", html: "Un programme a souvent besoin de plusieurs informations. Chacune a <strong>sa propre boîte</strong>, avec son propre nom." },
        { type: "code", code: "int age = 20;\nint annee = 2026;\nSystem.out.println(age);\nSystem.out.println(annee);", sortie: "20\n2026" },
        { type: "boites", items: [{ nom: "age", val: "20", type: "int" }, { nom: "annee", val: "2026", type: "int" }], legende: "Deux boîtes indépendantes : changer l'une ne touche pas l'autre." },
        { type: "predire", code: "int notes = 3;\nint absences = 0;\nSystem.out.println(absences);", reponse: "0", explication: "On affiche seulement la boîte absences, qui contient 0." },
        { type: "trous", question: "Complète pour créer une boîte <code>prix</code> qui vaut 500, puis l'afficher.", code: "___ prix = 500;\nSystem.out.println(___);", reponses: [["int"], ["prix"]], explication: "Le type <code>int</code> d'abord, puis on affiche en écrivant le nom de la boîte, sans guillemets.", sortie: "500" }
      ]
    },
    {
      titre: "L'erreur la plus fréquente",
      blocs: [
        { type: "erreur", code: "int age = \"20\";", message: "error: incompatible types: String cannot be converted to int", explication: "Avec des guillemets, \"20\" est un <em>texte</em>, pas un nombre. Une boîte <code>int</code> n'accepte que des nombres entiers : Java refuse de compiler.", correction: "int age = 20;" },
        { type: "exo", niveau: "reproduire", enonce: "Crée une variable <code>annee</code> qui contient 2026, puis affiche-la.", corrige: { code: "int annee = 2026;\nSystem.out.println(annee);", sortie: "2026" } }
      ]
    }
  ],
  retenir: [
    "Une variable est une boîte nommée qui garde une valeur en mémoire.",
    "On la crée avec un type, un nom et une valeur : <code>int age = 20;</code>",
    "Pour lire la valeur, on écrit le nom, sans guillemets."
  ],
  test: [
    { type: "predire", code: "int x = 7;\nSystem.out.println(x);", reponse: "7", explication: "On affiche le contenu de la boîte x." },
    { type: "quiz", question: "Laquelle de ces lignes est refusée par Java ?", options: [
      { t: "<code>int age = 18;</code>", pourquoi: "Correct : un entier dans une boîte int." },
      { t: "<code>int age = \"18\";</code>", ok: true, pourquoi: "\"18\" est un texte : il ne rentre pas dans une boîte int." },
      { t: "<code>int age = 0;</code>", pourquoi: "Correct : 0 est un entier comme un autre." }
    ] },
    { type: "predire", code: "int a = 4;\nint b = 6;\nSystem.out.println(b);", reponse: "6", explication: "Deux boîtes existent, mais on n'affiche que b." }
  ]
});
