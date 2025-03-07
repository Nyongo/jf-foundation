
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 3975, hash: '36eaa60d451ab12cadcb770c1264bc8de304503ec39f0710141698d59dcb6d03', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2343, hash: '599bb20cf9b31080f066b9a68e9ff4a87cff8926145a603d1dfedda81b77e5e5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles.css': {size: 43614, hash: '/OEeEcO7V1Y', text: () => import('./assets-chunks/styles_css.mjs').then(m => m.default)}
  },
};
