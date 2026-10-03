#!/usr/bin/env node
/* Vérificateur du contenu Java Rookie.
   1. Charge courses/manifest.js et toutes les leçons (sans navigateur).
   2. Contrôle la structure (règles anti-fatigue de docs/format-lecon.md).
   3. Compile chaque extrait Java avec javac, l'exécute, compare la sortie annoncée.
   Usage : node tools/verifier.mjs [filtre-id] [--erreurs]   (ex. node tools/verifier.mjs m02 --erreurs)
   --erreurs : affiche le vrai message de javac/java pour chaque bloc « erreur », à comparer avec le message annoncé.
*/
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import vm from "node:vm";
import { spawn } from "node:child_process";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const ARGS = process.argv.slice(2);
const MONTRER_ERREURS = ARGS.includes("--erreurs");
const filtre = ARGS.find((a) => !a.startsWith("--")) || "";
const rapportErreurs = [];
const premiereErreur = (err) => (err.split("\n").find((l) => /error:/.test(l)) || "").replace(/^.*?error:\s*/, "");
const TEMP = fs.mkdtempSync(path.join(os.tmpdir(), "jr-verif-"));
const PARALLELE = Math.max(2, Math.min(8, os.cpus().length));

const problemes = [];
const avertissements = [];
const signaler = (id, msg) => problemes.push(`${id} : ${msg}`);
const avertir = (id, msg) => avertissements.push(`${id} : ${msg}`);

/* ---------- Chargement ---------- */
function charger(fichier, ctx) {
  vm.runInContext(fs.readFileSync(fichier, "utf8"), ctx, { filename: fichier });
}
const ctx = vm.createContext({ JR: {}, window: {} });
ctx.JR.parcours = (d) => { ctx.modules = d.modules; };
ctx.JR.lecon = (d) => { ctx.derniere = d; };
ctx.JR.lexique = (t) => { ctx.termes = t; };
charger(path.join(RACINE, "courses/manifest.js"), ctx);

const lecons = [];
const idsManifest = new Set();
for (const m of ctx.modules) {
  for (const l of m.lecons) {
    idsManifest.add(l.id);
    if (filtre && !l.id.startsWith(filtre) && !m.id.startsWith(filtre)) continue;
    const f = path.join(RACINE, "courses", m.id, l.id + ".js");
    if (!l.id.startsWith(m.id.slice(0, 3) + "-")) signaler(l.id, `l'id ne commence pas par ${m.id.slice(0, 3)}-`);
    if (!fs.existsSync(f)) { avertir(l.id, "fichier absent (leçon pas encore écrite)"); continue; }
    ctx.derniere = null;
    try { charger(f, ctx); } catch (e) { signaler(l.id, "erreur JavaScript : " + e.message); continue; }
    if (!ctx.derniere) { signaler(l.id, "le fichier n'appelle pas JR.lecon(...)"); continue; }
    if (ctx.derniere.id !== l.id) signaler(l.id, `id interne « ${ctx.derniere.id} » ≠ manifeste`);
    if (ctx.derniere.titre !== l.titre) avertir(l.id, `titre différent du manifeste (« ${ctx.derniere.titre} »)`);
    lecons.push({ module: m, data: ctx.derniere });
  }
}
if (fs.existsSync(path.join(RACINE, "courses/lexique.js"))) {
  charger(path.join(RACINE, "courses/lexique.js"), ctx);
  for (const t of ctx.termes || []) if (t.lecon && !idsManifest.has(t.lecon)) signaler("lexique", `« ${t.terme} » pointe vers ${t.lecon} (inexistante)`);
}

/* ---------- Structure ---------- */
const TYPES = new Set(["texte", "pourquoi", "illus", "boites", "code", "simple", "erreur", "compare", "attention", "ecart",
  "cours", "quiz", "predire", "exo", "trace", "versions", "cle", "trous", "ordre", "depliable", "cadre"]);
const INTERACTIFS = new Set(["quiz", "predire", "exo", "trace", "trous", "ordre"]);
const ORDRE_LECONS = [...idsManifest];
const rangLecon = (id) => ORDRE_LECONS.indexOf(id);
/* aplatit les blocs contenus dans les dépliables */
const aplatir = (blocs) => (blocs || []).flatMap((b) => (b.type === "depliable" ? [b, ...aplatir(b.blocs)] : [b]));

