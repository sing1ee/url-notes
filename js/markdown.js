async function loadAndDisplayMarkdown(filename) {
    try {
        const response = await fetch(filename)
        if (!response.ok) throw new Error('Failed to load markdown file')
        
        const text = await response.text()
        // 解析文本为记录数组
        const records = parseMarkdownRecords(text)
        // 渲染记录为卡片列表
        renderRecordsToCards(records)
        
    } catch (error) {
        console.error('Error loading markdown:', error)
        document.getElementById('content').innerHTML = '<p>Error loading content</p>'
    }
}

function parseMarkdownRecords(text) {
    const records = []
    const lines = text.split('\n')
    let currentRecord = null
    
    for (const line of lines) {
        if (line.startsWith('## ')) {
            // 如果已有记录，保存它
            if (currentRecord) records.push(currentRecord)
            // 开始新记录
            currentRecord = {
                title: line.substring(3),
                time: '',
                note: ''
            }
        } else if (line.startsWith('- Time:') && currentRecord) {
            currentRecord.time = line.substring(8).trim()
        } else if (line.startsWith('- Note:') && currentRecord) {
            currentRecord.note = line.substring(8).trim()
        }
    }
    // 添加最后一条记录
    if (currentRecord) records.push(currentRecord)
    
    // 根据时间戳进行逆序排序
    return records.sort((a, b) => {
        const timeA = new Date(a.time).getTime()
        const timeB = new Date(b.time).getTime()
        return timeB - timeA  // 降序排列
    })
}

function renderRecordsToCards(records) {
    const content = document.getElementById('content')
    content.innerHTML = `
        <div class="cards-grid">
            ${records.map(record => `
                <div class="card">
                    <h3 class="card-title">
                        <a href="${extractUrl(record.title)}" target="_blank">
                            ${cleanTitle(record.title)}
                        </a>
                    </h3>
                    <div class="card-time">${formatTime(record.time)}</div>
                    <p class="card-note">${record.note}</p>
                </div>
            `).join('')}
        </div>
    `
    content.style.display = 'block'
}

function extractUrl(title) {
    // 提取markdown链接中的URL
    const match = title.match(/\[(.*?)\]\((.*?)\)/)
    return match ? match[2] : '#'
}

function cleanTitle(title) {
    // 清理markdown链接语法，只保留标题文本
    const match = title.match(/\[(.*?)\]/)
    return match ? match[1] : title
}

function formatTime(timeString) {
    // 格式化时间显示
    const date = new Date(timeString)
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
} 