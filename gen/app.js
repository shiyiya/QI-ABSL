var crypto = require('crypto')
var fs = require('fs')
var path = require('path')
var gm = require('gm')

var dirPath = path.resolve(__dirname, '../temp')

function cpFile(filepath, newPath) {
  fs.writeFileSync(newPath, fs.readFileSync(filepath))
}

function genIMap(str) {
  fs.writeFileSync(path.resolve(__dirname, '../i.json'), str)
}

function clipI(_path, outpath) {
  gm(_path).size(function(err, size) {
    gm(_path)
      .crop(700, size.height - 120, 0, 0)
      .write(outpath, function(err) {
        if (err) console.log(err)
      })
  })
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
      var newPath = path.join(__dirname, `../i/${hex}${extname}`)
      var newcPath = path.join(__dirname, `../c/${hex}${extname}`)

      if (!json.includes(`${hex}${extname}`)) {
        json.push(`${hex}${extname}`)
      }
      cpFile(filepath, newPath)
      clipI(filepath, newcPath)

      if (len >= i + 1) {
        genIMap(JSON.stringify(json))
      }
    })
  })
})
