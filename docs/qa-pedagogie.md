# QA pédagogique — audit global du parcours (27 leçons)

> Audit d'ensemble : charge cognitive, progression, cohérence entre les 3 rédacteurs, répétition espacée, lexique, « Explique-moi simplement ».
> Hors périmètre de ce rapport : l'exactitude Java (voir `docs/qa-java.md`) et le ressenti du débutant simulé.
> Aucun fichier du projet n'a été modifié. Les mesures ont été faites par script : `scratchpad/qa-peda/mesure.mjs`, `index.mjs`, `simu.mjs` (chargement des leçons par `vm`, comme dans `tools/verifier.mjs`).

**Convention de repérage** : `§2.3` = section 2, 3e bloc de `sections` (dans l'ordre du fichier) ; `t2` = 2e question du `test`.
**Priorités** : **P1** = nécessaire pour tenir la contrainte de fatigue ou réparer une faute de progression ; **P2** = cohérence et fil rouge ; **P3** = finition.
Toutes les actions **retirent** ou **déplacent** du contenu (vers un `depliable` existant ou nouveau). Aucune n'ajoute de notion.

---

## 1. Synthèse

- **Le parcours est 1,4 à 2 fois plus long qu'annoncé.** Annoncé : **159 min** (2 h 39 ; `principes.md` dit « environ 2 h 30 »). Mesuré sur le chemin principal (sans dépliables ni « Explique-moi simplement ») : **≈ 3 h 40** pour un lecteur rapide qui ne fait pas les exercices à fond, **≈ 5 h 10** pour un vrai débutant.
- La cause n'est pas une leçon isolée : c'est une **densité uniforme**. Une leçon type compte 14 à 20 blocs, 400 à 680 mots, 3 ou 4 interactions dans le corps, 3 ou 4 questions de test, 1 exercice, et souvent 2 ou 3 blocs `erreur`. À 5-6 min, il faudrait ≈ 250-300 mots, 2 ou 3 interactions et 2 questions de test.
- Les 3 bilans (m02-l05, m03-l04, m04-l06) et la leçon d'ouverture (m06-l06) sont **dans les clous**. Les plus lourdes : **m05-l02, m03-l01, m03-l03, m04-l05, m04-l01, m06-l04, m06-l02**.
- **Avec les allègements P1 de ce rapport** (≈ 80 blocs retirés ou repliés), on descend à **≈ 3 h 10** (rapide) / **≈ 4 h 30** (débutant). En ajoutant deux règles transverses (R1 et R2, §6) : **≈ 2 h 55 / 4 h 10**. **2 h 30 réelles ne sont pas atteignables sans retirer une interaction par section.** Décision à prendre par l'utilisateur : alléger davantage, ou annoncer honnêtement ≈ 3 h (durées par leçon de 6 à 8 min).
- Progression : **saine**. Aucun `rappel` mal placé, le seul [créer] (m05-l02) est précédé d'un `trous`, les mots du cadre arrivent dans l'ordre prévu. Quelques termes utilisés avant leur définition (liste au §3).
- Fil rouge : **la continuité v1 → v2 → v3 est bonne** (le code de départ de chaque bilan est bien le corrigé précédent). Elle **se casse en m06** : le champ `nom` change de sens d'une leçon à l'autre, et la classe `Etudiant` ne reprend jamais les notes, la moyenne ni la validation (§4).
- Rappels : **exactement 1 par test à partir de m03, conformes au calendrier** (19/19). Mais `m05-l02` est rappelé 4 fois, et des confusions classiques ne reviennent jamais : `switch` sans `break`, `if (…);`, référence `e2 = e`, piège du ⏎ (§5).
- Lexique : 68 entrées, liens corrects. Manquent `null`, `this`, `méthode d'instance`, `signature`, `variable locale`, et 5 messages d'erreur vus dans le chemin principal (§7).
- « Explique-moi simplement » : 9 blocs. 4 sont redondants avec l'illustration juste au-dessus. Aucun là où ça résiste le plus (piège du ⏎, `this`) : proposer un **échange**, pas un ajout (§8).

---

## 2. Tableau de fatigue

**Méthode de mesure (hypothèses explicites)**
- *Mots* : tout le texte lu sur le chemin principal (texte, légendes, questions, options, une explication de réponse sur deux en moyenne, explications ligne par ligne, notes de trace, `retenir`, test). « + N » = mots dans les dépliables et les « simple » (facultatifs, non comptés dans la durée).
- *Durée rapide* : 180 mots/min, plus un forfait par bloc × 0,7 (code 0,4 min, erreur 0,6, quiz 0,5, prédire 0,8, trous 1, ordre 1, trace 0,3 + 0,15/étape, exo 1,5 à 3 selon le niveau).
- *Durée débutant* : 130 mots/min, forfaits pleins. Ces deux bornes **sous-estiment** les codes longs (m04-l06 : 24 lignes) et le temps passé à copier le code dans OneCompiler.
- *Termes* : notions nouvelles du chemin principal, comptées à la main (les `<strong>` seuls ne suffisent pas).
- *Questions de fatigue* (brief rédacteur, 11 questions) en alerte : Q1 trop longue · Q2 trop de texte · Q3 trop de concepts · Q4 pas assez d'exemples · Q5 exemples trop complexes · Q6 une illustration remplacerait du texte · Q7 mur de code · Q8 mur de texte · Q9 pas de pause naturelle · Q10 pas de réussite avant la suite · Q11 on peut supprimer sans perte.
- *1re interaction* : nombre de blocs lus avant la première micro-victoire.

| Leçon | Ann. | § | Blocs (+dépl.) | Blocs texte | Mots (+dépl.) | Codes | Interactions corps + test | Termes nouveaux | 1re interaction | Alertes | Réaliste rapide / débutant | Après P1 (rapide) | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| m01-l01 | 5 | 3 | 14 (+8) | 6 | 438 (+175) | 2 | 3 + 3 | 3 | bloc 9 | Q11 | 6,7 / 9,4 | 5,9 | à alléger |
| m01-l02 | 6 | 3 | 17 (+4) | 7 | 563 (+155) | 2 | 2 + 3 | **9** | bloc 7 | Q3 Q8 Q11 | 7,6 / 10,7 | 6,5 | **à couper** (§3 → dépliable) |
| m01-l03 | 5 | 3 | 13 (+1) | 5 | 409 (+22) | 1 | 3 + 3 | 2 | bloc 9 | Q11 | 7,1 / 10,0 | 6,1 | à alléger |
| m02-l01 | 6 | 5 | 20 (+6) | 8 | 418 (+158) | 3 | 4 + 3 | 6 | **bloc 13** | Q2 Q9 Q11 | 8,5 / 12,0 | 6,9 | à alléger |
| m02-l02 | 6 | 4 | 17 (+1) | 7 | 437 (+25) | 3 | 3 + 3 | 5 | bloc 6 | Q3 Q11 | 8,3 / 11,8 | 7,9 | **à couper** (§4 print) |
| m02-l03 | 6 | 3 | 19 (+3) | 6 | 484 (+73) | 3 | 4 + 3 | 6 à 8 | bloc 12 | Q3 Q9 Q11 | 8,4 / 11,9 | 7,1 | à alléger |
| m02-l04 | 6 | 3 | 17 (+4) | 7 | 459 (+116) | 3 | 3 + 3 | 5 | bloc 10 | Q3 | 7,0 / 9,9 | 6,3 | à alléger |
| m02-l05 | 8 | 4 | 9 (+4) | 2 | 277 (+68) | 4 | 3 + 3 | 0 | bloc 4 | — | 7,6 / 10,8 | 6,6 | **OK** |
| m03-l01 | 6 | 5 | 20 (+1) | **10** | 513 (+22) | 4 | 4 + 4 | 4 | bloc 8 | Q1 Q2 Q11 | **9,5 / 13,5** | 8,5 | **à couper** |
| m03-l02 | 5 | 4 | 16 (+4) | 6 | 397 (+82) | 3 | 2 + 4 | 5 | bloc 6 | Q3 Q11 | 7,2 / 10,2 | 6,2 | à alléger |
| m03-l03 | 6 | 5 | 19 (+1) | 7 | **679** (+16) | 4 | 3 + 3 | 7 | bloc 11 | Q1 Q2 Q3 Q9 | **9,5 / 13,4** | 8,3 | **à couper** |
| m03-l04 | 8 | 5 | 15 (+1) | 7 | 486 (+30) | 4 | 4 + 3 | 0 | bloc 4 | Q7 (versions) | 7,8 / 11,0 | 6,7 | **OK** |
| m04-l01 | 6 | 5 | 17 (+3) | 6 | 507 (+42) | 3 | 4 + 4 | 4 | bloc 1 | Q1 Q11 | **9,3 / 13,1** | 8,0 | **à couper** |
| m04-l02 | 5 | 4 | 13 (+4) | 3 | 392 (+104) | 2 | 5 + 4 | 3 | bloc 5 | Q11 | 7,4 / 10,5 | 7,0 | à alléger |
| m04-l03 | 5 | 4 | 11 | 3 | 438 | 2 | 3 + 3 | 4 | bloc 6 | **Q7** (4 blocs de 11 lignes) | 7,7 / 10,9 | 6,2 | **à couper** |
| m04-l04 | 5 | 4 | 13 | 4 | 492 | 2 | 2 + 3 | 5 | bloc 7 | Q1 Q3 | 8,4 / 11,9 | 7,3 | **à couper** |
| m04-l05 | 6 | 4 | 14 | 6 | 540 | 2 | 3 + 4 | 4 (+1 piège algo) | bloc 6 | Q1 Q3 | **9,6 / 13,6** | 8,4 | **à couper** |
| m04-l06 | 8 | 5 | 14 (+1) | 7 | 522 (+44) | 2 | 3 + 3 | 0 | bloc 5 | Q7 (24 lignes) | 6,7 / 9,5 (sous-estimé) | 6,7 | **OK** |
| m05-l01 | 6 | 5 | 17 (+1) | 7 | **646** (+30) | 2 | 3 + 3 | 6 | bloc 10 | Q2 Q9 Q11 | 8,6 / 12,1 | 7,6 | à alléger |
| m05-l02 | 6 | 5 | 17 (+2) | 5 | 568 (+76) | 2 | 4 + 3 | 5 | bloc 7 | Q1 Q3 Q7 | **10,4 / 14,7** | 8,8 | **à couper** |
| m05-l03 | 5 | 4 | 14 (+1) | 5 | 553 (+37) | 2 | 3 + 3 | 2 | bloc 9 | Q1 Q11 | 8,4 / 11,9 | 7,2 | à alléger |
| m06-l01 | 5 | 4 | 18 (+3) | 8 | 575 (+87) | 2 | 4 + 3 | **11** | bloc 1 | **Q3** Q8 | 6,7 / 9,4 | 6,2 | à alléger (termes) |
| m06-l02 | 6 | 5 | 16 (+3) | 4 | 601 (+92) | 3 | 3 + 3 | 7 | bloc 9 | Q1 Q3 Q9 | 9,0 / 12,7 | 7,7 | **à couper** |
| m06-l03 | 5 | 4 | 12 (+1) | 3 | 464 (+29) | 2 | 3 + 3 | 4 | bloc 2 | Q11 | 7,9 / 11,1 | 7,4 | à alléger |
| m06-l04 | 6 | 4 | 18 | 6 | 616 | 2 | **6** + 3 | **9** | bloc 2 | Q1 Q3 Q11 | **9,5 / 13,5** | 8,1 | **à couper** (§3) |
| m06-l05 | 6 | 4 | 14 (+2) | 5 | 501 (+51) | 2 | 3 + 3 | 6 | bloc 7 | Q7 | 7,2 / 10,2 | 6,6 | à alléger |
| m06-l06 | 6 | 5 | 16 (+3) | 7 | 537 (+27) | 2 | 1 + 3 | 6 (aperçu) | bloc 11 | Q9 | 6,6 / 9,3 | 6,0 | **OK** (ouverture) |
| **Total** | **159** | | | | | | | | | | **218 / 309 min** | **192 min** | |

Ici, « à couper » veut dire : **sortir une section ou une idée entière du chemin principal** (vers un dépliable, ou la supprimer si elle est en doublon). Cela ne veut pas dire découper la leçon en deux : le nombre de leçons ne doit pas augmenter.

**Durée totale.** Annoncé 2 h 39 · réaliste 3 h 38 (rapide) à 5 h 09 (débutant) · après P1 3 h 12 · après P1 + R1 + R2 2 h 57 (rapide) / 4 h 10 (débutant).
Les durées annoncées à **5 min** (m01-l01, m01-l03, m03-l02, m04-l02 à l04, m05-l03, m06-l01, m06-l03) sont toutes intenables, même après allègement : il faut annoncer **6 min**. Pour m01-l01, il faut aussi compter le temps d'ouvrir OneCompiler et d'y coller le code.

---

## 3. Progression

**Ce qui fonctionne**
- Chaque leçon s'ouvre sur un `pourquoi` qui reprend la leçon d'avant (« Tu sais X. Mais… »). Les ponts avec l'algo (`←`, SI, POUR, TANT QUE, SELON, RÉPÉTER) sont présents et bien placés.
- Le cadre est expliqué mot par mot, dans l'ordre prévu : m01-l02 → m05-l01 (`main`, `static`, `void`) → m06-l02 (`class`, `static` en entier) → m06-l04 (`public`) → m06-l06 (`String[] args`). `new` (m03-l03) est annoncé puis repris explicitement en m06-l02.
- Exercices : le seul [créer] du chemin principal (m05-l02 §5.2) est précédé d'un `trous` (§5.1). Le [créer] de m03-l04 est dans un dépliable, et un `trous` le précède.

**Termes utilisés avant leur définition (ou jamais définis)**
| Où | Terme | Action |
|---|---|---|
| m04-l01 §2.3, m05-l01 §5.1, m05-l02 §3.1 | « expression » (jamais défini) | P3 · remplacer par « un calcul ou une comparaison » (m04-l01) et par « une valeur » (`return valeur;`) |
| m04-l02 §3.2 (explication) | « opérandes » | P3 · « mauvais types pour l'opérateur <= » suffit |
| m05-l01 §2.3 (`cours` slide 49) | `type_retour`, `type1 nom1` : les paramètres et le retour arrivent en m05-l02 | P2 · déplacer ce bloc `cours` en m05-l02 §3, ou le supprimer |
| m06-l04 §1.3 (`cours` slide 11) | « interface (vue externe, services offerts) » : un autre sens que l'`interface` Java de m06-l06 | P2 · retirer la parenthèse « en définissant une interface (vue externe…) », ou replier ce bloc `cours` dans un dépliable « examen » |
| m06-l02 §1.4 | « un fichier n'a qu'une seule classe publique » : `public` n'arrive qu'en m06-l04 | P3 · « on l'écrit au-dessus de `Main`, sans le mot `public` (expliqué plus loin) » |
| m03-l03 (`InputMismatchException`) puis m06-l06 | « exception » apparaît dès m03 (prévu par la carte) | OK : m06-l06 §1.2 fait bien le lien |
| m06-l03 §3.2 | `null` : défini dans l'explication, absent du lexique | voir §7 |
| lexique « package system does not exist » | traduit par « Le paquetage system… », alors que « paquetage » n'arrive qu'en m06-l04 (m01-l03 traduit par « system n'existe pas ») | P3 · aligner sur la traduction de m01-l03 |

**Sauts de difficulté**
- **m02-l05 §3.1** : `exo` de niveau *combiner* (trois `println` concaténés, écrits sans modèle). C'est la 1re écriture « longue ». Il est acceptable, car m02-l02 §3.6 a entraîné la concaténation, mais c'est le pic du module 2. Le `predire` de l'étape 3 (§3.2) arrive après : OK.
- **m04-l06 §4.2** : première imbrication (`do…while` dans un `for`), sur 24 lignes (la règle est d'environ 12). C'est montré, pas demandé, et la `cle` §4.3 aide. Mais c'est un mur de code (Q7).
- **m06-l02 §5.1** : l'`exo` *reproduire* « classe `Voiture` » demande d'écrire un fichier complet à deux classes, à partir de rien, sans `trous` avant. C'est en réalité un [créer] → voir les actions de m06-l02.
- **m05-l03 §4.3** : l'exo *corriger* demande en fait d'écrire une nouvelle méthode à 2 paramètres. Acceptable (le modèle est juste au-dessus).

**Structure**
- **m04-l02 §4** s'intitule « Pour l'examen », mais contient le `predire` obligatoire §4.2. Un étudiant pressé sautera la section entière. → voir les actions de m04-l02.
- Lecture avant la 1re micro-victoire : **m02-l01 (12 blocs)**, m02-l03 (11), m03-l03 (10), m06-l06 (10). Le principe « une interaction toutes les 1 à 2 sections » est respecté en nombre de sections, mais pas en nombre d'écrans. m02-l01 est la 4e leçon que l'élève voit : c'est là que ça compte le plus.

---

## 4. Cohérence entre rédacteurs et fil rouge

**Ton** : homogène (tutoiement, phrases courtes, aucune condescendance). Les prénoms (Adama, Fatou, Awa, Moussa) et les exemples locaux (Thiès, Pikine, FCFA, wolof) sont cohérents d'un rédacteur à l'autre. Les noms de variables aussi : `sc` pour le Scanner, `e` pour un Etudiant, `note1..3`, `moyenne`, `somme`.

**Petites divergences de forme (P3)**
- Explication des erreurs : m01 à m04 commencent par « Traduction : « … » » ; m05 et m06 mettent directement « « … » ». → Aligner sur « Traduction : ».
- Références au cours : « slide N » (m01, m02, m05, m06) contre « p.N » (m03, m04 : `p.36`, `p.38-39`, `p.43`, `p.45`, `p.46`, `p.47`). → Tout écrire « slide N ».
- Versions de Java citées sans besoin : m06-l04 §4.2 (« Depuis Java 25… »), m06-l05 §3.2 (« jusqu'à Java 24 ») et t1 (« en Java 21 »). Pour un débutant, c'est du bruit, et ces trois phrases ne disent pas la même chose. → Garder seulement « écris-le en première ligne » (voir les actions).

**Fil rouge « la fiche d'Adama »**
| Étape | Données | Constat |
|---|---|---|
| m02-l02 | Adama a **20** ans, puis 21 | ≠ 22 partout ailleurs (P3 : 21 → 22) |
| m02-l05 (v1) | `nom = "Adama SECK"`, `'A'`, 22, notes 12.5 / 15.0 / 9.75, `inscrit` | conforme à la carte |
| m03-l04 (v2) | départ = v1 corrigée ✓ ; on garde ensuite le nom et les notes ; saisie 14 / 16 / 12 → 14.0 | l'abandon de `initiale`, `age` et `inscrit` est annoncé (§1.3) : OK |
| m04-l06 (v3) | départ = v2 ✓ ; saisie 25 / 14 / 16 / −2 / 12 | **la v3 finale (§4.2) perd `nom`** : elle affiche « Moyenne : 14.0 » au lieu de « Adama SECK a… » (P2) |
| m05-l01 | « Adama SECK », « Moyenne : 13.5 » | 13.5 ne correspond à aucune version (P3 → 14.0) |
| m05-l02 | exo : moyenne d'Adama avec 12, 15, 9 → 12.0 | autres notes que v1 et v2 (P3 → 14, 16, 12 → 14.0) |
| m06-l01 | UML : Prénom = Adama, Nom = SECK ; code `nom1 = "SECK"` | `nom` = le nom de famille |
| m06-l02 à l04 | `e.nom = "Adama"` | `nom` = le prénom |
| m06-l05 | §1.2 : `nom` **et** `prenom` ; §3.3 : `new Etudiant("Adama", "201506SRG")` | `nom` = le prénom, alors que `prenom` existe juste au-dessus |

→ **P2 · Une seule convention en m06** : `nom = "Adama SECK"`, comme en m02 à m04 (un seul attribut texte). Il faut alors retirer `prenom` de m06-l05 §1.2 (`Etudiant`/`Enseignant` partagent `nom` seul), et remplacer `"SECK"`/`"DIOP"` par `"Adama SECK"`/`"Fatou DIOP"` dans m06-l01 §1.3.

→ **P2 · La v4 ne reprend rien des v1 à v3.** `Etudiant` n'a jamais de notes ni de moyenne, la validation de m04 n'est pas réutilisée, et les exercices partent vers `Voiture`. Correction **à volume constant** (on remplace, on n'ajoute pas) :
- m06-l02 §5.1 : remplacer l'exo « classe `Voiture` » par « ajoute l'attribut `double moyenne` à `Etudiant` et fais-le afficher par `afficher()` » (niveau *modifier*). C'est plus court, et ça raccroche au fil rouge.
- m06-l04 §4.3 : remplacer l'exo « `getNom()` » par « écris `setMoyenne(double m)` qui refuse une valeur hors de [0, 20] ». C'est exactement la condition de m04-l02, et le rappel du test de m06-l04 (m04-l02) prend alors tout son sens.

**Répétitions inutiles relevées** (traitées dans les actions par leçon)
- m01-l01 : §1.3 décrit OneCompiler, puis le dépliable §1.4 le redécrit.
- m02-l01 : §4.2 montre `int annee = 2026; println(annee)`, puis l'exo §5.2 demande… d'écrire `int annee = 2026;` et de l'afficher.
- m02-l05 §4.1 (`versions`) reprend mot pour mot le corrigé de l'exo §3.1, et m03-l04 §1.2 le remontre encore.
- m03-l01 : quiz §2.4 « 9 / 2 » puis test t2 « 10 / 4 » (même question) ; code §5.2 = corrigé de l'exo §5.3.
- m04-l03 : 3 `switch` presque identiques de 11 lignes (§2.1, §2.2, §2.3).
- m05-l01 : illus §3.1 = lignes du code §3.2 ; trace §4.2 + predire §4.4 + test t1, trois fois le même schéma.
- m05-l02 / m05-l03 / m06-l01 / m06-l05 : un bloc `cours` qui redit le `texte` juste à côté.

**Contradictions** : aucune sur le fond. Les annonces (« expliqué en m06 », « on y reviendra ») sont toutes tenues.

---

## 5. Répétition espacée

**Conformité** : chaque test de m03-l01 à m06-l06 contient **exactement 1** question `rappel`, sur une leçon antérieure d'un module antérieur, conforme au calendrier de la carte (19/19). Les échauffements de m04-l01 et m06-l01 sont présents et conformes.

**Couverture des confusions classiques (`principes.md`)**
| Confusion | Rappelée ? |
|---|---|
| `=` vs `==` | oui (m05-l02) |
| `' '` vs `" "`, char vs String | oui ×2 (m03-l03, m04-l03) |
| concaténation et espaces | oui (m03-l01) |
| cast / troncature | oui ×2 (m03-l02, m04-l06) |
| division entière | oui ×2 (+ l'échauffement de m04-l01) : **trop** |
| `i++` vs `++i` | oui (m04-l01) |
| `next()` vs `nextLine()` | oui (m04-l02) |
| `do…while` (au moins 1 tour) | oui ×2 (m05-l03, m06-l06) |
| `return` vs `println` | oui ×2 (+ l'échauffement de m06-l01) : **m05-l02 est rappelé 4 fois** |
| définir vs appeler | oui (m06-l01) |
| erreur de compilation : la 1re d'abord | oui (m03-l04) |
| `&&` vs `||` | oui (m06-l04) |
| `if (…);` et ordre des `else if` | **non** |
| `switch` sans `break` | **non** |
| piège du ⏎ (`nextInt` puis `nextLine`) | **non** (seulement un `attention` en m03-l04) |
| cast caché de `+=` | **non** : le rappel de m04-l04 teste `+= 5`, sans le piège |
| référence `e2 = e`, classe vs objet | **non** (pas de leçon après m06-l02 qui la rappelle) |

**Échanges proposés (P3, même nombre de questions, on change seulement la cible)**
- m04-l04 t3 (rappel m03-l02) : remplacer `total += 5; total -= 2` par `int total = 0; total += 2.7;` (réponse 2) : on teste ainsi le vrai piège.
- m04-l05 t4 (rappel m03-l01, déjà vu à l'échauffement de m04-l01) → rappel **m03-l03, piège du ⏎** : `predire` avec la saisie `20 ⏎ Adama ⏎`, réponse `[]`. Ça colle au thème de la leçon (la saisie).
- m06-l05 t3 (rappel m05-l02, 4e fois) → rappel **m04-l03** (`switch` sans `break`), ou **m04-l01** (`if (…);`). La règle « module antérieur » est respectée.
- m06-l06 t3 (rappel m04-l05, déjà rappelé en m05-l03) → rappel **m04-l01** (ordre des `else if`), ou celui que m06-l05 n'aura pas pris.
- La référence `e2 = e` (m06-l02) ne peut pas être rappelée dans un module postérieur. Elle est en revanche reprise implicitement en m06-l03 et m06-l04 : acceptable.

---

## 6. Règles transverses proposées (allègement global)

- **R1 (P1) · Test = 2 questions** à partir de m02 : 1 question sur la leçon + 1 `rappel` (dès m03). Le format autorise « 2 à 5 ». Gain mesuré : ≈ 12 min sur le parcours. Les leçons avec 4 questions (m03-l01, m03-l02, m04-l01, m04-l02, m04-l05) sont prioritaires.
- **R2 (P1) · Au plus 1 bloc `erreur` dans le chemin principal**, sauf en m01-l03 (dont c'est le sujet). Les autres vont dans un dépliable « Autres erreurs fréquentes » (genre `plus`). Gain ≈ 5 à 8 min. Leçons concernées : m01-l02, m02-l03, m03-l03, m04-l04, m04-l05, m05-l02, m05-l03, m06-l05, m06-l06.
- **R3 (P2) · Un bloc `cours` seulement s'il apporte autre chose que le `texte` voisin**, sinon dans un dépliable « examen » (la terminologie du professeur reste ainsi accessible).
- **R4 (P2) · Une seule « seconde image » par notion** : si une `illus` donne déjà l'image, pas de `simple` qui en donne une autre (voir §8).
- **R5 (P3) · Annoncer 6 min minimum** pour une leçon normale, et garder 8 min pour les bilans.

---

## 7. Lexique (`courses/lexique.js`)

**Qualité** : 68 entrées, définitions courtes et fidèles aux leçons, liens `lecon` tous valides. Aucune incohérence de fond. Seul écart : la traduction de `package system does not exist` (voir §3). La définition de `interface` pourrait ajouter « en `public` », comme dans la leçon (P3).

**Termes manquants** (vus en `<strong>` dans le chemin principal). Ajouter une ligne chacun : le lexique est un outil de consultation, son périmètre ne compte pas dans la durée.
- P2 : **`null`** (m06-l03 : « aucune valeur, pour un texte ou un objet ») ; **`this`** (m06-l03, aujourd'hui caché dans « constructeur ») ; **méthode d'instance** (m06-l02) ; **signature** (m05-l03, caché dans « surcharge ») ; **variable locale** (m05-l02).
- P3 : **troncature**, **invite**, **import**, **instanciation**, **UML**, **classe mère / fille**, **paquetage**, **tableau** (m06-l06).

**Messages d'erreur vus dans le chemin principal mais absents du lexique** (P2 pour les deux premiers, qui reviennent 2 fois) :
- `constructor X in class X cannot be applied to given types` (m06-l03, m06-l05) ;
- `X has private access in Y` (m06-l04) ;
- `illegal start of expression` (m05-l01) ;
- `java.lang.ArithmeticException: / by zero` (m06-l06) ;
- P3 : `void cannot be converted to int`, `bad operand types for binary operator`, `method … is already defined`, `String cannot be converted to char`.

---

## 8. « Explique-moi simplement » (9 blocs)

| Leçon | Image | Avis |
|---|---|---|
| m01-l02 §1.6 | livre en wolof, traducteur, lecteur | **utile** (compilé vs interprété) |
| m01-l03 §1.5 | correcteur d'orthographe | faible : la notion ne résiste pas → **supprimer** (P3) |
| m02-l01 §2.5 | casiers de vestiaire | **doublon** de l'illus « boîte » → **supprimer** (P3) |
| m02-l02 §1.5 | `=` se lit « reçoit » | **très utile** (= vs ==) |
| m03-l01 §3.3 | bouteilles par paquets de 6 | **doublon** de l'illus « mangues » §2.1 → **supprimer** (P3) |
| m03-l02 §3.5 | guichet et ticket | **utile** (`i++` / `++i` résiste) |
| m04-l01 §3.4 | parapluie / casquette | faible : l'illus aiguillage et le compare algo suffisent → **supprimer** (P3) |
| m05-l01 §4.3 | recette écrite / cuisinée | **utile** (définir ≠ appeler) |
| m06-l01 §3.4 | jumeaux + plan d'architecte | utile, mais deux images en une. → Ne garder que les jumeaux (identité) : le plan est déjà l'illus §3.2 (P3) |

**Là où une notion résiste, il n'y en a pas** : le piège du ⏎ (m03-l03), `this` (m06-l03), la référence (m06-l02 : l'illus « télécommande » fait déjà le travail, c'est OK). Si l'on veut une seconde image, la placer à la place d'un bloc supprimé ci-dessus (**échange, solde −2**) :
- m03-l03 §4 : « `nextInt()` prend le nombre et laisse le ⏎ sur le comptoir ; `nextLine()` ramasse ce ⏎ et croit avoir lu une ligne (vide) » ;
- m06-l03 §2 : « `this.nom` = la case "nom" du formulaire de ce bébé ; `nom` seul = ce que la sage-femme tient dans la main ».

---

## 9. Actions par leçon

Format : **fichier · bloc · action** — priorité. « → dépl. » = déplacer dans un `depliable` (genre indiqué) de la même leçon. Les gains sont mesurés avec le modèle « rapide ».

### m01-premiers-pas
**m01-l01** (6,7 → 5,9 min)
- `m01-l01.js · §1.3 texte` · réduire à une phrase (« Clique sur Copier pour essayer, puis suis le dépliable OneCompiler ») : le dépliable §1.4 dit la même chose — P1
- `· t3 quiz Ctrl+Z` · supprimer (doublon de l'`attention` §3.4) — P1
- `· duree` · annoncer 6 (ouvrir OneCompiler prend du temps) — P3

**m01-l02** (7,6 → 6,5 min ; 9 termes)
- `m01-l02.js · §3.2 erreur (nom de fichier) + §3.3 attention (java HelloWorld.class)` · → dépl. « outil » « Sur ton ordinateur » : sur OneCompiler, la classe est toujours `Main`, ces deux pièges ne concernent que le terminal. Garder §3.1 (casse) et l'exo §3.4 — P1
- `· §2.3 texte (classe / main)` · supprimer : les `lignes` du code §2.2 le disent déjà. Garder §2.4 (bloc / instruction / commentaire) — P1
- `· t2 quiz « Moyenne.java »` · garder ; c'est le seul endroit où la règle « nom de fichier = nom de classe » reste dans le chemin principal — info

**m01-l03** (7,1 → 6,1 min)
- `m01-l03.js · §2.5 quiz (package system)` · supprimer (même mécanique que §2.4) — P1
- `· t3 quiz « ';' expected »` · supprimer (déjà vu 3 fois dans la leçon) — P1
- `· §1.5 simple` · supprimer (voir §8) — P3

### m02-variables
**m02-l01** (8,5 → 6,9 min ; 1re interaction au bloc 13)
- `m02-l01.js · §5.2 exo reproduire « annee = 2026 »` · supprimer : c'est le code de §4.2, mot pour mot — P1
- `· §3.3 attention ("age" entre guillemets)` · supprimer : le quiz §3.4 l'enseigne mieux, par l'erreur — P1
- `· §2.3 + §2.4 textes` · fusionner en un seul texte (type / nom / valeur + déclaration / initialisation) — P2
- `· §2.5 simple` · supprimer (voir §8) — P3
- `· §4.4 predire` · le remonter juste après le code §2.1, pour une 1re réussite plus tôt — P2

**m02-l02** (8,3 → 7,9 min ; 4 idées)
- `m02-l02.js · §4 « print ou println » (§4.1, §4.2)` · supprimer la section. `print` est réexpliqué là où il sert (m03-l03, `lignes` du code §2.1 : « print, pour rester sur la même ligne »). Déplacer le quiz §4.3 (`age = 25`) à la fin de §1 — P1
- `· §2.1 texte` · fusionner dans les `lignes` du code §2.2 — P2
- `· §1.1 pourquoi` · « Adama a 21 ans… il en a 22 », pour coller au fil rouge (22 ans en m02-l05 et m06). Adapter la trace §1.4 et le code §3.4 — P3

**m02-l03** (8,4 → 7,1 min)
- `m02-l03.js · §3.3 attention (slide 26, float pi / double pi)` · → dépl. « examen » §1.7 — P1
- `· §3.2 erreur float pi = 3.14` · → dépl. « examen » (float est rare ; le `f` reste dit en §1.5) — P1
- `· §2.5 quiz (âge → int)` · supprimer : trois quiz de suite pour classer, c'est un de trop, et le test t3 joue ce rôle — P1
- `· t2 predire` · renommer la variable `char note = 'B'` en `char mention = 'B'` (dans la suite du parcours, `note` est toujours un `double`) — P3

**m02-l04** (7,0 → 6,3 min)
- `m02-l04.js · §2.6 attention (byte b = 100)` · → dépl. « examen » §3.6 — P1
- `· §3.4 quiz (double d = 5)` · supprimer (t2 couvre le sens automatique) — P1
- `· t2 quiz, option « double c = 'A' » (65.0)` · remplacer par une option simple (`double c = 7;`), car la conversion char → double est une surprise de trop — P3

**m02-l05** (OK)
- `m02-l05.js · §4.1 versions` · réduire à la seule v3, ou supprimer : c'est le corrigé de l'exo §3.1, et m03-l04 §1.2 le remontre — P2

### m03-calculer-dialoguer
**m03-l01** (9,5 → 8,5 min)
- `m03-l01.js · §1.4 attention (× ÷)` · supprimer — P1
- `· §4.3 ecart (slide 36)` · → dépl. « examen » (la priorité est dite juste en §4.1) — P1
- `· §4.5 attention ("Somme : " + 2 + 3)` · → dépl. « plus » : c'est une 2e idée, qui sera bien plus utile au moment de concaténer un calcul (m03-l04) — P1
- `· §5.2 code` · supprimer : l'exo §5.3 et son corrigé disent la même chose — P1
- `· §3.5 attention (% ≠ pourcentage)` · fusionner dans le texte §3.1 — P2
- `· t2 quiz « 10 / 4 »` · supprimer (même question que le quiz §2.4) — P1
- `· structure` · fusionner §1 et §2 (le problème + la division entière), pour passer à 4 sections — P2
- `· §3.3 simple` · supprimer (voir §8) — P3

**m03-l02** (7,2 → 6,2 min)
- `m03-l02.js · §2.2 code (vies--)` · supprimer : le `predire` §2.3 montre la même chose — P1
- `· §3.3 texte` · fusionner avec §3.1 (pré / post) — P2
- `· §4.4 attention, 2e phrase (« x =+ 5 »)` · → dépl. « examen » §4.5 — P1
- `· t1 predire (++x)` · supprimer : t2 (x++) suffit, et le test passe à 3 questions — P1
- `· duree` · 6 — P3

**m03-l03** (9,5 → 8,3 min ; la plus longue en mots)
- `m03-l03.js · §2.3 compare (terminal / sortie)` · remplacer par une phrase dans le texte §2.2 : « Ce que tu tapes n'apparaît pas dans la sortie affichée ici. » Le principe est repris en m03-l04 §3.4 — P1
- `· §3.3 code (nextLine)` · fusionner avec §3.2 en un seul code à deux lectures, ou supprimer (le quiz §3.4 fait la différence) — P1
- `· §4.3 attention (virgule ou point)` · → dépl. « outil » (ça dépend de la machine ; les outils en ligne attendent le point) — P1
- `· §5.2 + §5.3 (erreur d'exécution)` · garder (le terme sert en m06-l06) ; supprimer le texte §5.2 en mettant la définition dans l'explication de §5.3 — P2
- `· §4` · voir §8 : c'est le meilleur endroit pour un « simple » sur le piège du ⏎ (en échange d'un « simple » supprimé ailleurs) — P3

**m03-l04** (OK)
- `m03-l04.js · §4.3 versions` · ne garder que la v3 (v1 et v2 sont ce que l'élève vient de faire) — P2
- `· t2 quiz « 95 % 60 »` · garder ; supprimer t1 si R1 est adopté — P3

### m04-choisir-repeter
**m04-l01** (9,3 → 8,0 min)
- `m04-l01.js · §3.3 compare (algo / Java)` · garder (pont algo), mais **supprimer §3.4 simple** (voir §8) — P1
- `· §2.3 texte (condition)` · fusionner dans §2.1 — P1
- `· t3 predire (t = 25)` · supprimer : il double le quiz §4.3 — P1
- `· §5.3 exo pair / impair` · garder (bonne réussite en fin de leçon) — info

**m04-l02** (7,4 → 7,0 min)
- `m04-l02.js · §4 « Pour l'examen »` · déplacer le `predire` §4.2 à la fin de §3, et retirer le dépliable §4.1 de cette section (le mettre en fin de §3). Supprimer la section §4 : sinon, l'étudiant qui saute « l'examen » saute aussi l'exercice obligatoire — **P1**
- `· §2.4 quiz (false || false)` · supprimer (2 quiz suffisent pour la table de vérité) — P1
- `· t2 predire` · supprimer (R1) — P2

**m04-l03** (7,7 → 6,2 min ; mur de code)
- `m04-l03.js · §2.2 code (switch sur String)` · supprimer : la `compare` §4.1 dit déjà « int, char et String » — P1
- `· §2.3 predire (jour = 3)` · supprimer : c'est le même `switch` que §2.1 ; la vraie difficulté est le `break` oublié (§3.1) — P1
- `· §4.2 erreur (case note >= 16)` · → dépl. « plus » : la conclusion de la `compare` §4.1 le dit déjà — P1

**m04-l04** (8,4 → 7,3 min ; 3 notions : for, accumulateur, portée)
- `m04-l04.js · §2.2 compare (POUR / for)` · le réduire à une phrase dans le texte §1.3 (« c'est le POUR de l'algo ») : la trace §2.3 montre déjà le fonctionnement en détail — P1
- `· §4.1 erreur (virgules dans le for)` · → dépl. « plus » (R2 : garder l'erreur de portée §4.2, qui porte une notion) — P1
- `· §2.3 trace` · garder (c'est l'illustration clé des boucles) — info
- `· t3 rappel` · voir §5 (le cast caché de `+=`) — P3
- `· duree` · 6 — P3

**m04-l05** (9,6 → 8,4 min)
- `m04-l05.js · §3.2 code (somme, slide 45)` · → dépl. « examen » : le `do…while` utile est la validation §4.1 — P1
- `· §3.4 attention (RÉPÉTER…JUSQU'À inversé)` · → dépl. « plus » (passerelle algo utile mais facultative) — P1
- `· t1 predire (x * 3)` · supprimer (R1 ; t2 et t3 sont plus ciblés) — P1
- `· t4 rappel` · voir §5 (piège du ⏎) — P3

**m04-l06** (OK)
- `m04-l06.js · §4.2 code v3 (24 lignes)` · garder `String nom = "Adama SECK";` et l'afficher (`nom + " : moyenne " + moyenne`), pour que le fil rouge ne perde pas Adama — P2
- `· §4.2` · envisager un bloc `versions` à 2 étapes (validation dans le for / + mention) plutôt qu'un seul bloc de 24 lignes — P3
- `· t1 predire (mentions)` · la cascade omet « Bien (≥ 14) » : reprendre l'échelle complète, ou une moyenne qui ne laisse aucun doute — P3

### m05-methodes
**m05-l01** (8,6 → 7,6 min)
- `m05-l01.js · §2.3 cours (slide 49, type_retour, params)` · déplacer en m05-l02 §3 (voir §3), ou supprimer — P1
- `· §3.1 illus (où l'écrire)` · supprimer : les `lignes` du code §3.2 et le quiz §3.3 le disent — P1
- `· §2.4 texte (« fonction » / méthode)` · fusionner dans §2.1 — P2
- `· t1 predire (tirets)` · supprimer : même schéma que la trace §4.2 et le predire §4.4 — P1
- `· §1.2 code` · « Moyenne : 14.0 », pour le fil rouge — P3

**m05-l02** (10,4 → 8,8 min ; la plus chargée du parcours)
- `m05-l02.js · §2.3 boites + §2.4 cours (slide 50)` · supprimer : les `lignes` du code §2.2 disent la même chose — P1
- `· §2.5 predire ligne(n) avec for` · supprimer : c'est un exercice de combinaison, de trop ici ; §3.5 et le test suffisent — P1
- `· §4.2 erreur (void → int)` · → dépl. « examen » §4.3 (R2 ; garder `missing return statement`) — P1
- `· §5.2 exo créer` · notes 14, 16, 12 → 14.0 (fil rouge v2 / v3) — P3

**m05-l03** (8,4 → 7,2 min)
- `m05-l03.js · §2.2 cours (slide 54)` · supprimer : le texte §2.1 le dit, et l'`ecart` §2.4 cite la slide — P1
- `· §4.2 erreur (no suitable method)` · → dépl. « plus » (R2) — P1
- `· t2 quiz (surcharge valide)` · supprimer : même question que le quiz §3.4 — P1
- `· duree` · 6 — P3

### m06-objets
**m06-l01** (6,7 → 6,2 min ; 11 termes, le record)
- `m06-l01.js · §3.1 cours (slides 8-9, « sémantique commune… »)` · → dépl. « examen » : définition abstraite, l'illus §3.2 et le texte §3.3 suffisent — P1
- `· §4.3 code (UML Etudiant en texte)` · supprimer : doublon de l'illus §2.2 — P1
- `· §3.3 texte` · retirer « instanciation », qui est redit au bon moment en m06-l02 §2.3 (« c'est l'instanciation ») : un terme de moins — P2
- `· §1.3 code` · `nom1 = "Adama SECK"`, `nom2 = "Fatou DIOP"` (convention `nom`, voir §4) — P2
- `· §3.4 simple` · ne garder que les jumeaux — P3

**m06-l02** (9,0 → 7,7 min ; 5 idées)
- `m06-l02.js · §3.3 erreur (Etudiant e; sans new)` · → dépl. « plus » (R2) — P1
- `· §4.3 predire (Fatou / Adama, deux objets)` · supprimer : le test t2 vérifie déjà « deux new = deux objets » — P1
- `· §5.1 exo « classe Voiture »` · remplacer par « ajoute `double moyenne` à Etudiant et complète `afficher()` » (niveau *modifier*, fil rouge v4, voir §4). L'exo actuel est un [créer] déguisé, sans `trous` avant — **P1**
- `· §1.4 texte` · « sans le mot public (expliqué plus loin) » — P3
- `· §2.2 code` · `e.nom = "Adama SECK"` (convention `nom`) — P2

**m06-l03** (7,9 → 7,4 min)
- `m06-l03.js · §3.3 compare (constructeur / void)` · supprimer : le test t1 et l'exo §4.1 traitent exactement ce piège — P1
- `· §2` · c'est l'endroit pour un « simple » sur `this`, si on en veut un (échange, voir §8) — P3
- `· duree` · 6 — P3

**m06-l04** (9,5 → 8,1 min ; 9 termes, 6 interactions)
- `m06-l04.js · §3.2 code Salarie` · supprimer : l'illus §3.1 et le quiz §3.5 suffisent — P1
- `· §3.6 + §3.7 quiz` · supprimer : un seul quiz (§3.5) sur les visibilités — P1
- `· §1.3 cours (slide 11)` · → dépl. « examen », ou retirer la parenthèse « interface (vue externe…) » (conflit avec m06-l06) — P1
- `· §4.2 cadre` · supprimer la phrase « Depuis Java 25… » — P2
- `· §4.3 exo getNom` · remplacer par `setMoyenne` qui refuse une valeur hors de [0, 20] (fil rouge, voir §4) — P2

**m06-l05** (7,2 → 6,6 min)
- `m06-l05.js · §2.1 cours (slide 15)` · supprimer : l'illus §2.2 dessine exactement cet arbre — P1
- `· §4.2 erreur (extends A, B)` · → dépl. « examen » §4.4 (R2 ; « une seule mère » est dit en §2.3) — P1
- `· §3.2 texte` · « Écris-le en première ligne » (retirer « jusqu'à Java 24 ») ; t1, option 2 : retirer « en Java 21 » — P2
- `· §1.2 code` · retirer `prenom` (convention `nom`, voir §4) — P2
- `· t3 rappel` · voir §5 — P3

**m06-l06** (OK, leçon d'ouverture)
- `m06-l06.js · §3.4 erreur (méthode d'interface non publique)` · → dépl. « plus » : dans une leçon d'aperçu, inutile d'entraîner une erreur. Le texte §3.1 dit déjà « en public » — P2
- `· t3 rappel` · voir §5 — P3

### courses/lexique.js
- Ajouter `null`, `this`, `méthode d'instance`, `signature`, `variable locale` et les 2 messages `constructor … cannot be applied to given types` / `… has private access in …` — P2
- Aligner la traduction de `package system does not exist` sur m01-l03 — P3
- Les autres ajouts du §7 — P3

---

## 10. Ce que ce rapport ne propose volontairement PAS
- Aucune nouvelle leçon, aucune coupe en deux leçons (le manifeste reste à 27).
- Aucun nouveau type de bloc, aucune nouvelle notion. Les deux « simple » du §8 sont des **échanges** (solde −2 blocs).
- Les ajouts au lexique ne touchent pas la durée du parcours (consultation à la demande).
