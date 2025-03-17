
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 4011, hash: '5ad5b8e0d6395f0ea4237860889d1f1e4eb2ba742ce0cfe242c3a2eb142cdbd0', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2370, hash: '1d31e6c40ffcca6531cee8ae6bef4656fac396cbd284ff24fa681ef477de8094', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-BJFNUZUY.css': {size: 47194, hash: '8trxDPvPb/Q', text: () => import('./assets-chunks/styles-BJFNUZUY_css.mjs').then(m => m.default)}
  },
};
