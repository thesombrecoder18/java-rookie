/* Généré par tools/manifeste.mjs à partir de docs/carte-pedagogique.md — ne pas modifier à la main. */
JR.parcours({
  "modules": [
    {
      "id": "m01-premiers-pas",
      "titre": "Premiers pas : ton premier programme",
      "optionnel": false,
      "resume": "Écrire, lancer et lire ton tout premier programme.",
      "objectifs": [
        "faire tourner un premier programme, en ligne ou sur ton ordinateur",
        "expliquer ce que font javac et java, et reconnaître le cadre obligatoire",
        "lire un message d'erreur de compilation"
      ],
      "lecons": [
        {
          "id": "m01-l01",
          "titre": "Ton premier programme tourne",
          "duree": 7
        },
        {
          "id": "m01-l02",
          "titre": "javac, java et le cadre obligatoire",
          "duree": 7
        },
        {
          "id": "m01-l03",
          "titre": "Lire un message d'erreur sans paniquer",
          "duree": 7
        }
      ]
    },
    {
      "id": "m02-variables",
      "titre": "Ranger des valeurs : variables et types",
      "optionnel": false,
      "resume": "Ranger des valeurs dans des boîtes étiquetées.",
      "objectifs": [
        "créer une variable, changer sa valeur et l'afficher avec du texte",
        "choisir le bon type primitif, et distinguer ' ' de \" \"",
        "passer d'un type à l'autre (conversion automatique et cast)"
      ],
      "lecons": [
        {
          "id": "m02-l01",
          "titre": "Une variable, c'est une boîte",
          "duree": 7
        },
        {
          "id": "m02-l02",
          "titre": "Changer la valeur, et afficher avec du texte",
          "duree": 7
        },
        {
          "id": "m02-l03",
          "titre": "Les types primitifs : entiers, réels, caractères, booléens",
          "duree": 7
        },
        {
          "id": "m02-l04",
          "titre": "Passer d'un type à l'autre : compatibilité et cast",
          "duree": 7
        },
        {
          "id": "m02-l05",
          "titre": "Bilan / défi : la fiche d'Adama (fil rouge v1)",
          "duree": 9
        }
      ]
    },
    {
      "id": "m03-calculer-dialoguer",
      "titre": "Calculer et dialoguer",
      "optionnel": false,
      "resume": "Faire calculer l'ordinateur et lire ce que tape l'utilisateur.",
      "objectifs": [
        "calculer avec + - * / % sans tomber dans le piège de la division entière",
        "utiliser ++, -- et +=, et distinguer i++ de ++i",
        "lire des nombres et du texte au clavier avec Scanner"
      ],
      "lecons": [
        {
          "id": "m03-l01",
          "titre": "Calculer : division entière, reste et priorité",
          "duree": 7
        },
        {
          "id": "m03-l02",
          "titre": "++, -- et les raccourcis",
          "duree": 7
        },
        {
          "id": "m03-l03",
          "titre": "Lire au clavier avec Scanner",
          "duree": 7
        },
        {
          "id": "m03-l04",
          "titre": "Bilan / défi : la moyenne d'Adama (fil rouge v2)",
          "duree": 9
        }
      ]
    },
    {
      "id": "m04-choisir-repeter",
      "titre": "Choisir et répéter",
      "optionnel": false,
      "resume": "Faire des choix (if, switch) et répéter (for, while).",
      "objectifs": [
        "faire choisir le programme avec if/else, &&, ||, ! et switch",
        "répéter avec for, while et do…while",
        "dire où une variable existe (sa portée)"
      ],
      "lecons": [
        {
          "id": "m04-l01",
          "titre": "if … else : choisir un chemin",
          "duree": 7
        },
        {
          "id": "m04-l02",
          "titre": "Combiner des conditions : &&, ||, !",
          "duree": 7
        },
        {
          "id": "m04-l03",
          "titre": "switch : choisir parmi des cas",
          "duree": 7
        },
        {
          "id": "m04-l04",
          "titre": "for : répéter un nombre de fois connu",
          "duree": 7
        },
        {
          "id": "m04-l05",
          "titre": "while et do…while : répéter tant que",
          "duree": 7
        },
        {
          "id": "m04-l06",
          "titre": "Bilan / défi : validation et mention (fil rouge v3)",
          "duree": 9
        }
      ]
    },
    {
      "id": "m05-methodes",
      "titre": "Découper : les méthodes",
      "optionnel": false,
      "resume": "Découper ton programme en petites machines réutilisables.",
      "objectifs": [
        "écrire et appeler une méthode, et comprendre static et void",
        "passer des paramètres et renvoyer un résultat avec return",
        "surcharger une méthode"
      ],
      "lecons": [
        {
          "id": "m05-l01",
          "titre": "Créer ta méthode",
          "duree": 7
        },
        {
          "id": "m05-l02",
          "titre": "Paramètres et return",
          "duree": 7
        },
        {
          "id": "m05-l03",
          "titre": "Même nom, paramètres différents : la surcharge",
          "duree": 7
        }
      ]
    },
    {
      "id": "m06-objets",
      "titre": "Penser objet, et premiers pas en Java objet",
      "optionnel": false,
      "resume": "Penser objet : classes, objets, encapsulation, héritage.",
      "objectifs": [
        "expliquer objet, classe, instance, encapsulation et héritage (partie 1 du cours)",
        "écrire une classe avec des attributs, un constructeur, private et des get/set",
        "créer une classe fille avec extends et super"
      ],
      "lecons": [
        {
          "id": "m06-l01",
          "titre": "Penser objet : état, comportement, identité",
          "duree": 7
        },
        {
          "id": "m06-l02",
          "titre": "Ta première classe Java : attributs et new",
          "duree": 7
        },
        {
          "id": "m06-l03",
          "titre": "Le constructeur : naître complet",
          "duree": 7
        },
        {
          "id": "m06-l04",
          "titre": "Encapsulation : private, get et set",
          "duree": 7
        },
        {
          "id": "m06-l05",
          "titre": "L'héritage : extends et super",
          "duree": 7
        },
        {
          "id": "m06-l06",
          "titre": "Pour aller plus loin : exceptions, interfaces, et la suite",
          "duree": 7
        }
      ]
    }
  ]
});
