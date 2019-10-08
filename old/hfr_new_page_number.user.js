// ==UserScript==
// @name          [HFR] New Page Number
// @version       2.6.3
// @namespace     roger21.free.fr
// @description   Affiche le nombre de pages en retard sur la page des drapals et permet l'ouverture en masse des pages en retard avec un clic-milieu sur le drapal (fenêtre de configuration complète avec de nombreuses options).
// @icon          https://reho.st/self/40f387c9f48884a57e8bbe05e108ed4bd59b72ce.png
// @include       https://forum.hardware.fr/forum1.php*
// @include       https://forum.hardware.fr/forum1f.php*
// @include       https://forum.hardware.fr/*/liste_sujet-*.htm
// @author        roger21
// @homepageURL   http://roger21.free.fr/hfr/
// @noframes
// @grant         GM.getValue
// @grant         GM_getValue
// @grant         GM.setValue
// @grant         GM_setValue
// @grant         GM.openInTab
// @grant         GM_openInTab
// @grant         GM_registerMenuCommand
// ==/UserScript==

/*

Copyright © 2012, 2014-2019 roger21@free.fr

This program is free software: you can redistribute it and/or modify it under the
terms of the GNU Affero General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with this program. If not, see <https://www.gnu.org/licenses/agpl.txt>.

*/

// $Rev: 1153 $

// historique :
// 2.6.3 (02/10/2019) :
// - suppression de la directive "@inject-into" (mauvaise solution, changer solution)
// - correction de la gestion de la compatibilité gm4 (pour violentmonkey)
// 2.6.2 (18/09/2019) :
// - ajout de la directive "@inject-into content" pour isoler le script sous violentmonkey
// 2.6.1 (12/09/2019) :
// - priorité à la couleur de fin sur la couleur de début pour le dégradé en limite auto avec amplitude 0
// 2.6.0 (09/09/2019) :
// - nouvelle gestion de l'affichage de la fenêtre de configuration
// - restylage de la fenêtre de configuration (plus compacte)
// - bordure solide pour la fenêtre de configuration
// - petites mises en forme et corrections du code
// 2.5.4 (17/12/2018) :
// - ajout d'une protection contre le réaffichage du nombre de pages en retard ->
// en cas de retour sur la page des drapals, signalé par fugacef :jap:
// 2.5.3 (29/11/2018) :
// - ajout de l'avis de licence AGPL v3+
// 2.5.2 (09/09/2018) :
// - Nouveau format pour la metadata @description (avec majuscule et ponctuation).
// 2.5.1 (05/09/2018) :
// - correction d'une fôte oryble, signalée par demars :jap:
// 2.5.0 (11/08/2018) :
// - ajout de la configuration du délai de rafraîchissement de la page après un click
// - ajout d'un paramètre de rafraîchissement général de la page
// 2.4.0 (06/08/2018) :
// - nouveau nom : [HFR] new page number -> [HFR] New Page Number
// - gestion de la compatibilité gm4
// - check du code dans tm
// - suppression des @grant inutiles
// - maj de la metadata @homepageURL
// - ajout des metadata @author (roger21) et @authororig (Fred82)
// 2.3.6 (28/07/2018) :
// - petites corrections sur les styles css
// - petite maj de style sur l'affichage du nombre total de pages en retard
// 2.3.5 (06/04/2018) :
// - remplacement des window.location par des window.location.href pour fonctionner avec vm
// 2.3.4 (25/12/2017) :
// - désactivation de l'ouverture en masse par défaut
// 2.3.3 (28/11/2017) :
// - passage au https
// 2.3.2 (02/09/2017) :
// - petite correction sans conséquences sur la récupération d'un href
// 2.3.1 (02/09/2017) :
// - homogénéisation de la gestion des clics et des preventDefault avec [HFR] drapal esay click
// 2.3.0 (02/09/2017) :
// - restauration du lien l'orsque l'ouverture en masse est désactivée (ou limitée à 1 onglet) pour gsi spirit
// - correction de l'affichage du nombre total de pages en retard ->
// mal géré quand on applique la conf plusieurs fois)
// 2.2.3 (29/07/2017) :
// - ajout d'un preventDefault sur le mousedown du clic-milieu sur le drapal pour éviter ->
// l'apparition du défilement automatique
// 2.2.2 (29/07/2017) :
// - correction de la gestion du clic-milieu quand pas d'ouverture en masse ->
// (problème signalé par jakwarrior et gsi spirit)
// 2.2.1 (28/07/2017) :
// - n'affiche pas les totaux si c'est 0 (pasque bon :o )
// 2.2.0 (28/07/2017) :
// - nouvelle gestion du clic-milieu pour une éventuelle compatibilité avec chrome
// - ajout de l'affichage du nombre total de pages en retard et du nombre total de topics dans la case "Sujet"
// 2.1.3 (20/06/2017) :
// - suppression du text-align-last (maintenant que ça marche, on peut voir que c'était une connerie :o )
// 2.1.2 (11/02/2017) :
// - correction du style font-fammily à Verdana,Arial,Sans-serif,Helvetica (HFR Style)
// 2.1.1 (22/12/2016) :
// - modification de la gestion du dégradé pour les drapal à 0 en limite auto
// - légère modification de la description
// 2.1.0 (20/12/2016) :
// - ajout d'une option de rechargement de la page des drapals à l'ouverture d'un drapal
// 2.0.2 (15/12/2016) :
// - correction de certains styles css
// 2.0.1 (15/12/2016) :
// - correction d'un bug sur la position des fenêtres d'aide
// 2.0.0 (14/12/2016) :
// - ajout d'une gestion du dégradé
// - ajout d'une fenêtre de configuration complète
// - ajout de la gestion de la page des mps (problème rapporté par StefSamy)
// - suppression des experimentations commentées
// - modification de l'année dans les dates de l'historique : passage de 2 a 4 chiffres
// 1.1.0 (07/08/2016) :
// - reformatage du code (Online JavaScript beautifier : ->
// "2 spaces, unlimited newlines, do not wrap, braces with" et rien coché)
// - expérimentations sur la requete xhr finale (rien de concluant -> commenté)
// 1.0.9 (04/08/2015) :
// - correction d'une bêtise [:roger21:2]
// 1.0.8 (04/08/2015) :
// - amélioration du code sur l'affichage du nombre de pages en retard
// - ajout d'un title explicite comme sur ouverture en masse
// 1.0.7 (03/08/2015) :
// - importante réécriture du code (factorisation, homogénéisation, robustesse, syntaxe)
// -> le nombre d'onglets maximum configuré doit être resaisie
// - contournement du problème d'imposssibilité de réouvrir les onglets fermés
// - ajout d'un "+" devant le nombre de pages "en plus" du drapal
// 1.0.6 (07/03/2015) :
// - ajout de la metadata @noframes (interdit l'execution du script dans une frame pour plus de sécurité)
// 1.0.5 (07/04/2014) :
// - gestion du annuler sur le menu du script (code de porc is bad)
// 1.0.4 (04/04/2014) :
// - modification de la description
// - ajout d'une icone au script
// - ajout des dates dans l'historique
// 1.0.3 (18/03/2014) :
// - maj des metadata @grant et indentation des metadata
// 1.0.2 (14/09/2012) :
// - ajout des metadata @grant
// 1.0.1 (30/08/2012) :
// - réécriture

/* gestion de la compatibilité gm4 */
if(typeof GM === "undefined") {
  this.GM = {};
}
if(typeof GM_getValue !== "undefined" && typeof GM.getValue === "undefined") {
  GM.getValue = function(...args) {
    return new Promise((resolve, reject) => {
      try {
        resolve(GM_getValue.apply(null, args));
      } catch (e) {
        reject(e);
      }
    });
  };
}
if(typeof GM_setValue !== "undefined" && typeof GM.setValue === "undefined") {
  GM.setValue = function(...args) {
    return new Promise((resolve, reject) => {
      try {
        resolve(GM_setValue.apply(null, args));
      } catch (e) {
        reject(e);
      }
    });
  };
}
if(typeof GM_openInTab !== "undefined" && typeof GM.openInTab === "undefined") {
  GM.openInTab = function(...args) {
    return new Promise((resolve, reject) => {
      try {
        resolve(GM_openInTab.apply(null, args));
      } catch (e) {
        reject(e);
      }
    });
  };
}
var gm_menu = false;
if(typeof GM_registerMenuCommand !== "undefined") {
  gm_menu = true;
}

/* nom du script */
var script_name = "[HFR] New Page Number";

/* option en dur */
var open_in_background = true;

