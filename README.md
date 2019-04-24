# try

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

watch 和 computed 无法监听数组和对象的变化,因此要使用this.$set(array, index, value)

# Socket.io 跨域问题

[Socket.io - Origin not allowed by Access-Control-Allow-Origin](https://stackoverflow.com/questions/14705941/socket-io-origin-not-allowed-by-access-control-allow-origin)

[浏览器和服务器实现跨域(CORS)判定的原理](https://blog.csdn.net/zmx729618/article/details/53319383)