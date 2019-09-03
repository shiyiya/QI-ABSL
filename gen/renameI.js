var crypto = require('crypto')
var fs = require('fs')
var path = require('path')

var dirPath = path.resolve(__dirname, '../temp')

function cpFile(filepath, newPath) {
  fs.writeFileSync(newPath, fs.readFileSync(filepath))
}

function genIMap(str) {
  fs.writeFileSync(path.resolve(__dirname, '../i.json'), str)
}

fs.readdir(dirPath, function(err, files) {
  var jsonStr = fs.readFileSync(path.resolve(__dirname, '../i.json')).toString()
  var json

  try {
    json = JSON.parse(jsonStr)
  } catch (e) {
    console.warn(e)
  }

  var len = files.length

  files.forEach(function(filename, i) {
    var filepath = path.join(dirPath, filename)
    var fReadStream = fs.createReadStream(filepath)
    var hash = crypto.createHash('md5')

    fReadStream.on('data', hash.update.bind(hash))
    fReadStream.on('end', function() {
      var hex = hash.digest('hex')
      var extname = path.extname(filepath)
      var newPath = path.join(__dirname, `../i/${hex}.${extname}`)

      json.push(`${hex}.${extname}`)
      cpFile(filepath, newPath)

      if (len >= i + 1) {
        genIMap(JSON.stringify(json))
      }
    })
  })
})
