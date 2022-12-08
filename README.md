## 力扣辅助

自动完成每日任务领取积分

首先拉取用户已下发的任务, 下面的任务没有的会跳过执行

- 日常登录 1 积分

- 阅读 3 篇题解 1 积分

- 每日登录领取 1 积分

- 保存一则学习笔记 3 积分

- 阅读 3 章 LeetBook 领取 2 积分

- 获取 2 本免费的 LeetBook 领取 3 积分

## 安装

```sh
npm install -g lchl
# or
yarn add global lchl
```

## 使用

### 命令行工具使用

目前只支持账号密码登录

```js
lchl start <account> <password>

// example
lchl start 16618922034 123456
```

### 定时任务执行

通过 Github Action 每天凌晨 00:10 分自动执行, 需要提前配置账号密码在 Action Secret 中

1. fork 本项目

2. 配置账号密码

创建 Github action Secret

进入你 fork 的项目, 找到 Settings - Security - Secrets - Actions

然后 New repository secret

填写一个 Name 为 ACCOUNT 的 key, Secret 为你的用户账号
填写一个 Name 为 PASSWORD 的 key, Secret 为你的用户密码
