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

    // 复古按钮绑定
    const retroBtn = document.getElementById('retro')
    retroBtn.addEventListener('click', function() {
      retro(originColorData, outputData, ws, hs)
      ctx.putImageData(output, 0, 0)
    })

    // 诡异按钮绑定
    const weirdBtn = document.getElementById('weird')
    weirdBtn.addEventListener('click', function() {
      weird(originColorData, outputData, ws, hs)
      ctx.putImageData(output, 0, 0)
    })

    // x光按钮绑定
    const photographicPlateBtn = document.getElementById('photographicPlate')
    photographicPlateBtn.addEventListener('click', function() {
      photographicPlate(originColorData, outputData, ws, hs)
      ctx.putImageData(output, 0, 0)
    })

    // 灰化按钮绑定
    const ashingBtn = document.getElementById('ashing')
    ashingBtn.addEventListener('click', function() {
      ashing(originColorData, outputData, ws, hs)
      ctx.putImageData(output, 0, 0)
    })

    // 老纪录片
    const documentaryBtn = document.getElementById('documentary')
    documentaryBtn.addEventListener('click', function() {
      documentary(originColorData, outputData, ws, hs)
      ctx.putImageData(output, 0, 0)
    })
  }
}

// 灰化
function ashing(originColorData, outputData, ws, hs) {
  let index;
  let r, g, b;
  // 按行扫描
  for (let y = 1; y <= hs; y++) {
    // 按列扫描
    for (let x = 1; x <= ws; x++) {
      // rgb处理
      index = (y * ws + x) * 4
      let avg = 0.2126 * originColorData[index] + 0.7152 * originColorData[index + 1] + 0.0722 * originColorData[index + 2];
      outputData[index] = avg
      outputData[index + 1] = avg
      outputData[index + 2] = avg
      // alpha
      outputData[index + 3] = 255;
    }
  }
}

// 复古
function retro(originColorData, outputData, ws, hs) {
  let index;
  let r, g, b;
  // 按行扫描
  for (let y = 1; y <= hs; y++) {
    // 按列扫描
    for (let x = 1; x <= ws; x++) {
      // rgb处理
      index = (y * ws + x) * 4
      r = originColorData[index]
      g = originColorData[index + 1]
      b = originColorData[index + 2]
      // r
      outputData[index] = (r * 0.393) + (g * 0.769) + (b * 0.189)
      // g
      outputData[index + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168)
      // b
      outputData[index + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131)
      // alpha
      outputData[index + 3] = 255;
    }
  }
}

// 诡异
function weird(originColorData, outputData, ws, hs) {
  let random
  let randomData
  let index;
  let r, g, b;
  // 按行扫描
  for (let y = 1; y <= hs; y++) {
    // 按列扫描
    for (let x = 1; x <= ws; x++) {
      // rgb处理
      for (let c = 0; c < 3; c++) {
        random = Math.random(0, 255) * 100
        randomData = Math.abs(random - originColorData[index])
        index = ((y - 1) * ws + (x - 1)) * 4 + c
        outputData[index] = randomData
      }
      // alpha
      outputData[index + 3] = 255;
    }
  }
}

// 照片底片
function photographicPlate(originColorData, outputData, ws, hs) {
  let index;
  let r, g, b;
  // 按行扫描
  for (let y = 1; y <= hs; y++) {
    // 按列扫描
    for (let x = 1; x <= ws; x++) {
      // rgb处理
      for (let c = 0; c < 3; c++) {
        index = ((y - 1) * ws + (x - 1)) * 4 + c
        outputData[index] = Math.abs(255 - originColorData[index])
      }
      // alpha
      outputData[index + 3] = 255;
    }
  }
}

// 老纪录片
function documentary(originColorData, outputData, ws, hs) {
  weird(originColorData, outputData, ws, hs)
  ashing(outputData, outputData, ws, hs)
}