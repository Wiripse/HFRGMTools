# HFR4K - Guide d'utilisation

## Warning

La documentation technique sur MPStorage est [ici](./mpstorage). Il n'est pas nécessaire de la lire pour utiliser HFR4K.

## Avertissement vie privée

Pour fonctionner, HFR4K va créer un MP dans lequel il stockera les paramètres du script. Ce MP est envoyé à **l'utilisateur MultiMP** qui est un compte créé uniquement dans ce but par Marc.

En dehors de l'utilisateur, personne d'autre que l'administration d'HFR ne pourra accéder à ce MP.

Les données qui y sont stockées ne sont à aucun moment partagées avec les développeurs du script ou une autre personne.

Les échanges de données se font uniquement entre la machine de l'utilisateur et les serveurs d'HFR.

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

Affichage plus large des drapeaux pour un clic plus facile. Faire un click droit, CTRL+Click ou click molette sur la case d'un drapeau l'ouvre dans un nouvel onglet.

Double-click sur le titre du topic ouvre aussi le drapeau dans l'onglet courant.

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

Une icône permettant d'ajouter/supprimer un utilisateur à la liste est insérée à chaque post à côté du pseudo de l'auteur.

Basé sur _[HFR] Black List mod_r21_ de [Roger21](http://roger21.free.fr/hfr/).

#### Paramètres

* Activer/désactiver l'option
* Gérer la liste

### Validation rapide

Soumettre rapidement un post via CTRL+ENTER. 

#### Paramètres

* Activer/désactiver l'option

### Drapeaux multi-MP (Dark Topics)

Gestion de drapeau (dernier message lu) dans les multi-MP.

Une icône permettant d'accéder au dernier message lu est insérée à gauche du titre du MP.

#### Paramètres

* Activer/désactiver l'option

### Catégorie MP dans les drapeaux

Ajoute une catégorie pour les MP non lus (de la première page) sur les pages drapeaux.

#### Paramètres

* Activer/désactiver l'option

## Changelog

### 2020.04.25.0

Upgrade de MPstorage. 
Ajout d'un bouton de blacklist dans les quotes pour gérer les pseudos mal encodés qui ne sont pas affichés de la même manière dans le bloc info d'un post. 
Correctif sur la validation rapide pour que ça fonctionne partout.

### 2020.04.24.0

Upgrade de MPStorage. Pas de nouvelle fonctionnalité mais plus de stabilité.

### 2020.04.21.0

Correction Flag DT pour ne plus utiliser les URLs et la donnée isDT maintenant que HFR+ est corrigé de son côté.

### 2020.01.13.2

Fix Ezzzi Draps cat MP. Mutualisation du code.

### 2020.01.13.1

Ezzzi Draps pour les DT.

### 2020.01.13.0

Flag DT que si message(s) non lu(s).

### 2020.01.11.1

Catégorie MPs dans les drapeaux. Petit fix sur la gestion des DTs.

### 2020.01.11.0

Encore un correctif sur le contrôle de version...

### 2020.01.09.0

Correction de l'affichage des catégories.

### 2020.01.08.0

Différenciation des flags MPs créés par DTCloud/HFR+ et des flags DT.

### 2020.01.07.0

Ezzzi Draps; le click droit ouvre dans un nouvel onglet.

### 2020.01.05.1

Fix issue #17 pour compatibilité [HFR] New Page Number.

### 2020.01.05.0

DTCloud KISS.

### 2020.01.03.0

Fix contrôles versions.

### 2020.01.02.0

Validation rapide d'un post avec CTRL+ENTER. Petits fixs.

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
