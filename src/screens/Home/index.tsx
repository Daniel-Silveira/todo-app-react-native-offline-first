import * as S from './styles'
import React, { useContext } from 'react'
import { FlatList } from 'react-native'
import { TaskItem } from '../../components/TaskItem'
import { TasksContext } from '../../context/TasksContext'
import { Status } from '../../enums/Status'
import { Button } from '../../components/Button'
import { RootStackParamList } from '../../routes/types'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>
  route: RouteProp<RootStackParamList, 'Home'>
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
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

  const handleUpdateStatus = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: Status.COMPLETED } : task
    )

    setTasks(updatedTasks)
  }

  return (
    <S.Container>
      <FlatList
        style={{ flex: 1 }}
        data={filteredTasks}
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: 12, paddingTop: 16 }}
        ListEmptyComponent={() => (
          <EmptyList status={status} onPress={() => navigation.navigate('CreateTask')} />
        )}
        renderItem={({ item }) => (
          <TaskItem {...item} onFinish={() => handleUpdateStatus(item.id)} />
        )}
      />
    </S.Container>
  )
}

const EmptyList = ({ status, onPress }: { status?: Status; onPress: () => void }) => {
  const defaultMessage = 'Você ainda não possui nenhuma tarefa cadastrada'
  const statusToMessage = {
    [Status.PENDING]: 'Você não possui nenhuma tarefa pendente',
    [Status.COMPLETED]: 'Você ainda não concluiu nenhuma tarefa',
  }

  return (
    <S.EmptyList>
      <S.EmptyListTitle>{!!status ? statusToMessage[status] : defaultMessage}</S.EmptyListTitle>
      {!status && <Button onPress={onPress}>Adicionar nova tarefa</Button>}
    </S.EmptyList>
  )
}
