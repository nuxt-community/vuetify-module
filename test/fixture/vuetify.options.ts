import { VuetifyPreset } from 'vuetify/types/services/presets'
import colors from 'vuetify/es5/util/colors'

const options: VuetifyPreset = {
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.red.base
      }
    }
  }
} as VuetifyPreset

export default options
