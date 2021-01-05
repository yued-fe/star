# 使用


引入了 `index.css` 和 `index.js` 的之后

```
<star level="8" class="star" value="3.5" name="star"></star>
```
### 直接在元素上面设置的属性
`level`: 星星的总数

`value`: 设置初始值

`name`: 表单提交字段

### 构造函数穿参
`el`: 容器载体, 多个评分弹窗必须穿

`level`: 星星的总数

`value`: 设置初始值,非必须

`name`: 表单提交字段,非必须

`className`: 自定义评分图形,非必须

若要修改评分的图案，可直接修改 `background-image` 的样式