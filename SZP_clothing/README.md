## 彩食鲜-前端-WMS项目
## 项目介绍
本项目是一个基于webpack架构，基于react + ant design进行开发。

## 使用说明

- 下载依赖包：
```
$ npm install
```
antd@3.1.6 --save用这个版本保持和服务器版本一致
- 启动开发服务器
```
	$ npm run dev:admin     运营系统
	$ npm run dev:supplier  卖家系统
```

- 其他常用命令
```
| 命令            | 作用&效果          |
| --------------- | ------------- |
| npm run dev:8000:admin   |  打包运营系统用于测试(dev)环境的代码 |
| npm run test:admin   |  打包运营系统用于测试环境的代码 |
| npm run test:supplier     | 打包运营系统用于测试环境的代码 |
| npm run build:admin   | 打包运营系统用于生产环境的代码 |
| npm run build:supplier   | 打包运营系统用于生产环境的代码 |
| npm run create -- page   | 在dev/page中生成${page}文件夹 |
```

## 目录结构说明
-
```
├─adminDist # 编译后生成的所有代码、资源，生成环境
├─supplierDist # 编译后生成的所有代码、资源，开发环境
├─test # 编译后生成的所有代码、资源，测试环境
├─bin # node脚本
├─node_modules # 利用npm管理的所有包及其依赖
├─package.json # npm的配置文件
├─webpack # 存放分拆后的webpack配置文件
├─webpack.config.js # webpack配置文件
|-public # 公用方法
|-components # 公用组件
├─src_admin # 当前项目的源码，所有开发都在此目录中
    ├─pages # 页面存放位置，以页面名称作为子文件夹
    └─router # 项目路由的配置，引用等目录
    └─redux # action, reducer, store等目录
    └─template # 保存打包用的html模板
    └─less # 常规less配置
```

## 开发说明
- 组件中处理事件（onClick, onChange等）的方法，命名以handler为前缀；只在组件其他方法中调用的方法，命名以_为前缀；反之需要作为props向子元素传递的方法，不需要_；

- 调用组件，如果需要传递多个属性，则分行显示；同理，import一个文件中多个对象时，同样分行显示；

- actions定义集中在redux/action.js；
  以名词+动词形式命名；全部大写，以_为分隔符，如：NAME_GET；

- api接口定义在public/Api.js；
  以API为前缀，以接口地址名称命名；全部大写，以_为分隔符；

- 页面title定义在public/Title.js；

- 具体页面定义在src_admin/page/中；
```
  以_为分隔符；
  建议使用 npm run create [名称] 生成；
  页面生成后需要配置页面路由（page/Routes.js）以及页面title(public/Title.js)
  每个页面包括：入口&&页面容器index、页面组件components、页面样式style

  1）container：页面主文件，与页面相关的component和action都会import到container中
  2）components：页面拆分的组件，以拆分的模块功能命名
  3）style：命名与components对应，并统一导入index.less，在container中引用
```
- 样式的定义以-为分隔符，如：a-b-c；

- 表单元素以单个component的形式定义在components/Form中；
  以api接口名称命名，组件名首字母大写，表单元素名称与组件名一致(可以删除动词)；

- 弹出对话框以单个component的形式定义在components/Dialog中；
  每个弹出框只负责内容渲染及逻辑处理，需要的数据以props的形式传入；

- components/中的元素需要使用alias转换，具体参考public/Form.js

- handsontable css样式问题：无法正常编译
  bottom: -100%\9; !* Fix for IE9 to spread the ":before" pseudo element to 100% height of the parent element*!

  解决方法，注释改行。
  命令行执行 ： npm run handsontable:change


"react-motion": "^0.4.8",//动画增持
"react-swipeable-views": "^0.12.1",//懒加载
"react-tap-event-plugin": "^2.0.1",//ios点击延迟增持