/* les images */
var default_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACjUlEQVR42mWSXUhTcRjGz3B2E22ii5XgNvbhF%2BlwykzODDRZgh%2FMwDWmNyGpmDGTRGyixOZk7uDeMRtmJBIl3VgXGdJNJzMqvRAqsCLnpXlhXrSoSOfT%2F6SF1Au%2Fu%2F%2FD%2F3mf5%2BW4AwPi5IwMhgmUagapzT8oz%2FSJ%2BIzX1CDn%2Fh32UMY4wrAxfKAUEVF1fJty4htUJr6P1vsWYy22h5FuxU1hUHZQKIkaGSJIlkBIlVzwZGJ12Ip3VJucGXAkQl2N8zdGvM7oWExx0B6%2FJ0rZxpgaLy9noVR7CM%2BH7HgSakJztRWOGjuEcHR%2BMHLX1kmzcm5%2FJ8neF1xXA1OF6Kk6ig67AW9vteLecDtKLQXwXLmKa7H7iXaa87loUcXtBcF2YvbIoUR9wWGUGRQo1qeBP6GBtTAHWq0OGr0JDV2RpCu6LJ6hj9lMKGfpqVZ%2FUg42iMdEawks%2BnRMBzowHuxHZWUVSirqcDHyGM7wK1RRPF5Cn82cFLmU3nr4JFYidXCfMsBRUYRY0At%2FIAi1xoTqCz64aImJVmGhrTUDwcxJPW1GefHOJWtSf0wJjVqJPJMBemMuMo7rkJZpRLqxDJqaXhSNrCd1EYhphGxOKneFan3L4y0JwXMW%2BUYt%2BymE4OQj5PO10PLn0HA7AWvsO3SEhJLg5wgq7g055AuR87YZofNZZWkBiixWeHzjaO6fBMelorBlAsXhTejC2GEikYnKGXtX9IC6FcNeT5PT1bTobOv75h6Y2rX3TMPgDCK3b2k3K7D1VTmKp0zgZCj%2BXs6ov1fmHwoovcJUeZsw628UXoinRz%2BsWcJbazphR1QIzF74908Khuy%2Fm%2B2KzsndrFypJylyKb10KQhppz%2F29ucXz0Rq1fnX2JcAAAAASUVORK5CYII%3D";
var help_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAACnElEQVR42q2T3U%2BSYRjG%2FVvgT2it5mrVap3V1jjooAOn5ifQ1HK1DJazdJjTLCk1M50KauqcigJvAiKIJsqXIPBiIl%2FKx0B44VWz7eqNNZyb88hn%2B50912%2B77t13Xt5FPx15xNa6DwUa5wGp2qSpH%2FY0pbBR5JwlKZgx7bPPDaudNGfekQl5wkfY2qPhDlJZPLsZOAIZjC1HQyNLYc6ZYWIjzZFbU%2BntyAHMv%2BKQLvghmnCicWwTPcQWDI4oXCEK31T%2BdA%2Bxc1oiMydZ0%2BuJ4FaYxpIzhnom1E144I%2FR8MUymFgOoE5qhXI9BLsvifZpMtg66WLlBOMrUeGGP401TwLCYTue95mROTxm%2BPOfY9QPW1A3aMKiPQLtRgQNUqswJxhYCJEupmsvsY3aPhNqetfgj2YwsxqA2rYLmhGobUFwO3Von3HA6o3jRa%2BRzAm6FF7aHUxBKLGg%2BqsRvG4D81mPWaMPceoQe3Ea%2FfMulHdoUf1FD4dvHzyxns4J2iZdtCuQwsshC7hdelR%2B1qHikw4p%2Bjd2IhT4Yi1K2lR4zMAXa2D3J1DYoj4RvJHaSNtOAmKZC7xOAyrEiyj7uIDS9%2Bosxe8IFDcrUNQsR6N0FUZPBA8b5CcVmD5ChTEAvSOC6i5DLhhLHiCyT6NANJelWCQDse6DhKlzr27qZIh88RKr8sNicMUZgXLND26HBkUtSnRMmrL8Cxc2TWFU44bGEsDd2ong7afjrFO7UCCa5zxqItI6%2By7U1iDeSlZQ1ipHSfMsXvfroTR6oTL7cbPqe%2Fr6k5Gzt%2FGBUMa5%2F2o6NEBs4qc7DIs3lmXZuYcemQ35PGnoaqWEc%2B493Hk2zr5VMya4UTVKXuMPU%2FlcKXWlYoi8XD4ouFQ6wL7w6%2F0LXCsKj6bCqcQAAAAASUVORK5CYII%3D";
var save_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAACl0lEQVR42q2T60uTYRiH%2FTv2bnttAwlkRCGChFD7FCQSm2ZDMQ%2FL0nRnj7TNGDbTooychzFSSssstdqc8zB1anNrSpm47FVCzH3pQLVhdLBfzztoJlifvOEHz4fnuu7nGBe311XgOyLMnTmsz%2FakMBljB8OSEVFY4kpkJM5Efbp9v%2FC%2FcJ43VSrzJId0HhluBy3oW%2BmKpnOpGSWuExD30iFxDy3dFSZdpZkTSZHr80Y41%2Fphe3UDpvnKaNixY60PjbNVOGTjRZJtvJ2SHE%2BKINOdtMHC7MSaQBkq%2FCXQzJ6DjqScpNp3HvY3D3B5ugIiC3dDdJMriAlk7iSDajwr2pmFWVDlPQPFTCEU0wVQTxfCvT4Ig1cJB5Hk9hxDwjWuISbIGBExncFmWINNqPAVQ%2FlUTsB8KKdIPPmYeOsCW6HIOtpeNMI234j4ei4TExy3J2w%2BWr2L2oAGWm8RWckAlj4uQDVZiPH1oSj8c%2BsH2p5fgWGyGH3BTvCN1GZMIH5Ib%2FavdMPoV6HWr8Xnb5%2Bi0Iev72KwZa4ealc29O6z6A92gF%2Fzt6CHZm4tNKF98Sp0U3KYfdWIfP8Shbd%2BbcHy7BLKnFnQEEFLoA7tXjPoKmp7C6l3%2BAb5QBrsq%2FdRPSmH2n0adTPlWH6%2FiLa5BpQOnoTCcQo6Zw7sr7uRbj0KupLaPsRkK09wgFyN2aPBY%2BYeKkfzoB3OgWpIBqWDDQtn48lyF4xDxeCrORu0mhLseAuJTVxpfAMVMbnL4CCS1oAZ%2BtEiXBiWo5VswU5gvbMIvFJOhMC7v8Z9DVwpbaJCkg4x2v1m9L60onfBCovXhLSWVPAVnBCt%2Bgf8p%2BiLXCFtoPR0DcXwtZwwX8UJk44MiZ4upYR7%2Fnt%2FA%2Bw9sdKFchsrAAAAAElFTkSuQmCC";
var close_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAACEklEQVR42q1S%2FU9SYRhlbW13%2FQ0V5Woub05zfZkCXhUhpmmb8v3h5ZKoCQjcwVBi1Q%2B19Zf0d2lWxpeR3AuX93J8qGVjgK2tZ3u3d3t2znmecx6D4R%2BrsS5dGdiEnDXS4weCQ2Fe9QUSdafH3B%2Bc3UM7k4OeSPWQNIIi3xAjaG5u48fz1Y%2B1peU7PWAU3qBNT0%2FKaG3tnJOogXWe1NGKJYB8AZ3%2Fic2RqMxaL%2F0iSGe4dlLW23uvgPcfoOfyHQI0RYlX%2FSGe1KHtxAHqqyERJwtPWUWYv9w1oh5PcuxlnOlyFnj7DiydQSMcAalD244Buf2f%2F6rVTuA5rq9JregW15Q2WCu2S%2Bu8BvYLBMwD2RxUfxDVeRurzMxyF8cUFDnFG9CRo3V8QcDtA%2BQMqnMLetkicH%2FNWfH4O1EBlAacHmDVBeymaG87ipPT%2FMVgt49XvH5okSiQkgmYBuK0DhmorrlQMVnwdXyiP0nd5eUVjw%2BatAFQjIrbCzKLlabN%2BunSChDdRP3ZCor3H%2BJoeKSbhC6LJ3Vo4RekmoRCo5NZrDRl5oqPJrnjiQesZrUBYQmndgeOR8dweGPoDwldllB3uqGJEpQ1N8gsVnpiOjfsy%2Bg493nkLvtuEaA4FvFt7B4OrhmFrinosoTa4jLK5hmdzOpx%2B%2Bj2MPdp6BbrC%2F5dZZNFKD6eGhjVofEmd3D1umD4n3UGltFKFDkd60gAAAAASUVORK5CYII%3D";
var reset_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAABhklEQVQY0wXBT0iTcRjA8e%2Fz%2FN537%2FvamjVa7lSUhUbsEiQRQf%2BoQ3gL6hSskA5Bt%2FQSXTz0%2F2xBl7okZR6EqEgiAvFgCAW1SPLPlGluilubZsv29PmQe37SAUw2u75Swv%2F%2BeXt7R2ve3I27K8GTzoObf8RTF78kU8e4NtTrAGa9qL9GaFVhfrDzdOvibt23rMGrCtiMyABX3g7JARt3b1KZPX%2FAKoLVnI6VHTMVxJZ8ffb4fHYb514Umi58uxMArBOzNYdVBVsiqFd8yY2dOpra%2Fy6nPBg%2F67%2B%2FetkBTGzhUx3sl9Cogk3HwiMA2Q8PHY8u%2FfQApoOwpwYbNaGxBraAtwrQvbwjlh0eUd04cV8Wo3TX1r%2F12%2F8UJyAIjYiwafYmLQPJUYt3jChTiebjZbAavq2KFuckdq%2BM%2FK56NArivmLmBruGPQoufLkuWMkxlffjhwAWktGZkmq96HS072l3lJlfUT6md%2B3Ma9A%2Fp24vQC6f8TFzk4lN6ddtbS2HbUKvF2%2Fpf4cUlw8oMuVkAAAAAElFTkSuQmCC";

/* options par défaut */
var default_max_tab = 9;
var default_color_start_perso = "#ff7f00";
var default_color_end_perso = "#007fff";
var default_fixed_limit = 10;
var default_delay_click = 5; // 5 secondes
var default_delay_page = 10; // 10 minutes

/* options */
var display_button;
var button_icon;
var mass_opener;
var max_tab;
var reverse_order;
var color_gradient;
var color_start_type;
var color_end_type;
var color_start_perso;
var color_end_perso;
var limit_type;
var fixed_limit;
var progress_type;
var smaller_text;
var go_top;
var hash_haut;
var refresh_click;
var delay_click;
var display_totals;
var refresh_page;
var delay_page;

/* timers des refresh */
var refresh_click_timer = null;
var refresh_page_timer = null;
var scheduled_for_refresh = false;

