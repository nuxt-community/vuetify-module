import { ModuleThis } from '@nuxt/types/config/module'

export default function setupFont (this: ModuleThis) {
  this.options.head!.link!.push({
    rel: 'stylesheet',
    type: 'text/css',
    href: `https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap`
  })
}
