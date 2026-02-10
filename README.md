# 🐕 Hapipet

> Application mobile de mise en relation entre propriétaires de chiens et dog-sitters

[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.7-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📱 Aperçu

Hapipet est une application mobile cross-platform qui permet aux propriétaires de chiens de trouver des dog-sitters de confiance à proximité. Les utilisateurs peuvent rechercher, contacter et réserver des services de garde pour leurs compagnons à quatre pattes.

### Fonctionnalités principales

- 🔐 **Authentification** - Inscription/Connexion avec email ou Google
- 🔍 **Recherche** - Trouver des dog-sitters par localisation et filtres
- 👤 **Profils** - Consulter les profils détaillés des dog-sitters
- 📅 **Réservations** - Réserver et gérer les gardes de chiens
- 💬 **Messagerie** - Communiquer avec les dog-sitters
- 💳 **Paiements** - Paiements sécurisés via Stripe
- 📍 **Géolocalisation** - Trouver les dog-sitters à proximité

---

## 🛠️ Stack Technique

| Catégorie | Technologies |
|-----------|-------------|
| **Frontend** | React Native, Expo, TypeScript |
| **État** | Redux Toolkit, React Redux |
| **Navigation** | React Navigation |
| **Backend** | Supabase (Auth, Database, Storage) |
| **Paiements** | Stripe |
| **Maps** | React Native Maps |
| **Icônes** | @expo/vector-icons |

---

## 🚀 Installation

### Prérequis

- Node.js >= 18
- npm ou yarn
- Expo CLI
- iOS Simulator (macOS) ou Android Emulator

### Étapes d'installation

```bash
# 1. Cloner le projet
git clone https://github.com/okitoemm/Hapipet.git

# 2. Accéder au dossier
cd Hapipet

# 3. Installer les dépendances
npm install

# 4. Configurer les variables d'environnement
cp env.example .env
# Éditer .env avec vos clés API

# 5. Lancer l'application
npx expo start
```

### Options de lancement

- Appuyer sur `i` → iOS Simulator
- Appuyer sur `a` → Android Emulator
- Appuyer sur `w` → Navigateur Web
- Scanner le QR code → Expo Go sur mobile

---

## 📁 Structure du Projet

```
Hapipet/
├── App.tsx                 # Point d'entrée
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── ui/            # Composants UI génériques
│   │   ├── dogsitter/     # Composants dog-sitter
│   │   └── booking/       # Composants réservation
│   ├── screens/           # Écrans de l'application
│   │   ├── auth/          # Login, Register
│   │   ├── home/          # Accueil
│   │   ├── search/        # Recherche
│   │   ├── booking/       # Réservations
│   │   ├── messages/      # Messagerie
│   │   └── profile/       # Profil utilisateur
│   ├── navigation/        # Configuration navigation
│   ├── services/          # Services API
│   ├── store/             # Redux store & slices
│   ├── hooks/             # Hooks personnalisés
│   ├── types/             # Types TypeScript
│   ├── constants/         # Thème, couleurs
│   └── utils/             # Fonctions utilitaires
└── assets/                # Images, fonts
```

---

## 📖 Documentation

Pour une documentation technique complète, consultez [DOCUMENTATION.md](DOCUMENTATION.md).

---

## 🔧 Scripts disponibles

```bash
npm start          # Démarrer Expo
npm run ios        # Lancer sur iOS
npm run android    # Lancer sur Android
npm run web        # Lancer sur le web
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👤 Auteur

**Emmanuel OKITO**

- GitHub: [@okitoemm](https://github.com/okitoemm)

---

## 🙏 Remerciements

- [Expo](https://expo.dev/) pour le framework de développement
- [Supabase](https://supabase.com/) pour le backend
- [Stripe](https://stripe.com/) pour les paiements

---

*Développé avec ❤️ par Emmanuel OKITO*
