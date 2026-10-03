#!/usr/bin/env node
/* Mesure de la charge de chaque leçon (contrôle anti-fatigue).
   Compte, sur le CHEMIN PRINCIPAL (hors dépliables et « Explique-moi simplement ») :
   mots lus, blocs, interactions du corps, questions du test, blocs erreur.
   Cibles (docs/brief-corrections.md) : ~300 mots, 2-3 interactions, test = 2, ≤ 1 erreur.
   Usage : node tools/mesure.mjs [filtre-id] */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const RACINE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const filtre = process.argv[2] || "";
const ctx = vm.createContext({ JR: {} });
ctx.JR.parcours = (d) => { ctx.modules = d.modules; };
ctx.JR.lecon = (d) => { ctx.derniere = d; };
vm.runInContext(fs.readFileSync(path.join(RACINE, "courses/manifest.js"), "utf8"), ctx);

const INTERACTIONS = new Set(["quiz", "predire", "trous", "ordre", "exo", "trace"]);
const mots = (h) => (h ? String(h).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length : 0);

/* texte réellement lu dans un bloc du chemin principal */
function motsBloc(b) {
  switch (b.type) {
    case "texte": case "pourquoi": case "cle": case "attention": case "cours": return mots(b.html);
    case "ecart": return mots(b.dit) + mots(b.vrai);
    case "illus": case "boites": return mots(b.legende);
    case "erreur": return mots(b.explication);
    case "compare": return mots(b.gauche.titre) + mots(b.gauche.html) + mots(b.droite.titre) + mots(b.droite.html) + mots(b.conclusion);
    case "quiz": return mots(b.question) + (b.options || []).reduce((s, o) => s + mots(o.t), 0) + mots((b.options.find((o) => o.ok) || {}).pourquoi);
    case "predire": return mots(b.question) + mots(b.explication);
    case "trous": case "ordre": return mots(b.question) + mots(b.explication);
    case "exo": return mots(b.enonce);
    case "trace": return (b.etapes || []).reduce((s, e) => s + mots(e.note), 0);
    case "versions": return (b.etapes || []).reduce((s, e) => s + mots(e.ajout), 0);
    default: return 0;
  }
}

const lignes = [];
let totalMin = 0, totalMots = 0;
for (const m of ctx.modules) {
  for (const l of m.lecons) {
    if (filtre && !l.id.startsWith(filtre)) continue;
    const f = path.join(RACINE, "courses", m.id, l.id + ".js");
    if (!fs.existsSync(f)) continue;
    ctx.derniere = null;
    vm.runInContext(fs.readFileSync(f, "utf8"), ctx);
    const d = ctx.derniere;
    let nbMots = mots(d.objectif) + (d.retenir || []).reduce((s, r) => s + mots(r), 0);
    let blocs = 0, inter = 0, erreurs = 0, depl = 0;
    for (const s of d.sections) {
      for (const b of s.blocs) {
        if (b.type === "depliable" || b.type === "simple") { depl++; continue; }
        blocs++;
        nbMots += motsBloc(b);
        if (INTERACTIONS.has(b.type)) inter++;
        if (b.type === "erreur") erreurs++;
      }
    }
    for (const t of d.test || []) nbMots += motsBloc(t);
    const nt = (d.test || []).length;
    const alertes = [];
    if (nbMots > 380) alertes.push("mots");
    if (inter > 3) alertes.push("interactions");
    if (nt > 2) alertes.push("test");
    if (erreurs > 1 && !l.id.startsWith("m01-l03")) alertes.push("erreurs");
    totalMin += d.duree || l.duree || 6;
    totalMots += nbMots;
    lignes.push([l.id, d.duree || l.duree, d.sections.length, blocs, depl, nbMots, inter, nt, erreurs, alertes.join(" ") || "OK"]);
  }
}
const tete = ["leçon", "min", "§", "blocs", "dépl.", "mots", "inter.", "test", "erreurs", "alertes"];
const largeur = tete.map((t, i) => Math.max(t.length, ...lignes.map((l) => String(l[i]).length)));
const fmt = (l) => l.map((c, i) => String(c).padEnd(largeur[i])).join("  ");
console.log(fmt(tete));
lignes.forEach((l) => console.log(fmt(l)));
console.log(`\n${lignes.length} leçons · durée annoncée ${totalMin} min (${Math.floor(totalMin / 60)} h ${totalMin % 60}) · ${totalMots} mots sur le chemin principal (~${Math.round(totalMots / lignes.length)} par leçon)`);
console.log("Cibles : ~300 mots · ≤ 3 interactions · test = 2 · ≤ 1 erreur (sauf m01-l03).");
