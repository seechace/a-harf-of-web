 # springstart
半成品的VUE3博客网页，基本功能完备
## 2021.4.4更新日志：
- 主页现在具有响应式了，导航栏以针对移动端做了适配，后续会继续优化
- 现在默认进入主页而不是登陆页面了
- 访客现在不登陆也能浏览页面
- 限于网站带宽，对登录页的背景视频进行压缩处理，画质下降，流畅性提升
- 背景视频加载完成前增加了图片来代替视频

## 使用的工具与技术
- 框架 VUE3
  - compositionAPI,vue-router
- 构建工具 vite
- 辅助工具 elementUI
- 语言规范
  - html5，css3,es6+
## 项目详情
vue3 compositionAPI 的使用使功能代码相较于VUE2 option 式粒度更小，代码更易被反复利用

登录，注册均使用个人搜集的api及本人的appkey，如要使用，烦请更换个人key。

登录注册组件均未使用原生form表单，而是使用v-model的双向数据绑定获取。数据交互使用手写ajax

## 项目体会
该项目历时四天，一开始打算使用当前使用更加广泛的VUE2来写，但是体会到VUE3 compositionAPI的便利性之后，感觉使用vue2的optionAPI很不顺手。
虽然vue2的optionAPI在写的时候更加的舒畅：把每个功能要做的事像垃圾分类一样安排在每个option中，写的时候条理清晰
但是vue2不利于开发完毕之后的维护，即使把每个功能单独抽离出来作为一个vue组件，仍然不能避免在单个vue组件中存在许多功能函数，而这些函数往往盘根错节，拥有很多来自于其他函数、其他组件的数据交互。它们分布在各个option甚至其他组件里，这在维护的时候往往是很难的。并且vue2在使用插件后，由于依托于构造函数存在，插件会影响所有由Vue构造函数创建的实例，这是我们非常头疼的。
vue3 compositionAPI 能很好的解决这一点，利用setup函数能使我们的代码更易于维护----毕竟它们只是一些普通的函数而已，而不再是写时满天星，用时哭无类的分布于整个组件的函数了。并且vue3摒弃Vue以及其他构造函数的举措，也解决了以往vue2的诟病。

网站是一个半成品，并没有在里边塞进博客等其他功能，以后会写，争取做完全栈。但目前还在学习阶段，心有余而力不足~~~
