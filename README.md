# mock-service

mock数据服务

+ [安装](#安装)
+ [启动](#启动)
+ [开始](#开始)


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