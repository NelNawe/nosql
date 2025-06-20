# SailingLoc - Application de gestion de location de bateaux

Bienvenue dans **SailingLoc**, une application Node.js/Express utilisant MongoDB avec Prisma ET CouchDB en parallèle.  
Le projet simule un système de gestion de flotte de bateaux pour une plateforme de location.

## Fonctionnalités

L'application propose deux ensembles d'API CRUD identiques :
- **MongoDB** : Routes `/mongo/boats/*` utilisant Prisma ORM
- **CouchDB** : Routes `/couchdb/boats/*` utilisant Nano client

---

## Lancement rapide

Cloner le dépôt et lancer avec Docker :

```bash
git clone https://github.com/EmericBayard/sailingLoc.git
cd sailingLoc
docker compose down --volumes docker compose up --build

```

## API Endpoints

### MongoDB (Prisma)
- `GET /mongo/boats` - Récupérer tous les bateaux
- `POST /mongo/boats` - Créer un bateau
- `PUT /mongo/boats/:id` - Mettre à jour un bateau
- `DELETE /mongo/boats/:id` - Supprimer un bateau

### CouchDB
- `GET /couchdb/boats` - Récupérer tous les bateaux
- `POST /couchdb/boats` - Créer un bateau
- `GET /couchdb/boats/:id` - Récupérer un bateau spécifique
- `PUT /couchdb/boats/:id` - Mettre à jour un bateau
- `DELETE /couchdb/boats/:id` - Supprimer un bateau
