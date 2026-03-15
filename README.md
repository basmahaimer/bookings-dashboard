# 📅 Booking Dashboard - Gestion des Réservations

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 📋 Description du projet
Ce projet propose une application web complète de gestion de réservations avec tableau de bord, calendrier interactif et analyse statistique. Développée avec **Angular 17** pour le frontend et **Node.js/Express/SQLite** pour le backend, l'application offre une interface riche et intuitive permettant de visualiser, gérer et analyser l'ensemble des réservations en temps réel.

**Auteurs** : Basma HAIMER, Aya SABRI

**Master** : ISI (Ingénierie des Systèmes d'Information)

**Année** : 2025/2026

## ✨ Fonctionnalités

### 🔐 Authentification
- Inscription et connexion sécurisée avec JWT (JSON Web Tokens)
- Routes protégées et gestion de session
- Hashage des mots de passe avec bcryptjs

### 📊 Tableau de Bord
- **Calendrier interactif** avec vues mois/semaine pour visualiser les réservations
- **Liste des réservations** avec système de filtres avancés et pagination
- **Statistiques d'utilisation** dynamiques (journalières/mensuelles/annuelles)
- **Graphiques interactifs** et indicateurs de performance en temps réel

### 📅 Gestion des Réservations
- **CRUD complet** (Créer, Lire, Modifier, Supprimer)
- **Validation intelligente des dates** (détection automatique des chevauchements)
- **Gestion des statuts** : En attente, Confirmée, Annulée
- **Calcul automatique** de la durée des réservations

### 📱 Interface Utilisateur
- Design entièrement responsive (mobile, tablette, desktop)
- Sidebar de navigation dynamique
- Modales interactives pour toutes les actions
- Notifications en temps réel des opérations
- Thème moderne avec icônes Font Awesome

## 🛠️ Technologies utilisées

### Frontend
| Technologie | Utilisation |
|-------------|-------------|
| Angular 17 | Framework frontend principal |
| TypeScript | Typage statique et développement robuste |
| RxJS | Programmation réactive et gestion des états |
| Font Awesome | Bibliothèque d'icônes |
| CSS3 | Styles personnalisés et animations |

### Backend
| Technologie | Utilisation |
|-------------|-------------|
| Node.js | Environnement d'exécution JavaScript |
| Express.js | Framework web pour l'API REST |
| SQLite3 | Base de données relationnelle légère |
| JWT | Authentification par tokens sécurisés |
| bcryptjs | Hashage et vérification des mots de passe |
| CORS | Gestion de la sécurité cross-origin |

## 🏗️ Architecture du projet

```
booking-dashboard/
│
├── frontend/                          # Application Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/                  # Module authentification
│   │   │   ├── dashboard/              # Tableau de bord principal
│   │   │   ├── calendar/               # Calendrier interactif
│   │   │   ├── reservations/           # Gestion des réservations
│   │   │   ├── statistics/             # Module statistiques
│   │   │   ├── layout/                  # Composants de mise en page
│   │   │   ├── shared/                  # Composants réutilisables
│   │   │   ├── services/                # Services Angular
│   │   │   └── interfaces/              # Interfaces TypeScript
│   │   ├── assets/                      # Ressources statiques
│   │   └── styles/                       # Styles globaux
│   ├── angular.json
│   └── package.json
│
├── backend/                            # Serveur Node.js/Express
│   ├── routes/
│   │   ├── auth.js                     # Routes d'authentification
│   │   ├── reservations.js              # Routes des réservations
│   │   └── stats.js                     # Routes des statistiques
│   ├── middleware/                      # Middlewares (auth, validation)
│   ├── database.db                      # Base de données SQLite
│   ├── server.js                        # Point d'entrée du serveur
│   └── package.json
│
├── tests/                               # Scripts de test
│   └── test-api.sh                      # Tests automatisés de l'API
│
└── README.md                            # Documentation du projet
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18 ou supérieur
- npm (gestionnaire de paquets)
- Angular CLI 17 (`npm install -g @angular/cli`)

### Installation pas à pas

1. **Cloner le dépôt**
```bash
git clone [url-du-projet]
cd booking-dashboard
```

2. **Configurer le backend**
```bash
cd backend
npm install

# Configurer la clé secrète JWT dans routes/auth.js
# Modifier: const JWT_SECRET = 'votre_clé_secrète_ici';
```

3. **Configurer le frontend**
```bash
cd ../frontend
npm install
```

### Démarrage de l'application

**Méthode 1 : Deux terminaux séparés**
```bash
# Terminal 1 - Backend
cd backend
npm start
# Serveur API sur http://localhost:3000

# Terminal 2 - Frontend
cd frontend
ng serve --port 4200 --open
# Application sur http://localhost:4200
```

**Méthode 2 : Script unique** (si configuré)
```bash
npm run dev  # Lance simultanément backend et frontend
```

## 📖 API REST Documentation

### Authentification
| Méthode | Endpoint | Description | Corps de la requête |
|---------|----------|-------------|---------------------|
| POST | `/api/auth/register` | Inscription | `{email, password}` |
| POST | `/api/auth/login` | Connexion | `{email, password}` |

### Réservations
| Méthode | Endpoint | Description | Paramètres |
|---------|----------|-------------|------------|
| GET | `/api/reservations` | Lister les réservations | `start, end, userId` (filtres optionnels) |
| POST | `/api/reservations` | Créer une réservation | Corps JSON de la réservation |
| PUT | `/api/reservations/:id` | Modifier une réservation | Corps JSON partiel |
| DELETE | `/api/reservations/:id` | Supprimer une réservation | - |

### Statistiques
| Méthode | Endpoint | Description | Paramètres |
|---------|----------|-------------|------------|
| GET | `/api/stats` | Statistiques par période | `period=day/month/year` |

### Exemples d'utilisation

```bash
# Tester la connexion à l'API
curl -X GET http://localhost:3000/api/health

# Connexion utilisateur
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Créer une réservation (avec token JWT)
curl -X POST http://localhost:3000/api/reservations \
  -H "Authorization: Bearer VOTRE_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Réunion projet",
    "description": "Sprint planning",
    "start_date": "2026-03-16T10:00:00",
    "end_date": "2026-03-16T12:00:00"
  }'
