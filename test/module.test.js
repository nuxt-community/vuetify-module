jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')

const config = require('./fixture/nuxt.config')
config.dev = false

describe('module', () => {
  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await nuxt.ready()
    await new Builder(nuxt).build()
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const { html } = await nuxt.renderRoute('/')
    expect(html).toContain('v-navigation-drawer--fixed')
  })
})

describe('disable all default assets', () => {
  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt({
      ...config,
      vuetify: {
        defaultAssets: false
      }
    })
    await nuxt.ready()
    await new Builder(nuxt).build()
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const { html } = await nuxt.renderRoute('/')
    expect(html).not.toContain('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;display=swap')
    expect(html).not.toContain('https://cdn.materialdesignicons.com/3.8.95/css/materialdesignicons.min.css')
  })
})

describe('set wrong value to defaultAssets.icons', () => {
  let consoleWarnSpy
  let nuxt

  beforeAll(async () => {
    consoleWarnSpy = jest.spyOn(console, 'warn')
    nuxt = new Nuxt({
      ...config,
      vuetify: {
        defaultAssets: {
          icons: 'wrong'
        }
      }
    })
    await nuxt.ready()
    await new Builder(nuxt).build()
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('should have warned user', () => {
    expect(consoleWarnSpy).toHaveBeenCalledWith("[@nuxtjs/vuetify] Value `'wrong'` for `defaultAssets.icons` option is not supported (Supported values : `'mdi'`, `'md'`, `'fa'`, `'fa4'`, `false`)")
  })
})

describe.skip('enable treeShake', () => {
  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt({
      ...config,
      vuetify: {
        treeShake: true
      }
    })
    await nuxt.ready()
    await new Builder(nuxt).build()
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const { html } = await nuxt.renderRoute('/')
    expect(html).toContain('v-navigation-drawer--fixed')
  })
})
