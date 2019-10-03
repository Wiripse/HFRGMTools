// ==UserScript==
// @name          [HFR] SuperFavs
// @author        Wiripse
// @version       2019.10.3.0
// @description   Gestion des SuperFavoris : Topics cyants mis en avant ou filtrables. Idée souflée par le génial Ezzz.
// @namespace     https://wiripse.github.io/HFRGMTools/
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjCgIILBJ4Jlj4AAAEPUlEQVRo3u3YfWjVVRgH8M91c9MWmWYyNaVGFOZL+VLqRJl2TcawLCJJLDN8KSWEElKwtH/UIhPJZiJCIIlmIKJk6rImaa6maVqCqFmoufLdfNna/PWHP+92U3fvxrb+8H7PH79znnt+z/N9nuf8znnOJYUUUrjVEUFPr8gB33lb1BRzbUWeN6U3ou1DCu1msApBrLW1QeBzsLaGvHFahbx0czVXYZtKbHPCe8rNB+9Lb8QIpMuVYQ7lAvMaMdA3xzyBy+kycB6TjWhC46sVOo/M6hB/IKMJCQxUeLVTTSADhxxqAuM5cmReG8QvsmVmNQGBWWZWD5o1gcFakSKQIlCfrbaNYTrjgDUqQ1lrwzW33rHYrB5yHbVBRUMTyLVKh7C/W54z6GGDbJR71jpkWmCCCErkO12burqmYIiNMfM87C3woWyQaYlMnWwxUQT0NbV2hXUjkG+dLFXGaibTD+iPjgZhvteRbaxSj2GrLvagX8MRGGG1lv7xvE8EKrTFX4iCle4Ai7TDR4YYrAt+bygCz/lMpgojrQL3uw/FIYHTSkMiXDLGVIsVSnc+0VGfLIFRPtXcRcOVWmgEhoJNIqL42m36gsMGKPatl3DUE/Y2BIEJlkl3wZMO2GKywtDvMnt1k40iraRhoz7uUqo3tuhteyLVyRCY5GPNnDXUEcXuxUFp8lAkCAO/yRHPeFmBcb7UFgs8riyx8sT7wDRzcNIwh+0NP7civbVBUZiKww5gjWtH7UXjLU8qtgkjUGA2ygy2Q6fQfGBt6HeRDIOwKTa/I5idrPnEBMaLOCXPHuwywjTTFNgpin2OyJUVRuIpW40xQxmmeSBZAolS0BLn5LgHXLDDQb/KkhuajeKKzSZaJOJRA71ovdut0F95chQCgVk1nvF49brLxCWd5QsEhqNEoFTEsfDX37T2rkAQ3i1uhFkCwbVnohQsttCVOEkLLURRqVhrvVGkm/b4Hp0tMkMJpuiajP+JCFzxmrv1Cds6lNkvihLnPCQNxeGm9IJ1GGmM0YgoSIZAMsfxKafC3kG0sVwPbMDf4A0P4qD9xtqlowXW4up1JwnUvgbi0d3FMNentAdbYmtjPMhTHo6Pa3sTLXVaA/HYI982JxUZ4g/wtKVOOGCSJeAb+bb50xeiTjRUCmqi2IC48UnjjIuTbLa5Lgr/96I0RSBFIP4ryInVdQ2Fy7arRLpH7FKpne7hP3Ix1NyIGqMtBIUCC2U5EZNftxH90qiRDmLOXkWsVK1OQa5e0hrc8CUlYIqlflKpq+4iquy8NiHiqA62m/mfQ7c2VPnRmRvI79SzDi40845+jrGgHnm9ca3/cz00zSfLynq8eH2x0a0eWlbIunqHzdYl6eC1sVyas3aqqiFN00srVUbFaofEidzneNIJi8P0m3o0ve7KIvWiEDU6vAFU46hlvqqfRymkkMKtjX8BU3kXUDClbEwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMTAtMDJUMDg6NDQ6MTgrMDA6MDAqoU1GAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTEwLTAyVDA4OjQ0OjE4KzAwOjAwW/z1+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=
// @downloadURL   https://github.com/Wiripse/HFRGMTools/raw/master/SuperFavs.user.js
// @updateURL     https://github.com/Wiripse/HFRGMTools/raw/master/SuperFavs.user.js
// @include       https://forum.hardware.fr/*
// @homepageURL   https://wiripse.github.io/HFRGMTools/
// @noframes
// @grant         GM.getValue
// @grant         GM_getValue
// @grant         GM.setValue
// @grant         GM_setValue
// @grant         GM.openInTab
// @grant         GM_openInTab
// @require       https://raw.githubusercontent.com/Wiripse/HFRGMTools/master/MPStorage.user.js?v=2019.10.3.0
// ==/UserScript==

