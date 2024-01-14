import React, { ReactNode } from 'react'
import * as S from './styles'

export const Button: React.FC<{ children: ReactNode; onPress?: () => void }> = ({
  children,
  onPress,
}) => {
  return (
    <S.Button onPress={onPress}>
      <S.TextButton>{children}</S.TextButton>
    </S.Button>
  )
}
