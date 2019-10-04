// ==UserScript==
// @name [HFR] Suppression rapide de posts
// @version 0.2.4.2
// @namespace http://toyonos.info
// @description Permet de supprimer un de ses posts via un bouton sans passer par la page de réponse
// @include https://forum.hardware.fr/*
// @exclude https://forum.hardware.fr/message.php*
// @grant GM_info
// @grant GM_deleteValue
// @grant GM_getValue
// @grant GM_listValues
// @grant GM_setValue
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_addStyle
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setClipboard
// @grant GM_xmlhttpRequest
// ==/UserScript==


// historique modifs r21 :
// 0.2.4.2 (10/12/2017) :
// - commentage des alert XML
// 0.2.4.1 (03/12/2017) :
// - passage au https


// Menu pour selectionner l'url de l'image
GM_registerMenuCommand("[HFR] Suppression rapide de posts -> Url de l'image", function()
{
	var imgUrl = prompt("Url de l'image ?", getCurrentImgUrl());
	if (!imgUrl) return;
	GM_setValue('hfr_srp_imgUrl', imgUrl);		
}
);

var getCurrentImgUrl = function()
{
	return GM_getValue('hfr_srp_imgUrl', 'https://forum-images.hardware.fr/images/perso/damnbloodyseagull.gif');	
}

