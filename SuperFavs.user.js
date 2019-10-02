// ==UserScript==
// @name          [HFR] SuperFavs
// @author        Wiripse
// @version       2019.10.2.3
// @description   Gestion des SuperFavoris : Topics cyants mis en avant ou filtrables. Idée souflée par le génial Ezzz.
// @namespace     https://github.com/Wiripse/HFRGMTools/
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjCgIILBJ4Jlj4AAAEPUlEQVRo3u3YfWjVVRgH8M91c9MWmWYyNaVGFOZL+VLqRJl2TcawLCJJLDN8KSWEElKwtH/UIhPJZiJCIIlmIKJk6rImaa6maVqCqFmoufLdfNna/PWHP+92U3fvxrb+8H7PH79znnt+z/N9nuf8znnOJYUUUrjVEUFPr8gB33lb1BRzbUWeN6U3ou1DCu1msApBrLW1QeBzsLaGvHFahbx0czVXYZtKbHPCe8rNB+9Lb8QIpMuVYQ7lAvMaMdA3xzyBy+kycB6TjWhC46sVOo/M6hB/IKMJCQxUeLVTTSADhxxqAuM5cmReG8QvsmVmNQGBWWZWD5o1gcFakSKQIlCfrbaNYTrjgDUqQ1lrwzW33rHYrB5yHbVBRUMTyLVKh7C/W54z6GGDbJR71jpkWmCCCErkO12burqmYIiNMfM87C3woWyQaYlMnWwxUQT0NbV2hXUjkG+dLFXGaibTD+iPjgZhvteRbaxSj2GrLvagX8MRGGG1lv7xvE8EKrTFX4iCle4Ai7TDR4YYrAt+bygCz/lMpgojrQL3uw/FIYHTSkMiXDLGVIsVSnc+0VGfLIFRPtXcRcOVWmgEhoJNIqL42m36gsMGKPatl3DUE/Y2BIEJlkl3wZMO2GKywtDvMnt1k40iraRhoz7uUqo3tuhteyLVyRCY5GPNnDXUEcXuxUFp8lAkCAO/yRHPeFmBcb7UFgs8riyx8sT7wDRzcNIwh+0NP7civbVBUZiKww5gjWtH7UXjLU8qtgkjUGA2ygy2Q6fQfGBt6HeRDIOwKTa/I5idrPnEBMaLOCXPHuwywjTTFNgpin2OyJUVRuIpW40xQxmmeSBZAolS0BLn5LgHXLDDQb/KkhuajeKKzSZaJOJRA71ovdut0F95chQCgVk1nvF49brLxCWd5QsEhqNEoFTEsfDX37T2rkAQ3i1uhFkCwbVnohQsttCVOEkLLURRqVhrvVGkm/b4Hp0tMkMJpuiajP+JCFzxmrv1Cds6lNkvihLnPCQNxeGm9IJ1GGmM0YgoSIZAMsfxKafC3kG0sVwPbMDf4A0P4qD9xtqlowXW4up1JwnUvgbi0d3FMNentAdbYmtjPMhTHo6Pa3sTLXVaA/HYI982JxUZ4g/wtKVOOGCSJeAb+bb50xeiTjRUCmqi2IC48UnjjIuTbLa5Lgr/96I0RSBFIP4ryInVdQ2Fy7arRLpH7FKpne7hP3Ix1NyIGqMtBIUCC2U5EZNftxH90qiRDmLOXkWsVK1OQa5e0hrc8CUlYIqlflKpq+4iquy8NiHiqA62m/mfQ7c2VPnRmRvI79SzDi40845+jrGgHnm9ca3/cz00zSfLynq8eH2x0a0eWlbIunqHzdYl6eC1sVyas3aqqiFN00srVUbFaofEidzneNIJi8P0m3o0ve7KIvWiEDU6vAFU46hlvqqfRymkkMKtjX8BU3kXUDClbEwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMTAtMDJUMDg6NDQ6MTgrMDA6MDAqoU1GAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTEwLTAyVDA4OjQ0OjE4KzAwOjAwW/z1+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=
// @downloadURL   https://github.com/Wiripse/HFRGMTools/raw/master/SuperFavs.user.js
// @updateURL     https://github.com/Wiripse/HFRGMTools/raw/master/SuperFavs.user.js
// @include       https://forum.hardware.fr/forum1f.php*
// @include       https://forum.hardware.fr/forum1.php*
// @homepageURL   https://github.com/Wiripse/HFRGMTools/
// @noframes
// @grant         GM.getValue
// @grant         GM_getValue
// @grant         GM.setValue
// @grant         GM_setValue
// @require       https://raw.githubusercontent.com/Wiripse/HFRGMTools/master/MPStorage.user.js
// ==/UserScript==

