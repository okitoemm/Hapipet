import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { DogsitterProfile } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SearchScreen } from '../screens/search/SearchScreen';
import { DogsitterProfileScreen } from '../screens/dogsitter/DogsitterProfileScreen';
import { BookingScreen } from '../screens/booking/BookingScreen';
import { BookingsScreen } from '../screens/booking/BookingsScreen';
import { PaymentScreen } from '../screens/payment/PaymentScreen';
import { MessagesScreen } from '../screens/messages/MessagesScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type BookingStackParamList = {
  BookingsList: undefined;
  DogsitterProfile: { dogsitterId: string };
  Booking: { dogsitter: DogsitterProfile };
  Payment: { bookingId: string; amount: number };
};

type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Bookings: undefined;
  Messages: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<BookingStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const BookingStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BookingsList" component={BookingsScreen} options={{ title: 'Réservations' }} />
      <Stack.Screen name="DogsitterProfile" component={DogsitterProfileScreen} options={{ title: 'Profil du dog-sitter' }} />
      <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Nouvelle réservation' }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Paiement' }} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Bookings':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Messages':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      })}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Accueil',
          headerShown: true,
        }} 
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
          title: 'Rechercher',
          headerShown: true,
        }} 
      />
      <Tab.Screen 
        name="Bookings" 
        component={BookingStackNavigator} 
        options={{ 
          title: 'Réservations',
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={{ 
          title: 'Messages',
          headerShown: true,
        }}  
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'Profil',
          headerShown: true,
        }}  
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      {token ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};