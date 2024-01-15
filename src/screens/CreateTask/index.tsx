import * as S from './styles'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/types'
import { Button } from '../../components/Button'
import { useTask } from '../../hooks/useTask'

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateTask'>

type CreateTaskProps = {
  navigation: HomeScreenNavigationProp
}

type Form = {
  title: string
  description: string
  attachment: string | undefined
}

export const CreateTask: React.FC<CreateTaskProps> = ({ navigation }) => {
  const { handleCreate } = useTask()
  const [form, setForm] = useState<Form>({
    title: '',
    description: '',
    attachment: '',
  })

  const handleUploadAssets = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      console.error('Permissão negada para acessar a biblioteca de mídia')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    setForm({ ...form, attachment: result?.assets?.[0].uri })
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Nova tarefa</S.Title>
      </S.Header>
      <S.Form>
        <S.ChangeImageContainer onPress={handleUploadAssets}>
          {!!form.attachment ? (
            <S.Image source={{ uri: form.attachment }} />
          ) : (
            <Feather name="upload" size={64} color="#ff2e6390" />
          )}
        </S.ChangeImageContainer>
        <S.Input
          placeholder="Nome"
          value={form.title}
          onChangeText={value => setForm({ ...form, title: value })}
        />
        <S.Input
          placeholder="Descrição"
          multiline
          value={form.description}
          onChangeText={value => setForm({ ...form, description: value })}
          style={{ height: 96 }}
        />
        <Button onPress={() => handleCreate(form)}>Criar tarefa</Button>
      </S.Form>
    </S.Container>
  )
}
