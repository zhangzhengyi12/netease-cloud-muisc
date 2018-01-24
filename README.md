## TODOLIST ##

需要确认接口是否需要登录

## 1/9 ##

结构继续搭建，stylus+主题色提前声明。
基本确定要用flex布局+Rem
做了一下别名处理
下载图标非常麻烦
## 1/10 ##

登陆是件挺复杂的事情，我可能需要先写登陆组件
先简单写个弱智的登录组件吧，后续的样式验证逻辑都到后面再写。
把用户的登录状态和基本用户信息缓存到的LocaStorage，接下来的很多组件可能都要依赖这些状态，不然全部放置到app组件可能会过于重度了。

明天需要做一下按钮点击时候的偏移缩小效果，这样感觉会好很多

## 1/11 ##

三元表达式得用[]括起来
不在Typescript的配置文件中 'lib'增加DOM就无法使用window对象
实在TS阻止你，而你又知道这么写每次就用 （x as type）来进行强制断言吧


## 1/12 ##

让flex的子元素不弹性的方法就是设置他的shark，为0即任何情况下都不会缩


## 1/13 ##

今天对一个开源项目做了点贡献，增加了点功能，

开始做主要的路由部分,尽量吧内部的菜单抽离成一个数据文件，导入循环渲染来进行菜单的渲染
Router-link默认会阻止click事件哦，所以还是用编程式导航吧

## 1/14 ##

写了个爬虫来爬取Banner数据

## 1/15 ##

建立响应式的carsouel

## 1/16 ##

完成响应式的轮播图等

## 1/17 ##

完成响应式推荐菜单和歌单推荐，并做到任何大小的屏幕都能完美适配

今天知道了如果是CROS跨域请求想带cookie的话必须加上一个参数` .withCredentials() `
如果想做到任何情况子元素随着父元素自适应，单纯flex是不够的，需要使用百分百的宽度+媒体查询。

flex在大多数情况下都能完美替代大部分布局方案，我觉得非常棒。

想出一个基本准则，所有组件调用需要传入三个props和以上的，我全部以对象的形式去传参，同时也需要考虑这个组件是否会在很多地方调用，在那些地方调用的时候接口是否相同，如果不相同那么传入一个对象可能会让这个组件不够灵活，散一点可能会更棒


重构了很多东西，比如props的替换，CSSmixins。很多API函数名都被更好的命名


## 1/20 ##

做了大量的lazy-load处理，以及Loadding动画，完成了无限加载的歌单页面。

重构了诸多组件，使其能够更好的复用。

写了一个动画组件，可以实现极高的复用率

提升了性能

还是放弃了性能，因为如果我使用组件复用，那么组件的背景图很难被重置为placeholerimg。我一旦vshow=false之后更新src就不会被vue响应。这会导致提升不到半秒的性能带来相当高额的代码量。并且结构会混乱很多。感觉得不偿失。

## 1/22 ##

完成了歌单列表的页面，整体进度应该来说比较慢，不过没啥关系，因为我时间很多。
用了相当大量的时间去修改一些依赖组件和具体的样式，尽量做到仿真度高一点吧。

增加了本地API接口缓存机制，可以提升一些并不是经常更新的接口的访问速度，时间目前预设为6小时

增加了mixins系统

一个API无法满足我的需求，所以手动修改一下因为需要cookie所以还是放弃，打算前端缓慢去抓取一部分，然后长期保存

## 1/23 ##

对于歌手页面使用了前端并发抓取数据+合成+重新排序的方法，然后利用本地缓存。借助了一个拼音库

## 1/24 ##

这API歌手页面实在是难搞，数量太少了，抓1000个歌手实际可能只有200个

进入新的底部，歌单组件

打算在所有详情组件，比如歌单，歌手，电台，外面都加一层detail组件，以便复用滚动

考虑再三决定放弃一些组件导入上面的mixin，还是方法和属性会有更加强的mixin必要

对于歌单详情的BUG进行了修复，帮助开源项目　


## 1/25 ##

如果想要在某个实例的prototype上增加一些方法，需要在d.ts文件中声明

比如声明这样一个方法

```js

declare interface Date {
  Format(date: any): string
}

```

TODO: 按钮和标签 能做的按钮其实只有一个，就是评论。其他都没有相应的接口