// Historique
// 2019.10.3.0 : Nouvelle gestion des clics pour SuperFav. Onglet pour les MPs. Checkbox pour statut option dans les settings. Message nouvelle version.
// 2019.10.2.3 : Fix pour compatibilité VM&cie.
// 2019.10.2.2 : Meilleure gestion du nettoyage des classes.
// 2019.10.2.1 : Utilisation nouvelle methode init MPStorage. Fix style surlignage.
// 2019.10.2.0 : Gestion du hover sur les titres de topic. Nettoyage.
// 2019.10.1.2 : Init mega script. Changement icones. Gestion favori/superfavori/hideable. Le toggle d'affichage affiche/masque les hideable. Un superfavori est toujours là, mais surligné.
// 2019.10.1.1 : Fix pas de message catégorie vite pour les MP DTCloud.
// 2019.10.1.0 : Fix toggle favs/superFavs avec DTCloud. Colorier toute la ligne d'un superFav. Affichage d'un message de catégorie vide. Gestion par classes et plus par style directement.
// 2019.9.30.1 : Fix pour que ça fonctionne aussi dans les drapals de catégories
// 2019.9.30.0 : Premier jet

const version = '2019.10.3.0';

//**********************************************************************//
//************************* GM/VM/TM/FDP SHIT **************************//
//**********************************************************************//
if(typeof GM === 'undefined') {
    this.GM={};
}
if(typeof GM_getValue !== 'undefined' && typeof GM.getValue === 'undefined') {
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
if(typeof GM_setValue !== 'undefined' && typeof GM.setValue === 'undefined') {
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
if(typeof GM_openInTab !== 'undefined' && typeof GM.openInTab === 'undefined') {
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
        list : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjCgILMjh1mhCoAAAAcElEQVQoz2NkOMxwlAE3sGJg6GDABzqYoAxGXCqYoNJlDHnYFbAwMDAwMPxn+MvAwMDA0MDAAZe5xTAPagtxbsAJYAqKGTLxuYGBgZWBk7ZuYGSIYgjCHw5mDD8Z1mFzA8yRhdCAwumL/7jcwEgougGwYxYcPyO9lQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0xMC0wMlQxMTo1MDo1NiswMDowMCwrrMUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMTAtMDJUMTE6NTA6NTYrMDA6MDBddhR5AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==',
        uncheck: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAABvAAAAbwHxotxDAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAADZQTFRF/////wAA5Bsb4Rsb4xoa4Rwc4xsb4Rsb4hsb4hsb4hsb4yIi4yYm8ZSU98DA98HB98LC////D8BLZgAAAAp0Uk5TAAEmcH+As7Xm9myQZpsAAABqSURBVBhXZY9JDgMhDASrbWDy/98OwfYcQhRF1LGl3gRgLiMrEhDIhgComYXQcL7ELOEXP+6QXcKUhaySutU7eIvAfQVMjQZyr7KIgqWXAeoiVwG5hWbU+yNsS0rbcoQetcewc/pxjv/7D9JkQzloZ2NlAAAAAElFTkSuQmCC',
        check : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAARuAAAEbgHQo7JoAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAGxQTFRF////AP//KK6GJK2JJK+JJq2HJa6HJa+JJa6IJa6IJa6IJq6IKK+JKK+KK7CLLrGNM7OPNLOQNbSRObWTPLeVQLiWRLmZRrqaVsCjY8WqacetgNC5htK9j9XCltjGndrJruHTtuTXueXZvufcQhO/KQAAAAp0Uk5TAAEmcH+As7Xm9myQZpsAAAB3SURBVBhXZY9HEgMhEAMFLLPQzjnH/f8ffcCmtkzfNFXSSJIkHy0li14FFzIA5OAkyfVUeicpMCJIPle1XZG9YtXLYQOd7Kfn7wNgSjBbAJPnESApwW7Yw+NMORiwfp2ul2K0Ejq9375J3fgtkH1brK3ejPub/wG/CwjxA06BTgAAAABJRU5ErkJggg==',
        update : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGmSURBVDiNfZO/TxRxEMU/M4t3excqGzsLG6NQACGRkDu8xuLs7YyJnY3BxPCjIUCppQmtlf/DRRuW42IoTCxcSKhMrKShAnJ7ZL9Dsd+73YPsTfIt5s2bmfc2s5gZpS+qxrZfa0ziKJNCmEFdh6jeKKWYWZ5FlUVUX4MtgcwDFV+5wGmb1lUv41VnaSUxMFQgwmG4hupPYBXkWaEZYBp1ewB0azuo/KEbfswVHIafMNYnmMkUBOk5JsceS3FuSenVHmF8KJA7mC5zmYR35P8fnAKxxwMCfSPWrXzF5K0Hv7OSvARzAByEMabvRt4z7AXCD5/9ncJ4PCqa7o6aAZ73Z++YSfWEKU8RnCLyIC/yb8J3GAp/mC+0M6V4C4F7OkaO6g0OwjgHRBG3naecinWrXzDeeyjmLJnjlaVE9QbqOsA0l0lIvbaAuC2g7bkDVJ6I7d9bRPUICLKpNkMa3B81l4XwmWZ/Q2kNfgEbHt2lmZz4oylrvkZYp5lsZvuGp1w4zzH5Q7nYb5AjnPvmlzI+4HYUh6z0pcxJ+d/YuurhtI1xXMoBbgBUfcoHfzS1QAAAAABJRU5ErkJggg==',
    },
    createOnglet: function(icon, title, onClickMethod, rightClickMethod){
        // **********
        // HFR4K_GM
        // Create a header tab ('onglet')
        // icon : Icon of the tab
        // title : Title of the tab
        // onClickMethod : Method to execute on click on the tab. Called with the Element tab itself as parameter.
        // rightClickMethod : Method to execute on rightClick on the tab. Called with the Element tab itself as parameter.
        // **********

        if (document.querySelector('.cadreonglet')){
            var onglets = document.querySelector('.cadreonglet');

            // Rounded border left
            var nBfOnglet = document.createElement('div');
            nBfOnglet.classList.add('beforonglet', 'customTabGM');
            nBfOnglet.innerHTML = '&nbsp;';
            onglets.appendChild(nBfOnglet);

            // Create the new tab
            var newTab = document.createElement('a');
            newTab.classList.add('onglet', 'customTabGM');
            newTab.setAttribute('title', title);
            var imgNewTab = document.createElement('img');
            imgNewTab.setAttribute('src', icon);
            newTab.appendChild(imgNewTab);
            // Handle onclick
            newTab.onclick = function () {
                onClickMethod(newTab);
            };
            // Handle rightClick
            newTab.oncontextmenu = function () {
                rightClickMethod(newTab);
                // Block contextmenu
                return false;
            };
            onglets.appendChild(newTab);

            // Rounded border right
            var nAfOnglet = document.createElement('div');
            nAfOnglet.classList.add('afteronglet', 'customTabGM');
            nAfOnglet.innerHTML = '&nbsp;';
            onglets.appendChild(nAfOnglet);
        }

    },
    removeClassesFromElement: function(element, classes){
        // **********
        // HFR4K_GM
        // Remove the classes (array of string) from the given Element
        // **********
        classes.forEach(function(classe){
            element.classList.remove(classe);
        });
    },
    checkDataStorage: function(){
        // **********
        // HFR4K_GM
        // Init LocalMPStorage datas if something missing
        // **********

        if(!LocalMPStorage.datas.superFavs){
            LocalMPStorage.datas.superFavs = { list : [], hideableList: [], showHideable : false, settings : {}};
        }
        if (!LocalMPStorage.datas.superFavs.hideableList){
            LocalMPStorage.datas.superFavs.hideableList = [];
            LocalMPStorage.datas.superFavs.showHideable = false;
        }
        if (!LocalMPStorage.datas.superFavs.settings){
            LocalMPStorage.datas.superFavs.settings = {};
        }
        if (!LocalMPStorage.datas.hfr4k){
            LocalMPStorage.datas.hfr4k = { lastVersion : '2000.1.1.0'};
        }
    },
    isNewVersion: function(){
        // **********
        // HFR4K_GM
        // Check if the current version of the script is newer than the one last used by the user
        // Return boolean
        // **********

        var localV = 1;
        version.split('.').forEach(function(n, i){
            if(i<3){
                localV *= parseInt(n);
            }else{
                localV += parseInt(n);
            }
        });

        var storageV = 1;
        LocalMPStorage.datas.hfr4k.lastVersion.split('.').forEach(function(n, i){
            if(i<3){
                storageV *= parseInt(n);
            }else{
                storageV += parseInt(n);
            }
        });
        return localV > storageV;
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
        superFavs : 'SuperFavs',
        hfr4k : 'HFR4K'
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
                        HFRGMUtils.checkDataStorage();
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
            case LocalMPStorage.domains.hfr4k:
                LocalMPStorage.datas.hfr4k.sourceName = LocalMPStorage.toolName;
                LocalMPStorage.datas.hfr4k.lastUpdate = Date.now();
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
    /* Toggle to show/hide settings */
    showSettings : false,
    /* Element of the main tab */
    mainTab: void 0,
    /* Functions */
    initPromise: function(){
        // **********
        // HFR4K_GM
        // Init the script as a promise
        // **********
        return LocalMPStorage.initMPStorage();
    },
    fullRender: function(){
        // **********
        // HFR4K_GM
        // Make the full rendering of the current page (when a new page is open)
        // **********

        // Custom CSS
        var style = document.createElement('style');
        style.type = 'text/css';
        var superFavRowStyle = '.superFavRow { background-color : '+LocalMPStorage.datas.superFavs.settings.superFavColor+'; } .superFavRow:hover, .superFavRow:hover .superFavRowAlt{ background-color: '+LocalMPStorage.datas.superFavs.settings.superFavColorHover+';}';
        var superFavRowStyleAlt = '.superFavRowAlt { background-color : '+LocalMPStorage.datas.superFavs.settings.superFavColorHover+'; }';
        var favRowStyle = '.favRow { background-color : #F7F7F7; } .favRow:hover, .favRow:hover .favRowAlt{ background-color: #DEDFDF;}';
        var favRowStyleAlt = '.favRowAlt { background-color : #DEDFDF; }';
        var hiddenFav = '.hiddenFav { display : none; }';
        style.appendChild(document.createTextNode(superFavRowStyle));
        style.appendChild(document.createTextNode(superFavRowStyleAlt));
        style.appendChild(document.createTextNode(favRowStyle));
        style.appendChild(document.createTextNode(favRowStyleAlt));
        style.appendChild(document.createTextNode(hiddenFav));
        style.appendChild(document.createTextNode('.hfr4kHiddenTab { display : none; }'));
        style.appendChild(document.createTextNode('.hfr4kLabelSettingItem { padding-left: 5rem;}'));
        style.appendChild(document.createTextNode('.hfr4kColorBox { width: 1rem; height: 1rem; display: inline-block; background-color: #D2B2FF;}'));
        style.appendChild(document.createTextNode('.hfr4kUpdateBox { background-color: #FF464B;} .hfr4kUpdateBox:hover { font-weight : bold;  cursor: pointer; }'));
        document.head.appendChild(style);


        // Remove MP Link
        var mpHead = document.querySelector('table.none > tbody > tr > td > div.left');
        if(mpHead != null) {
            mpHead.innerHTML = '';
        }

        // Check version to display a message if necessary
        if(HFRGMUtils.isNewVersion()){
            if(mpHead != null) {
                // Create New version message
                let divMessageVersion = document.createElement('div');
                divMessageVersion.classList.add('left', 'hfr4kUpdateBox');
                divMessageVersion.onclick = function(){
                    // Save the fact user knows about the new version
                    LocalMPStorage.datas.hfr4k.lastVersion = version;
                    LocalMPStorage.updateMPStorage(LocalMPStorage.domains.hfr4k);
                    // Send him to the changelog
                    GM.openInTab('https://wiripse.github.io/HFRGMTools/#changelog');
                };
                let imgUpgradeVersion = document.createElement('img');
                imgUpgradeVersion.setAttribute('src', HFRGMUtils.icons.update);
                imgUpgradeVersion.style.verticalAlign = 'bottom';
                divMessageVersion.appendChild(imgUpgradeVersion);
                divMessageVersion.appendChild(document.createTextNode('\u00a0'));
                divMessageVersion.appendChild(document.createTextNode('Version '+ version + ' installée. Voir les nouveautés.'));
                mpHead.appendChild(divMessageVersion);
            }
        }


        // Identify the main table to be able to hide it next
        if(document.querySelectorAll('.main')){
            document.querySelectorAll('.main').forEach((tab) => {
                if (!tab.classList.contains('fastsearchMain') && !tab.classList.contains('hfrGMCustom')) {
                    HFR4K.mainTab = tab;
                    tab.classList.add('hfr4kMainTab');
                }
            });
        }

        // Rest of the rendering
        HFR4K.simpleRender();

    },
    simpleRender: function(){
        // **********
        // HFR4K_GM
        // Make the partial rendering of the current page (when something as changed after a user action)
        // **********

        // Render tabs
        HFR4K.renderTabs();

        // Render Favs
        HFR4K.renderFavs();

    },
    createTableSettings: function(classes, elementAfter){
        // **********
        // HFR4K_GM
        // Create table settings
        // **********
        var table = document.createElement('table');
        table.classList.add('main', 'hfrGMCustom', ...classes);
        table.setAttribute('cellspacing', 0);
        table.setAttribute('cellpadding', 2);
        var taBody = document.createElement('tbody');
        table.appendChild(taBody);


        var rowTitle = document.createElement('tr');
        rowTitle.classList.add('cBackHeader', 'fondForum1fCat');
        var title = document.createElement('th');
        // TODO Style plus propre
        title.innerHTML = 'Paramètres HFR4K<br /><br /><br />';
        title.setAttribute('colspan', 2);
        rowTitle.appendChild(title);
        taBody.appendChild(rowTitle);


        // *** Favoris *** //
        var catFavoris = document.createElement('tr');
        catFavoris.classList.add('cBackHeader', 'fondForum1fCat', 'hfr4kSettingRow');

        var colFavTitle = document.createElement('th');
        colFavTitle.setAttribute('colspan', 2);
        colFavTitle.setAttribute('scope', 'col');
        colFavTitle.innerHTML = 'Super Favoris';
        catFavoris.appendChild(colFavTitle);
        taBody.appendChild(catFavoris);

        // Setting Fav Activation
        var rowFavStatus = document.createElement('tr');
        rowFavStatus.classList.add('sujet', 'ligne_booleen', 'cBackCouleurTab3', 'hfr4kSettingRow');
        var colFavStatusTitle = document.createElement('td');
        colFavStatusTitle.setAttribute('scope', 'row');
        colFavStatusTitle.classList.add('sujetCase3', 'hfr4kLabelSettingItem');
        colFavStatusTitle.innerHTML = '<span class="cCatTopic">Activer ?</span>';
        rowFavStatus.appendChild(colFavStatusTitle);
        var colFavStatusCb = document.createElement('td');
        colFavStatusCb.setAttribute('scope', 'row');
        colFavStatusCb.classList.add('sujetCase3', 'hfr4kLabelSettingItem');
        var cbFavStatus = document.createElement('input');
        cbFavStatus.setAttribute('type', 'checkbox');
        cbFavStatus.checked = LocalMPStorage.datas.superFavs.settings.active;
        cbFavStatus.onclick = function(){
            LocalMPStorage.datas.superFavs.settings.active = !LocalMPStorage.datas.superFavs.settings.active;
            cbFavStatus.checked = LocalMPStorage.datas.superFavs.settings.active;
            LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
            // Render tabs
            HFR4K.renderTabs();
        };
        colFavStatusCb.appendChild(cbFavStatus);
        rowFavStatus.appendChild(colFavStatusCb);
        taBody.appendChild(rowFavStatus);

        // Setting Fav Color
        var rowFavColor = document.createElement('tr');
        rowFavColor.classList.add('sujet', 'ligne_booleen', 'cBackCouleurTab3', 'hfr4kSettingRow');
        var colFavColorTitle = document.createElement('td');
        colFavColorTitle.setAttribute('scope', 'row');
        colFavColorTitle.classList.add('sujetCase3', 'hfr4kLabelSettingItem');
        colFavColorTitle.innerHTML = '<span class="cCatTopic">Couleur SuperFav</span>';
        rowFavColor.appendChild(colFavColorTitle);
        var colFavColorVal = document.createElement('td');
        colFavColorVal.setAttribute('scope', 'row');
        colFavColorVal.classList.add('sujetCase3', 'hfr4kLabelSettingItem');
        var colorBoxFavColor = document.createElement('span');
        colorBoxFavColor.classList.add('hfr4kColorBox');
        colorBoxFavColor.style = 'background-color : '+(LocalMPStorage.datas.superFavs.settings.superFavColor ? LocalMPStorage.datas.superFavs.settings.superFavColor : '#D2B2FF')+ ';';
        colFavColorVal.appendChild(colorBoxFavColor);
        var favColorInput = document.createElement('input');
        favColorInput.setAttribute('type', 'text');
        favColorInput.value = LocalMPStorage.datas.superFavs.settings.superFavColor ? LocalMPStorage.datas.superFavs.settings.superFavColor : '#D2B2FF';
        favColorInput.onchange = function(){
            if(favColorInput.value){
                var favColor = favColorInput.value.replace('#', '');
                if(favColor.length === 6 && favColor.match(/^[0-9a-fA-F]+$/)){
                    colorBoxFavColor.style = 'background-color : #'+favColor+';';
                    LocalMPStorage.datas.superFavs.settings.superFavColor = '#'+favColor;
                    LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                }
            }
        }
        colFavColorVal.appendChild(favColorInput);
        rowFavColor.appendChild(colFavColorVal);
        taBody.appendChild(rowFavColor);

        // Setting Fav Color Hover
        var rowFavColorHover = document.createElement('tr');
        rowFavColorHover.classList.add('sujet', 'ligne_booleen', 'cBackCouleurTab3', 'hfr4kSettingRow');
        var colFavColorHoverTitle = document.createElement('td');
        colFavColorHoverTitle.setAttribute('scope', 'row');
        colFavColorHoverTitle.classList.add('sujetCase3', 'hfr4kLabelSettingItem');
        colFavColorHoverTitle.innerHTML = '<span class="cCatTopic">Couleur Hover SuperFav</span>';
        rowFavColorHover.appendChild(colFavColorHoverTitle);
        var colFavColorHoverVal = document.createElement('td');
        colFavColorHoverVal.setAttribute('scope', 'row');
        colFavColorHoverVal.classList.add('sujetCase3', 'hfr4kLabelSettingItem');
        var colorBoxFavColorHover = document.createElement('span');
        colorBoxFavColorHover.classList.add('hfr4kColorBox');
        colorBoxFavColorHover.style = 'background-color : '+(LocalMPStorage.datas.superFavs.settings.superFavColorHover ? LocalMPStorage.datas.superFavs.settings.superFavColorHover : '#B580FF')+ ';';
        colFavColorHoverVal.appendChild(colorBoxFavColorHover);
        var favColorHoverInput = document.createElement('input');
        favColorHoverInput.setAttribute('type', 'text');
        favColorHoverInput.value = LocalMPStorage.datas.superFavs.settings.superFavColorHover ? LocalMPStorage.datas.superFavs.settings.superFavColorHover : '#B580FF';
        favColorHoverInput.onchange = function(){
            if(favColorHoverInput.value){
                var favColorHover = favColorHoverInput.value.replace('#', '');
                if(favColorHover.length === 6 && favColorHover.match(/^[0-9a-fA-F]+$/)){
                    colorBoxFavColorHover.style = 'background-color : #'+favColorHover+';';
                    LocalMPStorage.datas.superFavs.settings.superFavColorHover = '#'+favColorHover;
                    LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                }
            }
        }
        colFavColorHoverVal.appendChild(favColorHoverInput);
        rowFavColorHover.appendChild(colFavColorHoverVal);
        taBody.appendChild(rowFavColorHover);

        // FIRE IN THE HOLE !!!
        elementAfter.parentNode.insertBefore(table, elementAfter);
    },
    renderTabs: function(){
        // **********
        // HFR4K_GM
        // Create the headers tabs ('onglet')
        // **********

        // Delete previous tabs
        document.querySelectorAll('.customTabGM').forEach(function(customTab){
            customTab.parentNode.removeChild(customTab);
        });

        // Tab for MPs
        // TODO Not on MP page obvs
        HFRGMUtils.createOnglet('https://forum-images.hardware.fr/themes_static/images_forum/1/pv.gif' ,'Aller aux MPs', function(tab){
            window.location = 'https://forum.hardware.fr/forum1.php?config=hfr.inc&cat=prive&page=1&subcat=&sondage=0&owntopic=0&trash=0&trash_post=0&moderation=0&new=0&nojs=0&subcatgroup=0';
        });

        // Create tab for the settings
        if(HFR4K.mainTab){
            HFRGMUtils.createOnglet(HFRGMUtils.icons.settings ,'Réglages/Retour aux topics', function(tab){
                HFR4K.showSettings = !HFR4K.showSettings;
                tab.querySelector('img').setAttribute('src', HFR4K.showSettings ? HFRGMUtils.icons.list : HFRGMUtils.icons.settings);
                if(HFR4K.showSettings){
                    // Show the settings/hide the topics
                    if(!document.querySelector('.hfr4kSettings')){
                        // Create table settings if necessary
                        HFR4K.createTableSettings(['hfr4kSettings', 'hfr4kHiddenTab'], HFR4K.mainTab);
                    }
                    document.querySelector('.hfr4kMainTab').classList.add('hfr4kHiddenTab');
                    document.querySelector('.hfr4kSettings').classList.remove('hfr4kHiddenTab');
                }else{
                    // Hide the settings/show the topics
                    document.querySelector('.hfr4kMainTab').classList.remove('hfr4kHiddenTab');
                    document.querySelector('.hfr4kSettings').classList.add('hfr4kHiddenTab');
                    // Render the result
                    HFR4K.simpleRender();
                }
            });
        }


        // FIXME : Useless test bcz script set to only work on those pages. But a nice idea would be to create util methods (isOnMP, isOnCyan...) to check where we are
        if (document.location.href.indexOf('https://forum.hardware.fr/forum1f.php') === 0 || (document.location.href.indexOf('https://forum.hardware.fr/forum1.php') === 0 && document.querySelector('.cadreonglet'))) {

            // Tab for SuperFav
            if(LocalMPStorage.datas.superFavs.settings.active){
                HFRGMUtils.createOnglet(LocalMPStorage.datas.superFavs.onlySF ? HFRGMUtils.icons.fullHeart : (LocalMPStorage.datas.superFavs.showHideable ? HFRGMUtils.icons.hide : HFRGMUtils.icons.eye), 'Afficher/masquer les (super)favoris', function(tab){
                    LocalMPStorage.datas.superFavs.showHideable = !LocalMPStorage.datas.superFavs.showHideable;
                    if(LocalMPStorage.datas.superFavs.showHideable){
                        LocalMPStorage.datas.superFavs.onlySF = false;
                    }
                    tab.querySelector('img').setAttribute('src', LocalMPStorage.datas.superFavs.onlySF ? HFRGMUtils.icons.fullHeart : (LocalMPStorage.datas.superFavs.showHideable ? HFRGMUtils.icons.hide : HFRGMUtils.icons.eye));
                    LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                    HFR4K.renderFavs();
                }, function(tab){
                    LocalMPStorage.datas.superFavs.onlySF = !LocalMPStorage.datas.superFavs.onlySF;
                    if(LocalMPStorage.datas.superFavs.onlySF){
                        LocalMPStorage.datas.superFavs.showHideable = false;
                    }
                    tab.querySelector('img').setAttribute('src', LocalMPStorage.datas.superFavs.onlySF ? HFRGMUtils.icons.fullHeart : (LocalMPStorage.datas.superFavs.showHideable ? HFRGMUtils.icons.hide : HFRGMUtils.icons.eye));
                    LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                    HFR4K.renderFavs();
                    // Block contextmenu
                    return false;
                });
            }

        }
    },
    renderFavs: function(){
        // **********
        // HFR4K_GM
        // Rendering of the favorites
        // **********

        if (document.location.href.indexOf('https://forum.hardware.fr/forum1f.php') === 0 || (document.location.href.indexOf('https://forum.hardware.fr/forum1.php') === 0 && document.querySelector('.cadreonglet'))) {

            // Reset display
            document.querySelectorAll('.superFavRow, .superFavRowAlt, .favRow, .favRowAlt, .hiddenFav').forEach(function(item){
                HFRGMUtils.removeClassesFromElement(item, ['superFavRow', 'superFavRowAlt', 'favRow', 'favRowAlt', 'hiddenFav']);
            });

            // Render if necessary
            if(LocalMPStorage.datas.superFavs.settings.active){

                var topicRows = document.querySelectorAll('.sujet');
                // Iterate on each topic
                topicRows.forEach(function(topicRow){

                    // Remove onmouse events added by some HFR conf
                    topicRow.setAttribute('onmouseover', void 0);
                    topicRow.setAttribute('onmouseout', void 0);

                    var topic = topicRow.querySelector('.sujetCase3');
                    if(!topicRow.classList.contains('privateMessage') && !topicRow.classList.contains('hfr4kSettingRow') && topic){
                        // privateMessage class : fix to work with DTCloud

                        var topicUrl = new URLSearchParams(topic.querySelector('a').href);
                        var topicId = parseInt(topicUrl.get('post'));

                        if(LocalMPStorage.datas.superFavs.hideableList.indexOf(topicId) > -1){
                            // Hideable topic

                            if(!LocalMPStorage.datas.superFavs.onlySF){
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

                                    // Handle onclick to add to remove from Hideable list
                                    newImgBlocHide.onclick = function() {
                                        // Remove from Hideable
                                        let i = LocalMPStorage.datas.superFavs.hideableList.findIndex(function(item){ return topicId === item; });
                                        if(0<=i){
                                            LocalMPStorage.datas.superFavs.hideableList.splice(i, 1);
                                        }
                                        // Update MPStorage
                                        LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                                        // Render the result
                                        HFR4K.renderFavs();
                                    };

                                    // Handle rightclick to add to SuperFavs list
                                    newImgBlocHide.oncontextmenu = function(){
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

                                        // Block contextmenu
                                        return false;
                                    };
                                    imgBlocHide.appendChild(newImgBlocHide);

                                }else{
                                    // Don't display hideable topics
                                    topicRow.classList.add('hiddenFav');
                                }
                            }else {
                                // Don't display hideable topics
                                topicRow.classList.add('hiddenFav');
                            }


                        } else if (LocalMPStorage.datas.superFavs.list.indexOf(topicId) > -1){
                            // Super Favorite topic
                            // Always showed

                            // Special background color if not only SuperFav
                            if(!LocalMPStorage.datas.superFavs.onlySF){
                                topicRow.classList.add('superFavRow');
                                topicRow.querySelector('.sujetCase1').classList.add('superFavRowAlt');
                                topicRow.querySelector('.sujetCase6').classList.add('superFavRowAlt');
                                topicRow.querySelector('.sujetCase9').classList.add('superFavRowAlt');
                            }else{
                                // Only SuperFav : style like simple topic
                                topicRow.classList.add('favRow');
                                topicRow.querySelector('.sujetCase1').classList.add('favRowAlt');
                                topicRow.querySelector('.sujetCase6').classList.add('favRowAlt');
                                topicRow.querySelector('.sujetCase9').classList.add('favRowAlt');
                            }

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


                            // Handle onclick to add to Hideable list
                            newImgBlocSF.onclick = function() {
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
                            };

                            // Handle rightclick to remove from SuperFavs
                            newImgBlocSF.oncontextmenu = function(){
                                // Remove from SuperFavs
                                let i = LocalMPStorage.datas.superFavs.list.findIndex(function(item){ return topicId === item; });
                                if(0<=i){
                                    // Remove from SuperFavs
                                    LocalMPStorage.datas.superFavs.list.splice(i, 1);
                                }
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

                            if(!LocalMPStorage.datas.superFavs.onlySF){
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

                                // Handle onclick to add to Hideable list
                                newImgBloc.onclick = function() {
                                    // Add to Hideable
                                    LocalMPStorage.datas.superFavs.hideableList.push(topicId);
                                    // Update MPStorage
                                    LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                                    // Render the result
                                    HFR4K.renderFavs();

                                };

                                // Handle rightclick to add to SuperFavs list
                                newImgBloc.oncontextmenu = function(){
                                    // Add to SuperFavs
                                    LocalMPStorage.datas.superFavs.list.push(topicId);
                                    // Update MPStorage
                                    LocalMPStorage.updateMPStorage(LocalMPStorage.domains.superFavs);
                                    // Render the result
                                    HFR4K.renderFavs();

                                    // Block contextmenu
                                    return false;
                                };

                                imgBloc.appendChild(newImgBloc);
                            }else{
                                // Only SuperFav, don't display a simple fav
                                topicRow.classList.add('hiddenFav');
                            }
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

                        isCat = row.classList.contains('fondForum1fCat') && !row.classList.contains('hfr4kSettingRow');

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
    }
};



// Ok, now it's time to work
HFR4K.initPromise().then(function(){
    // LocalMPStorage done, we can render the page
    HFR4K.fullRender();
});
