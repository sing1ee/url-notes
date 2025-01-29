async function loadAndDisplayMarkdown(filename) {
    try {
        const response = await fetch(filename)
        if (!response.ok) throw new Error('Failed to load markdown file')
        
        const text = await response.text()
        const content = document.getElementById('content')
        content.innerHTML = marked.parse(text)
        content.style.display = 'block'
        
    } catch (error) {
        console.error('Error loading markdown:', error)
        document.getElementById('content').innerHTML = '<p>Error loading content</p>'
    }
} 