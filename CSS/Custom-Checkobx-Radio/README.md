## 纯CSS实现自定义checkbox和radio元素的样式

[demo](http://pramper.github.io/Demos/CSS/Custom-Checkbox-Radio/)

支持IE9和IE9+。

### 使用方法

首先引入该CSS，该CSS定义了两个类名`.checkbox`、`.radio`：

```html
<input type="checkbox" id="a1" class="checkbox" /><label for="a1">篮球</label>
<input type="radio" id="b1" class="radio" name="sex" /><label for="b1">男</label>
```

### 注意：

- 必须`input`元素在前，`label`元素在后，并使`label`的`for`属性捆绑目标`input`的id

### 优点：

- 纯CSS实现，没用图片或字体图像
- 可以兼容到IE9

### 缺点：

- 限制较多，如注意事项
- label元素的position属性为relative