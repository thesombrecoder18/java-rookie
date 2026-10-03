/* =========================================================================
   Java Rookie — exercices interactifs : quiz, predire, trous, ordre, exo.
   Quand l'élève réussit (ou demande la réponse), le bloc émet l'événement
   « jr-resolu » (utilisé par la page leçon pour valider le petit test).
   ========================================================================= */
(function () {
  "use strict";

  var JR = window.JR, u = JR.u, el = u.el, esc = u.esc, RENDUS = JR.RENDUS;

  function resolu(w, reussi) {
    if (w.dataset.resolu) return;
    w.dataset.resolu = reussi ? "ok" : "vu";
    w.dispatchEvent(new CustomEvent("jr-resolu", { bubbles: true, detail: { reussi: reussi } }));
  }
  function entete(w, b, defaut) {
    var tete = el("div", "exo-tete");
    var badge = JR.badgeRappel(b);
    if (badge) tete.appendChild(badge);
    tete.appendChild(el("p", "q", b.question || defaut));
    w.appendChild(tete);
  }
  function verdict() {
    var v = el("div", "verdict");
    v.setAttribute("role", "status");
    return v;
  }
  /* compare en ignorant les espaces en fin de ligne et les lignes vides au bord */
  function normaliser(s) {
    return String(s).replace(/\r/g, "").split("\n").map(function (l) { return l.replace(/\s+$/, ""); })
      .join("\n").replace(/^\n+|\n+$/g, "");
  }
  function sansEspaces(s) { return String(s).replace(/\s+/g, ""); }
  function sansAccents(s) { return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }

  /* ---------- Quiz : un nouvel essai est toujours permis ---------- */
  RENDUS.quiz = function (b) {
    var w = el("div", "quiz");
    entete(w, b, "Question");
    if (b.code) w.appendChild(JR.blocCode(b.code));
    var opts = el("div", "options"), v = verdict(), fini = false;
    b.options.forEach(function (o) {
      var btn = u.bouton("opt", o.t, function () {
        if (fini || btn.disabled) return;
        if (o.ok) {
          fini = true;
          btn.classList.add("juste");
          opts.querySelectorAll(".opt").forEach(function (x) { x.disabled = true; });
          v.className = "verdict ok";
          v.innerHTML = "<strong>Bravo !</strong> " + (o.pourquoi || "");
          resolu(w, true);
        } else {
          btn.classList.add("faux");
          btn.disabled = true;
          v.className = "verdict non";
          v.innerHTML = "<strong>Pas encore.</strong> " + (o.pourquoi || "") + " Essaie une autre réponse.";
        }
      });
      opts.appendChild(btn);
    });
    w.appendChild(opts);
    w.appendChild(v);
    return w;
  };

  /* ---------- Prédire la sortie ---------- */
  function diagnostic(essai, attendu) {
    var a = normaliser(essai), r = normaliser(attendu);
    if (a.toLowerCase() === r.toLowerCase()) return "Presque ! Regarde les <strong>majuscules</strong>.";
    if (sansAccents(a) === sansAccents(r)) return "Presque ! Regarde les <strong>accents</strong> (é, è, à…) : Java affiche le texte exactement tel qu'il est écrit.";
    if (sansEspaces(a) === sansEspaces(r)) return "Presque ! Regarde les <strong>espaces</strong> : Java les affiche exactement comme dans le texte.";
    var la = a.split("\n"), lr = r.split("\n");
    if (la.length !== lr.length) {
      return "Pas tout à fait. Le programme affiche <strong>" + lr.length + " ligne" + (lr.length > 1 ? "s" : "") +
        "</strong>, ta réponse en a " + la.length + ". (Chaque <code>println</code> passe à la ligne.)";
    }
    for (var i = 0; i < lr.length; i++) {
      if (la[i] !== lr[i]) return "Pas tout à fait : la <strong>ligne " + (i + 1) + "</strong> n'est pas la bonne. Relis le code jusqu'à cette ligne.";
    }
    return "Pas tout à fait.";
  }
  RENDUS.predire = function (b) {
    var w = el("div", "predire");
    entete(w, b, "Que va afficher ce code ?");
    w.appendChild(JR.blocCode(b.code, { copie: JR.copiable(b) }));
    var id = u.idUnique("p");
    var lbl = el("label", "predire-lbl", "Ta réponse (exactement ce qui s'affiche) :");
    lbl.htmlFor = id;
    var zone = el("textarea", "predire-zone");
    zone.id = id; zone.spellcheck = false;
    zone.rows = Math.min(6, Math.max(1, String(b.reponse).split("\n").length));
    var res = el("div", "predire-res");
    res.setAttribute("role", "status");

    function montrer(succes) {
      res.innerHTML = "";
      res.appendChild(el("p", succes ? "verdict ok" : "verdict",
        succes ? "<strong>Exactement !</strong> Tu as lu le code comme l'ordinateur." : "<strong>La réponse :</strong>"));
      res.appendChild(JR.blocSortie(b.reponse));
      if (b.explication) res.appendChild(el("p", "explication", b.explication));
      resolu(w, succes);
    }
    function verifier() {
      if (!zone.value.trim()) { zone.focus(); return; }
      if (normaliser(zone.value) === normaliser(b.reponse)) { montrer(true); return; }
      res.innerHTML = "";
      res.appendChild(el("p", "verdict non", diagnostic(zone.value, b.reponse) + " Réessaie, ou regarde la réponse."));
    }
    zone.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); verifier(); }
    });
    var actions = el("div", "predire-actions");
    actions.appendChild(u.bouton("bouton petit", "Vérifier", verifier));
    actions.appendChild(u.bouton("bouton petit fantome", "Voir la réponse", function () { montrer(false); }));
    actions.appendChild(el("span", "raccourci", "Ctrl + Entrée pour vérifier"));
    [lbl, zone, actions, res].forEach(function (x) { w.appendChild(x); });
    return w;
  };

  /* ---------- Code à trous ---------- */
  function variantes(r) { return Array.isArray(r) ? r : [r]; }
  RENDUS.trous = function (b) {
    var w = el("div", "trous");
    entete(w, b, "Complète le code");
    var morceaux = b.code.split("___");
    var pre = el("pre", "trous-code java");
    var champs = [];
    morceaux.forEach(function (m, i) {
      pre.appendChild(el("span", null, JR.colorer(m)));
      if (i === morceaux.length - 1) return;
      var rep = variantes(b.reponses[i]);
      var inp = el("input", "trou");
      inp.type = "text"; inp.spellcheck = false; inp.autocomplete = "off";
      inp.setAttribute("autocapitalize", "off");
      inp.setAttribute("aria-label", "Trou " + (i + 1));
      inp.size = Math.max(3, rep.reduce(function (n, r) { return Math.max(n, r.length); }, 0) + 1);
      champs.push({ inp: inp, rep: rep });
      pre.appendChild(inp);
    });
    w.appendChild(el("figure", "code")).appendChild(pre);
    var v = verdict();
    function verifier() {
      var bons = 0;
      champs.forEach(function (c) {
        var ok = c.rep.some(function (r) { return sansEspaces(r) === sansEspaces(c.inp.value); });
        c.inp.classList.toggle("juste", ok);
        c.inp.classList.toggle("faux", !ok && c.inp.value.trim() !== "");
        if (ok) bons++;
      });
      if (bons === champs.length) {
        v.className = "verdict ok";
        v.innerHTML = "<strong>Parfait !</strong> " + (b.explication || "");
        resolu(w, true);
      } else {
        v.className = "verdict non";
        v.innerHTML = bons + " trou" + (bons > 1 ? "s" : "") + " sur " + champs.length + " correct" + (bons > 1 ? "s" : "") +
          ". Corrige les cases en rouge" + (b.indice ? " — indice : " + b.indice : "") + ".";
      }
    }
    var actions = el("div", "predire-actions");
    actions.appendChild(u.bouton("bouton petit", "Vérifier", verifier));
    actions.appendChild(u.bouton("bouton petit fantome", "Voir la solution", function () {
      champs.forEach(function (c) { c.inp.value = c.rep[0]; c.inp.classList.add("juste"); c.inp.classList.remove("faux"); });
      v.className = "verdict";
      v.innerHTML = "<strong>Solution affichée.</strong> " + (b.explication || "");
      resolu(w, false);
    }));
    champs.forEach(function (c) {
      c.inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); verifier(); } });
    });
    w.appendChild(actions);
    w.appendChild(v);
    return w;
  };

  /* ---------- Remettre les lignes dans l'ordre ---------- */
  function hachage(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
  function melanger(n, graine) {
    var ordre = [], i;
    for (i = 0; i < n; i++) ordre.push(i);
    for (i = n - 1; i > 0; i--) {
      graine = (graine * 1103515245 + 12345) & 0x7fffffff;
      var j = graine % (i + 1), t = ordre[i];
      ordre[i] = ordre[j]; ordre[j] = t;
    }
    if (ordre.every(function (x, k) { return x === k; })) ordre.reverse();
    return ordre;
  }
  RENDUS.ordre = function (b) {
    var w = el("div", "ordre");
    entete(w, b, "Remets les lignes dans le bon ordre");
    var ordre = melanger(b.lignes.length, hachage(b.lignes.join("\n")));
    var liste = el("ol", "ordre-liste");
    var v = verdict();
    function dessiner(focusIndex) {
      liste.innerHTML = "";
      ordre.forEach(function (k, pos) {
        var li = el("li", "ordre-ligne");
        li.appendChild(el("code", "java", JR.colorer(b.lignes[k]) || " "));
        var monter = u.bouton("ordre-btn", "↑", function () { echanger(pos, pos - 1); });
        var descendre = u.bouton("ordre-btn", "↓", function () { echanger(pos, pos + 1); });
        monter.setAttribute("aria-label", "Monter la ligne " + (pos + 1));
        descendre.setAttribute("aria-label", "Descendre la ligne " + (pos + 1));
        monter.disabled = pos === 0;
        descendre.disabled = pos === ordre.length - 1;
        var boutons = el("span", "ordre-boutons");
        boutons.appendChild(monter); boutons.appendChild(descendre);
        li.appendChild(boutons);
        liste.appendChild(li);
      });
      if (focusIndex != null) {
        var cible = liste.children[focusIndex].querySelector("button:not(:disabled)");
        if (cible) cible.focus();
      }
    }
    function echanger(a, c) {
      if (c < 0 || c >= ordre.length) return;
      var t = ordre[a]; ordre[a] = ordre[c]; ordre[c] = t;
      v.textContent = ""; v.className = "verdict";
      dessiner(c);
    }
    function verifier() {
      var bien = 0;
      Array.prototype.forEach.call(liste.children, function (li, pos) {
        var ok = ordre[pos] === pos;
        li.classList.toggle("juste", ok);
        li.classList.toggle("faux", !ok);
        if (ok) bien++;
      });
      if (bien === ordre.length) {
        v.className = "verdict ok";
        v.innerHTML = "<strong>C'est le bon ordre !</strong> " + (b.explication || "");
        resolu(w, true);
      } else {
        v.className = "verdict non";
        v.innerHTML = bien + " ligne" + (bien > 1 ? "s" : "") + " sur " + ordre.length + " à la bonne place (en vert). Déplace les autres.";
      }
    }
    dessiner();
    w.appendChild(liste);
    var actions = el("div", "predire-actions");
    actions.appendChild(u.bouton("bouton petit", "Vérifier", verifier));
    actions.appendChild(u.bouton("bouton petit fantome", "Voir la solution", function () {
      ordre = b.lignes.map(function (_, k) { return k; });
      dessiner(); verifier();
      resolu(w, false);
    }));
    w.appendChild(actions);
    w.appendChild(v);
    return w;
  };

  /* ---------- Mini-exercice : essayer avant de voir ---------- */
  var NIVEAUX = {
    comprendre: "Comprendre", reproduire: "Reproduire", modifier: "Modifier", predire: "Prédire",
    corriger: "Corriger", creer: "Créer", combiner: "Combiner"
  };
  var compteurExo = 0;
  RENDUS.exo = function (b) {
    var w = el("div", "exo");
    var cle = (JR.leconCourante || "?") + "#exo" + (++compteurExo);
    w.appendChild(el("span", "num niv-" + (b.niveau || "comprendre"), "Mini-exercice · " + (NIVEAUX[b.niveau] || "Pratique")));
    w.appendChild(el("p", null, b.enonce));
    if (b.code) w.appendChild(JR.blocCode(b.code, { copie: JR.copiable(b) }));
    if (b.indice) {
      var di = el("details", "indice");
      di.appendChild(el("summary", null, "Un indice ?"));
      di.appendChild(el("p", null, b.indice));
      w.appendChild(di);
    }
    var id = u.idUnique("e");
    var lbl = el("label", "predire-lbl", "Ton essai (écris d'abord ta version, puis compare) :");
    lbl.htmlFor = id;
    var essai = el("textarea", "predire-zone essai");
    essai.id = id; essai.rows = 3; essai.spellcheck = false;
    var bCopie = u.bouton("bouton petit fantome", "Copier mon essai pour le tester", function () {
      u.copier(JR.programmeComplet(essai.value, b.run, b.contexte), bCopie);
    });
    w.appendChild(lbl); w.appendChild(essai);
    var a = el("div", "predire-actions"); a.appendChild(bCopie); w.appendChild(a);

    var d = el("details", "correction");
    d.appendChild(el("summary", null, "Voir la correction"));
    var c = el("div", "corrige");
    if (b.corrige.html) c.appendChild(el("div", null, b.corrige.html));
    if (b.corrige.code) c.appendChild(JR.blocCode(b.corrige.code, { cls: "juste", copie: JR.copiable(b) }));
    if (b.corrige.sortie != null) c.appendChild(JR.blocSortie(b.corrige.sortie));
    var bilan = el("div", "exo-bilan");
    var dejaRevoir = !!JR.ARevoir.tout()[cle];
    bilan.appendChild(el("span", null, "Et toi ?"));
    var bOk = u.bouton("bouton petit", "J'ai réussi", function () { JR.ARevoir.retirer(cle); marquer("Bravo ! On continue."); });
    var bRevoir = u.bouton("bouton petit fantome", "À revoir plus tard", function () {
      JR.ARevoir.marquer(cle, { lecon: JR.leconCourante, enonce: String(b.enonce).replace(/<[^>]+>/g, "").slice(0, 90) });
      marquer("Noté : tu le retrouveras dans « À revoir » sur la page du parcours.");
    });
    var msg = el("span", "exo-msg", dejaRevoir ? "Cet exercice est dans ta liste « À revoir »." : "");
    msg.setAttribute("role", "status");
    function marquer(t) { msg.textContent = t; }
    bilan.appendChild(bOk); bilan.appendChild(bRevoir); bilan.appendChild(msg);
    c.appendChild(bilan);
    d.appendChild(c);
    d.addEventListener("toggle", function () { if (d.open) resolu(w, false); });
    w.appendChild(d);
    return w;
  };
})();
