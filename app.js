// 标签页切换功能
function openTab(tabName) {
    // 隐藏所有标签页内容
    const tabContents = document.getElementsByClassName('tab-content');
    for (let content of tabContents) {
        content.classList.remove('active');
    }

    // 移除所有标签按钮的活动状态
    const tabButtons = document.getElementsByClassName('tabs')[0].getElementsByTagName('button');
    for (let button of tabButtons) {
        button.classList.remove('active');
    }

    // 显示选中的标签页
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // 设置对应按钮为活动状态
    const activeButton = document.querySelector(`button[data-tab="${tabName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// 添加标签页点击事件监听
// 页面加载时读取配置
document.addEventListener('DOMContentLoaded', async function() {
    // 加载配置文件
    try {
        const response = await fetch('Model.json');
        const config = await response.json();
        
        // 加载 DeepSeek 配置
        if (config.deepseek) {
            document.getElementById('deepseekBaseUrl').value = config.deepseek.baseUrl || '';
            document.getElementById('deepseekApiKey').value = config.deepseek.apiKey || '';
            document.getElementById('deepseekModel').value = config.deepseek.model || 'deepseek-chat';
            document.getElementById('deepseekColor').value = config.deepseek.color || '#007AFF';
            document.getElementById('deepseekPrompt').value = config.deepseek.prompt || '';
        }

        // 加载 Qwen 配置
        if (config.qwen) {
            document.getElementById('qwenBaseUrl').value = config.qwen.baseUrl || '';
            document.getElementById('qwenApiKey').value = config.qwen.apiKey || '';
            document.getElementById('qwenModel').value = config.qwen.model || 'qwen-turbo';
            document.getElementById('qwenColor').value = config.qwen.color || '#34C759';
            document.getElementById('qwenPrompt').value = config.qwen.prompt || '';
        }

        // 加载 Doubao 配置
        if (config.doubao) {
            document.getElementById('doubaoBaseUrl').value = config.doubao.baseUrl || '';
            document.getElementById('doubaoApiKey').value = config.doubao.apiKey || '';
            document.getElementById('doubaoModel').value = config.doubao.model || 'doubao-pro-32k-241215';
            document.getElementById('doubaoColor').value = config.doubao.color || '#5856D6';
            document.getElementById('doubaoPrompt').value = config.doubao.prompt || '';
        }
    } catch (error) {
        console.error('加载配置文件失败:', error);
    }

    const tabButtons = document.getElementsByClassName('tabs')[0].getElementsByTagName('button');
    for (let button of tabButtons) {
        button.addEventListener('click', function() {
            openTab(this.getAttribute('data-tab'));
        });
    }

    // 默认显示第一个标签页
    if (tabButtons.length > 0) {
        openTab(tabButtons[0].getAttribute('data-tab'));
    }
});

// DeepSeek API 验证
async function validateDeepseekAPI() {
    const baseUrl = document.getElementById('deepseekBaseUrl').value;
    const apiKey = document.getElementById('deepseekApiKey').value;
    const statusElement = document.getElementById('deepseekStatus');

    if (!baseUrl || !apiKey) {
        statusElement.textContent = '请填写完整的配置信息';
        statusElement.className = 'status-message status-error';
        return;
    }

    statusElement.textContent = '正在验证连接...';
    statusElement.className = 'status-message status-validating';

    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: document.getElementById('deepseekModel').value,
                messages: [{ role: "user", content: "Hello" }]
            })
        });

        if (response.ok) {
            statusElement.textContent = '连接验证成功！';
            statusElement.className = 'status-message status-success';
        } else {
            statusElement.textContent = '连接验证失败：' + (await response.text());
            statusElement.className = 'status-message status-error';
        }
    } catch (error) {
        statusElement.textContent = '连接验证失败：' + error.message;
        statusElement.className = 'status-message status-error';
    }
}

// Qwen API 验证
async function validateQwenAPI() {
    const baseUrl = document.getElementById('qwenBaseUrl').value;
    const apiKey = document.getElementById('qwenApiKey').value;
    const statusElement = document.getElementById('qwenStatus');

    if (!baseUrl || !apiKey) {
        statusElement.textContent = '请填写完整的配置信息';
        statusElement.className = 'status-message status-error';
        return;
    }

    statusElement.textContent = '正在验证连接...';
    statusElement.className = 'status-message status-validating';

    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: document.getElementById('qwenModel').value,
                messages: [{ role: "user", content: "Hello" }]
            })
        });

        if (response.ok) {
            statusElement.textContent = '连接验证成功！';
            statusElement.className = 'status-message status-success';
        } else {
            statusElement.textContent = '连接验证失败：' + (await response.text());
            statusElement.className = 'status-message status-error';
        }
    } catch (error) {
        statusElement.textContent = '连接验证失败：' + error.message;
        statusElement.className = 'status-message status-error';
    }
}

// Doubao API 验证
async function validateDoubaoAPI() {
    const baseUrl = document.getElementById('doubaoBaseUrl').value;
    const apiKey = document.getElementById('doubaoApiKey').value;
    const statusElement = document.getElementById('doubaoStatus');

    if (!baseUrl || !apiKey) {
        statusElement.textContent = '请填写完整的配置信息';
        statusElement.className = 'status-message status-error';
        return;
    }

    statusElement.textContent = '正在验证连接...';
    statusElement.className = 'status-message status-validating';

    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: document.getElementById('doubaoModel').value,
                messages: [{ role: "user", content: "Hello" }]
            })
        });

        if (response.ok) {
            statusElement.textContent = '连接验证成功！';
            statusElement.className = 'status-message status-success';
        } else {
            statusElement.textContent = '连接验证失败：' + (await response.text());
            statusElement.className = 'status-message status-error';
        }
    } catch (error) {
        statusElement.textContent = '连接验证失败：' + error.message;
        statusElement.className = 'status-message status-error';
    }
}

// 讨论状态标志
let isDiscussionActive = false;

// 调用模型API
async function callModelAPI(modelType, messages) {
    let baseUrl, apiKey, model, systemPrompt;
    
    // 检查模型是否启用
    const isEnabled = document.getElementById(`${modelType}Enabled`).checked;
    if (!isEnabled) {
        throw new Error(`${modelType} 模型未启用，无法参与讨论`);
    }
    
    // 获取模型配置
    switch(modelType) {
        case 'deepseek':
            baseUrl = document.getElementById('deepseekBaseUrl').value;
            apiKey = document.getElementById('deepseekApiKey').value;
            model = document.getElementById('deepseekModel').value;
            systemPrompt = document.getElementById('deepseekPrompt').value;
            break;
        case 'qwen':
            baseUrl = document.getElementById('qwenBaseUrl').value;
            apiKey = document.getElementById('qwenApiKey').value;
            model = document.getElementById('qwenModel').value;
            systemPrompt = document.getElementById('qwenPrompt').value;
            break;
        case 'doubao':
            baseUrl = document.getElementById('doubaoBaseUrl').value;
            apiKey = document.getElementById('doubaoApiKey').value;
            model = document.getElementById('doubaoModel').value;
            systemPrompt = document.getElementById('doubaoPrompt').value;
            break;
        default:
            throw new Error('未知的模型类型');
    }
    
    if (!baseUrl || !apiKey) {
        throw new Error(`${modelType} 模型配置不完整，请检查API设置`);
    }
    
    // 确保每次调用都包含系统提示词
    let finalMessages = [...messages];
    if (systemPrompt) {
        // 检查是否已经存在系统消息
        const hasSystemMessage = finalMessages.some(msg => msg.role === 'system');
        if (hasSystemMessage) {
            // 更新现有的系统消息
            finalMessages = finalMessages.map(msg => 
                msg.role === 'system' 
                    ? { ...msg, content: `${systemPrompt}\n${msg.content}` }
                    : msg
            );
        } else {
            // 添加新的系统消息到最前面
            finalMessages.unshift({ role: "system", content: systemPrompt });
        }
    }
    
    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: finalMessages
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API调用失败 (${response.status}): ${errorText}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error(`${modelType} API调用错误:`, error);
        throw new Error(`${modelType} 模型调用失败: ${error.message}`);
    }
}

// 开始讨论
async function startDiscussion() {
    const topic = document.getElementById('discussionTopic').value.trim();
    const conversationLog = document.getElementById('conversationLog');
    
    // 检查是否有模型被启用
    const deepseekEnabled = document.getElementById('deepseekEnabled').checked;
    const qwenEnabled = document.getElementById('qwenEnabled').checked;
    const doubaoEnabled = document.getElementById('doubaoEnabled').checked;
    
    if (!deepseekEnabled && !qwenEnabled && !doubaoEnabled) {
        alert('请至少启用一个模型参与讨论');
        return;
    }
    
    if (!topic) {
        alert('请输入讨论主题');
        return;
    }

    // 更新按钮状态
    document.querySelector('.start-discussion-btn').disabled = true;
    document.querySelector('.stop-discussion-btn').disabled = false;
    isDiscussionActive = true;

    // 清空之前的对话
    conversationLog.innerHTML = '';

    // 添加系统消息
    addMessage('system', `开始讨论主题：${topic}`);

    // 创建对话历史记录
    let conversationHistory = [
        { role: "system", content: "这是一个关于特定主题的讨论。" },
        { role: "user", content: `请讨论以下主题：${topic}` }
    ];

    // 获取启用状态
    const modelStates = {
        deepseek: document.getElementById('deepseekEnabled').checked,
        qwen: document.getElementById('qwenEnabled').checked,
        doubao: document.getElementById('doubaoEnabled').checked
    };

    // 模型名称映射
    const modelNames = {
        deepseek: 'DeepSeek模型',
        qwen: '通义千问模型',
        doubao: '豆包模型'
    };

    // 记录上一个发言的模型
    let lastSpeaker = null;
    let round = 1;

    try {
        while (isDiscussionActive) {
            let currentHistory = [...conversationHistory];
            const modelOrder = ['deepseek', 'qwen', 'doubao'];
            
            for (let modelType of modelOrder) {
                if (!isDiscussionActive) break;
                if (!modelStates[modelType]) continue; // 跳过未启用的模型

                try {
                    addMessage('system', `${modelNames[modelType]}正在思考...`);
                    
                    // 构建提示信息
                    let prompt = '';
                    if (round === 1) {
                        prompt = `请讨论主题：${topic}`;
                    } else if (lastSpeaker) {
                        // 获取上一个发言者的最新发言
                        const lastMessage = currentHistory.filter(msg => 
                            msg.role === "assistant" && 
                            msg.content !== undefined
                        ).pop();

                        if (lastMessage) {
                            // 针对上一个发言者的具体内容进行回应
                            prompt = `上一个发言者${modelNames[lastSpeaker]}说：${lastMessage.content}\n请以"@${modelNames[lastSpeaker]} "开头回应，先评价对方的观点，再发表你的看法。`;
                        }
                    }

                    // 更新历史记录中的用户提示
                    currentHistory.push({ role: "user", content: prompt });
                    
                    // 调用模型API
                    const response = await callModelAPI(modelType, currentHistory);
                    addMessage(modelType, response);
                    
                    // 更新对话历史
                    currentHistory.push({ role: "assistant", content: response });
                    conversationHistory = [...currentHistory];
                    
                    // 记录此次发言者为下一个模型的上一个发言者
                    lastSpeaker = modelType;

                } catch (error) {
                    addMessage('system', `${modelNames[modelType]}响应错误: ${error.message}`);
                }
            }
            
            round++;
            // 添加短暂延时，避免请求过于频繁
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } catch (error) {
        console.error('讨论过程出错:', error);
        addMessage('system', `错误：${error.message}`);
    } finally {
        if (isDiscussionActive) {
            addMessage('system', '讨论已完成');
            document.querySelector('.start-discussion-btn').disabled = false;
            document.querySelector('.stop-discussion-btn').disabled = true;
            isDiscussionActive = false;
        }
    }
}

// 停止讨论
function stopDiscussion() {
    isDiscussionActive = false;
    document.querySelector('.start-discussion-btn').disabled = false;
    document.querySelector('.stop-discussion-btn').disabled = true;
    addMessage('system', '讨论已结束');
}

// 清除聊天内容
function clearChat() {
    const conversationLog = document.getElementById('conversationLog');
    conversationLog.innerHTML = '<div class="empty-message">暂无对话记录</div>';
}

// 添加消息到对话记录
function addMessage(type, content) {
    const conversationLog = document.getElementById('conversationLog');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    // 系统消息不需要头像和名称
    if (type === 'system') {
        messageDiv.textContent = content;
    } else {
        // 创建头像元素
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        // 根据类型设置头像图片
        let avatarImage = '';
        switch(type) {
            case 'deepseek':
                avatarImage = 'image/deepseek.jpg';
                break;
            case 'qwen':
                avatarImage = 'image/qwen.jpg';
                break;
            case 'doubao':
                avatarImage = 'image/doubao.jpg';
                break;
        }
        avatarDiv.style.backgroundImage = `url('${avatarImage}')`;
        avatarDiv.style.backgroundSize = 'cover';
        avatarDiv.style.backgroundPosition = 'center';
        
        // 创建消息内容容器
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // 创建名称元素
        const nameDiv = document.createElement('div');
        nameDiv.className = 'message-name';
        
        // 创建消息气泡
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.textContent = content;
        
        // 根据类型设置名称
        let modelName = '';
        switch(type) {
            case 'deepseek':
                modelName = 'DeepSeek 模型';
                break;
            case 'qwen':
                modelName = '通义千问模型';
                break;
            case 'doubao':
                modelName = '豆包模型';
                break;
        }
        nameDiv.textContent = modelName;
        
        // 组装消息元素
        contentDiv.appendChild(nameDiv);
        contentDiv.appendChild(bubbleDiv);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
    }
    
    conversationLog.appendChild(messageDiv);
    conversationLog.scrollTop = conversationLog.scrollHeight;
}

// 模型讨论功能
async function startModelDiscussion(topic) {
    // 这里后续会实现模型间的对话逻辑
    // 暂时添加一个提示信息
    const conversationLog = document.getElementById('conversationLog');
    const message = document.createElement('div');
    message.className = 'message info';
    message.textContent = '模型对话功能即将实现...';
}

// 保存聊天记录
async function saveChat() {
    const conversationLog = document.getElementById('conversationLog');
    if (!conversationLog.children.length || conversationLog.children[0].classList.contains('empty-message')) {
        alert('没有可保存的对话记录');
        return;
    }

    // 创建要保存的对话内容
    let chatContent = '';
    const timestamp = new Date().toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/[\/\s:]/g, '');
    
    // 添加讨论主题
    const topic = document.getElementById('discussionTopic').value.trim();
    chatContent += `讨论主题：${topic}\n`;
    chatContent += `保存时间：${new Date().toLocaleString()}\n\n`;

    // 遍历所有消息
    for (const message of conversationLog.children) {
        if (message.classList.contains('empty-message')) continue;
        
        if (message.classList.contains('system')) {
            chatContent += `[系统] ${message.textContent}\n`;
        } else {
            const name = message.querySelector('.message-name')?.textContent || '';
            const content = message.querySelector('.message-bubble')?.textContent || '';
            chatContent += `[${name}] ${content}\n`;
        }
    }

    try {
        // 创建 Blob 对象
        const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' });
        
        // 创建下载链接
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `对话记录_${topic}_${timestamp}.txt`;
        
        // 触发下载
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // 释放 URL 对象
        URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
        console.error('保存对话记录失败:', error);
        alert('保存对话记录失败：' + error.message);
    }
}
