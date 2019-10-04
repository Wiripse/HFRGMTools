// ==UserScript==
// @name          [HFR] Ego Quote
// @version       0.9.7
// @namespace     roger21.free.fr
// @description   Colore en bleu les posts contenant une citation de soi.
// @icon          https://reho.st/self/40f387c9f48884a57e8bbe05e108ed4bd59b72ce.png
// @include       https://forum.hardware.fr/forum2.php*
// @include       https://forum.hardware.fr/hfr/*/*-sujet_*_*.htm*
// @author        roger21
// @homepageURL   http://roger21.free.fr/hfr/
// @noframes
// @grant         none
// ==/UserScript==

/*

Copyright © 2015, 2017-2019 roger21@free.fr

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
// 0.9.7 (02/10/2019) :
// - suppression de la directive "@inject-into" (mauvaise solution, changer solution)
// 0.9.6 (18/09/2019) :
// - ajout de la directive "@inject-into content" pour isoler le script sous violentmonkey
// 0.9.5 (29/11/2018) :
// - nouveau nom : [HFR] ego quote -> [HFR] Ego Quote
// - ajout de l'avis de licence AGPL v3+
// - ajout de la metadata @author (roger21)
// - réécriture de la metadata @description
// 0.9.4 (17/05/2018) :
// - simplifications et améliorations du code et check du code dans tm
// - suppression des @grant inutiles (tous)
// - reformatage du code (Online JavaScript beautifier : ->
// "2 spaces, unlimited newlines, do not wrap, braces with" et rien coché)
// - amélioration des @include (page des topics uniquement)
// - maj de la metadata @homepageURL
// - version compressée de l'icône du script
// 0.9.3 (28/11/2017) :
// - passage au https
// 0.9.2 (27/09/2015) :
// - correction de l'icone (hfr au lieu de l'icone neutre roger21)
// - correction de la description pour correspondre à la couleur (by BrisChri)
// 0.9.1 (18/09/2015) :
// - meilleure detection du pseudal pour éviter les faux positifs
// 0.9.0 (17/09/2015) :
// - création sur une idée de BrisChri

if(document.forms && document.forms.namedItem("hop") && document.forms.namedItem("hop").elements.namedItem("pseudo")) {
  let pseudal = document.forms.namedItem("hop").elements.namedItem("pseudo").value.trim();
  if(pseudal !== "") {
    let quotes = document.querySelectorAll("div.container > table.oldcitation > tbody > tr.none > td > b.s1 > a.Topic, " +
      "div.container > table.citation > tbody > tr.none > td > b.s1 > a.Topic, " +
      "div.container > table.oldcitation > tbody > tr.none > td > b.s1");
    for(let quote of quotes) {
      if(quote.textContent.indexOf(pseudal + " a écrit") === 0) {
        let parent = quote.parentElement;
        while(parent) {
          if(parent.nodeName.toUpperCase() === "TR" && parent.classList.contains("message")) {
            parent.style.backgroundColor = "#bdf6f6"; // bleu pale a tendence fluo by BrisChri
            break;
          }
          parent = parent.parentElement;
        }
      }
    }
  }
}
