const modules = import.meta.glob('./decisions/**/*.json', { eager: true, import: 'default' })

const tree: Record<string, unknown> = {}
for (const mod of Object.values(modules)) {
  Object.assign(tree, mod as Record<string, unknown>)
}

export default tree
