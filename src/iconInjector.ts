import { ModuleThis } from '@nuxt/types/config/module'
import { getIconInjector } from 'vuetify-icon-injector'

export interface iconInjectorOptions {
  customIcons?: { [iconName: string]: string };
  customIconMap?: { [componentName: string]: string[] };
}

export default function setupIconInjection (
  this: ModuleThis,
  options: iconInjectorOptions
) {
  const compilerModule = getIconInjector(
    options.customIcons || {},
    options.customIconMap || {}
  )

  if (!this.options.build) {
    this.options.build = {
      loaders: { vue: { compilerOptions: { modules: [compilerModule] } } }
    }
  } else if (!this.options.build.loaders) {
    this.options.build.loaders = {
      vue: { compilerOptions: { modules: [compilerModule] } }
    }
  } else if (!this.options.build.loaders.vue) {
    this.options.build.loaders.vue = {
      compilerOptions: { modules: [compilerModule] }
    }
  } else if (!this.options.build.loaders.vue.compilerOptions) {
    this.options.build.loaders.vue.compilerOptions = {
      modules: [compilerModule]
    }
  } else if (!this.options.build.loaders.vue.compilerOptions.modules) {
    this.options.build.loaders.vue.compilerOptions.modules = [compilerModule]
  } else {
    this.options.build.loaders.vue.compilerOptions.modules.push(compilerModule)
  }
}
