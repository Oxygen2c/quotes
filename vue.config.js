// var PrerenderSpaPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
// var path = require('path')

// module.exports = {
//   configureWebpack: config => {
//     if (process.env.NODE_ENV !== 'production') return

//     return {
//       plugins: [
//         new PrerenderSpaPlugin({
//           staticDir: path.join(__dirname, 'dist'),
//           routes: ['/'],
//           renderer: new Renderer({
//             headless: true,
//             renderAfterTime: 5000
//           })
//         })
//       ]
//     }
//   }
// }
