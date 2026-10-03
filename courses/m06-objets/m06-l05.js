JR.lecon({
  id: "m06-l05",
  titre: "L'héritage : extends et super",
  duree: 7,
  objectif: "Écrire une seule fois ce que plusieurs classes ont en commun, et en hériter.",
  sections: [
    {
      titre: "Le problème",
      blocs: [
        { type: "pourquoi", html: "Un <code>Enseignant</code> a aussi un nom. Faut-il recopier cet attribut dans chaque classe ?" },
        { type: "code", run: "fichier", copier: false, code: "class Etudiant {\n    String nom;\n    String matricule;\n}\n\nclass Enseignant {\n    String nom;\n    String grade;\n}", lignes: [null, "nom, écrit une fois ici…", "Propre à l'étudiant.", null, null, null, "…et recopié ici.", "Propre à l'enseignant.", null] },
        { type: "texte", html: "Un étudiant <em>est une</em> personne ; un enseignant aussi. Ce qu'ils ont en commun appartient à une classe plus générale : <code>Personne</code>." }
      ]
    },
    {
      titre: "Une hiérarchie de classes",
      blocs: [
        { type: "illus", ascii: "           ┌──────────┐\n           │ Personne │   plus général\n           └────┬─────┘\n     ┌──────────┴──────────┐\n┌────┴─────┐         ┌─────┴──────┐\n│ Etudiant │         │ Enseignant │\n└────┬─────┘         └────────────┘\n┌────┴──────┐\n│ Doctorant │                plus précis\n└───────────┘", legende: "L'arbre de la slide 15 : en montant, on généralise ; en descendant, on spécialise." },
        { type: "texte", html: "<code>Personne</code> est la <strong>classe mère</strong>, <code>Etudiant</code> une <strong>classe fille</strong>. On l'écrit avec <code>extends</code> (« étend »). La fille <strong>hérite</strong> des attributs et des méthodes de la mère, et ajoute les siens. Une classe n'a qu'une seule mère." },
        { type: "quiz", question: "Lequel de ces héritages est justifié ?", options: [
          { t: "<code>Doctorant extends Etudiant</code>", ok: true, pourquoi: "Exact : un doctorant <em>est un</em> étudiant, avec des particularités." },
          { t: "<code>Voiture extends Personne</code>", pourquoi: "Non : une voiture n'est pas une personne." },
          { t: "<code>Personne extends Etudiant</code>", pourquoi: "C'est à l'envers : toute personne n'est pas un étudiant." }
        ] }
      ]
    },
    {
      titre: "extends et super",
      blocs: [
        { type: "code", run: "fichier", copier: false, code: "class Personne {\n    protected String nom;\n\n    Personne(String nom) {\n        this.nom = nom;\n    }\n}\n\nclass Etudiant extends Personne {\n    String matricule;\n\n    Etudiant(String nom, String matricule) {\n        super(nom);\n        this.matricule = matricule;\n    }\n}", lignes: [null, "protected : visible aussi par les classes filles.", null, null, null, null, null, null, "Etudiant étend Personne : il hérite de nom.", "Ce qu'il ajoute : le matricule.", null, null, "super(nom) appelle le constructeur de la mère, qui remplit nom.", "Puis la fille remplit ce qui lui est propre.", null, null] },
        { type: "texte", html: "Deux exceptions à l'héritage. Les constructeurs ne s'héritent pas : <code>super(…)</code> appelle celui de la mère. Écris-le en première ligne du constructeur de la fille. Et un attribut <code>private</code> de la mère reste inaccessible à la fille : d'où <code>protected</code> (<code>#</code> en UML), visible aussi par les filles." },
        { type: "predire", run: "fichier", contexte: "class Personne {\n    protected String nom;\n\n    Personne(String nom) {\n        this.nom = nom;\n    }\n}\n\nclass Etudiant extends Personne {\n    String matricule;\n\n    Etudiant(String nom, String matricule) {\n        super(nom);\n        this.matricule = matricule;\n    }\n}\n", question: "Avec ces deux classes, que va afficher ce programme ?", code: "public class Main {\n    public static void main(String[] args) {\n        Etudiant e = new Etudiant(\"Adama SECK\", \"201506SRG\");\n        System.out.println(e.nom + \" \" + e.matricule);\n    }\n}", reponse: "Adama SECK 201506SRG", explication: "<code>nom</code> n'est pas écrit dans <code>Etudiant</code>, mais il est hérité de <code>Personne</code> : <code>e.nom</code> existe bien." }
      ]
    },
    {
      titre: "L'erreur à reconnaître",
      blocs: [
        { type: "erreur", run: "erreur-fichier", code: "class Personne {\n    String nom;\n    Personne(String nom) { this.nom = nom; }\n}\n\nclass Etudiant extends Personne {\n    String matricule;\n    Etudiant(String nom, String matricule) {\n        this.matricule = matricule;\n    }\n}", message: "error: constructor Personne in class Personne cannot be applied to given types;", explication: "Traduction : « le constructeur Personne ne peut pas être appliqué aux types donnés ». Sans <code>super(…)</code>, Java appelle tout seul <code>super()</code>, sans argument. Or <code>Personne</code> attend un nom.", correction: "class Personne {\n    String nom;\n    Personne(String nom) { this.nom = nom; }\n}\n\nclass Etudiant extends Personne {\n    String matricule;\n    Etudiant(String nom, String matricule) {\n        super(nom);\n        this.matricule = matricule;\n    }\n}" },
        { type: "trous", run: "fichier", contexte: "class Personne {\n    protected String nom;\n\n    Personne(String nom) {\n        this.nom = nom;\n    }\n}\n", question: "Complète la classe <code>Enseignant</code>, fille de <code>Personne</code>.", code: "class Enseignant ___ Personne {\n    String grade;\n\n    Enseignant(String nom, String grade) {\n        ___(nom);\n        this.grade = grade;\n    }\n}", reponses: [["extends"], ["super"]], explication: "<code>extends</code> pour hériter, puis <code>super(nom)</code> en première ligne, pour que la mère remplisse le nom." },
        { type: "depliable", genre: "examen", titre: "Une seule mère, et la classe abstraite (slides 9 et 15)", blocs: [
          { type: "erreur", run: "erreur-fichier", code: "class A { }\nclass B { }\nclass C extends A, B { }", message: "error: '{' expected", explication: "Traduction : « '{' attendue ». Après <code>extends A</code>, Java attend l'accolade : une classe Java n'a qu'une seule mère." },
          { type: "texte", html: "Une <strong>classe abstraite</strong> sert de modèle mais ne peut pas être instanciée : sur la slide 15, on ne crée jamais une « Personne » tout court. En Java : <code>abstract class Personne { … }</code>." },
          { type: "erreur", run: "erreur-fichier", code: "abstract class Personne { }\n\npublic class Main {\n    public static void main(String[] args) {\n        Personne p = new Personne();\n    }\n}", message: "error: Personne is abstract; cannot be instantiated", explication: "Traduction : « Personne est abstraite : elle ne peut pas être instanciée »." }
        ] }
      ]
    }
  ],
  retenir: [
    "<code>class Fille extends Mere</code> : la fille « est une » sorte de mère, et hérite de ses attributs et méthodes.",
    "<code>super(…)</code> appelle le constructeur de la mère, en première ligne.",
    "En Java, une classe n'a qu'une seule classe mère."
  ],
  test: [
    { type: "quiz", question: "<code>Doctorant extends Etudiant</code>, et <code>Etudiant extends Personne</code>. Un doctorant a-t-il l'attribut <code>nom</code> de <code>Personne</code> ?", options: [
      { t: "Oui, hérité de Personne à travers Etudiant", ok: true, pourquoi: "Exact : une fille reçoit les attributs et méthodes de sa mère, qui les a elle-même reçus de la sienne." },
      { t: "Non, seulement ce qui est écrit dans Doctorant", pourquoi: "Si : l'héritage se transmet de génération en génération." }
    ] },
    { type: "predire", rappel: "m04-l03", code: "int choix = 1;\nswitch (choix) {\n    case 1: System.out.println(\"Un\");\n    case 2: System.out.println(\"Deux\"); break;\n    default: System.out.println(\"Autre\");\n}", reponse: "Un\nDeux", explication: "Le <code>case 1</code> n'a pas de <code>break</code> : on continue dans le <code>case 2</code>, jusqu'à son <code>break</code>." }
  ]
});
