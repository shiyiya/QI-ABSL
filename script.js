import map from './i.json'

map.forEach(() => {
  var imgEl = document.createElement('img')
  var k = parseInt(Math.random() * map.length, 10)
  console.log(k < map.length && k > -1)
  imgEl.src =
    'https://raw.githubusercontent.com/shiyiya/QI-ABSL/master/i/' + map[k]
  document.body.append(imgEl)
})


map.forEach(() => {
  var imgEl = document.createElement('img')
  var k = parseInt(Math.random() * map.length, 10)
  console.log(k < map.length && k > -1)
  imgEl.src =
    'https://raw.githubusercontent.com/shiyiya/QI-ABSL/master/c/' + map[k]
  document.body.append(imgEl)
})
