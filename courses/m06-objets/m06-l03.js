JR.lecon({
  id: "m06-l03",
  titre: "Le constructeur : naître complet",
  duree: 7,
  objectif: "Faire naître chaque objet avec ses attributs déjà remplis, en une seule ligne.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Après <code>new</code>, il faut une affectation par attribut. Si tu en oublies une, l'objet reste à moitié vide." },
        { type: "predire", run: "fichier", contexte: "class Etudiant {\n    String nom;\n    int age;\n\n    void afficher() {\n        System.out.println(nom + \" (\" + age + \" ans)\");\n    }\n}\n", question: "Que va afficher ce programme ? Indice : un attribut <code>int</code> jamais rempli vaut 0.", code: "public class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant();\n        e.nom = \"Adama SECK\";\n        e.afficher();\n    }\n}", reponse: "Adama SECK (0 ans)", explication: "On a oublié l'âge. Un attribut jamais rempli reçoit une valeur par défaut (0 pour un nombre), sans aucun message. Les variables de <code>main</code>, elles, n'en ont pas : Java refuse de les lire vides (m02)." }
      ]
    },
    {
      titre: "Le constructeur",
      blocs: [
        { type: "illus", ascii: "      new Etudiant(\"Adama SECK\", 22)\n                   ▼\n   ┌─── la maternité (constructeur) ────┐\n   │ remplit le bracelet à la naissance │\n   └─────────────────┬──────────────────┘\n                     ▼\n          ┌────────────────────┐\n          │ nom : \"Adama SECK\" │\n          │ age : 22           │\n          └────────────────────┘", legende: "Chaque objet sort du constructeur avec son bracelet déjà rempli." },
        { type: "texte", html: "Un <strong>constructeur</strong> est un bloc qui ressemble à une méthode, appelé par <code>new</code> pour préparer l'objet. Il porte le nom de la classe, sans <em>aucun</em> type de retour (pas même <code>void</code>)." },
        { type: "code", run: "fichier", code: "class Etudiant {\n    String nom;\n    int age;\n\n    Etudiant(String nom, int age) {\n        this.nom = nom;\n        this.age = age;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant(\"Adama SECK\", 22);\n        System.out.println(e.nom + \" a \" + e.age + \" ans\");\n    }\n}", sortie: "Adama SECK a 22 ans", lignes: [null, null, null, null, "Le constructeur : le nom de la classe, des paramètres, pas de type de retour.", "this.nom = l'attribut de l'objet en construction ; nom seul = le paramètre.", "Même chose pour l'âge.", null, null, null, null, null, "Une seule ligne : new appelle le constructeur avec \"Adama SECK\" et 22.", null, null, null] },
        { type: "texte", html: "<code>this</code> désigne l'objet en cours de construction. Il faut l'écrire, car le paramètre <code>nom</code> cache l'attribut de même nom : <code>this.nom = nom;</code> se lit « le nom de cet objet reçoit le paramètre nom »." }
      ]
    },
    {
      titre: "Deux pièges",
      blocs: [
        { type: "erreur", run: "erreur-fichier", code: "class Etudiant {\n    String nom;\n    Etudiant(String nom) {\n        this.nom = nom;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant();\n    }\n}", message: "error: constructor Etudiant in class Etudiant cannot be applied to given types;", explication: "Traduction : « le constructeur Etudiant ne peut pas être appliqué aux types donnés ». Sans constructeur écrit, Java en fournit un sans paramètre : le <strong>constructeur par défaut</strong>. Dès que tu en écris un, il disparaît.", correction: "class Etudiant {\n    String nom;\n    Etudiant(String nom) {\n        this.nom = nom;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant(\"Adama SECK\");\n    }\n}" },
        { type: "quiz", run: "fichier", question: "Le constructeur a été écrit <code>nom = nom;</code>, sans <code>this</code>. Qu'affiche ce programme ?", code: "class Etudiant {\n    String nom;\n\n    Etudiant(String nom) {\n        nom = nom;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant(\"Adama SECK\");\n        System.out.println(e.nom);\n    }\n}", options: [
          { t: "Adama SECK", pourquoi: "Non : sans <code>this</code>, le paramètre est rangé dans lui-même." },
          { t: "null (« aucun objet »)", ok: true, pourquoi: "Exact : l'attribut n'est jamais rempli. <code>null</code> = « aucun objet » : la télécommande ne désigne rien." },
          { t: "Une erreur de compilation", pourquoi: "Non : Java l'accepte sans rien dire. D'où le danger." }
        ] }
      ]
    },
    {
      titre: "À toi",
      blocs: [
        { type: "exo", niveau: "corriger", run: "fichier", enonce: "Copie ce programme et corrige les deux défauts du constructeur, pour afficher <code>Adama SECK</code>.", code: "class Etudiant {\n    String nom;\n\n    void Etudiant(String nom) {\n        nom = nom;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant(\"Adama SECK\");\n        System.out.println(e.nom);\n    }\n}", indice: "Supprime <code>void</code>, puis écris <code>this.nom = nom;</code>.", corrige: { code: "class Etudiant {\n    String nom;\n\n    Etudiant(String nom) {\n        this.nom = nom;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant(\"Adama SECK\");\n        System.out.println(e.nom);\n    }\n}", sortie: "Adama SECK" } },
        { type: "depliable", genre: "plus", titre: "Plusieurs constructeurs", blocs: [
          { type: "texte", html: "Une classe peut avoir plusieurs constructeurs, avec des paramètres différents : c'est de la surcharge, comme pour les méthodes. <code>Etudiant(String nom)</code> et <code>Etudiant(String nom, int age)</code> peuvent coexister." }
        ] }
      ]
    }
  ],
  retenir: [
    "Constructeur : même nom que la classe, aucun type de retour, appelé par <code>new</code>.",
    "<code>this.attribut = parametre;</code> remplit l'attribut de l'objet en construction.",
    "Dès que tu écris un constructeur, le constructeur par défaut disparaît."
  ],
  test: [
    { type: "quiz", question: "Lequel est un constructeur de la classe <code>Etudiant</code> ?", options: [
      { t: "<code>void Etudiant(String nom) { … }</code>", pourquoi: "Avec <code>void</code>, c'est une méthode ordinaire." },
      { t: "<code>Etudiant(String nom) { … }</code>", ok: true, pourquoi: "Exact : le nom de la classe, et aucun type de retour." },
      { t: "<code>etudiant(String nom) { … }</code>", pourquoi: "Le nom doit être exactement celui de la classe, majuscule comprise." }
    ] },
    { type: "quiz", rappel: "m05-l03", question: "Peut-on avoir <code>plus(int a, int b)</code> et <code>plus(double a, double b)</code> dans la même classe ?", options: [
      { t: "Oui : c'est une surcharge", ok: true, pourquoi: "Exact : mêmes noms, paramètres de types différents." },
      { t: "Non : deux méthodes ne peuvent pas porter le même nom", pourquoi: "Si, tant que les paramètres diffèrent : c'est la surcharge." }
    ] }
  ]
});
