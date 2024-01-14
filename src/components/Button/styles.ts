import styled from "styled-components/native"


export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
`

export const TextButton = styled.Text`
  color: #fff;
  font-weight: bold;
`
