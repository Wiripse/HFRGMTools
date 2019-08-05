# HFRGMTools

Utilitaires de scripts GreaseMonkey pour HFR

## MPStorage Version 0.1

Utilisation d'un MP pour stocker des données à utiliser par des scripts GM et par les applications Android et iOS.

### Principe

Un message privé unique est créé, sa première réponse servira à stocker un JSON contenant les données.

A l'initialisation du script, il convient de déterminer trois éléments, qui seront nécessaires par la suite :

* le pseudo de l'utilisateur
* l'ID HFR de la conversation MP
* l'ID HFR de la première réponse dans le MP

Ces données sont à conserver en local par la suite pour ne pas avoir à faire cette lourde procédure à chaque fois...

#### Récupération du pseudo

Un exemple est donné dans _MPStorage.user.js_ méthode _getUsername_.

#### Récupération des ID

Un exemple est donné dans _MPStorage.user.js_ méthode _findStorageMPOnPage_.

Le MP pouvant être sur une autre page que la première, il faudra paginer jusqu'à le trouver.

Si le MP est introuvable c'est qu'il n'existe pas, il faut alors le créer.

Un exemple est donné dans _MPStorage.user.js_ méthode _createStorageMP_.

#### Récupération des données

Un exemple est donné dans _MPStorage.user.js_ méthode _getStorageData_.

#### Enregistrement des données

Un exemple est donné dans _MPStorage.user.js_ méthode _setStorageData_.

### Convention 

Pour que le système fonctionne sur toutes les plateformes, il faut que chaque script respecte une convention.

Le MP servant au stockage devra être nommé : 

```
a2bcc09b796b8c6fab77058ff8446c34
```

Le JSON stocké devra respecter la structure décrite ci-dessous.

### Structure de stockage

#### Structure générale

```json
{
    data : [ENTRY],
    sourceName : TOOLNAME,
    lastUpdate : TIMESTAMP
}
```

* **TOOLNAME** : Nom de l'outil utilisé pour modifier le JSON (Script GM, appli mobile...)
* **TIMESTAMP** : Timestamp du moment où a été modifié le JSON


#### Structure d'une ENTRY

```json
{
    version : MPSTORAGE_VERSION,
    mpFlags : MP_FLAGS,
    blacklist : BLACKLIST,
    sourceName : TOOLNAME,
    lastUpdate : TIMESTAMP

}
```

* **MPSTORAGE_VERSION** : Version de MPStorage avec laquelle la structure est valide. Cette donnée est utilisée pour que des scripts utilisant une version différente de MPStorage puissent fonctionner en parallèle. Si un script utilise une version supérieure, il devra maintenir les ENTRY des anciennes versions supportées
* **TOOLNAME** : Nom de l'outil utilisé pour modifier le JSON (Script GM, appli mobile...)
* **TIMESTAMP** : Timestamp du moment où a été modifié le JSON

#### Structure du MP_FLAGS

```json
{
    flags : [
        {
           POST_ID : {
               uri : POST_URI,
               post : POST_ID,
               page : FLAG_PAGE,
               href : RESPONSE_ANCHOR,
               p : FLAG_PAGE
           } 
        }
    ],
    sourceName : TOOLNAME,
    lastUpdate : TIMESTAMP
}
```

* **TOOLNAME** : Nom de l'outil utilisé pour modifier le JSON (Script GM, appli mobile...)
* **TIMESTAMP** : Timestamp du moment où a été modifié le JSON

Exemple :

```json
{
 "123456" : {
  "uri":"https://forum.hardware.fr/forum2.php?config=hfr.inc&cat=prive&post=123456&page=1&p=1&sondage=0&owntopic=0&trash=0&trash_post=0&print=0&numreponse=0&quote_only=0&new=0&nojs=0#t789987",
  "post":123456,
  "page":1,
  "href":
  "t789987",
  "p":"1"
 }
}
```


#### Structure de la BLACKLIST

```json
{
    list : [
        {
               username : PSEUDO_HFR,
               userId : ID_HFR,
               createDate : TIMESTAMP
        }
    ],
    sourceName : TOOLNAME,
    lastUpdate : TIMESTAMP
}
```

* **TOOLNAME** : Nom de l'outil utilisé pour modifier le JSON (Script GM, appli mobile...)
* **TIMESTAMP** : Timestamp du moment où a été modifié le JSON

#### Exemple complet

```json
{
   "data":[
      {
         "version":"0.1",
         "mpFlags":{
            "flags":[
               {
                  "123456":{
                     "uri":"https://forum.hardware.fr/forum2.php?config=hfr.inc&cat=prive&post=123456&page=1&p=1&sondage=0&owntopic=0&trash=0&trash_post=0&print=0&numreponse=0&quote_only=0&new=0&nojs=0#t789987",
                     "post":123456,
                     "page":1,
                     "href":"t789987",
                     "p":"1"
                  }
               }
            ],
            "sourceName":"HFRGMTools",
            "lastUpdate":1564993571925
         },
         "blacklist":{
            "blacklist":[
               {
                  "username":"MultiMP",
                  "userId":99887766,
                  "createDate":1564993571925
               },
               {
                  "username":"MultiMP2",
                  "userId":66778899,
                  "createDate":1564993571925
               }
            ],
            "sourceName":"HFRGMTools",
            "lastUpdate":1564993571925
         },
         "sourceName":"HFRGMTools",
         "lastUpdate":1564993571925
      }
   ],
   "sourceName":"HFRGMTools",
   "lastUpdate":1564993571925
}

```