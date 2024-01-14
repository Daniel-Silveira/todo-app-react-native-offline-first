import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../screens/Home'
import { CreateTask } from '../screens/CreateTask'
import { Header } from '../components/Header'
import { RootStackParamList } from './types'
import { theme } from '../styles/Theme'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          contentStyle: { backgroundColor: theme.colors.backgroundSecondary },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({
            header: () => <Header params={route.params} />,
          })}
        />
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
            headerShown: false,
          }}
        >
          <Stack.Screen name="CreateTask" component={CreateTask} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
