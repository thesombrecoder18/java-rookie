JR.lecon({
  id: "m01-l01",
  titre: "Ton premier programme tourne",
  duree: 7,
  objectif: "Faire tourner un vrai programme Java en quelques minutes, avant toute théorie.",
  sections: [
    {
      titre: "Lance-le tout de suite",
      blocs: [
        { type: "pourquoi", html: "Avant les explications, tu vas voir Java fonctionner. Un <strong>programme</strong>, c'est une suite d'ordres que l'ordinateur exécute, l'un après l'autre. Voici le tien." },
        { type: "code", run: "fichier", titre: "Main.java", code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World !\");\n    }\n}", sortie: "Hello World !" },
        { type: "texte", html: "Clique sur « Copier pour essayer », puis suis le dépliable ci-dessous : en deux minutes, <code>Hello World !</code> s'affiche chez toi." },
        { type: "depliable", genre: "outil", titre: "Sans rien installer : OneCompiler", blocs: [
          { type: "texte", html: "Ouvre <strong>onecompiler.com/java</strong>. Remplace le code de la grande zone par le tien (sur téléphone : appui long, « Tout sélectionner », puis « Coller »). Clique sur « Run » : le résultat apparaît à côté, ou en dessous sur téléphone. Si le bouton porte un autre nom chez toi, cherche « Run »." },
          { type: "texte", html: "L'outil demande que le programme s'appelle <code>Main</code>, comme tous les exemples de ce site. Plus tard, la zone <strong>STDIN</strong> (ou « Input ») servira à taper à l'avance ce que le programme lira au clavier. OneCompiler utilise un Java plus récent que celui conseillé pour ton ordinateur : tout ce que montre ce site marche sur les deux." }
        ] },
        { type: "depliable", genre: "outil", titre: "Sur ton ordinateur", blocs: [
          { type: "texte", html: "Il te faut le <strong>JDK</strong> (le kit pour écrire et lancer du Java). Installe le JDK 21 « Temurin » depuis adoptium.net. Sous Linux (Ubuntu 22.04 ou plus récent), une commande installe un JDK 21 équivalent :" },
          { type: "code", run: "aucun", code: "sudo apt install openjdk-21-jdk" },
          { type: "texte", html: "Vérifie ensuite, dans un <strong>terminal</strong> (la fenêtre où l'on tape des commandes), que tout répond. Chaque commande affiche un numéro de version :" },
          { type: "code", run: "aucun", code: "java -version\njavac -version" },
          { type: "attention", html: "Si tu lis <code>'javac' n'est pas reconnu…</code> (ou, dans PowerShell, <code>Le terme «javac» n'est pas reconnu…</code>), Windows ne trouve pas Java : le réglage appelé PATH n'est pas fait. Réinstalle en cochant l'option qui parle de PATH, puis ferme et rouvre le terminal." },
          { type: "texte", html: "Pour écrire ton code, VS Code avec l'extension « Extension Pack for Java » convient bien : un lien « Run » apparaît au-dessus de ton programme." }
        ] }
      ]
    },
    {
      titre: "Le cadre et ta ligne",
      blocs: [
        { type: "illus", ascii: "┌ le cadre ────────────────────┐\n│ public class Main {          │\n│  public static void main(…) {│\n│ ╔══════════════════════════╗ │\n│ ║ System.out.println(\"…\"); ║ │◀ ici\n│ ╚══════════════════════════╝ │\n│  }                           │\n│ }                            │\n└──────────────────────────────┘", legende: "Tout autour : le cadre, toujours le même. Au milieu : la zone où tu écris." },
        { type: "texte", html: "Presque tout ce code est un <strong>cadre</strong> : un emballage obligatoire, que tu recopies tel quel et que tu comprendras mot à mot au fil du parcours. Une seule ligne compte pour l'instant : <code>System.out.println(\"…\");</code> affiche le texte placé entre les guillemets, puis passe à la ligne." },
        { type: "quiz", question: "Que va afficher <code>System.out.println(\"Bonjour Dakar\");</code> ?", options: [
          { t: "<code>Bonjour Dakar</code>", ok: true, pourquoi: "Le texte entre guillemets est affiché tel quel, sans les guillemets." },
          { t: "<code>\"Bonjour Dakar\"</code>", pourquoi: "Les guillemets délimitent le texte : ils ne sont pas affichés." },
          { t: "<code>println Bonjour Dakar</code>", pourquoi: "<code>println</code> est l'ordre d'afficher : il n'apparaît pas à l'écran." }
        ] }
      ]
    },
    {
      titre: "Deux lignes à la suite",
      blocs: [
        { type: "texte", html: "Au milieu du cadre, tu peux écrire plusieurs lignes : elles s'exécutent de haut en bas. Désormais, on ne montre souvent que ces lignes ; le cadre autour reste le même." },
        { type: "predire", code: "System.out.println(\"Un\");\nSystem.out.println(\"Deux\");\nSystem.out.println(\"Trois\");", reponse: "Un\nDeux\nTrois", explication: "Trois <code>println</code>, trois lignes, dans l'ordre où elles sont écrites." },
        { type: "attention", html: "Si tu effaces par erreur un <code>;</code> ou un guillemet, le programme ne se lance plus et un message en anglais s'affiche. Pas de panique : <strong>Ctrl+Z</strong> annule ta dernière modification. On apprendra à lire ces messages deux leçons plus loin." },
        { type: "exo", niveau: "modifier", enonce: "Modifie ce programme pour qu'il affiche ton prénom, puis ta filière, sur deux lignes. Garde tout le programme, cadre compris.", code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World !\");\n    }\n}", indice: "Deux <code>System.out.println</code> l'un sous l'autre, chacun avec son texte entre guillemets et son <code>;</code>.", run: "fichier", corrige: { code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Awa\");\n        System.out.println(\"Génie informatique\");\n    }\n}", sortie: "Awa\nGénie informatique", html: "Avec ton prénom et ta filière à toi, bien sûr. Le cadre ne bouge pas : seules les lignes du milieu changent." } }
      ]
    }
  ],
  retenir: [
    "Un programme Java tourne dans un cadre, que l'on recopie tel quel.",
    "Tu écris tes lignes au milieu du cadre ; elles s'exécutent de haut en bas.",
    "<code>System.out.println(\"…\");</code> affiche le texte entre guillemets."
  ],
  test: [
    { type: "predire", code: "System.out.println(\"Java\");\nSystem.out.println(\"Rookie\");", reponse: "Java\nRookie", explication: "Chaque <code>println</code> affiche son texte, puis passe à la ligne." },
    { type: "quiz", question: "Dans ce programme, quelle partie as-tu le droit de changer librement ?", options: [
      { t: "La ligne <code>public class Main {</code>", pourquoi: "Elle fait partie du cadre : on la recopie telle quelle." },
      { t: "Le texte entre les guillemets du <code>println</code>", ok: true, pourquoi: "C'est ta zone : le texte affiché est celui que tu choisis." },
      { t: "Les accolades <code>}</code> de la fin", pourquoi: "Elles ferment le cadre : si tu en enlèves une, le programme ne se lance plus." }
    ] }
  ]
});
