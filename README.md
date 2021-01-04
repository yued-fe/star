# 使用

## 直接显示评分结果

引入了 `index.css` 的之后

```
<star style="--level:7;--value:3.5"></star>
```

`--level`: 星星的总数

`--value`: 得到的评分

若要修改评分的图案，可直接修改 `background-image` 的样式

## 鼠标移动进行评分
引入了 `index.css` 和 `index.js` 的之后

```
<star></star>
var star = new Star({level:7,name:'star',rate:"rate"})
star.starRender()
```

`level`: 星星的总数

`name`: `form` 表单提交的时候，传给接口的字段名

`rate`:自定义评分的图案

返回一个 `star` 对象，其中 `this.star.params.starValue` 返回评分的结果
