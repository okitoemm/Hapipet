# Hapipet - Documentation Technique

## Vue d'ensemble

**Hapipet** est une application mobile de mise en relation entre propriétaires de chiens et dog-sitters. Elle permet aux utilisateurs de rechercher, contacter et réserver des services de garde de chiens.

---

## Stack Technique

### Framework & Plateforme
| Technologie | Version | Description |
|-------------|---------|-------------|
| **React Native** | 0.81.4 | Framework mobile cross-platform |
| **Expo** | ~54.0.7 | Plateforme de développement React Native |
| **TypeScript** | ~5.9.2 | Typage statique JavaScript |

### Gestion d'État
| Technologie | Version | Description |
|-------------|---------|-------------|
| **Redux Toolkit** | ^2.9.0 | Gestion d'état globale |
| **React Redux** | ^9.2.0 | Binding Redux pour React |

### Navigation
| Technologie | Version | Description |
|-------------|---------|-------------|
| **React Navigation** | ^7.x | Navigation entre écrans |
| **Bottom Tabs** | ^7.4.7 | Navigation par onglets |
| **Native Stack** | ^7.3.26 | Navigation en pile native |

### Backend & Services
| Technologie | Version | Description |
|-------------|---------|-------------|
| **Supabase** | ^2.57.4 | Backend-as-a-Service (Auth, DB, Storage) |
| **Stripe** | ^0.52.0 | Paiements sécurisés |

### Fonctionnalités Natives
| Technologie | Description |
|-------------|-------------|
| **expo-location** | Géolocalisation |
| **expo-notifications** | Notifications push |
| **expo-image-picker** | Sélection d'images |
| **react-native-maps** | Cartes interactives |
| **Google Sign-In** | Authentification Google |

### UI/UX
| Technologie | Description |
|-------------|-------------|
| **@expo/vector-icons** | Icônes professionnelles (FontAwesome, Ionicons, MaterialCommunityIcons) |
| **react-native-safe-area-context** | Gestion des zones sûres |

---

## Architecture du Projet

```
Hapipet/
├── App.tsx                 # Point d'entrée de l'application
├── index.ts                # Fichier d'index principal
├── app.json                # Configuration Expo
├── app.config.json         # Configuration dynamique Expo
├── tsconfig.json           # Configuration TypeScript
├── babel.config.js         # Configuration Babel
├── .env                    # Variables d'environnement (production)
├── env.development         # Variables d'environnement (développement)
│
├── assets/                 # Ressources statiques (images, fonts)
│
└── src/                    # Code source principal
    ├── components/         # Composants réutilisables
    ├── constants/          # Constantes (thème, couleurs)
    ├── hooks/              # Hooks personnalisés
    ├── mocks/              # Données de test
    ├── navigation/         # Configuration de la navigation
    ├── screens/            # Écrans de l'application
    ├── services/           # Services API et logique métier
    ├── store/              # Configuration Redux
    ├── types/              # Définitions TypeScript
    └── utils/              # Fonctions utilitaires
```

---

## Structure Détaillée

### `/src/screens/` - Écrans

| Dossier | Écran | Description |
|---------|-------|-------------|
| `auth/` | LoginScreen, RegisterScreen | Authentification utilisateur |
| `home/` | HomeScreen | Page d'accueil avec statistiques et dog-sitters |
| `search/` | SearchScreen | Recherche de dog-sitters avec filtres |
| `dogsitter/` | DogsitterProfileScreen | Profil détaillé d'un dog-sitter |
| `booking/` | BookingScreen, BookingsScreen | Création et liste des réservations |
| `messages/` | MessagesScreen | Conversations avec les dog-sitters |
| `profile/` | ProfileScreen | Profil utilisateur |
| `payment/` | PaymentScreen | Écran de paiement Stripe |

### `/src/components/` - Composants

| Dossier | Description |
|---------|-------------|
| `ui/` | Composants UI génériques (Button, Input, Card) |
| `dogsitter/` | Composants liés aux dog-sitters (DogsitterCard) |
| `booking/` | Composants de réservation (BookingCalendar) |
| `dog/` | Composants liés aux chiens |
| `payment/` | Composants de paiement |

### `/src/services/` - Services

| Fichier | Description |
|---------|-------------|
| `supabase.ts` | Configuration client Supabase |
| `auth.ts` | Authentification (login, register, logout) |
| `booking.ts` | CRUD réservations |
| `location.ts` | Services de géolocalisation |
| `payment.ts` | Intégration Stripe |

### `/src/store/` - Redux Store

```
store/
├── index.ts           # Configuration du store
└── slices/
    ├── authSlice.ts       # État authentification (user, token)
    └── dogsitterSlice.ts  # État dog-sitters (liste, loading)
```

---

## Modèles de Données

### User
```typescript
interface User {
  id: string;
  email: string;
  fullName: string;
  type: 'client' | 'dogsitter';
  avatar?: string;
  address?: string;
  phone?: string;
}
```

### DogsitterProfile
```typescript
interface DogsitterProfile extends User {
  description: string;
  hourlyRate: number;
  dailyRate: number;
  availability: { [day: string]: string[] };
  rating: number;
  reviews: Review[];
  location: { latitude: number; longitude: number };
}
```

