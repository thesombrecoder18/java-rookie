# Format d'une leçon (contrat entre le contenu et l'affichage)

Une leçon = un fichier `courses/<id-module>/<id-leçon>.js` qui appelle `JR.lecon({...})`.
Aucun HTML de mise en page dans les leçons : seulement des données. Le rendu est fait par `assets/app.js`.
Le texte peut contenir un HTML **léger** : `<strong>`, `<em>`, `<code>`, `<br>`, liens `<a href="lecon.html?l=m03-l02">`.
Dans `<code>`, échapper `<` en `&lt;`.

```js
JR.lecon({
  id: "m02-l03",                       // identique au nom du fichier
  titre: "Changer la valeur d'une variable",
  duree: 6,                            // minutes estimées (5 à 6)
  objectif: "Modifier ce qu'il y a dans une boîte, sans changer son étiquette.",  // 1 phrase
  sections: [                          // 3 à 5 sections ; chaque section = une étape avec une pause « Continuer »
    { titre: "Le problème", blocs: [ /* blocs */ ] },
    { titre: "...", blocs: [ ] }
  ],
  retenir: ["…", "…", "…"],            // 3 puces MAX, très courtes
  test: [ /* 2 à 5 blocs de type quiz ou predire */ ]
});
```

## Les blocs

Chaque bloc est un objet `{ type: "...", ... }`.

| type | champs | rôle |
|---|---|---|
| `texte` | `html` | 1 à 3 phrases. Jamais plus de 2 blocs `texte` consécutifs. |
| `pourquoi` | `html` | Le problème qui motive la notion (« Tu sais faire X. Mais comment… ? »). |
| `illus` | `ascii` **ou** `html`, `legende` | Illustration qui explique (boîte, chemin, flèche…). `ascii` = schéma monospace (≤ 10 lignes, ≤ 46 colonnes). Vient AVANT le code. |
| `boites` | `items: [{nom, val, type?, maj?}]`, `legende` | Dessine des variables comme des boîtes étiquetées. `maj: true` = la boîte vient de changer. |
| `code` | `code`, `titre?`, `sortie?`, `lignes?`, `run?`, `contexte?`, `entree?` | Exemple Java. `lignes` = tableau d'explications, une par ligne de code (décomposition), ou `null` pour une ligne sans commentaire. `sortie` = texte exact affiché par le programme. |
| `simple` | `html` | « Explique-moi simplement » (dépliable) : une seconde image, du quotidien, pas infantilisante. |
| `erreur` | `code`, `message`, `explication`, `correction?`, `run?`, `contexte?` | Code FAUX. `message` = l'essentiel du message de `javac` (ou de l'exception à l'exécution), en anglais tel que Java l'écrit, raccourci. `explication` = pourquoi, en français simple. `correction` = code corrigé. |
| `compare` | `gauche: {titre, code?, html?}`, `droite: {…}`, `conclusion` | Deux notions qui se ressemblent (= vs ==, classe vs objet…). |
| `attention` | `html` | Piège de débutant. |
| `ecart` | `dit`, `vrai` | Erreur du support officiel : ce que dit le cours / la réalité. Ton respectueux. |
| `cours` | `html`, `ref` | Définition reprise du cours officiel (« dans les mots du cours »), `ref` = « slide 24 ». |
| `quiz` | `question`, `code?`, `options: [{t, ok?, pourquoi}]`, `rappel?`, `run?`, `contexte?` | Question à choix. Chaque option a un `pourquoi` (affiché après le clic). Exactement une option `ok: true`. |
| `predire` | `question?`, `code`, `reponse`, `explication`, `rappel?`, `run?`, `contexte?` | « Que va afficher ce programme ? ». L'élève tape sa réponse puis vérifie. `reponse` = sortie exacte (lignes séparées par `\n`). |
| `exo` | `niveau`, `enonce`, `code?`, `indice?`, `corrige: {code?, html?, sortie?}`, `run?`, `contexte?` | Mini-exercice. `niveau` ∈ comprendre, reproduire, modifier, predire, corriger, creer, combiner. |
| `trace` | `lignes: [code]`, `etapes: [{ligne, mem: {nom: {val, maj?, vide?}}, note, sortie?}]` | Exécution pas à pas avec la mémoire visible (variables, boucles). `ligne` = index de la ligne surlignée, **compté à partir de 0**. |
| `versions` | `etapes: [{titre, code, ajout}]`, `run?`, `contexte?` | Un programme qui grandit : v1 → v2 → v3 (`ajout` = ce qui change). |
| `cle` | `html` | Phrase-clé à retenir au milieu de la leçon (1 ligne). |
| `trous` | `question?`, `code` (avec `___` pour chaque trou), `reponses: [["int"], ["age", "age2"]]`, `explication`, `indice?`, `sortie?`, `rappel?`, `run?`, `contexte?` | Code à compléter (exemple « à trous »). Une liste de variantes acceptées par trou (les espaces sont ignorés). C'est l'étape OBLIGATOIRE avant tout exercice [créer]. Le vérificateur compile le code avec la 1re variante de chaque trou. |
| `ordre` | `question?`, `lignes: [...]` (dans le BON ordre), `explication`, `sortie?`, `rappel?`, `run?` | Remettre des lignes mélangées dans l'ordre (3 à 8 lignes). L'ordre correct doit être UNIQUE (pas deux lignes interchangeables). Le vérificateur compile les lignes jointes (`run: "aucun"` pour des étapes non-Java). |
| `depliable` | `genre` (`examen`, `culture`, `outil`, `plus`), `titre?`, `blocs: [...]` | Contenu facultatif replié : « Pour l'examen », « Pour ta culture », « Côté outils », « Pour aller plus loin ». L'étudiant fatigué sait qu'il peut le sauter. |
| `cadre` | `connus: ["main", "void"]`, `classe?`, `zone?`, `html?` | Encadré « Où en est-on du cadre ? » : le cadre `public class … { public static void main(String[] args) {…} }` avec en vert les mots déjà expliqués. Mots possibles : public, class, static, void, main, String[], args. |

