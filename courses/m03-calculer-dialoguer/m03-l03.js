JR.lecon({
  id: "m03-l03",
  titre: "Lire au clavier avec Scanner",
  duree: 7,
  objectif: "Faire attendre le programme pour qu'il lise ce que tu tapes.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Les notes d'Adama sont écrites dans le code. Pour en changer, il faut modifier le programme. Adama voudrait plutôt les <strong>taper</strong> pendant que le programme tourne." },
        { type: "illus", ascii: " programme          toi\n┌─────────────┐\n│ Ton âge : _ │ ◀── tu tapes 20\n│  (attend…)  │ ◀── puis Entrée ⏎\n└──────┬──────┘\n       ▼\n age reçoit 20, on repart", legende: "Comme au guichet : le programme pose la question, s'arrête, et attend ta réponse puis la touche Entrée." }
      ]
    },
    {
      titre: "La recette",
      blocs: [
        { type: "texte", html: "Java a un lecteur de clavier tout prêt : <code>Scanner</code>. Deux lignes de recette le préparent." },
        { type: "code", titre: "Saisie au clavier : 20 ⏎", run: "fichier", entree: "20\n", code: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"Ton âge : \");\n        int age = sc.nextInt();\n        System.out.println(\"Dans un an : \" + (age + 1) + \" ans\");\n    }\n}", sortie: "Ton âge : Dans un an : 21 ans", lignes: ["Tout en haut, AVANT la classe : dit à Java dans quel rayon trouver l'outil Scanner.", null, null, null, "Crée un lecteur nommé sc, branché sur le clavier (System.in). Le mot new sera expliqué en m06 : recopie la ligne telle quelle.", "L'invite, avec print (sans retour à la ligne).", "Le programme s'arrête ici, attend un nombre entier puis Entrée, et le range dans age.", null, null, null] },
        { type: "compare", gauche: { titre: "print : AB", code: "System.out.print(\"A\");\nSystem.out.print(\"B\");" }, droite: { titre: "println : A, puis B", code: "System.out.println(\"A\");\nSystem.out.println(\"B\");" }, conclusion: "<code>print</code> ne va pas à la ligne : la réponse se tape juste après l'invite." },
        { type: "texte", html: "Le message affiché avant la saisie s'appelle une <strong>invite</strong>. Le 20 tapé vient du clavier, pas du programme : il n'apparaît pas dans la sortie ici, d'où « Ton âge : Dans un an… » collés. Sur OneCompiler, tape la saisie à l'avance dans l'onglet STDIN, une valeur par ligne." }
      ]
    },
    {
      titre: "Un next… par type",
      blocs: [
        { type: "texte", html: "Une commande par sorte de valeur : <code>nextInt()</code> pour un <code>int</code>, <code>nextDouble()</code> pour un <code>double</code>, <code>next()</code> pour un seul mot, <code>nextLine()</code> pour toute la ligne. Désormais, on ne montre que l'intérieur de <code>main</code> : l'<code>import</code> reste en haut du fichier." },
        { type: "code", titre: "Saisie : Adama SECK ⏎", entree: "Adama SECK\n", code: "Scanner sc = new Scanner(System.in);\nString mot = sc.next();\nSystem.out.println(\"Lu : \" + mot);", sortie: "Lu : Adama" },
        { type: "quiz", question: "Pour lire « Adama SECK » en entier, quelle commande ?", options: [
          { t: "<code>sc.next()</code>", pourquoi: "<code>next()</code> s'arrête au premier espace : il lit seulement « Adama »." },
          { t: "<code>sc.nextLine()</code>", ok: true, pourquoi: "<code>nextLine()</code> lit toute la ligne, espaces compris." }
        ] }
      ]
    },
    {
      titre: "Quand ça plante",
      blocs: [
        { type: "erreur", run: "erreur-execution", entree: "vingt\n", code: "Scanner sc = new Scanner(System.in);\nint age = sc.nextInt();", message: "Exception in thread \"main\" java.util.InputMismatchException", explication: "Traduction : « la saisie ne correspond pas au type attendu ». On a tapé <code>vingt</code> au lieu d'un nombre. Le programme a compilé, mais il s'arrête en route : c'est une <strong>erreur d'exécution</strong>. <code>javac</code> ne pouvait pas la prévoir." },
        { type: "exo", niveau: "reproduire", enonce: "Lis deux nombres entiers au clavier, puis affiche leur somme. Teste avec la saisie <code>4 ⏎ 6 ⏎</code>.", indice: "Deux <code>sc.nextInt()</code>, rangés dans deux variables.", entree: "4\n6\n", corrige: { code: "Scanner sc = new Scanner(System.in);\nSystem.out.print(\"Premier nombre : \");\nint a = sc.nextInt();\nSystem.out.print(\"Second nombre : \");\nint b = sc.nextInt();\nSystem.out.println(\"Somme : \" + (a + b));", sortie: "Premier nombre : Second nombre : Somme : 10", html: "Les nombres tapés (4 et 6) n'apparaissent pas dans la sortie : seules les invites et le résultat s'affichent." } },
        { type: "depliable", genre: "outil", titre: "Virgule ou point ?", blocs: [
          { type: "attention", html: "Sur OneCompiler, tape le point : <code>12.5</code>. Sur ton ordinateur en français, <code>nextDouble()</code> attend peut-être la virgule : <code>12,5</code> (sinon, <code>InputMismatchException</code>). En anglais, <code>1,500</code> est même lu 1500, sans erreur. Dans le code, c'est toujours le point." }
        ] },
        { type: "depliable", genre: "plus", titre: "Autres erreurs fréquentes", blocs: [
          { type: "erreur", run: "erreur-fichier", code: "public class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n    }\n}", message: "error: cannot find symbol\n  symbol:   class Scanner", explication: "Traduction : « symbole introuvable : la classe Scanner ». L'<code>import</code> a été oublié : Java ne sait pas dans quel rayon chercher l'outil.", correction: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n    }\n}" }
        ] },
        { type: "depliable", genre: "examen", titre: "Fermer le lecteur (slide 59)", blocs: [
          { type: "cours", html: "Le cours termine en fermant le lecteur avec <code>sc.close();</code>, quand on n'a plus rien à lire.", ref: "slide 59" }
        ] }
      ]
    }
  ],
  retenir: [
    "<code>import java.util.Scanner;</code> en haut, puis <code>Scanner sc = new Scanner(System.in);</code>",
    "Un <code>next…</code> par type : <code>nextInt</code>, <code>nextDouble</code>, <code>next</code>, <code>nextLine</code>.",
    "<code>print</code> garde l'invite et la réponse sur la même ligne."
  ],
  test: [
    { type: "quiz", question: "L'utilisateur tape <code>Fatou Diop</code>. Que lit <code>sc.next()</code> ?", options: [
      { t: "Fatou Diop", pourquoi: "Ce serait <code>nextLine()</code>, qui lit toute la ligne." },
      { t: "Fatou", ok: true, pourquoi: "<code>next()</code> lit un seul mot : il s'arrête à l'espace." },
      { t: "Diop", pourquoi: "Le lecteur commence par le début de la saisie." }
    ] },
    { type: "quiz", rappel: "m02-l03", question: "Adama tape sa moyenne, 12.5. Dans quel type la ranger ?", options: [
      { t: "<code>int</code>", pourquoi: "Un <code>int</code> ne garde que des nombres entiers." },
      { t: "<code>double</code>", ok: true, pourquoi: "Un réel se range dans un <code>double</code>, lu avec <code>nextDouble()</code>." },
      { t: "<code>char</code>", pourquoi: "Un <code>char</code> contient un seul caractère, pas un nombre à virgule." }
    ] }
  ]
});