### Booking
```typescript
interface Booking {
  id: string;
  clientId: string;
  dogsitterId: string;
  dogId: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
}
```

### Dog
```typescript
interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  ownerId: string;
  specialNeeds?: string;
  photo?: string;
}
```

---

## Navigation

### Structure de Navigation

```
NavigationContainer
├── AuthStackNavigator (non authentifié)
│   ├── Login
│   └── Register
│
└── MainTabNavigator (authentifié)
    ├── Home (Tab)
    ├── Search (Tab)
    ├── Bookings (Tab) → BookingStackNavigator
    │   ├── BookingsList
    │   ├── DogsitterProfile
    │   ├── Booking
    │   └── Payment
    ├── Messages (Tab)
    └── Profile (Tab)
```

### Flux de Navigation

1. **Authentification** : L'utilisateur arrive sur Login/Register
2. **Accueil** : Après login, redirection vers MainTabNavigator
3. **Recherche** : L'utilisateur peut rechercher et filtrer les dog-sitters
4. **Profil Dog-sitter** : Clic sur une carte → affichage du profil complet
5. **Réservation** : Depuis le profil, l'utilisateur peut réserver
6. **Paiement** : Après confirmation, redirection vers Stripe

---

## Thème & Design System

### Couleurs (`/src/constants/theme.ts`)

```typescript
const COLORS = {
  primary: '#4CAF50',      // Vert principal
  secondary: '#2196F3',    // Bleu secondaire
  background: '#F5F5F5',   // Fond gris clair
  text: '#333333',         // Texte principal
  textLight: '#666666',    // Texte secondaire
  error: '#F44336',        // Rouge erreur
  success: '#4CAF50',      // Vert succès
  warning: '#FFC107',      // Jaune avertissement
  border: '#E0E0E0',       // Bordures
  white: '#FFFFFF',
  black: '#000000',
};
```

### Espacements

```typescript
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

### Rayons de bordure

```typescript
const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
};
```

---

## Installation & Lancement

### Prérequis

- Node.js >= 18
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) ou Android Emulator

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd Hapipet

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp env.development .env
# Éditer .env avec vos clés API
```

### Lancement

```bash
# Démarrer le serveur de développement
npx expo start

# Options de lancement
# i → iOS Simulator
# a → Android Emulator
# w → Web browser
# r → Recharger l'app
```

### Variables d'Environnement

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_PUBLISHABLE_KEY=your_stripe_key
GOOGLE_CLIENT_ID=your_google_client_id
```

---

## Conventions de Code

### Nommage

| Type | Convention | Exemple |
|------|------------|---------|
| Composants | PascalCase | `DogsitterCard.tsx` |
| Hooks | camelCase avec "use" | `useBookings.ts` |
| Services | camelCase | `bookingService` |
| Types/Interfaces | PascalCase | `DogsitterProfile` |
| Constantes | UPPER_SNAKE_CASE | `COLORS`, `SPACING` |

### Structure d'un Composant

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MyComponentProps {
  title: string;
  onPress: () => void;
}

export const MyComponent = ({ title, onPress }: MyComponentProps) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // styles
  },
});
```

### Structure d'un Service

```typescript
import { supabase } from './supabase';

export const myService = {
  async getItems() {
    const { data, error } = await supabase
      .from('items')
      .select('*');
    
    if (error) throw error;
    return data;
  },
};
```

---

## Fonctionnalités Principales

### 1. Authentification
- Login/Register avec email
- Connexion Google
- Gestion du token JWT
- Persistance de session

### 2. Recherche de Dog-sitters
- Recherche par nom
- Filtrage par tarif
- Tri par note/distance
- Géolocalisation

### 3. Profil Dog-sitter
- Photo, description, tarifs
- Disponibilités par jour
- Avis et notes
- Boutons Message/Réserver

### 4. Réservations
- Sélection de dates
- Calcul automatique du prix
- Statuts (pending, confirmed, completed, cancelled)
- Historique des réservations

### 5. Paiement
- Intégration Stripe
- Paiement sécurisé
- Gestion des remboursements

### 6. Messagerie
- Conversations en temps réel
- Liste des messages
- Indicateur de lecture

---

## Mode Développement

### Données Mock

En mode développement (`__DEV__`), l'application utilise des données mock définies dans `/src/mocks/` pour permettre le développement sans backend.

```typescript
if (__DEV__) {
  // Utiliser les données mock
  const { mockBookings } = require('../mocks/bookings');
  return mockBookings;
}
```

### Debugging

- Appuyer sur `j` dans le terminal pour ouvrir le debugger
- Utiliser React DevTools pour inspecter les composants
- Console.log visible dans le terminal Expo

---

## Déploiement

### Build iOS

```bash
npx expo build:ios
# ou avec EAS Build
eas build --platform ios
```

### Build Android

```bash
npx expo build:android
# ou avec EAS Build
eas build --platform android
```

---

## Ressources Utiles

- [Documentation Expo](https://docs.expo.dev/)
- [Documentation React Navigation](https://reactnavigation.org/)
- [Documentation Redux Toolkit](https://redux-toolkit.js.org/)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Stripe React Native](https://stripe.com/docs/stripe-js/react)

---

## Contact & Support

Pour toute question technique, contacter l'équipe de développement.

---

*Dernière mise à jour : Février 2026*
