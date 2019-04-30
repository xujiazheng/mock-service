# mock-service

mock数据服务

+ [安装](#安装)
+ [启动](#启动)
+ [开始](#开始)
+ [使用场景](#使用场景)
+ [API](#API)
    + [get](#get)
    + [post](#post)
+ [联系我们](#联系我们)

## 安装

```bash
git clone https://github.com/xujiazheng/mock-service.git

```

## 启动

```bash
cd mock-service
npm i
npm start
```

## 开始

新增一条mock接口

1. 点击页面新增按钮，弹出“新增mock信息”弹窗
2. 填写路由名称如"list"
3. 填写需要返回的mock数据，数据为json格式。
4. 点击确定保存mock接口信息
5. mock数据的接口为http://localhost:10000/get/路由名称， 如“http://localhost:10000/get/list”

### 使用场景

* 后端没有接口或后端有接口但是没有数据。
* 分页功能，后端有接口但是数据不够分页。
* 后端有接口，但需要测试后端返回数据异常情况。

### API

在页面中设置了mock数据后，可以根据其请求方式进行请求mock接口，请求有两种类型，一种直接返回mock数据，一种延迟返回。

#### get

在页面中设置为get接口的mock数据，请求如下

```javascript
import axios from 'axios';
// 请求list路由的mock数据
axios.get('http://localhost:10000/get/list')
    .then((resp) => {
        // resp为你设置的mock数据
    });
// 请求list路由的mock数据，并规定1000ms后返回数据
axios.get('http://localhost:10000/get/list/timeout/1000')
    .then((resp) => {
        // resp为你设置的mock数据
    });
```

#### post

在页面中设置为post接口的mock数据，请求如下

```javascript
import axios from 'axios';
// 请求add路由的接口并返回结果
axios.post('http://localhost:10000/post/add')
    .then((resp) => {
        // resp为你设置的mock数据
    });
// 请求add路由的接口，并规定1000ms后返回结果
axios.post('http://localhost:10000/post/add/timeout/1000')
    .then((resp) => {
        // resp为你设置的mock数据
    });
```

### 联系我们

+ 作者：xujiazheng
+ QQ：1131029395
+ issue: [https://github.com/xujiazheng/mock-service/issues](https://github.com/xujiazheng/mock-service/issues)