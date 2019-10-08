// ==UserScript==
// @name          [HFR] DTCloud
// @author        Wiripse, PetitJean, Rucous
// @version       2019.10.8.0
// @description   Gestion des DT dans le 'cloud' de chaque user via MPStorage
// @icon          http://reho.st/self/40f387c9f48884a57e8bbe05e108ed4bd59b72ce.png
// @downloadURL   https://github.com/Wiripse/HFRGMTools/raw/master/DTCloud.user.js
// @updateURL     https://github.com/Wiripse/HFRGMTools/raw/master/DTCloud.user.js
// @include       https://forum.hardware.fr/forum2.php*
// @include       https://forum.hardware.fr/forum1f.php*
// @include       https://forum.hardware.fr/forum1.php*
// @include       https://forum.hardware.fr/hfr/*
// @include       https://forum.hardware.fr
// @include       https://forum.hardware.fr/
// @homepageURL   https://github.com/Wiripse/HFRGMTools/
// @noframes
// @grant         GM.info
// @grant         GM.getValue
// @grant         GM.setValue
// @grant         GM.xmlHttpRequest
// @grant         GM.openInTab
// @grant         GM_info
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_xmlhttpRequest
// @grant         GM_registerMenuCommand
// @grant         GM_openInTab
// @require https://raw.githubusercontent.com/Wiripse/HFRGMTools/master/MPStorage.user.js?v=2019.10.8.0
// ==/UserScript==

// Historique
// 2019.10.8.0 : Fix pour init le LocalMPStorage avec gestion des multi-comptes.
// 2019.10.3.0 : Fix pour ne pas supprimer la zone de notif si utilise aussi HFR4K.
// 2019.9.19.0 : Option pour afficher ou non les mp comme catégorie.
// 2019.8.5.0 : Fork du script de PetitJean et ajout gestion MPStorage

var LocalMPStorage = {
    /* Version of the MPStorage API used */
    version : '0.1',
    /* Current toolname used to access MPStorage */
    toolName : 'DTCloud_GM',
    /* JSON datas from MPStorage about MP flags management */
    flags: void 0,
    /* Methods */
    getData : function(callback){
        // **********
        // MultiMP_GM
        // Get MPStorage data and store it locally
        // CALLBACK is called with the flags data from MPStorage data
        // **********

        mpStorage.getStorageData(function(res){
            // Save flags datas locally
            LocalMPStorage.flags = res.data.filter(function(d){return LocalMPStorage.version === d.version;})[0].mpFlags;
            // We're done
            callback(LocalMPStorage.flags);
        });
    },

    initMultiMPStorage : function(){
        // **********
        // MultiMP_GM
        // Init MPStorage multiMP data
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
                        LocalMPStorage.flags = dataz.data.filter(function(d){return LocalMPStorage.version === d.version;})[0].mpFlags;
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

    hasFlagMulti: function(postId){
        // **********
        // MultiMP_GM
        // Check if a flag exists for the post with the given ID
        // RETURN true/false
        // **********

        return LocalMPStorage.flags.list.filter(function(item){ return postId === item.post; }).length > 0;
    },

    getFlagMulti: function(postId){
        // **********
        // MultiMP_GM
        // Get a flag for the post with the given ID
        // RETURN the flag is exists, undefined otherwise
        // **********

        return LocalMPStorage.hasFlagMulti(postId) ? LocalMPStorage.flags.list.filter(function(item){ return postId === item.post; })[0] : void 0;
    },

    getFlagMultiAndPop: function(postId){
        // **********
        // MultiMP_GM
        // Get a flag for the post with the given ID and remove it from localstorage
        // RETURN the flag is exists, undefined otherwise
        // **********

        if (LocalMPStorage.hasFlagMulti(postId)){
            // Get flags' ID in localstorage
            let i = LocalMPStorage.flags.list.findIndex(function(item){ return postId === item.post; });

            if(0<=i){
                // Make a copy
                var result = LocalMPStorage.flags.list[i];;

                // Remove it from the localstorage
                LocalMPStorage.flags.list.splice(i, 1);

                // Set other relevant datas
                LocalMPStorage.flags.sourceName = LocalMPStorage.toolName;
                LocalMPStorage.flags.lastUpdate = Date.now();

                // Return the item
                return result;
            }
        }
        return void 0;
    }
}

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
            : match
            ;
        });
    };
}

