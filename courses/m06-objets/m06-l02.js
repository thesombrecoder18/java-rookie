JR.lecon({
  id: "m06-l02",
  titre: "Ta première classe Java : attributs et new",
  duree: 7,
  objectif: "Écrire la classe Etudiant en Java, puis fabriquer l'objet Adama et lui parler.",
  sections: [
    {
      titre: "Du rectangle UML au code",
      blocs: [
        { type: "pourquoi", html: "Tu sais dessiner la classe <code>Etudiant</code> en UML. Comment l'écrire en Java, puis fabriquer Adama ?" },
        { type: "illus", ascii: "  UML                     Java\n ┌───────────────┐\n │   Etudiant    │ ──▶ class Etudiant {\n ├───────────────┤\n │ nom : String  │ ──▶     String nom;\n │ age : int     │ ──▶     int age;\n └───────────────┘     }", legende: "Chaque compartiment du rectangle devient une partie de la classe Java." },
        { type: "code", run: "fichier", copier: false, titre: "Le plan", code: "class Etudiant {\n    String nom;\n    int age;\n}", lignes: ["class déclare un plan, nommé Etudiant.", "Un attribut : une variable déclarée dans la classe, hors de toute méthode.", "Chaque étudiant aura son nom et son âge.", "Fin du plan."] },
        { type: "texte", html: "Le mot <code>class</code> <strong>déclare un plan</strong> ; ses variables sont ses <strong>attributs</strong>. On l'écrit dans le même fichier, au-dessus de <code>Main</code>, sans le mot <code>public</code> (expliqué plus loin) : seule la classe publique doit porter le nom du fichier." },
        { type: "depliable", genre: "culture", titre: "D'où vient cette partie ?", blocs: [
          { type: "texte", html: "Le code Java objet de ce module (comme l'aperçu des exceptions et des interfaces, en fin de module) n'est pas dans les slides fournies : compare avec tes notes de cours." }
        ] }
      ]
    },
    {
      titre: "new : construire l'objet",
      blocs: [
        { type: "illus", ascii: "                         la mémoire\n                    ┌────────────────────┐\nnew Etudiant() ───▶ │ nom : \"Adama SECK\" │\n                    │ age : 22           │\n                    └────────────────────┘\n                            ▲\n       e  ════(télécommande)╝", legende: "new construit l'objet ; la variable e est une télécommande qui le désigne." },
        { type: "code", run: "fichier", contexte: "class Etudiant {\n    String nom;\n    int age;\n}\n", code: "public class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant();\n        e.nom = \"Adama SECK\";\n        e.age = 22;\n        System.out.println(e.nom + \" a \" + e.age + \" ans\");\n    }\n}", sortie: "Adama SECK a 22 ans", lignes: [null, null, "new Etudiant() fabrique un objet ; e reçoit la télécommande.", "Le point : « l'attribut nom de l'objet désigné par e ».", null, "On lit les attributs de la même façon.", null, null] },
        { type: "texte", html: "<code>new</code> construit un objet d'après le plan (tu l'avais écrit dans <code>new Scanner(System.in)</code>). La variable <code>e</code> ne contient pas l'objet : elle contient une <strong>référence</strong>, de quoi le retrouver en mémoire. Une télécommande, en somme." }
      ]
    },
    {
      titre: "Une télécommande, pas une copie",
      blocs: [
        { type: "illus", ascii: "   e   ═══╗\n          ╠═══▶ ┌───────────┐\n   e2  ═══╝     │ age : 23  │\n                └───────────┘\n   deux télécommandes, un seul objet", legende: "Etudiant e2 = e; copie la télécommande, pas l'objet." },
        { type: "predire", run: "fichier", contexte: "class Etudiant {\n    String nom;\n    int age;\n}\n", question: "Avec la classe <code>Etudiant</code> ci-dessus, que va afficher ce programme ?", code: "public class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant();\n        e.age = 22;\n        Etudiant e2 = e;\n        e2.age = 23;\n        System.out.println(e.age);\n    }\n}", reponse: "23", explication: "<code>e</code> et <code>e2</code> désignent le même objet : changer l'âge par <code>e2</code>, c'est le changer pour <code>e</code> aussi." },
        { type: "depliable", genre: "plus", titre: "Autres erreurs fréquentes", blocs: [
          { type: "erreur", run: "erreur-fichier", code: "class Etudiant {\n    String nom;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e;\n        e.nom = \"Adama SECK\";\n    }\n}", message: "error: variable e might not have been initialized", explication: "Traduction : « la variable e n'a peut-être pas été initialisée ». <code>Etudiant e;</code> crée une télécommande, mais aucun objet : sans <code>new</code>, rien à piloter." }
        ] }
      ]
    },
    {
      titre: "Le comportement : une méthode d'instance",
      blocs: [
        { type: "texte", html: "Pour le comportement, on écrit une méthode dans la classe, <em>sans</em> <code>static</code> : une <strong>méthode d'instance</strong>. On l'appelle sur un objet, <code>e.afficher()</code>, et elle utilise les attributs de <em>cet</em> objet." },
        { type: "code", run: "fichier", code: "class Etudiant {\n    String nom;\n    int age;\n\n    void afficher() {\n        System.out.println(nom + \" (\" + age + \" ans)\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant();\n        e.nom = \"Adama SECK\";\n        e.age = 22;\n        e.afficher();\n    }\n}", sortie: "Adama SECK (22 ans)", lignes: [null, null, null, null, "Pas de static : cette méthode s'appelle sur un objet.", "nom et age sont ceux de l'objet sur lequel on l'appelle.", null, null, null, null, null, null, null, null, "On appelle afficher sur l'objet désigné par e.", null, null] },
        { type: "cadre", connus: ["main", "static", "void", "class"], html: "<code>class</code> déclare un plan : <code>Main</code> est une classe, comme <code>Etudiant</code>. Et <code>static</code>, en entier : la méthode appartient à la classe elle-même, pas à un objet. C'est pourquoi <code>main</code> peut démarrer alors qu'aucun objet n'existe encore." },
        { type: "depliable", genre: "examen", titre: "static et la « portée classe » (slides 27-28)", blocs: [
          { type: "texte", html: "Une méthode <code>static</code> n'a pas d'objet courant. Elle ne peut donc pas utiliser un attribut (non <code>static</code>) tout seul ; elle peut utiliser celui d'un objet qu'elle crée ou reçoit." },
          { type: "ecart", dit: "« <code>int x=20;</code> : portée classe, utilisable dans toutes les fonctions de la classe » (slide 28).", vrai: "La portée de <code>x</code> est bien toute la classe. Mais <code>x</code> est un attribut : chaque objet a le sien. <code>main</code>, qui est <code>static</code>, n'a pas d'objet sous la main : il ne peut pas écrire <code>x</code> tout seul, il lui faut un objet (<code>m.x</code>)." },
          { type: "erreur", run: "erreur-classe", code: "int x = 20;\n\npublic static void main(String[] args) {\n    System.out.println(x);\n}", message: "error: non-static variable x cannot be referenced from a static context", explication: "Traduction : « la variable non statique x ne peut pas être utilisée depuis un contexte statique ». Il faut d'abord un objet.", correction: "int x = 20;\n\npublic static void main(String[] args) {\n    Main m = new Main();\n    System.out.println(m.x);\n}" }
        ] }
      ]
    },
    {
      titre: "À toi : la moyenne d'Adama",
      blocs: [
        { type: "exo", niveau: "modifier", run: "fichier", enonce: "Copie ce programme complet. Ajoute à <code>Etudiant</code> l'attribut <code>double moyenne</code>, donne-lui 14.0 dans <code>main</code>, et modifie <code>afficher()</code> pour obtenir « Adama SECK : 14.0 ».", code: "class Etudiant {\n    String nom;\n\n    void afficher() {\n        System.out.println(nom);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant();\n        e.nom = \"Adama SECK\";\n        e.afficher();\n    }\n}", indice: "Trois lignes changent : <code>double moyenne;</code> dans la classe, <code>e.moyenne = 14.0;</code> dans <code>main</code>, et <code>nom + \" : \" + moyenne</code> dans <code>afficher()</code>.", corrige: { code: "class Etudiant {\n    String nom;\n    double moyenne;\n\n    void afficher() {\n        System.out.println(nom + \" : \" + moyenne);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant();\n        e.nom = \"Adama SECK\";\n        e.moyenne = 14.0;\n        e.afficher();\n    }\n}", sortie: "Adama SECK : 14.0" } }
      ]
    }
  ],
  retenir: [
    "<code>class</code> déclare le plan ; ses variables sont les attributs.",
    "<code>new</code> construit un objet ; le point donne accès à ses attributs : <code>e.nom</code>.",
    "La variable est une télécommande vers l'objet : <code>e2 = e</code> ne copie pas l'objet."
  ],
  test: [
    { type: "predire", run: "fichier", contexte: "class Etudiant {\n    String nom;\n    int age;\n}\n", question: "Avec la classe <code>Etudiant</code> (attributs <code>nom</code> et <code>age</code>), que va afficher ce programme ?", code: "public class Main {\n    public static void main(String[] args) {\n        Etudiant a = new Etudiant();\n        Etudiant b = new Etudiant();\n        a.age = 22;\n        b.age = 30;\n        System.out.println(a.age);\n    }\n}", reponse: "22", explication: "Deux <code>new</code>, donc deux objets distincts : changer <code>b</code> ne touche pas <code>a</code>." },
    { type: "predire", rappel: "m05-l02", run: "classe", code: "public static int triple(int n) {\n    return n * 3;\n}\npublic static void main(String[] args) {\n    System.out.println(triple(2) + 1);\n}", reponse: "7", explication: "<code>triple(2)</code> rend 6 ; on affiche 6 + 1." }
  ]
});
