import React from 'react'
import { ThemeProvider } from 'styled-components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Routes } from './src/routes/root'
import { TasksProvider } from './src/context/TasksContext'
import { theme } from './src/styles/Theme'
import { OfflineStorageProvider } from './src/storage/OfflineStorageProvider'
import { ContainerApp } from './src/styles/Globals'

function App() {
  return (
    <ContainerApp>
      <TasksProvider>
        <ThemeProvider theme={theme}>
          <OfflineStorageProvider>
            <SafeAreaProvider>
              <Routes />
            </SafeAreaProvider>
          </OfflineStorageProvider>
        </ThemeProvider>
      </TasksProvider>
    </ContainerApp>
  )
}
export default App
