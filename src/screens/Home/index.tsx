import * as S from './styles'
import React from 'react'
import { FlatList } from 'react-native'
import { TaskItem } from '../../components/TaskItem'
import { Status } from '../../enums/Status'
import { Button } from '../../components/Button'
import { RootStackParamList } from '../../routes/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTask } from '../../hooks/useTask'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { filteredTasks, activeStatus, handleUpdateStatus } = useTask()

  return (
    <S.Container>
      <FlatList
        style={{ flex: 1 }}
        data={filteredTasks}
        keyExtractor={item => item.id}
        contentContainerStyle={{ gap: 12, paddingTop: 16 }}
        ListEmptyComponent={() => (
          <EmptyList status={activeStatus} onPress={() => navigation.navigate('CreateTask')} />
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
