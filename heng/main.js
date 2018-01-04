(function () {
  var app = document.getElementById('app')
  var pagesWrap = document.querySelector('.pages')
  var pages = document.querySelectorAll('.page')
  var cur = 0

  function getImgs(curPage) {
    slideNum.loadedNum++
    console.log(curPage);
  }

  pagesWrap.style.cssText = 'height:'+ pages.length * 100 + '%'
  ;[].slice.call(pages).forEach(function (t) {
    t.style.cssText = 'height:' + 100/pages.length +'%'
  })

  var slideNum = {
    mouseStartY: 0,
    mouseEndY:0,
    eleY:0,
    disY:0,
    loadedNum:0
  }

  document.addEventListener('touchstart', function (e) {
    e.preventDefault()
  })

  //手指按下
  app.addEventListener('touchstart', function (e) {
    var touches = e.changedTouches[0]
    slideNum.mouseStartY = touches.clientY
    slideNum.eleY = pagesWrap.getBoundingClientRect().top
    pagesWrap.style.transition = ''
  })

  //手指移动
  app.addEventListener('touchmove', function (e) {
    var touches = e.changedTouches[0]
    slideNum.mouseEndY = touches.clientY
    slideNum.disY = slideNum.mouseEndY - slideNum.mouseStartY
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
    if(slideNum.disY < 0 && cur+2 > slideNum.loadedNum) {
      getImgs(cur+1)
    }
    pagesWrap.style.transform = 'translateY('+ -cur*(100/pages.length) +'%)'
    pagesWrap.style.transition = 'transform .5s'
  })
  getImgs(0)
  getImgs(1)
})()