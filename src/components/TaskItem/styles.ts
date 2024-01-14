import styled from 'styled-components/native'
import { Status } from '../../enums/Status'

type ContainerProps = {
  status: Status
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 8px;
  border-radius: 4px;
  border-left-width: 4px;
  border-left-color: ${({ theme: { colors }, status }) => colors.status[status]};
`

export const Image = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`

export const Content = styled.View`
  flex: 1;
  height: 100%;
  margin-left: 8px;
`

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`

export const Description = styled.Text`
  font-size: 12px;
  color: #ccc;
`
