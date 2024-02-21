import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigation from './screen/Navigation';

const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
  useEffect(() => {

    setTimeout(() => {
      navigation.replace('Main'); 
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('./src_Splash/logo.jpg')} style={styles.logo} />
      <Text style={styles.text}>Pagina Principal</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={Navigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default App;
