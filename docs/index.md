# HFR4K - Guide d'utilisation

## Warning

La documentation technique sur MPStorage est [ici](./mpstorage). Il n'est pas nécessaire de la lire pour utiliser HFR4K.

## C'est quoi ?

HFR4K est un userscript destiné à améliorer l'utilisation de la version Web d'HFR.

## Comment l'installer ?

Il faut installer sur le navigateur une extension capable de gérer les UserScripts : TamperMonkey, GreaseMonkey, ViolentMonkey...

Puis installer le script HFR4K [ici](https://github.com/Wiripse/HFRGMTools/raw/master/SuperFavs.user.js).

## Comment l'utiliser ?

### Version

Pour connaître la version installée, chercher la phrase _Enhanced by HFR4K_ dans le footer de n'importe quelle page du forum.

### Mise à jour

Lorsque le script aura été mis à jour automatiquement par l'extension, un message s'affichera au dessus de la liste des drapeaux.

### Settings

Les réglages sont accessibles en cliquant sur l'onglet représentant un rond doré devant une boîte marron.

### Onglet MP

Un nouvel onglet permet d'accéder aux MP. 

Il se présente sous la forme d'une enveloppe. Lorsqu'il existe un MP non lu, l'enveloppe clignotte.

* Clic > Ouvrir les MP
* Clic-droit > Ouvrir les MP dans un nouvel onglet

### SuperFavoris

Permet de gérer trois états distincts entre les topics favoris :

* Simple favori (par défaut/icône oeil)
* Super favori (clic-droit/icône coeur et surlignage)
* Hideable (clic/icône oeil barré)

Lorsque l'option est activée, un onglet est ajouté afin de filtrer les favoris :

* Clic > Alterner tous les favoris/masquer les hideable
* Clic-droit > Alterner tous les favoris/uniquement les super favoris (sans surlignage)

#### Paramètres

* Activer/désactiver l'option
* Choisir la couleur d'un super favori
* Choisir la couleur d'un super favori lorsque l'on passe dessus
* Choisir la couleur d'un favori simple
* Choisir la couleur d'un favori simple lorsque l'on passe dessus

### EgoQuote

Mettre en avant via une couleur spéciale les citations des posts de l'utilisateur. 

Basé sur _[HFR] Ego Quote_ de [Roger21](http://roger21.free.fr/hfr/).

#### Paramètres

* Activer/désactiver l'option
* Choisir la couleur des quotes

## Changelog

### 2019.10.5.0

EgoQuote.

### 2019.10.4.2

Choix des couleurs des favoris simples.

### 2019.10.4.1

Clic-droit onglet MP.

### 2019.10.4.0

Init bêta. Fix sur lecture des paramètres d'URL.

### 2019.10.3.3

Icône nouveau MP. Footer avec version. Meilleure vérification de la page courante.

### 2019.10.3.2

Aides selecteur couleur. Changement message nouvelle version.

### 2019.10.3.1

Fix couleurs par défaut.

### 2019.10.3.0

Nouvelle gestion des clics pour SuperFav. Onglet pour les MPs. Checkbox pour statut option dans les settings. Message nouvelle version.

### 2019.10.2.4

Ajout des settings. Divers fixs. Refacto.