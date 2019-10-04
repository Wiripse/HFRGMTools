// ==UserScript==
// @name          [HFR] ego posts
// @version       0.2.0
// @namespace     homnomnom.fr
// @description   colore en vert les posts que l'on a posté
// @icon          http://reho.st/self/8be6cfd410001113ffc0e909a807205fdb5b6751.png
// @include       https://forum.hardware.fr/*
// @require       https://raw.githubusercontent.com/TheMrNomis/HFR-scripts/master/cleanpseudo.js
// @noframes

// ==/UserScript==

// $Rev: 1424 $

// historique :
// 0.2.0 (06/12/2017) :
// - gestion des pseudos compliqués
// - changement de couleur pour éviter la confusion avec ego quote
// - nettoyage des permissions
// 0.1.0 (04/12/2017) :
// - création à partir de [HFR] ego quote par roger21

if(document.forms.namedItem("hop") && document.forms.namedItem("hop").elements.namedItem("pseudo")){
    var pseudal=cleanPseudo(document.forms.namedItem("hop").elements.namedItem("pseudo").value);
    var msgs=document.querySelectorAll("tr.message");
    for(var msg of msgs) {
        var pseudalMsg = cleanPseudo(msg.querySelector("td.messCase1 > div > b.s2").textContent);
        if(pseudalMsg.indexOf(pseudal) === 0) {
            msg.style.backgroundColor="#ccffcc"; // vert pale
            //msg.style.backgroundColor="#bdf6f6"; // bleu pale a tendence fluo
        }
    }
}
