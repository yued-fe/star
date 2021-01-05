# 背景
亲，记得给给五星好评哟，网购`or`点外卖的时候，是不是经常听到这句话。用户的满意度评价是一个很常见的需求，不知道你是否自己动手实现过还是直接网上`copy`代码`or`插件框架套用。如何动手实现他？是否可以不借助js实现呢？当然可以呀，想知道的话，直接看最后呀

## 需求描述

1. 鼠标在其上移动，评分变更

2. 点击评分后，固定评分

3. 鼠标离开后，回显上次评分

<img src="./star.gif">

## 实现思路

1. 每个星星都是可以点击的，星星数量不一定 => 借助 `css` 变量，实现一个标签包裹多个星星

```
 <star level="8"></star>
```

2. 鼠标移动or点击的时候，当前星星高亮，其余不变 => 借助另一个 `css` 变量，只展示高亮星星

```
e.target.style.setProperty('--value', value)
```

3. 鼠标移动上去的高亮到当前的星星 => 

  a.记录局部当前移动到第几个星星和当前星星的位置; 

  b.前面的星星都高亮，根据当前星星的位置判断是半个还是一颗

```
  this.params.eleBox.addEventListener("mousemove",function(e){
      _that.starLight(e.offsetX)
  })
```

3. 鼠标离开的时候，设置高亮星星

```
  this.params.eleBox.addEventListener('mouseleave',function(e){
    _that.params.eleBox.style.setProperty('--value', _that.params.value)
  })
```

4. 点击的时候，记录高亮星星的信息

```
  this.params.eleBox.addEventListener('click',function(e){
    _that.params.value = _that.starLight(e.offsetX)
    _that.params.eleInput.value = _that.params.value;
    _that.params.eleInput.dispatchEvent(new CustomEvent('change'));
  })
```

5. 记录星星的信息，手工完成

```
  starLight(step) {
    step = step / 26
    var value = Math.trunc(step)
    
    if (step < 0) {
      value = 0
    } else if (step - Math.trunc(step) < 0.5) {
      // 高亮一半个星星
      value += 0.5
    } else {
      value += 1
    }
    this.params.eleBox.style.setProperty('--value', value)
    return value
  }
```

[原生评分预览](https://codepen.io/qingchuang/pen/RwGxrqY)

### 代码封装

查看demo的时候，你会发现代码是进行了简单的封装。在new Star类的时候，只需要传入几个参数就可以满足你大部分的时候的需求

```
  el:指定一个容器

  level:你要展示几个星星，可以在元素或者也可以在new 的时候传入

  name:如果你使用form表单提交时候的字段，可以在元素或者也可以在new 的时候传入

  className:自定义样式,把你想要的样式通过一个类名传递进去（背景图的形式

  var star1 = new Star({
    level: 7,
    value: 3,
    name: 'star1',
    el: ".star1"
  })
  star1.starRender()
```

## 使用纯css的高技巧实现

需求还是原来的需求，之前的实现借助了`js`实现，效果很完美。就是如果可以用纯 `css` 实现那就有意思了。

那天张老师在看到我代码实现的时候，提了一嘴 `type="range"`，应该可以，我想破脑袋也想不出来。后来[同事](https://github.com/XboxYan)无意间看到了我的博客，开始了一段新的旅程

<img src="./1.png">

后来我和他各种忙各自的去了，再后来纯css实现了

<img src="./2.png">

震惊，这也太厉害了吧，只有你想不到，没有你实现不了的。我们先看看在移动端的效果，移动端基本可以放心使用

[移动端纯css实现手指移动打分](https://codepen.io/qingchuang/pen/jOMmQab)

不同的浏览器底层实现不一样，所以我们要做一点点兼容处理

谷歌浏览器

```
<input type="range" name="star" min="0" max="5" step="0.5">
input[type="range"]{
      -webkit-appearance: none;
      width: 100px;
      margin: 0;
      outline: 0;
  }
  input[type="range" i]::-webkit-slider-runnable-track {
      background: coral;
      height: 20px;
      -webkit-mask: url("data:image/svg+xml,%3Csvg width='12' height='11' viewBox='0 0 12 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 0l1.693 3.67 4.013.476L8.74 6.89l.788 3.964L6 8.88l-3.527 1.974.788-3.964L.294 4.146l4.013-.476L6 0z' fill='%23F67600'/%3E%3C/svg%3E");
      -webkit-mask-size: 20px;
      -webkit-mask-repeat: repeat-x;
  }
  input[type="range" i]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 0;
      height: 100%;
      box-shadow: 999px 0px 0px 999px #E8EAED;
  }
```

火狐浏览器

```
  input[type=range]{
      -webkit-mask: url("data:image/svg+xml,%3Csvg width='12' height='11' viewBox='0 0 12 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 0l1.693 3.67 4.013.476L8.74 6.89l.788 3.964L6 8.88l-3.527 1.974.788-3.964L.294 4.146l4.013-.476L6 0z' fill='%23F67600'/%3E%3C/svg%3E");
      -webkit-mask-size: 20px;
      -webkit-mask-repeat: repeat-x;
      height: 20px;
  }
  input[type=range]::-moz-range-track{
      background: #E8EAED;
      height: inherit;
  }
  input[type=range]::-moz-range-progress {
      background: coral;
      height: inherit;
  }
  input[type=range]::-moz-range-thumb {
      width: 0;
      opacity: 0;
  }
```

同事他说之前想自定义input range的样式研究过，没想到这次派上用场了。真的太厉害了，打开了我的眼界

## 总结
我的同事们脑子里装一定是的百科全书，仿佛就没有他们不知道的东西。好几次都找同事帮忙看问题解决问题，他们的脑袋转悠转悠，贼快的给出了我要的答案，那速度比谷歌还快。真开心，真羡慕自己有一群这样的同事。以后做需求写功能都可以像他们取经，是否有更好的实现方式，交流讨论，然后成长。选择比努力重要，特别是遇到了一群大佬同事

