/* =========================================================================
   Java Rookie — blocs d'affichage (non interactifs ou peu interactifs).
   Chaque type de bloc du format (docs/format-lecon.md) a une fonction de rendu
   enregistrée dans JR.RENDUS. Les exercices sont dans exercices.js.
   ========================================================================= */
(function () {
  "use strict";

  var JR = window.JR, u = JR.u, el = u.el, esc = u.esc;
  var RENDUS = (JR.RENDUS = {});
  var CLE_SIMPLE = "jr.simple-ouvert";
  JR.CLE_SIMPLE = CLE_SIMPLE;

  /* ---------- Code et console ---------- */
  /* opts : titre, surligne (numéros de lignes), cls (faux|juste), copie ({run, contexte}) */
  JR.blocCode = function (code, opts) {
    opts = opts || {};
    var surl = opts.surligne || [];
    var lignes = JR.colorer(code).split("\n").map(function (l, i) {
      return '<span class="ln' + (surl.indexOf(i + 1) >= 0 ? " actif" : "") + '">' + (l || " ") + "</span>";
    });
    var fig = el("figure", "code" + (opts.cls ? " " + opts.cls : ""));
    if (opts.titre || opts.copie) {
      var barre = el("div", "code-barre");
      barre.appendChild(el("span", "code-titre", opts.titre ? esc(opts.titre) : ""));
      if (opts.copie) {
        var b = u.bouton("code-copier", "Copier pour essayer");
        b.title = "Copie le programme complet (avec le cadre public class Main), prêt à coller dans ton éditeur";
        b.addEventListener("click", function () {
          u.copier(JR.programmeComplet(code, opts.copie.run, opts.copie.contexte), b);
        });
        barre.appendChild(b);
      }
      fig.appendChild(barre);
    }
    fig.appendChild(el("pre", null, '<code class="java">' + lignes.join("") + "</code>"));
    return fig;
  };
  JR.blocSortie = function (texte, etiquette, cls) {
    var c = el("div", "console" + (cls ? " " + cls : ""));
    c.setAttribute("data-etiquette", etiquette || "Ce qui s'affiche");
    c.textContent = texte;
    return c;
  };
  /* Pas de bouton « Copier » si le code n'est pas Java exécutable (run: "aucun") ou s'il est volontairement incomplet (copier: false). */
  function copiable(b) { return b.run === "aucun" || b.copier === false ? null : { run: b.run, contexte: b.contexte }; }
  JR.copiable = copiable;

  /* ---------- Rendu générique ---------- */
  JR.rendreBloc = function (b) {
    var f = RENDUS[b.type];
    if (!f) {
      if (window.console) console.error("Java Rookie : type de bloc inconnu", b);
      return el("p", "attention-dev", "Bloc inconnu : " + esc(b.type));
    }
    return f(b);
  };
  JR.badgeRappel = function (b) {
    if (!b.rappel) return null;
    var pos = JR.trouverLecon(b.rappel);
    var lien = el("a", "badge-rappel", "Rappel" + (pos ? " · module " + JR.numModule(pos.info.im) : ""));
    lien.href = JR.lienLecon(b.rappel);
    lien.title = pos ? "Revoir : " + pos.info.titre : "Revoir la leçon";
    return lien;
  };

  /* ---------- Textes et encadrés ---------- */
  RENDUS.texte = function (b) { return el("div", "texte", "<p>" + b.html + "</p>"); };
  RENDUS.cle = function (b) { return el("p", "cle", b.html); };
  RENDUS.pourquoi = function (b) {
    return el("div", "encadre pourquoi", '<span class="k">Pourquoi cette leçon ?</span><p>' + b.html + "</p>");
  };
  RENDUS.attention = function (b) {
    return el("div", "encadre piege", '<span class="k">Attention, piège</span><p>' + b.html + "</p>");
  };
  RENDUS.cours = function (b) {
    return el("div", "encadre def", '<span class="k">Dans les mots du cours</span><p>' + b.html + "</p>" +
      (b.ref ? '<p class="source">— Pr. Samba DIAW, ' + esc(b.ref) + "</p>" : ""));
  };
  RENDUS.ecart = function (b) {
    return el("div", "encadre ecart", '<span class="k">Précision sur le support du cours</span>' +
      '<span class="dit">Le support dit</span><p>' + b.dit + "</p>" +
      '<span class="vrai">En réalité</span><p>' + b.vrai + "</p>");
  };
  RENDUS.simple = function (b) {
    var d = el("details", "simple");
    if (u.lire(CLE_SIMPLE, false)) d.open = true;
    d.appendChild(el("summary", null, '<span aria-hidden="true">💡</span> Explique-moi simplement'));
    d.appendChild(el("div", "simple-corps", b.html));
    return d;
  };

  var GENRES = {
    examen: ["🎓", "Pour l'examen", "Utile pour l'examen, pas indispensable pour programmer. Tu peux le garder pour plus tard."],
    culture: ["📜", "Pour ta culture", "Facultatif."],
    outil: ["🛠", "Côté outils", "Comment faire en pratique sur ton ordinateur."],
    plus: ["➕", "Pour aller plus loin", "Facultatif : saute-le si tu es fatigué."]
  };
  RENDUS.depliable = function (b) {
    var g = GENRES[b.genre] || GENRES.plus;
    var d = el("details", "depliable genre-" + (b.genre || "plus"));
    d.appendChild(el("summary", null, '<span aria-hidden="true">' + g[0] + "</span> <strong>" + g[1] + "</strong>" +
      (b.titre ? " · " + b.titre : "") + '<span class="depliable-aide">' + g[2] + "</span>"));
    var corps = el("div", "depliable-corps");
    (b.blocs || []).forEach(function (x) { corps.appendChild(JR.rendreBloc(x)); });
    d.appendChild(corps);
    return d;
  };

  /* ---------- « Où en est-on du cadre ? » ---------- */
  var MOTS_CADRE = ["public", "class", "static", "void", "main", "String[]", "args"];
  RENDUS.cadre = function (b) {
    var connus = {};
    (b.connus || []).forEach(function (m) { connus[m] = true; });
    function mot(m, txt) {
      return '<span class="mot ' + (connus[m] ? "connu" : "inconnu") + '">' + esc(txt || m) + "</span>";
    }
    var code = mot("public") + " " + mot("class") + " " + esc(b.classe || "Main") + " {\n" +
      "    " + mot("public", "public") + " " + mot("static") + " " + mot("void") + " " + mot("main") +
      "(" + mot("String[]") + " " + mot("args") + ") {\n" +
      '        <span class="zone-eleve">' + esc(b.zone || "// ton code ici") + "</span>\n    }\n}";
    var nb = MOTS_CADRE.filter(function (m) { return connus[m]; }).length;
    var w = el("div", "encadre cadre-suivi");
    w.innerHTML = '<span class="k">Où en est-on du cadre ? ' + nb + " mot" + (nb > 1 ? "s" : "") + " compris sur " +
      MOTS_CADRE.length + "</span>" + '<pre class="cadre-code">' + code + "</pre>" +
      '<p class="cadre-legende"><span class="mot connu">vert</span> = tu sais ce que c\'est · ' +
      '<span class="mot inconnu">gris</span> = pour l\'instant, recopie-le tel quel</p>' +
      (b.html ? "<p>" + b.html + "</p>" : "");
    return w;
  };

  /* ---------- Illustrations ---------- */
  RENDUS.illus = function (b) {
    var f = el("figure", "illus");
    if (b.ascii) f.appendChild(el("pre", "ascii", esc(b.ascii)));
    else f.appendChild(el("div", "illus-html", b.html));
    if (b.legende) f.appendChild(el("figcaption", null, b.legende));
    return f;
  };
  RENDUS.boites = function (b) {
    var f = el("figure", "illus");
    var c = el("div", "cellules");
    b.items.forEach(function (it) {
      c.appendChild(el("div", "cellule" + (it.maj ? " maj" : "") + (it.vide ? " vide" : ""),
        '<div class="nom">' + esc(it.nom) + "</div>" +
        '<div class="boite">' + esc(it.vide ? "?" : it.val) + "</div>" +
        (it.type ? '<div class="type">' + esc(it.type) + "</div>" : "")));
    });
    f.appendChild(c);
    if (b.legende) f.appendChild(el("figcaption", null, b.legende));
    return f;
  };

  /* ---------- Exemples de code ---------- */
  RENDUS.code = function (b) {
    var w = el("div", "exemple-code");
    w.appendChild(JR.blocCode(b.code, { titre: b.titre, surligne: b.surligne, copie: copiable(b) }));
    if (b.entree) w.appendChild(JR.blocSortie(b.entree.replace(/\n$/, ""), "Ce que l'utilisateur tape au clavier", "entree"));
    if (b.sortie != null) w.appendChild(JR.blocSortie(b.sortie));
    if (b.lignes) w.appendChild(decomposition(b.code, b.lignes));
    return w;
  };
  function decomposition(code, explications) {
    var d = el("details", "decompo");
    d.appendChild(el("summary", null, "Décortiquer ce code ligne par ligne"));
    var ol = el("ol");
    code.split("\n").forEach(function (l, i) {
      if (!explications[i]) return;
      var li = el("li");
      li.appendChild(el("code", "java", JR.colorer(l.trim())));
      li.appendChild(el("span", null, explications[i]));
      ol.appendChild(li);
    });
    d.appendChild(ol);
    return d;
  }

  RENDUS.erreur = function (b) {
    var w = el("div", "erreur");
    w.appendChild(el("p", "erreur-tete", '<span aria-hidden="true">✘</span> ' +
      (b.run === "erreur-execution" ? "Ce code compile… mais plante à l'exécution" : "Code refusé par Java")));
    w.appendChild(JR.blocCode(b.code, { cls: "faux" }));
    w.appendChild(JR.blocSortie(b.message, "Ce que répond Java", "rouge"));
    w.appendChild(el("p", "erreur-pourquoi", "<strong>Pourquoi ?</strong> " + b.explication));
    if (b.correction) {
      w.appendChild(el("p", "erreur-tete ok", '<span aria-hidden="true">✔</span> Version correcte'));
      w.appendChild(JR.blocCode(b.correction, { cls: "juste" }));
    }
    return w;
  };

  RENDUS.compare = function (b) {
    var w = el("div", "compare");
    var g = el("div", "compare-grille");
    [b.gauche, b.droite].forEach(function (c) {
      var col = el("div", "compare-col");
      col.appendChild(el("p", "compare-titre", c.titre));
      if (c.code) col.appendChild(JR.blocCode(c.code));
      if (c.html) col.appendChild(el("div", "compare-txt", c.html));
      g.appendChild(col);
    });
    w.appendChild(g);
    if (b.conclusion) w.appendChild(el("p", "compare-concl", b.conclusion));
    return w;
  };

  /* ---------- Trace pas à pas ---------- */
  RENDUS.trace = function (b) {
    var w = el("div", "trace");
    var code = el("div", "trace-code java");
    code.innerHTML = b.lignes.map(function (l) { return '<span class="ln">' + (JR.colorer(l) || " ") + "</span>"; }).join("");
    var mem = el("div", "trace-mem");
    mem.appendChild(el("div", "lbl", "La mémoire, en direct"));
    var etat = el("div", "trace-etat"), sortie = el("div", "trace-sortie"), note = el("p", "trace-note");
    note.setAttribute("aria-live", "polite");
    var i = -1;
    var bSuiv = u.bouton(null, "Étape suivante", function () { if (i < b.etapes.length - 1) { i++; maj(); } });
    var bReset = u.bouton(null, "Recommencer", function () { i = -1; maj(); });
    var cmd = el("div", "trace-cmd");
    cmd.appendChild(bSuiv); cmd.appendChild(bReset);
    [etat, sortie, cmd, note].forEach(function (x) { mem.appendChild(x); });
    w.appendChild(code); w.appendChild(mem);

    function cellule(nom, e) {
      return '<div class="cellule' + (e.maj ? " maj" : "") + (e.vide ? " vide" : "") + '"><div class="nom">' + esc(nom) +
        '</div><div class="boite">' + esc(e.vide ? "?" : e.val) + "</div></div>";
    }
    function maj() {
      var lns = code.querySelectorAll(".ln");
      if (i < 0) {
        lns.forEach(function (ln) { ln.classList.remove("actif"); });
        etat.innerHTML = '<span class="trace-vide">Clique sur « Étape suivante » pour exécuter la première ligne.</span>';
        sortie.hidden = true; note.textContent = "";
        bSuiv.disabled = false; bSuiv.textContent = "Étape suivante";
        return;
      }
      var e = b.etapes[i];
      lns.forEach(function (ln, k) { ln.classList.toggle("actif", k === e.ligne); });
      etat.innerHTML = Object.keys(e.mem || {}).map(function (n) { return cellule(n, e.mem[n]); }).join("") ||
        '<span class="trace-vide">(aucune variable)</span>';
      var txt = b.etapes.slice(0, i + 1).map(function (x) { return x.sortie; })
        .filter(function (x) { return x != null; }).join("\n");
      sortie.hidden = !txt; sortie.textContent = txt;
      note.textContent = e.note || "";
      var fin = i >= b.etapes.length - 1;
      bSuiv.disabled = fin; bSuiv.textContent = fin ? "Terminé ✓" : "Étape suivante";
    }
    maj();
    return w;
  };

  /* ---------- Programme qui grandit ---------- */
  RENDUS.versions = function (b) {
    var w = el("div", "versions");
    var onglets = el("div", "versions-onglets");
    onglets.setAttribute("role", "tablist");
    var corps = el("div", "versions-corps");
    var boutons = b.etapes.map(function (v, k) {
      var bt = u.bouton("versions-onglet", esc(v.titre || "Version " + (k + 1)), function () { montrer(k); });
      bt.setAttribute("role", "tab");
      onglets.appendChild(bt);
      return bt;
    });
    function montrer(k) {
      var v = b.etapes[k];
      boutons.forEach(function (bt, j) {
        bt.setAttribute("aria-selected", j === k ? "true" : "false");
        bt.classList.toggle("actif", j === k);
      });
      corps.innerHTML = "";
      if (v.ajout) corps.appendChild(el("p", "versions-ajout", v.ajout));
      corps.appendChild(JR.blocCode(v.code, { surligne: v.surligne, copie: copiable(b) }));
      if (v.sortie != null) corps.appendChild(JR.blocSortie(v.sortie));
    }
    w.appendChild(onglets); w.appendChild(corps);
    montrer(0);
    return w;
  };
})();