HTMLElement.prototype.incrementColspan = function() {
    this.setAttribute ("colspan", (1 + parseInt (this.getAttribute ("colspan"))).toString());
};

if (typeof GM_registerMenuCommand == 'undefined') {
    GM_registerMenuCommand = (caption, commandFunc, accessKey) => {
        if (!document.body) {
            if (document.readyState === 'loading'
                && document.documentElement && document.documentElement.localName === 'html') {
                new MutationObserver((mutations, observer) => {
                    if (document.body) {
                        observer.disconnect();
                        GM_registerMenuCommand(caption, commandFunc, accessKey);
                    }
                }).observe(document.documentElement, {childList: true});
            } else {
                console.error('GM_registerMenuCommand got no body.');
            }
            return;
        }
        let contextMenu = document.body.getAttribute('contextmenu');
        let menu = (contextMenu ? document.querySelector('menu#' + contextMenu) : null);
        if (!menu) {
            menu = document.createElement('menu');
            menu.setAttribute('id', 'gm-registered-menu');
            menu.setAttribute('type', 'context');
            document.body.appendChild(menu);
            document.body.setAttribute('contextmenu', 'gm-registered-menu');
        }
        let menuItem = document.createElement('menuitem');
        menuItem.textContent = caption;
        menuItem.addEventListener('click', commandFunc, true);
        menu.appendChild(menuItem);
    };
}

function isGM4() {
    if (typeof (GM) !== "object")
        return false;
    if (typeof (GM.info) !== "object")
        return false;
    return GM.info.scriptHandler == "Greasemonkey" && parseFloat(GM.info.version) >= 4;
}

function checkImage (uri, handler) {
    var image = new Image();
    image.onload = function() {
        handler (true);
    };
    image.onerror = function() {
        handler (false);
    };
    image.src = uri;
}

