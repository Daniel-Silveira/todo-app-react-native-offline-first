import * as S from './styles'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes/types'
import { Status } from '../../enums/Status'
import { debounce } from '../../utils/Debounce'

type HeaderProps = {
  params?: {
    status?: Status
  }
}

type Tab = {
  id: number
  title: string
  value?: Status
}

const tabs: Tab[] = [
  { id: 1, title: 'Pendentes', value: Status.PENDING },
  { id: 2, title: 'Todas' },
  { id: 3, title: 'Concluídas', value: Status.COMPLETED },
]

export const Header: React.FC<HeaderProps> = ({ params }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { top } = useSafeAreaInsets()
  const [search, setSearch] = useState('')

  const handleChangeTab = (status?: Status) => {
    navigate('Home', { status })
  }

  const handleNavigateToNewTask = () => {
    navigate('CreateTask')
  }

  const handleUpdateSearchValue = () => {
    navigate('Home', { search })
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    debounce(handleUpdateSearchValue, 1000)()
  }

  return (
    <S.Container distanceSafeToTop={top}>
      <S.Content>
        <S.Title>ToDo App Pantore</S.Title>
        <S.AddButton onPress={handleNavigateToNewTask}>
          <Feather name="plus" size={20} color="#fff" />
        </S.AddButton>
      </S.Content>
      <S.SearchContainer>
        <Feather name="search" size={20} color="#fff" />
        <S.Search
          placeholder="Pesquise suas tarefas por nome"
          value={search}
          onChangeText={handleSearch}
        />
      </S.SearchContainer>
      <S.TabsContainer>
        {tabs.map(data => (
          <S.Tab
            key={data.id}
            isActive={data.value === params?.status}
            type={data.value}
            onPress={() => handleChangeTab(data.value)}
          >
            <S.TextTab isActive={data.value === params?.status} type={data.value}>
              {data.title}
            </S.TextTab>
          </S.Tab>
        ))}
      </S.TabsContainer>
    </S.Container>
  )
}
