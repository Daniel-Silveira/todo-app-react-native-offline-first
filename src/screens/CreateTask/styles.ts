import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  flex: 1;
`

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.primary}50;
`

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #ccc;
`

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#fff',
})`
  background-color: ${({ theme }) => theme.colors.background};
  color: #fff;
  padding: 16px;
  border-radius: 8px;
`

export const Form = styled.View`
  margin-top: 16px;
  padding: 0 16px;
  gap: 16px;
`

export const ChangeImageContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: 200px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`
