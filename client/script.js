const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log('Connected to server');
};

ws.onmessage = (event) => {
    console.log('Received:', event.data);
    // 更新游戏界面
};

ws.onclose = () => {
    console.log('Disconnected from server');
};

// 示例：发送消息到服务器
function sendMessage(message) {
    ws.send(JSON.stringify(message));
}

// 示例：在连接建立后发送消息
ws.addEventListener('open', () => {
    sendMessage({ type: 'join', player: 'Player1' });
});
