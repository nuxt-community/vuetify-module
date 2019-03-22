const { Nuxt, Builder } = require('nuxt-edge')

describe('module', () => {
  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt(require('./fixture/nuxt.config'))
    await nuxt.ready()
    await new Builder(nuxt).build()
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const { html } = await nuxt.renderRoute('/')
    expect(html).toContain('v-navigation-drawer--fixed')
  })
})