var HFR = {
    openInTab : function (href, background) {
        if (isGM4())
            GM.openInTab (href, background);
        else
            GM_openInTab (href, background);
    },
    request : function (object) {
        if (isGM4())
            GM.xmlHttpRequest (object);
        else
            GM_xmlhttpRequest (object);
    },
    setCookie : function (key, val) {
        document.cookie = key + "=" + val;
    },
    getCookie : function (key) {
        var array = document.cookie.split (";");
        for (var i = 0; i < array.length; i++) {
            var k = array[i].substring (0, array[i].indexOf ("=")).trim();
            var v = array[i].substring (1 + array[i].indexOf ("="));
            if (key == k)
                return v;
        }
        return "";
    },
    setLocalValue : function (key, val) {
        localStorage.setItem (key, val);
    },
    Uri : function (data) {
        var link = document.createElement ("a");
        link.href = data;

        this.scheme = link.protocol;
        this.host = link.hostname;
        this.port = 0;
        if (link.port.length > 0)
            this.port = parseInt(link.port);
        if (this.scheme == "http:"  && this.port == 0)
            this.port = 80;
        if (this.scheme == "https:"  && this.port == 0)
            this.port = 443;
        this.username = link.username;
        this.password = link.password;
        this.path = link.pathname;
        this.parameters = {};
        if (link.search !== null && link.search.length > 0) {
            var q = link.search.substring(1);
            var p = q.split('&');
            for (var i = 0; i < p.length; i++) {
                var k = p[i].split('=')[0];
                if (p[i].indexOf('=') > 0)
                    this.parameters[k] = p[i].split('=')[1];
                else
                    this.parameters[k] = null;
            }
        }
        if (link.hash !== null)
            this.fragment = link.hash.substring(1);

        this.toString = function (b) {
            var result = this.scheme + "//";
            if (this.username != null && this.username.length > 0) {
                result += this.username;
                if (this.password != null && this.password.length > 0)
                    result += (":" + this.password);
                result += "@";
            }
            result += this.host;
            if (!(this.scheme == "http:" && this.port == 80 || this.scheme == "https:" && this.port == 443))
                result += (":" + this.port);
            if (this.path != "/")
                result += this.path;
            if (b == false)
                return result;
            var search = [];
            for (var key in this.parameters) {
                search.push (key + "=" + this.parameters[key]);
            }
            if (search.length > 0)
                result += ("?" + search.join ("&"));
            if (this.fragment != null && this.fragment.toString().length > 0)
                result += ("#" + this.fragment);
            return result;
        }
    },
    setValue : function (key, data) {
        if (!isGM4()) {
            GM_setValue (key, data);
            return;
        }
        if (typeof (data) === "object")
            localStorage.setItem (GM.info.script.name + " :: " + key, JSON.stringify (data));
        else
            localStorage.setItem (GM.info.script.name + " :: " + key, data);
    },
    getValue : function (key) {
        if (!isGM4())
            return GM_getValue (key);
        var rk = GM.info.script.name + " :: " + key;
        var data = localStorage.getItem (rk);
        try {
            var obj = JSON.parse (data);
            return obj;
        }
        catch(e) {}
        return data;
    },
    getProfile : function (html) {
        var profile = {};
        var doc = new DOMParser().parseFromString (html, "text/html");
        for (var i = 0; i < doc.querySelectorAll (".profilCase2").length; i++) {
            var case2 = doc.querySelectorAll (".profilCase2").item (i);
            var c2 = case2.textContent.trim();
            var c3 = case2.nextElementSibling.textContent.trim();
            var c3_html = case2.nextElementSibling.innerHTML.trim();
            if (c2.startsWith ("Citation personnelle") && c3 != "Vous n'avez pas accès à cette information" && c3.trim().length > 0)
                profile.quote = c3_html;
            if (c2.startsWith ("Signature des messages") && c3 != "Vous n'avez pas accès à cette information" && c3.trim().length > 0)
                profile.signature = c3_html;
        }
        return profile;
    },
    findProfile : function (pseudo, user_data, callback) {
        HFR.request ({
            method : "GET",
            url : "https://forum.hardware.fr/profilebdd.php?config=hfr.inc&pseudo=" + encodeURIComponent (pseudo),
            context : user_data,
            onload : function (response) {
                if (this.context != null)
                    user_data = this.context;
                callback (user_data, HFR.getProfile (response.responseText));
            }
        });
    }
};

