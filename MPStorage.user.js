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
    mpName: "a2bcc09b796b8c6fab77058ff8446c34",
    /* Recipient of the MPStorage since we can't send MP to ourself */
    mpRecipient: 'MultiMP',
    /* Is the MPStorage's context initiated ? */
    /* When it is, username, mpId & mpRedId are set */
    initiated: false,
    /* Number of MPs pages */
    pageMax: 1,
    /* Local copy of the data stored in MPStorage */
    storageData: {},
    /* Methods */
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
            if (res) {
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

        var url = 'https://forum.hardware.fr/message.php?config=hfr.inc';
        var args = '&cat=prive&post=' + mpStorage.mpId + '&numreponse=' + mpStorage.mpRepId + '&page=1&p=1&subcat=0&sondage=0&owntopic=0';

        // Get request
        mpStorage.loadPage(url, 'get', args, function (resp) {
            mpStorage.storageData = JSON.parse(resp.getElementById('content_form').value);
            callback(mpStorage.storageData);
        });
    },

    setStorageData: function (data) {
        // **********
        // HFRGMTools
        // Method to save the given JSON data in the MPStorage
        // **********

        var url = 'https://forum.hardware.fr/bdd.php?config=hfr.inc';
        var args = 'content_form=' + encodeURIComponent(JSON.stringify(data));
        args += '&post=' + mpStorage.mpId + '&numreponse=' + mpStorage.mpRepId;
        args += '&pseudo=' + encodeURIComponent(mpStorage.username) + '&cat=prive&verifrequet=1100&sujet=' + encodeURIComponent(mpStorage.mpName);
        args += '&hash_check=' + mpStorage.getElementByXpath('//input[@name="hash_check"]', document).pop().value;

        // Post request
        mpStorage.loadPage(url, 'post', args, function () {
            // console.warn('Data updated');
        });
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
        mpStorage.loadPage(url, 'get', args, function (resp) {
            // TODO Wiripse : La structure de la pagination n'est pas la même sur la première page et les suivantes (lolwat).
            // TODO Wiripse : Alors on récupère la page max sur la première page uniquement.
            // TODO Wiripse : Traiter les pages suivantes pour gérer le cas où une nouvelle page apparaît pendant qu'on pagine...
            if (mpStorage.pageMax <= 1) {
                // Save the number of MPs page the user have
                mpStorage.pageMax = resp.getElementsByClassName('fondForum1PagesHaut')[0].getElementsByClassName('cHeader').length + 1;
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
        mpStorage.loadPage(url, 'get', args, function (resp) {
            // Nice HTML parsing bro !
            // We save the response's ID
            mpStorage.mpRepId = parseInt(resp.getElementsByClassName('messagetable')[0].getElementsByClassName('messCase1')[0].getElementsByTagName('a')[0].name.split('t')[1]);
            // And give it to the callback
            callback(mpStorage.mpRepId);
        });
    },

    createStorageMP: function (callback) {
        // **********
        // HFRGMTools
        // Method to create the MPStorage for the user
        // CALLBACK is called with a boolean giving the result status (true : ok; false : fail)
        // **********

        // Default JSON...
        var defaultData = {
            data: [
                {
                    version: '0.1',
                    mpFlags: {},
                    blacklist: {},
                    sourceName: 'HFRGMTools',
                    lastUpdate: Date.now()
                }
            ],
            sourceName: 'HFRGMTools',
            lastUpdate: Date.now()
        };

        var url = 'https://forum.hardware.fr/bddpost.php?config=hfr.inc';
        var args = 'content_form=' + encodeURIComponent(JSON.stringify(defaultData));
        args += '&pseudo=' + encodeURIComponent(mpStorage.username) + '&cat=prive&verifrequet=1100&sujet=' + encodeURIComponent(mpStorage.mpName);
        args += '&dest=' + encodeURIComponent(mpStorage.mpRecipient);
        args += '&hash_check=' + mpStorage.getElementByXpath('//input[@name="hash_check"]', document).pop().value;

        // Post request
        mpStorage.loadPage(url, 'post', args, function () {
            callback(true);
        });

    },

    getUsername: function (callback) {
        // **********
        // HFRGMTools
        // Method to find the username
        // CALLBACK is called with a boolean giving the result status (true : ok; false : fail)
        // **********

        // We load MPs first page
        var url = 'https://forum.hardware.fr/forum1.php?config=hfr.inc';
        var args = '&cat=prive&page=1&subcat=&sondage=0&owntopic=0&trash=0&trash_post=0&moderation=0&new=0&nojs=0&subcatgroup=0';

        // Get request
        mpStorage.loadPage(url, 'get', args, function (resp) {

            // Find first MP's id
            var firstMpId = mpStorage.getJsonFromUrl(resp.getElementsByClassName('cCatTopic')[0].href).post;

            // Load the first MP
            var urlMP = 'https://forum.hardware.fr/forum2.php?config=hfr.inc';
            var argsMP = '&cat=prive&post=' + firstMpId + '&page=1&p=1&sondage=0&owntopic=0&trash=0&trash_post=0&print=0&numreponse=0&quote_only=0&new=0&nojs=0';

            // Get request
            mpStorage.loadPage(urlMP, 'get', argsMP, function (resp) {
                // Parse the shit out of it to find the hidden's input named 'pseudo'
                [...resp.getElementsByTagName('input')].forEach(function (input) {
                    if ('pseudo' === input.name) {
                        // Yeah !
                        // Save the username
                        mpStorage.username = input.value;
                        // And we're done
                        callback(true);
                    }
                });
            });
        });
    },

    getElementByXpath: function (path, element, doc) {
        // **********
        // ToyoLib
        // Tool method to extract element on document by its Xpath (used for hash_check)
        // **********

        if (doc == null) doc = document;
        var arr = Array(), xpr = doc.evaluate(path, element,
            null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        for (; item = xpr.iterateNext();) arr.push(item);
        return arr;
    },

    loadPage: function (url, method, arguments, responseHandler) {
        // **********
        // ToyoAjaxLib
        // Tool method to make an Ajax request
        // **********

        var req;
        method = method.toUpperCase();
        if (method == 'GET' && arguments != null) url += '?' + arguments;
        // branch for native XMLHttpRequest object
        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
            req.responseType = 'document';
            req.onreadystatechange = mpStorage.processReqChange(req, responseHandler);
            req.open(method, url, true);
            if (method == 'POST') req.setRequestHeader("Content-Type",
                "application/x-www-form-urlencoded");
            arguments = method == 'POST' ? arguments : null;
            req.send(arguments);
        }
        else if (window.ActiveXObject) {
            // branch for IE/Windows ActiveX version
            req = new ActiveXObject("Microsoft.XMLHTTP");
            if (req) {
                req.onreadystatechange = mpStorage.processReqChange(req, responseHandler);
                req.open(method, url, true);
                if (method == 'POST') req.setRequestHeader("Content-Type",
                    "application/x-www-form-urlencoded");
                if (method == 'POST') req.send(arguments);
                else req.send();
            }
        }
    },

    processReqChange: function (req, responseHandler) {
        // **********
        // ToyoAjaxLib
        // Tool method used by loadPage
        // **********

        return function () {
            try {
                // only if req shows "loaded"
                if (req.readyState == 4) {
                    // only if "OK"
                    if (req.status == 200) {
                        var content = req.responseXML != null && req.responseXML.documentElement != null ? req.responseXML : req.responseText;
                        if (responseHandler != null) responseHandler(content);
                    }
                    else {
                        //alert("There was a problem retrieving the XML data:\n" +
                        //req.statusText);
                    }
                }
            }
            catch (e) { }
        }
    },

    getJsonFromUrl: function (url) {
        // **********
        // HFRGMTools
        // Tool method to create a JSON based on url's parameters
        // RETURN a JSON
        // **********

        if (!url) url = location.search;
        var query = url.substr(1);
        var result = {};
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }
}
