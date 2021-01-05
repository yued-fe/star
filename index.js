class Star {
  constructor(params) {
    this.params = {
      value: '', // 点亮的星星
      ...params,
    }
  }
  // 星星评价
  starRender() {
    // 创建父元素
    this.params.eleBox = document.createElement('div')
    var eleBox = (document.querySelector(this.params.el) || document.querySelector('star'))
    var level = eleBox.getAttribute("level")
    var value = eleBox.getAttribute("value")
    var name = eleBox.getAttribute("name")
    var readonly = eleBox.getAttribute("readonly")

    this.params.className && this.params.eleBox.classList.add(this.params.className)
    value && (this.params.value = value)
    level && (this.params.level = level)
    this.params.eleBox.style.setProperty('--level', this.params.level)
    this.params.eleBox.style.setProperty('--value', this.params.value)

    eleBox.appendChild(this.params.eleBox)

    // 只是展示评分
    if (readonly !== null) return

    // 创建 input 记录分值
    this.params.eleInput = document.createElement('input')
    this.params.eleInput.type = 'hidden'

    if (name || this.params.name) {
      this.params.eleInput.name = name || this.params.name
    }

    this.params.eleBox.appendChild(this.params.eleInput)

    // 移动高亮星星
    var _that = this
    this.params.eleBox.addEventListener("mousemove", function (e) {
      _that.starLight(e.offsetX)
    })

    // 记住高亮星星
    this.params.eleBox.addEventListener('click', function (e) {
      _that.params.value = _that.starLight(e.offsetX)
      _that.params.eleInput.value = _that.params.value;
      _that.params.eleInput.dispatchEvent(new CustomEvent('change'));
    })
    // 保存高亮信息
    this.params.eleBox.addEventListener('mouseleave', function (e) {
      _that.params.eleBox.style.setProperty('--value', _that.params.value || value)
    })
  }
  // 设置高亮的星星
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
}