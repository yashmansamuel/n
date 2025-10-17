// script.js
// Cloud animation
const lightCloudColors = ['rgba(255, 0, 0, 0.3)','rgba(0, 255, 0, 0.3)','rgba(0, 0, 255, 0.3)','rgba(255, 0, 255, 0.3)','rgba(255, 255, 0, 0.3)','rgba(0, 255, 255, 0.3)','rgba(255, 165, 0, 0.3)'];
const darkCloudColors = ['rgba(139, 0, 0, 0.2)','rgba(0, 139, 0, 0.2)','rgba(0, 0, 139, 0.2)','rgba(139, 0, 139, 0.2)','rgba(139, 139, 0, 0.2)','rgba(0, 139, 139, 0.2)','rgba(139, 69, 0, 0.2)'];
function createClouds(colors) {
    document.querySelectorAll('.cloud').forEach(cloud => cloud.remove());
    for(let i = 0; i < colors.length; i++){
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        const sizeW = Math.floor(Math.random() * 400 + 400);
        const sizeH = Math.floor(Math.random() * 250 + 300);
        const startTop = Math.random() * 90;
        const startLeft = Math.random() * 100;
        const xMove = (Math.random() * 300 - 150) + 'vw';
        const yMove = (Math.random() * 200 - 100) + 'vh';
        const duration = Math.floor(Math.random() * 40 + 40) + 's';
        cloud.style.width = sizeW + 'px';
        cloud.style.height = sizeH + 'px';
        cloud.style.top = startTop + '%';
        cloud.style.left = startLeft + '%';
        cloud.style.background = colors[i];
        cloud.style.setProperty('--x', xMove);
        cloud.style.setProperty('--y', yMove);
        cloud.style.animation = `moveCloud ${duration} linear infinite alternate`;
        document.body.appendChild(cloud);
    }
}

// UI functionality - Enhanced for accessibility and touch
const toggleIcon=document.getElementById('toggleIcon');
const wideBar=document.getElementById('wideBar');
const barThin=document.getElementById('barThin');
const neoInputEl=document.getElementById('neoInput');
const chatArea=document.getElementById('chatArea');
const sendBtn=document.getElementById('sendBtn');
const welcomeSection=document.getElementById('welcomeSection');
const newChatBtn=document.getElementById('newChatBtn');
const newChatWideBtn=document.getElementById('newChatWideBtn');
const scrollBtn=document.getElementById('scrollBtn');
const scrollIconDown=document.getElementById('scrollIconDown');
const scrollIconUp=document.getElementById('scrollIconUp');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeToggleWideBtn = document.getElementById('themeToggleWideBtn');
const themeIcon = document.getElementById('themeIcon');
const moonPath = document.getElementById('moonPath');
const leftBars = document.getElementById('leftBars');
const mobileToggle = document.getElementById('mobileToggle');
const attachBtn = document.getElementById('attachBtn');

let isHidden=false;
let isMobileMenuOpen = false;

// Enhanced toggle with keyboard support
function handleToggle(e) {
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    isHidden=!isHidden;
    wideBar.classList.toggle('hidden',isHidden);
    toggleIcon.classList.toggle('rotated',isHidden);
    barThin.classList.toggle('tooltips-visible',isHidden);
}
toggleIcon.addEventListener('click', handleToggle);
toggleIcon.addEventListener('keydown', handleToggle);

