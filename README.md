# 📱 HabitBuddy

**HabitBuddy** is a modern and intuitive habit-tracking app built using **React Native**. It helps users build better routines by tracking daily habits, monitoring progress, and personalizing their profiles for a more tailored experience.

---

## ✨ Key Features

- ✅ **Create, edit, and delete habits**
- 📅 **Track daily progress** with visual indicators
- 👤 **Profile management** (Edit profile, view profile)
- 📈 **Progress visualization**
- 🔄 **Persistent login and user authentication**
- 🧠 **Global state management** using Zustand
- 💾 **Local storage** with AsyncStorage
- 🎨 **Theme switching between light and dark**

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Android Studio / Xcode for emulator or physical device for testing

### Installation

1. Clone the repository:

```bash
git clone https://github.com/isharadh2002/HabitBuddy.git
cd HabitBuddy
```

2. Install dependencies:

```bash
npm install
```

3. Start Metro bundler:

```bash
npm start
```

4. Run on Android:

```bash
npm run android
```

Or run on iOS (Mac only):

```bash
npm run ios
```

---

## 📂 Folder Structure

```
HabitBuddy/
├── android/                    # Android native project
├── ios/                        # iOS native project
├── src/
│   ├── components/             # Custom UI components
│   │   └── CustomBottomTabBar.tsx
│   ├── navigation/             # App navigation (tabs & stack)
│   │   ├── AppNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   └── types.ts
│   ├── screens/                # All screen views
│   │   ├── AddHabitScreen.tsx
│   │   ├── EditHabitScreen.tsx
│   │   ├── EditProfileScreen.tsx
│   │   ├── HabitsScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── ProgressScreen.tsx
│   │   └── RegisterScreen.tsx
│   ├── store/                  # Zustand store files
│   │   ├── authStore.ts
│   │   └── habitStore.ts
│   ├── theme/                  # Theme context and color schemes
│   │   ├── colorScheme.ts
│   │   └── ThemeContext.tsx
├   ├── App.tsx                     # App entry point
├── app.json                    # App configuration
├── babel.config.js             # Babel settings
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── ...
```

---

## 🛠️ Built With

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🧩 Future Enhancements

- 🔔 Push notifications for daily reminders
- 🔥 Habit streak tracking system
- ☁️ Cloud sync and backup support
- 📆 Calendar view for completed habits

---

## 🤝 Contributing

All contributions are welcome! If you'd like to improve HabitBuddy, please fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- The React Native open-source community
- Zustand, AsyncStorage, and other awesome contributors
