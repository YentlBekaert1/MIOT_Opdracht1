import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'

const server = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, './html/index.html'),
            compiler = webpack(config)
server.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))
server.use(webpackHotMiddleware(compiler))
server.get('/', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
  if (err) {
    return next(err)
  }
  res.set('content-type', 'text/html')
  res.send(result)
  res.end()
  })
})
server.get('/', function(req, res){
  res.send("Hello world from Express!!");
});

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
