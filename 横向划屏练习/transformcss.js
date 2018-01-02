/**
 * Created by Administrator on 2017/5/5.
 */
(function (w) {
  w.transformCss=function (obj,key,val) {
    if(!obj.transform){
      obj.transform={};
    }

    if(arguments.length>2){
      //写
      obj.transform[key]=val;
      var result='';
      for(var item in obj.transform){
        switch (item){
          case 'translate':
          case 'translateX':
          case 'translateY':
            result+=item+'('+obj.transform[item]+'px) ';
            break;
          case 'rotate':
          case 'rotateX':
          case 'rotateY':
          case 'skew':
            result+=item+'('+obj.transform[item]+'deg) ';
            break;
          case 'scale':
          case 'scaleX':
          case 'scaleY':
            result+=item+'('+obj.transform[item]+') ';
            break;
        }
      }
      obj.style.transform=result;
    }else{
      //读
      //默认
      if(typeof obj.transform[key]==='undefined'){
        if(key==='scale'||key==='scaleX'||key==='scaleY'){
          val=1;
        }else{
          val=0;
        }
      }else{
        val=obj.transform[key];
      }
      return val;
    }
  }
})(window);