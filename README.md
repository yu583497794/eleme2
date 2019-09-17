# 仿饿了么Web APP

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 上线须知

1. 修改配置

```
// /config/index.js
{
  build: {
    port: XXXX
  }
}
```

2. 修改后端接口的端口号



## 聊天室模块

### Socket.io

#### Server

io.on()

io.emit()

#### Client

socket.on()

socket.emit()

### 跨域问题
[Socket.io - Origin not allowed by Access-Control-Allow-Origin](https://stackoverflow.com/questions/14705941/socket-io-origin-not-allowed-by-access-control-allow-origin)

[浏览器和服务器实现跨域(CORS)判定的原理](https://blog.csdn.net/zmx729618/article/details/53319383)

### 自动滚动到底部

[Element​.scroll​Into​View()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

> 参数

* alignToTop Boolean值
  * true, 元素的顶端将和其所在滚动区的可视区域的顶端对齐。
  * false, 元素的底端将和其所在滚动区的可视区域的底端对齐。
* scrollIntoViewOptions Object

  ```javascript
  {
    behavior: "auto"  | "instant" | "smooth",
    block:    "start" | "end",
    inline:   "start" | "center"  | "end"   | "nearest"
  }
  ```
> 注意事项

向data的messages中添加聊天项后, 应在nextTick中再获取容器最后一项element, 再调用它的scrollIntoView方法

  ### 当前用户列表展开效果

[单元素/组件的过渡transform](https://cn.vuejs.org/v2/guide/transitions.html)

* enter

定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

* enter-active

定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

* enter-to

定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。

* leave

定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

* leave-active

定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

* leave-to

定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

![生命周期图](https://cn.vuejs.org/images/transition.png)

> 注意事项

animation在active过渡中起作用

```html
<div id="example-2">
  <button @click="show = !show">Toggle show</button>
  <transition name="bounce">
    <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
  </transition>
</div>
```

```js
new Vue({
  el: '#example-2',
  data: {
    show: true
  }
})
```

```css
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```
> 注意事项

使用[transform-origin](http://www.w3school.com.cn/cssref/pr_transform-origin.asp)设置旋转等变换的基点位置

## Vue使用中的问题

watch 和 computed 无法监听数组和对象的变化,因此要使用this.$set(array, index, value)

## MySql8.0.13 密码问题 
[ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)](https://blog.csdn.net/sinat_31057219/article/details/84402896#commentBox)

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';
FLUSH PRIVILEGES;
```

## 动态使用iconfont

例如：
&#xe601;
改成:
\ue601
即可, 否则不会被转义
```
<i className='iconfont'>{props.children}</i>
```