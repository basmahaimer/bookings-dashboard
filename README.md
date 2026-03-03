# 📅 Booking Dashboard - Gestion des Réservations

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Une application web complète de gestion de réservations avec tableau de bord, calendrier interactif et analyse statistique. Développée avec **Angular 17** (frontend) et **Node.js/Express/SQLite** (backend).

## ✨ Fonctionnalités

### 🔐 Authentification
- Inscription et connexion sécurisée
- JWT (JSON Web Tokens) pour la session
- Routes protégées

### 📊 Tableau de Bord
- **Calendrier interactif** (vue mois/semaine)
- **Liste des réservations** avec filtres et pagination
- **Statistiques d'utilisation** (journalières/mensuelles/annuelles)
- **Graphiques** et indicateurs de performance

### 📅 Gestion des Réservations
- **CRUD complet** (Créer, Lire, Modifier, Supprimer)
- **Validation des dates** (pas de chevauchement)
- **Statuts** : En attente, Confirmée, Annulée
- **Durée calculée** automatiquement

### 📱 Interface Utilisateur
- Design responsive (mobile/desktop)
- Sidebar de navigation
- Modales interactives
- Notifications en temps réel
- Thème moderne avec Font Awesome

## 🏗️ Architecture Technique

```
booking-dashboard-frontend/
├── .angular/
├── .vscode/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── calendar/
│   │   ├── reservations/
│   │   ├── statistics/
│   │   ├── layout/
│   │   ├── dashboard.service.ts
│   │   ├── shared/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.css               # #app.css
│   │   ├── app.html               # < app.html
│   │   ├── app.routes.ts          # TS app.routes.ts
│   │   ├── app.spec.ts            # TS app.spec.ts
│   │   ├── app.ts                  # TS app.ts
│   ├── index.html
│   ├── main.ts
│   ├── styles.css                  # #styles.css
├── .editorconfig
├── .gitignore
├── angular.json
│
├── routes/                  # API REST Node.js
│   ├── auth.js             # Authentification
│   ├── reservations.js     # Gestion réservations
│   └── stats.js            # Statistiques
│
├── database.db             # Base SQLite
├── server.js              # Serveur Express
└── package.json           # Dépendances
```

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+ et npm
- Angular CLI 17+

### 1. Cloner et installer
```bash
git clone [url-du-projet]
cd booking-dashboard

# Installer les dépendances backend
npm install

# Installer les dépendances frontend
cd frontend
npm install
```

### 2. Configuration
```bash
# Copier le fichier d'environnement (si existant)
cp .env.example .env

# Configurer la clé JWT dans routes/auth.js
# Modifier: const JWT_SECRET = 'votre_secret_ici';
```

### 3. Démarrer l'application
```bash
# Terminal 1 - Backend
npm start
# Serveur sur http://localhost:3000

# Terminal 2 - Frontend
cd frontend
ng serve --port 4200 --open
# Application sur http://localhost:4200
```

## 📖 API REST

### Authentification
```
POST   /api/auth/register   # Inscription
POST   /api/auth/login      # Connexion
```

### Réservations
```
GET    /api/reservations    # Lister (filtres: start, end, userId)
POST   /api/reservations    # Créer
PUT    /api/reservations/:id# Modifier
DELETE /api/reservations/:id# Supprimer
```

### Statistiques
```
GET    /api/stats?period=day|month|year  # Statistiques par période
```

### Exemple de requête
```bash
# Tester l'API
curl -X GET http://localhost:3000/api/health
# Réponse: {"status":"OK","timestamp":"..."}

# Connexion
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

## 🛠️ Technologies Utilisées

### **Frontend (Angular 17)**
- **Angular** - Framework frontend
- **TypeScript** - Typage statique
- **RxJS** - Programmation réactive
- **Font Awesome** - Icônes
- **CSS3** - Styles et animations

### **Backend (Node.js)**
- **Express.js** - Framework web
- **SQLite3** - Base de données relationnelle
- **JWT** - Authentification token-based
- **bcryptjs** - Hashage des mots de passe
- **CORS** - Sécurité cross-origin

### **Outils de développement**
- **Angular CLI** - Génération de code
- **Nodemon** - Redémarrage automatique
- **SQLite Browser** - Visualisation BD

## 🗄️ Base de Données

### Schéma SQLite
```sql
-- Utilisateurs
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Réservations
CREATE TABLE reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  status TEXT DEFAULT 'pending',
  user_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
```

## 🧪 Tests

### Tests manuels
1. **Authentification**
   - Inscription nouveau compte
   - Connexion avec credentials
   - Protection des routes

2. **Réservations**
   - Création avec dates valides
   - Modification titre/description
   - Suppression avec confirmation
   - Validation chevauchement

3. **Interface**
   - Navigation sidebar
   - Responsive design
   - Rafraîchissement données

### Tests API (avec curl ou Postman)
```bash
# Tester l'API complète
./test-api.sh
```

## 🔧 Développement

### Structure des composants Angular
```typescript
// Interface TypeScript
export interface Reservation {
  id?: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  user_id: number;
}

// Service Angular
@Injectable()
export class ReservationService {
  getReservations(filters?: any): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl, { params: filters });
  }
}

// Composant
@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html'
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  
  ngOnInit() {
    this.loadReservations();
  }
}
```

### Ajouter une nouvelle fonctionnalité
1. Créer le composant : `ng generate component components/feature-name`
2. Définir l'interface : `interfaces/feature.interface.ts`
3. Créer le service : `ng generate service services/feature`
4. Ajouter la route dans `app-routing.module.ts`
5. Implémenter l'API backend dans `routes/`

## 📈 Statistiques et Analytics

L'application calcule automatiquement :
- **Nombre total** de réservations
- **Heures réservées** cumulées
- **Durée moyenne** des réservations
- **Taux d'occupation** par période
- **Jours/mois les plus chargés**

## 🚀 Déploiement

### Production (Recommandé)
```bash
# Build Angular
cd frontend
ng build --prod

# Le build est dans frontend/dist/frontend
# Configurer Nginx/Apache pour servir les fichiers statiques
```

### Docker (Optionnel)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Journal des Changements

### v1.0.0 - Version Initiale
- ✅ Authentification JWT
- ✅ CRUD réservations
- ✅ Calendrier interactif
- ✅ Statistiques avancées
- ✅ Interface responsive
- ✅ API REST complète

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **Basma HAIMER** - *Développement initial* - [basmahaimer](https://github.com/basmahaimer)
- **Aya SABRI** - *Développement initial*

## 🙏 Remerciements

- [Angular Team](https://angular.io/)
- [Express.js](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- [Font Awesome](https://fontawesome.com/)

---

## 🎯 Prochaines Fonctionnalités

- [ ] Notifications par email
- [ ] Export PDF des réservations
- [ ] Synchronisation calendrier Google/Outlook
- [ ] Interface d'administration multi-utilisateurs
- [ ] API documentation avec Swagger
- [ ] Tests unitaires et d'intégration
- [ ] Internationalisation (i18n)

## 📞 Support

Pour toute question ou problème :
1. Vérifier la section [Issues](https://github.com/basmahaimer/bookings-dashboard)
2. Consulter la documentation technique
3. Contacter l'équipe de développement

---

**⭐ Si ce projet vous a été utile, pensez à lui donner une étoile sur GitHub !**

---

*Documentation mise à jour le 3 février 2026*
