JR.lecon({
  id: "m02-l01",
  titre: "Une variable, c'est une boîte",
  duree: 7,
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
        { type: "texte", html: "Une ligne, trois informations : le <strong>type</strong> (<code>int</code>, la sorte de valeur que la boîte accepte), le <strong>nom</strong> (<code>age</code>) et la <strong>valeur</strong> (<code>20</code>). Créer la boîte s'appelle une <strong>déclaration</strong> ; y mettre une première valeur, une <strong>initialisation</strong>. En algo, tu aurais écrit <code>age ← 20</code>." },
        { type: "cle", html: "Type, nom, valeur : c'est la carte d'identité de toute variable." }
      ]
    },
    {
      titre: "Lire ce qu'il y a dedans",
      blocs: [
        { type: "texte", html: "Pour utiliser la valeur, on écrit le nom de la variable, sans guillemets. Java va chercher ce qu'il y a dans la boîte." },
        { type: "code", code: "int age = 20;\nSystem.out.println(age);", sortie: "20" },
        { type: "predire", code: "int notes = 3;\nint absences = 0;\nSystem.out.println(absences);", reponse: "0", explication: "Deux boîtes indépendantes existent, mais on affiche seulement absences, qui contient 0." },
        { type: "quiz", question: "Que fait <code>System.out.println(\"age\");</code> ?", options: [
          { t: "Il affiche 20", pourquoi: "Les guillemets transforment age en simple texte : Java ne regarde pas dans la boîte." },
          { t: "Il affiche age", ok: true, pourquoi: "Entre guillemets, c'est un texte, recopié tel quel." },
          { t: "Il provoque une erreur", pourquoi: "Afficher un texte est tout à fait permis." }
        ] },
        { type: "trous", question: "Complète pour créer une boîte <code>prix</code> qui vaut 500, puis l'afficher.", code: "___ prix = 500;\nSystem.out.println(___);", reponses: [["int"], ["prix"]], explication: "Le type <code>int</code> d'abord, puis on affiche en écrivant le nom de la boîte, sans guillemets.", sortie: "500" }
      ]
    },
    {
      titre: "L'erreur la plus fréquente",
      blocs: [
        { type: "erreur", code: "int age = \"20\";", message: "error: incompatible types: String cannot be converted to int", explication: "Traduction : « types incompatibles : un String ne peut pas être converti en int » (String = le nom que Java donne aux textes). Avec des guillemets, \"20\" est un texte, pas un nombre : une boîte <code>int</code> le refuse.", correction: "int age = 20;" },
        { type: "depliable", genre: "examen", titre: "Les règles pour nommer une variable", blocs: [
          { type: "texte", html: "Un nom contient des lettres, des chiffres, <code>_</code> ou <code>$</code>, mais ne commence pas par un chiffre. Ce ne doit pas être un <strong>mot réservé</strong>, c'est-à-dire un mot que Java utilise déjà (<code>int</code>, <code>class</code>…). Et <code>age</code> et <code>Age</code> sont deux noms différents." },
          { type: "texte", html: "L'usage : un nom clair, en <strong>camelCase</strong> (mots collés, chacun commençant par une majuscule sauf le premier) : <code>noteMaths</code>, <code>anneeNaissance</code>." },
          { type: "code", code: "int noteMaths = 15;\nint _x1 = 3;\nint $total = 0;\nSystem.out.println(noteMaths);", sortie: "15" },
          { type: "erreur", code: "int 2notes = 12;", message: "error: not a statement", explication: "Traduction : « ce n'est pas une instruction ». Un nom ne peut pas commencer par un chiffre : Java ne reconnaît plus la ligne (et ajoute souvent un second message, <code>';' expected</code>).", correction: "int note2 = 12;" },
          { type: "ecart", dit: "Un nom de variable fait « maximum 247 caractères » (slide 24).", vrai: "Java n'impose aucune limite pratique à la longueur d'un nom. Retiens plutôt : un nom court et clair." }
        ] }
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
    ] }
  ]
});
