/* Tests de bout en bout du moteur (navigateur headless).
   Prérequis : Playwright (npm i playwright). Usage : node tools/e2e.cjs [dossier-captures]
   Ouvre les pages en file://, joue avec chaque type d'interaction et vérifie les comportements clés. */
const { chromium } = require("playwright");
const path = require("path");

const RACINE = "file://" + path.resolve(__dirname, "..") + "/";
const CAPTURES = process.argv[2];
const echecs = [];
function verifier(cond, msg) { if (!cond) echecs.push(msg); console.log((cond ? "  ✔ " : "  ✘ ") + msg); }

async function nouvellePage(nav, largeur) {
  const p = await nav.newPage({ viewport: { width: largeur, height: 860 } });
  p.erreurs = [];
  p.on("pageerror", (e) => p.erreurs.push(e.message));
  p.on("console", (m) => m.type() === "error" && p.erreurs.push(m.text()));
  return p;
}
async function toutDevoiler(p) {
  for (let k = 0; k < 10; k++) {
    const c = await p.$(".bouton.continuer");
    if (!c) break;
    await c.click();
    await p.waitForTimeout(80);
  }
}

(async () => {
  const nav = await chromium.launch();
  const ctx = await nav.newContext({ permissions: ["clipboard-read", "clipboard-write"] });

  console.log("Accueil");
  let p = await ctx.newPage();
  p.erreurs = []; p.on("pageerror", (e) => p.erreurs.push(e.message));
  await p.goto(RACINE + "index.html");
  verifier(await p.$$eval("details.module", (d) => d.length) === await p.evaluate(() => JR.modules.length), "le parcours liste tous les modules du manifeste");
  verifier((await p.textContent("#reprendre")).includes("Commencer"), "bouton « Commencer » pour un nouveau venu");
  verifier(p.erreurs.length === 0, "aucune erreur JavaScript (accueil) " + p.erreurs.join(" | "));

  console.log("Leçon modèle figée (tools/fixture) : toutes les interactions");
  const FIXTURE = RACINE + "tools/fixture/lecon.html?l=m02-l01";
  await p.goto(FIXTURE);
  await p.waitForSelector("section.etape");
  verifier(await p.$$eval("section.etape", (s) => s.filter((x) => !x.hidden).length) === 1, "une seule section visible au départ");
  await p.click(".bouton.continuer");
  await p.click(".bouton.continuer");
  await p.reload();
  await p.waitForSelector("section.etape");
  verifier(await p.$$eval("section.etape", (s) => s.filter((x) => !x.hidden).length) === 3, "la position est mémorisée après rechargement");
  verifier((await p.textContent(".reprise")).includes("arrêté"), "message « Tu t'étais arrêté »");
  await toutDevoiler(p);
  verifier(await p.$eval(".fin-lecon", (f) => !f.hidden), "la fin de leçon apparaît après la dernière section");

  // quiz : mauvaise puis bonne réponse
  const quiz = (await p.$$(".etape .quiz"))[0];
  const opts = await quiz.$$(".opt");
  await opts[0].click();
  verifier((await (await quiz.$(".verdict")).textContent()).includes("Pas encore"), "quiz : mauvaise réponse → nouvel essai proposé");
  await opts[1].click();
  verifier((await (await quiz.$(".verdict")).textContent()).includes("Bravo"), "quiz : bonne réponse reconnue");

  // predire : erreur de majuscule puis bonne réponse
  const pred = (await p.$$(".etape .predire"))[0];
  await (await pred.$("textarea")).fill("O");
  await (await pred.$(".bouton")).click();
  verifier((await (await pred.$(".predire-res")).textContent()).length > 0, "predire : retour affiché");
  await (await pred.$("textarea")).fill("0");
  await (await pred.$(".bouton")).click();
  verifier((await (await pred.$(".predire-res")).textContent()).includes("Exactement"), "predire : bonne réponse reconnue");

  // trous
  const trous = await p.$(".trous");
  const champs = await trous.$$("input.trou");
  await champs[0].fill("int");
  await champs[1].fill("\"prix\"");
  await (await trous.$(".bouton")).click();
  verifier((await (await trous.$(".verdict")).textContent()).includes("1 trou sur 2"), "trous : erreur détectée (guillemets)");
  await champs[1].fill("prix");
  await champs[1].press("Enter");
  verifier((await (await trous.$(".verdict")).textContent()).includes("Parfait"), "trous : réponse juste reconnue");

  // copier pour essayer
  await (await p.$(".code-copier")).click();
  const copie = await p.evaluate(() => navigator.clipboard.readText()).catch(() => "");
  verifier(copie.includes("public class Main") && copie.includes("int age = 20;"), "copier : programme complet avec le cadre Main");

  // exo : à revoir
  const exo = await p.$(".exo");
  await (await exo.$("details.correction summary")).click();
  await (await exo.$(".exo-bilan .fantome")).click();
  verifier((await (await exo.$(".exo-msg")).textContent()).includes("À revoir"), "exo : ajouté à « À revoir »");

  // décomposition + explique-moi simplement
  await p.click("details.simple summary");
  verifier(await p.$eval("details.simple", (d) => d.open), "« Explique-moi simplement » s'ouvre");

  // test final → leçon terminée automatiquement
  const zone = await p.$(".zone-test");
  for (const pr of await zone.$$(".predire")) await (await pr.$(".fantome")).click();
  for (const q of await zone.$$(".quiz")) for (const o of await q.$$(".opt")) { if (!(await o.isDisabled())) await o.click(); }
  verifier(await p.$eval(".valider .bouton", (b) => b.disabled), "leçon marquée terminée quand le petit test est fait");
  if (CAPTURES) await p.screenshot({ path: CAPTURES + "/lecon-complete.png", fullPage: true });
  verifier(p.erreurs.length === 0, "aucune erreur JavaScript (leçon) " + p.erreurs.join(" | "));

  console.log("Accueil après progression");
  await p.goto(RACINE + "index.html");
  verifier(!(await p.$eval("#a-revoir", (z) => z.hidden)), "la liste « À revoir » apparaît");
  verifier((await p.textContent("#progres-global")).includes("1 leçon terminée"), "progression globale mise à jour");

  console.log("Fiche de module, lexique, mobile");
  await p.goto(RACINE + "module.html?m=m02-variables");
  await p.waitForSelector(".fiche-lecon");
  verifier((await p.textContent("#fiche")).includes("boîte nommée"), "la fiche rassemble les « À retenir »");
  await p.goto(RACINE + "lexique.html");
  verifier(p.erreurs.length === 0, "aucune erreur JavaScript (fiche, lexique) " + p.erreurs.join(" | "));

  const mob = await nouvellePage(nav, 375);
  await mob.goto(RACINE + "lecon.html?l=m02-l01");
  await mob.waitForSelector("section.etape");
  await toutDevoiler(mob);
  const deborde = await mob.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  verifier(!deborde, "mobile 375 px : pas de défilement horizontal de la page");
  if (CAPTURES) await mob.screenshot({ path: CAPTURES + "/lecon-mobile.png", fullPage: true });

  console.log("Toutes les leçons à 375 px");
  const ids = await mob.evaluate(() => JR.toutesLecons().map((l) => l.id));
  const debordent = [];
  for (const id of ids) {
    await mob.goto(RACINE + "lecon.html?l=" + id);
    await mob.waitForSelector("section.etape");
    await toutDevoiler(mob);
    if (await mob.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)) debordent.push(id);
  }
  verifier(debordent.length === 0, "aucune des " + ids.length + " leçons ne déborde à 375 px " + debordent.join(" "));
  verifier(mob.erreurs.length === 0, "aucune erreur JavaScript sur les leçons " + mob.erreurs.join(" | "));

  await nav.close();
  console.log(echecs.length ? `\n✘ ${echecs.length} échec(s)` : "\n✔ Tous les tests passent");
  process.exit(echecs.length ? 1 : 0);
})();
