const { Nuxt, Builder } = require('nuxt-edge')
const request = require('request-promise-native')

const config = require('../example/nuxt.config')

const url = path => `http://localhost:3000${path}`
const get = path => request(url(path))

describe('basic', () => {
  let nuxt

  test('build', async () => {
    config.dev = false
    nuxt = new Nuxt(config)
    await nuxt.ready()

    await new Builder(nuxt).build()

    await nuxt.listen(3000)
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    const html = await get('/')
    expect(html).toContain('v-navigation-drawer--fixed')
  })
})
