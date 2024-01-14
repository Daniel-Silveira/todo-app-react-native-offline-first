import styled, { css } from 'styled-components/native'

type ContainerProps = {
  distanceSafeToTop?: number
}

type TabProps = {
  isActive?: boolean
  type?: any
}

export const Container = styled.View<ContainerProps>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 0 0 8px 8px;

  ${props =>
    props.distanceSafeToTop &&
    css`
      padding-top: ${props.distanceSafeToTop + 8}px;
    `};
`

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`

export const Content = styled.View`
  padding: 0 16px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const SearchContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  padding-left: 8px;
  margin: 0 16px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
`

export const Search = styled.TextInput.attrs({
  placeholderTextColor: '#fff',
})`
  color: #fff;
  padding: 16px 8px;
  flex: 1 0;
`

export const AddButton = styled.TouchableOpacity`
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 80px;
`

export const TabsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`

export const Tab = styled.TouchableOpacity<TabProps>`
  flex: 1;
  padding: 16px;
  align-items: center;

  ${props =>
    props.isActive &&
    css`
      border-bottom-width: 3px;
      border-color: ${({ theme: { colors } }) => colors.status[props.type] || colors.primary};
    `};
`

export const TextTab = styled.Text<TabProps>`
  color: #fff;
  ${props =>
    props.isActive &&
    css`
      font-weight: bold;
      color: ${({ theme: { colors } }) => colors.status[props.type] || colors.primary};
    `};
`
