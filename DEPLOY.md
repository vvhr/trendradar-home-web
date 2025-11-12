# 宝塔面板部署指南

## 📋 前置要求

1. 已安装宝塔面板
2. 已安装 Node.js 管理器（PM2）
3. 确保 `trendradar` 爬虫项目已部署

## 📁 目录结构要求

确保项目目录结构如下：

```
/root/
├── trendradar-home-web/    # 本项目
│   ├── server.js
│   ├── index.html
│   ├── style.css
│   └── ...
└── trendradar/             # 爬虫项目
    └── output/             # 新闻输出目录
        ├── 2025年11月12日/
        └── ...
```

## 🚀 部署步骤

### 方法一：使用宝塔 Node.js 项目管理器

1. **进入宝塔面板** → **软件商店** → 安装 **PM2 管理器**

2. **添加 Node.js 项目**
   - 项目名称: `trendradar-home-web`
   - 项目路径: `/root/trendradar-home-web`
   - 启动文件: `server.js`
   - 端口: `8080` (或其他可用端口)
   - 运行方式: `PM2`

3. **启动项目**
   - 点击"启动"按钮
   - 查看日志确认启动成功

### 方法二：使用命令行

```bash
# 进入项目目录
cd /root/trendradar-home-web

# 使用 PM2 启动
pm2 start server.js --name trendradar-home-web

# 查看状态
pm2 status

# 查看日志
pm2 logs trendradar-home-web

# 设置开机自启
pm2 startup
pm2 save
```

## 🔧 配置反向代理（推荐）

如果需要通过域名访问，可以配置 Nginx 反向代理。

### 方案一：完全通过 Node.js 服务（推荐，已实现）

Node.js 服务器已经配置为处理 `/trendradar/output/` 路径的静态文件，只需简单的反向代理即可。

1. **在宝塔面板添加网站**
   - 域名: `news.howcat.com.cn`
   - 根目录: 任意（不使用）

2. **配置反向代理**
   
   进入网站设置 → 反向代理 → 添加反向代理：
   
   ```
   代理名称: trendradar-home
   目标URL: http://127.0.0.1:8080
   发送域名: $host
   ```

3. **保存并重启 Nginx**

### 方案二：Nginx 直接提供静态文件（性能更好）

如果需要更好的性能，可以让 Nginx 直接提供 output 目录的静态文件。

在宝塔面板 → 网站设置 → 配置文件中添加：

```nginx
# 在 server 块中添加
location /trendradar/output/ {
    alias /root/trendradar/output/;
    charset utf-8;
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

完整配置示例请参考 [nginx-config-example.conf](nginx-config-example.conf)

## 🔍 故障排查

### 问题1: 找不到 server.js

**错误信息:**
```
Error: Cannot find module '/root/trendradar-home/server.js'
```

**解决方法:**
- 检查项目路径是否正确
- 确认项目名称是 `trendradar-home-web` 而不是 `trendradar-home`
- 使用完整路径: `/root/trendradar-home-web/server.js`

### 问题2: 找不到 output 目录

**错误信息:**
```
⚠️  未找到目录: /root/trendradar/output
```

**解决方法:**
- 确认 `trendradar` 项目已部署在 `/root/trendradar`
- 检查 `output` 目录是否存在
- 确认目录权限正确

### 问题3: 端口被占用

**错误信息:**
```
Error: listen EADDRINUSE: address already in use :::8080
```

**解决方法:**
- 修改 `server.js` 中的端口号
- 或者停止占用该端口的进程

## 📝 修改端口

编辑 `server.js` 文件：

```javascript
const PORT = 8080; // 改为其他端口，如 3000, 8888 等
```

重启项目：
```bash
pm2 restart trendradar-home-web
```

## 🔄 更新项目

```bash
# 进入项目目录
cd /root/trendradar-home-web

# 拉取最新代码
git pull

# 重启项目
pm2 restart trendradar-home-web
```

## 📊 查看日志

```bash
# 实时查看日志
pm2 logs trendradar-home-web

# 查看错误日志
pm2 logs trendradar-home-web --err

# 清空日志
pm2 flush
```

## 🛡️ 安全建议

1. **配置防火墙**
   - 如果不使用反向代理，确保端口 8080 在防火墙中开放
   - 在宝塔面板 → 安全 → 添加端口规则

2. **使用 HTTPS**
   - 在宝塔面板中申请 SSL 证书
   - 配置强制 HTTPS

3. **限制访问**
   - 如果只需内网访问，可以在 Nginx 中配置 IP 白名单

## 📞 技术支持

如遇到问题，请检查：
1. Node.js 版本是否 >= 12.0.0
2. PM2 是否正确安装
3. 项目目录结构是否正确
4. 日志中的具体错误信息

---

更多信息请参考 [README.md](README.md)
