/* =========================================================================
   Java Rookie — pages : leçon, parcours (accueil), lexique, fiche de module.
   ========================================================================= */
(function () {
  "use strict";

  var JR = window.JR, u = JR.u, el = u.el, esc = u.esc, P = JR.Progres;

  /* =====================================================================
     Page leçon : lecon.html?l=m02-l03
     ===================================================================== */
  JR.lecon = function (data) {
    if (JR.collecteur) { JR.collecteur(data); return; }   // page « fiche de module »
    var page = document.getElementById("lecon");
    if (!page) return;
    var pos = JR.trouverLecon(data.id);
    if (!pos) { page.innerHTML = "<p>Leçon introuvable dans le parcours.</p>"; return; }
    JR.leconCourante = data.id;
    document.title = data.titre + " — Java Rookie";
    sommaireModule(pos);
    rendreLecon(page, data, pos);
  };

  function sommaireModule(pos) {
    var nav = document.getElementById("sommaire-module");
    if (!nav) return;
    var m = pos.info.module;
    var html = '<p class="titre"><a href="index.html#' + esc(m.id) + '">Module ' + JR.numModule(pos.info.im) + "</a></p>" +
      '<p class="mod-titre">' + esc(m.titre) + "</p><ol>";
    m.lecons.forEach(function (l) {
      var cls = l.id === pos.info.id ? "actif" : (P.estFinie(l.id) ? "fini" : "");
      html += '<li class="' + cls + '"><a href="' + JR.lienLecon(l.id) + '"' +
        (l.id === pos.info.id ? ' aria-current="page"' : "") + ">" + esc(l.titre) +
        (P.estFinie(l.id) ? '<span class="sr"> (terminée)</span>' : "") + "</a></li>";
    });
    nav.innerHTML = html + '</ol><p class="fiche-lien"><a href="module.html?m=' + esc(m.id) + '">Fiche de révision du module</a></p>';
  }

  function enTete(page, data, pos) {
    var info = pos.info, m = info.module;
    page.appendChild(el("p", "fil", '<a href="index.html">Parcours</a> › <a href="index.html#' + esc(m.id) + '">Module ' +
      JR.numModule(info.im) + " · " + esc(m.titre) + "</a>"));
    page.appendChild(el("p", "lecon-meta", "Leçon " + (info.il + 1) + " sur " + m.lecons.length +
      " · environ " + (data.duree || info.duree || 6) + " min"));
    page.appendChild(el("h1", null, esc(data.titre)));
    if (data.objectif) page.appendChild(el("p", "objectif", '<span class="k">Dans cette leçon</span> ' + data.objectif));
    if (info.il === 0 && m.objectifs && m.objectifs.length) {
      page.appendChild(el("div", "encadre objectifs", '<span class="k">À la fin de ce module, tu sauras…</span><ul>' +
        m.objectifs.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"));
    }
  }

  function rendreLecon(page, data, pos) {
    page.innerHTML = "";
    enTete(page, data, pos);
    var barre = el("div", "barre-lecon", '<span class="barre-rempli"></span>');
    barre.setAttribute("role", "progressbar");
    barre.setAttribute("aria-label", "Avancement dans la leçon");
    barre.setAttribute("aria-valuemin", "0");
    barre.setAttribute("aria-valuemax", "100");
    page.appendChild(barre);
    var reprise = el("p", "reprise");
    reprise.setAttribute("role", "status");
    page.appendChild(reprise);

    var sections = data.sections.map(function (s, k) {
      var sec = el("section", "etape");
      sec.id = "etape-" + (k + 1);
      sec.appendChild(el("h2", null, '<span class="etape-n" aria-hidden="true">' + (k + 1) + "</span>" + esc(s.titre)));
      s.blocs.forEach(function (b) { sec.appendChild(JR.rendreBloc(b)); });
      page.appendChild(sec);
      return sec;
    });
    var fin = finDeLecon(data, pos);
    page.appendChild(fin);

    var visibles = P.estFinie(data.id) ? sections.length : Math.min(P.etape(data.id), sections.length);
    var continuer = u.bouton("bouton continuer", "Continuer", function () {
      visibles++;
      P.memoriserEtape(data.id, visibles);
      afficher();
      aller(sections[visibles - 1]);
    });
    function afficher() {
      sections.forEach(function (s, k) { s.hidden = k >= visibles; });
      fin.hidden = visibles < sections.length;
      var pct = fin.hidden ? Math.round((visibles / (sections.length + 1)) * 100) : 100;
      barre.firstChild.style.width = pct + "%";
      barre.setAttribute("aria-valuenow", String(pct));
      if (visibles < sections.length) {
        continuer.textContent = "Continuer → " + data.sections[visibles].titre;
        sections[visibles - 1].appendChild(continuer);
      } else if (continuer.parentNode) {
        continuer.parentNode.removeChild(continuer);
      }
    }
    afficher();
    if (visibles > 1 && !P.estFinie(data.id)) {
      reprise.innerHTML = "Tu t'étais arrêté à l'étape " + visibles + ". " +
        '<a href="#etape-' + visibles + '">Y aller</a> · ';
      reprise.appendChild(u.bouton("lien-bouton", "Recommencer la leçon", function () {
        P.memoriserEtape(data.id, 1);
        location.hash = "";
        location.reload();
      }));
      setTimeout(function () { aller(sections[visibles - 1]); }, 60);
    }
  }
  function aller(cible) {
    cible.scrollIntoView({ behavior: "smooth", block: "start" });
    var h = cible.querySelector("h2");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }

  function finDeLecon(data, pos) {
    var fin = el("section", "fin-lecon");
    fin.id = "fin";
    if (data.retenir && data.retenir.length) {
      fin.appendChild(el("div", "retenir-fin", "<h2>À retenir</h2><ul>" +
        data.retenir.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>"));
    }
    var nbTest = (data.test || []).length;
    if (nbTest) {
      fin.appendChild(el("h2", null, "Petit test"));
      fin.appendChild(el("p", "mut", nbTest + " question" + (nbTest > 1 ? "s" : "") +
        " pour vérifier que c'est acquis. Pas de note : c'est pour toi."));
      var zoneTest = el("div", "zone-test");
      data.test.forEach(function (b) { zoneTest.appendChild(JR.rendreBloc(b)); });
      fin.appendChild(zoneTest);
    }

    var valider = el("div", "valider");
    var etat = el("p", "valider-etat");
    etat.setAttribute("role", "status");
    var bFini = u.bouton("bouton", "", function () { P.finir(data.id); maj(); sommaireModule(pos); });
    var annuler = u.bouton("lien-bouton", "marquer comme non terminée", function () {
      P.annuler(data.id); P.memoriserEtape(data.id, 1); maj(); sommaireModule(pos);
    });
    function maj() {
      var f = P.estFinie(data.id);
      bFini.textContent = f ? "Leçon terminée ✓" : "J'ai compris, leçon terminée";
      bFini.disabled = f;
      annuler.hidden = !f;
      var suiv = pos.suiv;
      etat.innerHTML = f ? "Bien joué. " + (suiv ? "Si tu es fatigué, arrête-toi ici : ta progression est gardée. " +
        "La prochaine leçon dure environ " + (suiv.duree || 6) + " min." : "Tu as terminé tout le parcours. Bravo !") : "";
    }
    if (nbTest) {
      var resolus = 0;
      fin.addEventListener("jr-resolu", function (e) {
        if (!zoneTest.contains(e.target)) return;
        resolus++;
        if (resolus >= nbTest && !P.estFinie(data.id)) { P.finir(data.id); maj(); sommaireModule(pos); }
      });
    }
    maj();
    valider.appendChild(bFini);
    valider.appendChild(etat);
    valider.appendChild(annuler);
    fin.appendChild(valider);
    fin.appendChild(navigation(pos));
    return fin;
  }

  function navigation(pos) {
    var nav = el("div", "nav-chap");
    if (pos.prec) {
      var p = el("a", "prec", '<span class="dir">← Précédent</span><span class="titre">' + esc(pos.prec.titre) + "</span>");
      p.href = JR.lienLecon(pos.prec.id);
      nav.appendChild(p);
    }
    var s = el("a", "suiv", pos.suiv
      ? '<span class="dir">Suivant →</span><span class="titre">' + esc(pos.suiv.titre) + "</span>"
      : '<span class="dir">Fin du parcours</span><span class="titre">Retour au parcours</span>');
    s.href = pos.suiv ? JR.lienLecon(pos.suiv.id) : "index.html";
    nav.appendChild(s);
    return nav;
  }

  function chargerLecon() {
    var page = document.getElementById("lecon");
    if (!page) return;
    var id = u.param("l") || (JR.toutesLecons()[0] || {}).id;
    var pos = id && JR.trouverLecon(id);
    if (!pos) {
      page.innerHTML = '<h1>Leçon introuvable</h1><p>Cette leçon n\'existe pas. <a href="index.html">Retour au parcours</a>.</p>';
      return;
    }
    sommaireModule(pos);
    chargerScript("courses/" + pos.info.module.id + "/" + pos.info.id + ".js", function () {
      page.innerHTML = '<p class="fil"><a href="index.html">Parcours</a></p><h1>' + esc(pos.info.titre) +
        '</h1><div class="encadre piege"><span class="k">Leçon en préparation</span><p>Cette leçon n\'est pas encore écrite. ' +
        '<a href="index.html">Retour au parcours</a>.</p></div>';
    });
  }
  function chargerScript(src, siErreur, siOk) {
    var s = document.createElement("script");
    s.src = src;
    if (siErreur) s.onerror = siErreur;
    if (siOk) s.onload = siOk;
    document.body.appendChild(s);
  }

  /* =====================================================================
     Accueil : parcours, progression, « À revoir »
     ===================================================================== */
  function rendreParcours() {
    var cible = document.getElementById("parcours");
    if (!cible || !JR.modules) return;
    var liste = JR.toutesLecons();
    var nbFinies = liste.filter(function (l) { return P.estFinie(l.id); }).length;
    var proch = null;
    for (var i = 0; i < liste.length; i++) if (!P.estFinie(liste[i].id)) { proch = liste[i]; break; }

    var global = document.getElementById("progres-global");
    if (global) {
      var pct = liste.length ? Math.round((nbFinies / liste.length) * 100) : 0;
      global.innerHTML = '<div class="barre-lecon"><span class="barre-rempli" style="width:' + pct + '%"></span></div>' +
        "<p>" + nbFinies + " leçon" + (nbFinies > 1 ? "s" : "") + " terminée" + (nbFinies > 1 ? "s" : "") +
        " sur " + liste.length + "</p>";
    }
    var reprendre = document.getElementById("reprendre");
    if (reprendre && proch) {
      reprendre.href = JR.lienLecon(proch.id, P.etape(proch.id));
      reprendre.textContent = nbFinies || P.etape(proch.id) > 1 ? "Reprendre : " + proch.titre : "Commencer la première leçon";
    }
    rendreARevoir();

    cible.innerHTML = "";
    JR.modules.forEach(function (m, im) {
      cible.appendChild(carteModule(m, im, proch));
    });
  }

  function carteModule(m, im, proch) {
    var finies = m.lecons.filter(function (l) { return P.estFinie(l.id); }).length;
    var enCours = proch && proch.module.id === m.id;
    var etat = finies === m.lecons.length ? "fini" : (enCours ? "encours" : "");
    var d = el("details", "module " + etat);
    d.id = m.id;
    if (enCours || location.hash === "#" + m.id) d.open = true;
    var minutes = m.lecons.reduce(function (s, l) { return s + (l.duree || 6); }, 0);
    d.appendChild(el("summary", null,
      '<span class="mod-num">' + JR.numModule(im) + "</span>" +
      '<span class="mod-txt"><span class="mod-titre">' + esc(m.titre) +
      (m.optionnel ? ' <span class="tag">optionnel</span>' : "") + "</span>" +
      '<span class="mod-resume">' + esc(m.resume || "") + "</span></span>" +
      '<span class="mod-etat">' + (etat === "fini" ? "✓ terminé" : finies + "/" + m.lecons.length) +
      "<small>" + m.lecons.length + " leçons · ~" + minutes + " min</small></span>"));
    var ol = el("ol", "lecons");
    m.lecons.forEach(function (l, il) {
      var f = P.estFinie(l.id);
      var li = el("li", f ? "fini" : (proch && proch.id === l.id ? "prochaine" : ""));
      li.innerHTML = '<a href="' + JR.lienLecon(l.id) + '"><span class="pastille" aria-hidden="true">' + (f ? "✓" : il + 1) +
        '</span><span class="l-titre">' + esc(l.titre) + (f ? '<span class="sr"> (terminée)</span>' : "") +
        '</span><span class="l-duree">' + (l.duree || 6) + " min</span></a>";
      ol.appendChild(li);
    });
    d.appendChild(ol);
    d.appendChild(el("p", "fiche-lien", '<a href="module.html?m=' + esc(m.id) + '">Fiche de révision du module</a>'));
    return d;
  }

  function rendreARevoir() {
    var zone = document.getElementById("a-revoir");
    if (!zone) return;
    var r = JR.ARevoir.tout(), cles = Object.keys(r);
    zone.hidden = !cles.length;
    if (!cles.length) return;
    zone.innerHTML = "<h2>À revoir</h2><p class=\"mut\">Les exercices que tu as mis de côté. Refais-en un : c'est le meilleur moyen de retenir.</p>";
    var ul = el("ul", "revoir-liste");
    cles.forEach(function (c) {
      var pos = JR.trouverLecon(r[c].lecon);
      ul.appendChild(el("li", null, '<a href="' + JR.lienLecon(r[c].lecon) + '">' + esc(pos ? pos.info.titre : r[c].lecon) +
        "</a> — " + esc(r[c].enonce || "")));
    });
    zone.appendChild(ul);
  }

  /* =====================================================================
     Lexique
     ===================================================================== */
  JR.lexique = function (termes) { JR.termes = termes; };
  function rendreLexique() {
    var cible = document.getElementById("lexique");
    if (!cible || !JR.termes) return;
    var termes = JR.termes.slice().sort(function (a, b) { return a.terme.localeCompare(b.terme, "fr", { sensitivity: "base" }); });
    function lettre(t) { return t.terme.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/^[^A-Za-z]+/, "").charAt(0).toUpperCase(); }
    function afficher(filtre) {
      var f = (filtre || "").toLowerCase(), courante = "";
      cible.innerHTML = "";
      termes.forEach(function (t) {
        if (f && (t.terme + " " + t.def).toLowerCase().indexOf(f) < 0) return;
        var L = lettre(t);
        if (L !== courante) { courante = L; cible.appendChild(el("h2", "lex-lettre", L)); }
        cible.appendChild(el("div", "lex-item", '<p class="terme">' + esc(t.terme) + "</p><p>" + t.def + "</p>" +
          (t.lecon ? '<p class="lex-lien"><a href="' + JR.lienLecon(t.lecon) + '">Voir la leçon</a></p>' : "")));
      });
      if (!cible.children.length) cible.appendChild(el("p", "mut", "Aucun terme ne correspond."));
    }
    var champ = document.getElementById("lex-filtre");
    if (champ) champ.addEventListener("input", function () { afficher(champ.value); });
    afficher("");
  }

  /* =====================================================================
     Fiche de révision d'un module : module.html?m=m02-variables-types
     Charge chaque leçon du module et rassemble ses « À retenir ».
     ===================================================================== */
  function rendreFicheModule() {
    var cible = document.getElementById("fiche");
    if (!cible || !JR.modules) return;
    var id = u.param("m"), im = -1;
    JR.modules.forEach(function (m, k) { if (m.id === id) im = k; });
    if (im < 0) { cible.innerHTML = '<h1>Module introuvable</h1><p><a href="index.html">Retour au parcours</a></p>'; return; }
    var m = JR.modules[im];
    document.title = "Fiche · " + m.titre + " — Java Rookie";
    cible.innerHTML = '<p class="fil"><a href="index.html">Parcours</a> › Module ' + JR.numModule(im) + "</p>" +
      "<h1>Fiche de révision · " + esc(m.titre) + "</h1>" +
      '<p class="mut">Tous les « À retenir » du module, sur une page. Imprimable.</p>';
    var recus = {}, liste = el("div", "fiche-liste");
    cible.appendChild(liste);
    JR.collecteur = function (data) { recus[data.id] = data; };
    var k = 0;
    function suivant() {
      if (k >= m.lecons.length) { JR.collecteur = null; dessiner(); return; }
      var l = m.lecons[k++];
      chargerScript("courses/" + m.id + "/" + l.id + ".js", suivant, suivant);
    }
    function dessiner() {
      m.lecons.forEach(function (l, il) {
        var d = recus[l.id];
        var bloc = el("section", "fiche-lecon");
        bloc.innerHTML = '<h2><a href="' + JR.lienLecon(l.id) + '">' + (il + 1) + ". " + esc(l.titre) + "</a></h2>" +
          (d && d.retenir ? "<ul>" + d.retenir.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>"
            : '<p class="mut">Leçon pas encore écrite.</p>');
        liste.appendChild(bloc);
      });
    }
    suivant();
  }

  /* =====================================================================
     Commun : menu mobile, préférence « Explique-moi simplement »
     ===================================================================== */
  function initCommun() {
    var btn = document.querySelector(".menu-btn");
    var liens = document.querySelector(".nav-liens");
    if (btn && liens) btn.addEventListener("click", function () {
      var ouvert = liens.classList.toggle("ouvert");
      btn.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });
    var pref = document.getElementById("pref-simple");
    if (pref) {
      pref.checked = !!u.lire(JR.CLE_SIMPLE, false);
      pref.addEventListener("change", function () {
        u.ecrire(JR.CLE_SIMPLE, pref.checked);
        document.querySelectorAll("details.simple").forEach(function (d) { d.open = pref.checked; });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCommun();
    rendreParcours();
    rendreLexique();
    rendreFicheModule();
    chargerLecon();
  });
})();
