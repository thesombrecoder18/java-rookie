JR.lecon({
  id: "m01-l03",
  titre: "Lire un message d'erreur sans paniquer",
  duree: 7,
  objectif: "Trouver, dans un message de javac, le fichier, la ligne et la cause d'une erreur.",
  sections: [
    {
      titre: "Que dit javac ?",
      blocs: [
        { type: "pourquoi", html: "Tu as oublié un <code>;</code> et rien ne se lance : quelques lignes en anglais s'affichent. Elles ne te grondent pas, elles t'indiquent où chercher." },
        { type: "texte", html: "Quand <code>javac</code> trouve une faute, il refuse de traduire : c'est une <strong>erreur de compilation</strong>. Rien ne s'exécute." },
        { type: "illus", ascii: "Main.java:3: error: ';' expected\n└───┬───┘ ▲         └─────┬────┘\n fichier  ligne           cause\n\nSystem.out.println(\"a\")\n                       ^ le chapeau", legende: "Trois informations, puis la ligne fautive avec un chapeau ^ sous l'endroit repéré." },
        { type: "texte", html: "Lis toujours dans cet ordre : le fichier (<code>Main.java</code>), le numéro de ligne (<code>3</code>), la cause (<code>';' expected</code> : « point-virgule attendu »). Le chapeau <code>^</code> montre l'endroit où <code>javac</code> s'est arrêté. Le numéro compte les lignes du fichier complet, cadre compris." },
      ]
    },
    {
      titre: "Trois fautes, trois messages",
      blocs: [
        { type: "erreur", code: "System.out.println(\"a\")", message: "error: ';' expected", explication: "Traduction : « point-virgule attendu ». L'instruction n'est pas terminée.", correction: "System.out.println(\"a\");" },
        { type: "erreur", code: "system.out.println(\"a\");", message: "error: package system does not exist", explication: "Traduction : « le paquetage system n'existe pas ». Ne connaissant pas <code>system</code>, Java devine un nom de paquetage (un groupe d'outils). En réalité, c'est une faute de casse : il faut <code>System</code>, avec un S majuscule.", correction: "System.out.println(\"a\");" },
        { type: "erreur", code: "System.out.println(\"a);", message: "error: unclosed string literal", explication: "Traduction : « texte non fermé ». Un guillemet ouvre le texte, mais aucun ne le ferme.", correction: "System.out.println(\"a\");" },
        { type: "quiz", question: "Le message dit <code>unclosed string literal</code>. Que vérifies-tu ?", options: [
          { t: "Les guillemets", ok: true, pourquoi: "Un texte ouvert par <code>\"</code> doit être fermé par un autre <code>\"</code>." },
          { t: "Le point-virgule", pourquoi: "Ce serait <code>';' expected</code>." },
          { t: "Les majuscules", pourquoi: "Une faute de casse donnerait par exemple <code>package system does not exist</code>." }
        ] }
      ]
    },
    {
      titre: "La première d'abord",
      blocs: [
        { type: "attention", html: "Le chapeau <code>^</code> ne tombe pas toujours pile sur la faute : pour un <code>;</code> oublié, il pointe juste <strong>après</strong> la fin de l'instruction, là où le <code>;</code> manque." },
        { type: "cle", html: "Corrige la première erreur, puis recompile : une seule faute peut en entraîner d'autres." },
        { type: "code", run: "aucun", titre: "Ce qu'affiche javac pour le programme ci-dessous", code: "Main.java:3: error: ';' expected\n        System.out.println(\"Bonjour\")\n                                     ^\nMain.java:4: error: unclosed string literal\n        System.out.println(\"Awa);\n                           ^\n2 errors" },
        { type: "exo", niveau: "corriger", enonce: "Voici le programme qui a produit ces deux messages. Corrige-le.", code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Bonjour\")\n        System.out.println(\"Awa);\n    }\n}", indice: "Lis les messages dans l'ordre : ligne 3, puis ligne 4.", run: "fichier", corrige: { code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Bonjour\");\n        System.out.println(\"Awa\");\n    }\n}", sortie: "Bonjour\nAwa", html: "Ligne 3 : il manquait le <code>;</code>. Ligne 4 : il manquait le guillemet qui ferme le texte." } }
      ]
    }
  ],
  retenir: [
    "Un message de javac donne le fichier, la ligne, puis la cause.",
    "Corrige la première erreur d'abord, puis recompile.",
    "Les messages sont en anglais : le <a href=\"lexique.html\">lexique</a> les traduit."
  ],
  test: [
    { type: "quiz", question: "Dans <code>Main.java:5: error: ';' expected</code>, où est le problème ?", options: [
      { t: "Ligne 5 de Main.java", ok: true, pourquoi: "Le nombre après le nom du fichier est le numéro de ligne." },
      { t: "Il y a 5 erreurs", pourquoi: "Le nombre d'erreurs est donné à la fin, par exemple <code>1 error</code>." },
      { t: "Colonne 5", pourquoi: "C'est le chapeau <code>^</code> qui montre la position dans la ligne." }
    ] },
    { type: "quiz", question: "<code>javac</code> affiche 3 erreurs. Par laquelle commencer ?", options: [
      { t: "La dernière", pourquoi: "Les suivantes sont parfois de simples conséquences de la première." },
      { t: "La première", ok: true, pourquoi: "On la corrige, on recompile, et souvent d'autres messages disparaissent." },
      { t: "Peu importe", pourquoi: "L'ordre compte : la première faute peut en provoquer d'autres." }
    ] }
  ]
});
