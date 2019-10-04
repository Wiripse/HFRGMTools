// ==UserScript==
// @name          [HFR] Last Post Highlight
// @version       1.9.2
// @namespace     roger21.free.fr
// @description   Affiche des diodes vertes sur les posts lus et des diodes grises sur les posts non-lus, supprime les éléments de bas de page (sujets relatifs et copyrights) et affiche les smileys générés de toyo et les émojis de [HFR] Copié/Collé dans les quotes (comme des smileys) voir le code pour modifier les comportements par défaut.
// @icon          https://reho.st/self/40f387c9f48884a57e8bbe05e108ed4bd59b72ce.png
// @include       https://forum.hardware.fr/*
// @exclude       https://forum.hardware.fr/viewbbcode.php*
// @author        roger21
// @homepageURL   http://roger21.free.fr/hfr/
// @noframes
// @grant         none
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
// 1.9.2 (02/10/2019) :
// - suppression de la directive "@inject-into" (mauvaise solution, changer solution)
// 1.9.1 (18/09/2019) :
// - ajout de la directive "@inject-into content" pour isoler le script sous violentmonkey
// 1.9.0 (16/09/2018) :
// - affichage des emojis de [HFR] Copié/Collé dans les quotes (comme des smileys)
// - nouveau nom : [HFR] last post highlight -> [HFR] Last Post Highlight
// - ajout de l'avis de licence AGPL v3+
// - ajout de la metadata @author (roger21)
// - maj de la metadata @description
// 1.8.4 (13/05/2018) :
// - re-check du code dans tm (ff)
// - maj de la metadata @homepageURL
// 1.8.3 (28/04/2018) :
// - petites améliorations du code et check du code dans tm
// 1.8.2 (12/04/2018) :
// - amélioration de l'alignement de la diode
// - suppression des @grant inutiles (tous)
// 1.8.1 (28/11/2017) :
// - passage au https
// 1.8.0 (31/07/2017) :
// - suppression de code obsolète ou inutile
// - adaptation de la description
// 1.7.1 (12/12/2016) :
// - légers recodages / formatages / améliorations
// - reformatage du code (Online JavaScript beautifier : ->
// "2 spaces, unlimited newlines, do not wrap, braces with" et rien coché)
// 1.7.0 (06/04/2016) :
// - gestion de la navigation interne
// 1.6.5 (07/03/2015) :
// - ajout de la metadata @noframes (interdit l'execution du script dans une frame pour plus de sécurité)
// 1.6.4 (05/11/2014) :
// - ajout d'une url pour la detection des stickers
// 1.6.3 (19/08/2014) :
// - correction d'un bug sur la gestion des liens sur les smileys dans les quotes
// 1.6.2 (19/08/2014) :
// - correction d'un bug sur la page de réponse/edition normale
// 1.6.1 (24/07/2014) :
// - correction d'un problème pour l'affichage du bbcode des posts (dû à la suppression de la publicité)
// 1.6.0 (20/07/2014) :
// - l'homogènéisation est débile, retour à l'affichage des leds uniquement quand un post est spécifié
// 1.5.1 (20/07/2014) :
// - prise en compte de la cible #bas
// - utilisation de la propriété hash au lieu de la regexp sur l'url
// 1.5.0 (19/07/2014) :
// - correction d'un bug en mode non connecté
// - suppression des publicités (en mode non connecté)
// - fonctionnement homogène sur toutes les pages (avec ou sans post cible)
// 1.4.0 (29/04/2014) :
// - nouvelle descriptions
// - nettoyage du code
// - nouvelle url d'include pour prendre en compte tout le forum
// - ajout de la suppression de la section mesdiscussions.net (en bas de page)
// - ajout de la suppression de la section copyright hardware.fr (en bas de page)
// - ajout de commentaires détaillés sur les suppressions
// - ajout de l'affichage des stickers dans les quotes (comme les smileys)
// - ajout de commentaires détaillés sur l'afficahe des toyos/stickers
// - amélioration du code pour la gestion des toyos/stickers dans les quotes
// 1.3.4.2 (28/04/2014) :
// - corrections mineures sur le code et les commentaires
// 1.3.4.1 (27/04/2014) :
// - supression des <br /> autour des sujets relatifs
// 1.3.4 (04/04/2014) :
// - modification de la description
// - ajout d'une icone au script
// - ajout des dates dans l'historique
// 1.3.3 (18/03/2014) :
// - maj des metadata @grant et indentation des metadata
// 1.3.2 (14/09/2012) :
// - ajout des metadata @grant
// 1.3.1 (18/05/2012) :
// - probleme d'encodage (pas utf-8)
// 1.3.0 (18/05/2012) :
// - suppression des sujets relatifs au lieu du display "none" pour compatibilité avec offcetParent
// 1.2.0 (15/02/2012) :
// - correction d'un bug sur la comparaison des numeros de post
// - commentaires sur les leds
// - commentaires sur les truc en bas
// 1.1.0 (15/02/2012) :
// - ajout d'un numero de version (c'est con hein)

