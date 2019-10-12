# HFR4K - Guide d'utilisation

## Warning

La documentation technique sur MPStorage est [ici](./mpstorage). Il n'est pas nécessaire de la lire pour utiliser HFR4K.

## C'est quoi ?

HFR4K est un userscript destiné à améliorer l'utilisation de la version Web d'HFR.

## Comment l'installer ?

Il faut installer sur le navigateur une extension capable de gérer les UserScripts : TamperMonkey, GreaseMonkey, ViolentMonkey...

Puis installer le script HFR4K [ici](https://www.youtube.com/watch?v=dQw4w9WgXcQ).

## Comment l'utiliser ?

### Version

Pour connaître la version installée, chercher la phrase _Enhanced by HFR4K_ dans le footer de n'importe quelle page du forum.

### Mise à jour

Le script devrait être automatiquement mis à jour par l'extension.

Pour forcer la mise à jour, passer par le menu contextuel :

![force upgrade TM](https://www.pctr.fr/images/5qbV.png)

### Settings

Les réglages sont accessibles en cliquant sur l'onglet représentant un rond doré devant une boîte marron.

### Onglet MP

Un nouvel onglet permet d'accéder aux MP. 

Il se présente sous la forme d'une enveloppe. Lorsqu'il existe un MP non lu, l'enveloppe clignotte.

* Clic > Ouvrir les MP
* Clic-droit > Ouvrir les MP dans un nouvel onglet

### SuperFavoris

Permet de gérer trois états distincts entre les topics favoris via leur icône :

* Simple favori (par défaut/icône oeil)
* Super favori (clic-droit/icône coeur et surlignage)
* Hideable (clic/icône oeil barré)

Lorsque l'option est activée, un onglet est ajouté afin de filtrer les favoris :

* Clic > Alterner tous les favoris/masquer les hideable
* Clic-droit > Alterner tous les favoris/uniquement les super favoris (sans surlignage)

#### Paramètres

* Activer/désactiver l'option
* Verrouiller l'état des favoris (affichage des icônes standard et clics désactivés)
* Afficher/Masquer les catégories vides (mode compact)
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
* Colorer uniquement les quotes/tout le post contenant le(s) quote(s)

### EgoPost

Mettre en avant via une couleur spéciale les posts de l'utilisateur. 

Basé sur _[HFR] Ego Posts_ de [n0m1s](https://github.com/TheMrNomis/HFR-scripts/).

#### Paramètres

* Activer/désactiver l'option
* Choisir la couleur des posts

### Last Read

Affichage d'un marqueur sous le dernier post lu d'un topic.

Basé sur _[HFR] Last Post Highlight_ de [Roger21](http://roger21.free.fr/hfr/).

#### Paramètres

* Activer/désactiver l'option
* Choisir la couleur de la ligne

### Ezzzi Draps

Affichage plus large des drapeaux pour un clic plus facile.

Double-click sur le titre du topic ouvre aussi le drapeau.

Basé sur _[HFR] Drapal Easy Click_ de [Roger21](http://roger21.free.fr/hfr/).

#### Paramètres

* Activer/désactiver l'option

### Suppression rapide

Ajoute un bouton à la toolbar des posts de l'utilisateur pour les supprimer en un clic.

Basé sur _[HFR] Suppression rapide de posts_ de [Toyonos](http://toyonos.info).

#### Paramètres

* Activer/désactiver l'option

### Liste Noire

Masquer les posts d'utilisateurs nuisibles.

Une icône permettant d'ajouter/supprimer un utilisateur à la liste est inséré à chaque post à côté du pseudo de l'auteur.

Basé sur _[HFR] Black List mod_r21_ de [Roger21](http://roger21.free.fr/hfr/).

#### Paramètres

* Activer/désactiver l'option
* Gérer la liste

## Changelog

### 2019.10.12.0

Liste Noire V1.

### 2019.10.6.2

Message lorsqu'il existe un décalage de versions entre les machines de l'utilisateur.

### 2019.10.6.1

Ezzzi Draps. Suppression rapide.

### 2019.10.6.0

Last Read.

### 2019.10.5.3

EgoPost. Icône aide settings. Catégories compactes. Petits fixs.

### 2019.10.5.2

Mode lock des SuperFav. Fix EgoQuote citations trad oldschool.

### 2019.10.5.1

Option EgoQuote post complet. Fix EgoQuote citations traditionnelles. Refacto table settings.

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