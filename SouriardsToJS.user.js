// ==UserScript==
// @name          [HFR] SouriardsToJS
// @namespace     forum.hardware.fr
// @version       2019.9.20.1
// @namespace     HFR
// @description
// @include       https://forum.hardware.fr/wikismilies.php*
// @homepageURL   https://github.com/Wiripse/HFRGMTools/
// @noframes
// @grant         GM.getValue
// @grant         GM_getValue
// @grant         GM.setValue
// @grant         GM_setValue
// @grant         GM_openInTab
// @grant         GM.deleteValue

// README : Go to https://forum.hardware.fr/wikismilies.php?config=hfr.inc&alpha=a&withouttag=0&threecol=0 and roulez jeunesse !

// ==/UserScript==

var HFRTools = {
    checkPage : function() {

        return new Promise((resolve, reject) => {
            try {
                // Look for next page for the current letter
                document.querySelectorAll('.cHeader').forEach(function(item){
                    if(item.innerHTML === '&nbsp;Page Suivante&nbsp;'){
                        item.click();
                        resolve(false);
                    }
                });
                resolve(true);

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

GM.getValue('souriards', void 0).then(function(dataz) {

    var results = [];

    // Get all the icons in the current view
    document.querySelectorAll('.s2Topic').forEach(function(item){
        results.push({ code : item.querySelector('td').innerHTML,
                      img : item.querySelectorAll('th')[0].querySelector('img').src,
                      keywords : item.querySelectorAll('th')[1].querySelector('input').value
                     });
    });

    //GM.deleteValue('souriards');
    GM.setValue('souriards', dataz ? dataz.concat(results) : results);

    let currentChar = (new URL(window.location.href)).searchParams.get('alpha');
    let nextChar = 'z'.charCodeAt(0) > currentChar.charCodeAt(0) ? String.fromCharCode(currentChar.charCodeAt(0) + 1) : '|';

    HFRTools.checkPage().then(function(checkLetter){

        if(checkLetter){
            // No other page, we look for the next letter
            document.querySelectorAll('.cBackHeader').forEach(function(item, index){
                if(currentChar !== nextChar && 5 === index){
                    item.querySelectorAll('.cHeader').forEach(function(itemm){
                        if(nextChar === (new URL(itemm.href)).searchParams.get('alpha')){
                            itemm.click();
                        }
                    });
                }
            });
        }

    });


    console.warn('Result ', dataz ? dataz.concat(results) : results);

});