// ==UserScript==
// @name          [HFR] SuperFavs
// @author        Wiripse
// @version       2019.10.1.1
// @description   Gestion des SuperFavoris : Topics cyants mis en avant ou filtrables. Idée souflée par le génial Ezzz.
// @icon          http://reho.st/self/40f387c9f48884a57e8bbe05e108ed4bd59b72ce.png
// @downloadURL   https://github.com/Wiripse/HFRGMTools/raw/master/SuperFavs.user.js
// @updateURL     https://github.com/Wiripse/HFRGMTools/raw/master/SuperFavs.user.js
// @include       https://forum.hardware.fr/forum1f.php*
// @include       https://forum.hardware.fr/forum1.php*
// @homepageURL   https://github.com/Wiripse/HFRGMTools/
// @noframes
// @grant         GM.getValue
// @grant         GM.setValue
// @grant         GM_getValue
// @grant         GM_setValue
// @require https://raw.githubusercontent.com/Wiripse/HFRGMTools/master/MPStorage.user.js
// ==/UserScript==

// Historique
// 2019.10.1.1 : Fix pas de message catégorie vite pour les MP DTCloud.
// 2019.10.1.0 : Fix toggle favs/superFavs avec DTCloud. Colorier toute la ligne d'un superFav. Affichage d'un message de catégorie vide. Gestion par classes et plus par style directement.
// 2019.9.30.1 : Fix pour que ça fonctionne aussi dans les drapals de catégories
// 2019.9.30.0 : Premier jet

