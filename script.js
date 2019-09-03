import map from './i.json'

document.querySelectorAll('img').forEach(img => {
  var k = parseInt(Math.random() * (map.length + 1), 10)
  img.src = 'https://raw.githubusercontent.com/shiyiya/QI-ABSL/master/i/' + map[k]
})