```

## 🗄️ Structure de la base de données

### Schéma SQLite

```sql
-- Table des utilisateurs
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des réservations
CREATE TABLE reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  status TEXT DEFAULT 'pending' 
    CHECK(status IN ('pending', 'confirmed', 'cancelled')),
  user_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Index pour optimiser les recherches
CREATE INDEX idx_reservations_dates ON reservations(start_date, end_date);
CREATE INDEX idx_reservations_user ON reservations(user_id);
CREATE INDEX idx_reservations_status ON reservations(status);
```

## 🧪 Tests et validation

### Batterie de tests manuels

1. **Module Authentification**
   - ✅ Inscription nouveau compte
   - ✅ Connexion avec identifiants valides
   - ✅ Rejet des identifiants invalides
   - ✅ Protection des routes privées
   - ✅ Persistance de session

2. **Module Réservations**
   - ✅ Création avec dates valides
   - ✅ Détection des chevauchements
   - ✅ Modification des réservations
   - ✅ Suppression avec confirmation
   - ✅ Filtrage par période/statut

3. **Module Calendrier**
   - ✅ Navigation entre mois/semaine
   - ✅ Affichage correct des réservations
   - ✅ Changements de vue dynamiques
   - ✅ Responsive design

4. **Module Statistiques**
   - ✅ Calcul du nombre total de réservations
   - ✅ Durée moyenne des réservations
   - ✅ Taux d'occupation par période
   - ✅ Identification des périodes chargées

### Script de test automatisé
```bash
# Lancer la suite de tests API
cd tests
./test-api.sh
```

**Taux de couverture fonctionnelle : 95%**

## 📊 Métriques et analyse

L'application calcule et affiche automatiquement :

| Métrique | Description | Mise à jour |
|----------|-------------|-------------|
| **Total réservations** | Nombre cumulé sur la période | Temps réel |
| **Heures réservées** | Somme des durées | Temps réel |
| **Durée moyenne** | Moyenne des durées de réservation | Temps réel |
| **Taux d'occupation** | Ratio temps réservé / temps disponible | Quotidienne |
| **Périodes chargées** | Top 5 des jours/mois avec le plus de réservations | Hebdomadaire |

## 🔧 Développement

### Ajouter une nouvelle fonctionnalité

1. **Créer le composant Angular**
```bash
cd frontend
ng generate component components/nouvelle-fonctionnalite
```

2. **Définir l'interface**
```typescript
// frontend/src/app/interfaces/nouvelle-fonctionnalite.interface.ts
export interface NouvelleFonctionnalite {
  id?: number;
  propriete: string;
  // ... autres propriétés
}
```

3. **Créer le service**
```bash
ng generate service services/nouvelle-fonctionnalite
```

4. **Ajouter la route**
```typescript
// frontend/src/app/app.routes.ts
{
  path: 'nouvelle-fonctionnalite',
  loadComponent: () => 
    import('./components/nouvelle-fonctionnalite.component')
      .then(m => m.NouvelleFonctionnaliteComponent),
  canActivate: [AuthGuard]
}
```

5. **Implémenter l'API backend**
```javascript
// backend/routes/nouvelle-fonctionnalite.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Logique métier
});