function verifierStructure({ data }) {
  const id = data.id;
  if (!data.objectif) avertir(id, "pas d'objectif");
  const n = data.sections?.length || 0;
  if (n < 2 || n > 6) avertir(id, `${n} sections (viser 3 à 6)`);
  if (!data.retenir?.length) signaler(id, "pas de « À retenir »");
  else if (data.retenir.length > 3) signaler(id, `${data.retenir.length} points « À retenir » (max 3)`);
  const nt = data.test?.length || 0;
  if (nt < 2 || nt > 5) signaler(id, `test de ${nt} question(s) (2 à 5)`);
  for (const t of data.test || []) if (!["quiz", "predire", "trous", "ordre"].includes(t.type)) signaler(id, `bloc ${t.type} dans le test (quiz/predire/trous/ordre seulement)`);
  for (const b of [...(data.sections || []).flatMap((x) => aplatir(x.blocs)), ...(data.test || [])]) {
    if (!b.rappel) continue;
    if (!idsManifest.has(b.rappel)) signaler(id, `rappel vers ${b.rappel} : leçon inexistante`);
    else if (rangLecon(b.rappel) >= rangLecon(id)) signaler(id, `rappel vers ${b.rappel} : ce n'est pas une leçon PRÉCÉDENTE`);
  }

  let interactif = false, illustre = false, nbCode = 0, total = 0;
  for (const s of data.sections || []) {
    let suiteTexte = 0;
    if (!s.titre) signaler(id, "section sans titre");
    for (const b of aplatir(s.blocs)) {
      total++;
      if (!TYPES.has(b.type)) signaler(id, `type de bloc inconnu « ${b.type} »`);
      suiteTexte = b.type === "texte" ? suiteTexte + 1 : 0;
      if (suiteTexte > 2) avertir(id, `plus de 2 blocs texte d'affilée (section « ${s.titre} »)`);
      if (b.type === "texte" && b.html && b.html.replace(/<[^>]+>/g, "").length > 420) avertir(id, `bloc texte long (${b.html.length} car.) dans « ${s.titre} »`);
      if (INTERACTIFS.has(b.type)) interactif = true;
      if (["illus", "boites", "trace", "compare"].includes(b.type)) illustre = true;
      if (["code", "versions"].includes(b.type)) nbCode++;
      if (b.type === "quiz") verifierQuiz(id, b);
      if (b.type === "trous") {
        const n = b.code.split("___").length - 1;
        if (n !== (b.reponses || []).length) signaler(id, `trous : ${n} trou(s) pour ${(b.reponses || []).length} réponse(s)`);
      }
      if (b.type === "ordre" && (!b.lignes || b.lignes.length < 3 || b.lignes.length > 8)) signaler(id, "ordre : il faut 3 à 8 lignes");
      if (b.type === "cadre" && !Array.isArray(b.connus)) signaler(id, "cadre : champ connus manquant");
      if (b.type === "code" && b.lignes && b.lignes.length !== b.code.split("\n").length)
        signaler(id, `décomposition : ${b.lignes.length} explications pour ${b.code.split("\n").length} lignes`);
    }
    if ((s.blocs || []).length > 12) avertir(id, `section « ${s.titre} » très chargée (${s.blocs.length} blocs)`);
  }
  for (const t of data.test || []) if (t.type === "quiz") verifierQuiz(id, t);
  if (!interactif) signaler(id, "aucune interaction avant la fin (quiz/predire/exo/trace)");
  if (!illustre) avertir(id, "aucune illustration (illus/boites/trace/compare)");
  if (nbCode < 2) avertir(id, `seulement ${nbCode} exemple(s) de code`);
  if (total > 40) avertir(id, `${total} blocs : leçon peut-être trop longue, envisager de la couper`);
}
function verifierQuiz(id, b) {
  const ok = (b.options || []).filter((o) => o.ok).length;
  if (ok !== 1) signaler(id, `quiz « ${(b.question || "").slice(0, 40)} » : ${ok} bonne(s) réponse(s) (il en faut 1)`);
  for (const o of b.options || []) if (!o.pourquoi) avertir(id, `option sans « pourquoi » : ${o.t}`);
}

