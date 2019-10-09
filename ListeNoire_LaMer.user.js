// ==UserScript==
// @name          [HFR] ListeNoire LaMer
// @version       2019.10.9.0
// @namespace     forum.hardware.fr
// @description   Permet de filtrer les posts des utilisateurs avec stockage en MPStorage
// @icon          https://reho.st/self/40f387c9f48884a57e8bbe05e108ed4bd59b72ce.png
// @include       https://forum.hardware.fr/forum2.php*
// @include       https://forum.hardware.fr/hfr/*/*-sujet_*_*.htm*
// @downloadURL   https://github.com/Wiripse/HFRGMTools/raw/master/ListeNoire_LaMer.user.js
// @updateURL     https://github.com/Wiripse/HFRGMTools/raw/master/ListeNoire_LaMer.user.js
// @author        Wiripse
// @authororig    nykal, roger21
// @modifications Mod de roger21 d'un script de nykal. Ajout du stockage de la liste des pseudos en MPStorage
// @modtype       Evolutions
// @homepageURL   https://github.com/Wiripse/HFRGMTools/
// @noframes
// @grant         GM.getValue
// @grant         GM_getValue
// @grant         GM.setValue
// @grant         GM_setValue
// @require https://raw.githubusercontent.com/Wiripse/HFRGMTools/master/MPStorage.user.js?v=2019.10.9.0
// ==/UserScript==

/*
Si c'est gratuit, c'est toi le produit ?
*/


// Historique :
// 2019.10.9.0 : Fix init MPStorage gestion multi-comptes
// 2019.8.5.0 :
// - Fork et ajout de la gestion du MPStorage

// MPStorage
var LocalMPStorage = {
    /* Version of the MPStorage API used */
    version : '0.1',
    /* Current toolname used to access MPStorage */
    toolName : 'ListeNoire_LaMer_GM',
    /* JSON datas from MPStorage about blacklist management */
    blacklist : void 0,
    /* Methods */
    getData : function(callback){
        // **********
        // BlackList_GM
        // Get MPStorage data and store it locally
        // CALLBACK is called with the blacklist data from MPStorage data
        // **********

        mpStorage.getStorageData(function(res){
            // Save blacklist datas locally
            LocalMPStorage.blacklist = res.data.filter(function(d){return LocalMPStorage.version === d.version;})[0].blacklist;
            // We're done
            callback(LocalMPStorage.blacklist);
        });
    },

    initBLMPStorage : function() {
        // **********
        // BlackList_GM
        // Init MPStorage blacklist data
        // Return a Promise
        // **********

        return new Promise((resolve, reject) => {
            try {
                // We try to recover existing MPStorage conf locally
                Promise.all([
                    GM.getValue('mpStorage_username', void 0),
                    GM.getValue('mpStorage_mpId', void 0),
                    GM.getValue('mpStorage_mpRepId', void 0)
                ]).then(function([
                    mpStorage_username,
                    mpStorage_mpId,
                    mpStorage_mpRepId
                ]){
                    // Init of localStorage from MPStorage
                    mpStorage.initLocalStorage(mpStorage_username, mpStorage_mpId, mpStorage_mpRepId, function(dataz){
                        // We save the result locally
                        LocalMPStorage.blacklist = dataz.data.filter(function(d){return LocalMPStorage.version === d.version;})[0].blacklist;
                        GM.setValue('mpStorage_username', mpStorage.username);
                        GM.setValue('mpStorage_mpId', mpStorage.mpId);
                        GM.setValue('mpStorage_mpRepId', mpStorage.mpRepId);
                        resolve();
                    });
                });
            } catch (e) {
                reject(e);
            }
        });
    }
};

