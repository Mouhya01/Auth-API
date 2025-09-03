#Auth API -Node.js/Express/MongoDB


API d'authentification simple: **signup** ,**login**,**logout**,
Pensée pour consolider et renforcer des bases solides en dévelopement back-end et suivi du projet avec git/github

---

## ✨ Fonctionnalités

-Inscription (Avec hash du mot de passe avec bcrypt , et creation avec un email unique)

-Connexion (Obtention d'un JWT avec expiration)

-Déconnexion (méthode simple côté client)

-Middleware d'authentification pour protéger les routes

-Gestion d'erreurs centralisée

-Variables sensibles via `.env` (+ `.env.example`)

---
##🧰 Stack

-Node.js , Express
-MongoDB Atlas, Mongoose
-JWT , Bcrypt
-Postman(tests)

---


##  🚀 Installation

1) Cloner et installer : 

```bash
git clone git@github.com:Mouhya01/Auth-API.git
# ou (HTTPS)
git clone https://github.com/Mouhya01/Auth-API.git

cd auth-api

npm install
```

2) Configurer l'environnement

- crée un fichier .env a la racine (voir .env.example)

- ce fichier vas contenir vos informations sensible et il doit respecter ce format:

MONGO_URL=[ton_url_mongodb_atlas]
JWT_SECRET=[un_secret_long_au_hasard]

3) Lancer le server:

nodemon server.js
# ou
node server.js

Par défaut: http://localhost:3000 , si le port est deja utilisée supprime avec la commande kill-port 3000 et redemarrer le server

## Endpoints

1) Signup

POST /api/auth/signup
Body:

{
  "username": "mouhya",
  "email": "mouhya@example.com",
  "password": "123456"
}

Réponses possibles:

- 201 → { "message": "Nouvel utilisateur créé avec succès" }

- 400 → erreur de validation, email déjà utilisé, etc.

2) Login

POST /api/auth/login

Body:

{
  "email": "mouhya@example.com",
  "password": "123456"
}

Réponse 200:

{
  "user_id": "mongoId",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

3) Logout (méthode simple)

POST /api/auth/logout

Headers:

Authorization: Bearer <token>

Réponse 200:

{ "message": "Déconnexion réussie" }

Note: côté client, supprime le token (localStorage/cookie). Le token reste valide jusqu’à expiration.

4) Route protégée (exemple)

GET /api/auth/profile


Headers:

Authorization: Bearer <token>

Réponse 200:

{
  "message": "Bienvenue dans ton profil !",
  "user": { "userId": "...", "iat": 0, "exp": 0 }
}

Réponse 401 si token manquant/invalide

---

## ⚙️ Structure du projet

AUTH-API/ # Racine du projet
├── src/ # Code source principal
│ ├── config/ # Fichiers de configuration (DB, etc.)
│ ├── controllers/ # Logique métier (authController.js)
│ ├── middleware/ # Middlewares (authMiddleware.js, errorMiddleware.js)
│ ├── models/ # Schémas Mongoose (User.js)
│ ├── routes/ # Définition des routes (authRoutes.js)
│ ├── utils/ # Outils divers (ApiError.js, generateToken.js)
│ └── app.js # Fichier principal Express (chargement routes + middlewares)
├── tests/ # Tests unitaires/intégration (optionnel)
├── .env # Variables d'environnement locales (non versionné)
├── .env.example # Exemple de configuration .env
├── .gitignore # Fichiers/dossiers ignorés par Git
├── package.json # Dépendances et scripts npm
├── package-lock.json # Versions exactes des dépendances
├── README.md # Documentation du projet
└── server.js # Point d'entrée (lancement du serveur)

---

## 🛡️ Erreurs & sécurité

- Gestion centralisée : toutes les erreurs renvoient un JSON clair.

- Mots de passe : jamais stockés en clair (bcrypt).

- JWT : signé avec JWT_SECRET + expiration.

- .env : ne jamais committer .env (utiliser .env.example pour documenter les variables).

## Améliorations possibles

- Logout sécurisé (blacklist de tokens)

- Refresh tokens

- Rate limiting(limiter tentatives de login)

- Tests (Jest/Supertest)

- Doc Swagger/Open API

## 👤 Auteur

- [Mouhyadine Zakaria Djama]

📜 Licence

- [ISC] 




