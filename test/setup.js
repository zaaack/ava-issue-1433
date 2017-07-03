const { JSDOM, VirtualConsole } = require('jsdom')
const { URL } = require('url')

if (typeof document === 'undefined') {
  const virtualConsole = new VirtualConsole()
  virtualConsole.sendTo(console)
  require('browser-env')({
    url: 'http://example.com/',
    referrer: 'http://example.com/',
    contentType: 'text/html',
    // userAgent: 'Mellblomenator/9000',
    includeNodeLocations: true,
    // virtualConsole,
  })
  // document.documentElement = document.createElement('html')
  // document.documentElement.innerHTML = '<head></head><body></body>'
  global.URL = URL
  global.__DEV__ = true
}

process.env.NODE_ENV = 'test'
