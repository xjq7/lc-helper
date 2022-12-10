## 力扣辅助

自动完成每日任务领取积分

首先拉取用户已下发的任务, 下面的任务没有的会跳过执行

- 日常登录 1 积分

- 阅读 3 篇题解 1 积分

- 每日登录领取 1 积分

- 保存一则学习笔记 3 积分

- 阅读 3 章 LeetBook 领取 2 积分

- 获取 2 本免费的 LeetBook 领取 3 积分

## 开发

### 环境安装

```sh
# clone project
git clone https://github.com/xjq7/lc-helper

# cd folder
cd lc-helper

# 安装 pnpm, 已安装的话就跳过
npm install pnpm -g

# 依赖安装
pnpm install

```

### 本地调试

```sh
pnpm dev <account> <password>
```

### 命令行工具调试

```sh
# 编译
pnpm tsc

# link 到全局
npm link --force

# 运行
lchl start <account> <password>
```

## 使用

目前只支持账号密码登录

### 命令行工具使用

```sh
# 全局安装
npm install -g lchl
# or
yarn add global lchl

# 运行
lchl start <account> <password>

# example
lchl start 16618922034 123456
```

### 定时任务执行

通过 Github Action 每天凌晨 00:50 分自动执行, 需要提前配置账号密码在 Action Secret 中

1. fork 本项目

2. 配置账号密码用于工具登录

   创建 Github action Secret

   进入你 fork 的项目, 找到 Settings - Security - Secrets - Actions

<img src="https://image.xjq.icu/2022/12/9/1670551463085_%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16705514502048.png" />

然后 点击新建 New repository secret

<img src="https://image.xjq.icu/2022/12/9/1670551587314_%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16705515849451.png" />

填写一个 Name 为 ACCOUNT 的 key, Secret 为你的账号

<img src="https://image.xjq.icu/2022/12/9/1670551562380_%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16705515617312.png" />

填写一个 Name 为 PASSWORD 的 key, Secret 为你的密码

<img src="https://image.xjq.icu/2022/12/9/1670551635271_%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16705516315538.png" />

3. 在 Action 中手动触发验证

点击 Actions, 找到定时任务 auto action runner

<img src="https://image.xjq.icu/2022/12/9/1670551695863_%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16705516929330.png" />

第一次接入手动触发任务测试是否有问题

点击 Run workflow 手动触发任务

<img src="https://image.xjq.icu/2022/12/9/1670551751162_%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16705517507430.png" />

点击进入 当前执行的 Action 中查看日志

<img src="https://image.xjq.icu/2022/12/9/1670551827282_%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16705518235339.png" />

run 环节会打印执行结果

<img src="https://image.xjq.icu/2022/12/9/1670551901400_%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_16705518993100.png" />

后续每天 00:50 自动执行, 时间可能有误差, 00:50 ~ 01:00 之间
