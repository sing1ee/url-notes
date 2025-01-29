document.addEventListener('DOMContentLoaded', async () => {
    const archives = [
        '2024-12.md',
        '2025-01.md'
    ]
    
    renderArchiveList(archives)
    
    // 默认显示最新的文章
    if (archives.length > 0) {
        const latestArchive = archives[archives.length - 1]
        await loadAndDisplayMarkdown(latestArchive)
    }
}) 