// par defaut :
// led_lu = verte
// led_pas_lu = grise

// vous pouvez inverser les couleurs des leds en inversant leur noms ici (led_lu <-> led_pas_lu)
var led_lu = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAkFJREFUOMudk71rU1EYxn/35KZ5c5Pg7Yd6xVqiaLngErfSIZQ6pEN1aru6SEHyr7h26ezUycGhdxBCBil0CeJwxQ8i2HAjNj20SXrKzYdDGlpIJ8/4npff+57nPI9FFGSolgz/eSz2SExUi8iN3VUMwPbWttrd2x3cDJjB5ZOfJwp9bFwGGB6ieUJYXiHa2Udfb7cnJm+xhhWukCGPC2SRzA9M54ja+z9UWKcy3gQgwSYqKCLvPpLlLa+5YIPbcGuVMP2cevIptF2yzhT+RYNCfEK9/AJ9+H0EsQFKAJ9ZossSHnr2FRW1julZeJkm0p/BdbpgNRH7iLWdkAhGT1EUERyEFitM486+oZJYR4uFn+pQOAV/OI83XMQdPkPkHv6drxTGQo80+Img8JjDJFbRPQtPxeTjNv4whUcOBiDZHKZ1FzoR7lgDFQDLxwhpJPsIE1+Qj9sUTlv4gxSe5JCUjSs2MkwiZIA+glMebVCqYljE5BxMPyYfH1EYzOGlFB5pBBssMAZMIom2Bhjcq69UAHjoszlqxDAIyQ8beKQBgSEIYBRodYK2Gmgc6nRfmitAFcNjDrrnhEQY6xStbLQFWkGkQJsO9e43dLJLyAPqY/sn2LyEbJTb9+uH7bjBPH16U9BTFtqcE/VaROqAv8ljviws86Hp8Jtf9CatXEQW9llqNynELoWzHORmgQ7mLEOFaWrBAvXSNSdOZCEoIiUHoYnLFELSF2ZCjSYaWzgoImPIzWmcSGTA9cgHl3elKuYfDVDd4qsA3AcAAAAASUVORK5CYII=";

var led_pas_lu = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAXNSR0IArs4c6QAAAZFJREFUKM99kT9v01AUxY/fc5Kb2KKvosMTLZIlBjxkMGVol0gdWikTDGFl41PwAfgizJ5ATCCZCQaGCHloy4CldHATt7ppTLghjsNAS5k44+/8WY7zxvsk+I/cW7tLtzgV4LV6XgPOS/0H+eY0KEJtarF87/gof8fXCzftV33ngAIPbTqXi+E8eZSkAgC6pwb0wY9fLJ9tYPd4NwvQ9pthEV1lT/ibAC5wgu/7i/1N7id7Ajsl3yzBNOl/ycGA6lKLZge+eZrssQoX0SrcstvmAW2F51GXABfIybF3JGLYZfAzdG0HDvkyRmEAQD3Emlq0Lb+CeTQNXeuRaxqkiVDTBgEqFkc6UtlJtAq0bZEGpBbFa/EZABSwyd5whVFwaZtoAARxuOQLbmW1ALqnxlUDlztt41V3oSuUTjnPRjwd3v/8tQB0TwGH5aQsdurKqRRLfpWfFLM0eqvOxtV1YCSPzxYFy4wmLOWY3fcmibKPAvzzxYAyYuNSkzr8I08FGFAsf78AYoF0BVhDIZWbUiy/AULgryqfAtSeAAAAAElFTkSuQmCC";

