JR.lecon({
  id: "m04-l03",
  titre: "switch : choisir parmi des cas",
  duree: 7,
  objectif: "Choisir parmi plusieurs valeurs précises sans empiler les else if.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Un menu propose 1, 2 ou 3. Avec <code>if</code>, on écrit une longue cascade : <code>if (choix == 1) … else if (choix == 2) …</code>. Java a une forme plus lisible pour ces tests d'égalité." },
        { type: "illus", ascii: " switch (choix), choix = 2\n\n    case 1 : ...        on passe\n  ► case 2 : ... break; on s'arrête,\n                        puis on sort\n    case 3 : ...\n    default : ...       (les autres)", legende: "Comme un ascenseur : il va directement à l'étage demandé. break, c'est « on descend ici »." },
        { type: "texte", html: "<code>switch</code> compare une variable à une liste de valeurs. Chaque <code>case</code> est un cas possible ; <code>break</code> fait sortir du <code>switch</code> ; <code>default</code> traite toutes les autres valeurs. C'est le SELON de l'algo." }
      ]
    },
    {
      titre: "L'exemple du cours",
      blocs: [
        { type: "code", titre: "slide 47", code: "char sexe = 'F';\nswitch (sexe) {\n    case 'M':\n        System.out.println(\"Masculin\");\n        break;\n    case 'F':\n        System.out.println(\"Féminin\");\n        break;\n    default:\n        System.out.println(\"Erreur\");\n}", sortie: "Féminin", lignes: [null, "On regarde la valeur de sexe.", "Est-ce 'M' ? Non : on passe.", null, null, "Est-ce 'F' ? Oui : on entre ici.", null, "break : on sort du switch, la suite est ignorée.", "Pour toute autre valeur que 'M' et 'F'.", null, "Fin du switch."] }
      ]
    },
    {
      titre: "Le break oublié",
      blocs: [
        { type: "predire", question: "Les <code>break</code> ont été oubliés. Que va afficher ce programme ? Indice : sans <code>break</code>, rien n'arrête l'exécution.", code: "int choix = 1;\nswitch (choix) {\n    case 1:\n        System.out.println(\"Moyenne\");\n    case 2:\n        System.out.println(\"Mention\");\n    default:\n        System.out.println(\"Quitter\");\n}", reponse: "Moyenne\nMention\nQuitter", explication: "On entre au <code>case 1</code>. Sans <code>break</code>, l'exécution continue dans les cas suivants, sans même les tester." },
        { type: "attention", html: "Java ne signale rien : le programme compile et se trompe en silence. Un réflexe : <strong>un <code>break</code> à la fin de chaque <code>case</code></strong>." },
        { type: "exo", niveau: "modifier", enonce: "Corrige ce menu pour qu'avec <code>choix = 1</code>, il n'affiche que « Moyenne ».", code: "int choix = 1;\nswitch (choix) {\n    case 1:\n        System.out.println(\"Moyenne\");\n    case 2:\n        System.out.println(\"Mention\");\n    default:\n        System.out.println(\"Quitter\");\n}", indice: "Un <code>break;</code> à la fin du <code>case 1</code> et du <code>case 2</code>.", corrige: { code: "int choix = 1;\nswitch (choix) {\n    case 1:\n        System.out.println(\"Moyenne\");\n        break;\n    case 2:\n        System.out.println(\"Mention\");\n        break;\n    default:\n        System.out.println(\"Quitter\");\n}", sortie: "Moyenne" } }
      ]
    },
    {
      titre: "switch ou if ?",
      blocs: [
        { type: "compare", gauche: { titre: "switch", html: "Une variable comparée à des <strong>valeurs précises</strong> : 1, 2, 3 ou 'M', 'F'. Fonctionne notamment avec <code>int</code>, <code>char</code> et <code>String</code> (pas avec <code>double</code>, <code>long</code> ni <code>boolean</code>)." }, droite: { titre: "if … else if", html: "Des <strong>intervalles</strong> ou des conditions combinées : <code>note &gt;= 16</code>, <code>age &gt;= 18 &amp;&amp; inscrit</code>." }, conclusion: "switch ne teste que l'égalité. Pour « au moins 16 », il faut un if." },
        { type: "depliable", genre: "plus", titre: "Un switch sur un texte", blocs: [
          { type: "code", code: "String langue = \"wolof\";\nswitch (langue) {\n    case \"wolof\":\n        System.out.println(\"Nanga def ?\");\n        break;\n    case \"anglais\":\n        System.out.println(\"How are you?\");\n        break;\n    default:\n        System.out.println(\"Comment vas-tu ?\");\n}", sortie: "Nanga def ?" }
        ] },
        { type: "depliable", genre: "plus", titre: "Autres erreurs fréquentes", blocs: [
          { type: "erreur", code: "int note = 17;\nswitch (note) {\n    case note >= 16:\n        System.out.println(\"Très bien\");\n        break;\n}", message: "error: incompatible types: boolean cannot be converted to int", explication: "Traduction : « types incompatibles : un boolean ne peut pas être converti en int ». Un <code>case</code> attend une valeur fixe du même type que <code>note</code>, pas une condition.", correction: "int note = 17;\nif (note >= 16) {\n    System.out.println(\"Très bien\");\n}" }
        ] }
      ]
    }
  ],
  retenir: [
    "Un <code>break</code> à la fin de chaque <code>case</code>.",
    "<code>default</code> traite toutes les autres valeurs.",
    "<code>switch</code> ne teste que des égalités ; pour un intervalle, utilise <code>if</code>."
  ],
  test: [
    { type: "predire", code: "int n = 2;\nswitch (n) {\n    case 1:\n        System.out.println(\"un\");\n        break;\n    case 2:\n        System.out.println(\"deux\");\n    case 3:\n        System.out.println(\"trois\");\n        break;\n}", reponse: "deux\ntrois", explication: "On entre au <code>case 2</code>, qui n'a pas de <code>break</code> : on continue dans le <code>case 3</code>, dont le <code>break</code> fait sortir." },
    { type: "quiz", rappel: "m02-l03", question: "Dans <code>case 'M':</code>, pourquoi des apostrophes et pas des guillemets ?", options: [
      { t: "Parce que <code>sexe</code> est un <code>char</code> : un seul caractère s'écrit entre <code>' '</code>", ok: true, pourquoi: "<code>'M'</code> est un <code>char</code> ; <code>\"M\"</code> serait un <code>String</code>, un texte." },
      { t: "C'est pareil, on peut écrire l'un ou l'autre", pourquoi: "Non : <code>' '</code> pour un <code>char</code>, <code>\" \"</code> pour un <code>String</code>. Ce ne sont pas les mêmes types." },
      { t: "Parce que <code>switch</code> interdit les guillemets", pourquoi: "<code>switch</code> accepte aussi les <code>String</code> (entre guillemets) : c'est le type de la variable qui décide." }
    ] }
  ]
});
