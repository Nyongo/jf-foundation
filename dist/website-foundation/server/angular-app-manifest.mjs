
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 4011, hash: '225131a74150623687d2c7194b206320e540e9de8cc664497d95fe5eea503171', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2370, hash: '16c1b3c9dd5a0a741657895a7ff152a779e211958eca0889db7046119d44dd3e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-WPJXEIMP.css': {size: 43614, hash: '/OEeEcO7V1Y', text: () => import('./assets-chunks/styles-WPJXEIMP_css.mjs').then(m => m.default)}
  },
};
