const textInput = document.getElementById('textInput');
const wordCount = document.getElementById('wordCount');

textInput.addEventListener('input', () => {

    const text = textInput.value;
    
    const words = text.trim().split(/\s+/);
    
    const count = text === '' ? 0 : words.length;
    
    wordCount.textContent = count;
});
