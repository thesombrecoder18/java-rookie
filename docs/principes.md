# Principes pédagogiques non négociables (exigences de l'utilisateur)

Objectif : un débutant absolu apprend Java SEUL, sans professeur, sans se fatiguer, et a envie de revenir demain.
« Simple dans la forme, rigoureux dans le fond. » Ne jamais simplifier au point de devenir faux.
Face à un choix, la pédagogie passe toujours avant la décoration.

## Fatigue cognitive = contrainte majeure
- Beaucoup de PETITES leçons (5 à 8 minutes) plutôt que peu de grosses. Une leçon = UNE idée principale.
  Si une leçon s'allonge, on la coupe en deux. Le nombre de leçons n'est pas un problème.
- On alterne les formats, jamais plus de 2-3 paragraphes courts d'affilée :
  explication courte → illustration → mini-exemple → décomposition → question rapide → autre exemple → mini-exercice → résumé.
- Beaucoup d'exemples, mais COURTS (1 à 5 lignes au début). Un même concept vu sous plusieurs angles.
  Un programme plus gros se construit en versions successives (v1 → v2 → v3).
- Les illustrations doivent EXPLIQUER (boîte = variable, chemin à 2 directions = condition, flèche qui revient = boucle,
  machine = méthode, plan = classe, chose construite = objet, flèche vers un objet = référence, cases numérotées = tableau).
  L'illustration vient AVANT le code.
- Micro-victoires fréquentes : prédire une sortie, trouver la valeur d'une variable, repérer l'erreur, compléter du code.
- Fin de leçon : « À retenir » (3 points max) + « Petit test » (2 à 5 questions max).

## Contenu de chaque leçon
Qu'est-ce que c'est ? · Pourquoi ça existe (quel problème ça résout, de préférence un problème rencontré à la leçon d'avant) ·
Comment ça marche · Exemple minimal · Décomposition ligne par ligne si utile · Erreur fréquente (code faux + message + explication) ·
Mini-exercice · Vérification.
Chaque chapitre (module) commence par « À la fin de ce module, tu sauras… ».

## « Explique-moi simplement »
Bloc optionnel (dépliable) qui donne une SECONDE façon de comprendre, avec une image du quotidien.
Il ne remplace jamais l'explication technique. Il n'infantilise pas.

## Rigueur
- Aucun terme technique sans explication au moment où il apparaît (instance, référence, portée, signature, bloc, type…).
- Anticiper les confusions : = vs == ; && vs || ; while vs for ; variable locale vs attribut ; classe vs objet ;
  méthode vs constructeur ; static vs non-static ; tableau vs ArrayList ; String vs char ; public vs private ; ' ' vs " ".
- Montrer de vraies erreurs de compilation (ex. `int age = "20";`) et apprendre à les lire.
- Tout extrait Java doit compiler (sauf les extraits marqués « erreur », qui doivent réellement échouer). Sorties annoncées vérifiées.
- Erreurs du support officiel : corriger ET signaler (« Le cours dit… / En réalité… »), sans dénigrer le cours.

## Progression
- Ne jamais demander de CRÉER ce qu'on n'a pas encore les moyens de comprendre.
  Niveaux d'exercice : comprendre → reproduire → modifier → prédire → corriger → créer → combiner.
- Chaque notion répond à un besoin apparu avant (« Tu sais faire X. Mais comment… ? »).
- Répétition intelligente : les notions reviennent dans les exercices des modules suivants ; un fil rouge (ex. un mini-projet) grandit.
- Interfaces, classes d'implémentation, JDBC : TARD, pas prioritaires. Pas de streams, génériques avancés, SOLID, Spring, etc.
- Il faut tout de même couvrir le sommaire officiel du cours (voir docs/source-cours.md), et garder la terminologie du professeur
  (« méthode principale », « transtypage / cast », « portée », « surcharge », « instance », « encapsulation »…).

## Périmètre (décision de l'utilisateur, prioritaire sur tout le reste)
Ce n'est PAS un cours complet : juste les bases, à l'échelle d'Algo Rookie. **Environ 2 h 30 au total**, 6 modules, ~27 leçons de 5-6 min.
Contenu : fondamentaux du langage (les slides fournies) + approche objet (partie 1 du cours, avec un aperçu Java : classe, new, constructeur, private/get/set, héritage) + un court aperçu des exceptions et des interfaces.
Pas de modules tableaux, String, dates, enums, JDBC (au plus une ligne « pour aller plus loin »). « Personne n'aura la patience » de 16 h.
