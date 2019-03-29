# 在 CodeSandbox 开发基于 Webpack 的项目

之前有用过 CodeSandbox,不过一直在学习,都是在本地运行,只是偶尔用来展示下代码用,最近研究了下 CodeSandbox 的 Node 容器,简直太强大了,相当于一个在线虚拟机,能运行 Node 的项目,暂时还没见到别的在线编辑器有这种功能的.另外在 CodeSandbox 上能获得接近本地编辑器的体验,直接把 vscode 的主题和设置导入到 CodeSandbox,体验真心不错.还有一些黑科技,比如用 Node 容器编译一些在本地不太好编译的东西,那速度谁用谁知道:smirk:.

[CodeSandbox 官网](https://codesandbox.io)

[CodeSandbox GitHub](https://github.com/CompuIves/codesandbox-client)

> 可以了解下 [StackBlitz](https://stackblitz.com/)
>
> 另外一个提供类似体验的在线编辑器,也是基于 vscode,优点是国内速度会稍微快些,只是暂时还不支持 node 容器或者自定义 webpack 的项目.

下面记录了使用 CodeSandbox 过程中的一些问题,和解决方法,以供有需要的同学参考.

## CodeSandbox 国内访问慢

主要是有个谷歌字体的 api 一直卡着
解决办法,使用下面的插件,替换谷歌字体的 api 替换为国内的
有分别提供 Chrome 和 Firfox 的插件.
[ReplaceGoogleCDN GitHub](https://github.com/justjavac/ReplaceGoogleCDN)

不过就算替换了谷歌字体,第一次加载也需要挺久的,尝试创建了一个默认的 React 模板,加载要 40s+,根据网络波动有差异.后面使用缓存配合 HMR 算勉强能用吧.

如果使用 node 容器,还会更慢,所以推荐如果要用 CodeSandbox 的话搭配科学上网食用会更香.

## 从 GitHub 直接导入到 CodeSandbox

CodeSandbox 支持直接从 GitHub 导入项目,用法是使用`codesandbox.io/s/github/`后面跟上项目地址中`github.com/`之后的所有内容,支持分支.

比如我的项目地址是

> `https://github.com/XYShaoKang/react-development-environment/tree/basic-react-support-codesandbox`

那么要从这个仓库直接导入到 CodeSandbox,可以直接在浏览器中输入

> `codesandbox.io/s/github/XYShaoKang/react-development-environment/tree/basic-react-support-codesandbox`

或者直接点击[链接](https://codesandbox.io/s/github/XYShaoKang/react-development-environment/tree/basic-react-support-codesandbox)

从 GitHub 导入的项目,CodeSandbox 会根据仓库中的文件来推断是属于什么项目,然后创建对应的模板,可以之后在`sandbox.config.json`中修改.

CodeSandbox 的模板大类分为 client server presets 三类,同样大类的模板可相互切换,而不能切换到不同大类的模板.

比如[basic-react](https://github.com/XYShaoKang/react-development-environment/tree/basic-react)这个仓库,如果导入到 CodeSandbox 后,会被识别为 React,从而把 Template 设置为 React,如果我想切换为 Node 模板就不行,这个时候可以通过在仓库中添加`sandbox.config.json`文件,预先配置好 Template 类型来解决.

- 模板分类
  - Client
    - `Angular` `CxJS` `Dojo` `Preact` `React` `Reason` `Static` `Svelte` `Vanilla` `Vue`
  - Server
    - `Apollo` `Ember` `Gatsby` `Nest` `Next.js` `Node` `Nuxt.js` `Sapper` `Styleguidist`
  - Presets
    - `React+TS` `Vanilla+TS`

CodeSandbox 还支持其他多种方式导入,详情参考文档[Importing Sandboxes](https://codesandbox.io/docs/importing#import-from-github)

## 针对 CodeSandbox 定制,开箱即用的模板

### 最终结果

[预览](https://n71xqjwzjm.sse.codesandbox.io/)

[CodeSandbox 地址](https://codesandbox.io/s/n71xqjwzjm)

[GitHub 仓库](https://github.com/XYShaoKang/react-development-environment/tree/basic-react-support-codesandbox)

### 基础模板

[basic-react GitHub](https://github.com/XYShaoKang/react-development-environment/tree/basic-react)

[React 基础环境配置](https://github.com/XYShaoKang/react-development-environment/blob/basic-react/basic-react.md) 详细说明

### 配置 sandbox.config.json

将 sanbox 模板设置为 node,指定容器内部的端口,需要跟 DevServer 监听的端口一致

```json
{
  "template": "node",
  "container": {
    "port": 8080
  }
}
```

### 配置 webpack.config.js

```js
{
  ...
  devServer: {
    host: '0.0.0.0',
    port: 8080, // 指定 devServer 启动的端口
    hot: true,
    inline: true,
    disableHostCheck: true, // 必须
    public: '0.0.0.0:0', // 必须
  }
  ...
}
```

必须要配置 disableHostCheck 和 public,否则 HMR 不能正确访问到 Nginx 代理后面的服务器
[webpack-dev-server/issues/1240](https://github.com/webpack/webpack-dev-server/issues/1240#issuecomment-442640889)

另外针对 CodeSandbox 优化了下 Webpack 的启动配置.不开启源映射,保留 HMR

## 更多阅读

- [Announcing CodeSandbox Containers](https://hackernoon.com/codesandbox-containers-5864a8f26715)
  - 中文版 [CodeSandbox 推出容器，进化为 WebIDE](http://www.10tiao.com/html/788/201809/2247489605/1.html)
- [What’s Unique About CodeSandbox](https://medium.com/@compuives/whats-unique-about-codesandbox-f1791d867e48)
- [Announcing CodeSandbox v3](https://hackernoon.com/announcing-codesandbox-v3-4febbaba1963)