LocalMPStorage.initMultiMPStorage().then(function(){
    if (typeof HFR.getValue ("hfr-multimp-notifications-table") != "object") {
        HFR.setValue ("hfr-multimp-notifications-table", {});
    }

    if (typeof HFR.getValue("hfr-multimp-flags") != "object") {
        HFR.setValue("hfr-multimp-flags", {});
    }

    if (typeof HFR.getValue("hfr-multimp-signatures") != "object") {
        HFR.setValue("hfr-multimp-signatures", {});
    }
    if (typeof HFR.getValue("hfr-multimp-affichage-signatures") != "string") {
        HFR.setValue("hfr-multimp-affichage-signatures", "oui");
        HFR.setValue("hfr-multimp-signatures", {});
    }
    if (typeof HFR.getValue ("hfr-multimp-notification-image") != "string"){
        HFR.setValue ("hfr-multimp-notification-image", "https://forum-images.hardware.fr/themes_static/images_forum/1/newmp.gif");
        HFR.setValue ("hfr-multimp-notification-text", "");
    }
    if (typeof HFR.getValue ("hfr-multimp-affichage-cat") != "string")
        HFR.setValue ("hfr-multimp-affichage-cat", "oui");

    GM_registerMenuCommand("[HFR] Multi MP -> Affichage des signatures & statuts", function() {
        var param = prompt ("Afficher les signatures et les statuts ? (tapez \"non\" ou \"oui\")", HFR.getValue ("hfr-multimp-affichage-signatures", "non"));
        var force = "non";
        if (param == "oui")
            force = "oui";
        HFR.setValue ("hfr-multimp-affichage-signatures", force);
    });

    GM_registerMenuCommand("[HFR] Multi MP -> forcer l'analyse des signatures et des statuts", function() {
        HFR.setValue("hfr-multimp-signatures", {});
    });

    GM_registerMenuCommand("[HFR] Multi MP -> Image de notification MP", function() {
        var val = prompt ("Choix de l'image de notification des messages (laissez vide pour l'image par défaut)", HFR.getValue ("hfr-multimp-notification-image", "https://forum-images.hardware.fr/themes_static/images_forum/1/newmp.gif"));
        if (val.length == 0)
            val = "https://forum-images.hardware.fr/themes_static/images_forum/1/newmp.gif";
        HFR.setValue ("hfr-multimp-notification-image", val);
        var mp_notif = document.querySelector(".none > tbody > tr > td > .left > .left > .red");
        if (mp_notif != null) {
            var img = mp_notif.parentElement.querySelector ("img");
            img.src = val;
        }
    });

    GM_registerMenuCommand("[HFR] Multi MP -> Texte de notification MP", function() {
        var val = prompt ("Choix du texte de notification - si \"{0}\" est dans le texte, il sera remplacé par le nombre de messages. (laissez vide pour le texte par défaut)", HFR.getValue ("hfr-multimp-notification-text", ""));
        if (val.length > 0)
            HFR.setValue ("hfr-multimp-notification-text", val);
        else
            HFR.setValue ("hfr-multimp-notification-text", "");
        var mp_notif = document.querySelector(".none > tbody > tr > td > .left > .left > .red");
        if (mp_notif != null) {
            var nb = mp_notif.textContent.split (" ")[2];
            var text = HFR.getValue ("hfr-multimp-notification-text", "");
            if (text.length != 0)
                mp_notif.textContent = text.format (nb);
        }
    });

    GM_registerMenuCommand("[HFR] Multi MP -> Affichage de la catégorie", function() {
        var param = prompt ("Afficher la catégorie MP ? (tapez \"non\" ou \"oui\")", HFR.getValue ("hfr-multimp-affichage-cat", "oui"));
        var force = "non";
        if (param == "oui")
            force = "oui";
        HFR.setValue ("hfr-multimp-affichage-cat", force);
    });

    document.icons_theme = document.querySelector("#md_arbo_tree_1 > img:nth-child(1)").getAttribute("src").split("/")[5];
    if (typeof document.icons_theme == 'undefined' || document.icons_theme == null) {
        document.icons_theme = '1';
    }

    var mp_notif = document.querySelector(".none > tbody > tr > td > .left > .left > .red");
    if (mp_notif != null) {
        var img = mp_notif.parentElement.querySelector ("img");
        img.src = HFR.getValue ("hfr-multimp-notification-image");
        var nb = mp_notif.textContent.split (" ")[2];
        var text = HFR.getValue ("hfr-multimp-notification-text", "");
        if (text.length != 0)
            mp_notif.textContent = text.format (nb);
    }

    document.uri = new HFR.Uri(document.location.href);

    function openAll(p_event) {
        if(p_event.button === 0 || p_event.button === 1) {
            var nb_max = 10;
            for (let subject of this.tr.subjects)
                if (nb_max > 0) {
                    var topic = subject.querySelector(".sujetCase5 > a");
                    var href = subject.querySelector(".sujetCase5 > a").getAttribute ("href");
                    if (href == null)
                        href = subject.querySelector(".sujetCase3 > a").getAttribute ("href");
                    HFR.openInTab (href, true);
                    nb_max--;
                }
        }
    }

    function fill_table(category, mode, fp) {
        if (HFR.getValue ("hfr-multimp-affichage-cat") != "oui")
            return;
        if (fp != true && !mpStorage.storageData.data.filter(function(d){return LocalMPStorage.version === d.version;})[0].hfr4k) {
            // Dirty tmp fix to avoid fucking with HFR4K notification system
            var tr = document.querySelector (".none tr");
            var td = tr.querySelector ("td:nth-child(2)");
            tr.removeChild(td);
        }
        var cat = document.querySelector(category);
        tr = document.createElement("tr");
        tr.subjects = [];
        tr.visible = true;
        tr.setAttribute("class", "cBackHeader fondForum1fCat");
        var th = document.createElement("th");
        th.setAttribute("class", "padding");
        th.setAttribute("colspan", "10");
        var odm_img = document.createElement ("img");
        odm_img.setAttribute ("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAABeklEQVQ4y8WTO0tDQRCFv31gp0IMiE9EEAyiQRQUW7EQrfwHt1UbO8FaSGOlsZKk18YHpPCBiCEEbGI0dkpIQDCaIqQwJFzX4upNfGHAwgPLzCw7Z3bO7ghjDH%2BB5I%2F4fwINEA6HJ4FVYKzOvDtgybKsff22se73%2B3ytrV4AhAAQb37VOr7g8THfe3FxGQRcAq%2FH00wm80ClYju9SekmCSHcWGtNR0cLgNdtwYFAKYVtG%2FdwLUmVQCGl%2BqjBe0WlNFrzIeGzVUoihPxKIIREKYkx%2BtvqiUyMy2yM4nOBcqWMV3ZrsBChUMj09HQxNDTgilcVzIlPEgeknqKM%2BEbp9PRxmtolfn1OU7HfuUE6nSWdzv74Zme5beZmprGljb9tiuObHcYHJ9jZi4Ax5tc1uzJsItdbphb7yaAZW2gzdf3EfCFXSt3HCBxZAAQOLW5zSYBSXQQv5mUtnozRgObgapMGoYkmzgCCot5xHl9sDwDzQCNQBDbjG%2FfLr4sBmbSALg9yAAAAAElFTkSuQmCC");
        odm_img.setAttribute ("alt", "ODM");
        odm_img.setAttribute ("title", "Ouvrir les 10 premiers drapeaux");
        odm_img.setAttribute ("class", "hfr_odm_generalButton");
        odm_img.setAttribute ("style", "cursor: pointer; float: left; margin-left: 7px; margin-right: -23px;");
        odm_img.tr = tr;
        odm_img.onclick = openAll;
        th.appendChild (odm_img);
        var a = document.createElement("a");
        a.setAttribute("class", "cHeader");
        a.setAttribute("href", "https://forum.hardware.fr/forum1.php?config=hfr.inc&cat=prive&page=1&subcat=&sondage=0&owntopic=0&trash=0&trash_post=0&moderation=0&new=0&nojs=0&subcatgroup=0");
        a.textContent = "Messages privés";
        th.appendChild(a);
        tr.appendChild(th);
        cat.parentNode.insertBefore(tr, cat);
        document.multimp_size_visible = 0;
        document.multimp_visible = true;
        tr.parentElement.style.height = "auto";

        fetch ("https://forum.hardware.fr/forum1.php?config=hfr.inc&cat=prive&page=1", { credentials : "include" }).then (function (response) {
            return response.text();
        }).then (function (text) {
            var doc = new DOMParser().parseFromString (text, "text/html");
            var notif_table = HFR.getValue ("hfr-multimp-notifications-table");
            for (let sujet of doc.querySelectorAll(".sujet")) {
                document.multimp_size_visible = sujet.getBoundingClientRect().height;
                var dir = sujet.querySelector(".sujetCase1").querySelector("img");
                if (!(dir.getAttribute("alt") == "On"))
                    continue;
                var c9 = sujet.querySelector(".sujetCase9");
                var link = c9.querySelector("a");
                if (link === null)
                    continue;
                var href = link.getAttribute("href");
                var post = parseInt (href.split ("&post=")[1].split("&")[0]);
                var cb = sujet.querySelector (".sujetCase10 input[type='checkbox']");
                cb.checked = notif_table[post] != false;
                cb.setAttribute ("data-post", post);
                cb.onclick = function (event) {
                    var notif_table = HFR.getValue ("hfr-multimp-notifications-table");
                    var post = parseInt (event.srcElement.getAttribute ("data-post"));
                    notif_table[post] = event.srcElement.checked;
                    HFR.setValue ("hfr-multimp-notifications-table", notif_table);
                };
                if (notif_table[post] == false)
                    continue;
                var c2 = sujet.querySelector(".sujetCase2");
                sujet.removeChild(c2);
                var url = "";
                if (LocalMPStorage.hasFlagMulti(post))
                    url = LocalMPStorage.getFlagMulti(post).uri;
                else
                    url = link;
                var c5 = sujet.querySelector(".sujetCase5");
                while (c5.firstChild)
                    c5.removeChild(c5.firstChild);
                var a1 = document.createElement("a");
                a1.setAttribute("href", url);
                var img = document.createElement("img");
                img.setAttribute("src", `https://forum-images.hardware.fr/themes_static/${document.icons_theme == "1" ? "images_forum" : "images"}/${document.icons_theme}/flag1.gif`);
                img.setAttribute("title", "Aller au dernier message lu sur ce sujet");
                img.setAttribute("alt", "flag");
                a1.appendChild(img);
                c5.appendChild(a1);
                sujet.classList.add ("privateMessage");
                if (fp) {
                    sujet.removeChild (sujet.querySelector(".sujetCase1"));
                    sujet.removeChild (sujet.querySelector(".sujetCase2"));
                    sujet.removeChild (sujet.querySelector(".sujetCase7"));
                    sujet.removeChild (sujet.querySelector(".sujetCase8"));
                    sujet.removeChild (sujet.querySelector(".sujetCase10"));
                    var s9 = sujet.querySelector(".sujetCase9");
                    sujet.removeChild (s9);
                    sujet.insertBefore (s9, sujet.querySelector(".sujetCase5"));
                    var s6 = sujet.querySelector(".sujetCase6");
                    sujet.removeChild (s6);
                    sujet.insertBefore (s6, sujet.querySelector(".sujetCase5"));
                    var s5 = sujet.querySelector(".sujetCase5");
                    sujet.removeChild (s5);
                    sujet.insertBefore (s5, sujet.querySelector(".sujetCase3"));
                    sujet.querySelector(".sujetCase4").classList.add ("catCase2");
                    sujet.querySelector(".sujetCase6").classList.add ("catCase3");
                    sujet.querySelector(".sujetCase6").classList.remove ("cBackCouleurTab2");
                    sujet.querySelector(".sujetCase6").classList.remove ("cBackCouleurTab4");
                    sujet.querySelector(".sujetCase6").classList.remove ("sujetCase6");
                    sujet.querySelector(".sujetCase9").classList.add ("catCase4");
                    sujet.querySelector(".sujetCase9").classList.remove ("cBackCouleurTab2");
                    sujet.querySelector(".sujetCase9").classList.remove ("cBackCouleurTab4");
                    sujet.querySelector(".sujetCase9").classList.remove ("sujetCase9");
                }
                tr.subjects.push (sujet);
                cat.parentNode.insertBefore(sujet, cat);
            }
            if (tr.subjects.length == 0)
                odm_img.style.visibility = "hidden";
            HFR.setLocalValue ("hfr-multimp-initialized", "true");
        });
    }

    if (document.location.href.indexOf("https://forum.hardware.fr/forum1f.php") === 0) {
        fill_table(".fondForum1fCat");
    }

    if (document.location.href.indexOf("https://forum.hardware.fr/hfr/") === 0 && document.location.href.indexOf ("-sujet_") < 0) {
        fill_table(".fondForum1Subcat", true);
    }

    if (document.location.href == "https://forum.hardware.fr" || document.location.href == "https://forum.hardware.fr/") {
        var c13 = document.querySelector("#cat13");
        if (c13 != null) {
            c13.parentNode.removeChild (c13.nextSibling);
            fill_table(".mesdiscussions > .main > tbody > .fondForumDescription", false, true);
        }
    }

    if (document.location.href.indexOf("https://forum.hardware.fr/forum1.php") === 0) {
        if (document.uri.parameters.cat != "prive") {
            fill_table(".fondForum1Subcat");
            return;
        }

        document.querySelector("tr.cBackHeader.fondForum1Subcat > th").incrementColspan();
        //	thp.setAttribute ("colspan", (1 + parseInt (thp.getAttribute ("colspan"))).toString());
        document.querySelector("tr.cBackHeader.fondForum1PagesHaut > td").incrementColspan();
        //	tdp.setAttribute ("colspan", (1 + parseInt (tdp.getAttribute ("colspan"))).toString());
        var header = document.querySelector("tr.cBackHeader.fondForum1Description");
        var th = document.createElement("th");
        th.setAttribute ("scope", "col");
        var imgHelp = document.createElement("img");
        imgHelp.setAttribute("src", `https://forum-images.hardware.fr/themes_static/${document.icons_theme == "1" ? "images_forum" : "images"}/${document.icons_theme}/aide.gif`);
        imgHelp.setAttribute("title", "Si la case est cochée, vous serez notifié d'un nouveau message.");
        imgHelp.setAttribute("alt", "Aide");
        th.appendChild(imgHelp);
        header.appendChild (th);

        for (let sujet of document.querySelectorAll(".sujet")) {

            var dir = sujet.querySelector(".sujetCase1").querySelector("img");
            var c9 = sujet.querySelector(".sujetCase9");
            var link = c9.querySelector("a");
            if (link === null)
                continue;
            var href = link.getAttribute("href");
            var post = parseInt(href.split ("&post=")[1].split("&")[0]);
            var notif_table = HFR.getValue ("hfr-multimp-notifications-table");
            var td = document.createElement ("td");
            td.classList.add ("sujetCase11");
            var cb = document.createElement ("input");
            cb.setAttribute ("type", "checkbox");
            td.appendChild (cb);
            sujet.appendChild (td);
            cb.checked = notif_table[post] != false;
            cb.setAttribute ("data-post", post);
            cb.onclick = function (event) {
                var notif_table = HFR.getValue ("hfr-multimp-notifications-table");
                var post = parseInt (event.srcElement.getAttribute ("data-post"));
                notif_table[post] = event.srcElement.checked;
                HFR.setValue ("hfr-multimp-notifications-table", notif_table);
            };
            if (!(dir.getAttribute("alt") == "On"))
                continue;
            var url = "";
            if (LocalMPStorage.hasFlagMulti(post))
                url = LocalMPStorage.getFlagMulti(post).uri;
            else
                url = link;
            var case5 = sujet.querySelector(".sujetCase5");
            while (case5.firstChild)
                case5.removeChild(case5.firstChild);
            var a = document.createElement("a");
            a.setAttribute("href", url);
            var imgFlag = document.createElement("img");
            imgFlag.setAttribute("src", `https://forum-images.hardware.fr/themes_static/${document.icons_theme == "1" ? "images_forum" : "images"}/${document.icons_theme}/flag1.gif`);
            imgFlag.setAttribute("title", "Aller au dernier message lu sur ce sujet");
            imgFlag.setAttribute("alt", "flag");
            a.appendChild(imgFlag);
            case5.appendChild(a);
        }
    }

    function updateMessage (message, profile) {
        if (typeof (profile.signature) === "string" && message.querySelector ("span.signature") == null) {
            var span = document.createElement ("span");
            span.setAttribute ("class", "signature");
            span.innerHTML = profile.signature;
            span.insertBefore (document.createElement ("br"), span.firstChild);
            var text = document.createTextNode ("--------------- ");
            span.insertBefore (text, span.firstChild);
            message.querySelector(".messCase2 > div[id]").appendChild (document.createElement ("br"));
            message.querySelector(".messCase2 > div[id]").appendChild (span);
        }
        if (typeof (profile.quote) === "string" && message.querySelector ("span.MoodStatus") == null) {
            var spanMood = document.createElement ("span");
            spanMood.setAttribute ("class", "MoodStatus");
            spanMood.innerHTML = profile.quote;
            var div = message.querySelector (".messCase1 > div > .s2").parentElement;
            div.parentElement.insertBefore (spanMood, div.nextSibling);
        }
    }

    if (HFR.getValue ("hfr-multimp-affichage-signatures") == "oui" && document.uri.parameters.cat == "prive") {
        for (let message of document.querySelectorAll ("table.messagetable")) {
            var is_modo = message.querySelector (".messCase2").classList.contains ("messageModo");
            if (is_modo)
                continue;
            var pseudo = message.querySelector(".messCase1 > div > .s2").textContent.replace(String.fromCharCode(8203), "");
            var profiles = HFR.getValue("hfr-multimp-signatures");
            if (typeof (profiles[pseudo]) !== "object") {
                HFR.findProfile(pseudo, { message : message, pseudo : pseudo }, (data, profile) => {
                    var profiles = HFR.getValue ("hfr-multimp-signatures")
                    profiles[data.pseudo] = profile;
                    HFR.setValue ("hfr-multimp-signatures", profiles);
                    updateMessage (data.message, profile);
                });
            }
            else
                updateMessage (message, profiles[pseudo]);
        }
    }

    var element = document.querySelector("table > tbody > tr > td > .left > .left > a");
    if (element != null)
        element.setAttribute ("href", "https://forum.hardware.fr/forum1.php?config=hfr.inc&cat=prive&page=1&subcat=&sondage=0&owntopic=0&trash=0&trash_post=0&moderation=0&new=0&nojs=0&subcatgroup=0");


    if (document.location.href.indexOf("https://forum.hardware.fr/forum2.php") === 0) {
        if (document.uri.parameters.cat != "prive")
            return;

        var hop = document.forms.hop;
        document.uri.parameters.post = parseInt(hop.querySelector ("[name='post']").value);
        document.uri.parameters.page = parseInt(hop.querySelector ("[name='page']").value);
        document.uri.parameters.p = hop.querySelector ("[name='p']").value;
        var tables = document.querySelectorAll(".messagetable");
        document.uri.fragment = tables[tables.length-1].querySelector("a").getAttribute("name");
        if (LocalMPStorage.hasFlagMulti(document.uri.parameters.post) && LocalMPStorage.getFlagMulti(document.uri.parameters.post).page > document.uri.parameters.page)
            return;
        else {
            var entry = {};

            if(LocalMPStorage.hasFlagMulti(document.uri.parameters.post)){
                // We retrieve the existing entry and remove it from the current list
                entry = LocalMPStorage.getFlagMultiAndPop(document.uri.parameters.post);
            }

            // Set the datas
            entry.uri = document.uri.toString();
            entry.post = document.uri.parameters.post;
            entry.page = document.uri.parameters.page;
            entry.href = document.uri.fragment;
            entry.p = document.uri.parameters.p;
            // Add the entry to the list
            LocalMPStorage.flags.list.push(entry);

            // // Set other relevant datas
            LocalMPStorage.flags.sourceName = LocalMPStorage.toolName;
            LocalMPStorage.flags.lastUpdate = Date.now();


            // Add the new list to the global datas
            mpStorage.storageData.data.filter(function(d){return LocalMPStorage.version === d.version;})[0].mpFlags = LocalMPStorage.flags;

            // And store the result with MPStorage
            mpStorage.setStorageData(mpStorage.storageData, LocalMPStorage.toolName);
        }
    }


});