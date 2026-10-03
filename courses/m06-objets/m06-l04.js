JR.lecon({
  id: "m06-l04",
  titre: "Encapsulation : private, get et set",
  duree: 7,
  objectif: "Protéger les attributs d'un objet, et n'y donner accès que par des méthodes qui vérifient.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "<code>main</code> peut écrire n'importe quoi dans les attributs d'Adama :" },
        { type: "code", run: "fichier", contexte: "class Etudiant {\n    String nom;\n    int age;\n\n    Etudiant(String nom, int age) {\n        this.nom = nom;\n        this.age = age;\n    }\n}\n", code: "public class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant(\"Adama SECK\", 22);\n        e.age = -5;\n        System.out.println(e.age);\n    }\n}", sortie: "-5", lignes: [null, null, "La classe Etudiant de la leçon précédente.", "Java accepte sans broncher…", "…et l'objet est maintenant faux.", null, null] },
        { type: "illus", ascii: "┌──────────────────────┐\n│ [retrait]  [solde]   │ ◀ visible\n│ ┌──────────────────┐ │\n│ │ coffre : billets │ │ ◀ caché\n│ └──────────────────┘ │\n└──────────────────────┘", legende: "Un distributeur de billets. Les boutons visibles sont les services offerts ; le coffre caché, ce sont les attributs. Tu passes par les boutons, jamais directement par le coffre." },
        { type: "texte", html: "C'est l'<strong>encapsulation</strong> (slide 11) : cacher les attributs, n'offrir que des services, pour garantir l'<strong>intégrité</strong> des données (un objet toujours correct)." }
      ]
    },
    {
      titre: "private, get et set",
      blocs: [
        { type: "texte", html: "<code>private</code> rend un attribut visible <em>seulement dans sa classe</em>. Pour le lire, on offre un <strong>accesseur</strong> (« getter », <code>getAge()</code>) ; pour le modifier, un <strong>mutateur</strong> (« setter », <code>setAge(…)</code>), qui peut refuser une valeur." },
        { type: "code", run: "fichier", copier: false, code: "class Etudiant {\n    private String nom;\n    private int age;\n\n    Etudiant(String nom, int age) {\n        this.nom = nom;\n        setAge(age);\n    }\n\n    public int getAge() { return age; }\n\n    public void setAge(int age) {\n        if (age >= 0 && age <= 120) {\n            this.age = age;\n        }\n    }\n}", lignes: [null, "private : seule la classe Etudiant peut toucher nom…", "…et age.", null, null, null, "Le constructeur passe lui aussi par le contrôle.", null, null, "Le getter : rend la valeur, sans permettre de la changer.", null, "Le setter : reçoit la nouvelle valeur…", "…la vérifie…", "…et ne la range que si elle est correcte.", null, null, null] },
        { type: "predire", run: "fichier", contexte: "class Etudiant {\n    private String nom;\n    private int age;\n\n    Etudiant(String nom, int age) {\n        this.nom = nom;\n        setAge(age);\n    }\n\n    public int getAge() { return age; }\n\n    public void setAge(int age) {\n        if (age >= 0 && age <= 120) {\n            this.age = age;\n        }\n    }\n}\n", question: "Avec cette classe, que va afficher ce programme ?", code: "public class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant(\"Adama SECK\", 22);\n        e.setAge(-5);\n        System.out.println(e.getAge());\n        e.setAge(23);\n        System.out.println(e.getAge());\n    }\n}", reponse: "22\n23", explication: "-5 est refusé : l'âge reste 22. 23 est accepté." },
        { type: "erreur", run: "erreur-fichier", code: "class Etudiant {\n    private int age;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant();\n        e.age = -5;\n    }\n}", message: "error: age has private access in Etudiant", explication: "Traduction : « age est d'accès privé dans Etudiant ». <code>Main</code> ne peut plus toucher directement à <code>age</code> : il doit passer par <code>setAge</code>." },
        { type: "depliable", genre: "plus", titre: "Un setter qui refuse en silence", blocs: [
          { type: "texte", html: "Ici, le setter ignore la valeur refusée sans rien dire : le problème passe inaperçu. Dans un vrai programme, on prévient (un message, ou une exception, aperçue en fin de module)." }
        ] }
      ]
    },
    {
      titre: "Qui voit quoi ?",
      blocs: [
        { type: "illus", ascii: " Java        UML   visible par…\n ─────────   ───   ──────────────────\n public       +    tout le monde\n (rien)      rien  le même paquetage\n private      -    la classe seulement", legende: "Du plus ouvert au plus fermé (slides 12-13). Un quatrième niveau arrive avec l'héritage." },
        { type: "attention", html: "Sans mot-clé, un attribut n'est <strong>pas</strong> privé : toutes les classes du même <strong>paquetage</strong> (groupe de classes, comme celles d'un fichier) peuvent le modifier." },
        { type: "quiz", question: "<code>age</code> est <code>private</code> dans <code>Etudiant</code>. Qui peut écrire <code>age</code> directement ?", options: [
          { t: "Toutes les classes du fichier", pourquoi: "Non : ce serait le cas sans mot-clé." },
          { t: "Seulement les méthodes de la classe <code>Etudiant</code>", ok: true, pourquoi: "Exact : privé = « dans la classe seulement »." }
        ] }
      ]
    },
    {
      titre: "Enfin public",
      blocs: [
        { type: "texte", html: "<code>public</code> : visible de partout. <code>main</code> est publique pour que la JVM, qui lance ton programme de l'extérieur, puisse l'appeler. La classe <code>Main</code> l'est par habitude (elle donne son nom au fichier)." },
        { type: "cadre", connus: ["public", "class", "static", "void", "main"], html: "Il reste <code>String[] args</code>, pour la fin du module." },
        { type: "exo", niveau: "modifier", run: "fichier", enonce: "Copie ce programme et ajoute <code>setMoyenne(double m)</code>, qui ne range <code>m</code> que s'il est entre 0 et 20. Il doit afficher 14.0.", code: "class Etudiant {\n    private String nom;\n    private double moyenne;\n\n    Etudiant(String nom) {\n        this.nom = nom;\n    }\n\n    public double getMoyenne() { return moyenne; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant(\"Adama SECK\");\n        e.setMoyenne(25);\n        e.setMoyenne(14.0);\n        System.out.println(e.getMoyenne());\n    }\n}", indice: "Même forme que <code>setAge</code>, avec la condition de m04 : <code>m >= 0 && m &lt;= 20</code>.", corrige: { code: "class Etudiant {\n    private String nom;\n    private double moyenne;\n\n    Etudiant(String nom) {\n        this.nom = nom;\n    }\n\n    public double getMoyenne() { return moyenne; }\n\n    public void setMoyenne(double m) {\n        if (m >= 0 && m <= 20) {\n            this.moyenne = m;\n        }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant(\"Adama SECK\");\n        e.setMoyenne(25);\n        e.setMoyenne(14.0);\n        System.out.println(e.getMoyenne());\n    }\n}", sortie: "14.0" } },
        { type: "depliable", genre: "examen", titre: "Dans les mots du cours (slide 11)", blocs: [
          { type: "cours", html: "L'encapsulation consiste à masquer les détails d'implémentation en définissant une interface (vue externe, services offerts). Elle garantit l'intégrité des données en restreignant l'accès direct aux attributs.", ref: "slide 11" },
          { type: "texte", html: "Ici, « interface » veut dire « les services visibles ». Le mot <code>interface</code> de Java, aperçu en fin de module, est une autre notion." }
        ] }
      ]
    }
  ],
  retenir: [
    "Attributs <code>private</code>, accès par un getter (lire) et un setter (modifier).",
    "Le setter vérifie la valeur : l'objet reste correct (intégrité des données).",
    "UML : <code>+</code> public, <code>-</code> privé, rien pour le paquetage."
  ],
  test: [
    { type: "quiz", question: "Pourquoi écrire <code>setAge(int age)</code> plutôt que laisser <code>age</code> public ?", options: [
      { t: "Pour que le programme soit plus rapide", pourquoi: "Non : le but n'est pas la vitesse." },
      { t: "Pour pouvoir refuser une valeur incorrecte", ok: true, pourquoi: "Exact : le setter garde l'intégrité des données." },
      { t: "Parce que Java interdit les attributs publics", pourquoi: "Non : c'est permis, mais on se passe alors de l'encapsulation." }
    ] },
    { type: "predire", rappel: "m04-l02", code: "int note = 25;\nboolean valide = note >= 0 && note <= 20;\nSystem.out.println(valide);", reponse: "false", explication: "<code>&&</code> exige que les deux conditions soient vraies ; <code>25 &lt;= 20</code> est faux." }
  ]
});
