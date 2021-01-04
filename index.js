class Star{
    constructor(params){
      this.params = {
        ...params,
        starValue:0,// 点亮的星星
      }
    }
    // 星星评价
    starRender() {
      // 创建父元素
      this.params.eleBox = document.querySelector('star')
      this.params.rate&&this.params.eleBox.classList.add(this.params.rate)
      if(!this.params.eleBox.style.getPropertyValue("--level")){
      this.params.eleBox.style.setProperty('--level', this.params.level)
      }
      // 创建 input 记录分值
      this.params.eleInput = document.createElement('input')
      this.params.eleInput.type='hidden'
      this.params.eleInput.name = this.params.name

      this.params.eleBox.appendChild(this.params.eleInput)

      // 移动高亮星星
      var _that = this
      this.params.eleBox.addEventListener("mousemove",function(e){
        _that.starLight(e.offsetX)
      })

      // 记住高亮星星
      this.params.eleBox.addEventListener('click',function(e){
       _that.params.starValue = _that.starLight(e.offsetX)
        _that.params.eleInput.value = _that.params.starValue;
        _that.params.eleInput.dispatchEvent(new CustomEvent('change'));
      })
      // 保存高亮信息
      this.params.eleBox.addEventListener('mouseleave',function(e){
        _that.params.eleBox.style.setProperty('--value', _that.params.starValue)
      })
    }
    // 设置高亮的星星
    starLight(step) {
     step = step / 26
    var starValue = Math.trunc(step)
    
    if (step < 0) {
      starValue = 0
    } else if (step - Math.trunc(step) < 0.5) {
      // 高亮一半个星星
      starValue += 0.5
    } else {
      starValue += 1
    }
    this.params.eleBox.style.setProperty('--value', starValue)
    return starValue
    }
  }
 