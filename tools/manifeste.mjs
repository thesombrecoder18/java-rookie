#!/usr/bin/env node
/* Génère courses/manifest.js à partir de docs/carte-pedagogique.md.
   Modules : « ### mXX-id — Titre » ; objectifs : puces après « À la fin de ce module » ;
   leçons : « #### mXX-lYY · Titre » (durée facultative : « (7 min) » en fin de titre).
   La durée d'une leçon déjà écrite vient de son fichier (champ duree).
   Les résumés courts de modules viennent de RESUMES ci-dessous (une ligne, ton de l'accueil).
   Usage : node tools/manifeste.mjs */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const carte = fs.readFileSync(path.join(RACINE, "docs/carte-pedagogique.md"), "utf8").split("\n");
const RESUMES = JSON.parse(fs.readFileSync(path.join(RACINE, "tools/resumes.json"), "utf8"));

const propre = (s) => s.replace(/`/g, "").replace(/\*\*/g, "").trim();
const modules = [];
let mod = null, dansObjectifs = false;

for (const ligne of carte) {
  const m = /^### (m\d\d-[\w-]+) — (.+)$/.exec(ligne);
  if (m) {
    mod = { id: m[1], titre: propre(m[2]).replace(/^\(Optionnel\)\s*/i, ""), optionnel: /optionnel/i.test(m[2]),
      resume: RESUMES[m[1]] || "", objectifs: [], lecons: [] };
    modules.push(mod);
    dansObjectifs = false;
    continue;
  }
  if (!mod) continue;
  if (/^## /.test(ligne)) { mod = null; continue; }
  if (/À la fin de ce module/.test(ligne)) { dansObjectifs = true; continue; }
  if (dansObjectifs) {
    const p = /^- (.+?)\s*[;.]?$/.exec(ligne);
    if (p) { mod.objectifs.push(propre(p[1])); continue; }
    if (ligne.trim() && !/^- /.test(ligne)) dansObjectifs = false;
  }
  const l = /^#### (m\d\d-l\d\d) · (.+)$/.exec(ligne);
  if (l) {
    const d = /\((\d+) min\)\s*$/.exec(l[2]);
    mod.lecons.push({ id: l[1], titre: propre(l[2].replace(/\(\d+ min\)\s*$/, "")), duree: d ? +d[1] : 6 });
  }
}

/* La durée écrite dans le fichier de leçon (champ duree) prime sur celle de la carte. */
const ctx = vm.createContext({ JR: { lecon: (d) => { ctx.d = d; } } });
for (const m of modules) for (const l of m.lecons) {
  const f = path.join(RACINE, "courses", m.id, l.id + ".js");
  if (!fs.existsSync(f)) continue;
  ctx.d = null;
  try { vm.runInContext(fs.readFileSync(f, "utf8"), ctx); } catch (e) { console.warn(l.id, ":", e.message); }
  if (ctx.d && ctx.d.duree) l.duree = ctx.d.duree;
}

const manquants = modules.filter((m) => !m.resume).map((m) => m.id);
if (manquants.length) console.warn("Résumé manquant pour :", manquants.join(", "));
const total = modules.reduce((s, m) => s + m.lecons.length, 0);
const sortie = "/* Généré par tools/manifeste.mjs à partir de docs/carte-pedagogique.md — ne pas modifier à la main. */\n" +
  "JR.parcours(" + JSON.stringify({ modules }, null, 2) + ");\n";
fs.writeFileSync(path.join(RACINE, "courses/manifest.js"), sortie);
console.log(`${modules.length} modules, ${total} leçons → courses/manifest.js`);