var LocalMPStorage = {
    /* Version of the MPStorage API used */
    version : '0.1',
    /* Current toolname used to access MPStorage */
    toolName : 'SuperFavs_GM',
    /* Icon of SuperFav */
    imgSimpleFav : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjCR4KLC4JomLmAAAA0ElEQVQoz3XPPU7CABjG8V8rCWhaF2lD2OkEDh6iZ3BzYHHnBBrwDM46GE4hJszMpgmJHwOJbI2uxkFpROmzPR/55335VktHYKNAR6tyErdKhTcTTU1X1gqlG21Ch+49SWUyqampRE8m9WwmDkwcOa/Qdzit2NfWFHrqlHmkFNYOQmXow37t4MD7nhORRc3gzCfHVto768RKH0bmon91ZG60MWMz8VYdezD+HVxa6Faua+HiL3JoaQD6loa7jsq9yuVe5HV/DxSKH06NGhrbwRfHMyvA2fpC2gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wOS0zMFQxMDo0NDo0NiswMDowMJps0hgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDktMzBUMTA6NDQ6NDYrMDA6MDDrMWqkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==',
    /* Icon of SimpleFav */
    imgSuperFav : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAARuAAAEbgHQo7JoAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAKJQTFRF////v0BAzDMzyDckwj0xvzUrwj0pwTcpvjsuwjgpvjwtvzsswDotwDsrvzgpwDsswDsqwDwrwTsswDkrwTkswTsswToqwDsqwToswDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwDorwTsswz4vyEQ1yUU2y0c40U9A1FND3FxM3V5Og1qrkwAAACx0Uk5TAAQFDhUYGSUnMjM0OUFERUlNUlliY3N5e4mW0NTa29/g6ezt7u/x8vb4/P0b22PaAAAAgUlEQVQYGVXBiRZCQAAF0EeoaNGqhBaSpteu//+1pslxZu4FYAUjG5I9DixIfkbmK2B9JDMfcAu+6itnS/4ULmLW7xtZCSox0seHmhT5805NjoSGBBENEZySmtIBQsGWCCEtLmyIOZTpmUo1QWN4onQYoNXfk7seNN3txoPB6+DvC5T8Gy0tAjNFAAAAAElFTkSuQmCC',
    /* JSON datas from MPStorage about SuperFavs management */
    superFavs: void 0,
    /* Methods */
    getData : function(callback){
        // **********
        // SuperFavs_GM
        // Get MPStorage data and store it locally
        // CALLBACK is called with the superFavs data from MPStorage data
        // **********
        mpStorage.getStorageData(function(res){
            // Save datas locally
            LocalMPStorage.superFavs = res.data.filter(function(d){return LocalMPStorage.version === d.version;})[0].superFavs;

            // Init data if necessary
            if(!LocalMPStorage.superFavs){
                LocalMPStorage.superFavs = { list : [], onlySF : false};
            }

            // We're done
            callback(LocalMPStorage.superFavs);
        });
    },
    initMPStorage : function(){
        // **********
        // SuperFavs_GM
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

                    // We have the conf locally
                    if(!!mpStorage_username && !!mpStorage_mpId && !!mpStorage_mpRepId){

                        // We init the mpStorage lib with those datas
                        mpStorage.username = mpStorage_username;
                        mpStorage.mpId = mpStorage_mpId;
                        mpStorage.mpRepId = mpStorage_mpRepId;
                        mpStorage.initiated = true;

                        // And we retrieve the MPStorage datas
                        LocalMPStorage.getData(function(res){
                            resolve(res);
                        });
                    }else{

                        // We don't have the conf locally
                        // We use mpStorage lib to init those datas
                        mpStorage.initStorage(function(res){
                            if(res){
                                // We store them locally
                                GM.setValue('mpStorage_username', mpStorage.username);
                                GM.setValue('mpStorage_mpId', mpStorage.mpId);
                                GM.setValue('mpStorage_mpRepId', mpStorage.mpRepId);

                                // And we retrieve the MPStorage datas
                                LocalMPStorage.getData(function(res){
                                    resolve(res);
                                });
                            }
                        });
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    },
    updateMPStorage: function(){
        // **********
        // SuperFavs_GM
        // Update MPStorage datas with local datas
        // **********

        // Set relevant datas
        LocalMPStorage.superFavs.sourceName = LocalMPStorage.toolName;
        LocalMPStorage.superFavs.lastUpdate = Date.now();

        // Add the new SuperFav datas to the global datas
        mpStorage.storageData.data.filter(function(d){return LocalMPStorage.version === d.version;})[0].superFavs = LocalMPStorage.superFavs;

        // And store the result with MPStorage
        mpStorage.setStorageData(mpStorage.storageData, LocalMPStorage.toolName);
    },
    manageOngletFavs: function(){
        // **********
        // SuperFavs_GM
        // Create the header tab ('onglet') to toggle favs list
        // **********

        // FIXME : Useless test bcz script set to only work on those pages. But a nice idea would be to create util methods (isOnMP, isOnCyan...) to check where we are
        if (document.location.href.indexOf('https://forum.hardware.fr/forum1f.php') === 0 || (document.location.href.indexOf('https://forum.hardware.fr/forum1.php') === 0 && document.querySelector('.cadreonglet'))) {

            var onglets = document.querySelector('.cadreonglet');

            // Rounded border left
            var nBfOnglet = document.createElement('div');
            nBfOnglet.setAttribute('class', 'beforonglet');
            nBfOnglet.innerHTML = '&nbsp;';
            onglets.appendChild(nBfOnglet);

            // Create the new tab
            var newBe = document.createElement('a');
            newBe.setAttribute('class', 'onglet');
            newBe.setAttribute('title', 'Afficher/masquer les super favoris');
            var imgNewBe = document.createElement('img');
            imgNewBe.setAttribute('src', LocalMPStorage.superFavs.onlySF ? LocalMPStorage.imgSuperFav : LocalMPStorage.imgSimpleFav);
            newBe.appendChild(imgNewBe);
            // Handle onclick to toggle favs list
            newBe.onclick = function () {
                LocalMPStorage.superFavs.onlySF = !LocalMPStorage.superFavs.onlySF;
                imgNewBe.setAttribute('src', LocalMPStorage.superFavs.onlySF ? LocalMPStorage.imgSuperFav : LocalMPStorage.imgSimpleFav);
                LocalMPStorage.updateMPStorage();
                LocalMPStorage.renderFavs();
            };
            onglets.appendChild(newBe);

            // Rounded border right
            var nAfOnglet = document.createElement('div');
            nAfOnglet.setAttribute('class', 'afteronglet');
            nAfOnglet.innerHTML = '&nbsp;';
            onglets.appendChild(nAfOnglet);
        }
    },
    renderFavs: function(){
        // **********
        // SuperFavs_GM
        // Rendering of the favorites according to SuperFavs list
        // **********

        if (document.location.href.indexOf('https://forum.hardware.fr/forum1f.php') === 0 || (document.location.href.indexOf('https://forum.hardware.fr/forum1.php') === 0 && document.querySelector('.cadreonglet'))) {

            // Custom CSS
            var rowStyle = ".superFavRow { background-color : #D2B2FF; }";
            var hiddenFav = ".hiddenFav { display : none; }";
            var style = document.createElement("style");
            style.type = "text/css";
            style.appendChild(document.createTextNode(rowStyle));
            style.appendChild(document.createTextNode(hiddenFav));
            document.head.appendChild(style);

            var topicRows = document.querySelectorAll('.sujet');
            // Iterate on each topic
            topicRows.forEach(function(topicRow){
                var topic = topicRow.querySelector('.sujetCase3');
                if(!topicRow.classList.contains('privateMessage') && topic){
                    // privateMessage class : fix to work with DTCloud

                    var topicUrl = new URLSearchParams(topic.querySelector('a').href);
                    var topicId = parseInt(topicUrl.get('post'));

                    if (LocalMPStorage.superFavs.list.indexOf(topicId) < 0){
                        // Simple favorite topic
                        topic.style = '';
                        if(LocalMPStorage.superFavs.onlySF){
                            // Only displaying superFavs > Hide the simple favorite
                            topicRow.classList.add('hiddenFav');
                        }else{
                            // Displaying all the favorites
                            topicRow.classList.remove('hiddenFav');

                            // Create icon to manage the fav status
                            var imgBloc = topic.parentNode.querySelector('.sujetCase2');
                            imgBloc.removeChild(imgBloc.querySelector('img'));
                            var newImgBloc = document.createElement('img');
                            newImgBloc.setAttribute('title', 'Ajouter aux super favoris');
                            newImgBloc.setAttribute('src', LocalMPStorage.imgSimpleFav);
                            // Handle onclick to add to SuperFavs list
                            newImgBloc.onclick = function () {
                                // Add to SuperFavs
                                LocalMPStorage.superFavs.list.push(topicId);
                                // Update MPStorage
                                LocalMPStorage.updateMPStorage();
                                // Render the result
                                LocalMPStorage.renderFavs();
                            };
                            imgBloc.appendChild(newImgBloc);
                        }

                    } else {
                        // SuperFav topic

                        // Background color if in all fav display
                        if (LocalMPStorage.superFavs.onlySF){
                            topicRow.classList.remove('superFavRow');
                            topicRow.querySelector('.sujetCase1').classList.remove('superFavRow');
                            topicRow.querySelector('.sujetCase6').classList.remove('superFavRow');
                            topicRow.querySelector('.sujetCase9').classList.remove('superFavRow');
                        } else {
                            topicRow.classList.add('superFavRow');
                            topicRow.querySelector('.sujetCase1').classList.add('superFavRow');
                            topicRow.querySelector('.sujetCase6').classList.add('superFavRow');
                            topicRow.querySelector('.sujetCase9').classList.add('superFavRow');
                        }

                        // Create icon to manage the fav status
                        var imgBlocSF = topic.parentNode.querySelector('.sujetCase2');
                        imgBlocSF.removeChild(imgBlocSF.querySelector('img'));
                        var newImgBlocSF = document.createElement('img');
                        newImgBlocSF.setAttribute('title', 'Supprimer des super favoris');
                        newImgBlocSF.setAttribute('src', LocalMPStorage.imgSuperFav);
                        // Handle onclick to remove from SuperFavs list
                        newImgBlocSF.onclick = function () {
                            let i = LocalMPStorage.superFavs.list.findIndex(function(item){ return topicId === item; });
                            if(0<=i){
                                // Remove from SuperFavs
                                LocalMPStorage.superFavs.list.splice(i, 1);
                                // Update MPStorage
                                LocalMPStorage.updateMPStorage();
                                // Render the result
                                LocalMPStorage.renderFavs();
                            }
                        };
                        imgBlocSF.appendChild(newImgBlocSF);
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
}

// Init
LocalMPStorage.initMPStorage().then(function(){
    // Init tabs
    LocalMPStorage.manageOngletFavs();
    // Render Favs
    LocalMPStorage.renderFavs();
});
