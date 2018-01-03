(function () {
  var app = document.getElementById('app')
  var pagesWrap = document.querySelector('.pages')
  var pages = document.querySelectorAll('.page')
  var cur = 0

  pagesWrap.style.cssText = 'height:'+ pages.length * 100 + '%'
  ;[].slice.call(pages).forEach(function (t) {
    t.style.cssText = 'height:' + 100/pages.length +'%'
  })

  var pagesWrapHeight = pagesWrap.clientHeight

  var slideNum = {
    mouseStartX: 0,
    mouseStartY: 0,
    mouseEndX: 0,
    mouseEndY:0,
    eleY:0,
    disX:0,
    disY:0,
    isFirst:true,
    isY:true
  }

  document.addEventListener('touchstart', function (e) {
    e.preventDefault()
  })

  //手指按下
  app.addEventListener('touchstart', function (e) {
    var touches = e.changedTouches[0]
    slideNum.mouseStartX = touches.clientX
    slideNum.mouseStartY = touches.clientY
    slideNum.eleY = pagesWrap.getBoundingClientRect().top
    pagesWrap.style.transition = ''
    slideNum.isY = true
    slideNum.isFirst = true
  })

  //手指移动
  app.addEventListener('touchmove', function (e) {
    var touches = e.changedTouches[0]
    slideNum.mouseEndX = touches.clientX
    slideNum.mouseEndY = touches.clientY
    slideNum.disX =  slideNum.mouseEndX - slideNum.mouseStartX
    slideNum.disY = slideNum.mouseEndY - slideNum.mouseStartY
    if(!slideNum.isY) return
    if(slideNum.isFirst) {
      slideNum.isFirst = false
      if(Math.abs(slideNum.disY) < Math.abs(slideNum.disX)) {
        slideNum.isY = false
        return
      }
    }
    var t = 0
    if(slideNum.disY > 0) {
      t = (1 - ((pagesWrapHeight - slideNum.disY)/pagesWrapHeight))*slideNum.disY
    }else {
      t = (1 - (pagesWrapHeight + slideNum.disY)/pagesWrapHeight)*slideNum.disY
    }
    var totalTranslate = slideNum.eleY + slideNum.disY
    pagesWrap.style.transform = 'translateY('+ totalTranslate +'px)'
  })

  //手指按下
  app.addEventListener('touchend', function (e) {
    if(Math.abs(slideNum.disY) > 200) {
      slideNum.disY < 0 ? cur++ : cur--
    }
    if(cur < 0) {
      cur = 0
    }
    if(cur === pages.length) {
      cur = pages.length - 1
    }
    pagesWrap.style.transform = 'translateY('+ -cur*(100/pages.length) +'%)'
    pagesWrap.style.transition = 'transform .5s'
  })
})()