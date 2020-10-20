function $(id) {
  return document.getElementById(id);
}

window.onload = function () {
  waterFall('phos', 'box');

  var outerdiv = this.document.getElementById('outerdiv');
  outerdiv.style.visibility = "hidden"; // 一开始不可见
  // var pho = this.document.getElementById('pho');
  var imgs = this.document.getElementsByTagName('img');
  // 点击放大图
  for (var i = 0; i < imgs.length - 1; i++) {
      var img = imgs[i];
      this.console.log(img);
      img.onclick = function () {
          var bigimg = outerdiv.getElementsByTagName('img')[0];
          bigimg.src = this.src;
          outerdiv.style.visibility = "visible";  // 点击之后可见

          outerdiv.onclick = function () {
              outerdiv.style.visibility = "hidden";
          }
      }


      var txt = this.document.getElementsByClassName('img-tip')[i];
      txt.innerHTML = texts[i % 10];
      this.console.log(txt.parentNode);
      img.style.cursor = "pointer";
  }
}

//瀑布流布局
//更新数组最矮高度,使下一个图片在高度数组中总是找最矮高度的图片下面拼接
function waterFall(parent, box) {
  var allBox = $(parent).getElementsByClassName(box);
  var boxWidth = allBox[0].offsetWidth;
  var screenWidth = document.body.offsetWidth;
  var cols = Math.floor(screenWidth / boxWidth);
  $(parent).style.width = boxWidth * cols + 'px';
  $(parent).style.margin = '0 auto';

  var heightArr = [];

  for (var i = 0; i < allBox.length; i++) {
      //盒子高度
      var boxHeight = allBox[i].offsetHeight;  
      if (i < cols) {
          //添加第一行盒子高度
          heightArr.push(boxHeight);
      }
      else//其余行的盒子
      {
          var minBoxHeight = Math.min.apply(this, heightArr);
          var minBoxIndex = getMinBoxIndex(minBoxHeight, heightArr);
          //盒子瀑布流定位  顶部间距就是最矮盒子的高度
          allBox[i].style.position = 'absolute';
          allBox[i].style.top = minBoxHeight + 'px';
          allBox[i].style.left = minBoxIndex * boxWidth + 'px';
          heightArr[minBoxIndex] += boxHeight;
      }
  }
}

//求出最矮盒子对应的索引函数
function getMinBoxIndex(val, arr) {
  for (var i in arr) {
      if (val == arr[i]) {
          return i;
      }
  }
}

var texts = ["我要让全世界都知道我很低调",
  "世界上最痛苦的三角恋，我爱零食，零食爱脂肪，脂肪爱我", 
  "今后的路，我希望你能好好的走下去，而我坐车",
  "我尝试做一个有趣的人，后来跑偏了成了一个逗比",
  "给我一张你的靓照呗，回家辟邪用",
  "你的话，我连标点符号都不信",
  ".我这心碎的，捧出来跟饺子馅儿似的",
  "鲁迅说过，只要经常花钱烦恼就会减轻80%，但钱从哪里来呢？鲁迅没说",
  "别逼我，否则我伟大起来，一发不可收拾",
  "我的钱虽然不是大风刮来的，但就像是被风刮走的"];