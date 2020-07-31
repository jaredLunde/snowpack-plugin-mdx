import path from 'path'
import {promises as fs} from 'fs'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const snowpackPluginMdx = require('./index.ts')

describe('snowpack-plugin-mdx', () => {
  it('should compile .md files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-world.md')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdx(
      {},
      {babelOptions: {babelrc: false, presets: ['@babel/env', '@babel/react']}}
    )
    const result = await plugin.load({contents, filePath})
    expect(result['.js']).toMatchSnapshot('.js')
  })

  it('should compile .mdx files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-world.mdx')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdx(
      {},
      {babelOptions: {babelrc: false, presets: ['@babel/env', '@babel/react']}}
    )
    const result = await plugin.load({contents, filePath})
    expect(result['.js']).toMatchSnapshot('.js')
  })

  it('should exclude files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-world.md')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdx(
      {},
      {
        exclude: ['**/*.md'],
        babelOptions: {babelrc: false, presets: ['@babel/env', '@babel/react']},
      }
    )
    const result = await plugin.load({contents, filePath})
    expect(result).toBeNull()
  })

  it('should include files', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-world.mdx')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdx(
      {},
      {
        include: ['**/*.mdx'],
        babelOptions: {babelrc: false, presets: ['@babel/env', '@babel/react']},
      }
    )
    const result = await plugin.load({contents, filePath})
    expect(result).not.toBeNull()
  })

  it('should ignore files not explicitly included', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-world.md')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdx(
      {},
      {
        include: ['**/*.mdx'],
        babelOptions: {babelrc: false, presets: ['@babel/env', '@babel/react']},
      }
    )
    const result = await plugin.load({contents, filePath})
    expect(result).toBeNull()
  })

  it('should implement custom renderer', async () => {
    const filePath = path.join(__dirname, '__fixtures__/hello-world.md')
    const contents = await fs.readFile(filePath, 'utf-8')
    const plugin = snowpackPluginMdx(
      {},
      {
        renderer: `
          import {h} from 'preact'
          import { mdx } from '@mdx-js/preact'
        `,
        babelOptions: {
          babelrc: false,
          presets: ['@babel/env', '@babel/react'],
        },
      }
    )
    const result = await plugin.load({contents, filePath})
    expect(result['.js']).toMatchSnapshot('preact')
  })
})
