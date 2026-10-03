JR.lecon({
  id: "m01-l02",
  titre: "javac, java et le cadre obligatoire",
  duree: 7,
  objectif: "Comprendre ce qui se passe quand on lance un programme, et reconnaître les pièces du cadre.",
  sections: [
    {
      titre: "Du texte à l'exécution",
      blocs: [
        { type: "pourquoi", html: "L'ordinateur ne comprend que des 0 et des 1. Or ton programme est du texte. Que s'est-il passé quand tu as cliqué sur « Run » ?" },
        { type: "illus", ascii: " Main.java ─▶ javac ─▶ Main.class ─▶ JVM\n ton texte   traduit   bytecode    exécute\n\n     une JVM existe pour Windows,\n            Linux et Mac", legende: "Deux étapes : traduire, puis exécuter." },
        { type: "texte", html: "Étape 1 : le <strong>compilateur</strong> <code>javac</code>, un traducteur, lit ton fichier <code>Main.java</code> et le traduit en <strong>bytecode</strong>, un code compact rangé dans <code>Main.class</code>." },
        { type: "texte", html: "Étape 2 : la <strong>JVM</strong> (machine virtuelle Java), un programme installé sur l'ordinateur, exécute ce bytecode. Il existe une JVM pour Windows, Linux et Mac : le même <code>.class</code> tourne partout. Sur OneCompiler, le bouton « Run » fait les deux étapes pour toi." },
        { type: "simple", html: "<p>Pense à un livre écrit en wolof qu'on veut faire lire partout. Un traducteur (<code>javac</code>) le traduit une fois dans une langue commune (le bytecode). Ensuite, dans chaque pays, un lecteur (la JVM) lit cette version à voix haute.</p>" },
        { type: "ordre", run: "aucun", question: "Sur un ordinateur, dans un terminal : remets les étapes dans l'ordre.", lignes: ["Écrire le code dans HelloWorld.java", "Taper javac HelloWorld.java", "Le fichier HelloWorld.class apparaît", "Taper java HelloWorld"], explication: "On écrit, on compile (<code>javac</code>), le bytecode apparaît, puis on exécute (<code>java</code>), avec le nom de la classe, sans « .class »." },
        { type: "depliable", genre: "culture", titre: "Un peu d'histoire", blocs: [
          { type: "texte", html: "Java a été créé par l'entreprise Sun en 1995 ; Oracle a racheté Sun, et donc Java, en 2010. Une nouvelle version sort tous les six mois ; certaines sont dites <strong>LTS</strong> (« support à long terme ») : elles sont corrigées pendant des années, et ce sont elles qu'on installe en priorité." },
          { type: "ecart", dit: "« Versions LTS actuelles : 7, 8, 11 &amp; 17, … 24, 25 » (slide 20).", vrai: "Les versions LTS sont 8, 11, 17, 21 et 25. Java 7 date d'avant ce calendrier (il a pourtant été suivi longtemps) ; Java 24 n'est pas une LTS." }
        ] }
      ]
    },
    {
      titre: "Le cadre, pièce par pièce",
      blocs: [
        { type: "illus", ascii: "┌ HelloWorld.java : le fichier ┐\n│ ┌ class HelloWorld ────────┐ │\n│ │ ┌ main ────────────────┐ │ │\n│ │ │ instructions…        │ │ │\n│ │ └──────────────────────┘ │ │\n│ └──────────────────────────┘ │\n└──────────────────────────────┘", legende: "Des boîtes rangées l'une dans l'autre, comme des poupées russes." },
        { type: "code", run: "fichier", copier: false, titre: "HelloWorld.java (slide 21)", code: "public class HelloWorld {\n    public static void main(String[] args) {\n        // ce qui suit // est ignoré par Java\n        System.out.println(\"Hello World !\");\n    }\n}", sortie: "Hello World !", lignes: [
          "La classe HelloWorld : pour l'instant, la boîte qui contient ton code. Comme elle est marquée public, son nom doit être celui du fichier.",
          "La méthode principale main (une méthode = un bloc d'instructions qui porte un nom) : le point de départ du programme.",
          "Un commentaire : une note pour les humains.",
          "Une instruction, terminée par ;",
          "Fin du bloc de main.",
          "Fin du bloc de la classe."
        ] },
        { type: "attention", html: "Sur OneCompiler, garde le nom <code>Main</code> : l'outil range toujours ton code dans <code>Main.java</code>, et <code>HelloWorld</code> y serait refusé." },
        { type: "texte", html: "Un <strong>bloc</strong> est un groupe de lignes entre <code>{</code> et <code>}</code>. Une <strong>instruction</strong> est un ordre, qui se termine par <code>;</code>. Un <strong>commentaire</strong>, après <code>//</code>, est ignoré par Java." },
        { type: "cadre", connus: [], html: "Tout est gris : pour l'instant, c'est un formulaire officiel. Les cases imprimées ne bougent pas, tu remplis seulement la zone prévue." },
        { type: "depliable", genre: "plus", titre: "Quand chaque mot sera expliqué", blocs: [
          { type: "texte", html: "<code>main</code> : expliqué ici, puis complété au module 5.<br><code>static</code> et <code>void</code> : module 5.<br><code>class</code> : ici en version courte, en entier au module 6.<br><code>public</code> : module 6.<br><code>String[] args</code> : dernière leçon." }
        ] }
      ]
    },
    {
      titre: "Majuscules et minuscules",
      blocs: [
        { type: "texte", html: "Java respecte la <strong>casse</strong> : il distingue majuscules et minuscules. <code>System</code> et <code>system</code> sont deux mots différents pour lui." },
        { type: "exo", niveau: "corriger", enonce: "Ce programme contient deux fautes. Trouve-les.", code: "public class Main {\n    public static void main(String[] args) {\n        system.out.println(\"Bonjour\");\n    }", indice: "Regarde la casse du premier mot de l'instruction, puis compte les <code>{</code> et les <code>}</code>.", run: "fichier", corrige: { code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Bonjour\");\n    }\n}", sortie: "Bonjour", html: "<code>System</code> prend une majuscule, et il manquait la <code>}</code> qui ferme la classe : deux <code>{</code> ouvertes, il faut deux <code>}</code>." } },
        { type: "depliable", genre: "outil", titre: "Sur ton ordinateur : deux pièges du terminal", blocs: [
          { type: "erreur", run: "aucun", code: "// fichier enregistré sous le nom Hello.java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World !\");\n    }\n}", message: "error: class HelloWorld is public, should be declared in a file named HelloWorld.java", explication: "Traduction : « la classe HelloWorld est publique, elle devrait être dans un fichier nommé HelloWorld.java ». Le nom du fichier doit être celui de la classe <code>public</code>, majuscules comprises.", correction: "// renommer le fichier en HelloWorld.java" },
          { type: "attention", html: "Pour exécuter, on donne le nom de la <strong>classe</strong>, pas du fichier. <code>java HelloWorld.class</code> répond <code>Could not find or load main class HelloWorld.class</code> (sur un ordinateur en français : <code>Erreur : impossible de trouver ou de charger la classe principale</code>). Écris <code>java HelloWorld</code>." }
        ] }
      ]
    }
  ],
  retenir: [
    "<code>javac</code> traduit (compile), <code>java</code> exécute.",
    "Tout le code est dans une classe, et le programme démarre dans <code>main</code>.",
    "Chaque instruction finit par <code>;</code> et Java distingue majuscules et minuscules."
  ],
  test: [
    { type: "quiz", question: "Quel est le rôle de <code>javac</code> ?", options: [
      { t: "Exécuter le programme", pourquoi: "C'est le rôle de <code>java</code>, qui lance la JVM." },
      { t: "Traduire le fichier <code>.java</code> en bytecode", ok: true, pourquoi: "C'est le compilateur : il produit le fichier <code>.class</code>." },
      { t: "Écrire le code à ta place", pourquoi: "Le code, c'est toi qui l'écris." }
    ] },
    { type: "quiz", question: "Le fichier contient <code>public class Moyenne</code>. Comment doit-il s'appeler ?", options: [
      { t: "<code>moyenne.java</code>", pourquoi: "La casse compte : M majuscule obligatoire." },
      { t: "<code>Moyenne.java</code>", ok: true, pourquoi: "Même nom que la classe <code>public</code>, majuscules comprises, suivi de <code>.java</code>." },
      { t: "<code>Moyenne.class</code>", pourquoi: "Le <code>.class</code> est créé par <code>javac</code> ; toi, tu écris le <code>.java</code>." }
    ] }
  ]
});