/* ---------- Extraction des extraits Java ---------- */
function extraits({ data }) {
  const liste = [];
  const ajouter = (b, code, defaut, attendu, ou) => {
    const run = b.run || defaut;
    if (run === "aucun" || !code) return;
    liste.push({ id: data.id, ou, run, code, contexte: b.contexte || "", entree: b.entree ?? "", attendu,
      sansImports: !!b.sansImports, message: b.type === "erreur" && ou.indexOf("correction") < 0 ? b.message : undefined });
  };
  const parcourir = (blocs, zone) => aplatir(blocs).forEach((b, k) => {
    const ou = `${zone} #${k + 1} (${b.type})`;
    switch (b.type) {
      case "code": ajouter(b, b.code, "main", b.sortie, ou); break;
      case "predire": ajouter(b, b.code, "main", b.reponse, ou); break;
      case "quiz": if (b.code) ajouter(b, b.code, "main", undefined, ou); break;
      case "erreur":
        ajouter(b, b.code, "erreur", undefined, ou);
        if (b.correction) ajouter({ ...b, run: b.runCorrection || corrigeMode(b.run) }, b.correction, "main", undefined, ou + " correction");
        break;
      case "exo": if (b.corrige?.code) ajouter(b, b.corrige.code, "main", b.corrige.sortie, ou + " corrigé"); break;
      case "trous": ajouter(b, b.code.split("___").map((m, j, t) => m + (j < t.length - 1 ? [].concat(b.reponses[j])[0] : "")).join(""), "main", b.sortie, ou); break;
      case "ordre": ajouter(b, b.lignes.join("\n"), "main", b.sortie, ou); break;
      case "versions": b.etapes.forEach((v, j) => ajouter(b, v.code, "main", v.sortie, `${ou} v${j + 1}`)); break;
      case "compare": [b.gauche, b.droite].forEach((c, j) => c.code && ajouter({ ...b, run: c.run || b.run, contexte: c.contexte ?? b.contexte }, c.code, "main", undefined, `${ou} ${j ? "droite" : "gauche"}`)); break;
    }
  });
  (data.sections || []).forEach((s, i) => parcourir(s.blocs || [], `section ${i + 1}`));
  parcourir(data.test || [], "test");
  return liste;
}
function corrigeMode(run) {
  if (!run || run === "erreur" || run === "erreur-execution") return "main";
  return run.replace(/^erreur-/, "").replace("execution", "main");
}

const IMPORTS = "import java.util.*;\nimport java.time.*;\nimport java.time.format.*;\n";
/* Modes : main | classe | fichier | erreur (= erreur-main) | erreur-classe | erreur-fichier | erreur-execution
   Les imports java.util/java.time sont ajoutés sauf en mode fichier ou si sansImports: true.
   « throws Exception » n'est ajouté à main que pour les extraits censés compiler. */
