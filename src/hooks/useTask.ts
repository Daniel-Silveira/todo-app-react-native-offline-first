import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useContext } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Alert } from 'react-native'
import { TasksContext } from '../context/TasksContext'
import { RootStackParamList } from '../routes/types'
import { Status } from '../enums/Status'

export const useTask = () => {
  const { goBack } = useNavigation()
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>()
  const status = route.params?.status
  const { tasks, setTasks } = useContext(TasksContext)

  const filteredTasks = tasks.filter(task => {
    const search = route.params?.search
    if (!status) {
      if (!search) return task

      return [task.title, task.description].some(prop =>
        prop.toLowerCase().includes(search.toLowerCase())
      )
    }

    return task.status === status
  })

  const handleUpdateStatus = async (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: Status.COMPLETED } : task
    )

    setTasks(updatedTasks)
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  const handleCreate = async (form: { title: string; description: string }) => {
    try {
      if (!form.title && !form.description) return Alert.alert('Preencha todos os campos')

      const tasksData = await AsyncStorage.getItem('tasks')
      const existingTasks = tasksData ? JSON.parse(tasksData) : []

      const newTask = { ...form, id: uuid.v4(), sync: false, status: Status.PENDING }
      const updatedTasks = [newTask, ...existingTasks]

      setTasks(updatedTasks)

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))

      goBack()
    } catch (error) {
      console.error('error:', error)
    }
  }

  return { filteredTasks, activeStatus: status, handleCreate, handleUpdateStatus }
}