// ça c'est du code
function update_led() {
  let lastPost = null;
  let hash = window.location.hash;
  if(hash !== "" && hash.substr(1, 1) === "t") lastPost = parseInt(hash.substring(2), 10);
  let posts = document.querySelectorAll("tr[class^=\"message\"");
  for(let post of posts) {
    if(post.cells[0] && post.cells[0].firstElementChild) {
      if("a" === post.cells[0].firstElementChild.nodeName.toLowerCase()) {
        if(lastPost !== null) {
          let postNumber = parseInt(post.cells[0].firstElementChild.name.substring(1));
          let ledImage = post.cells[1].querySelector("div.left.gmr21_lph > img");
          if(ledImage === null) {
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "left gmr21_lph");
            ledImage = document.createElement("img");
            ledImage.style.marginTop = "2px";
            newDiv.appendChild(ledImage);
            post.cells[1].firstElementChild.insertBefore(newDiv, post.cells[1].firstElementChild.firstElementChild);
          }
          if(postNumber <= lastPost) ledImage.setAttribute("src", led_lu);
          else ledImage.setAttribute("src", led_pas_lu);
        }
      } else if("div" === post.cells[0].firstElementChild.nodeName.toLowerCase()) {
        post.parentNode.removeChild(post);
      }
    }
  }
}
window.addEventListener("hashchange", update_led, false);
update_led();

var as1 = document.querySelectorAll("table.citation a");
var as2 = document.querySelectorAll("table.oldcitation a");

function a2img(a, filtre) {
  if(a.getAttribute("href")) {
    let href = a.getAttribute("href");
    if(href.startsWith(filtre) && (href.length > filtre.length)) {
      href = href.replace("'", "%27", "g").replace("\"", "%22", "g");
      let img = document.createElement("img");
      img.setAttribute("alt", href);
      img.setAttribute("title", href);
      img.setAttribute("src", href);
      a.textContent = "";
      a.appendChild(img);
    }
  }
}

// ----- SECTIONS OPTIONNELLES ----- //

// optionel : pour effacer le tableau des sujets relatifs
if(true) { // remplacer true par false pour désactiver
  if(document.getElementById("sujetrelatif")) {
    // suppression du <br /> avant les sujets relatifs
    if(document.getElementById("sujetrelatif").previousElementSibling &&
      (document.getElementById("sujetrelatif").previousElementSibling.nodeName.toUpperCase() === "BR")) {
      document.getElementById("sujetrelatif").parentNode
        .removeChild(document.getElementById("sujetrelatif").previousElementSibling);
    }
    // suppression des sujets relatifs
    document.getElementById("sujetrelatif").parentNode.removeChild(document.getElementById("sujetrelatif"));
  }
}

// optionel : pour effacer la section mesdiscussions.net (en bas de page)
if(true) { // remplacer true par false pour désactiver
  if(document.querySelector("div.copyright")) {
    // suppression du <br /> avant la section mesdiscussions.net
    if(document.querySelector("div.copyright").previousElementSibling &&
      (document.querySelector("div.copyright").previousElementSibling.nodeName.toUpperCase() === "BR")) {
      document.querySelector("div.copyright").parentNode
        .removeChild(document.querySelector("div.copyright").previousElementSibling);
    }
    // suppression de la section mesdiscussions.net
    document.querySelector("div.copyright").parentNode.removeChild(document.querySelector("div.copyright"));
  }
}

// optionel : pour effacer la section copyright hardware.fr (en bas de page) et les pubs de prix en mode non connecté
if(true) { // remplacer true par false pour désactiver
  let centers = document.querySelectorAll("div.container ~ center");
  for(let center of centers) {
    center.parentNode.removeChild(center);
  }
}

// optionel : pour afficher les smiley générés de toyo dans les quotes (comme des smileys donc)
if(true) { // remplacer true par false pour désactiver
  for(let a of as1) a2img(a, "http://hfr.toyonos.info/generateurs/");
  for(let a of as2) a2img(a, "http://hfr.toyonos.info/generateurs/");
}

// optionel : pour afficher les emojis de [HFR] Copié/Collé dans les quotes (comme des smileys donc)
if(true) { // remplacer true par false pour désactiver
  for(let a of as1) a2img(a, "https://reho.st/http://breizhodrome.free.fr/smileys-mini/");
  for(let a of as2) a2img(a, "https://reho.st/http://breizhodrome.free.fr/smileys-mini/");
}