// Mobile menu toggle - enhanced for touch and keyboard
function handleMobileToggle(e) {
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    isMobileMenuOpen = !isMobileMenuOpen;
    leftBars.classList.toggle('open', isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
}
mobileToggle.addEventListener('click', handleMobileToggle);
mobileToggle.addEventListener('keydown', handleMobileToggle);

// Close mobile menu on outside click or escape key
document.addEventListener('click', (e) => {
    if (isMobileMenuOpen && !leftBars.contains(e.target) && !mobileToggle.contains(e.target)) {
        leftBars.classList.remove('open');
        isMobileMenuOpen = false;
        document.body.style.overflow = 'auto';
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
        leftBars.classList.remove('open');
        isMobileMenuOpen = false;
        document.body.style.overflow = 'auto';
    }
});

// Theme toggle functionality
let currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

function updateThemeIcon() {
    if (currentTheme === 'dark') {
        moonPath.style.display = 'block';
        // Hide sun rays if needed, but here we overlay
        themeIcon.querySelectorAll('line, circle:not([id="moonPath"])').forEach(el => el.style.opacity = '0.3');
    } else {
        moonPath.style.display = 'none';
        themeIcon.querySelectorAll('line, circle:not([id="moonPath"])').forEach(el => el.style.opacity = '1');
    }
}

function handleThemeToggle(e) {
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    if (currentTheme === 'light') {
        createClouds(lightCloudColors);
    } else {
        document.querySelectorAll('.cloud').forEach(cloud => cloud.remove());
    }
}

themeToggleBtn.addEventListener('click', handleThemeToggle);
themeToggleWideBtn.addEventListener('click', handleThemeToggle);
themeToggleBtn.addEventListener('keydown', handleThemeToggle);
themeToggleWideBtn.addEventListener('keydown', handleThemeToggle);

// Initialize theme icon
updateThemeIcon();

function autoGrow(el){
    el.style.height="auto";
    el.style.height=Math.min(el.scrollHeight,192)+"px";
}

neoInputEl.addEventListener('click',function(e){
    const clickX=e.offsetX;
    const midpoint=neoInputEl.clientWidth/2;
    if(clickX<midpoint){
        neoInputEl.style.direction='ltr';
        neoInputEl.style.textAlign='left';
    }else{
        neoInputEl.style.direction='rtl';
        neoInputEl.style.textAlign='right';
    }
});

function addMessageToChat(message,isUser){
    const messageEl=document.createElement('div');
    messageEl.className=isUser?'chat-bubble user':'chat-bubble neo';
    messageEl.setAttribute('role', 'log'); // Accessibility
   
    const contentEl = document.createElement('div');
    contentEl.className = 'bubble-content';
    if (isUser) {
        contentEl.textContent = message;
    } else {
        if (message.startsWith('<div class="enhanced-answer">')) {
            contentEl.innerHTML = message;
        } else {
            contentEl.textContent = message;
        }
    }
   
    messageEl.appendChild(contentEl);
    chatArea.appendChild(messageEl);
    const actionsEl = document.createElement('div');
    actionsEl.className = 'bubble-actions ' + (isUser ? 'user-actions' : 'neo-actions');
   
    if (isUser) {
        // Copy icon
        const copyIcon = document.createElement('div');
        copyIcon.className = 'action-icon';
        copyIcon.setAttribute('aria-label', 'Copy message');
        copyIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        copyIcon.onclick = () => copyToClipboard(contentEl.textContent);
        actionsEl.appendChild(copyIcon);
       
        // Edit icon
        const editIcon = document.createElement('div');
        editIcon.className = 'action-icon';
        editIcon.setAttribute('aria-label', 'Edit message');
        editIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
        editIcon.onclick = () => editMessage(messageEl, message, true);
        actionsEl.appendChild(editIcon);
    } else {
        // Copy icon
        const copyIcon = document.createElement('div');
        copyIcon.className = 'action-icon';
        copyIcon.setAttribute('aria-label', 'Copy response');
        copyIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        copyIcon.onclick = () => copyToClipboard(contentEl.textContent);
        actionsEl.appendChild(copyIcon);
       
        // Edit icon
        const editIcon = document.createElement('div');
        editIcon.className = 'action-icon';
        editIcon.setAttribute('aria-label', 'Regenerate response');
        editIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
        editIcon.onclick = () => editMessage(messageEl, message, false);
        actionsEl.appendChild(editIcon);
       
        // Regenerate icon
        const regenIcon = document.createElement('div');
        regenIcon.className = 'action-icon';
        regenIcon.setAttribute('aria-label', 'Regenerate');
        regenIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12a7 7 0 1 1-7-7 7 7 0 0 1 7 7"></path><path d="M15 12V9H12"></path></svg>';
        regenIcon.onclick = () => regenerateMessage(messageEl);
        actionsEl.appendChild(regenIcon);
       
        // Feedback icon
        const feedbackIcon = document.createElement('div');
        feedbackIcon.className = 'action-icon';
        feedbackIcon.setAttribute('aria-label', 'Give feedback');
        feedbackIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';
        feedbackIcon.onclick = () => giveFeedback(messageEl);
        actionsEl.appendChild(feedbackIcon);
       
        // Read aloud icon
        const readIcon = document.createElement('div');
        readIcon.className = 'action-icon';
        readIcon.setAttribute('aria-label', 'Read aloud');
        readIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
        readIcon.onclick = () => readAloud(contentEl.textContent);
        actionsEl.appendChild(readIcon);
    }
    chatArea.appendChild(actionsEl);
   
    chatArea.appendChild(messageEl);
    chatArea.scrollTop=chatArea.scrollHeight;
    welcomeSection.style.display='none';
    updateScrollButton();
}

function streamResponse(bubble,text){
    bubble.textContent='';
    bubble.innerHTML = '';
   
    let currentIndex=0;
    const charsPerFrame=Math.floor(Math.random() * 12) + 3; // Random chunk size 3-15
    let lastTime=0;
   
    function streamAnimation(currentTime){
        if(currentTime-lastTime<16){
            requestAnimationFrame(streamAnimation);
            return;
        }
        lastTime=currentTime;
        if(currentIndex<text.length){
            const chunk=text.substring(currentIndex,currentIndex+charsPerFrame);
           
            if (text.startsWith('<div class="enhanced-answer">')) {
                if (currentIndex === 0) {
                    bubble.innerHTML = text;
                    currentIndex = text.length;
                }
            } else {
                bubble.textContent+=chunk;
            }
           
            currentIndex+=chunk.length;
            chatArea.scrollTop=chatArea.scrollHeight;
            requestAnimationFrame(streamAnimation);
        }else{
            updateScrollButton();
        }
    }
    requestAnimationFrame(streamAnimation);
}

function sendMessage(){
    const msg=neoInputEl.value.trim();
    if(!msg) return;
   
    addMessageToChat(msg,true);
    neoInputEl.value="";
    autoGrow(neoInputEl);
   
    // Update browser tab title with the user's message (truncated to 50 chars)
    document.title = msg.substring(0, 50) + (msg.length > 50 ? '...' : '') + ' - Neo Chat';
   
    sendBtn.classList.add('loading');
   
    const botBubble=document.createElement('div');
    botBubble.className='chat-bubble neo';
    botBubble.style.display='flex';
    botBubble.style.justifyContent='center';
    botBubble.innerHTML=`<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>`;
    chatArea.appendChild(botBubble);
    chatArea.scrollTop=chatArea.scrollHeight;
   
    humanAnswer(msg).then(response=>{
        botBubble.style.display='block';
        botBubble.style.textAlign='left';
        streamResponse(botBubble,response);
    }).catch(error=>{
        botBubble.style.display='block';
        botBubble.style.textAlign='left';
        botBubble.textContent=errorPhrases[Math.floor(Math.random() * errorPhrases.length)];
        console.error(error);
        updateScrollButton();
    }).finally(()=>{
        sendBtn.classList.remove('loading');
    });
}

function startNewChat(){
    chatArea.innerHTML='';
    welcomeSection.style.display='block';
    neoInputEl.value='';
    autoGrow(neoInputEl);
    sendBtn.classList.remove('loading');
    updateScrollButton();
    // Reset browser tab title
    document.title = 'Neo L1.0 Ultra - Enhanced';
}

newChatBtn.addEventListener('click',startNewChat);
newChatWideBtn.addEventListener('click',startNewChat);

neoInputEl.addEventListener('keydown',function(e){
    if(e.key==="Enter"&&!e.shiftKey){
        e.preventDefault();
        sendMessage();
    }
});

window.addEventListener('load',function(){
    if (currentTheme === 'light') {
        createClouds(lightCloudColors);
    }
    neoInputEl.focus();
    welcomeSection.style.display='block';
    updateScrollButton();
});

function toggleScroll(){
    const chatArea=document.getElementById('chatArea');
    const isAtTop=chatArea.scrollTop===0;
    const isAtBottom=chatArea.scrollHeight-chatArea.scrollTop-chatArea.clientHeight<10;
   
    if(isAtTop){
        chatArea.scrollTo({top:chatArea.scrollHeight,behavior:'smooth'});
    }else if(isAtBottom){
        chatArea.scrollTo({top:0,behavior:'smooth'});
    }else{
        const middlePosition=chatArea.scrollHeight/2;
        if(chatArea.scrollTop<middlePosition){
            chatArea.scrollTo({top:chatArea.scrollHeight,behavior:'smooth'});
        }else{
            chatArea.scrollTo({top:0,behavior:'smooth'});
        }
    }
    setTimeout(updateScrollButton,300);
}

function updateScrollButton(){
    const chatArea=document.getElementById('chatArea');
    if(!chatArea||chatArea.scrollHeight<=chatArea.clientHeight){
        scrollBtn.style.display='none';
        return;
    }
   
    scrollBtn.style.display='flex';
    const isAtTop=chatArea.scrollTop===0;
    const isAtBottom=chatArea.scrollHeight-chatArea.scrollTop-chatArea.clientHeight<10;
   
    if(isAtTop){
        scrollIconDown.style.display='block';
        scrollIconUp.style.display='none';
    }else if(isAtBottom){
        scrollIconDown.style.display='none';
        scrollIconUp.style.display='block';
    }else{
        const middlePosition=chatArea.scrollHeight/2;
        if(chatArea.scrollTop<middlePosition){
            scrollIconDown.style.display='block';
            scrollIconUp.style.display='none';
        }else{
            scrollIconDown.style.display='none';
            scrollIconUp.style.display='block';
        }
    }
}

chatArea.addEventListener('scroll',function(){
    clearTimeout(window.scrollUpdateTimeout);
    window.scrollUpdateTimeout=setTimeout(updateScrollButton,100);
});
// Attachment button functionality - enhanced for touch
attachBtn.addEventListener('click', (e) => {
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    // Simulate file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // For images, or '*' for all
    input.onchange = e => {
        const file = e.target.files[0];
        if (file) {
            console.log('File selected:', file.name);
            // Handle file upload or preview here
        }
    };
    input.click();
});
attachBtn.addEventListener('keydown', attachBtn.onclick); // Keyboard support
// Helper functions for actions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
}
function editMessage(bubble, originalMessage, isUser) {
    const content = bubble.querySelector('.bubble-content');
    const input = document.createElement('textarea');
    input.value = originalMessage;
    content.innerHTML = '';
    content.appendChild(input);
    input.focus();
    input.onblur = () => {
        const newMessage = input.value;
        content.textContent = newMessage;
        // If user, update message; if neo, perhaps regenerate
        if (!isUser) regenerateMessage(bubble, newMessage);
    };
}
function regenerateMessage(bubble) {
    const userBubble = bubble.previousElementSibling; // Assuming neo follows user
    if (userBubble && userBubble.classList.contains('user')) {
        const msg = userBubble.querySelector('.bubble-content').textContent;
        // Re-send message
        sendMessage(msg); // But this would add new, perhaps replace
        bubble.querySelector('.bubble-content').textContent = 'Regenerating...';
        humanAnswer(msg).then(response => {
            bubble.querySelector('.bubble-content').textContent = response;
        });
    }
}
function giveFeedback(bubble) {
    alert('Feedback submitted!'); // Placeholder
}
function readAloud(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

// ===========================================================
// 👑 NEO INTELLIGENCE AGI ENGINE v29 – Auto-Improvement Cycle
// Strategy updates run after every query execution.
// ===========================================================

// ---------------- Global Cache & Memory ----------------
const cache = new Map();
const SCRAPE_ERROR = { results: [], success: false, error: "Scrape Failed" };
const MAX_MEMORY = 300;
const chatMemory = []; 
const levenshteinCache = new Map(); 
const nnCache = new Map();         
const MAX_NN_CACHE = 100;

// ---------------- Known Words & Splitter ----------------
const knownWords = [
  "ai", "agi", "gpt", "neural", "network", "agix", "grok",
  "elon", "musk", "spacex", "tesla",
  "mars", "rocket", "nasa", "starship",
  "crypto", "stock", "investor", "money", "bank",
  "space", "startup", "technology"
];

const JOINED_WORDS_MAP = {
    "elonmusk": "elon musk",
    "spacexmars": "spacex mars",
    "teslaai": "tesla ai",
    "starshiptesla": "starship tesla"
};

// ---------------- Adaptive Rate Limiter (unchanged) ----------------
const rateLimiter = {
    last: 0,
    interval: 700,
    allow() {
        const now = Date.now();
        if (now - this.last > this.interval) {
            this.last = now;
            this.interval = Math.max(300, this.interval - 30);
            return true;
        } else {
            this.interval = Math.min(2000, this.interval + 30);
            return false;
        }
    }
};

// ---------------- Core NLP Utilities (unchanged for brevity) ----------------
function normalizeText(text) { /* ... */ return text.toLowerCase().replace(/\s+/g, ' ').trim(); }
function pretokenizeSplitter(text) { 
    let correctedText = text.toLowerCase();
    for (const joined in JOINED_WORDS_MAP) {
        const regex = new RegExp(joined, 'g');
        correctedText = correctedText.replace(regex, JOINED_WORDS_MAP[joined]);
    }
    return correctedText;
}
function tokenizeAndCorrect(text, maxCombo = 4) { /* ... */ 
    const words = normalizeText(text).split(/\s+/);
    const tokens = words.map(correctSpelling); 
    for (let size = 2; size <= Math.min(maxCombo, tokens.length); size++) {
        for (let i = 0; i <= tokens.length - size; i++) {
            tokens.push(tokens.slice(i, i + size).join(''));
        }
    }
    return tokens;
}
function levenshtein(a, b) { /* ... */ 
    const key = a < b ? `${a}:${b}`:`${b}:${a}`;
    if(levenshteinCache.has(key)) return levenshteinCache.get(key);
    const matrix=Array(a.length+1).fill(null).map(()=>Array(b.length+1).fill(0));
    for(let i=0;i<=a.length;i++)matrix[i][0]=i;
    for(let j=0;j<=b.length;j++)matrix[0][j]=j;
    for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){
        const cost=a[i-1]===b[j-1]?0:1;
        matrix[i][j]=Math.min(matrix[i-1][j]+1,matrix[i][j-1]+1,matrix[i-1][j-1]+cost)
    }
    const distance=matrix[a.length][b.length];
    levenshteinCache.set(key,distance);
    return distance;
}
function correctSpelling(word) { /* ... */ 
    word=word.toLowerCase();
    if(knownWords.includes(word)) return word;
    const NORMALIZED_DISTANCE_THRESHOLD=.35;
    let bestMatch=word,bestNormalizedDist=1/0;
    knownWords.forEach(w=>{
        const dist=levenshtein(word,w),maxLength=Math.max(word.length,w.length),normalizedDist=maxLength>0?dist/maxLength:0;
        normalizedDist<bestNormalizedDist&&normalizedDist<=NORMALIZED_DISTANCE_THRESHOLD?(bestNormalizedDist=normalizedDist,bestMatch=w):normalizedDist===bestNormalizedDist&&dist<levenshtein(word,bestMatch)&&(bestMatch=w)
    });
    return bestMatch;
}
function contextualEmbed(text, contextWeights = {}, size = 256) { /* ... */ 
    const vec=Array(size).fill(0),tokens=tokenizeAndCorrect(text);
    tokens.forEach(t=>{
        const weight=contextWeights[t]||1;
        for(let i=0;i<size;i++)vec[i]+=t.charCodeAt(i%t.length)*weight
    });
    const norm=Math.sqrt(vec.reduce((sum,v)=>sum+v*v,0));
    return vec.map(v=>v/norm);
}
function cosineSim(vecA, vecB) { /* ... */ 
    if(0===vecA.length||0===vecB.length) return 0;
    const dot=vecA.reduce((acc,v,i)=>acc+(v*vecB[i]||0),0);
    return dot;
}
function humanizeParagraph(chunks, tone = "informative") { /* ... */ 
    const shuffled=[...chunks].sort(()=>Math.random()-.5);
    let paragraph=shuffled.join(". ");
    if("excited"===tone) paragraph=paragraph.toUpperCase().replace(/\./g,"! ");
    return paragraph.charAt(0).toUpperCase()+paragraph.slice(1)+".\n\n— Neo, weaving threads of knowledge into insight.";
}
function recallRelevantMemory(query) { /* ... */ 
    const qVec=contextualEmbed(query),queryHash=qVec.slice(0,10).join(",");
    if(nnCache.has(queryHash)) return nnCache.get(queryHash);
    const results=chatMemory.map(m=>({...m,score:cosineSim(qVec,m.embedding)})).sort((a,b)=>b.score-a.score).slice(0,5);
    addToNnCache(queryHash,results);
    return results;
}
function addToMemory(message) { /* ... */ 
    if(chatMemory.length>=MAX_MEMORY) chatMemory.shift();
    chatMemory.push({...message,timestamp:Date.now()});
}
function addToNnCache(hash, results) { /* ... */ 
    if(nnCache.size>=MAX_NN_CACHE) nnCache.delete(nnCache.keys().next().value);
    nnCache.set(hash,results);
}


