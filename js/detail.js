document.addEventListener('DOMContentLoaded', async () => {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search)
    const month = urlParams.get('m')
    
    if (!month) {
        window.location.href = '/index.html'
        return
    }
    
    // 更新页面标题
    const [year, monthNum] = month.split('-')
    document.getElementById('page-title').textContent = `${year}年${monthNum}月阅读笔记`
    
    // 加载对应的markdown文件
    await loadAndDisplayMarkdown(`${month}.md`)
}) 