function renderArchiveList(archives) {
    const archiveList = document.getElementById('archive-list')
    
    archives.forEach(archive => {
        const item = document.createElement('div')
        item.className = 'archive-item'
        
        // 格式化显示日期 (2024-12.md -> 2024年12月)
        const [year, month] = archive.replace('.md', '').split('-')
        item.textContent = `${year}年${month}月`
        
        item.addEventListener('click', () => loadAndDisplayMarkdown(archive))
        archiveList.appendChild(item)
    })
} 