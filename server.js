const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// MIME类型映射
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// 扫描output目录获取新闻列表
function scanNewsDirectory() {
    // 读取父级目录下的 trendradar/output
    const outputDir = path.join(__dirname, '..', 'trendradar', 'output');
    const result = { dates: [] };

    try {
        if (!fs.existsSync(outputDir)) {
            console.log(`⚠️  未找到目录: ${outputDir}`);
            return result;
        }

        // 读取所有日期目录
        const dateDirs = fs.readdirSync(outputDir)
            .filter(item => {
                const fullPath = path.join(outputDir, item);
                return fs.statSync(fullPath).isDirectory();
            })
            .sort((a, b) => b.localeCompare(a)); // 按日期倒序排列

        // 遍历每个日期目录
        dateDirs.forEach(dateDir => {
            const htmlDir = path.join(outputDir, dateDir, 'html');
            
            if (fs.existsSync(htmlDir)) {
                const newsFiles = fs.readdirSync(htmlDir)
                    .filter(file => file.endsWith('.html'))
                    .sort((a, b) => b.localeCompare(a)); // 按时间倒序排列

                if (newsFiles.length > 0) {
                    const dateItem = {
                        date: dateDir,
                        news: newsFiles.map(file => ({
                            time: file.replace('.html', ''),
                            // 使用绝对路径，由 Node.js 服务器处理
                            path: `/trendradar/output/${dateDir}/html/${file}`
                        }))
                    };
                    result.dates.push(dateItem);
                }
            }
        });

        console.log(`📊 扫描完成: ${result.dates.length} 个日期，${result.dates.reduce((sum, d) => sum + d.news.length, 0)} 条新闻`);
        
    } catch (error) {
        console.error('❌ 扫描目录失败:', error);
    }

    return result;
}

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    // 解析URL，去掉查询参数
    const urlPath = req.url.split('?')[0];
    
    // 处理API请求 - 动态扫描新闻列表
    if (urlPath === '/api/news-list.json') {
        const newsList = scanNewsDirectory();
        res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        });
        res.end(JSON.stringify(newsList, null, 2));
        return;
    }

    // 处理 trendradar/output 目录的静态文件请求
    if (urlPath.startsWith('/trendradar/output/')) {
        const outputFilePath = path.join(__dirname, '..', decodeURIComponent(urlPath));
        const extname = String(path.extname(outputFilePath)).toLowerCase();
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(outputFilePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    console.log(`❌ 文件未找到: ${outputFilePath}`);
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end('<h1>404 - 页面未找到</h1><p>路径: ' + outputFilePath + '</p>', 'utf-8');
                } else {
                    console.log(`❌ 服务器错误: ${error.code} - ${outputFilePath}`);
                    res.writeHead(500);
                    res.end('服务器错误: ' + error.code);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
        return;
    }

    // 处理静态文件请求
    // 解码URL以支持中文路径
    let filePath = '.' + decodeURIComponent(urlPath);
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.log(`❌ 文件未找到: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - 页面未找到</h1><p>路径: ' + filePath + '</p>', 'utf-8');
            } else {
                console.log(`❌ 服务器错误: ${error.code} - ${filePath}`);
                res.writeHead(500);
                res.end('服务器错误: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// 启动服务器
server.listen(PORT, () => {
    console.log('');
    console.log('🚀 新闻门户服务器已启动！');
    console.log('');
    console.log(`📍 访问地址: http://localhost:${PORT}`);
    console.log('');
    console.log('💡 提示:');
    console.log('   - 服务器会自动扫描 output 目录');
    console.log('   - 每次刷新页面都会获取最新的新闻列表');
    console.log('   - 按 Ctrl+C 停止服务器');
    console.log('');
    
    // 初始扫描
    scanNewsDirectory();
});
