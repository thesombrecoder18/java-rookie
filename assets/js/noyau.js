/* =========================================================================
   Java Rookie — noyau : utilitaires, stockage, progression, coloration Java,
   enveloppe « programme complet » (copier pour essayer).
   Chargé en premier. Expose window.JR et JR.u (utilitaires internes).
   ========================================================================= */
(function () {
  "use strict";

  var JR = (window.JR = window.JR || {});
  var u = (JR.u = {});

  /* ---------- DOM et texte ---------- */
  u.esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  u.el = function (tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  u.bouton = function (cls, texte, action) {
    var b = u.el("button", cls, texte);
    b.type = "button";
    if (action) b.addEventListener("click", action);
    return b;
  };
  u.param = function (nom) {
    var m = new RegExp("[?&]" + nom + "=([^&#]*)").exec(location.search);
    return m ? decodeURIComponent(m[1]) : null;
  };
  u.idUnique = function (prefixe) { return prefixe + Math.random().toString(36).slice(2, 8); };

  /* ---------- Stockage (toujours protégé : navigation privée, stockage bloqué…) ---------- */
  u.lire = function (cle, defaut) {
    try { var v = localStorage.getItem(cle); return v ? JSON.parse(v) : defaut; } catch (e) { return defaut; }
  };
  u.ecrire = function (cle, val) {
    try { localStorage.setItem(cle, JSON.stringify(val)); } catch (e) { /* stockage indisponible : le site marche sans */ }
  };

  /* ---------- Progression ---------- */
  var CLE_PROGRES = "jr.progres.v1";
  var CLE_ETAPES = "jr.etapes.v1";
  var CLE_REVOIR = "jr.revoir.v1";
  JR.Progres = {
    tout: function () { return u.lire(CLE_PROGRES, {}); },
    estFinie: function (id) { return !!this.tout()[id]; },
    finir: function (id) { var p = this.tout(); if (!p[id]) { p[id] = Date.now(); u.ecrire(CLE_PROGRES, p); } },
    annuler: function (id) { var p = this.tout(); delete p[id]; u.ecrire(CLE_PROGRES, p); },
    etape: function (id) { return u.lire(CLE_ETAPES, {})[id] || 1; },
    memoriserEtape: function (id, n) { var e = u.lire(CLE_ETAPES, {}); e[id] = n; u.ecrire(CLE_ETAPES, e); }
  };
  JR.ARevoir = {
    tout: function () { return u.lire(CLE_REVOIR, {}); },
    marquer: function (cle, info) { var r = this.tout(); r[cle] = info; u.ecrire(CLE_REVOIR, r); },
    retirer: function (cle) { var r = this.tout(); delete r[cle]; u.ecrire(CLE_REVOIR, r); }
  };

  /* ---------- Parcours (manifeste) ---------- */
  JR.parcours = function (data) { JR.modules = data.modules; };
  JR.toutesLecons = function () {
    var liste = [];
    (JR.modules || []).forEach(function (m, im) {
      m.lecons.forEach(function (l, il) {
        liste.push({ id: l.id, titre: l.titre, duree: l.duree, module: m, im: im, il: il });
      });
    });
    return liste;
  };
  JR.trouverLecon = function (id) {
    var liste = JR.toutesLecons();
    for (var i = 0; i < liste.length; i++) {
      if (liste[i].id === id) return { info: liste[i], prec: liste[i - 1] || null, suiv: liste[i + 1] || null };
    }
    return null;
  };
  JR.lienLecon = function (id, etape) {
    return "lecon.html?l=" + encodeURIComponent(id) + (etape > 1 ? "#etape-" + etape : "");
  };
  JR.numModule = function (im) { return (im < 9 ? "0" : "") + (im + 1); };

  /* ---------- Coloration Java ---------- */
  var MOTS_CLES = ("abstract boolean break byte case catch char class continue default do double else enum extends " +
    "final finally float for if implements import instanceof int interface long new package private protected " +
    "public return short static super switch this throw throws try void while true false null").split(" ");
  var ESTCLE = {};
  MOTS_CLES.forEach(function (k) { ESTCLE[k] = true; });
  var JETON = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*")|('(?:\\.|[^'\\\n])*')|(\b\d[\d_]*(?:\.\d+)?[fFdDlL]?\b)|([A-Za-z_$][\w$]*)/g;

  JR.colorer = function (code) {
    var out = "", dernier = 0, m;
    JETON.lastIndex = 0;
    while ((m = JETON.exec(code))) {
      out += u.esc(code.slice(dernier, m.index));
      var t = m[0], cls = null;
      if (m[1]) cls = "cm";
      else if (m[2] || m[3]) cls = "st";
      else if (m[4]) cls = "num";
      else if (ESTCLE[t]) cls = "kw";
      else if (/^\s*\(/.test(code.slice(JETON.lastIndex))) cls = "fn";
      else if (/^[A-Z]/.test(t)) cls = "ty";
      out += cls ? '<span class="' + cls + '">' + u.esc(t) + "</span>" : u.esc(t);
      dernier = JETON.lastIndex;
    }
    return out + u.esc(code.slice(dernier));
  };

  /* ---------- Programme complet (même habillage que tools/verifier.mjs) ---------- */
  var IMPORTS_AUTO = [
    [/\b(Scanner|ArrayList|List|Arrays|Random|HashMap|Map|InputMismatchException|NoSuchElementException)\b/, "import java.util.*;"],
    [/\b(LocalDate|LocalDateTime|LocalTime|Period|Duration|DayOfWeek|Month)\b/, "import java.time.*;"],
    [/\bDateTimeFormatter\b/, "import java.time.format.*;"]
  ];
  function indenter(code, n) {
    var pad = new Array(n + 1).join(" ");
    return code.split("\n").map(function (l) { return l ? pad + l : l; }).join("\n");
  }
  /* Renvoie le programme que l'étudiant peut coller tel quel dans un fichier Main.java. */
  JR.programmeComplet = function (code, run, contexte) {
    var mode = (run || "main").replace(/^erreur-?/, "") || "main";
    if (mode === "execution") mode = "main";
    var corps = (contexte ? contexte + "\n" : "") + code;
    if (mode === "fichier" || mode === "aucun") return corps;
    var imports = IMPORTS_AUTO.filter(function (i) { return i[0].test(corps); })
      .map(function (i) { return i[1]; }).join("\n");
    var debut = imports ? imports + "\n\n" : "";
    if (mode === "classe") return debut + "public class Main {\n\n" + indenter(corps, 4) + "\n}\n";
    var lance = /\bthrows?\b|Thread\.sleep|DriverManager/.test(corps) ? " throws Exception" : "";
    return debut + "public class Main {\n    public static void main(String[] args)" + lance + " {\n" +
      indenter(corps, 8) + "\n    }\n}\n";
  };

  u.copier = function (texte, bouton) {
    function ok() {
      var avant = bouton.textContent;
      bouton.textContent = "Copié ✓";
      setTimeout(function () { bouton.textContent = avant; }, 1600);
    }
    function secours() {
      var t = u.el("textarea");
      t.value = texte;
      t.setAttribute("readonly", "");
      t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      try { document.execCommand("copy"); ok(); } catch (e) { bouton.textContent = "Copie impossible"; }
      document.body.removeChild(t);
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texte).then(ok, secours);
    else secours();
  };
})();
