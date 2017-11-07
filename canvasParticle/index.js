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
    const output = ctx.createImageData(ws, hs)
    const outputData = output.data
    // 灰化按钮绑定
    const particleBtn = document.getElementById('particle')
    particleBtn.addEventListener('click', function() {
      particle(originColorData, outputData, ws, hs)
      ctx.putImageData(output, 0, 0)
    })
  }
}

// 粒子化
function particle(originColorData, outputData, ws, hs) {
  let index;
  let r, g, b;
  // 按行扫描
  for (let y = 1; y <= hs; y++) {
    // 按列扫描
    for (let x = 1; x <= ws; x++) {
      // rgb处理
      index = ((y - 1) * ws + (x - 1)) * 4
      outputData[index] = originColorData[index]
      outputData[index + 1] = originColorData[index + 1]
      outputData[index + 2] = originColorData[index + 2]
      // alpha
      outputData[index + 3] = 255;
    }
  }
}