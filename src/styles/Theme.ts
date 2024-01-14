import { Status } from '../enums/Status'

const themeColors = {
  primary: '#ff2e63',
  background: '#252a34',
  backgroundSecondary: '#393e46',
  status: {
    [Status.PENDING]: '#F9ED69',
    [Status.COMPLETED]: '#33d9b2',
  },
}

export const theme = {
  colors: {
    ...themeColors,
  },
}
