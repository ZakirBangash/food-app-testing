# Food App

A modern food discovery and recommendation application built with React Native and Expo. This app helps users discover restaurants and cuisines based on their preferences.

## Features

- 🔐 Authentication system with login and registration
- 🎯 Personalized onboarding flow
- 🍽️ Cuisine preference selection
- 🏷️ Restaurant recommendations based on preferences
- 📱 Cross-platform (iOS & Android) support
- 🎨 Modern and intuitive UI design
- 🔗 Deep linking support for external navigation
- �� Push notifications with deep linking

## Tech Stack

- [React Native](https://reactnative.dev/) - Mobile app framework
- [Expo](https://expo.dev/) - Development platform
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Supabase](https://supabase.com/) - Backend and authentication
- [React Navigation](https://reactnavigation.org/) - Navigation library
- [Expo Linking](https://docs.expo.dev/versions/latest/sdk/linking/) - Deep linking support
- [Expo Dev Client](https://docs.expo.dev/develop/development-builds/introduction/) - Development builds
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) - Push notifications

## Documentation

- [Push Notifications Guide](src/features/notifications/docs/notification-payload-guide.md) - Guide for sending notifications
- [Deep Linking Guide](docs/deep-linking.md) - Guide for deep linking implementation

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd food-app-testing
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create development builds:
```bash
# For iOS
npx expo prebuild -p ios
# For Android
npx expo prebuild -p android
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Run on your preferred platform:
```bash
# For iOS
npm run ios
# or
yarn ios

# For Android
npm run android
# or
yarn android
```

## Deep Linking Testing

The app supports deep linking with the scheme `foodapptesting://`. You can test deep linking in several ways:

### 1. Using Terminal (iOS Simulator)

```bash
# Using uri-scheme
npx uri-scheme open "foodapptesting://(onboarding)/preferences" --ios

# Or using xcrun
xcrun simctl openurl booted "foodapptesting://(onboarding)/preferences"
```

### 2. Using Terminal (Android Emulator)

```bash
# Using uri-scheme
npx uri-scheme open "foodapptesting://(onboarding)/preferences" --android

# Or using adb
adb shell am start -W -a android.intent.action.VIEW -d "foodapptesting://(onboarding)/preferences" com.anonymous.foodapptesting
```

### 3. Using Web Browser

Open this URL in your device's browser:
```
foodapptesting://(onboarding)/preferences
```

### Available Deep Links

- `foodapptesting://(onboarding)/preferences` - Opens preferences screen
- `foodapptesting://(auth)/login` - Opens login screen
- `foodapptesting://(onboarding)/welcome` - Opens welcome screen

Note: The paths include the group names (in parentheses) as they are part of the file-based routing structure in Expo Router.

### Testing Deep Link Behavior

1. **App Closed**: Deep link should open the app and navigate to the specified screen
2. **App in Background**: Deep link should bring the app to foreground and navigate
3. **App Open**: Deep link should navigate to the specified screen without creating duplicate screens

### Debugging Deep Links

To debug deep linking:
1. Check the console logs for deep link events
2. Use the Expo development client for better debugging
3. Monitor the navigation state changes

## Project Structure

```
src/
├── app/                    # Main application screens
│   ├── (auth)/            # Authentication screens
│   ├── (onboarding)/      # Onboarding flow screens
│   ├── (tabs)/            # Main app tabs
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable components
├── features/             # Feature modules
│   └── notifications/    # Push notifications
│       ├── docs/        # Documentation
│       ├── hooks/       # Custom hooks
│       ├── services/    # Business logic
│       ├── store/       # State management
│       ├── types/       # TypeScript types
│       └── utils/       # Utility functions
├── store/                # Global state management
├── constants/            # App constants
└── assets/              # Images, fonts, etc.
```

## Navigation Flow

1. **Authentication**
   - Users start at the login screen
   - Can switch between login and registration
   - Protected routes for authenticated users

2. **Onboarding**
   - Welcome screen introduction
   - Cuisine preference selection
   - Smooth transition to main app

3. **Main App**
   - Tab-based navigation
   - Restaurant recommendations
   - User profile and settings

## Development

### Key Features Implementation

- **Authentication**: Uses Supabase for secure user authentication
- **Navigation**: Implements protected routes and gesture handling
- **State Management**: Uses Zustand for global state management
- **UI/UX**: Modern design with smooth animations and transitions
- **Deep Linking**: Handles external navigation with proper state management

### Best Practices

- File-based routing with Expo Router
- Type safety with TypeScript
- Component-based architecture
- Proper navigation flow management
- Gesture handling for better UX
- Deep link handling with proper state checks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Expo team for the amazing development platform
- React Native community for the extensive documentation
- All contributors who have helped shape this project

## Push Notifications

### Structure

All notifications should follow this basic structure:

```json
{
  "title": "Notification Title",
  "body": "Notification message",
  "data": {
    "routeKey": "ROUTE.KEY",
    "params": {
      "id": "optional-parameter"
    }
  }
}
```

### Available Routes

#### Promotions
```json
{
  "title": "Summer Sale!",
  "body": "Get 50% off on all items",
  "data": {
    "routeKey": "PROMOTIONS.LIST"
  }
}

// For specific promotion
{
  "title": "Flash Sale!",
  "body": "Limited time offer on selected items",
  "data": {
    "routeKey": "PROMOTIONS.DETAILS",
    "params": {
      "id": "flash-sale-123"
    }
  }
}
```

#### Orders
```json
{
  "title": "Order Update",
  "body": "Your order #123 is ready for pickup",
  "data": {
    "routeKey": "ORDERS.DETAILS",
    "params": {
      "id": "order-123"
    }
  }
}
```

#### Settings
```json
{
  "title": "App Update",
  "body": "New features available!",
  "data": {
    "routeKey": "SETTINGS.MAIN"
  }
}
```

### Best Practices

1. **Keep Titles Short**
   - Maximum 40 characters
   - Clear and actionable

2. **Body Text**
   - Maximum 120 characters
   - Include key information
   - Use action words

3. **Route Keys**
   - Always use predefined route keys
   - Don't use direct screen paths
   - Include required parameters

4. **Parameters**
   - Only include necessary data
   - Use consistent ID formats
   - Keep parameter names simple

### Examples by Use Case

#### Promotional Messages
```json
{
  "title": "Weekend Special",
  "body": "Free delivery on orders above $30",
  "data": {
    "routeKey": "PROMOTIONS.DETAILS",
    "params": {
      "id": "weekend-special"
    }
  }
}
```

#### Order Updates
```json
{
  "title": "Order Status",
  "body": "Your order is out for delivery",
  "data": {
    "routeKey": "ORDERS.DETAILS",
    "params": {
      "id": "order-456"
    }
  }
}
```

#### System Notifications
```json
{
  "title": "App Maintenance",
  "body": "Scheduled maintenance in 2 hours",
  "data": {
    "routeKey": "TABS.HOME"
  }
}
```

### Testing

Before sending to production:
1. Test on development environment
2. Verify navigation works correctly
3. Check parameter handling
4. Ensure proper error handling

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on iOS/Android:
   ```bash
   npm run ios
   # or
   npm run android
   ```

## Support

For any questions or issues:
1. Check this documentation
2. Contact the mobile team
3. Use the development environment for testing 