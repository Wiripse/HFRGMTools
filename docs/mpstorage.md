# Guide d'utilisation du MPStorage

## Quoi la baise ?

Le MPStorage est un _hack_ du système de MPs d'HFR pour permettre de stocker des informations dans un MP afin de synchroniser des outils entre différentes machines/plateformes.

Rassure-toi : ceci a été réalisé avec l'accord des autorités compétentes.

Aujourd'hui il est possible d'accéder au forum de trois façons différentes :

* La [version Web](https://forum.hardware.fr) 
* L'application [Android Redface](https://play.google.com/store/apps/details?id=com.ayuget.redface&hl=fr)
* L'application [iOS Super HFR+](https://apps.apple.com/fr/app/super-hfr-hardware-fr/id1303081080)

Pour chacune, il est possible d'ajouter des fonctionnalités supplémentaires au forum (Blacklist, affichage personnalisé...) mais comme ce ne sont pas des fonctions natives, les préférences ne sont enregistrées que localement et si on change de navigateur/machine/plateforme, on perd ces paramètres. 

C'est ici qu'intervient MPStorage; on va enregistrer ces données dans un MP résultat peu importe comment on accède au forum, on a accès à ces préférences partagées.

```
Exemple : j'ajoute un membre dans ma blacklist via la version web, cette modification est immédiatement disponible sur l'application iOS.
```

## Comment on fait ?

### Version Web

L'ajout des fonctionnalités passe par des Userscripts, petits _programmes_ JavaScript pilotés par une extension.

Plus de détails sur [le topic dédié](https://forum.hardware.fr/forum2.php?config=hfr.inc&cat=13&post=116015&numreponse=51221946).

TL;DR : Installe l'extension Tampermonkey pour ton navigateur puis l'un des scripts suivants.

* [ListeNoire LaMer](https://github.com/Wiripse/HFRGMTools/raw/master/ListeNoire_LaMer.user.js) > Blacklist d'utilisateurs à masquer
* [DTCloud](https://github.com/Wiripse/HFRGMTools/raw/master/DTCloud.user.js) > Gestion des drapeaux sur les DartTopics/MP à plusieurs

### Version Android

L'application Redface ne supporte pas pour le moment le MPStorage.

### Version iOS

Super HFR+ supporte la blacklist et les drapeaux MP.

Pour l'activer, aller dans les règlages (onglet **Plus** puis **Réglages**) et cocher **Activer le stockage MP**.

## Comment ça marche ?

Lors de la première utilisation, l'outil choisi va rechercher s'il existe un MP dont le titre est _a2bcc09b796b8c6fab77058ff8446c34_. 

Si c'est le cas, il récupère son contenu et voilà.

Si ce n'est pas le cas, il va créer ce MP et l'envoyer à l'utilisateur _MultiMP_ et lui poster le contenu minimal pour fonctionner.

Ensuite, le contenu du MP sera lu lorsque nécessaire, et chaque modification des préférences sera enregistrée en modifiant le contenu du message.

Il est normal de voir apparaître cet étrange MP dont le contenu en [JSON](https://fr.wikipedia.org/wiki/JavaScript_Object_Notation) ne devrait pas te parler. Il ne faut surtout par le supprimer sinon cela pourrait provoquer des erreurs dans les outils qui l'utilisent.


## C'est sécurisé ?

Oui ! Le principe du MPStorage se base sur des opérations normales d'utilisation du forum. 

Toutes les requêtes sont faites en HTTPS. 

A aucun moment ton mot de passe n'est récupéré/enregistré.

_MultiMP_, le destinataire du MP, est un utilisateur créé spécifiquement par M.arc et il ne sera jamais utilisé pour lire les messages envoyés.

## J'ai une autre question

Pose-la au bon endroit :

* Topic [Web/Tampermonkey/Userscripts](https://forum.hardware.fr/forum2.php?config=hfr.inc&cat=13&post=116015&numreponse=51221946)
* Topic [Android/Redface](https://forum.hardware.fr/forum2.php?config=hfr.inc&cat=23&post=29332&numreponse=1909059)
* Topic [iOS/Super HFR+](https://forum.hardware.fr/forum2.php?config=hfr.inc&cat=25&post=1711&numreponse=236109)