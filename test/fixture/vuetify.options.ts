import { VuetifyPreset } from 'vuetify/types/presets'
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
}

export default options