var getElementByXpath = function (path, element)
{
	var arr = Array(), xpr = document.evaluate(path, element, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	for (;item = xpr.iterateNext();) arr.push(item);
	return arr;
}

var root = document.getElementById('mesdiscussions');
var urlPost = 'https://forum.hardware.fr/bdd.php?config=hfr.inc';

getElementByXpath('//table//tr[starts-with(@class, "message")]//div[@class="left"]', root).filter(function(toolbar)
{
	return getElementByXpath('.//a[starts-with(@href, "/message.php")]//img[@alt="edit"]', toolbar).length > 0;
}
).forEach(function(toolbar)
{
	var newImg = document.createElement('img');
	newImg.src = getCurrentImgUrl();
	newImg.alt = newImg.title = 'Supprimer ce post';
	newImg.style.cursor = 'pointer';
	newImg.style.marginRight = '3px';
	newImg.setAttribute('repUrl', getElementByXpath('.//a[starts-with(@href, "/message.php")]//img[@alt="edit"]', toolbar)[0].parentNode.href);
	newImg.setAttribute('pseudo', getElementByXpath('.//td[@class="messCase1"]//b[@class="s2"]', toolbar.parentNode.parentNode.parentNode)[0].innerHTML);
	newImg.addEventListener('click', function(event)
	{
		if (confirm('Supprimer ce post ?'))
		{
			var arguments = this.getAttribute('repUrl').match(/cat=.+&post=[0-9]+&numreponse=[0-9]+/).pop();
			arguments += '&delete=1';
			arguments += '&pseudo=' + this.getAttribute('pseudo');
			arguments += '&hash_check=' + getElementByXpath('//input[@name="hash_check"]', document).pop().value;
			toyoAjaxLib.loadDoc(urlPost, 'post', arguments, null);
			
			var postToDelete = null;
			var repUrl = this.getAttribute('repUrl');
			getElementByXpath('//table//tr[starts-with(@class, "message")]', root).filter(function(postTr)
			{
				var idPost = postTr.firstChild.firstChild.name;
				if (idPost == 't' + repUrl.match(/numreponse=([0-9]+)/).pop())
				{
					postToDelete = postTr.parentNode.parentNode;
					return false;
				}
				return postToDelete != null;
			}
			).forEach(function(postTr)
			{
				postTr.style.backgroundColor = postTr.style.backgroundColor == 'rgb(247, 247, 247)' ? 'rgb(222, 223, 223)' : 'rgb(247, 247, 247)';
			}
			);
			postToDelete.style.display = 'none';
		}
	}
	, false);
	
	if (toolbar.nextSibling.className == 'spacer')
	{
		var newDiv = document.createElement('div');
		newDiv.className = 'right';
		newDiv.appendChild(newImg);
		toolbar.parentNode.insertBefore(newDiv, toolbar.nextSibling);
	}
	else
	{
		toolbar.nextSibling.insertBefore(newImg, toolbar.nextSibling.firstChild);
	}
}
);

/******************************************************************/

var toyoAjaxLib = (function()
{
	// Private members

	function loadPage(url, method, arguments, responseHandler)
	{
		var req;
		method = method.toUpperCase();
		if (method == 'GET' && arguments != null) url += '?' + arguments;
		// branch for native XMLHttpRequest object
		if (window.XMLHttpRequest)
		{
			req = new XMLHttpRequest();
			req.onreadystatechange = processReqChange(req, responseHandler);
			req.open(method, url, true);
			if (method == 'POST') req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			arguments = method == 'POST' ? arguments : null;
			req.send(arguments);
		}
		else if (window.ActiveXObject)
		{
			// branch for IE/Windows ActiveX version
			req = new ActiveXObject("Microsoft.XMLHTTP");
			if (req)
			{
				req.onreadystatechange = processReqChange(req, responseHandler);
				req.open(method, url, true);
				if (method == 'POST') req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				if (method == 'POST') req.send(arguments);
				else  req.send();
			}
		}
	}

	function processReqChange(req, responseHandler)
	{
		return function ()
		{
			try
			{
				// only if req shows "loaded"
				if (req.readyState == 4)
				{
					// only if "OK"
					if (req.status == 200)
					{
						var content = req.responseXML != null && req.responseXML.documentElement != null  ? req.responseXML.documentElement : req.responseText;
						if (responseHandler != null) responseHandler(content);
					}
					else
					{
						//alert("There was a problem retrieving the XML data:\n" +
						//req.statusText);
					}
				}
			}
			catch(e){}
		}
	}

	// Public members

	return {
		"loadDoc" : function(url, method, arguments, responseHandler)
		{
			try
			{
				loadPage(url, method, arguments, responseHandler);
			}
			catch(e)
			{
				var msg = (typeof e == "string") ? e : ((e.message) ? e.message : "Unknown Error");
				alert("Unable to get data:\n" + msg);
				return;
			}
		}
	};
})();

// ============ Module d'auto update du script ============
({
	check4Update : function()
	{
		var autoUpdate = this;
		var mirrorUrl = GM_getValue('mirrorUrl', 'null');
		if (mirrorUrl == 'null') autoUpdate.retrieveMirrorUrl();

		var currentVersion = GM_getValue('currentVersion', '0.2.4');
		// On met éventuellement la version stockée à jour avec la version courante, si la version courante est plus récente
		if (autoUpdate.isLater('0.2.4', currentVersion))
		{
			GM_setValue('currentVersion', '0.2.4');
			currentVersion = '0.2.4';
		}			
		// Par contre, si la version stockée est plus récente que la version courante -> création un menu d'update pour la dernière version
		else if (autoUpdate.isLater(currentVersion, '0.2.4'))
		{
			GM_registerMenuCommand("[HFR] Suppression rapide de posts -> Installer la version " + currentVersion, function()
			{
				GM_openInTab(mirrorUrl + 'hfr_suppression_rapide_posts.user.js');
			}
			);
		}
		// Si la version courante et la version stockée sont identiques, on ne fait rien

		if (GM_getValue('lastVersionCheck') == undefined || GM_getValue('lastVersionCheck') == '') GM_setValue('lastVersionCheck', new Date().getTime() + '');
		// Pas eu de check depuis 24h, on vérifie...
		if ((new Date().getTime() - GM_getValue('lastVersionCheck')) > 86400000 && mirrorUrl != 'null')
		{
			var checkUrl = mirrorUrl + 'getLastVersion.php5?name=' + encodeURIComponent('[HFR] Suppression rapide de posts');
			if (isNaN(currentVersion.substring(currentVersion.length - 1))) checkUrl += '&sversion=' + currentVersion.substring(currentVersion.length - 1);

			GM_xmlhttpRequest({
				method: "GET",
				url: checkUrl,
				onload: function(response)
				{
					var regExpVersion = new RegExp('^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}[a-zA-Z]?$');
					var lastVersion = response.responseText;
					// Pas d'erreur et nouvelle version plus récente
					if (lastVersion != '-1' && regExpVersion.test(lastVersion) && autoUpdate.isLater(lastVersion, currentVersion))
					{
						if (confirm('Une nouvelle version de [HFR] Suppression rapide de posts est disponible : ' + lastVersion + '\nVoulez-vous l\'installer ?'))
						{
							GM_openInTab(mirrorUrl + 'hfr_suppression_rapide_posts.user.js');
						}
						else
						{
							// Mémorisation de la version refusée : elle servira de version de référence
							GM_setValue('currentVersion', lastVersion);
						}
					}
					GM_setValue('lastVersionCheck', new Date().getTime() + '');
				}
			});
		}
	},

	max : function(v1, v2)
	{
		var tabV1 = v1.split('.');
		var tabV2 = v2.split('.');
		
		if (isNaN(tabV1[2].substring(tabV1[2].length - 1))) tabV1[2] = tabV1[2].substring(0, tabV1[2].length - 1);
		if (isNaN(tabV2[2].substring(tabV2[2].length - 1))) tabV2[2] = tabV2[2].substring(0, tabV2[2].length - 1);

		if ((tabV1[0] > tabV2[0])
		|| (tabV1[0] == tabV2[0] && tabV1[1] > tabV2[1])
		|| (tabV1[0] == tabV2[0] && tabV1[1] == tabV2[1] && tabV1[2] > tabV2[2]))
		{
			return v1;
		}
		else
		{
			return v2;
		}		
	},

	isLater : function(v1, v2)
	{
		return v1 != v2 && this.max(v1, v2) == v1;
	},

	retrieveMirrorUrl : function()
	{	
		var mirrors = 'http://hfr.toyonos.info/gm/;http://hfr-mirror.toyonos.info/gm/'.split(';');
		var checkMirror = function (i)
		{
			var mirror = mirrors[i];
			GM_xmlhttpRequest({
				url: mirror + 'getLastVersion.php5',
				method: "HEAD",
				onload: function(response)
				{
					// Dès qu'un miroir répond, on le mémorise.
					if (response.status == 200)
					{
						GM_setValue('mirrorUrl', mirror);
					}
					else
					{
						// Sinon on test le prochain
						if ((i + 1) < mirrors.length)
						{
							checkMirror(i + 1);
						}
						else
						{
							GM_setValue('mirrorUrl', 'null');
						}
					}
				}
			});		
		};
		checkMirror(0);
	},
}).check4Update();
