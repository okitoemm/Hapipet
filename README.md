# 🐕 Hapipet

> Application mobile de mise en relation entre propriétaires de chiens et dog-sitters

[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.7-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📱 Aperçu

Hapipet est une application mobile cross-platform qui permet aux propriétaires de chiens de trouver des dog-sitters de confiance à proximité. Les utilisateurs peuvent rechercher, contacter et réserver des services de garde pour leurs compagnons à quatre pattes.

<img width="290" height="878" alt="647A9F5C-9777-4D4F-8DE8-23A922910B12" src="https://github.com/user-attachments/assets/f94187ea-26b9-43a9-99c4-339c1f6c597c" />




<img width="590" height="1278" alt="A8D29B43-6BF1-4DE7-A1C9-9416FA5F54E7" src="https://github.com/user-attachments/assets/a07d2275-99e6-4fa2-9474-1e75de254997" /> , <img width="590" height="1278" alt="D8011ADE-024C-48AB-85F6-335C0F33858F" src="https://github.com/user-attachments/assets/d64b7545-d938-4d3f-94aa-5c9d8c049005" />



<img width="590" height="1278" alt="5800659B-023D-4F32-A481-7238FB998D9B" src="https://github.com/user-attachments/assets/30fcfd76-566f-49ad-a3fb-d51616d96d1a" /> , <img width="590" height="1278" alt="4501F918-EB9A-4465-8CC7-7815FC78C3B4" src="https://github.com/user-attachments/assets/4daf32cc-721c-4ce2-8cb7-d3acd42b92e9" />


<img width="590" height="1278" alt="4501F918-EB9A-4465-8CC7-7815FC78C3B4" src="https://github.com/user-attachments/assets/19d6ab71-be80-4596-b3f0-9a62ba686438" />, <img width="590" height="1278" alt="B76D8EBC-8B44-406E-A2AF-F95585838641" src="https://github.com/user-attachments/assets/5b5620a1-eee0-43da-b14f-c7da087cc0e7" />


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