/* couleurs auto */
var the_style = document.querySelector("head link[href^=\"/include/the_style1.php?color_key=\"]")
  .getAttribute("href").split("/");
var color_start_auto = "#" + the_style[13].toLowerCase();
var color_end_auto = "#" + the_style[6].toLowerCase();
var color_text = "#" + the_style[12].toLowerCase();

/* variables globales */
var bigest_page_number = 0;
var actual_bigest_page_number = 0;
var computed_colors = {};

/* fonctions pour les refresh */
function refresh() {
  window.location.reload(true);
}

function do_refresh_click(e) {
  if(refresh_click && (e === null || e.ctrlKey || e.shiftKey || e.button === 1)) {
    scheduled_for_refresh = true;
    window.clearTimeout(refresh_click_timer);
    refresh_click_timer = window.setTimeout(refresh, delay_click * 1000);
  }
}

function do_refresh_page() {
  if(refresh_page) {
    window.clearTimeout(refresh_page_timer);
    refresh_page_timer = window.setTimeout(refresh, delay_page * 60 * 1000);
  }
}

/* fonctions de calcul des couleurs */
function pad(s) {
  return s.length === 1 ? "0" + s : s;
}

function mj(r, g, b) {
  return (((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255) > 0.5 ? "#000000" : "#ffffff";
}

function white_or_black(bgcolor) {
  if(typeof bgcolor === "string") {
    // couleur au format hexa #rrggbb
    return mj(parseInt(bgcolor.substr(1, 2), 16),
      parseInt(bgcolor.substr(3, 2), 16),
      parseInt(bgcolor.substr(5, 2), 16));
  } else {
    if(typeof bgcolor.alpha === "undefined") {
      // un objet avec les 3 valeurs r g b en décimal
      return mj(bgcolor.r, bgcolor.g, bgcolor.b);
    } else {
      // un objet avec les 4 valeurs r g b + alpha en décimal
      let r = Math.round((parseInt(color_start_auto.substr(1, 2), 16) * (1 - bgcolor.alpha)) +
        (bgcolor.r * bgcolor.alpha));
      let g = Math.round((parseInt(color_start_auto.substr(3, 2), 16) * (1 - bgcolor.alpha)) +
        (bgcolor.g * bgcolor.alpha));
      let b = Math.round((parseInt(color_start_auto.substr(5, 2), 16) * (1 - bgcolor.alpha)) +
        (bgcolor.b * bgcolor.alpha));
      return mj(r, g, b);
    }
  }
}

function compute_colors(npn) {
  let npn_index = "npn" + npn;
  if(typeof computed_colors[npn_index] === "undefined") {
    let text;
    let background;
    if(color_start_type !== "trans" && color_end_type !== "trans") { // color_start -> color_end
      let color_start = color_start_type === "auto" ? color_start_auto : color_start_perso;
      let color_end = color_end_type === "auto" ? color_end_auto : color_end_perso;
      if(npn === actual_bigest_page_number) {
        text = white_or_black(color_end);
        background = color_end;
      } else if(npn === 0) {
        text = white_or_black(color_start);
        background = color_start;
      } else {
        let start_r = parseInt(color_start.substr(1, 2), 16);
        let start_g = parseInt(color_start.substr(3, 2), 16);
        let start_b = parseInt(color_start.substr(5, 2), 16);
        let end_r = parseInt(color_end.substr(1, 2), 16);
        let end_g = parseInt(color_end.substr(3, 2), 16);
        let end_b = parseInt(color_end.substr(5, 2), 16);
        let color_r;
        let color_g;
        let color_b;
        if(progress_type === "lin") {
          color_r = Math.round(start_r + ((end_r - start_r) / actual_bigest_page_number * npn));
          color_g = Math.round(start_g + ((end_g - start_g) / actual_bigest_page_number * npn));
          color_b = Math.round(start_b + ((end_b - start_b) / actual_bigest_page_number * npn));
        } else {
          let a_r = (end_r - start_r) / Math.log10(1 + actual_bigest_page_number);
          color_r = Math.round(start_r + (a_r * Math.log10(1 + npn)));
          let a_g = (end_g - start_g) / Math.log10(1 + actual_bigest_page_number);
          color_g = Math.round(start_g + (a_g * Math.log10(1 + npn)));
          let a_b = (end_b - start_b) / Math.log10(1 + actual_bigest_page_number);
          color_b = Math.round(start_b + (a_b * Math.log10(1 + npn)));
        }
        text = white_or_black({
          r: color_r,
          g: color_g,
          b: color_b
        });
        background = "#" + pad(color_r.toString(16)) + pad(color_g.toString(16)) + pad(color_b.toString(16));
      }
    } else if(color_start_type === "trans") { // transparent -> color_end
      let color_end = color_end_type === "auto" ? color_end_auto : color_end_perso;
      if(npn === actual_bigest_page_number) {
        text = white_or_black(color_end);
        background = color_end;
      } else if(npn === 0) {
        text = white_or_black(color_start_auto);
        background = "transparent";
      } else {
        let end_r = parseInt(color_end.substr(1, 2), 16);
        let end_g = parseInt(color_end.substr(3, 2), 16);
        let end_b = parseInt(color_end.substr(5, 2), 16);
        let alpha;
        if(progress_type === "lin") {
          alpha = Math.round(npn * 100 / actual_bigest_page_number) / 100;
        } else {
          let a = 1 / Math.log10(1 + actual_bigest_page_number);
          alpha = Math.round((a * Math.log10(1 + npn)) * 100) / 100;
        }
        text = white_or_black({
          r: end_r,
          g: end_g,
          b: end_b,
          alpha: alpha
        });
        background = "rgba(" + end_r + ", " + end_g + ", " + end_b + ", " + alpha + ")";
      }
    } else { // color_start -> transparent
      let color_start = color_start_type === "auto" ? color_start_auto : color_start_perso;
      if(npn === actual_bigest_page_number) {
        text = white_or_black(color_start_auto);
        background = "transparent";
      } else if(npn === 0) {
        text = white_or_black(color_start);
        background = color_start;
      } else {
        let start_r = parseInt(color_start.substr(1, 2), 16);
        let start_g = parseInt(color_start.substr(3, 2), 16);
        let start_b = parseInt(color_start.substr(5, 2), 16);
        let alpha;
        if(progress_type === "lin") {
          alpha = 1 - (Math.round(npn * 100 / actual_bigest_page_number) / 100);
        } else {
          let a = 1 / Math.log10(1 + actual_bigest_page_number);
          alpha = Math.round((1 - (a * Math.log10(1 + npn))) * 100) / 100;
        }
        text = white_or_black({
          r: start_r,
          g: start_g,
          b: start_b,
          alpha: alpha
        });
        background = "rgba(" + start_r + ", " + start_g + ", " + start_b + ", " + alpha + ")";
      }
    }
    computed_colors[npn_index] = {
      text: text,
      background: background
    };
  }
  return computed_colors[npn_index];
}

/* les style css */
var style = document.createElement("style");
style.setAttribute("type", "text/css");
style.textContent =
  "#npn_help{position:fixed;width:200px;height:auto;background-color:#e3ebf5;z-index:1003;" +
  "visibility:hidden;border:2px solid #6995c3;border-radius:8px;padding:4px 7px 5px;" +
  "font-family:Verdana,Arial,Sans-serif,Helvetica;font-size:11px;font-weight:bold;" +
  "text-align:justify;}" +
  "#npn_background{position:fixed;left:0;top:0;background-color:#242424;z-index:1001;" +
  "visibility:hidden;opacity:0;transition:opacity 0.7s ease 0s;}" +
  "#npn_config{position:fixed;width:465px;height:auto;background:#ffffff;z-index:1002;" +
  "visibility:hidden;opacity:0;transition:opacity 0.7s ease 0s;font-size:12px;" +
  "border:1px solid black;padding:16px 16px 12px;font-family:Verdana,Arial,Sans-serif,Helvetica;}" +
  "#npn_config fieldset{margin:8px 0 0;border:1px solid #888888;padding:4px 10px 10px;" +
  "background:linear-gradient(to bottom, #ffffff 20px, transparent);" +
  "transition:background-color 0.5s ease 0s;}" +
  "#npn_config fieldset.npn_red{background-color:#ffc0b0;}" +
  "#npn_config fieldset.npn_green{background-color:#c0ffb0;}" +
  "#npn_config legend{font-size:14px;font-weight:normal;}" +
  "#npn_config p{font-size:12px;font-weight:normal;font-family:Verdana,Arial,Sans-serif,Helvetica;}" +
  "#npn_config legend{background-color:#ffffff;}" +
  "#npn_config legend.npn_alone{padding:0 3px 2px;}" +
  "#npn_config p{margin:4px 0 0;line-height:1.4;}" +
  "#npn_config input[type=checkbox]{margin:0 0 1px;vertical-align:text-bottom;}" +
  "#npn_config legend input[type=checkbox]{margin-left:2px;}" +
  "#npn_config input[type=text]{padding:0 1px;border:1px solid #c0c0c0;height:14px;" +
  "font-size:12px;font-family:Verdana,Arial,Sans-serif,Helvetica;font-weight:normal;}" +
  "#npn_config input[type=color]{padding:0;width:30px;height:15px;border:1px solid #c0c0c0;}" +
  "#npn_config input[type=radio]{margin:0 0 2px;vertical-align:text-bottom;}" +
  "#npn_config img{vertical-align:text-bottom;}" +
  "#npn_config img.npn_help{margin-right:1px;cursor:help;}" +
  "#npn_config img.npn_test{margin:0 2px 2px 0;vertical-align:middle;}" +
  "#npn_config img.npn_reset{cursor:pointer;margin:0 0 2px 2px;vertical-align:middle;}" +
  "#npn_config table{border-collapse:collapse;}" +
  "#npn_config div.npn_titre{margin-bottom:16px;text-align:center;font-weight:bold;font-size:16px;}" +
  "#npn_config div.npn_di_saveclose{margin-top:16px;text-align:right;}" +
  "#npn_config div.npn_di_saveclose img{margin-left:8px;cursor:pointer;}";
document.getElementsByTagName("head")[0].appendChild(style);

/* popup d'aide */
var npn_help = document.createElement("div");
npn_help.setAttribute("id", "npn_help");
document.body.appendChild(npn_help);

/* bouton d'aide */
function create_help_button(taille, help_text) {
  let help_button = document.createElement("img");
  help_button.setAttribute("src", help_img);
  help_button.setAttribute("class", "npn_help");
  help_button.addEventListener("mouseover", function(e) {
    npn_help.style.width = taille + "px";
    npn_help.textContent = help_text;
    npn_help.style.left = (e.clientX + 32) + "px";
    npn_help.style.top = (e.clientY - 16) + "px";
    npn_help.style.visibility = "visible";
  }, false);
  help_button.addEventListener("mouseout", function(e) {
    npn_help.style.visibility = "hidden";
  }, false);
  return help_button;
}

/* background pour la fenêtre de configuration */
var npn_background = document.createElement("div");
npn_background.setAttribute("id", "npn_background");
npn_background.addEventListener("click", hideconfig, false);
npn_background.addEventListener("transitionend", backgroundtransitionend, false);
document.body.appendChild(npn_background);

/* fenêtre de configuration */
var npn_config = document.createElement("div");
npn_config.setAttribute("id", "npn_config");
document.body.appendChild(npn_config);

/* titre de la fenêtre de configuration */
var npn_di_title = document.createElement("div");
npn_di_title.setAttribute("class", "npn_titre");
npn_di_title.appendChild(document.createTextNode("Configuration du script " + script_name));
npn_config.appendChild(npn_di_title);

/* options du bouton */
var npn_fs_button = document.createElement("fieldset");
var npn_lg_button = document.createElement("legend");
var npn_cb_button = document.createElement("input");
npn_cb_button.setAttribute("id", "npn_cb_button");
npn_cb_button.setAttribute("type", "checkbox");

function change_button() {
  if(npn_cb_button.checked) {
    npn_fs_button.setAttribute("class", "npn_green");
  } else {
    npn_fs_button.setAttribute("class", "npn_red");
  }
}
npn_cb_button.addEventListener("change", change_button, false);
npn_lg_button.appendChild(npn_cb_button);
var npn_lb_button = document.createElement("label");
npn_lb_button.appendChild(document.createTextNode(" afficher le bouton du script sur la page des drapals "));
npn_lb_button.setAttribute("for", "npn_cb_button");
npn_lg_button.appendChild(npn_lb_button);
npn_lg_button.appendChild(create_help_button(250,
  "Le bouton du script permet d'ouvrir cette fenêtre de " +
  "configuration mais cette dernière reste accessible " +
  "via le menu Greasemokey si celui-ci existe."));
npn_fs_button.appendChild(npn_lg_button);
npn_config.appendChild(npn_fs_button);

/* icône du bouton */
var npn_p_button = document.createElement("p");
npn_p_button.appendChild(document.createTextNode("icône du bouton : "));
var npn_img_button = document.createElement("img");
npn_img_button.setAttribute("class", "npn_test");
npn_p_button.appendChild(npn_img_button);
var npn_in_button = document.createElement("input");
npn_in_button.setAttribute("type", "text");
npn_in_button.setAttribute("size", "40");
npn_in_button.setAttribute("title", "url de l'icône (http ou data)");
npn_in_button.addEventListener("click", function() {
  npn_in_button.select();
}, false);

function test_icon() {
  npn_img_button.setAttribute("src", npn_in_button.value.trim());
  npn_in_button.setSelectionRange(0, 0);
  npn_in_button.blur();
}
npn_in_button.addEventListener("input", test_icon, false);
npn_p_button.appendChild(npn_in_button);
var npn_img_button_reset = document.createElement("img");
npn_img_button_reset.setAttribute("src", reset_icon);
npn_img_button_reset.setAttribute("class", "npn_reset");
npn_img_button_reset.setAttribute("title", "remettre l'icône par défaut");

function reset_button() {
  npn_in_button.value = default_icon;
  test_icon();
}
npn_img_button_reset.addEventListener("click", reset_button, false);
npn_p_button.appendChild(npn_img_button_reset);
npn_fs_button.appendChild(npn_p_button);

/* overture en masse */
var npn_fs_mass = document.createElement("fieldset");
var npn_lg_mass = document.createElement("legend");
var npn_cb_mass = document.createElement("input");
npn_cb_mass.setAttribute("id", "npn_cb_mass");
npn_cb_mass.setAttribute("type", "checkbox");

function change_mass() {
  if(npn_cb_mass.checked) {
    npn_fs_mass.setAttribute("class", "npn_green");
  } else {
    npn_fs_mass.setAttribute("class", "npn_red");
  }
}
npn_cb_mass.addEventListener("change", change_mass, false);
npn_lg_mass.appendChild(npn_cb_mass);
var npn_lb_mass = document.createElement("label");
npn_lb_mass.appendChild(document.createTextNode(" activer l'ouverture en masse des pages en retard "));
npn_lb_mass.setAttribute("for", "npn_cb_mass");
npn_lg_mass.appendChild(npn_lb_mass);
npn_lg_mass.appendChild(create_help_button(225,
  "Permet d'ouvrir un nombre paramétrable " +
  "de pages en retard avec un clic-milieu sur le drapal."));
npn_fs_mass.appendChild(npn_lg_mass);
npn_config.appendChild(npn_fs_mass);

/* max tab et reverse order */
var npn_p_maxtab = document.createElement("p");
npn_p_maxtab.appendChild(document.createTextNode("nombre maximum d'onglets à ouvrir simultanément : "));
var npn_in_maxtab = document.createElement("input");
npn_in_maxtab.setAttribute("type", "text");
npn_in_maxtab.setAttribute("size", "2");
npn_in_maxtab.setAttribute("maxLength", "2");
npn_in_maxtab.setAttribute("pattern", "[1-9]([0-9])?");
npn_in_maxtab.setAttribute("title", "de 1 à 99 onglets");
npn_in_maxtab.style.textAlign = "right";
npn_in_maxtab.addEventListener("click", function() {
  npn_in_maxtab.select();
}, false);
npn_p_maxtab.appendChild(npn_in_maxtab);
npn_fs_mass.appendChild(npn_p_maxtab);
var npn_p_reverseorder = document.createElement("p");
var npn_cb_reverseorder = document.createElement("input");
npn_cb_reverseorder.setAttribute("id", "npn_cb_reverseorder");
npn_cb_reverseorder.setAttribute("type", "checkbox");
var npn_lb_reverseorder = document.createElement("label");
npn_lb_reverseorder.appendChild(document.createTextNode(" inverser l'ordre des onglets "));
npn_lb_reverseorder.setAttribute("for", "npn_cb_reverseorder");
npn_p_reverseorder.appendChild(npn_cb_reverseorder);
npn_p_reverseorder.appendChild(npn_lb_reverseorder);
npn_p_reverseorder.appendChild(create_help_button(250,
  "Certaines configurations ont l'ordre des onglets " +
  "inversé, cette option permet de les remettre à l'endroit."));
npn_fs_mass.appendChild(npn_p_reverseorder);

/* dégradé */
var npn_fs_gradient = document.createElement("fieldset");
var npn_lg_gradient = document.createElement("legend");
var npn_cb_gradient = document.createElement("input");
npn_cb_gradient.setAttribute("id", "npn_cb_gradient");
npn_cb_gradient.setAttribute("type", "checkbox");

function change_gradient() {
  if(npn_cb_gradient.checked) {
    npn_fs_gradient.setAttribute("class", "npn_green");
  } else {
    npn_fs_gradient.setAttribute("class", "npn_red");
  }
}
npn_cb_gradient.addEventListener("change", change_gradient, false);
npn_lg_gradient.appendChild(npn_cb_gradient);
var npn_lb_gradient = document.createElement("label");
npn_lb_gradient.appendChild(document.createTextNode(" activer le dégradé sur la case du drapal "));
npn_lb_gradient.setAttribute("for", "npn_cb_gradient");
npn_lg_gradient.appendChild(npn_lb_gradient);
npn_lg_gradient.appendChild(create_help_button(225,
  "Permet de visualiser en couleur les topics les plus en retard."));
npn_fs_gradient.appendChild(npn_lg_gradient);
npn_config.appendChild(npn_fs_gradient);

/* couleurs de début */
var npn_p_color_start = document.createElement("p");
npn_p_color_start.appendChild(document.createTextNode("couleur de début :"));
npn_p_color_start.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
var npn_rd_color_start_auto = document.createElement("input");
npn_rd_color_start_auto.setAttribute("id", "npn_rb_color_start_auto");
npn_rd_color_start_auto.setAttribute("name", "npn_rb_color_start");
npn_rd_color_start_auto.setAttribute("type", "radio");
npn_p_color_start.appendChild(npn_rd_color_start_auto);
var npn_lb_color_start_auto = document.createElement("label");
npn_lb_color_start_auto.appendChild(document.createTextNode(" auto "));
npn_lb_color_start_auto.setAttribute("for", "npn_rb_color_start_auto");
npn_p_color_start.appendChild(npn_lb_color_start_auto);
var npn_co_color_start_auto = document.createElement("input");
npn_co_color_start_auto.setAttribute("id", "npn_co_color_start_auto");
npn_co_color_start_auto.setAttribute("type", "color");
npn_co_color_start_auto.setAttribute("disabled", "true");
npn_p_color_start.appendChild(npn_co_color_start_auto);
npn_p_color_start.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
var npn_rd_color_start_trans = document.createElement("input");
npn_rd_color_start_trans.setAttribute("id", "npn_rb_color_start_trans");
npn_rd_color_start_trans.setAttribute("name", "npn_rb_color_start");
npn_rd_color_start_trans.setAttribute("type", "radio");
npn_p_color_start.appendChild(npn_rd_color_start_trans);
var npn_lb_color_start_trans = document.createElement("label");
npn_lb_color_start_trans.appendChild(document.createTextNode(" transparent"));
npn_lb_color_start_trans.setAttribute("for", "npn_rb_color_start_trans");
npn_p_color_start.appendChild(npn_lb_color_start_trans);
npn_p_color_start.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
var npn_rd_color_start_perso = document.createElement("input");
npn_rd_color_start_perso.setAttribute("id", "npn_rb_color_start_perso");
npn_rd_color_start_perso.setAttribute("name", "npn_rb_color_start");
npn_rd_color_start_perso.setAttribute("type", "radio");
npn_p_color_start.appendChild(npn_rd_color_start_perso);
var npn_lb_color_start_perso = document.createElement("label");
npn_lb_color_start_perso.appendChild(document.createTextNode(" perso "));
npn_lb_color_start_perso.setAttribute("for", "npn_rb_color_start_perso");
npn_p_color_start.appendChild(npn_lb_color_start_perso);
var npn_co_color_start_perso = document.createElement("input");
npn_co_color_start_perso.setAttribute("id", "npn_co_color_start_perso");
npn_co_color_start_perso.setAttribute("type", "color");

function change_color_start_perso() {
  npn_co_color_start_perso.setAttribute("title", npn_co_color_start_perso.value.toLowerCase());
}
npn_co_color_start_perso.addEventListener("change", change_color_start_perso, false);
npn_p_color_start.appendChild(npn_co_color_start_perso);
var npn_img_color_start_perso_reset = document.createElement("img");
npn_img_color_start_perso_reset.setAttribute("src", reset_icon);
npn_img_color_start_perso_reset.setAttribute("class", "npn_reset");
npn_img_color_start_perso_reset.setAttribute("title", "remettre la couleur par défaut");

function reset_color_start_perso() {
  npn_co_color_start_perso.value = default_color_start_perso;
  change_color_start_perso();
}
npn_img_color_start_perso_reset.addEventListener("click", reset_color_start_perso, false);
npn_p_color_start.appendChild(npn_img_color_start_perso_reset);
npn_fs_gradient.appendChild(npn_p_color_start);

/* couleurs de fin */
var npn_p_color_end = document.createElement("p");
npn_p_color_end.appendChild(document.createTextNode("couleur de fin :"));
npn_p_color_end.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
var npn_rd_color_end_auto = document.createElement("input");
npn_rd_color_end_auto.setAttribute("id", "npn_rb_color_end_auto");
npn_rd_color_end_auto.setAttribute("name", "npn_rb_color_end");
npn_rd_color_end_auto.setAttribute("type", "radio");
npn_p_color_end.appendChild(npn_rd_color_end_auto);
var npn_lb_color_end_auto = document.createElement("label");
npn_lb_color_end_auto.appendChild(document.createTextNode(" auto "));
npn_lb_color_end_auto.setAttribute("for", "npn_rb_color_end_auto");
npn_p_color_end.appendChild(npn_lb_color_end_auto);
var npn_co_color_end_auto = document.createElement("input");
npn_co_color_end_auto.setAttribute("id", "npn_co_color_end_auto");
npn_co_color_end_auto.setAttribute("type", "color");
npn_co_color_end_auto.setAttribute("disabled", "true");
npn_p_color_end.appendChild(npn_co_color_end_auto);
npn_p_color_end.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
var npn_rd_color_end_trans = document.createElement("input");
npn_rd_color_end_trans.setAttribute("id", "npn_rb_color_end_trans");
npn_rd_color_end_trans.setAttribute("name", "npn_rb_color_end");
npn_rd_color_end_trans.setAttribute("type", "radio");
npn_p_color_end.appendChild(npn_rd_color_end_trans);
var npn_lb_color_end_trans = document.createElement("label");
npn_lb_color_end_trans.appendChild(document.createTextNode(" transparent"));
npn_lb_color_end_trans.setAttribute("for", "npn_rb_color_end_trans");
npn_p_color_end.appendChild(npn_lb_color_end_trans);
npn_p_color_end.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
var npn_rd_color_end_perso = document.createElement("input");
npn_rd_color_end_perso.setAttribute("id", "npn_rb_color_end_perso");
npn_rd_color_end_perso.setAttribute("name", "npn_rb_color_end");
npn_rd_color_end_perso.setAttribute("type", "radio");
npn_p_color_end.appendChild(npn_rd_color_end_perso);
var npn_lb_color_end_perso = document.createElement("label");
npn_lb_color_end_perso.appendChild(document.createTextNode(" perso "));
npn_lb_color_end_perso.setAttribute("for", "npn_rb_color_end_perso");
npn_p_color_end.appendChild(npn_lb_color_end_perso);
var npn_co_color_end_perso = document.createElement("input");
npn_co_color_end_perso.setAttribute("id", "npn_co_color_end_perso");
npn_co_color_end_perso.setAttribute("type", "color");

function change_color_end_perso() {
  npn_co_color_end_perso.setAttribute("title", npn_co_color_end_perso.value.toLowerCase());
}
npn_co_color_end_perso.addEventListener("change", change_color_end_perso, false);
npn_p_color_end.appendChild(npn_co_color_end_perso);
var npn_img_color_end_perso_reset = document.createElement("img");
npn_img_color_end_perso_reset.setAttribute("src", reset_icon);
npn_img_color_end_perso_reset.setAttribute("class", "npn_reset");
npn_img_color_end_perso_reset.setAttribute("title", "remettre la couleur par défaut");

function reset_color_end_perso() {
  npn_co_color_end_perso.value = default_color_end_perso;
  change_color_end_perso();
}
npn_img_color_end_perso_reset.addEventListener("click", reset_color_end_perso, false);
npn_p_color_end.appendChild(npn_img_color_end_perso_reset);
npn_fs_gradient.appendChild(npn_p_color_end);

/* limite */
var npn_p_limit = document.createElement("p");
npn_p_limit.appendChild(document.createTextNode("limite pour la couleur de fin :"));
npn_p_limit.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
var npn_rd_limit_fixed = document.createElement("input");
npn_rd_limit_fixed.setAttribute("id", "npn_rb_limit_fixed");
npn_rd_limit_fixed.setAttribute("name", "npn_rb_limit");
npn_rd_limit_fixed.setAttribute("type", "radio");
npn_p_limit.appendChild(npn_rd_limit_fixed);
var npn_lb_limit_fixed = document.createElement("label");
npn_lb_limit_fixed.appendChild(document.createTextNode(" fixé "));
npn_lb_limit_fixed.setAttribute("for", "npn_rb_limit_fixed");
npn_p_limit.appendChild(npn_lb_limit_fixed);
var npn_in_limit_fixed = document.createElement("input");
npn_in_limit_fixed.setAttribute("id", "npn_in_limit_fixed");
npn_in_limit_fixed.setAttribute("type", "text");
npn_in_limit_fixed.setAttribute("size", "3");
npn_in_limit_fixed.setAttribute("maxLength", "5");
npn_in_limit_fixed.setAttribute("pattern", "[1-9]([0-9])*");
npn_in_limit_fixed.setAttribute("title", "nombre de pages nécéssaires pour atteindre la couleur de fin");
npn_in_limit_fixed.style.textAlign = "right";
npn_in_limit_fixed.addEventListener("click", function() {
  npn_in_limit_fixed.select();
}, false);
npn_p_limit.appendChild(npn_in_limit_fixed);
npn_p_limit.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
var npn_rd_limit_auto = document.createElement("input");
npn_rd_limit_auto.setAttribute("id", "npn_rb_limit_auto");
npn_rd_limit_auto.setAttribute("name", "npn_rb_limit");
npn_rd_limit_auto.setAttribute("type", "radio");
npn_p_limit.appendChild(npn_rd_limit_auto);
var npn_lb_limit_auto = document.createElement("label");
npn_lb_limit_auto.appendChild(document.createTextNode(" automatique "));
npn_lb_limit_auto.setAttribute("for", "npn_rb_limit_auto");
npn_p_limit.appendChild(npn_lb_limit_auto);
npn_p_limit.appendChild(create_help_button(225,
  "En mode automatique la limite est déterminé en " +
  "fonction du topic ayant le plus de pages en retard."));
npn_fs_gradient.appendChild(npn_p_limit);

/* progression */
var npn_p_progress = document.createElement("p");
npn_p_progress.appendChild(document.createTextNode("progression du dégradé :"));
npn_p_progress.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
var npn_rd_progress_lin = document.createElement("input");
npn_rd_progress_lin.setAttribute("id", "npn_rb_progress_lin");
npn_rd_progress_lin.setAttribute("name", "npn_rb_progress");
npn_rd_progress_lin.setAttribute("type", "radio");
npn_p_progress.appendChild(npn_rd_progress_lin);
var npn_lb_progress_lin = document.createElement("label");
npn_lb_progress_lin.appendChild(document.createTextNode(" linéaire"));
npn_lb_progress_lin.setAttribute("for", "npn_rb_progress_lin");
npn_p_progress.appendChild(npn_lb_progress_lin);
npn_p_progress.appendChild(document.createTextNode("\u00A0\u00A0\u00A0\u00A0"));
var npn_rd_progress_log = document.createElement("input");
npn_rd_progress_log.setAttribute("id", "npn_rb_progress_log");
npn_rd_progress_log.setAttribute("name", "npn_rb_progress");
npn_rd_progress_log.setAttribute("type", "radio");
npn_p_progress.appendChild(npn_rd_progress_log);
var npn_lb_progress_log = document.createElement("label");
npn_lb_progress_log.appendChild(document.createTextNode(" logarithmique "));
npn_lb_progress_log.setAttribute("for", "npn_rb_progress_log");
npn_p_progress.appendChild(npn_lb_progress_log);
npn_p_progress.appendChild(create_help_button(200,
  "La progression logarithmique est plus adaptée lorsqu'il y a " +
  "une forte disparité dans les nombres des pages en retard."));
npn_fs_gradient.appendChild(npn_p_progress);

/* option_diverses : smaller_text, go_top, refresh_click, display_totals et refresh_page */
var npn_fs_misc = document.createElement("fieldset");
var npn_lg_misc = document.createElement("legend");
npn_lg_misc.appendChild(document.createTextNode("options diverses"));
npn_lg_misc.setAttribute("class", "npn_alone");
npn_fs_misc.appendChild(npn_lg_misc);
npn_config.appendChild(npn_fs_misc);
var npn_p_smallertext = document.createElement("p");
var npn_cb_smallertext = document.createElement("input");
npn_cb_smallertext.setAttribute("id", "npn_cb_smallertext");
npn_cb_smallertext.setAttribute("type", "checkbox");
var npn_lb_smallertext = document.createElement("label");
npn_lb_smallertext.appendChild(document.createTextNode(" réduire la taille du texte des nombres "));
npn_lb_smallertext.setAttribute("for", "npn_cb_smallertext");
npn_p_smallertext.appendChild(npn_cb_smallertext);
npn_p_smallertext.appendChild(npn_lb_smallertext);
npn_p_smallertext.appendChild(create_help_button(225,
  "Cette option permet de réduire légèrement la taille de la " +
  "police utilisée pour afficher le nombre des pages en retard."));
npn_fs_misc.appendChild(npn_p_smallertext);
var npn_p_gotop = document.createElement("p");
var npn_cb_gotop = document.createElement("input");
npn_cb_gotop.setAttribute("id", "npn_cb_gotop");
npn_cb_gotop.setAttribute("type", "checkbox");
var npn_lb_gotop = document.createElement("label");
npn_lb_gotop.appendChild(document.createTextNode(" ouvrir les nouvelles pages en haut des messages "));
npn_lb_gotop.setAttribute("for", "npn_cb_gotop");
npn_p_gotop.appendChild(npn_cb_gotop);
npn_p_gotop.appendChild(npn_lb_gotop);
npn_p_gotop.appendChild(create_help_button(250,
  "Cette option permet de charger les nouvelles pages directement en " +
  "haut du tableau des messages au lieu de les charger en haut de la page."));
npn_fs_misc.appendChild(npn_p_gotop);
var npn_p_refreshclick = document.createElement("p");
var npn_cb_refreshclick = document.createElement("input");
npn_cb_refreshclick.setAttribute("id", "npn_cb_refreshclick");
npn_cb_refreshclick.setAttribute("type", "checkbox");
var npn_lb_refreshclick = document.createElement("label");
npn_lb_refreshclick.appendChild(document.createTextNode(" recharger la page des drapals "));
npn_lb_refreshclick.setAttribute("for", "npn_cb_refreshclick");
var npn_in_refreshclick = document.createElement("input");
npn_in_refreshclick.setAttribute("id", "npn_in_refreshclick");
npn_in_refreshclick.setAttribute("type", "text");
npn_in_refreshclick.setAttribute("size", "2");
npn_in_refreshclick.setAttribute("maxLength", "2");
npn_in_refreshclick.setAttribute("pattern", "[1-9]([0-9])?");
npn_in_refreshclick.setAttribute("title", "de 1 à 99 secondes");
npn_in_refreshclick.style.textAlign = "right";
npn_in_refreshclick.addEventListener("click", function() {
  npn_in_refreshclick.select();
}, false);
var npn_lb_in_refreshclick = document.createElement("label");
npn_lb_in_refreshclick.appendChild(document.createTextNode(" secondes après un clic "));
npn_lb_in_refreshclick.setAttribute("for", "npn_in_refreshclick");
npn_p_refreshclick.appendChild(npn_cb_refreshclick);
npn_p_refreshclick.appendChild(npn_lb_refreshclick);
npn_p_refreshclick.appendChild(npn_in_refreshclick);
npn_p_refreshclick.appendChild(npn_lb_in_refreshclick);
npn_p_refreshclick.appendChild(create_help_button(250,
  "Cette option permet de recharger automatiquement la page " +
  "des drapals après l'ouverture d'un drapal vers un nouvel onglet."));
npn_fs_misc.appendChild(npn_p_refreshclick);
var npn_p_displaytotals = document.createElement("p");
var npn_cb_displaytotals = document.createElement("input");
npn_cb_displaytotals.setAttribute("id", "npn_cb_displaytotals");
npn_cb_displaytotals.setAttribute("type", "checkbox");
var npn_lb_displaytotals = document.createElement("label");
npn_lb_displaytotals.appendChild(document.createTextNode(" afficher le nombre total de pages en retard "));
npn_lb_displaytotals.setAttribute("for", "npn_cb_displaytotals");
npn_p_displaytotals.appendChild(npn_cb_displaytotals);
npn_p_displaytotals.appendChild(npn_lb_displaytotals);
npn_p_displaytotals.appendChild(create_help_button(250,
  "Cette option permet d'afficher le nombre total de pages en retard " +
  "et le nombre total de topics dans la case \"Sujet\" du tableau des topics."));
npn_fs_misc.appendChild(npn_p_displaytotals);
var npn_p_refreshpage = document.createElement("p");
var npn_cb_refreshpage = document.createElement("input");
npn_cb_refreshpage.setAttribute("id", "npn_cb_refreshpage");
npn_cb_refreshpage.setAttribute("type", "checkbox");
var npn_lb_refreshpage = document.createElement("label");
npn_lb_refreshpage.appendChild(document.createTextNode(" recharger la page des drapals toutes les  "));
npn_lb_refreshpage.setAttribute("for", "npn_cb_refreshpage");
var npn_in_refreshpage = document.createElement("input");
npn_in_refreshpage.setAttribute("id", "npn_in_refreshpage");
npn_in_refreshpage.setAttribute("type", "text");
npn_in_refreshpage.setAttribute("size", "2");
npn_in_refreshpage.setAttribute("maxLength", "2");
npn_in_refreshpage.setAttribute("pattern", "[1-9]([0-9])?");
npn_in_refreshpage.setAttribute("title", "de 1 à 99 minutes");
npn_in_refreshpage.style.textAlign = "right";
npn_in_refreshpage.addEventListener("click", function() {
  npn_in_refreshpage.select();
}, false);
var npn_lb_in_refreshpage = document.createElement("label");
npn_lb_in_refreshpage.appendChild(document.createTextNode(" minutes "));
npn_lb_in_refreshpage.setAttribute("for", "npn_in_refreshpage");
npn_p_refreshpage.appendChild(npn_cb_refreshpage);
npn_p_refreshpage.appendChild(npn_lb_refreshpage);
npn_p_refreshpage.appendChild(npn_in_refreshpage);
npn_p_refreshpage.appendChild(npn_lb_in_refreshpage);
npn_p_refreshpage.appendChild(create_help_button(250,
  "Cette option permet de recharger régulièrement et automatiquement la page des drapals."));
npn_fs_misc.appendChild(npn_p_refreshpage);

/* les boutons valider / annuler */
var npn_di_saveclose = document.createElement("div");
npn_di_saveclose.setAttribute("class", "npn_di_saveclose");
var npn_img_save = document.createElement("img");
npn_img_save.setAttribute("src", save_icon);
npn_img_save.setAttribute("title", "Valider");
npn_img_save.addEventListener("click", saveconfig, false);
npn_di_saveclose.appendChild(npn_img_save);
var npn_img_close = document.createElement("img");
npn_img_close.setAttribute("src", close_icon);
npn_img_close.setAttribute("title", "Annuler");
npn_img_close.addEventListener("click", hideconfig, false);
npn_di_saveclose.appendChild(npn_img_close);
npn_config.appendChild(npn_di_saveclose);

/* fonction de validation des options */
function saveconfig() {
  // sauvegarde des options de la fenêtre de configuration
  display_button = npn_cb_button.checked;
  GM.setValue("display_button", display_button);
  button_icon = npn_in_button.value.trim();
  if(button_icon === "") {
    button_icon = default_icon;
  }
  GM.setValue("button_icon", button_icon);
  mass_opener = npn_cb_mass.checked;
  GM.setValue("mass_opener", mass_opener);
  max_tab = parseInt(npn_in_maxtab.value.trim(), 10);
  max_tab = Math.max(max_tab, 1);
  max_tab = Math.min(max_tab, 99);
  if(isNaN(max_tab)) max_tab = default_max_tab;
  GM.setValue("max_tab", max_tab);
  reverse_order = npn_cb_reverseorder.checked;
  GM.setValue("reverse_order", reverse_order);
  color_gradient = npn_cb_gradient.checked;
  GM.setValue("color_gradient", color_gradient);
  color_start_type = npn_rd_color_start_auto.checked ? "auto" :
    npn_rd_color_start_trans.checked ? "trans" : "perso";
  GM.setValue("color_start_type", color_start_type);
  color_start_perso = npn_co_color_start_perso.value.toLowerCase();
  GM.setValue("color_start_perso", color_start_perso);
  color_end_type = npn_rd_color_end_auto.checked ? "auto" :
    npn_rd_color_end_trans.checked ? "trans" : "perso";
  GM.setValue("color_end_type", color_end_type);
  color_end_perso = npn_co_color_end_perso.value.toLowerCase();
  GM.setValue("color_end_perso", color_end_perso);
  limit_type = npn_rd_limit_fixed.checked ? "fixed" : "auto";
  GM.setValue("limit_type", limit_type);
  fixed_limit = parseInt(npn_in_limit_fixed.value.trim(), 10);
  fixed_limit = Math.max(fixed_limit, 1);
  fixed_limit = Math.min(fixed_limit, 99999);
  if(isNaN(fixed_limit)) fixed_limit = default_fixed_limit;
  GM.setValue("fixed_limit", fixed_limit);
  progress_type = npn_rd_progress_lin.checked ? "lin" : "log";
  GM.setValue("progress_type", progress_type);
  smaller_text = npn_cb_smallertext.checked;
  GM.setValue("smaller_text", smaller_text);
  go_top = npn_cb_gotop.checked;
  hash_haut = go_top ? "#haut" : "";
  GM.setValue("go_top", go_top);
  refresh_click = npn_cb_refreshclick.checked;
  GM.setValue("refresh_click", refresh_click);
  delay_click = parseInt(npn_in_refreshclick.value.trim(), 10);
  delay_click = Math.max(delay_click, 1);
  delay_click = Math.min(delay_click, 99);
  if(isNaN(delay_click)) delay_click = default_delay_click;
  GM.setValue("delay_click", delay_click);
  display_totals = npn_cb_displaytotals.checked;
  GM.setValue("display_totals", display_totals);
  refresh_page = npn_cb_refreshpage.checked;
  GM.setValue("refresh_page", refresh_page);
  delay_page = parseInt(npn_in_refreshpage.value.trim(), 10);
  delay_page = Math.max(delay_page, 1);
  delay_page = Math.min(delay_page, 99);
  if(isNaN(delay_page)) delay_page = default_delay_page;
  GM.setValue("delay_page", delay_page);
  // réinitialisation des computed colors
  computed_colors = {};
  // masquage de la fenêtre de configuration
  hideconfig();
  // application des nouveaux paramètres
  apply_config();
}

/* fonctions d'affichage / masquage de la fenêtre de configuration */
function hideconfig() {
  npn_config.style.opacity = "0";
  npn_background.style.opacity = "0";
  // réactivation des refresh
  if(scheduled_for_refresh) do_refresh_click(null);
  do_refresh_page();
}

function escconfig(e) {
  if(e.code === "Escape") {
    hideconfig();
  }
}

function backgroundtransitionend() {
  if(npn_background.style.opacity === "0") {
    npn_config.style.visibility = "hidden";
    npn_background.style.visibility = "hidden";
    document.removeEventListener("keypress", escconfig, false);
  }
  if(npn_background.style.opacity === "0.8") {
    document.addEventListener("keypress", escconfig, false);
  }
}

function showconfig() {
  // désacivation des refresh
  window.clearTimeout(refresh_click_timer);
  window.clearTimeout(refresh_page_timer);
  // initialisation des options de la fenêtre de configuration
  npn_cb_button.checked = display_button || !gm_menu;
  change_button();
  if(!gm_menu) {
    npn_cb_button.disabled = true;
  }
  npn_in_button.value = button_icon;
  test_icon();
  npn_cb_mass.checked = mass_opener;
  change_mass();
  npn_in_maxtab.value = max_tab;
  npn_cb_reverseorder.checked = reverse_order;
  npn_cb_gradient.checked = color_gradient;
  change_gradient();
  npn_rd_color_start_auto.checked = color_start_type === "auto";
  npn_rd_color_start_trans.checked = color_start_type === "trans";
  npn_rd_color_start_perso.checked = color_start_type === "perso";
  npn_co_color_start_auto.value = color_start_auto;
  npn_co_color_start_auto.setAttribute("title", color_start_auto);
  npn_co_color_start_perso.value = color_start_perso;
  change_color_start_perso();
  npn_rd_color_end_auto.checked = color_end_type === "auto";
  npn_rd_color_end_trans.checked = color_end_type === "trans";
  npn_rd_color_end_perso.checked = color_end_type === "perso";
  npn_co_color_end_auto.value = color_end_auto;
  npn_co_color_end_auto.setAttribute("title", color_end_auto);
  npn_co_color_end_perso.value = color_end_perso;
  change_color_end_perso();
  npn_rd_limit_fixed.checked = limit_type === "fixed";
  npn_rd_limit_auto.checked = limit_type === "auto";
  npn_in_limit_fixed.value = fixed_limit;
  npn_rd_progress_lin.checked = progress_type === "lin";
  npn_rd_progress_log.checked = progress_type === "log";
  npn_cb_smallertext.checked = smaller_text;
  npn_cb_gotop.checked = go_top;
  npn_cb_refreshclick.checked = refresh_click;
  npn_in_refreshclick.value = delay_click;
  npn_cb_displaytotals.checked = display_totals;
  npn_cb_refreshpage.checked = refresh_page;
  npn_in_refreshpage.value = delay_page;
  // affichage de la fenêtre de configuration
  npn_config.style.visibility = "visible";
  npn_background.style.visibility = "visible";
  npn_config.style.left =
    parseInt((document.documentElement.clientWidth - npn_config.offsetWidth) / 2, 10) + "px";
  npn_config.style.top =
    parseInt((document.documentElement.clientHeight - npn_config.offsetHeight) / 2, 10) + "px";
  npn_background.style.width = document.documentElement.scrollWidth + "px";
  npn_background.style.height = document.documentElement.scrollHeight + "px";
  npn_config.style.opacity = "1";
  npn_background.style.opacity = "0.8";
}
if(gm_menu) {
  GM_registerMenuCommand(script_name + " -> Configuration", showconfig);
}

/* affichage du nombre de pages en retard à côté du drapal */
var nb_pages = 0;
var nb_topics = 0;
var rows = document.querySelectorAll("tr[class^=\"sujet ligne_booleen\"]");
for(let row of rows) {
  let case4 = row.querySelector("td.sujetCase4:not(.npn_drapal)");
  let case5 = row.querySelector("td.sujetCase5:not(.npn_drapal)");
  if((case4.firstElementChild !== null) && (case5.firstElementChild !== null)) {
    case4.classList.add("npn_drapal");
    case5.classList.add("npn_drapal");
    let last_page_number = parseInt(case4.firstElementChild.firstChild.nodeValue.trim(), 10);
    let href = case5.firstElementChild.href;
    let current_page_number;
    if(href.indexOf(".htm") !== -1) {
      current_page_number = parseInt(/_([0-9]+)\.htm/.exec(href)[1], 10); // url verbeuse
    } else {
      current_page_number = parseInt(/&page=([0-9]+)&p=/.exec(href)[1], 10); // url à paramètres
    }
    let diff = last_page_number - current_page_number;
    nb_pages += diff + 1;
    if(diff !== 0) {
      case5.firstElementChild.appendChild(document.createTextNode("\u00a0+" + diff));
      case5.firstElementChild.setAttribute("npn_multi_page_nb", diff);
      case5.firstElementChild.setAttribute("class", "cCatTopic");
      case5.firstElementChild.style.textDecoration = "none";
      case5.firstElementChild.firstElementChild.style.verticalAlign = "-2px";
      // gestion de l'effet sur mouseover
      case5.firstElementChild.addEventListener("mouseover", drapal_mouseover, false);
      case5.firstElementChild.addEventListener("mouseout", drapal_mouseout, false);
      if(diff > bigest_page_number) {
        bigest_page_number = diff;
      }
    }
    ++nb_topics;
  } else if(case5.firstElementChild !== null) {
    ++nb_pages;
    ++nb_topics;
  }
  case5.style.whiteSpace = "nowrap";
  case5.style.width = "5%";
}

/* fonction de gestion du mouseover sur les drapals */
function drapal_mouseover() {
  if(mass_opener && (max_tab > 1)) {
    this.style.backgroundColor = "rgba(255,255,255,0.7)";
    this.style.color = "black";
  }
}

/* fonction de gestion du mouseout sur les drapals */
function drapal_mouseout(e) {
  this.style.backgroundColor = "rgba(255,255,255,0)";
  this.style.color = this.getAttribute("npn_saved_color");
}

/* ajout de la gestion du refresh_click sur les drapals */
var drapals1 = document.querySelectorAll("tr[class^=\"sujet ligne_booleen\"] td.sujetCase5 a");
for(let drapal1 of drapals1) {
  drapal1.addEventListener("mouseup", do_refresh_click, false);
}

/* fonctions de gestion de l'ouverture en masse */
var drapals2 = document.querySelectorAll("tr[class^=\"sujet ligne_booleen\"] td.sujetCase5 a[npn_multi_page_nb]");
for(let drapal2 of drapals2) {
  drapal2.dataset.href = drapal2.href;
}

function drapal_mousedown(e) {
  if(e.button === 1 || e.ctrlKey) {
    e.preventDefault();
  }
}

function drapal_mouseup(e) {
  e.preventDefault();
  if(mass_opener && (max_tab > 1) && (e.button === 1) && !e.altKey && !e.shiftKey && !e.metaKey) {
    // construction du tableau des onglets à ouvrir
    let local_max_tab = Math.min(max_tab - 1, parseInt(this.getAttribute("npn_multi_page_nb"), 10));
    let base_url = /^(.*)#t[0-9]+$/.exec(this.dataset.href)[1];
    let url_array = [this.dataset.href];
    if(base_url.indexOf(".htm") !== -1) { // url verbeuse
      let page_number = parseInt(/_([0-9]+)\.htm/.exec(base_url)[1], 10);
      for(let i = 0; i < local_max_tab; ++i) {
        url_array.push(base_url.replace(/_[0-9]+\.htm/, "_" + ++page_number + ".htm") + hash_haut);
      }
    } else { // url à paramètres
      let page_number = parseInt(/&page=([0-9]+)&p=/.exec(base_url)[1], 10);
      for(let i = 0; i < local_max_tab; ++i) {
        url_array.push(base_url.replace(/&page=[0-9]+&p=/, "&page=" + ++page_number + "&p=") + hash_haut);
      }
    }
    // recupération du dernier onglet
    let last_url = url_array[url_array.length - 1];
    // inversion de l'ordre des onglets si nécessaire
    if(!reverse_order) url_array.reverse();
    // ouverture des onglets
    url_array.forEach(function(url) {
      GM.openInTab(url, open_in_background);
    });
    // force l'actualisation du drapal en réouvrant le dernier onglet silencieusement
    let xhr = new XMLHttpRequest();
    xhr.open("GET", last_url);
    xhr.send();
  } else if((e.button === 0) && !e.altKey && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
    window.location.href = this.dataset.href;
  } else if(((e.button === 0) && !e.altKey && !e.shiftKey && !e.metaKey && e.ctrlKey) ||
    ((e.button === 1) && !e.altKey && !e.shiftKey && !e.metaKey)) {
    GM.openInTab(this.dataset.href, open_in_background);
  }
}

function apply_config() {
  /* affichage / masquage du bouton sur la page des drapals */
  let top_row = document.querySelector("table.none tr");
  if(top_row && top_row.cells[0] && top_row.cells[0].firstElementChild) {
    let pouet1 = top_row.cells[0].firstElementChild.querySelector("div#beforNPN");
    let pouet2 = top_row.cells[0].firstElementChild.querySelector("a#ongletNPN");
    let pouet3 = top_row.cells[0].firstElementChild.querySelector("div#afterNPN");
    if(display_button) {
      let district9 = top_row.cells[0].firstElementChild.querySelector("div#befor9");
      if(district9) {
        if(pouet1 && pouet2 && pouet3) {
          pouet2.firstElementChild.setAttribute("src", button_icon);
        } else {
          let div_avant = document.createElement("div");
          div_avant.setAttribute("id", "beforNPN");
          div_avant.setAttribute("class", "beforonglet");
          let div_apres = document.createElement("div");
          div_apres.setAttribute("id", "afterNPN");
          div_apres.setAttribute("class", "afteronglet");
          let onglet = document.createElement("a");
          onglet.setAttribute("id", "ongletNPN");
          onglet.setAttribute("class", "onglet");
          onglet.setAttribute("href", "javascript:void(0)");
          onglet.setAttribute("title", script_name + " -> Configuration");
          onglet.addEventListener("click", showconfig, false);
          let boutton = document.createElement("img");
          boutton.setAttribute("src", button_icon);
          boutton.setAttribute("alt", "NPN");
          onglet.appendChild(boutton);
          top_row.cells[0].firstElementChild.insertBefore(div_avant, district9);
          top_row.cells[0].firstElementChild.insertBefore(onglet, district9);
          top_row.cells[0].firstElementChild.insertBefore(div_apres, district9);
        }
      }
    } else {
      if(pouet1 && pouet2 && pouet3) {
        top_row.cells[0].firstElementChild.removeChild(pouet1);
        top_row.cells[0].firstElementChild.removeChild(pouet2);
        top_row.cells[0].firstElementChild.removeChild(pouet3);
      }
    }
  }
  /* affichage du nombre total de pages en retard et du nombre total de topics */
  let case_sujet = document.querySelector("div#mesdiscussions.mesdiscussions table.main tbody " +
    "tr.cBackHeader.fondForum1Description th:nth-child(3)");
  if(case_sujet && nb_topics > 0) {
    if(display_totals) {
      let text_page = " page";
      if(nb_pages > 1) {
        text_page = " pages";
      }
      let text_topic = " topic";
      if(nb_topics > 1) {
        text_topic = " topics";
      }
      case_sujet.textContent = nb_pages + text_page + " en retard sur " + nb_topics + text_topic;
      case_sujet.style.textAlign = "center";
    } else {
      case_sujet.textContent = "Sujet";
      case_sujet.style.textAlign = "left";
    }
  }
  /* modification des drapeaux */
  // actual bigest page number
  actual_bigest_page_number = limit_type === "fixed" ? fixed_limit : bigest_page_number;
  // gestion des couleurs
  let drapals1 = document.querySelectorAll("tr[class^=\"sujet ligne_booleen\"] td.sujetCase5 a");
  for(let drapal1 of drapals1) {
    if(color_gradient && (color_start_type !== "trans" || color_end_type !== "trans")) {
      let colors = !drapal1.hasAttribute("npn_multi_page_nb") ? compute_colors(0) :
        compute_colors(Math.min(actual_bigest_page_number,
          parseInt(drapal1.getAttribute("npn_multi_page_nb"), 10)));
      drapal1.setAttribute("npn_saved_color", colors.text);
      drapal1.style.color = colors.text;
      drapal1.parentElement.style.backgroundColor = colors.background;
    } else {
      drapal1.setAttribute("npn_saved_color", color_text);
      drapal1.style.color = color_text;
      drapal1.parentElement.style.backgroundColor = "transparent";
    }
  }
  let drapals2 = document.querySelectorAll("a[npn_multi_page_nb]");
  for(let drapal2 of drapals2) {
    // taille du texte
    if(smaller_text) {
      drapal2.style.fontSize = "9px";
      if(drapal2.firstElementChild.src.includes("/themes_static/images/CrystalXP/")) {
        drapal2.style.padding = "7px 7px 3px";
      } else if(drapal2.firstElementChild.src.includes("/themes_static/images/silk/")) {
        drapal2.style.padding = "6px 7px 4px";
      } else {
        drapal2.style.padding = "5px 7px";
      }
    } else {
      drapal2.style.fontSize = "small";
      drapal2.style.padding = "3px 7px 2px";
    }
    // gestion du title (tooltip) sur le nombre de pages en retard
    // et gestion de l'ouverture en masse
    if(mass_opener && (max_tab > 1)) {
      let diff = parseInt(drapal2.getAttribute("npn_multi_page_nb"), 10);
      let local_max_tab = Math.min(max_tab - 1, diff) + 1;
      if(diff > (max_tab - 1)) {
        drapal2.title = "clic-milieu pour ouvrir les " + local_max_tab + " prochaines pages en retard";
      } else {
        drapal2.title = "clic-milieu pour ouvrir les " + local_max_tab + " pages en retard";
      }
      drapal2.removeAttribute("href");
      drapal2.style.cursor = "pointer";
      drapal2.addEventListener("mousedown", drapal_mousedown, false);
      drapal2.addEventListener("mouseup", drapal_mouseup, false);
    } else {
      drapal2.title = drapal2.firstElementChild.title;
      drapal2.setAttribute("href", drapal2.dataset.href);
      drapal2.style.cursor = "";
      drapal2.removeEventListener("mousedown", drapal_mousedown, false);
      drapal2.removeEventListener("mouseup", drapal_mouseup, false);
    }
  }
}

Promise.all([
  GM.getValue("display_button", true),
  GM.getValue("button_icon", default_icon),
  GM.getValue("mass_opener", false),
  GM.getValue("max_tab", default_max_tab),
  GM.getValue("reverse_order", false),
  GM.getValue("color_gradient", true),
  GM.getValue("color_start_type", "auto"), // "auto" "trans" "perso"
  GM.getValue("color_end_type", "auto"), // "auto" "trans" "perso"
  GM.getValue("color_start_perso", default_color_start_perso),
  GM.getValue("color_end_perso", default_color_end_perso),
  GM.getValue("limit_type", "fixed"), // "fixed" "auto"
  GM.getValue("fixed_limit", default_fixed_limit),
  GM.getValue("progress_type", "lin"), // "lin" "log"
  GM.getValue("smaller_text", false),
  GM.getValue("go_top", false),
  GM.getValue("refresh_click", false),
  GM.getValue("delay_click", default_delay_click),
  GM.getValue("display_totals", true),
  GM.getValue("refresh_page", false),
  GM.getValue("delay_page", default_delay_page),
]).then(function([
  display_button_value,
  button_icon_value,
  mass_opener_value,
  max_tab_value,
  reverse_order_value,
  color_gradient_value,
  color_start_type_value,
  color_end_type_value,
  color_start_perso_value,
  color_end_perso_value,
  limit_type_value,
  fixed_limit_value,
  progress_type_value,
  smaller_text_value,
  go_top_value,
  refresh_click_value,
  delay_click_value,
  display_totals_value,
  refresh_page_value,
  delay_page_value,
]) {
  display_button = display_button_value;
  button_icon = button_icon_value;
  mass_opener = mass_opener_value;
  max_tab = max_tab_value;
  reverse_order = reverse_order_value;
  color_gradient = color_gradient_value;
  color_start_type = color_start_type_value;
  color_end_type = color_end_type_value;
  color_start_perso = color_start_perso_value;
  color_end_perso = color_end_perso_value;
  limit_type = limit_type_value;
  fixed_limit = fixed_limit_value;
  progress_type = progress_type_value;
  smaller_text = smaller_text_value;
  go_top = go_top_value;
  refresh_click = refresh_click_value;
  delay_click = delay_click_value;
  display_totals = display_totals_value;
  refresh_page = refresh_page_value;
  delay_page = delay_page_value;
  hash_haut = go_top ? "#haut" : "";
  apply_config();
  do_refresh_page();
});