// compatibilité gm4
if(typeof GM === "undefined") {
  GM = {};
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

// récupération des paramètres
Promise.all([
  GM.getValue("masquage_complet", false),
  GM.getValue("messages_avec_citation", false),
  LocalMPStorage.initBLMPStorage()
]).then(function([
  masquage_complet,
  messages_avec_citation
]) {
  let root = document.querySelector("div#mesdiscussions.mesdiscussions");
  if(root) {

    // icônes et boutons
    let img_blacklist = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAPCAAAAAAXVmrsAAAAAnRSTlMAAHaTzTgAAAA4SURBVHjaY2CAgLVgAg6AbFYQOMbKCmMDmXA2K4x9DAiAMtjEgRhTnBUsTLz6tWshNiAcd2ztWgBEsTPkB3369AAAAABJRU5ErkJggg%3D%3D";
    let img_ok = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAACl0lEQVR42q2T60uTYRiH%2FTv2bnttAwlkRCGChFD7FCQSm2ZDMQ%2FL0nRnj7TNGDbTooychzFSSssstdqc8zB1anNrSpm47FVCzH3pQLVhdLBfzztoJlifvOEHz4fnuu7nGBe311XgOyLMnTmsz%2FakMBljB8OSEVFY4kpkJM5Efbp9v%2FC%2FcJ43VSrzJId0HhluBy3oW%2BmKpnOpGSWuExD30iFxDy3dFSZdpZkTSZHr80Y41%2Fphe3UDpvnKaNixY60PjbNVOGTjRZJtvJ2SHE%2BKINOdtMHC7MSaQBkq%2FCXQzJ6DjqScpNp3HvY3D3B5ugIiC3dDdJMriAlk7iSDajwr2pmFWVDlPQPFTCEU0wVQTxfCvT4Ig1cJB5Hk9hxDwjWuISbIGBExncFmWINNqPAVQ%2FlUTsB8KKdIPPmYeOsCW6HIOtpeNMI234j4ei4TExy3J2w%2BWr2L2oAGWm8RWckAlj4uQDVZiPH1oSj8c%2BsH2p5fgWGyGH3BTvCN1GZMIH5Ib%2FavdMPoV6HWr8Xnb5%2Bi0Iev72KwZa4ealc29O6z6A92gF%2Fzt6CHZm4tNKF98Sp0U3KYfdWIfP8Shbd%2BbcHy7BLKnFnQEEFLoA7tXjPoKmp7C6l3%2BAb5QBrsq%2FdRPSmH2n0adTPlWH6%2FiLa5BpQOnoTCcQo6Zw7sr7uRbj0KupLaPsRkK09wgFyN2aPBY%2BYeKkfzoB3OgWpIBqWDDQtn48lyF4xDxeCrORu0mhLseAuJTVxpfAMVMbnL4CCS1oAZ%2BtEiXBiWo5VswU5gvbMIvFJOhMC7v8Z9DVwpbaJCkg4x2v1m9L60onfBCovXhLSWVPAVnBCt%2Bgf8p%2BiLXCFtoPR0DcXwtZwwX8UJk44MiZ4upYR7%2Fnt%2FA%2Bw9sdKFchsrAAAAAElFTkSuQmCC";
    let img_cancel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAACEklEQVR42q1S%2FU9SYRhlbW13%2FQ0V5Woub05zfZkCXhUhpmmb8v3h5ZKoCQjcwVBi1Q%2B19Zf0d2lWxpeR3AuX93J8qGVjgK2tZ3u3d3t2znmecx6D4R%2BrsS5dGdiEnDXS4weCQ2Fe9QUSdafH3B%2Bc3UM7k4OeSPWQNIIi3xAjaG5u48fz1Y%2B1peU7PWAU3qBNT0%2FKaG3tnJOogXWe1NGKJYB8AZ3%2Fic2RqMxaL%2F0iSGe4dlLW23uvgPcfoOfyHQI0RYlX%2FSGe1KHtxAHqqyERJwtPWUWYv9w1oh5PcuxlnOlyFnj7DiydQSMcAalD244Buf2f%2F6rVTuA5rq9JregW15Q2WCu2S%2Bu8BvYLBMwD2RxUfxDVeRurzMxyF8cUFDnFG9CRo3V8QcDtA%2BQMqnMLetkicH%2FNWfH4O1EBlAacHmDVBeymaG87ipPT%2FMVgt49XvH5okSiQkgmYBuK0DhmorrlQMVnwdXyiP0nd5eUVjw%2BatAFQjIrbCzKLlabN%2BunSChDdRP3ZCor3H%2BJoeKSbhC6LJ3Vo4RekmoRCo5NZrDRl5oqPJrnjiQesZrUBYQmndgeOR8dweGPoDwldllB3uqGJEpQ1N8gsVnpiOjfsy%2Bg493nkLvtuEaA4FvFt7B4OrhmFrinosoTa4jLK5hmdzOpx%2B%2Bj2MPdp6BbrC%2F5dZZNFKD6eGhjVofEmd3D1umD4n3UGltFKFDkd60gAAAAASUVORK5CYII%3D";
    let img_add = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAACeUlEQVR42rWQb0hTYRTG7UNJka1tjRAEYyFYsShUggqxsclyasKCWTPbzPwz0XAUalPDsraWOrFs1pbKcN6tmTEtzSkZZGSxlX%2BG0KdBWYTQwFIXKvfp3kuIQky%2F9MDDOe%2FL%2B%2FzO4Q0L%2Bx9SJ%2Byqqpdw5hqlO2GQsFAlZM8r4ni1Gwrnx3HK7qezSXMmBw8o35WxoUthoTRxByk9yK1ZF2CSstBGBQ1USCelzcbNVB6unOAgK441uy5Al7gdL0yVmO43YNRSipIkHjSiSBSJ%2Bcg7xl60lqeFhwSYs6N%2FBL9%2FwuwbE74ONmDccQ3%2B57cR8HtBFOydnWhXbwkJaFLsHwm878SMx4mFMYKynekDXgIPcwSekOHdUtvmmONqK1Ecj98eC4K%2Bp4wXPtrQfTkegsSCJzyxees%2Fw7wUIpwr6SiMkgzB93kODm067No0xnT%2FeuoXopJfgiN8dIkrbNm2Jsw96dgUkexQRqeOYGp6AR3TgMYHFL4DLrwCzvcB5c5uaExK5DWcgvyGMCgpO1S9Ajgga80QnTbAObqMlnGg%2BC2JgmESuQMksl0kVGYCNU4VnvmaMfbNDeOgGnKjAEeKIusYwIfK2OWZ3nLca%2B2Fsp%2BaSk1U9ZA410XijI2q%2BhS4JhvhmmoCrbqhizAO5dOAIAMYr9pHBtzXkZnXhtrBeSi6gLN2EnIrCZmFRKr2MPp8FqxWz0QzDQADmLQWV3grYpZUqltLCcphqKjVc1b5aAkfd9w50LmVTFg3oFy7AS2%2FvTCi%2Bmotd09Gb0t0UvsXvvjxPD%2B5a5Evci4K5FlLsrpY1Ltzmcl0pc8rf7ARUY%2F1lH%2FSa%2F%2Btevr%2BD5zsjQszBEUQAAAAAElFTkSuQmCC";
    let img_remove = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAACjUlEQVR42rWTa0jTURiHlbmki61tjQqM5UrKwr6onyqxtb8s50Qy0DIvU7GprFAs70liSgtDLNPyytC2NdNK1Hkpi6xMnGWJ0Ica5YowWkhuirPz6zhIDEL90gs%2FzsuB53lfDhwXl%2F9RqQGbC8qkvOly2SaopRwUiLm2aD9B8arg0368rBthXFITxcNNmmsRXJSGcJAeuJHI9vMvriioknHQQEE1hUplC%2BHiUqgA5w7zcMqPM7WioDRwA4xV%2BbB0qTFYm44zQQJkSLYhjREh%2BQB3TpMtd19WUBMr%2FD7z9R2mnlXhc%2B9VjOoLYe64DKvZBK1y59SbxtQ1ywoqovcOWIduY3LYAPtrLY3O2VtNWtxK8B1eFt4ia2Z7H0zVaFX%2BmB2uxcxYmzP2V81ozfSHb6DyroCpWftPWBCidedLm1I8pX0Y%2BzQNfV4YdHlyZxb6p%2BM%2F4Rn8CDxx3Vm%2BuHrdXzD%2FqN7VI1gfLwwdwLjFjiYLkDEGpLwEEh8DcZ1AY3klnsT4oFfMxj1mvbWTYecuCvZF1IdLjqthGJxH9SigekGg7CdI6iaIvU9wpagSI5mHMNNRBjJuhE2XgaE03189R9xUTsFI%2Fp75yfZsXK9vR3wXnUonKh4QxLQQnGgmMITvgp3CqJADWVygxAvf1EHolrA%2BOAWjBT7E2lOEqOQGFPfaEN0CnNQRRGoIImoJ%2BujaxNSKpfWjcCu9dyNOwVuNKseU4%2B1QKEocAfH9UNDVE5ak7ZgQ03WJAIVmz7vASvNRyUI3w7IsvoNZl%2BJxIbeYvyO8vVoY1DghYu7YRMEtcyKJYS4zNM7xPHE3vmR5YTKHjfdJrngod5s3MqzcVf%2FQgcjt2XSieWFtek78gX8DzXKLfuxv8GoAAAAASUVORK5CYII%3D";
    let img_bkgnd = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAABGklEQVR42u3ZQQqDMBRFUSfZirvPNrKukoHyQUP1N4NQzoGATsPlUeq2AQAAAAAAAAAAAAAAAAAAAAAAAAAAAADAF7XW3S2QjufJcVO8DquUcjmttfNZWEwJK0YlLKYulrCYElZfqXjicgkLi8W6ixXfhYXFYs2w7tZKWFgs%2FMbCYgmLfFjHN8HR%2F1luilRco9Oj8iEaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB%2BUGvd3QLpeJ4cN8XrsEopl9NaO5%2BFxZSwYlTCYupiCYspYfWViicul7CwWKy7WPFdWFgs1gzrbq2EhcXCbywslrDIh3V8Exz9n%2BWmSMU1Oj0qH6IBAAAAAAAAAAAAAPgXH8XjYT4KbLBkAAAAAElFTkSuQmCC";
    let img_bkgnd_with_quote = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAADwUlEQVR42u3ayYpiTRCG4b7nuIXa1z2IA46gOKOU84BFleKIC3UhKoJQi3Iox58IcNc0nq7mh6bfB4I8ylklH5mRyfnxAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwzwuHwxIIBMTv99uoFQwGJRKJyNPTk5RKJWGW4Fgmk5Hb7fbTWq%2FXEgqFpFgsEi44k06nfxms%2FX4vqVRKkskk4cKfCdZyuZTNZmMBSyQStnoxY%2Fj2VjibzaTT6cjLy4tEo1F5fn4mWHAerI%2BPD2k0GlIul6VWq9m4Wq3keDzK9XoVfZcZw7dXLK3z%2BWzBulwu1msxY3hINpu1APX7fel2u9Lr9WQ0GslgMJBmsynv7%2B8ynU4tYAQLjoOlYRqPxzIcDi1gGjR9fnt7k8ViYcHiZIiH5XI5C5auTlr1el1arZY9t9ttmUwm8vn5adthPB4nWHAWrK%2BvL%2BujdNS7q91uZ%2BN2u7UiWPitrfD19VUqlYqtWFq6YhUKBTsd5vN5CxzBguNTofZXWvfeSvssvcPS7VB%2FHw4HicViBAuP0Zt33QKr1ao16Vrz%2BdwuR7X0RKijbot6ScqM4eFg3e%2BrtE6nk5X2VLr93Xsu%2FY8VCw%2FTz2b0kxmfz2fl9XqtPB6PuN1uK5fLZaO%2Bx4wBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2BNuFw2EJBALi9%2Ftt1AoGgxKJROTp6UlKpZIwS3Ask8nI7Xb7aa3XawmFQlIsFgkXnEmn078M1n6%2Fl1QqJclkknDhzwRruVzKZrOxgCUSCVu9mDF8eyuczWbS6XTk5eVFotGoPD8%2FEyw4D9bHx4c0Gg0pl8tSq9VsXK1Wcjwe5Xq9ir7LjOHbK5bW%2BXy2YF0uF%2Bu1mDE8JJvNWoD6%2Fb50u13p9XoyGo1kMBhIs9mU9%2Fd3mU6nFjCCBcfB0jCNx2MZDocWMA2aPr%2B9vclisbBgcTLEw3K5nAVLVyeter0urVbLntvttkwmE%2Fn8%2FLTtMB6PEyw4C9bX15f1UTrq3dVut7Nxu91aESz81lb4%2BvoqlUrFViwtXbEKhYKdDvP5vAWOYMHxqVD7K617b6V9lt5h6Xaovw%2BHg8RiMYKFx%2BjNu26B1WrVmnSt%2BXxul6NaeiLUUbdFvSRlxvBwsO73VVqn08lKeyrd%2Fu49l%2F7HioWH6Wcz%2BsmMz%2Bez8nq9Vh6PR9xut5XL5bJR32PGAAAAAAAAAAAAAAAAAAAAAPyP%2FgN6xFwlEUspjwAAAABJRU5ErkJggg%3D%3D";

    // styles css
    let style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.textContent = ".hfrCitationListeNoire, .hfrMessageListeNoire, .hfrMessageAvecCitationListeNoire, " +
      ".hfrMasquageComplet{display:none;} div#mesdiscussions.mesdiscussions table.none tbody tr td div.left " +
      "div.left{padding-left:10px;padding-right:10px;} div#hfrBlackListManagement table, " +
      "div#hfrBlackListManagement table td{border:none;} .hfrStyleListeNoire" +
      "{background-image:url(" + img_bkgnd + ");} " +
      ".hfrStyleMessageAvecCitationListeNoire{background-image:url(" + img_bkgnd_with_quote + ");} " +
      "td.messCase1 div.colortag.right{margin-left:3px;}";
    document.getElementsByTagName("head")[0].appendChild(style);

    // position de la fenêtre de gestion
    let divBlackListManagementPosition;

    // ajoute les boutons (en haut du tableau et à côté des pseudos)
    function addButtons() {
      // ajoute le bouton en haut du tableau si le liem des mp existe
      let mp = root.querySelector("table.none > tbody > tr > td > div.left");
      if(mp !== null) {
        let divListeNoire = document.createElement("div");
        divListeNoire.setAttribute("class", "left");
        let imgListenoire = document.createElement("img");
        imgListenoire.setAttribute("src", img_blacklist);
        imgListenoire.style.verticalAlign = "bottom";
        divListeNoire.appendChild(imgListenoire);
        divListeNoire.appendChild(document.createTextNode("\u00a0"));
        let aListeNoire = this.document.createElement("a");
        aListeNoire.setAttribute("class", "s1Ext hfrLinkListeNoire");
        aListeNoire.setAttribute("href", "javascript:void(null);");
        aListeNoire.appendChild(document.createTextNode("Liste\u00a0noire"));
        aListeNoire.addEventListener("click", displayBlackListManagement, false);
        divListeNoire.appendChild(aListeNoire);
        mp.appendChild(divListeNoire);
      }
      // ajoute le bouton à coté des pseudos
      let pseudos = root.querySelectorAll("table.messagetable > tbody > tr > td.messCase1 > " +
        "div:not([postalrecall]) > b.s2");
      for(let pseudo of pseudos) {
        // construction du bouton
        let divListeNoirePseudo = document.createElement("div");
        divListeNoirePseudo.setAttribute("class", "right");
        let imgListenoirePseudo = document.createElement("img");
        imgListenoirePseudo.setAttribute("src", img_blacklist);
        imgListenoirePseudo.style.verticalAlign = "bottom";
        imgListenoirePseudo.style.cursor = "pointer";
        imgListenoirePseudo.style.marginRight = "1px";
        imgListenoirePseudo.style.marginLeft = "3px";
        // ouverture de la fenetre de confiramtion/gestion sur le clic du bouton
        imgListenoirePseudo.addEventListener("click", displayBlackListQuestion, false);
        divListeNoirePseudo.appendChild(imgListenoirePseudo);
        pseudo.parentElement.parentElement.insertBefore(divListeNoirePseudo, pseudo.parentElement);
      }
    }

    // affichage de la fenêtre de gestion de la black liste
    function displayBlackListManagement(event) {
      if(typeof event !== "undefined") {
        event.preventDefault();
        event.stopPropagation();
        divBlackListManagementPosition = {
          top: (window.pageYOffset + event.clientY + 8) + "px",
          left: (event.clientX + 8) + "px"
        };
      }
      // suppression des fenêtres ouvertes
      hidePopups();
      // construction de la fenêtre
      let divBlackListManagement = document.createElement("div");
      divBlackListManagement.setAttribute("id", "hfrBlackListManagement");
      divBlackListManagement.style.position = "absolute";
      divBlackListManagement.style.border = "1px solid grey";
      divBlackListManagement.style.padding = "8px";
      divBlackListManagement.style.background = "white";
      divBlackListManagement.style.zIndex = "1001";
      divBlackListManagement.style.fontSize = "8pt";
      divBlackListManagement.style.textAlign = "left";
      divBlackListManagement.style.cursor = "default";
      let divTitle = document.createElement("div");
      divTitle.style.fontWeight = "bold";
      divTitle.appendChild(document.createTextNode("Gestion de la liste noire"));
      let inputClose = document.createElement("input");
      inputClose.setAttribute("type", "image");
      inputClose.setAttribute("src", img_cancel);
      inputClose.style.display = "block";
      inputClose.style.float = "right";
      inputClose.style.marginLeft = "8px";
      inputClose.setAttribute("title", "Fermer");
      inputClose.addEventListener("click", function() {
        hidePopups();
      }, false);
      divTitle.appendChild(inputClose);
      divBlackListManagement.appendChild(divTitle);
      let tableList = document.createElement("table");
      tableList.style.marginTop = "8px";
      tableList.style.borderCollapse = "collapse";
      let trWithQuote = document.createElement("tr");
      trWithQuote.setAttribute("title", "Masquer les messages contenant une citation bloquée");
      let tdLabelWithQuote = document.createElement("td");
      tdLabelWithQuote.style.verticalAlign = "bottom";
      let labelWithQuote = document.createElement("label");
      labelWithQuote.setAttribute("for", "hfrInputWithQuote");
      labelWithQuote.style.cursor = "pointer";
      labelWithQuote.appendChild(document.createTextNode("Messages avec citation :"));
      tdLabelWithQuote.appendChild(labelWithQuote);
      trWithQuote.appendChild(tdLabelWithQuote);
      let tdInputWithQuote = document.createElement("td");
      tdInputWithQuote.style.textAlign = "right";
      let inputWithQuote = document.createElement("input");
      inputWithQuote.setAttribute("type", "checkbox");
      inputWithQuote.setAttribute("id", "hfrInputWithQuote");
      inputWithQuote.style.margin = "0 1px 0 8px";
      inputWithQuote.style.verticalAlign = "bottom";
      inputWithQuote.style.cursor = "pointer";
      inputWithQuote.checked = messages_avec_citation;
      inputWithQuote.addEventListener("change", function() {
        hidePosts();
        hideQuotes();
        messages_avec_citation = this.checked;
        GM.setValue("messages_avec_citation", messages_avec_citation);
        hidePosts();
        hideQuotes();
        showPostsWithQuote();
      }, false);
      tdInputWithQuote.appendChild(inputWithQuote);
      trWithQuote.appendChild(tdInputWithQuote);
      tableList.appendChild(trWithQuote);
      let trFullHide = document.createElement("tr");
      trFullHide.setAttribute("title", "Masquer complètement les messages et les citations bloquées");
      let tdLabelFullHide = document.createElement("td");
      tdLabelFullHide.style.verticalAlign = "bottom";
      let labelFullHide = document.createElement("label");
      labelFullHide.setAttribute("for", "hfrInputFullHide");
      labelFullHide.style.cursor = "pointer";
      labelFullHide.appendChild(document.createTextNode("Masquage complet :"));
      tdLabelFullHide.appendChild(labelFullHide);
      trFullHide.appendChild(tdLabelFullHide);
      let tdInputFullHide = document.createElement("td");
      tdInputFullHide.style.textAlign = "right";
      let inputFullHide = document.createElement("input");
      inputFullHide.setAttribute("type", "checkbox");
      inputFullHide.setAttribute("id", "hfrInputFullHide");
      inputFullHide.style.margin = "0 1px 0 8px";
      inputFullHide.style.verticalAlign = "bottom";
      inputFullHide.style.cursor = "pointer";
      inputFullHide.checked = masquage_complet;
      inputFullHide.addEventListener("change", function() {
        masquage_complet = this.checked;
        GM.setValue("masquage_complet", masquage_complet);
        hidePosts();
        hideQuotes();
        let infos = document.querySelectorAll(".hfrInfoListeNoire");
        for(let info of infos) {
          info.classList.toggle("hfrMasquageComplet", masquage_complet);
        }
      }, false);
      tdInputFullHide.appendChild(inputFullHide);
      trFullHide.appendChild(tdInputFullHide);
      tableList.appendChild(trFullHide);
      let trAdd = document.createElement("tr");
      trAdd.setAttribute("title", "Ajouter un nouveau pseudo à la liste noire");
      let tdAddPseudo = document.createElement("td");
      tdAddPseudo.style.paddingTop = "6px";
      tdAddPseudo.style.paddingBottom = "2px";
      let inputPseudo = document.createElement("input");
      inputPseudo.setAttribute("type", "text");
      inputPseudo.style.fontSize = "8pt";
      inputPseudo.style.fontFamily = "Verdana,Arial,sans-serif,Helvetica";
      inputPseudo.style.padding = "1px 2px";
      tdAddPseudo.appendChild(inputPseudo);
      trAdd.appendChild(tdAddPseudo);
      let tdInputAdd = document.createElement("td");
      tdInputAdd.style.textAlign = "right";
      tdInputAdd.style.paddingTop = "6px";
      tdInputAdd.style.paddingBottom = "2px";
      let inputAdd = document.createElement("input");
      inputAdd.setAttribute("type", "image");
      inputAdd.setAttribute("src", img_add);
      inputAdd.style.marginLeft = "8px";
      inputAdd.addEventListener("click", function() {
        let pseudo = this.parentElement.parentElement.firstElementChild.firstElementChild.value.trim();
        if(pseudo !== "") {
          if(!isPseudoBlacklisted(pseudo)) {
            addToBlacklist(pseudo, function(){
                hidePosts();
                hideQuotes();
                displayBlackListManagement();
            });
          } else {
            alert("Ce pseudo est déjà présent dans la liste noire.");
          }
        }
      }, false);
      tdInputAdd.appendChild(inputAdd);
      trAdd.appendChild(tdInputAdd);
      tableList.appendChild(trAdd);
      for(let item of LocalMPStorage.blacklist.list) {
        let trRemove = document.createElement("tr");
        trRemove.setAttribute("title", "Enlever " + item.username + " de la liste noire");
        let tdRemovePseudo = document.createElement("td");
        tdRemovePseudo.style.verticalAlign = "bottom";
        tdRemovePseudo.appendChild(document.createTextNode(item.username));
        tdRemovePseudo.style.cursor = "default";
        trRemove.appendChild(tdRemovePseudo);
        let tdInputRemove = document.createElement("td");
        tdInputRemove.style.textAlign = "right";
        let inputRemove = document.createElement("input");
        inputRemove.setAttribute("type", "image");
        inputRemove.setAttribute("src", img_remove);
        inputRemove.dataset.pseudo = item.username;
        inputRemove.style.marginLeft = "8px";
        inputRemove.addEventListener("click", function() {
          let pseudo = this.dataset.pseudo;
          removeFromBlacklist(pseudo, function(){
              hidePosts();
              hideQuotes();
              showPosts();
              showQuotes();
              displayBlackListManagement();
          });
        }, false);
        tdInputRemove.appendChild(inputRemove);
        trRemove.appendChild(tdInputRemove);
        tableList.appendChild(trRemove);
      }
      divBlackListManagement.appendChild(tableList);
      // positionnement et affichage de la fenêtre
      divBlackListManagement.style.top = divBlackListManagementPosition.top;
      divBlackListManagement.style.left = divBlackListManagementPosition.left;
      divBlackListManagement.style.display = "block";
      root.appendChild(divBlackListManagement);
    }

    // affichage de la fenêtre d'ajout / suppression d'un pseudal
    function displayBlackListQuestion(event) {
      event.stopPropagation();
      let pseudoValue = this.parentElement.parentElement.querySelector("div > b.s2").firstChild.nodeValue;
      // suppression des fenêtres ouvertes
      hidePopups();
      // construction de la fenêtre
      let divBlackListQuestion = document.createElement("div");
      divBlackListQuestion.setAttribute("id", "hfrBlackListQuestion");
      divBlackListQuestion.style.position = "absolute";
      divBlackListQuestion.style.border = "1px solid grey";
      divBlackListQuestion.style.padding = "8px";
      divBlackListQuestion.style.background = "white";
      divBlackListQuestion.style.zIndex = "1001";
      divBlackListQuestion.style.cursor = "default";
      let divQuestion = document.createElement("div");
      divQuestion.style.fontSize = "8pt";
      let divValidation = document.createElement("div");
      divValidation.style.marginTop = "8px";
      divValidation.style.textAlign = "right";
      let inputOk = document.createElement("input");
      inputOk.setAttribute("type", "image");
      inputOk.setAttribute("src", img_ok);
      inputOk.setAttribute("title", "Valider");
      if(isPseudoBlacklisted(pseudoValue)) {
        divQuestion.appendChild(document.createTextNode("Enlever " + pseudoValue + " de la liste noire ?"));
        inputOk.addEventListener("click", function() {
          removeFromBlacklist(pseudoValue, function(){
              hidePosts();
              hideQuotes();
              showPosts();
              showQuotes();
              hidePopups();
          });
        }, false);
      } else {
        divQuestion.appendChild(document.createTextNode("Ajouter " + pseudoValue + " à la liste noire ?"));
        inputOk.addEventListener("click", function() {
          addToBlacklist(pseudoValue, function(){
              hidePosts();
              hideQuotes();
              hidePopups();
          });
        }, false);
      }
      let inputCancel = document.createElement("input");
      inputCancel.setAttribute("type", "image");
      inputCancel.setAttribute("src", img_cancel);
      inputCancel.style.marginLeft = "8px";
      inputCancel.setAttribute("title", "Annuler");
      inputCancel.addEventListener("click", function() {
        hidePopups();
      }, false);
      divValidation.appendChild(inputOk);
      divValidation.appendChild(inputCancel);
      divBlackListQuestion.appendChild(divQuestion);
      divBlackListQuestion.appendChild(divValidation);
      // positionnement et affichage de la fenêtre
      divBlackListQuestion.style.top = (window.pageYOffset + event.clientY + 8) + "px";
      divBlackListQuestion.style.left = (event.clientX + 8) + "px";
      divBlackListQuestion.style.display = "block";
      root.appendChild(divBlackListQuestion);
    }

    // suppression des fenêtres ouvertes
    function hidePopups() {
      if(document.getElementById("hfrBlackListManagement")) {
        let divBlackListManagement = document.getElementById("hfrBlackListManagement");
        divBlackListManagement.parentElement.removeChild(divBlackListManagement);
      }
      if(document.getElementById("hfrBlackListQuestion")) {
        let divBlackListQuestion = document.getElementById("hfrBlackListQuestion");
        divBlackListQuestion.parentElement.removeChild(divBlackListQuestion);
      }
    }

    // suppression des fenêtres ouvertes en cliquant en dehors
    document.addEventListener("click", function(e) {
      let target = e.target;
      while(target !== null && target.id !== "hfrBlackListManagement" && target.id !== "hfrBlackListQuestion") {
        target = target.parentNode;
      }
      if(target === null) {
        hidePopups();
      }
    }, false);

    // masque les messages des pseudos blacklistés
    function hidePosts() {
      let posts = root.querySelectorAll("table.messagetable > tbody > tr:not(.hfrMessageListeNoire) > " +
        "td.messCase1 > div:not([postalrecall]) > b.s2");
      for(let post of posts) {
        let pseudo = post.firstChild.nodeValue;
        post = post.parentElement.parentElement.parentElement;
        if(isPseudoBlacklisted(pseudo)) {
          post.classList.add("hfrMessageListeNoire");
          post.classList.add("hfrStyleListeNoire");
          post.classList.remove("hfrMessageAvecCitationListeNoire");
          post.classList.remove("hfrStyleMessageAvecCitationListeNoire");
          let oldtr = post.parentElement.querySelector("tr.hfrInfoListeNoire");
          if(oldtr !== null) {
            post.parentElement.removeChild(oldtr);
          }
          let tr = this.document.createElement("tr");
          tr.setAttribute("id", post.querySelector("td.messCase1 > a[name]").getAttribute("name"));
          tr.classList.add("hfrInfoListeNoire");
          if(masquage_complet) {
            tr.classList.add("hfrMasquageComplet");
          }
          let td = this.document.createElement("td");
          let p = this.document.createElement("p");
          p.setAttribute("style", "font-size:8pt");
          p.appendChild(document.createTextNode(pseudo + " a été bloqué "));
          let a = this.document.createElement("a");
          a.setAttribute("href", "javascript:void(null);");
          a.appendChild(this.document.createTextNode("Afficher le message"));
          a.addEventListener("click", function(event) {
            event.preventDefault();
            let post = this.parentElement.parentElement.parentElement.nextElementSibling;
            post.parentElement.removeChild(post.previousElementSibling);
            post.classList.remove("hfrMessageListeNoire");
          }, false);
          p.appendChild(a);
          td.appendChild(p);
          tr.appendChild(td);
          post.parentElement.insertBefore(tr, post);
        } else {
          post.classList.remove("hfrStyleListeNoire");
        }
      }
    }

    // affiche les messages des pseudos retirés de la black liste
    function showPosts() {
      let posts = root.querySelectorAll("table.messagetable > tbody > tr.hfrMessageListeNoire > " +
        "td.messCase1 > div:not([postalrecall]) > b.s2");
      for(let post of posts) {
        let pseudo = post.firstChild.nodeValue;
        if(!isPseudoBlacklisted(pseudo)) {
          post = post.parentElement.parentElement.parentElement;
          post.parentElement.removeChild(post.previousElementSibling);
          post.classList.remove("hfrMessageListeNoire");
          post.classList.remove("hfrStyleListeNoire");
        }
      }
      hidePostsWithQuote();
    }

    // masque les citation des pseudos blacklistés
    function hideQuotes() {
      let quotes = root.querySelectorAll("div.container > " +
        "table.citation:not(.hfrCitationListeNoire):not(.hfrInfoListeNoire), " +
        "div.container > table.oldcitation:not(.hfrCitationListeNoire):not(.hfrInfoListeNoire)");
      for(let quote of quotes) {
        let title = quote.querySelector("tbody > tr.none > td > b.s1 > a.Topic");
        if(title && title.firstChild && title.firstChild.nodeValue &&
          title.firstChild.nodeValue.indexOf(" a écrit :") !== -1) {
          title = title.firstChild.nodeValue;
          let pseudo = title.substring(0, title.length - " a écrit :".length);
          if(isPseudoBlacklisted(pseudo)) {
            let citation = quote.classList.contains("citation") ? "citation" : "oldcitation";
            quote.classList.add("hfrCitationListeNoire");
            quote.classList.add("hfrStyleListeNoire");
            let quoteListeNoire = this.document.createElement("table");
            quoteListeNoire.classList.add(citation);
            quoteListeNoire.classList.add("hfrInfoListeNoire");
            if(masquage_complet) {
              quoteListeNoire.classList.add("hfrMasquageComplet");
            }
            let trListeNoire = document.createElement("tr");
            trListeNoire.setAttribute("class", "none");
            let tdListeNoire = document.createElement("td");
            let bListeNoire = document.createElement("p");
            bListeNoire.setAttribute("class", "s1");
            bListeNoire.appendChild(document.createTextNode(pseudo + " a été bloqué "));
            let aListeNoire = document.createElement("a");
            aListeNoire.setAttribute("href", "javascript:void(null);");
            aListeNoire.appendChild(document.createTextNode("Afficher la citation"));
            aListeNoire.addEventListener("click", function(event) {
              event.preventDefault();
              let quote = this.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
              quote.parentElement.removeChild(quote.previousElementSibling);
              quote.classList.remove("hfrCitationListeNoire");
            }, false);
            bListeNoire.appendChild(aListeNoire);
            tdListeNoire.appendChild(bListeNoire);
            trListeNoire.appendChild(tdListeNoire);
            quoteListeNoire.appendChild(trListeNoire);
            quote.parentElement.insertBefore(quoteListeNoire, quote);
          } else {
            quote.classList.remove("hfrStyleListeNoire");
          }
        }
      }
      hidePostsWithQuote();
    }

    // affiche les citations des pseudos retirés de la black liste
    function showQuotes() {
      let quotes = root.querySelectorAll("div.container > table.citation.hfrCitationListeNoire, " +
        "div.container > table.oldcitation.hfrCitationListeNoire");
      for(let quote of quotes) {
        let title = quote.querySelector("tbody > tr.none > td > b.s1 > a.Topic");
        if(title && title.firstChild && title.firstChild.nodeValue &&
          title.firstChild.nodeValue.indexOf(" a écrit :") !== -1) {
          title = title.firstChild.nodeValue;
          let pseudo = title.substring(0, title.length - " a écrit :".length);
          if(!isPseudoBlacklisted(pseudo)) {
            quote.parentElement.removeChild(quote.previousElementSibling);
            quote.classList.remove("hfrCitationListeNoire");
            quote.classList.remove("hfrStyleListeNoire");
          }
        }
      }
      showPostsWithQuote();
    }

    // masque les messages contenant des citations des pseudos blacklistés
    function hidePostsWithQuote() {
      if(messages_avec_citation) {
        let posts = root.querySelectorAll("table.messagetable > tbody > " +
          "tr:not(.hfrMessageListeNoire):not(.hfrMessageAvecCitationListeNoire)");
        for(let post of posts) {
          if(post.querySelector("div.container > table.citation.hfrCitationListeNoire, " +
              "div.container > table.oldcitation.hfrCitationListeNoire") !== null) {
            let pseudo = post.querySelector("td.messCase1 > div:not([postalrecall]) > b.s2").firstChild.nodeValue;
            post.classList.add("hfrMessageAvecCitationListeNoire");
            post.classList.add("hfrStyleMessageAvecCitationListeNoire");
            let tr = this.document.createElement("tr");
            tr.classList.add("hfrInfoListeNoire");
            if(masquage_complet) {
              tr.classList.add("hfrMasquageComplet");
            }
            let td = this.document.createElement("td");
            let p = this.document.createElement("p");
            p.setAttribute("style", "font-size:8pt");
            p.appendChild(document.createTextNode("Le message de " + pseudo + " contient une citation bloquée "));
            let a = this.document.createElement("a");
            a.setAttribute("href", "javascript:void(null);");
            a.appendChild(this.document.createTextNode("Afficher le message"));
            a.addEventListener("click", function(event) {
              event.preventDefault();
              let post = this.parentElement.parentElement.parentElement.nextElementSibling;
              post.parentElement.removeChild(post.previousElementSibling);
              post.classList.remove("hfrMessageAvecCitationListeNoire");
            }, false);
            p.appendChild(a);
            td.appendChild(p);
            tr.appendChild(td);
            post.parentElement.insertBefore(tr, post);
          } else {
            post.classList.remove("hfrStyleMessageAvecCitationListeNoire");
          }
        }
      }
    }

    // affiche les messages contenant des citations des pseudos retirés de la black liste
    function showPostsWithQuote() {
      let posts = root.querySelectorAll("table.messagetable > tbody > tr.hfrMessageAvecCitationListeNoire");
      for(let post of posts) {
        if((post.querySelector("div.container > table.citation.hfrCitationListeNoire, " +
            "div.container > table.oldcitation.hfrCitationListeNoire") === null) ||
          (messages_avec_citation === false)) {
          if(post.previousElementSibling) {
            post.parentElement.removeChild(post.previousElementSibling);
          }
          post.classList.remove("hfrMessageAvecCitationListeNoire");
          post.classList.remove("hfrStyleMessageAvecCitationListeNoire");
        }
      }
    }

    // suppression du caractère spécial dans les pseudos longs et conversion en minuscules
    function getNormalPseudo(pseudo) {
      return pseudo.replace(/\u200b/g, "").toLowerCase();
    }

    // ajoute un pseudo à la black liste
    function addToBlacklist(pseudoAAjouter, callback) {

        // We retrieve the latest version of the MPStorage datas
        LocalMPStorage.getData(function(res){
            var now = Date.now();
            // Create an entry for the pseudo to add
            var entry = {
                username : getNormalPseudo(pseudoAAjouter),
                createDate : now
            };

            // Add the new entry to the list and sort it
            LocalMPStorage.blacklist.list.push(entry);
            LocalMPStorage.blacklist.list.sort();
            // Set other relevant datas
            LocalMPStorage.blacklist.sourceName = LocalMPStorage.toolName;
            LocalMPStorage.blacklist.lastUpdate = now;

            // Add the new list to the global datas
            mpStorage.storageData.data.filter(function(d){return LocalMPStorage.version === d.version;})[0].blacklist = LocalMPStorage.blacklist;

            // And store the result with MPStorage
            mpStorage.setStorageData(mpStorage.storageData, LocalMPStorage.toolName);

            callback();
        });
    }

    // vérifie si un pseudo est dans la black liste
    function isPseudoBlacklisted(pseudoAVerifier) {
      return LocalMPStorage.blacklist.list.filter(function(d){ return getNormalPseudo(pseudoAVerifier) === getNormalPseudo(d.username);}).length > 0;
    }

    // enlève un pseudo de la black liste
    function removeFromBlacklist(pseudoAEnlever, callback) {

        // We retrieve the latest version of the MPStorage datas
        LocalMPStorage.getData(function(res){
            // Look for the pseudo to delete in the list
            let i = LocalMPStorage.blacklist.list.findIndex(function(d){ return getNormalPseudo(pseudoAEnlever) === getNormalPseudo(d.username); });

            if(i >= 0) {
                // Remove the entry from the list
                LocalMPStorage.blacklist.list.splice(i, 1);
                // Set other relevant datas
                LocalMPStorage.blacklist.sourceName = LocalMPStorage.toolName;
                LocalMPStorage.blacklist.lastUpdate = Date.now();

                // Add the new list to the global datas
                mpStorage.storageData.data.filter(function(d){return LocalMPStorage.version === d.version;})[0].blacklist = LocalMPStorage.blacklist;

                // And store the result with MPStorage
                mpStorage.setStorageData(mpStorage.storageData, LocalMPStorage.toolName);

                callback();
            }
        });
    }

    // leggo!
    addButtons();
    hidePosts();
    hideQuotes();

  }
});