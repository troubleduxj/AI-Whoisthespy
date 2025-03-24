const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());

// 处理保存模型配置的请求
app.post('/saveModelConfig', async (req, res) => {
    try {
        const configPath = path.join(__dirname, 'Model.json');
        await fs.writeFile(configPath, JSON.stringify(req.body, null, 4), 'utf8');
        res.json({ success: true });
    } catch (error) {
        console.error('Save config error:', error);
        res.status(500).json({ error: error.message });
    }
});

// ... 其他路由和服务器配置 ...