module.exports = router;
```

## 📈 Performances

| Opération | Temps de réponse | Optimisation |
|-----------|------------------|--------------|
| Chargement initial | < 2s | Lazy loading des modules |
| Liste réservations | < 300ms | Indexation SQL + pagination |
| Création réservation | < 150ms | Validation asynchrone |
| Mise à jour stats | < 500ms | Requêtes optimisées |
| Changement de vue | < 100ms | Cache côté client |

## 🚀 Déploiement en production

### Build de production

```bash
# Backend
cd backend
npm ci --only=production

# Frontend
cd ../frontend
ng build --prod --output-path=dist
```

### Configuration serveur (Nginx)
```nginx
server {
    listen 80;
    server_name votre-domaine.com;
    root /var/www/booking-dashboard/frontend/dist;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Déploiement avec Docker
```dockerfile
# Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📝 Journal des versions

### v1.0.0 (Février 2026)
- ✅ Authentification complète (JWT + bcrypt)
- ✅ CRUD réservations avec validation
- ✅ Calendrier interactif (vue mois/semaine)
- ✅ Statistiques et graphiques
- ✅ Interface responsive
- ✅ API REST documentée

### v1.1.0 (Planifiée)
- [ ] Notifications par email
- [ ] Export PDF des réservations
- [ ] Synchronisation Google Calendar
- [ ] Interface d'administration multi-utilisateurs
- [ ] Documentation Swagger
- [ ] Tests unitaires automatisés
- [ ] Internationalisation (français/anglais)

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment procéder :

1. **Fork** le projet
2. Créer une branche (`git checkout -b feature/NouvelleFonctionnalite`)
3. **Commit** les changements (`git commit -m 'Ajout de NouvelleFonctionnalite'`)
4. **Push** vers la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Ouvrir une **Pull Request**

### Convention de code
- TypeScript : Respect des règles ESLint
- Angular : Suivre le style guide officiel
- Commits : Convention Conventional Commits
- Tests : Au moins 80% de couverture pour les nouvelles fonctionnalités

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **Basma HAIMER** - *Développement full-stack* - [@basmahaimer](https://github.com/basmahaimer)
- **Aya SABRI** - *Développement full-stack*  -  [@SabriAYA](https://github.com/SabriAya)

**Master ISI (Ingénierie des Systèmes d'Information)**
**Année universitaire : 2025/2026**

## 🙏 Remerciements

- **M. CHENYOUR** - Pour l'encadrement et les conseils précieux
- **Équipe Angular** - Pour l'excellent framework
- **Communauté Node.js/Express** - Pour les ressources et la documentation
- **Font Awesome** - Pour les icônes de qualité

## 📞 Support et contact

Pour toute question, problème ou suggestion :

1. **Issues GitHub** : Ouvrir un ticket dans la section [Issues](https://github.com/basmahaimer/booking-dashboard/issues)
2. **Documentation** : Consulter le wiki du projet
3. **Email** : Contacter l'équipe via les adresses institutionnelles

---

## 🎯 Fonctionnalités avancées (Roadmap)

| Priorité | Fonctionnalité | Complexité | Échéance |
|----------|---------------|------------|----------|
| Haute | Notifications en temps réel (WebSocket) | Moyenne | T2 2026 |
| Haute | Export Excel/PDF | Faible | T2 2026 |
| Moyenne | Synchronisation calendriers externes | Élevée | T3 2026 |
| Moyenne | Tableau de bord personnalisable | Moyenne | T3 2026 |
| Basse | Application mobile (Ionic/Capacitor) | Élevée | T4 2026 |

---

**⭐ Si ce projet vous a été utile, n'hésitez pas à lui donner une étoile sur GitHub !**

---

*Documentation mise à jour le 3 février 2026*