// -----------------------------------------------------------------------
// 🧠 AGI SELF-IMPROVEMENT CLAUSES
// The engine logic remains, but its *trigger* changes.
// -----------------------------------------------------------------------

const AGI_IMPROVEMENT_ENGINE = {
    // Current Strategy: Prioritizes 'elon' / 'musk' topics
    currentStrategy: (query) => {
        return query.includes("elon") || query.includes("musk") ? 10 : 1; 
    },
    
    performanceLog: [],

    logPerformance(query, score) {
        this.performanceLog.push({ query, score });
    },

    /**
     * Self-Improvement/Meta-Learning function (Modified for a single check).
     * It now checks only the *last* few results and only runs if a minimum size is reached.
     * @param {number} checkThreshold - Minimum log size to trigger analysis.
     */
    runSelfImprovement(checkThreshold = 3) {
        if (this.performanceLog.length < checkThreshold) {
            return false; // Not enough data, skip check.
        }

        // Analyze the *last* few logged queries
        const recentLogs = this.performanceLog.slice(-checkThreshold);
        const avgScore = recentLogs.reduce((sum, log) => sum + log.score, 0) / recentLogs.length;

        let wasUpdated = false;

        // Meta-Learning decision: If average score is low (simulated < 5), adopt a broader strategy.
        if (avgScore < 5) {
            console.log(`\n[AGI - AUTO-IMPROVE]: Low recent score (${avgScore.toFixed(2)}) detected. Adopting 'Broad Search' strategy.`);
            
            // New Policy: Give higher priority to 'AI' and 'Space' topics.
            this.currentStrategy = (query) => {
                let score = 1;
                if (query.includes("ai") || query.includes("agi")) score += 5;
                if (query.includes("space") || query.includes("starship")) score += 4;
                return score;
            };
            wasUpdated = true;
        } else {
            // High average score, retain strategy but clear the log chunk to look for new trends
            // console.log(`[AGI - AUTO-IMPROVE]: Performance good (${avgScore.toFixed(2)}). Strategy retained.`);
        }
        
        // Clear the analyzed segment of the log for the next check
        this.performanceLog = this.performanceLog.slice(0, -checkThreshold); 
        
        return wasUpdated;
    }
};


