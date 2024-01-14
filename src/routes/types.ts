import { Status } from '../enums/Status'

export type RootStackParamList = {
  Home: { status?: Status; search?: string } | undefined
  CreateTask: undefined
}
