# Brief — passe de corrections après les relectures qualité

Trois rapports ont été produits sur les 27 leçons :
- `docs/qa-java.md` : exactitude (31 points, avec des textes prêts à remplacer) ;
- `docs/qa-pedagogie.md` : fatigue, progression, fil rouge, rappels, lexique. Voir §6 (règles transverses) et §9 (actions par leçon) ;
- `docs/qa-debutant.md` : Awa, débutante simulée. Blocages par leçon, et top 10 au §9.

## Le problème principal : le parcours est 2 fois trop long
Annoncé 2 h 39, réel 3 h 40 (lecteur rapide) à 5-6 h (vraie débutante). L'utilisateur veut **environ 2 h 30** (« personne n'aura la patience »). On **allège franchement**, sans ajouter aucune notion.

### Cibles par leçon (chemin principal, sans les dépliables)
- **Environ 300 mots** de texte lu (aujourd'hui 400 à 680).
- **2 à 3 interactions** dans le corps de la leçon (quiz, predire, trous, ordre, exo, trace). Pas plus.
- **Test = 2 questions** : 1 sur la leçon + 1 `rappel` (dès m03). En m01-m02 : 2 questions sur la leçon.
- **Au plus 1 bloc `erreur`** dans le chemin principal, sauf en m01-l03. Les autres vont dans un `depliable` genre `plus`, intitulé « Autres erreurs fréquentes ».
- **Un bloc `cours`** seulement s'il apporte autre chose que le texte voisin ; sinon, dans un `depliable` genre `examen`.
- **Une seule « seconde image » par notion** : supprimer les `simple` redondants listés au §8 de qa-pedagogie.
- Supprimer les répétitions relevées (même exemple deux fois, quiz qui reprend une question déjà posée, corrigé identique à un exemple).
- Ce qui sert seulement à l'examen ou à la culture va dans un `depliable`, et un exercice obligatoire ne doit jamais s'y cacher.
- **Durée annoncée honnête** dans `duree` : 6 min pour une leçon, 8 min pour un bilan. Si, après allègement, la leçon dépasse encore cette durée de manière évidente, allège encore.

Méthode : applique d'abord les actions P1 de qa-pedagogie §9 pour tes leçons, puis R1 à R5 du §6, puis les points de qa-debutant et de qa-java qui concernent tes leçons. Pour qa-java, applique TOUTES les corrections techniques : les « hauts » et les « moyens » obligatoirement, les « bas » si c'est simple.

## Arbitrages déjà pris (ne pas rediscuter)
1. **OneCompiler tourne en Java 25** : il accepte des choses que Java 21 refuse (instructions avant `super(…)`, `main` non public…). Aucune question ni aucun texte ne doit dépendre de la version. Dis simplement « écris `super(…)` en première ligne du constructeur », et retire les mentions « Java 21 / 24 / 25 » du chemin principal. Aucun quiz dont la bonne réponse change selon la version.
2. **Fil rouge en m06** : un seul attribut texte, `nom = "Adama SECK"`, comme en m02-m04 ; retirer `prenom` en m06-l05. Remplacer l'exo `Voiture` de m06-l02 par « ajoute `double moyenne` » et l'exo `getNom` de m06-l04 par `setMoyenne` qui refuse une valeur hors de [0, 20] (voir qa-pedagogie §4). La v3 de m04-l06 doit garder `nom`. Harmoniser les notes et la moyenne avec la carte (14.0).
3. **Programmes complets à copier** (m01-l01, m01-l02, m06) : tout code que l'élève est invité à essayer sur OneCompiler doit fonctionner tel quel avec la classe `Main`. Pour `HelloWorld` (m01-l02), dis explicitement : « sur OneCompiler, garde le nom `Main` ».
4. **Rappels** : applique les échanges proposés au §5 de qa-pedagogie (même nombre de questions).
5. **Forme** : erreurs expliquées par « Traduction : « … » » ; références au cours sous la forme « slide N » (pas « p.N »).
6. Le périmètre ne grandit pas : aucune nouvelle notion, aucune nouvelle leçon.

## Vérifier
`node tools/verifier.mjs <module> --erreurs` : 0 problème. Puis relis chaque leçon avec le test de fatigue du brief rédacteur.
Mesure : `node tools/mesure.mjs <module>` (mots du chemin principal, interactions, test, erreurs ; les alertes indiquent ce qui dépasse les cibles).

## Rapport final (15 lignes max)
Pour chaque leçon : mots avant → après, et durée annoncée. Les points des rapports que tu n'as PAS appliqués, avec la raison. Le résultat du vérificateur.
