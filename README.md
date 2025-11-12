# TrendRadar Home Web

trendradar项目会在output目录下生成新闻网页, 本项目构建了一个门户页, 用于自动检索所有已生成的新闻网页并生成门户导航页, 采用node+html, 非常简单易用.

## 🚀 快速开始

### 前置要求

- Node.js (v12 或更高版本)

### 安装运行

1. 在trendradar同级父目录下新建trendradar-home-web目录并克隆仓库
```bash
# 如果已创建trendradar-home-web目录, 则git clone末尾需要加 .
# 如果未创建,则不需要加点, 会自动创建这个目录

git clone https://github.com/vvhr/trendradar-home-web.git .
cd trendradar-home-web
```

2. 启动服务器

**Windows:**
```bash
start-server.bat
```

**其他已安装了node的系统:**
```bash
node server.js
```

3. 在浏览器中访问
```
http://localhost:8080
```

## 📁 项目结构

```
parent-directory/
├── trendradar-home-web/    # 本项目
│   ├── index.html          # 门户主页面
│   ├── style.css           # 样式文件
│   ├── server.js           # Node.js 服务器（自动扫描）
│   ├── start-server.bat    # Windows 启动脚本
│   ├── README.md           # 项目说明
│   └── README-门户使用说明.md  # 详细使用说明
└── trendradar/             # 爬虫项目目录
    └── output/             # 爬虫生成的新闻目录
        ├── 2025年11月12日/
        │   └── html/
        │       └── 22时30分.html
        └── ...
```

**注意**: 本项目需要与 `trendradar` 爬虫项目放在同一父级目录下。

## 🔧 配置

### 修改网站标题

本项目的前端为静态html项目, 因此您可以随时自由修改.
打开 index.html 直接修改网站标题,导航标题等.

### 修改端口

编辑 `server.js` 文件，修改 `PORT` 常量：

```javascript
const PORT = 8080; // 改为你想要的端口
```

### 自定义样式

编辑 `style.css` 文件来自定义界面样式。

## 📖 使用说明

### 自动扫描

服务器会在每次页面加载时自动扫描 `../trendradar/output` 目录，无需手动操作。

**重要**: 确保 `trendradar` 爬虫项目与本项目在同一父级目录下。

### 刷新列表

点击右上角的刷新按钮（🔄），系统会：
- 检查是否有新内容
- 显示相应的提示信息
- 自动更新列表

### 查看新闻

1. 页面加载时自动显示最新新闻
2. 点击左上角菜单按钮打开侧边栏
3. 选择日期和时间查看对应新闻

## 🎯 功能特点

### 移动端优化
- 顶部固定导航栏
- 侧边栏滑出菜单
- 触摸友好的按钮尺寸
- 流畅的动画过渡

### 桌面端适配
- 侧边栏+内容的经典布局
- 鼠标悬停效果
- 更大的显示空间

### 智能提示
- ✨ 发现新新闻
- 📰 已是最新内容
- 🔄 列表已更新
- ❌ 加载失败提示

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (原生)
- **后端**: Node.js (HTTP 服务器)
- **特性**: 响应式设计, iframe 嵌入, 实时文件扫描

## 📝 开发

### 本地开发

```bash
node server.js
```

服务器会在 `http://localhost:8080` 启动。

### 部署

可以部署到任何支持 Node.js 的服务器或平台：
- **宝塔面板** - 查看 [DEPLOY.md](DEPLOY.md) 获取详细部署指南
- VPS (使用 PM2 管理进程)
- Heroku
- Vercel
- Railway
- 等等

**宝塔面板快速部署:**
```bash
cd /root/trendradar-home-web
pm2 start server.js --name trendradar-home-web
pm2 save
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

[@vvhr](https://github.com/vvhr)

---

⭐ 如果这个项目对你有帮助，请给个 Star！
