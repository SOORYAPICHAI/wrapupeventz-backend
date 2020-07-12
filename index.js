var express = require('express')
var app = express()

app.get('/test', function (req, res) {
  res.send('Hello Digital Ocean!')
})

app.listen(8080, function () {
  console.log('Magic is happening on port 8080!')
})