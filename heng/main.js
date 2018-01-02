(function () {
  var app = document.getElementById('app')
  var pagesWrap = document.querySelector('.pages')
  var pages = document.querySelectorAll('.page')

  pagesWrap.style.cssText = 'height:'+ pages.length * 100 + '%'
  ;[].slice.call(pages).forEach(function (t) {
    t.style.cssText = 'height:' + 100/pages.length +'%'
  })

  var varObj = {
    mouseStartX: 0,
    mouseStartY: 0,
    mouseEndX: 0,
    mouseEndY:0,
    disX:0,
    disY:0,
    isY:false,
  }

  document.addEventListener('touchstart', function (e) {
    e.preventDefault()
  })

  //手指按下
  app.addEventListener('touchstart', function (e) {
    var touches = e.changedTouches[0]
    varObj.mouseStartX = touches.clientX
    varObj.mouseStartY = touches.clientY
  })

  //手指移动
  app.addEventListener('touchmove', function (e) {
    var touches = e.changedTouches[0]
    varObj.mouseEndX = touches.clientX
    varObj.mouseEndY = touches.clientY
    varObj.disX =  varObj.mouseEndX - varObj.mouseStartX
    varObj.disY = varObj.mouseEndY - varObj.mouseStartY
    if(Math.abs(varObj.disX) > Math.abs(varObj.disY)) {
      console.log(123);
      varObj.isY = false
      return
    }
    pagesWrap.style.transform = 'translateY('+ varObj.disY +'px)'
  })

  //手指按下
  app.addEventListener('touchend', function (e) {

  })
})()