## Le champ `rappel` (répétition espacée)

`rappel: "m03-l01"` sur un `quiz`, `predire` ou `trous` affiche un badge « Rappel · module 03 » qui renvoie à la leçon d'origine.
Il doit pointer vers une leçon PRÉCÉDENTE. Règles :
- à partir de m03, chaque `test` contient **exactement 1 question `rappel`** sur un module antérieur (voir la carte) ;
- un « Échauffement » (1 à 2 questions `rappel`) seulement là où la carte le prévoit.

## Le champ `run` : comment le vérificateur compile l'extrait

Tous les extraits Java sont compilés automatiquement par `tools/verifier.mjs` avec `javac`.

- `"main"` (par défaut pour `code`, `predire`, `quiz`, `versions`, `exo`) : le code est placé DANS une méthode `main`.
  Pour `predire`, `reponse` doit être exactement la sortie. Pour `code`, `sortie` (si présente) doit être exactement la sortie.
- `"classe"` : le code contient des membres (méthodes `static`, attributs) placés DANS une classe `Main`. Si aucune méthode `main` n'est présente, on ne fait que compiler.
- `"fichier"` : le code est un fichier Java complet (une ou plusieurs classes, `import`…). La classe qui contient `main` est exécutée.
- `"aucun"` : ne pas compiler (commande shell, fragment volontairement incomplet, pseudo-code, `...`). À utiliser avec parcimonie.
- `"erreur"` (par défaut pour le bloc `erreur`) : la compilation DOIT échouer. `"erreur-execution"` : compile, mais lève une exception à l'exécution.

`copier: false` : cache le bouton « Copier pour essayer » tout en gardant la vérification (ex. une classe seule, sans `main`, compilée avec `run: "fichier"`). Ne jamais utiliser `run: "aucun"` pour du Java valide : on perdrait la vérification.

`contexte` : code invisible ajouté AVANT l'extrait (même mode), par exemple `int age = 20;` pour qu'un fragment comme `age = 21;` compile.
Le vérificateur compile avec `javac --release 21` : n'utilise aucune nouveauté postérieure à Java 21.
Les imports `java.util.*`, `java.time.*` et `java.time.format.*` sont ajoutés automatiquement aux extraits `main`/`classe` (mais montre l'`import` dans le code quand la leçon l'enseigne, en mode `fichier`).
Le bouton « Copier pour essayer » de chaque bloc de code copie le même programme complet (classe `Main`).

`entree` : texte envoyé au clavier (affiché aussi dans la page, au-dessus de la sortie, sous « Ce que l'utilisateur tape au clavier » ; la `sortie` ne contient PAS ce texte, comme dans la vraie sortie du programme) (System.in) pendant la vérification (exemples avec Scanner).
Pour un `exo`, c'est `corrige.code` qui est compilé (et `corrige.sortie` vérifiée si présente).

## Règles d'écriture
- Tutoiement, phrases courtes, ton bienveillant, jamais condescendant.
- Une idée par leçon. Si la leçon dépasse 6 sections, la couper.
- Code : 1 à 5 lignes dans les premiers modules, au plus environ 12 lignes plus tard. Indentation de 4 espaces.
- Chaque terme technique nouveau est mis en `<strong>` ET défini dans la phrase même où il apparaît.
- Au moins : 1 `illus`/`boites`/`trace`, 3 exemples (`code`), 1 `erreur` ou `attention`, 1 interaction (`quiz`/`predire`/`trous`/`ordre`/`exo`) AVANT la fin, puis `retenir` + `test`.
- Alterner : jamais plus de 2 blocs `texte` d'affilée ; une interaction toutes les 1 à 2 sections.
- Progression des exercices dans la leçon : prédire/compléter (`trous`) AVANT créer. Jamais de [créer] sans exemple à trous juste avant.
- « Relier », « classer », « cocher » = une suite de 3 à 4 `quiz` courts (pas de nouveau type de bloc).
- Le contenu utile seulement pour l'examen ou la culture va dans un `depliable`.
- Messages d'erreur : `javac` répond en anglais ; donne le message tel quel dans `message`, et sa traduction en français au début de `explication`.
- Référence de ton et de rythme : `docs/exemple/lecon-modele.js`.
- Les identifiants Java restent en anglais si c'est l'API (System.out.println) mais les noms de variables d'exemple sont en français sans accents (`age`, `prenom`, `moyenne`).