// Historique
// 2019.10.2.3 : Fix pour compatibilité VM&cie.
// 2019.10.2.2 : Meilleure gestion du nettoyage des classes.
// 2019.10.2.1 : Utilisation nouvelle methode init MPStorage. Fix style surlignage.
// 2019.10.2.0 : Gestion du hover sur les titres de topic. Nettoyage.
// 2019.10.1.2 : Init mega script. Changement icones. Gestion favori/superfavori/hideable. Le toggle d'affichage affiche/masque les hideable. Un superfavori est toujours là, mais surligné.
// 2019.10.1.1 : Fix pas de message catégorie vite pour les MP DTCloud.
// 2019.10.1.0 : Fix toggle favs/superFavs avec DTCloud. Colorier toute la ligne d'un superFav. Affichage d'un message de catégorie vide. Gestion par classes et plus par style directement.
// 2019.9.30.1 : Fix pour que ça fonctionne aussi dans les drapals de catégories
// 2019.9.30.0 : Premier jet


//**********************************************************************//
//************************* GM/VM/TM/FDP SHIT **************************//
//**********************************************************************//
if(typeof GM === "undefined") {
    this.GM={};
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

//**********************************************************************//
//********************** NOW THE INTERESTING STUFF *********************//
//**********************************************************************//


/**
* Generic utils
*/
var HFRGMUtils = {
    icons : {
        eye : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjCgEMDw+wNURyAAAAy0lEQVQoz7XQPUtCARjF8V8Xl4YGL1QSRBSBETT1LRz6CGkIOWmjq0MoglCDi5O09wX8Gi2XlkuBdBXEpTluw/WFXlbPszwPz38457Bxbf3Yzx3hTST9DRZ0TKSLSbTtZ48AVEQuPKrLCzV8uRQpL5GemRI4NZG4UldVMtMT0Bcr4kFOy4tUIvSMolg/t3JxaEdNYXGla+eBrhvXDmx7N8CtE5+mngw1M6xsbmSsIS90Z2xkvjSZaU9bsor54d7uf0WdOUbs9W9RG9Q3ePU3OdDkvqEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMTAtMDFUMTI6MTU6MTUrMDA6MDBbe9hYAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTEwLTAxVDEyOjE1OjE1KzAwOjAwKiZg5AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=',
        hide : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjCgEMDiuVLZHiAAAA60lEQVQoz6XQvyvEARiA8c9dOsLg6gZxKQwmMloMJy6L1e8idaUUFlyUuwil7i9Ql9losJE/wWBSikFJV4ZLScfX4u6UnMEzvs/71tvDP4hK1NItjsQIfRu1SYgreXCuJGddgbov2S/l3pVmEc/WTJhVqN4uSIuYVBQIbMlrlzVT1ivG0elFIJCRt6ED81KELXtyglGN2BV348AYjhUthsU8giZkxd3ar7x+pxt2JNBrW17ah8CbHgw4LK9umhOt6JJVTMkIVTtMy9lzbcirS62SzpxS7hA1rE+XEfUaJF1Y8v4j6u8M1tZ/8AmbFzrFju54bwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0xMC0wMVQxMjoxNDo0MyswMDowMJ+JiDgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMTAtMDFUMTI6MTQ6NDMrMDA6MDDu1DCEAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==',
        settings : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHHSURBVDiNnZK9a5NRFMZ/z5tQQ1oaRBpEYtSI+g9Yqdghagalo4OCYBUEhw5FhKK4pOAgFsFFioPSd7CbUyUIVs3QQfwAnaoiNVStQwO11do0pDkO3lfepH72wIV7z/09zz3ncAVk3VpLFKNOXAwyZlb8DbwqJOUFjAClNVawFSBvZgBxYMDM+NMCBoC42+ejIbdjwKik7F9eHXXsLYCwQdrMPlzu63wfJDKb2gGYmln4CZ2//lSS0sHZCxnE/6HnVawHIMkD2v7DoM1pfrRgZnVJZYB3M4tnAyq3e0sN4MGzT9Emg7LTNMygKiliZtfmxnu7PXQI2RmAK317btSxe+tz/oSkCFANRGGDMeACcMkTQ2BdN8de8/VbjaO5bRc3bogfBPY65m7DDFwbL4Hhz+OnskDm/pOPLFVWMDP8wluAjLsbNrMX4QpKkvJBwi9Mpk/27Eo+f1XmzfQ8ADvTCYCkX5g8AUxLCvBS1MxGGsYzOOgtMLVje6q9O9YSIZVspWffZgQT/YnDp/vtcT2My33Jhph/2Hsb48jcl+V1i0s1UsnWZcSdxAH/eDP7SwOK+6OzdMRaVmJXAaqRyrkOZitkH9Wa0e9xGbOF14rekAAAAABJRU5ErkJggg==',
        emptyHeart : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjCR4KLC4JomLmAAAA0ElEQVQoz3XPPU7CABjG8V8rCWhaF2lD2OkEDh6iZ3BzYHHnBBrwDM46GE4hJszMpgmJHwOJbI2uxkFpROmzPR/55335VktHYKNAR6tyErdKhTcTTU1X1gqlG21Ch+49SWUyqampRE8m9WwmDkwcOa/Qdzit2NfWFHrqlHmkFNYOQmXow37t4MD7nhORRc3gzCfHVto768RKH0bmon91ZG60MWMz8VYdezD+HVxa6Faua+HiL3JoaQD6loa7jsq9yuVe5HV/DxSKH06NGhrbwRfHMyvA2fpC2gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wOS0zMFQxMDo0NDo0NiswMDowMJps0hgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDktMzBUMTA6NDQ6NDYrMDA6MDDrMWqkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==',
        fullHeart : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAARuAAAEbgHQo7JoAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAKJQTFRF////v0BAzDMzyDckwj0xvzUrwj0pwTcpvjsuwjgpvjwtvzsswDotwDsrvzgpwDsswDsqwDwrwTsswDkrwTkswTsswToqwDsqwToswDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwTsswz4vyEQ1yUU2y0c40U9A1FND3FxM3V5Og1qrkwAAACx0Uk5TAAQFDhUYGSUnMjM0OUFERUlNUlliY3N5e4mW0NTa29/g6ezt7u/x8vb4/P0b22PaAAAAgUlEQVQYGVXBiRZCQAAF0EeoaNGqhBaSpteu//+1pslxZu4FYAUjG5I9DixIfkbmK2B9JDMfcAu+6itnS/4ULmLW7xtZCSox0seHmhT5805NjoSGBBENEZySmtIBQsGWCCEtLmyIOZTpmUo1QWN4onQYoNXfk7seNN3txoPB6+DvC5T8Gy0tAjNFAAAAAElFTkSuQmCC',
    },
    createOnglet: function(icon, title, onClickMethod){
        // **********
        // HFR4K_GM
        // Create a header tab ('onglet')
        // icon : Icon of the tab
        // title : Title of the tab
        // onClickMethod : Method to execute on click on the tab. Called with the Element tab itself as parameter.
        // **********

        if (document.querySelector('.cadreonglet')){
            var onglets = document.querySelector('.cadreonglet');

            // Rounded border left
            var nBfOnglet = document.createElement('div');
            nBfOnglet.setAttribute('class', 'beforonglet');
            nBfOnglet.innerHTML = '&nbsp;';
            onglets.appendChild(nBfOnglet);

            // Create the new tab
            var newTab = document.createElement('a');
            newTab.setAttribute('class', 'onglet');
            newTab.setAttribute('title', title);
            var imgNewTab = document.createElement('img');
            imgNewTab.setAttribute('src', icon);
            newTab.appendChild(imgNewTab);
            // Handle onclick
            newTab.onclick = function () {
                onClickMethod(newTab);
            };
            onglets.appendChild(newTab);

            // Rounded border right
            var nAfOnglet = document.createElement('div');
            nAfOnglet.setAttribute('class', 'afteronglet');
            nAfOnglet.innerHTML = '&nbsp;';
            onglets.appendChild(nAfOnglet);
        }

    },
    removeClassesFromElement(element, classes){
        // **********
        // HFR4K_GM
        // Remove the classes (array of string) from the given Element
        // **********
        classes.forEach(function(classe){
            element.classList.remove(classe);
        });
    }
};

/**
* Handling locally MPStorage
*/
var LocalMPStorage = {
    /* Version of the MPStorage API used */
    version : '0.1',
    /* Current toolname used to access MPStorage */
    toolName : 'HFR4K_GM',
    /* JSON datas from MPStorage */
    datas: void 0,
    /* Scope of datas */
    domains: {
        superFavs : 'SuperFavs'
    },
    /* Methods */
    initMPStorage : function(){
        // **********
        // HFR4K_GM
        // Init MPStorage data
        // RETURN a promise
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
                        LocalMPStorage.datas = dataz.data.filter(function(d){return LocalMPStorage.version === d.version;})[0];
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
    },
    getData : function(callback){
        // **********
        // HFR4K_GM
        // Get MPStorage data and store it locally
        // CALLBACK is called with the datas from MPStorage
        // **********
        mpStorage.getStorageData(function(res){
            // Save datas locally
            LocalMPStorage.datas = res.data.filter(function(d){return LocalMPStorage.version === d.version;})[0];

            // We're done
            callback(LocalMPStorage.datas);
        });
    },
    updateMPStorage: function(domain){
        // **********
        // HFR4K_GM
        // Update MPStorage datas with local datas
        // domain : scope updated, to set relevant datas
        // **********

        // Setting relevant datas
        switch (domain) {
            case LocalMPStorage.domains.superFavs:
                LocalMPStorage.datas.superFavs.sourceName = LocalMPStorage.toolName;
                LocalMPStorage.datas.superFavs.lastUpdate = Date.now();
                break;
            case 'DTCloud':
                break;
            case 'Other':
                break;
            default:
                break;
        }

        // Add the new SuperFav datas to the global datas
        mpStorage.storageData.data.filter(function(d){return LocalMPStorage.version === d.version;})[0] = LocalMPStorage.datas;

        // And store the result with MPStorage
        mpStorage.setStorageData(mpStorage.storageData, LocalMPStorage.toolName);
    }
};

/**
* Script specific functions
*/
var HFR4K = {
    initPromise: function(){
        // **********
        // HFR4K_GM
        // Init the script as a promise
        // **********
        return LocalMPStorage.initMPStorage();
    },
    initTabs: function(){
        // **********
        // HFR4K_GM
        // Create the headers tabs ('onglet')
        // **********

        // FIXME : Useless test bcz script set to only work on those pages. But a nice idea would be to create util methods (isOnMP, isOnCyan...) to check where we are
        if (document.location.href.indexOf('https://forum.hardware.fr/forum1f.php') === 0 || (document.location.href.indexOf('https://forum.hardware.fr/forum1.php') === 0 && document.querySelector('.cadreonglet'))) {

            HFRGMUtils.createOnglet(LocalMPStorage.datas.superFavs.showHideable ? HFRGMUtils.icons.eye : HFRGMUtils.icons.hide, 'Afficher/masquer les favoris', function(tab){
                LocalMPStorage.datas.superFavs.showHideable = !LocalMPStorage.datas.superFavs.showHideable;
                tab.querySelector('img').setAttribute('src', LocalMPStorage.datas.superFavs.showHideable ? HFRGMUtils.icons.eye : HFRGMUtils.icons.hide);
                LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                HFR4K.renderFavs();
            });
        }
    },
    renderFavs: function(){
        // **********
        // HFR4K_GM
        // Rendering of the favorites
        // **********

        if (document.location.href.indexOf('https://forum.hardware.fr/forum1f.php') === 0 || (document.location.href.indexOf('https://forum.hardware.fr/forum1.php') === 0 && document.querySelector('.cadreonglet'))) {

            if(!LocalMPStorage.datas.superFavs || !LocalMPStorage.datas.superFavs.hideableList){
                // Init datas if necessary
                LocalMPStorage.datas.superFavs = { list : [], hideableList: [], showHideable : false};
            }

            // TODO : Params structure :
            // superFavColor; superFavHoverColor

            // Custom CSS
            var superFavRowStyle = '.superFavRow { background-color : #D2B2FF; } .superFavRow:hover, .superFavRow:hover .superFavRowAlt{ background-color: #B580FF;}';
            var superFavRowStyleAlt = '.superFavRowAlt { background-color : #B580FF; }';
            var favRowStyle = '.favRow { background-color : #F7F7F7; } .favRow:hover, .favRow:hover .favRowAlt{ background-color: #DEDFDF;}';
            var favRowStyleAlt = '.favRowAlt { background-color : #DEDFDF; }';
            var hiddenFav = '.hiddenFav { display : none; }';
            var style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(superFavRowStyle));
            style.appendChild(document.createTextNode(superFavRowStyleAlt));
            style.appendChild(document.createTextNode(favRowStyle));
            style.appendChild(document.createTextNode(favRowStyleAlt));
            style.appendChild(document.createTextNode(hiddenFav));
            document.head.appendChild(style);

            // Reset display
            document.querySelectorAll('.superFavRow, .superFavRowAlt, .favRow, .favRowAlt, .hiddenFav').forEach(function(item){
                HFRGMUtils.removeClassesFromElement(item, ['superFavRow', 'superFavRowAlt', 'favRow', 'favRowAlt', 'hiddenFav']);
            });

            var topicRows = document.querySelectorAll('.sujet');
            // Iterate on each topic
            topicRows.forEach(function(topicRow){

                // Remove onmouse events added by some HFR conf
                topicRow.setAttribute('onmouseover', void 0);
                topicRow.setAttribute('onmouseout', void 0);

                var topic = topicRow.querySelector('.sujetCase3');
                if(!topicRow.classList.contains('privateMessage') && topic){
                    // privateMessage class : fix to work with DTCloud

                    var topicUrl = new URLSearchParams(topic.querySelector('a').href);
                    var topicId = parseInt(topicUrl.get('post'));

                    if(LocalMPStorage.datas.superFavs.hideableList.indexOf(topicId) > -1){
                        // Hideable topic
                        if(LocalMPStorage.datas.superFavs.showHideable){
                            // Display all topics

                            // Background color
                            topicRow.classList.add('favRow');
                            topicRow.querySelector('.sujetCase1').classList.add('favRowAlt');
                            topicRow.querySelector('.sujetCase6').classList.add('favRowAlt');
                            topicRow.querySelector('.sujetCase9').classList.add('favRowAlt');

                            // Create icon to manage the status
                            var imgBlocHide = topicRow.querySelector('.sujetCase2');
                            imgBlocHide.removeChild(imgBlocHide.querySelector('img'));
                            var newImgBlocHide = document.createElement('img');
                            newImgBlocHide.setAttribute('title', 'Ajouter aux super favoris/Ne plus masquer');
                            newImgBlocHide.setAttribute('src', HFRGMUtils.icons.hide);

                            // Handle onclick to add to SuperFavs list
                            newImgBlocHide.onclick = function() {
                                // Remove from Hideable
                                let i = LocalMPStorage.datas.superFavs.hideableList.findIndex(function(item){ return topicId === item; });
                                if(0<=i){
                                    LocalMPStorage.datas.superFavs.hideableList.splice(i, 1);
                                }
                                // Add to SuperFavs
                                LocalMPStorage.datas.superFavs.list.push(topicId);
                                // Update MPStorage
                                LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                                // Render the result
                                HFR4K.renderFavs();
                            };

                            // Handle rightclick to remove from Hideable list
                            newImgBlocHide.oncontextmenu = function(){
                                // Remove from Hideable
                                let i = LocalMPStorage.datas.superFavs.hideableList.findIndex(function(item){ return topicId === item; });
                                if(0<=i){
                                    LocalMPStorage.datas.superFavs.hideableList.splice(i, 1);
                                }
                                // Update MPStorage
                                LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                                // Render the result
                                HFR4K.renderFavs();

                                // Block contextmenu
                                return false;
                            };
                            imgBlocHide.appendChild(newImgBlocHide);

                        }else{
                            // Don't display hideable topics
                            topicRow.classList.add('hiddenFav');
                        }

                    } else if (LocalMPStorage.datas.superFavs.list.indexOf(topicId) > -1){
                        // Super Favorite topic

                        // Background color
                        topicRow.classList.add('superFavRow');
                        topicRow.querySelector('.sujetCase1').classList.add('superFavRowAlt');
                        topicRow.querySelector('.sujetCase6').classList.add('superFavRowAlt');
                        topicRow.querySelector('.sujetCase9').classList.add('superFavRowAlt');

                        // Create icon to manage the status
                        var imgBlocSF = topicRow.querySelector('.sujetCase2');
                        imgBlocSF.removeChild(imgBlocSF.querySelector('img'));
                        var newImgBlocSF = document.createElement('img');
                        newImgBlocSF.setAttribute('title', 'Supprimer des super favoris/Masquer');
                        newImgBlocSF.setAttribute('src', HFRGMUtils.icons.fullHeart);
                        // Handle onclick to remove from SuperFavs list
                        newImgBlocSF.onclick = function () {
                            let i = LocalMPStorage.datas.superFavs.list.findIndex(function(item){ return topicId === item; });
                            if(0<=i){
                                // Remove from SuperFavs
                                LocalMPStorage.datas.superFavs.list.splice(i, 1);
                                // Update MPStorage
                                LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                                // Render the result
                                HFR4K.renderFavs();
                            }
                        };

                        // Handle rightclick to add to Hideable list
                        newImgBlocSF.oncontextmenu = function(){
                            // Remove from SuperFavs
                            let i = LocalMPStorage.datas.superFavs.list.findIndex(function(item){ return topicId === item; });
                            if(0<=i){
                                // Remove from SuperFavs
                                LocalMPStorage.datas.superFavs.list.splice(i, 1);
                            }
                            // Add to Hideable
                            LocalMPStorage.datas.superFavs.hideableList.push(topicId);
                            // Update MPStorage
                            LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                            // Render the result
                            HFR4K.renderFavs();

                            // Block contextmenu
                            return false;
                        };
                        imgBlocSF.appendChild(newImgBlocSF);
                    } else if (topicRow.querySelector('.sujetCase2')){
                        // Simple  topic

                        // Background color
                        topicRow.classList.add('favRow');
                        topicRow.querySelector('.sujetCase1').classList.add('favRowAlt');
                        topicRow.querySelector('.sujetCase6').classList.add('favRowAlt');
                        topicRow.querySelector('.sujetCase9').classList.add('favRowAlt');

                        // Create icon to manage the status
                        var imgBloc = topicRow.querySelector('.sujetCase2');
                        imgBloc.removeChild(imgBloc.querySelector('img'));
                        var newImgBloc = document.createElement('img');
                        newImgBloc.setAttribute('title', 'Ajouter aux super favoris/Masquer');
                        newImgBloc.setAttribute('src', HFRGMUtils.icons.eye);

                        // Handle onclick to add to SuperFavs list
                        newImgBloc.onclick = function() {
                            // Add to SuperFavs
                            LocalMPStorage.datas.superFavs.list.push(topicId);
                            // Update MPStorage
                            LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                            // Render the result
                            HFR4K.renderFavs();
                        };

                        // Handle rightclick to add to Hideable list
                        newImgBloc.oncontextmenu = function(){
                            // Add to Hideable
                            LocalMPStorage.datas.superFavs.hideableList.push(topicId);
                            // Update MPStorage
                            LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                            // Render the result
                            HFR4K.renderFavs();

                            // Block contextmenu
                            return false;
                        };

                        imgBloc.appendChild(newImgBloc);
                    }

                }

            });

            if(document.location.href.indexOf('https://forum.hardware.fr/forum1f.php') === 0){
                // We manage empty categories if necessary with displaying an message

                // FIXME : Would be better to create a map representing the topics; because now we won't display an empty row for the last cat since we work backward
                // FIXME : Sync with DTCloud to add an empty row in the new "MP" cat if necessary

                // Remove existing empty rows
                document.querySelectorAll('.emptyRowFav').forEach(function(emptyRow){
                    emptyRow.parentNode.removeChild(emptyRow);
                });

                var allRows = document.querySelector('.fondForum1fCat').parentNode.querySelectorAll('tr');

                var isCat = false;
                // Id of the current cat
                var catId = 0;
                // Number of displayed topics in the current cat
                var nbTopicsCat = 0;
                // Previous cat was MP ?
                var wasPreviousMPCat = false;

                // Browse all rows
                allRows.forEach(function(row){

                    // Manage MPCat (for DTCloud)
                    var isMPCat = false;
                    if(row.querySelector('a')){
                        var catUrl = new URLSearchParams(row.querySelector('a').href);
                        isMPCat = catUrl.get('cat') === 'prive';
                    }

                    isCat = row.classList.contains('fondForum1fCat');

                    if(!isCat){
                        // Not a cat row : it's a topic, so we check if its hidden or not
                        nbTopicsCat = nbTopicsCat + (row.classList.contains('hiddenFav') ? 0 : 1);
                    } else {
                        if(catId > 0 && !wasPreviousMPCat){
                            if (nbTopicsCat == 0){
                                // The previous cat hasn't any displayed topic so we add an empty row
                                var emptyRow = document.createElement('tr');
                                emptyRow.setAttribute('class', 'sujet emptyRowFav');
                                var emptyTd = document.createElement('td');
                                emptyTd.setAttribute('colspan', 10);
                                emptyTd.innerHTML = 'Aucun nouveau message';
                                emptyRow.appendChild(emptyTd);
                                row.parentNode.insertBefore(emptyRow, row);
                            }
                        }
                        // Increment catId
                        catId++;
                        // Reset nbTopics for the new cat
                        nbTopicsCat = 0;
                        // Update status of the previous cat
                        wasPreviousMPCat = wasPreviousMPCat ? false : isMPCat;
                    }
                });
            }

        }
    }
};



// Init
HFR4K.initPromise().then(function(){
    // Init tabs
    HFR4K.initTabs();
    // Render Favs
    HFR4K.renderFavs();
});