function preparer(x) {
  const mode = x.run;
  const brut = (x.contexte ? x.contexte + "\n" : "") + x.code;
  const refusCompil = mode === "erreur" || mode === "erreur-main" || mode === "erreur-classe" || mode === "erreur-fichier";
  const execErreur = mode === "erreur-execution";
  const base = execErreur || mode === "erreur" ? "main" : mode.replace(/^erreur-/, "");
  const imports = x.sansImports ? "" : IMPORTS;
  let source, classe = "Main", fichier = "Main.java";
  if (base === "main") {
    source = imports + "public class Main {\n    public static void main(String[] args)" +
      (refusCompil ? "" : " throws Exception") + " {\n" + brut + "\n    }\n}\n";
  } else if (base === "classe") {
    source = imports + "public class Main {\n" + brut + "\n}\n";
    if (!/static\s+void\s+main\s*\(/.test(brut)) classe = null;
  } else if (base === "fichier") {
    source = brut;
    const pub = /public\s+(?:final\s+|abstract\s+)*(?:class|interface|enum|record)\s+(\w+)/.exec(brut);
    fichier = (pub ? pub[1] : "Main") + ".java";
    const avecMain = [...brut.matchAll(/(?:class|enum|record)\s+(\w+)[^{]*\{/g)].find((m) => {
      const suite = brut.slice(m.index);
      return /static\s+void\s+main\s*\(/.test(suite.slice(0, suiteFin(suite)));
    });
    classe = avecMain ? avecMain[1] : null;
  } else {
    return { erreurConfig: `mode run inconnu « ${mode} »` };
  }
  return { source, classe, fichier, estErreur: refusCompil || execErreur, execErreur };
}
function suiteFin(s) { // fin approximative du corps de la classe : accolades équilibrées
  let d = 0;
  for (let i = s.indexOf("{"); i < s.length; i++) {
    if (s[i] === "{") d++;
    else if (s[i] === "}" && --d === 0) return i;
  }
  return s.length;
}

function lancer(cmd, args, opts = {}) {
  return new Promise((res) => {
    const p = spawn(cmd, args, { cwd: opts.cwd });
    let out = "", err = "";
    const minuteur = setTimeout(() => { p.kill("SIGKILL"); err += "\n[délai dépassé]"; }, opts.delai || 20000);
    p.stdout.on("data", (d) => (out += d));
    p.stderr.on("data", (d) => (err += d));
    p.on("close", (code) => { clearTimeout(minuteur); res({ code, out, err }); });
    if (opts.entree != null) p.stdin.end(opts.entree); else p.stdin.end();
  });
}
const norm = (s) => String(s).replace(/\r/g, "").split("\n").map((l) => l.replace(/\s+$/, "")).join("\n").replace(/^\n+|\n+$/g, "");

let compteur = 0;
async function verifierExtrait(x) {
  const p = preparer(x);
  const nom = `${x.id} ${x.ou}`;
  if (p.erreurConfig) return signaler(nom, p.erreurConfig);
  const dir = path.join(TEMP, String(++compteur));
  fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, p.fichier), p.source);
  const c = await lancer("javac", ["--release", "21", "-encoding", "UTF-8", "-Xlint:none", "-nowarn", p.fichier], { cwd: dir });
  if (p.estErreur && !p.execErreur) {
    if (c.code === 0) signaler(nom, "devait être REFUSÉ par javac, mais compile :\n" + x.code);
    else if (MONTRER_ERREURS) rapportErreurs.push(`${nom}\n  annoncé : ${x.message}\n  javac   : ${premiereErreur(c.err)}`);
    return;
  }
  if (c.code !== 0) return signaler(nom, "ne compile pas :\n" + x.code + "\n--- javac ---\n" + c.err.split("\n").slice(0, 6).join("\n"));
  if (!p.classe) return;
  const r = await lancer("java", ["-Dfile.encoding=UTF-8", "-Dstdout.encoding=UTF-8", "-Duser.language=fr", "-Duser.country=FR", p.classe], { cwd: dir, entree: x.entree });
  if (p.execErreur) {
    if (r.code === 0) signaler(nom, "devait lever une exception à l'exécution, mais s'exécute normalement");
    else if (MONTRER_ERREURS) rapportErreurs.push(`${nom}\n  annoncé : ${x.message}\n  java    : ${r.err.split("\n").find((l) => /Exception|Error/.test(l)) || r.err.split("\n")[0]}`);
    return;
  }
  if (r.code !== 0) return signaler(nom, "plante à l'exécution :\n" + x.code + "\n--- java ---\n" + r.err.split("\n").slice(0, 4).join("\n"));
  if (x.attendu != null && norm(r.out) !== norm(x.attendu))
    signaler(nom, `sortie annoncée ≠ sortie réelle${x.entree ? " (avec entrée clavier)" : ""}\n  annoncée : ${JSON.stringify(norm(x.attendu))}\n  réelle   : ${JSON.stringify(norm(r.out))}`);
}

/* ---------- Programme ---------- */
lecons.forEach(verifierStructure);
const tous = lecons.flatMap(extraits);
let i = 0;
async function ouvrier() { while (i < tous.length) await verifierExtrait(tous[i++]); }
await Promise.all(Array.from({ length: PARALLELE }, ouvrier));
fs.rmSync(TEMP, { recursive: true, force: true });

console.log(`Leçons vérifiées : ${lecons.length} · extraits Java compilés : ${tous.length}`);
if (rapportErreurs.length) console.log(`\nMessages d'erreur réels (à comparer avec les messages annoncés) :\n` + rapportErreurs.map((a) => "  - " + a).join("\n"));
if (avertissements.length) console.log(`\n⚠ ${avertissements.length} avertissement(s) :\n` + avertissements.map((a) => "  - " + a).join("\n"));
if (problemes.length) {
  console.log(`\n✘ ${problemes.length} problème(s) :\n` + problemes.map((a) => "  - " + a).join("\n\n"));
  process.exit(1);
}
console.log("\n✔ Aucun problème bloquant.");