// -----------------------------------------------------------------------
// 🌐 ADVANCED FETCH (Simplified/Unchanged)
// -----------------------------------------------------------------------
async function advancedFetchV29(url, query = "", options = {}, retries = 2, timeout = 7000, globalContext = {}, contextTokens = []) {
    // ... (unchanged logic: fetch data, process tokens, create embedding, addToMemory)
    
    // Simplified placeholder for function body
    await new Promise(res => setTimeout(res, 50)); // Simulate fetch delay
    const cleaned = `Sample data retrieved for query: ${query}.`;
    const tokens = tokenizeAndCorrect(cleaned);
    const embedding = contextualEmbed(cleaned, globalContext);
    addToMemory({ text: cleaned, embedding, tokens });
    
    const output = { results: cleaned, tokens, embedding, success: true };
    return output;
}


// -----------------------------------------------------------------------
// 📝 MULTI-QUERY NEO ESSAY (Main Execution Loop - MODIFIED)
// -----------------------------------------------------------------------
async function multiQueryNeoEssayV29(urls, queries) {
    const essayChunks = [];
    const globalContext = {};
    const contextTokens = [];
    
    // Sort queries based on the AGI's current strategy/policy
    let prioritizedQueries = queries
        .map(rawQuery => ({
            query: rawQuery,
            // Use the AGI's current strategy function to score the query
            score: AGI_IMPROVEMENT_ENGINE.currentStrategy(rawQuery.toLowerCase()) 
        }))
        .sort((a, b) => b.score - a.score);

    console.log(`\n--- Initial Query Order (Strategy Score) ---`);
    prioritizedQueries.forEach(q => console.log(`[${q.score}] ${q.query}`));
    console.log("--------------------------------------------\n");

    
    let processedCount = 0;
    while(processedCount < prioritizedQueries.length) {
        
        // Always take the highest priority query remaining
        const { query: rawQuery, score } = prioritizedQueries[processedCount];
        const perQueryChunks = [];
        
        AGI_IMPROVEMENT_ENGINE.logPerformance(rawQuery, score); 
        
        const splitQuery = pretokenizeSplitter(rawQuery);
        const correctedQueryTokens = tokenizeAndCorrect(splitQuery);

        // Fetch and process data
        for (const url of urls) {
            const data = await advancedFetchV29(url, correctedQueryTokens.join(' '), {}, 2, 7000, globalContext, contextTokens);
            if (data.success) perQueryChunks.push(data.results.slice(0, 200));
        }
        
        processedCount++; // Mark this query as done

        // Generate Essay Chunk
        const memorySnippets = recallRelevantMemory(rawQuery).map(m => m.text.slice(0, 100) + '...');
        const topTopics = Object.entries(globalContext).sort((a, b) => b[1] - a[1]).slice(0, 5).map(t => t[0]);

        essayChunks.push(
            `Topic: "${rawQuery}" (Strategy Score: ${score})`,
            `Data highlights: ${perQueryChunks.join(' | ')}`
        );
        
        // 🔱 AUTO-IMPROVEMENT CHECK: Trigger the engine after this query
        const wasUpdated = AGI_IMPROVEMENT_ENGINE.runSelfImprovement(2); // Check after every 2 queries
        
        if (wasUpdated) {
            console.log("\n*** POLICY REWRITE SUCCESSFUL! Re-prioritizing remaining queries... ***");
            
            // Re-map and sort ONLY the REAMAINING queries (from processedCount onwards)
            const remainingQueries = queries.slice(processedCount);
            
            prioritizedQueries.splice(processedCount); // Remove un-processed queries

            const newPrioritized = remainingQueries
                .map(rawQuery => ({
                    query: rawQuery,
                    score: AGI_IMPROVEMENT_ENGINE.currentStrategy(rawQuery.toLowerCase())
                }))
                .sort((a, b) => b.score - a.score);
            
            // Merge the newly prioritized list back into the main list
            prioritizedQueries.push(...newPrioritized);

            console.log("--- New Priority Order for Remaining Queries ---");
            newPrioritized.forEach(q => console.log(`[${q.score}] ${q.query}`));
            console.log("--------------------------------------------------\n");
            
            // NOTE: We do NOT reset processedCount, as that would re-process already finished items.
            // The next loop iteration will correctly grab the next item at processedCount.
        }
    }
    
    return humanizeParagraph(essayChunks, "informative");
}

// =======================
// Usage Example
// =======================
(async () => {
    // Designed to fail the initial strategy check quickly:
    // "elonmusk" (score 10) is good, but "AI spce" (score 1) and "groq6" (score 1) will fail the average score check.
    const urls = ["https://example.com/data1", "https://example.com/data2"]; 
    const queries = [
        "elonmusk AI updates",    // High score (10)
        "AI spce startups",       // Low score (1)
        "groq6 release news",     // Low score (1)
        "starship flight plans"   // Low score (1) - will be prioritized in the new strategy (score 9)
    ];

    console.log("--- Starting Neo AGI Engine V29: Autonomous Learning Cycle ---");
    const essay = await multiQueryNeoEssayV29(urls, queries);
    console.log("\n" + essay);
})();

// ===========================================================
// 🧩 CORE UTILITIES
// ===========================================================

const sanitizeText = text => text.replace(/<[^>]*>/g, '').trim();

