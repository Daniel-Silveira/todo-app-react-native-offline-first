import React from 'react'
import * as S from './styles'
import { Alert } from 'react-native'
import { Status } from '../../enums/Status'

interface TaskItemProps {
  id: string
  title: string
  description: string
  status: Status
  attachment: string
  onFinish: () => void
}

export const TaskItem: React.FC<TaskItemProps> = props => {
  const handleOpenAlert = () => {
    Alert.alert(props.title, props.description, [
      {
        text: 'Concluir tarefa',
        onPress: props.onFinish,
      },
      {
        text: 'Voltar',
      },
    ])
  }

  return (
    <S.Container
      onPress={handleOpenAlert}
      disabled={props.status === Status.COMPLETED}
      status={props.status}
    >
      <S.Image source={{ uri: props.attachment }} />
      <S.Content>
        <S.Title>{props.title}</S.Title>
        <S.Description>{props.description}</S.Description>
      </S.Content>
    </S.Container>
  )
}
