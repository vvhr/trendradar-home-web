# TrendRadar Home Web

🚀 一个现代化的新闻门户系统，自动扫描并展示热点新闻分析。

## ✨ 特性

- 📱 **移动端优先设计** - 完美适配手机和平板
- 🔄 **自动扫描** - 实时扫描 output 目录，无需手动刷新
- 🎯 **智能加载** - 自动显示最新新闻
- 💬 **即时反馈** - Toast 提示，操作反馈清晰
- 🎨 **现代化界面** - 渐变色设计，流畅动画
- 📰 **iframe 嵌入** - 无缝展示新闻内容

## 🚀 快速开始

### 前置要求

- Node.js (v12 或更高版本)

### 安装运行

1. 克隆仓库
```bash
git clone https://github.com/vvhr/trendradar-home-web.git
cd trendradar-home-web
```

2. 启动服务器

**Windows:**
```bash
start-server.bat
```

**或手动启动:**
```bash
node server.js
```

3. 在浏览器中访问
```
http://localhost:8080
```

## 📁 项目结构

```
trendradar-home-web/
├── index.html          # 门户主页面
├── style.css           # 样式文件
├── server.js           # Node.js 服务器（自动扫描）
├── start-server.bat    # Windows 启动脚本
├── README.md           # 项目说明
├── README-门户使用说明.md  # 详细使用说明
└── output/             # 爬虫生成的新闻目录（需自行创建）
    ├── 2025年11月12日/
    │   └── html/
    │       └── 22时30分.html
    └── ...
```

## 🔧 配置

### 修改端口

编辑 `server.js` 文件，修改 `PORT` 常量：

```javascript
const PORT = 8080; // 改为你想要的端口
```

### 自定义样式

编辑 `style.css` 文件来自定义界面样式。

## 📖 使用说明

### 自动扫描

服务器会在每次页面加载时自动扫描 `output` 目录，无需手动操作。

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
- VPS (使用 PM2 管理进程)
- Heroku
- Vercel
- Railway
- 等等

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

[@vvhr](https://github.com/vvhr)

---

⭐ 如果这个项目对你有帮助，请给个 Star！
