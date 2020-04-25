var mpStorage = {
    /* Pseudo HFR */
    username: void 0,
    /* ID of MP used as MPStorage */
    mpId: 0,
    /* ID of response (post) in the MP used as MPStorage */
    mpRepId: 0,
    /* Name of the MP used as MPStorage */
    /* NEVER EVER TOUCH THAT SHIT */
    /* All the 'harmony' between platforms is based on that var */
    mpName: 'a2bcc09b796b8c6fab77058ff8446c34',
    /* Recipient of the MPStorage since we can't send MP to ourself */
    mpRecipient: 'MultiMP',
    /* Toolname */
    toolName: 'HFRGMTools',
    /* Is the MPStorage's context initiated ? */
    /* When it is, username, mpId & mpRedId are set */
    initiated: false,
    /* Number of MPs pages */
    pageMax: 1,
    /* Local copy of the data stored in MPStorage */
    storageData: {},
    /* Methods */
    getDefaultData: function(){
        // **********
        // HFRGMTools
        // Return the default JSON datas used to create a MPStorage or reset it
        // **********
        return {
            data: [
                {
                    version: '0.1',
                    sourceName: mpStorage.toolName,
                    lastUpdate: Date.now()
                }
            ],
            sourceName: mpStorage.toolName,
            lastUpdate: Date.now()
        };
    },

    isValidContent: function(jsonContent){
        // **********
        // HFRGMTools
        // Tell is the JSON stored in MPStorage is valid or not
        // **********
        return jsonContent && !!jsonContent.lastUpdate && !!jsonContent.data;
    },

    initLocalStorage: function(username, mpId, mpRepId, callback){
        // **********
        // HFRGMTools
        // Full init of LocalStorage from MPStorage
        // If parameters are wrong, launch initMPStorage
        // If parameters seems, try to read MPStorage; if it fails, launch initMPStorage
        // Finally, save content of MPStorage in storageData
        // CALLBACK is called with a copy of MPStorage datas
        // **********

        if(!!username && !!mpId && mpId > 0 && !!mpRepId && mpRepId > 0){
            // Parameters seems OK
            var url = 'https://forum.hardware.fr/message.php?config=hfr.inc';
            var args = '&cat=prive&post=' + mpId + '&numreponse=' + mpRepId + '&page=1&p=1&subcat=0&sondage=0&owntopic=0';

            var initOk = false;
            var dataz;

            // Try to read MPStorage
            mpStorage.makeWebRequest(url, 'get', args, function (resp) {

                // Try if content of the MP is OK
                if (resp.getElementById('content_form')){
                    try {
                        dataz = JSON.parse(resp.getElementById('content_form').value);
                        initOk = mpStorage.isValidContent(dataz);
                    }catch(e){
                        initOk = false;
                        console.warn('Invalid MPStorage content', resp.getElementById('content_form').value);
                    }
                }

                if(initOk){
                    // Content OK, we save all the infos
                    mpStorage.username = username;
                    mpStorage.mpId = mpId;
                    mpStorage.mpRepId = mpRepId;
                    mpStorage.storageData = dataz;
                    // Save the status
                    mpStorage.initiated = true;
                    // Callback
                    callback(mpStorage.storageData);
                }else{
                    // Content of MPStorage was not ok (MP not existing, corrupted datas...)
                    // We launch a full initStorage
                    mpStorage.initStorage(function(){
                        mpStorage.getStorageData(callback);
                    });
                }

            });

        }else{
            // Wrong parameters
            // We launch a full initStorage
            mpStorage.initStorage(function(){
                mpStorage.getStorageData(callback);
            });
        }
    },

    initStorage: function (callback) {
        // **********
        // HFRGMTools
        // Method to initialize the context to handle MPStorage
        // First, retrieve the username
        // Then try to retrieve the MP used as MPStorage
        // If not found, create it
        // CALLBACK is called with a boolean giving the initialization status (true : ok; false : fail)
        // **********

        // We look for the username
        mpStorage.getUsername(function (res) {
            if (res && mpStorage.username) {
                // Then start looking for the MP used as MPStorage
                mpStorage.findStorageMPOnPage(1, callback);
            }
        });
    },

    getStorageData: function (callback) {
        // **********
        // HFRGMTools
        // Method to retrieve the JSON stored in the MPStorage
        // CALLBACK is called with the JSON retrieved
        // **********
        if (mpStorage.initiated){
            var validContent = true;
            var url = 'https://forum.hardware.fr/message.php?config=hfr.inc';
            var args = '&cat=prive&post=' + mpStorage.mpId + '&numreponse=' + mpStorage.mpRepId + '&page=1&p=1&subcat=0&sondage=0&owntopic=0';

            // Get request
            mpStorage.makeWebRequest(url, 'get', args, function (resp) {
                try {
                    // Check the content
                    mpStorage.storageData = JSON.parse(resp.getElementById('content_form').value);
                    validContent = mpStorage.isValidContent(mpStorage.storageData);
                }
                catch(e) {
                    validContent = false;
                    console.warn('Invalid MPStorage content', resp.getElementById('content_form').value);
                }

                if(!validContent){
                    // Content of the MPStorage is invalid, we reset it
                    mpStorage.setStorageData(mpStorage.getDefaultData());
                    mpStorage.storageData = mpStorage.getDefaultData();
                }

                if(mpStorage.storageData){
                    callback(mpStorage.storageData);
                }
            });
        }
    },

    setStorageData: function (data, toolname) {
        // **********
        // HFRGMTools
        // Method to save the given JSON data in the MPStorage
        // **********

        if (mpStorage.initiated){
            // Relevant datas
            data.sourceName = toolname;
            data.lastUpdate = Date.now();

            var url = 'https://forum.hardware.fr/bdd.php?config=hfr.inc';
            var args = 'content_form=' + encodeURIComponent(JSON.stringify(data));
            args += '&post=' + mpStorage.mpId + '&numreponse=' + mpStorage.mpRepId;
            args += '&pseudo=' + mpStorage.username + '&cat=prive&verifrequet=1100&sujet=' + encodeURIComponent(mpStorage.mpName);
            args += '&hash_check=' + mpStorage.getHashCheck();

            // Post request
            mpStorage.makeWebRequest(url, 'post', args, function () {
                console.info('MPStorage updated');
            });
        }
    },

    findStorageMPOnPage: function (pageId, callback) {
        // **********
        // HFRGMTools
        // Method to find the MPStorage in the current MPs page
        // CALLBACK is called with a boolean giving the initialization status (true : ok; false : fail)
        // **********

        var url = 'https://forum.hardware.fr/forum1.php?config=hfr.inc';
        var args = '&cat=prive&page=' + pageId + '&subcat=&sondage=0&owntopic=0&trash=0&trash_post=0&moderation=0&new=0&nojs=0&subcatgroup=0';

        // Get request
        mpStorage.makeWebRequest(url, 'get', args, function (resp) {
            // TODO Wiripse : La structure de la pagination n'est pas la même sur la première page et les suivantes (lolwat).
            // TODO Wiripse : Alors on récupère la page max sur la première page uniquement.
            // TODO Wiripse : Traiter les pages suivantes pour gérer le cas où une nouvelle page apparaît pendant qu'on pagine...
            if (mpStorage.pageMax <= 1) {
                // Save the number of MPs page the user have
                mpStorage.pageMax = resp.getElementsByClassName('fondForum1PagesHaut').length > 0 ? resp.getElementsByClassName('fondForum1PagesHaut')[0].getElementsByClassName('cHeader').length + 1 : 1;
            }
            // Loop on list of MPs
            [...resp.getElementsByClassName('cCatTopic')].forEach(function (topicRow) {
                if (topicRow.title) {
                    if (mpStorage.mpName === topicRow.innerHTML) {
                        // If current MP's name is the one used by MPStorage, baise ouais !
                        // We save the MP's topic ID
                        mpStorage.mpId = mpStorage.getJsonFromUrl(topicRow.href).post;
                        // We go after the first response ID
                        mpStorage.findStorageMPResp(function () {
                            callback(true);
                        });

                        // And we're done (don't care about the async call above)
                        mpStorage.initiated = true;
                    }
                }
            });

            if (!mpStorage.initiated) {
                // The MPStorage is not in the current page, shit
                if (mpStorage.pageMax > pageId) {
                    // If there's another MPs page, we make a recursive call on the next page
                    mpStorage.findStorageMPOnPage(pageId + 1, callback);
                } else {
                    // Not found in the last page, it doesn't exists, let's create it !
                    mpStorage.createStorageMP(function () {
                        // The MPStorage now exists but since the create MP response doesn't give any information about it,
                        // we have to start again the search process from page one...
                        // Fortunately it's on the first page so it won't be long !
                        mpStorage.findStorageMPOnPage(1, callback);
                    }, function(){
                        console.error('Unable to create the MPStorage');
                    });
                }
            }
        });
    },

    findStorageMPResp: function (callback) {
        // **********
        // HFRGMTools
        // Method to find the ResponseID of the MPStorage's first reply
        // CALLBACK is called with the response's id
        // **********

        var url = 'https://forum.hardware.fr/forum2.php?config=hfr.inc';
        var args = '&cat=prive&post=' + mpStorage.mpId + '&page=1&p=1&sondage=0&owntopic=0&trash=0&trash_post=0&print=0&numreponse=0&quote_only=0&new=0&nojs=0';

        // Get request
        mpStorage.makeWebRequest(url, 'get', args, function (resp) {
            // Nice HTML parsing bro !
            // We save the response's ID
            mpStorage.mpRepId = parseInt(resp.getElementsByClassName('messagetable')[0].getElementsByClassName('messCase1')[0].getElementsByTagName('a')[0].name.split('t')[1]);
            // And give it to the callback
            callback(mpStorage.mpRepId);
        });
    },

    createStorageMP: function (callback, failed) {
        // **********
        // HFRGMTools
        // Method to create the MPStorage for the user
        // CALLBACK is called with a boolean giving the result status (true : ok; false : fail)
        // **********

        var url = 'https://forum.hardware.fr/bddpost.php?config=hfr.inc';
        var args = 'content_form=' + encodeURIComponent(JSON.stringify(mpStorage.getDefaultData()));
        args += '&pseudo=' + mpStorage.username + '&cat=prive&verifrequet=1100&sujet=' + encodeURIComponent(mpStorage.mpName);
        args += '&dest=' + encodeURIComponent(mpStorage.mpRecipient);
        args += '&hash_check=' + mpStorage.getHashCheck();

        // Post request
        mpStorage.makeWebRequest(url, 'post', args, function (resp) {
            if(resp.getElementsByClassName('hop').length > 0 && resp.getElementsByClassName('hop')[0].getElementsByTagName('input').length === 0){
                // MP created, nice
                callback(true);
            }else{
                // MP not created, no nice
                failed();
            }
        });
    },

    getUsername: function (callback) {
        // **********
        // HFRGMTools
        // Method to find the encoded username
        // CALLBACK is called with a boolean giving the result status (true : ok; false : fail)
        // **********

        // Can I get your cookie plz ?
        mpStorage.username = mpStorage.getCookie('md_user');

        // We're done
        callback(mpStorage.username);
    },

    getHashCheck: function(){
        // **********
        // HFRGMTools
        // Returns the hash_check input value; undefined if not found
        // **********
        return document.querySelector('input[name="hash_check"]') ? document.querySelector('input[name="hash_check"]').value : void 0;
    },

    makeWebRequest: function(url, method, arguments, callback){
        // **********
        // HFRGMTools
        // Make a request for the given parameters
        // Callback called with response body as HTMLElement in parameter
        // **********

        // Make sure we speak the same language
        method = method.toUpperCase();

        // Manage the headers if necessary
        var myHeaders = new Headers();
        if('POST'=== method){
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        }

        // Manage the parameters
        var parameters = {
            method: method,
            headers: myHeaders,
            body : 'POST'=== method ? arguments : void 0
        };

        // Make the request
        fetch(url+('GET' === method && arguments ? '&'+arguments : ''), parameters).then(function(response) {
            if(200 == response.status){
                // Response ok
                return response.text();
            }
        }).then(function(html) {
            // Parse the response to an HTMLElement
            callback(new DOMParser().parseFromString(html, 'text/html'));
        }).catch(function(e){
            console.error('Error while making web request', url, method, arguments, e);
        });
    },

    getJsonFromUrl: function(url) {
        // **********
        // HFRGMTools
        // Tool method to create a JSON based on url's parameters
        // RETURN a JSON
        // **********

        if (!url) url = location.search;
        var query = url.substr(1);
        var result = {};
        query.split('&').forEach(function (part) {
            var item = part.split('=');
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    },

    getCookie: function(key) {
        // **********
        // PetitJean
        // Get a cookie by its name
        // RETURN value of the cookie
        // **********

        if('md_passs' === key) {
            // We avoid making mistakes
            return 'Nope';
        }

        var array = document.cookie.split(';');
        for (var i = 0; i < array.length; i++) {
            var k = array[i].substring(0, array[i].indexOf('=')).trim();
            var v = array[i].substring(1 + array[i].indexOf('='));
            if (key == k){
                return v;
            }
        }
        return '';
    }
}