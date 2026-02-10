/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from './src/screens/DashboardScreen';
import TargetAllocationScreen from './src/screens/TargetAllocationScreen'; // Import the new screen
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { InvestmentProvider } from './src/context/InvestmentContext'; // Import the provider

const Stack = createNativeStackNavigator(); // Initialize stack navigator

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <InvestmentProvider> {/* Wrap with InvestmentProvider */}
        <NavigationContainer> {/* Wrap the app with NavigationContainer */}
          <Stack.Navigator initialRouteName="Dashboard"> {/* Define stack navigator */}
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="TargetAllocation" component={TargetAllocationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </InvestmentProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* NavigationContainer will handle rendering the screens */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
