const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];
let gameState = {
    players: [],
    deck: [],
    // ...其他游戏状态
};

// 设置静态文件目录
app.use(express.static(path.join(__dirname, '../client')));

wss.on('connection', (ws) => {
    clients.push(ws);
    console.log('New client connected');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        // 处理接收到的消息，根据游戏逻辑更新状态
        // 广播消息给所有客户端
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter(client => client !== ws);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
