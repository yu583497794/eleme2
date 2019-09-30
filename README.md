# 仿饿了么Web APP

> A Vue.js project

## Build Setup

``` bash
# 安装依赖项
npm install

# 开发模式，serve with hot reload at localhost:8080
npm run dev

# 开启聊天室服务

node ./server/api/chatRoomApi.js

# 开启登录服务
# 需要在本地搭建数据库，这一步可跳过，那么登录注册功能不可用
node ./server/app.js

# 生产模式，发布时再执行这一步。build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 阅读建议

### 入口

首先查看 src\router\index.js 路由文件找到路径对应的组件。

'/miste' 是访问的默认路径,查看对应的组件 [Miste]('./src/components/miste'), Miste组件用于展示所有商家列表，对于列表做了到达列表底部加载更多的功能，点击列表内的项目，通过enter方法跳转到`/miste/${seller.id}`，通过查阅路由文件，对应的组件是Seller，紧接着会被redirect到`/miste/${seller.id}/menu`，查阅路由文件是由MenuList组件渲染出。

MenuList被渲染在Miste组件的<router-view>标签中，通过点击Seller组件中的Tab组件，它内部包含了多个<router-link>，点击后会跳转到标签内属性to中的路径，三个<router-link>分别跳转到`/miste/${seller.id}/menu`, `/miste/${seller.id}/rating`, `/miste/${seller.id}/seller-detail`，同理可以根据路有文件去查找相关的组件，这些组件都渲染在Miste组件的<router-view>标签中，通过watch监听$route的变化，结合<transition>可以产生左滑右滑的页面切换效果。

Miste查阅完毕，去看'src\App.vue', 这里也有<router-view>，其实Miste就被渲染在这里，App组件里还有和foot组件，这个组件类似于Seller中的Tab组件也是由多个<router-link>构成，点击是也是路由跳转，使得<router-view>内组件变化。可以相应的再去查阅相应的组件，这个<router-view>中渲染的都是根目录对应的组件。

### 根目录组件

接下来简要介绍一下根目录组件

1. Miste组件，包含了商家页，菜单页，商家详情页，评价页
2. Chatroom组件，利用socket.io实现的匿名聊天室
3. Profile组件，登录、注册、用户中心页，是对表单、数据库和cookie的实践
4. Search组件，可以通过/search访问，没有在应用中留点击进入的入口，这个页面用于放测试的组件，目前在测试富文本编辑器

## 上线须知

1. 修改配置

```javascript
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

```Mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';
FLUSH PRIVILEGES;
```

## 动态使用iconfont

例如：
&#xe601;
改成:
\ue601
即可, 否则不会被转义

```jsx
<i className='iconfont'>{props.children}</i>
```

## React 自定义组件Editor混入Vue中，可能会出现onClick绑定事件无效

当将Editor直接渲染在DOM上时，onClick有效

```javascript
mounted () {
  ReactDOM.render(<Editor/>, document.querySelector('#editor-wrapper'))
}
```

当Editor作为子组件出现在其他组件中，onClick无效

> 解决方法

通过useEffect钩子，动态的addEventListener，并返回执行removeEventListener的函数