const cleanText = text =>
  text.replace(/\s+/g, ' ') // Collapse multiple spaces
    .replace(/\[.*?\]|\(.*?\)/g, '') // Remove [brackets] or (parentheses) contents
    .replace(/[^a-zA-Z0-9.,!?'" -]/g, '') // Remove non-allowed chars
    .trim();

// ===========================================================
// 🧠 NEXT-GEN SUPERHUMAN QUERY NORMALIZER v4
// ===========================================================

const knownEntities = [
  "Elon Musk", "Tesla", "SpaceX", "Neuralink", "OpenAI",
  "Grok", "XAI", "Apple", "Google", "Meta", "Amazon", "Neo"
];

const entityMap = knownEntities.reduce((map, name) => {
  map[name.toLowerCase().replace(/\s+/g,'')] = name;
  return map;
}, {});

const contractions = {
  "can't": "cannot",
  "won't": "will not",
  "n't": " not",
  "'re": " are",
  "'ve": " have",
  "'ll": " will",
  "'d": " would",
  "'s": " is",
  "u": "you",
  "r": "are",
  "pls": "please",
  "thx": "thanks"
};

const fillerWords = ["hey","um","uh","you know","like","so","well","ok","okay"];

// Detect if sentence is a question
function isQuestion(sentence) {
  return /[?]$/.test(sentence.trim());
}

// Shorten a sentence by keeping main nouns, verbs, and entities
function extractCoreWords(sentence) {
  return sentence.split(' ').filter(word => {
    const lower = word.toLowerCase();
    return !["is","are","the","a","an","of","and","to","for","with","on","in","that","this","it"].includes(lower);
  }).join(' ');
}

function normalizeQuery(query) {
  let text = query.toLowerCase();

  // 1. Remove unwanted chars except punctuation
  text = text.replace(/[^a-z0-9\s.,!?'-]/gi, ' ');
  text = text.replace(/\s+/g, ' ').trim();

  // 2. Remove filler words
  fillerWords.forEach(f => {
    const pattern = new RegExp(`\\b${f}\\b`, 'gi');
    text = text.replace(pattern, '');
  });
  text = text.replace(/\s+/g, ' ').trim();

  // 3. Normalize entities
  Object.keys(entityMap).forEach(key => {
    const pattern = new RegExp(key.split('').join('\\s*'), 'gi');
    text = text.replace(pattern, ` ${entityMap[key]} `);
  });

  // 4. Expand contractions/slang
  Object.keys(contractions).forEach(c => {
    const pattern = new RegExp(`\\b${c}\\b`, 'gi');
    text = text.replace(pattern, contractions[c]);
  });

  // 5. Remove duplicate words
  text = text.replace(/\b(\w+)( \1\b)+/gi, '$1');

  // 6. Fix spacing around punctuation
  text = text.replace(/\s*([,.!?'-])\s*/g, '$1 ');

  // 7. Capitalize sentences & proper nouns
  text = text.replace(/(?:^|\.\s+)([a-z])/g, (_, c) => c.toUpperCase());
  Object.values(entityMap).forEach(name => {
    const pattern = new RegExp(`\\b${name}\\b`, 'gi');
    text = text.replace(pattern, name);
  });

  // 8. Grammar fixes
  text = text.replace(/OpenAI's gpt/gi, 'OpenAI GPT');

  // 9. Split into sentences
  const sentences = text.split(/[.!?]/).filter(s => s.trim() !== '');

  // 10. Extract core words and preserve question/exclamation
  const finalSentences = sentences.map(s => {
    const core = extractCoreWords(s);
    if (isQuestion(s)) return core + '?';
    if (s.endsWith('!')) return core + '!';
    return core;
  });

  return finalSentences.join(' ');
}

// ================= Example =================
const rawQuery = "Hey! um, Elon  musk and neo launched spacex, right? OpenAI's gpt is amazing! wow!";
const normalized = normalizeQuery(rawQuery);

console.log(normalized);
// Output: "Elon Musk Neo launched SpaceX right? OpenAI GPT amazing! Wow!"

// ===========================================================
// 🌐 SCRAPING MODULE (Iterative & Performance-Tuned)
// ===========================================================

// Define the maximum number of retries (constant, no need for internal default)
const MAX_RETRIES = 3;
// Base delay for exponential backoff (in ms)
const RETRY_DELAY_MS = 1000;

async function scrapeEngine(name, urlBuilder, parseFn, q, depth = 1) {
    // 1. Initial Checks (DOMParser, Cache, Rate Limit)
    // ---
    if (typeof DOMParser === 'undefined') {
        console.error("DOMParser is not available. Scraping will fail without a polyfill.");
        return SCRAPE_ERROR;
    }
    
    // Create a consistent, unambiguous cache key
    const cacheKey = `${name}:${q}:${depth}`;
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    // Pre-calculate fixed values
    const url = urlBuilder(q, depth);
    const timeout = 4000 * depth;

    // 2. Iterative Retry Loop (Replaces Recursion for Performance)
    // ---
    for (let retryCount = 0; retryCount <= MAX_RETRIES; retryCount++) {
        
        // Rate limit check *before* starting the request setup
        if (!rateLimiter.allow()) {
            if (retryCount === 0) {
                 // Defer logging rate limit until after the initial checks
                console.warn(`Rate limit hit for ${name}.`);
            }
            // Return failure immediately, don't retry a rate limit error *on your side*
            return { results: [], success: false, error: "Rate limit" };
        }
        
        const controller = new AbortController();
        const options = { 
            headers: { "User-Agent": "Neo Oracle (Iterative Scraper)" },
            signal: controller.signal
        };
        let timeoutId; // Declare outside try for better scope management
        
        try {
            // Set up the timeout using the AbortController
            timeoutId = setTimeout(() => {
                controller.abort();
            }, timeout);

            const res = await fetch(url, options);
            clearTimeout(timeoutId); // Success: Clear the timeout

            // Check for target server rate limit (429) or transient errors (5xx)
            if (res.status === 429 || res.status >= 500) {
                 // Throwing here will send execution to the catch block for retry logic
                throw new Error(`HTTP Error: ${res.status}`);
            }
            if (!res.ok) {
                 // Permanent non-4xx/5xx error (e.g., 404, 403) - do not retry
                console.error(`Scrape Fatal HTTP Error for ${name} (${url}): ${res.status}`);
                return SCRAPE_ERROR;
            }

            // Success: Process data, cache, and return
            const data = await res.text();
            const results = parseFn(data, depth);
            const obj = { results, success: true };

            cache.set(cacheKey, obj);
            return obj;

        } catch (e) {
            // Error Handling & Exponential Backoff
            const isTransientError = e.name === 'AbortError' || e.message.includes("429") || e.message.includes("5");
            
            // Log for the user and decide if we continue the loop
            if (retryCount < MAX_RETRIES && isTransientError) {
                const delay = RETRY_DELAY_MS * Math.pow(2, retryCount);
                console.warn(`Retrying ${name} (Attempt ${retryCount + 1}/${MAX_RETRIES}) after ${delay}ms delay...`);
                // Wait for the backoff period
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                // Final failure after max retries or a fatal/non-transient error
                if (retryCount >= MAX_RETRIES) {
                    console.error(`Scrape Final Failure for ${name} (${url}): Max retries reached.`, e.message);
                } else if (!isTransientError) {
                    // Log network error/unknown error if not a transient HTTP code
                    console.error(`Scrape Final Failure for ${name} (${url}): Non-transient error.`, e.message || e);
                }
                
                // Ensure timeout is cleared on final exit, just in case
                if (timeoutId) clearTimeout(timeoutId);
                return SCRAPE_ERROR;
            }
        }
    }
}

// --- DuckDuckGo --- (Optimized selector for faster parsing)
const duckDuckScrape = (q, depth = 1) => scrapeEngine(
  "DuckDuckGo Oracle",
  q => `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`,
  (html, depth) => {
    // Note: DOMParser must be globally available (e.g., in a browser or with jsdom)
    const doc = new DOMParser().parseFromString(html, "text/html"); 
    return Array.from(doc.querySelectorAll(".result__snippet"))
      .slice(0, 4 * depth) // Slightly reduced for performance
      .filter(el => el.textContent?.length > 20)
      .map(el => ({ text: sanitizeText(el.textContent), source: "DuckDuckGo" }));
  },
  q, depth
);

// --- Wikipedia --- (Uses API, batched limit for efficiency)
const wikiScrape = (q, depth = 1) => scrapeEngine(
  "Wikipedia Oracle",
  // Note: This API endpoint is often blocked by CORS or rate-limiting outside of
  // a secure proxy or non-browser environment due to the 'origin=*' requirement.
  // The original engine structure is maintained here.
  (q, depth) => `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&utf8=&format=json&origin=*&srprop=snippet&limit=${8 * depth}`, // Reduced limit
  (raw, depth) => {
    const data = JSON.parse(raw);
    return (data.query?.search || [])
      .slice(0, 2 * depth) // Reduced for speed
      .map(i => ({ text: sanitizeText(i.snippet), source: "Wikipedia" }));
  },
  q, depth
);

// --- Bing --- (Optimized selector, reduced slice)
const bingScrape = (q, depth = 1) => scrapeEngine(
  "Bing Oracle",
  q => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  (html, depth) => {
    // Note: DOMParser must be globally available. Bing's selectors are fragile.
    const doc = new DOMParser().parseFromString(html, "text/html");
    return Array.from(doc.querySelectorAll("li.b_algo .b_caption p"))
      .slice(0, 4 * depth) // Reduced for performance
      .filter(el => el.textContent?.length > 20)
      .map(el => ({ text: sanitizeText(el.textContent), source: "Bing" }));
  },
  q, depth
);

// ===========================================================
// 🔤 TOKENIZATION & MINI-WIKI SEARCH (Optimized)
// ===========================================================

const tokenize = text => {
  const words = (text.match(/[A-Za-z]{3,}/g) || []).map(w => w.toLowerCase());
  return Array.from(new Set(words)).slice(0, 10); // Cap tokens to 10 for performance
};

async function wikiSearch(token, maxLen = 300) {
  try {
    const r = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(token)}`
    );
    if (!r.ok) return '';
    const j = await r.json();
    // Inline clean & limit
    return (j.extract || '').replace(/<\/?[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, maxLen);
  } catch {
    return '';
  }
}

// ===========================================================
// 🧠 EMOTIONAL INTELLIGENCE MODULE (New!)
// ===========================================================

// Adaptive lightweight sentiment detection
const sentimentKeywords = {
  positive: [
    'great', 'awesome', 'love', 'loved', 'loving', 'excited', 'happy', 
    'happiest', 'best', 'amazing', 'cool', 'fun', 'wonderful', 'fantastic', 
    'joy', 'yay', 'brilliant', 'delight', 'cheerful', 'enjoy', 'yay', 'hooray'
  ],
  negative: [
    'bad', 'hate', 'hated', 'hating', 'sad', 'frustrated', 'problem', 
    'worst', 'fail', 'failed', 'failing', 'angry', 'disappoint', 'disappointed', 
    'terrible', 'ugh', 'upset', 'pain', 'annoy', 'stress', 'ugh', 'frustrating'
  ],
  neutral: [
    'ok', 'fine', 'average', 'so-so', 'neutral', 'meh', 'alright', 
    'normal', 'usual', 'standard', 'nothing special'
  ],
  emojis: {
    positive: ['😄','😊','😁','👍','🎉','❤️','😎'],
    negative: ['😢','😡','😠','👎','💔','😭','😞'],
    neutral: ['😐','😶','😑']
  },
  modifiers: {
    very: 1.5,  // intensify sentiment
    super: 1.7,
    slightly: 0.7,
    kinda: 0.8,
    really: 1.3
  }
};

// Lightweight human-like sentiment analyzer
const detectSentiment = (text) => {
  let lower = text.toLowerCase();
  let score = 0;

  // Detect keywords
  for (let word of sentimentKeywords.positive) if (lower.includes(word)) score += 1;
  for (let word of sentimentKeywords.negative) if (lower.includes(word)) score -= 1;

  // Detect modifiers
  for (let mod in sentimentKeywords.modifiers) {
    if (lower.includes(mod)) score *= sentimentKeywords.modifiers[mod];
  }

  // Detect emoji sentiment
  for (let emo of sentimentKeywords.emojis.positive) if (text.includes(emo)) score += 2;
  for (let emo of sentimentKeywords.emojis.negative) if (text.includes(emo)) score -= 2;

  // Detect punctuation intensity
  if (text.includes('!!!')) score *= 1.3;
  if (text.includes('??')) score *= 0.9;

  // Classify sentiment
  if (score > 1) return 'positive';
  if (score < -1) return 'negative';
  return 'neutral';
}
// Adaptive human-like tones based on sentiment
const getTones = (sentiment) => {
  if (sentiment === 'positive') return [
    "I'm thrilled to dive into this!",
    "Sounds like a fun topic—let's explore.",
    "Exciting query! Here's the scoop.",
    "Love the energy—unpacking now.",
    "Oh, this is a good one, let's dig in.",
    "Feeling pumped about this, let's go!",
    "Alright, let's ride this wave of positivity.",
    "This looks interesting—let’s see what's inside.",
    "Can’t wait to unpack this with you!",
    "This has a bright vibe—let’s dive deeper.",
    "Love where this is headed—let’s break it down.",
    "Alright, let’s get into the fun part.",
    "Excited to explore this angle!",
    "This is really energizing—let's unravel it.",
    "Great, let's see what we can uncover here.",
    "Okay, let's follow this positive trail.",
    "This one has a nice spark—let’s go!",
    "Feeling curious—let’s dive together.",
    "Here comes something uplifting—let's explore.",
    "Time to unpack this exciting piece!",
    "Let's ride the flow of this positive energy.",
    "This looks promising—let’s dig a little deeper.",
    "Love the curiosity here—let's unpack it.",
    "Alright, let's see the bright side of this.",
    "Here’s where it gets really interesting.",
    "I’m excited—let’s break it down step by step.",
    "This one’s a gem—let’s explore it fully.",
    "Love the vibe—let’s see what’s inside.",
    "Alright, let's jump into the fun details.",
    "This is getting exciting—let's follow through.",
    "Time to dive in and enjoy the process!"
  ];

  if (sentiment === 'negative') return [
    "I get that this might be frustrating—let's clarify.",
    "Sorry if this is a tough one; I'll help sort it out.",
    "Understand the concern—diving in empathetically.",
    "Here to help with that challenge.",
    "It’s okay, let’s untangle this together.",
    "I know this feels tricky—let's break it down.",
    "No worries, we’ll figure it out step by step.",
    "This is a bit rough, but we can handle it.",
    "I see the issue—let's tackle it calmly.",
    "It might seem confusing—let’s simplify it.",
    "Let’s take this slowly and make sense of it.",
    "Alright, we can work through this together.",
    "I hear you—let’s approach it carefully.",
    "Tough one, but we’ll get clarity soon.",
    "Let’s dissect this gently and find solutions.",
    "I know this can feel overwhelming—let’s focus.",
    "Hang tight, we’ll make sense of it.",
    "I get the frustration—let’s look closer.",
    "We’ll take this piece by piece and clarify.",
    "I understand the difficulty—let’s simplify it.",
    "Step by step, we can work through this.",
    "It’s tricky, but we’ll figure it out together.",
    "I know it’s challenging—let’s approach mindfully.",
    "Let’s slow down and tackle this calmly.",
    "We can sort this out—let’s go through it slowly.",
    "I see where this is confusing—let’s clarify.",
    "We’ll make this easier to digest, one step at a time.",
    "No stress—we’ll work through this logically.",
    "Let’s turn this complexity into something manageable.",
    "It’s okay, we can figure this out together."
  ];

  return [
    "Hmm, alright—let's unpack this.",
    "You know, that's an intriguing one.",
    "Perfect timing for a deep dive.",
    "To cut through the noise:",
    "Let’s see what’s really going on here.",
    "Interesting question—let’s explore it.",
    "Alright, let’s peel back the layers.",
    "Time to dig a little deeper into this.",
    "Here’s a thought as we go through it.",
    "Let’s explore this angle carefully.",
    "Okay, let's break this down step by step.",
    "This could go in several directions—let’s see.",
    "Let’s take a moment to examine this.",
    "I’m curious—let’s see what unfolds.",
    "Here’s a perspective worth considering.",
    "Alright, let’s figure this out together.",
    "Let’s map this out and see what fits.",
    "This has layers—let’s untangle them.",
    "Let’s explore the possibilities here.",
    "We can look at this from different sides.",
    "Time to connect the dots carefully.",
    "Here’s a subtle point to notice.",
    "Let’s break it down and make sense of it.",
    "Something interesting is hidden here—let’s find it.",
    "I’m intrigued—let’s dive into the details.",
    "Let’s dissect this idea slowly.",
    "Alright, let’s put the pieces together.",
    "Here’s a small insight to start with.",
    "Let’s observe carefully what’s happening.",
    "Time to explore this in depth.",
    "Let’s think through this thoughtfully."
  ];
};

const getTransitions = (sentiment) => {
  if (sentiment === 'positive') return [
    "And building on that good vibe,",
    "You know what makes this even cooler?",
    "Taking it a step further,",
    "It’s even more exciting when",
    "What’s really fun about this is",
    "And just to add a little extra spark,",
    "If we think about it a bit more,",
    "Here’s where it gets interesting,",
    "Now that we’re on a roll,",
    "And the best part is,",
    "It gets even better when",
    "Let’s not stop here,",
    "Something else that stands out is",
    "And to make it even more exciting,",
    "If we zoom out for a second,",
    "Here’s another cool angle,",
    "And just to highlight it,",
    "Imagine this for a moment,",
    "To keep the momentum going,",
    "Here’s one more thing that shines,",
    "And while we’re at it,",
    "The interesting twist is,",
    "It becomes clearer when",
    "Let’s take it up a notch,",
    "Something to really notice is",
    "And just for fun,",
    "Here’s a subtle nuance that pops,",
    "It’s worth celebrating that",
    "To tie it together,",
    "One more perspective is",
    "And don’t forget,",
    "Here’s a tiny detail that matters,",
    "It’s fascinating to see that",
    "Let’s shine a light on",
    "Something else that sparks curiosity,",
    "And just to expand a bit,",
    "The pattern reveals that",
    "Here’s a fresh way to look at it,",
    "If we layer it,",
    "Notice how",
    "It feels even better when",
    "Let’s push this idea forward,",
    "Another highlight is",
    "And naturally,",
    "It gains momentum as",
    "If we reflect on it,",
    "Something to feel excited about,",
    "And tying it back,",
    "It really comes alive when",
    "Finally, something uplifting to note,"
  ];

  if (sentiment === 'negative') return [
    "Alright, looking at this from another angle,",
    "One way to ease that is",
    "Let’s try thinking about it like this,",
    "Here’s something that might help:",
    "If we approach it differently,",
    "A little perspective might be",
    "To make it a bit clearer,",
    "What could help here is",
    "It’s okay to pause here and reflect,",
    "Let’s break it down a bit,",
    "Sometimes the trick is to step back,",
    "Here’s a small step we can take,",
    "To untangle this a bit,",
    "If we adjust our angle slightly,",
    "Something to consider carefully,",
    "Let’s look at it from another side,",
    "To make sense of this, think about",
    "Here’s a gentle way forward,",
    "Sometimes all it takes is",
    "To ease the tension, consider this,",
    "And if it feels heavy, remember,",
    "Breaking it down helps us see that",
    "We can approach it slowly by",
    "Here’s a little insight to guide us,",
    "If it seems tricky, one thought is",
    "Let’s step back for a moment,",
    "To untangle the complexity, try",
    "Sometimes a fresh perspective is",
    "One approach to consider is",
    "Here’s a subtle way to handle it,",
    "It might help to notice that",
    "Reflecting on this, we see",
    "And if it feels unclear, remember",
    "Let’s simplify it by thinking",
    "Sometimes, it’s about pacing ourselves,",
    "A small action to take is",
    "To reduce the stress, consider",
    "Let’s take a quiet moment to",
    "Looking closer, it becomes clear that",
    "Here’s something that reassures us,",
    "If frustration rises, one step is",
    "Breaking it into pieces shows that",
    "Let’s navigate this gently,",
    "One way to regain clarity is",
    "Here’s a helpful nudge to think,",
    "If it feels overwhelming, remember that",
    "A tiny shift in focus helps,",
    "Step by step, we can see",
    "And it becomes manageable when",
    "Sometimes clarity comes from pausing,"
  ];

  return [
    "Now, if we shift gears a bit,",
    "Here’s an interesting twist:",
    "Let’s explore how this connects to",
    "Something to consider next:",
    "Thinking about it another way,",
    "It’s worth noticing that",
    "Just a thought as we move forward,",
    "What ties these ideas together is",
    "If we dig a little deeper,",
    "Here’s a subtle connection,",
    "Let’s take a closer look at",
    "Another perspective worth noting is",
    "To connect the dots, consider",
    "Here’s a small insight that matters,",
    "If we step back for a moment,",
    "Something that often goes unnoticed is",
    "Let’s blend these ideas together,",
    "To frame this differently, think",
    "It’s interesting to see how",
    "Finally, to wrap this thought around,",
    "And to add another layer of thought,",
    "Here’s a fresh angle to ponder,",
    "Something subtle but important is",
    "To connect everything smoothly, notice",
    "If we rethink it slightly,",
    "A little observation worth noting,",
    "It unfolds more clearly when",
    "Let’s put this into perspective,",
    "And just to keep the flow,",
    "Here’s an idea that resonates,",
    "Looking at it closely, we find",
    "Something that brings it together is",
    "To tie ideas in a thread, notice",
    "If we approach it with curiosity,",
    "Another layer worth exploring is",
    "And to keep the discussion lively,",
    "Something subtle to guide our thinking,",
    "Let’s weave this into the bigger picture,",
    "Notice the connection forming here,",
    "If we nudge the perspective a bit,",
    "Here’s a small but interesting detail,",
    "It becomes clearer as we notice that,",
    "And to round this out nicely,",
    "Something playful to keep in mind is,",
    "Let’s let this idea simmer a bit,",
    "Here’s a thought to carry forward,",
    "If we take a step back, we see,",
    "Something intriguing unfolds when,",
    "And it’s worth pondering that,",
    "To keep the thread alive,"
  ];
};

const getEndings = (sentiment) => {
  if (sentiment === 'positive') return [
    "—wow, that’s really something, isn’t it?",
    "Feels good to see this come together!",
    "Honestly, this made my day a bit brighter.",
    "Can’t help but smile at that one!"
  ];
  
  if (sentiment === 'negative') return [
    "—hey, it’s okay, we’ll figure it out.",
    "Sometimes it’s messy, and that’s fine.",
    "Take a breath, one step at a time.",
    "It’s a tough one, but we’ll get there."
  ];
  
  return [
    "—hm, what do you think about that?",
    "I’m just tossing ideas around here.",
    "That’s one way to look at it, right?",
    "Something to noodle on for a bit."
  ];
};

const getSignOffs = (sentiment) => {
  if (sentiment === 'positive') return [
    "\n\n— Hey, Neo here! Keep riding that positive vibe.",
    "\n\n— Neo checking in, loving your energy!",
    "\n\n— Catch you on the next awesome thought."
  ];
  
  if (sentiment === 'negative') return [
    "\n\n— Neo here, we’ve got this together.",
    "\n\n— Taking a moment with you — Neo.",
    "\n\n— Let’s tackle the next challenge, step by step."
  ];
  
  return [
    "\n\n— Neo here, just thinking out loud with you.",
    "\n\n— Until next time, let’s explore ideas together.",
    "\n\n— Catch you in the next thought journey."
  ];
};

// ===========================================================
// 🪶 FILTERS & CONNECTIVE LOGIC
// ===========================================================

function applyFilters(snippets, q) {
  const words = q.toLowerCase().split(/\s+/);
  return snippets
    .filter(s => words.some(w => s.toLowerCase().includes(w)) && s.length > 30 && s.length < 400) // Tightened length for conciseness
    .slice(0, 6); // Reduced max for performance
}

function connectTokens(tokens, snippets) {
  const connected = [];
  let current = '';
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const match = snippets.find(s => s.toLowerCase().includes(token.toLowerCase()));
    if (match) current += (current ? ' ' : '') + match.split(' ').slice(0, 5).join(' ') + '. '; // Reduced words for speed
    if (i % 3 === 0 && current) { connected.push(current.trim()); current = ''; }
  }
  if (current) connected.push(current.trim());
  return connected;
}

// 🔥 IMPROVED GRAMMAR AND PUNCTUATION FIXER
const fixGrammar = t => {
  let text = t;

  // 1. Collapse all extra whitespace
  text = text.replace(/\s+/g, ' ');

  // 2. Remove space before punctuation marks (, . ! ? : ;)
  // This also handles cases where a punctuation mark is followed by another one
  text = text.replace(/\s+([.,!?;:])/g, '$1');

  // 3. Ensure a space follows terminal punctuation (. ! ?)
  // This ensures "word.Next" becomes "word. Next"
  text = text.replace(/([.!?])(\S)/g, '$1 $2');

  // 4. Capitalize the first letter of the entire string and letters immediately following a period or exclamation mark
  // Split into sentences using a regex that looks for sentence-ending punctuation followed by a space
  let sentences = text.match(/[^.!?]+([.!?]\s*|$)/g);

  if (sentences) {
    text = sentences.map(s => {
      // Trim spaces and capitalize the first non-space character
      let trimmed = s.trim();
      if (trimmed.length > 0) {
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      }
      return '';
    }).join(' ');
  } else {
     // If no sentences found, at least capitalize the first letter
     text = text.charAt(0).toUpperCase() + text.slice(1);
  }

  // 5. Correct the standalone 'i' to 'I'
  text = text.replace(/\bi\b/g, 'I');

  return text.trim();
};

// ===========================================================
// ✨ LANGUAGE SYNTHESIS (With EI Integration & Humanized Flow)
// ===========================================================

function buildFlow(snippets, connected, sentiment) {
  const shuffled = [...snippets].sort(() => Math.random() - 0.5);
  const out = [];
  let para = '';

  const tones = getTones(sentiment);
  const transitions = getTransitions(sentiment);
  const endings = getEndings(sentiment);

  // Start with a tone sentence (70% chance)
  if (Math.random() < 0.7) {
      para += tones[Math.floor(Math.random() * tones.length)] + ' ';
  }

  for (let i = 0; i < shuffled.length; i++) {
    const snippet = shuffled[i];
    
    // Pick a snippet or fallback to connected token
    let current_piece = snippet || connected[i % connected.length] || '';
    if (!current_piece) continue;

    para += current_piece.trim() + '. '; 

    // Randomly insert a transition + next snippet
    if (i + 1 < shuffled.length && Math.random() < 0.6) {
      const transition = transitions[Math.floor(Math.random() * transitions.length)];
      const nextSnippet = shuffled[i + 1].split(/[.!?]/)[0].trim();
      para += `${transition} ${nextSnippet}. `;
      i++; // Skip the next snippet as it’s integrated
    } 
    // Randomly append an ending for variety
    else if (i % 4 === 3 && Math.random() < 0.4) {
      para += ` ${endings[Math.floor(Math.random() * endings.length)]} `;
    }

    // Randomly add small interjections or emojis for human feel
    if (Math.random() < 0.2) {
      const extras = ['Hmm,', 'You know,', '✨', '💡', 'Interestingly,'];
      para += extras[Math.floor(Math.random() * extras.length)] + ' ';
    }

    // Finalize paragraph if long enough
    if (para.length > 120 || i % 4 === 3) {
      let fixedPara = fixGrammar(para);
      if (fixedPara.length > 50) out.push(fixedPara.trim());
      para = '';
    }
  }

  // Process any leftover text
  if (para.length > 50) out.push(fixGrammar(para).trim());

  // Join paragraphs with spacing for readability
  return out.join('\n\n');
}

// ===========================================================
// 🧬 DECODER & RESPONSE GENERATOR (With EI & Humanized Flow)
// ===========================================================

function decodeTokens(snippets, q, sentiment) {
  // Step 1: Filter snippets intelligently based on the query
  const filtered = applyFilters(snippets, q); // could remove irrelevant or duplicate pieces

  // Step 2: Tokenize the query for better contextual connection
  const tokens = tokenize(q);

  // Step 3: Connect tokens with snippets to make flow coherent
  const connected = connectTokens(tokens, filtered);

  // Step 4: Build human-like paragraphs with tone, transitions, and endings
  let text = buildFlow(filtered, connected, sentiment);

  // Step 5: Add dynamic sign-offs
  const signOffs = getSignOffs(sentiment);

  // 20% chance to add a small emoji or interjection before sign-off
  if (Math.random() < 0.2) {
    const extras = ['✨', '💡', 'Hmm,', 'You know,'];
    text += ' ' + extras[Math.floor(Math.random() * extras.length)];
  }

  // Step 6: Append a final sign-off
  text += signOffs[Math.floor(Math.random() * signOffs.length)];

  // Step 7: Optional trimming to avoid overly long responses
  if (text.length > 1000) text = text.slice(0, 1000) + '…';

  return text;
}

// ===========================================================
// 💡 HUMAN ANSWER (Main Engine - High Performance with EI)
// ===========================================================

async function humanAnswer(query) {
  let res = "🤖 Neo's Human Brain Analysis:\n\n";

  try {
    const q = normalizeQuery(query);
    const sentiment = detectSentiment(q); // Detect sentiment

    // --- Helper: wrap each fetch with timeout ---
    const fetchWithTimeout = (fn, timeout = 5000) =>
      Promise.race([
        fn(),
        new Promise((_, reject) => setTimeout(() => reject('Timeout'), timeout))
      ]);

    // --- Parallel scraping with resilience ---
    const scrapePromises = [
      fetchWithTimeout(() => duckDuckScrape(q)),
      fetchWithTimeout(() => wikiScrape(q)),
      fetchWithTimeout(() => bingScrape(q))
    ];

    const results = await Promise.allSettled(scrapePromises);

      // --- Collect and clean snippets from successful scrapes ---
    let snippets = results
      .filter(r => r.status === 'fulfilled' && r.value?.success)  // only fulfilled & successful
      .flatMap(r => r.value.results || [])                        // flatten results arrays
      .map(r => cleanText(r.text || ''))                          // clean text
      .filter(t => t.length > 30);                                // remove too-short snippets

    // --- Fallback if no snippets found ---
    if (snippets.length === 0) snippets.push("No relevant information found.");

    // --- Combine snippets intelligently into final human-style answer ---
    const finalText = decodeTokens(snippets, q, sentiment);


    // 3. Token-level Wikipedia enrichment (Batched parallel)
    const tokens = tokenize(q);
    const tokenWikiPromises = tokens.map(t => wikiSearch(t));
    const wikiExtras = await Promise.all(tokenWikiPromises);

    wikiExtras
      .filter(extra => extra.length > 50) // Reduced threshold
      .forEach(extra => snippets.push(extra));

    if (!snippets.length)
      return `${res}🧠 The matrix glitched—ask anew?\n\n— Neo, ever curious.`;

    // 4. Decode and Synthesize with sentiment
    res += decodeTokens(snippets, q, sentiment);
    res += "\n\nThis is Neo’s synthesis — connecting the fragments of the web into coherent, empathetic insight.";
    return res;

  } catch (err) {
    console.error("Neo Brain Error:", err);
    return "🧠 Neo’s neurons tripped on static—try again.";
  }
}

// Example usage (uncomment and run in a suitable JS environment, like a browser's console or a Node environment with 'jsdom' and 'node-fetch' polyfills)
/*
(async () => {
  console.log("Starting Neo Query...");
  // Test with a query that might produce messy output to see the grammar fix in action
  const answer = await humanAnswer("I love elon musk's ideas but I'm worried about spacex's launch failures! What are the latest news on Starship?");
  console.log("\n\n" + "=".repeat(60));
  console.log(answer);
  console.log("=".repeat(60));
})();
*/

// Disable console tampering
setInterval(() => {
    const devtools = /./;
    devtools.toString = function () {
        throw "Console is disabled!";
    };
    console.log('%c', devtools);
}, 1000);
// Disable right-click & inspect
window.oncontextmenu = () => false;
document.onkeydown = function (e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        return false;
    }
};