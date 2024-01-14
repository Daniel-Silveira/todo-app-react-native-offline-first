import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { TasksContext } from '../context/TasksContext'
import { simulateApiCall } from './Api'
import NetInfo from '@react-native-community/netinfo'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const OfflineStorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isConnected } = NetInfo.useNetInfo()
  const { tasks, setTasks } = useContext(TasksContext)
  const [storageTasks, setStorageTasks] = useState([])

  const getTasksStorage = async () => {
    try {
      const response = await AsyncStorage.getItem('tasks')

      if (response) {
        const offlineTasks = JSON.parse(response)
        setStorageTasks(offlineTasks)

        if (!tasks.length) {
          setTasks(offlineTasks)
        }
      }
    } catch (error) {
      console.log('Error fetching tasks from storage:', error)
    }
  }
  useEffect(() => {
    getTasksStorage()
  }, [])

  const handleTasksUpdateWithApi = async () => {
    // Para simular que a API salvou os dados, só deixar o `isSuccessApi` como `true`
    const isSuccessApi = false

    try {
      const { status } = await simulateApiCall(isSuccessApi, storageTasks)

      if (status === 200) {
        await AsyncStorage.removeItem('tasks')
      }
    } catch (error) {
      console.log('Error updating tasks with API:', error)
    }
  }

  if (isConnected && !!storageTasks?.length) {
    handleTasksUpdateWithApi()
  }

  return children
}
