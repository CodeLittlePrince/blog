draw()

function draw() {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const img = document.getElementById('img')
  img.onload = function() {
    const style = window.getComputedStyle(img)
    const w = style.width
    const h = style.height
    const ws = w.replace(/px/, '')
    const hs = h.replace(/px/, '')
    canvas.width = ws
    canvas.height = hs
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    // 替换颜色
    const originColor = ctx.getImageData(0, 0, ws, hs)
    const originColorData = originColor.data
    ctx.clearRect(0, 0, ws, hs)
    // 灰化按钮绑定
    const particleBtn = document.getElementById('particleBtn')
    // particleBtn.addEventListener('click', function() {
      const points = calculatePoints(originColorData, ws, hs)
      drawParticle(points, ctx)
    // })
  }
}

function calculatePoints(originColorData, ws, hs) {
  let points = []
  let point = {}
  let rgba = {}
  for (let y = 1; y <= hs; y++) {
    // 按列扫描
    for (let x = 1; x <= ws; x++) {
      index = ((y - 1) * ws + (x - 1)) * 4
      // rgb处理
      rgba.r = originColorData[index]
      rgba.g = originColorData[index + 1]
      rgba.b = originColorData[index + 2]
      rgba.a = originColorData[index + 3]
      point = {
        x: x - 1,
        y: y - 1,
        rgba: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
      }
      points.push(point)
    }
  }
  return points
}

// particle
function drawParticle(points, ctx) {
  points.forEach(function(item, index) {
    ctx.fillStyle = item.rgba
    let x = item.x + Math.random(0, 1)
    let y = item.y + Math.random(0, 1)
    ctx.fillRect(x, y, 1, 1)
  }, this);
}

// t当前经过了的时间
// b起始值
// c总的位移
// d持续时间
function easeInExpo (t, b, c, d) {
  return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
}