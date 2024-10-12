const todoList = document.getElementById('todoList');
const currentTimeDiv = document.getElementById('currentTime');
const themeColorSelect = document.getElementById('themeColorSelect');
const fontSizeSelect = document.getElementById('fontSizeSelect');

// 显示当前时间
function updateCurrentTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    currentTimeDiv.textContent = `当前时间: ${now.toLocaleString('zh-CN', options)}`;
}

setInterval(updateCurrentTime, 1000); // 每秒更新一次时间

// 初始化时从 localStorage 加载数据
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        const timeSpan = document.createElement('span');
        timeSpan.textContent = todo.time;
        li.appendChild(timeSpan);

        // 设置优先级样式
        li.classList.add(`${todo.priority}-priority`);

        // 添加备注、附件和链接
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('details-container');

        const notesElement = document.createElement('p');
        notesElement.textContent = `备注: ${todo.notes}`;
        detailsContainer.appendChild(notesElement);

        const attachmentElement = document.createElement('p');
        attachmentElement.textContent = `附件: <a href="${todo.attachment}" target="_blank">${todo.attachment}</a>`;
        detailsContainer.appendChild(attachmentElement);

        const linkElement = document.createElement('p');
        linkElement.textContent = `链接: <a href="${todo.link}" target="_blank">${todo.link}</a>`;
        detailsContainer.appendChild(linkElement);

        li.appendChild(detailsContainer);

        // 添加提醒功能
        const reminderTime = new Date(todo.time);
        const now = new Date();
        if (reminderTime > now) {
            setReminder(reminderTime, li, todo.isRepeating);
        }

        todoList.appendChild(li);
    });
}

loadTodos();

function addItem() {
    const input = document.getElementById('newItemInput');
    const timeInput = document.getElementById('newItemTime');
    const prioritySelect = document.getElementById('prioritySelect');
    const repeatCheckbox = document.getElementById('repeatCheckbox');
    const notesInput = document.getElementById('notesInput');
    const attachmentInput = document.getElementById('attachmentInput');
    const linkInput = document.getElementById('linkInput');
    const value = input.value.trim();
    const timeValue = timeInput.value;
    const priority = prioritySelect.value;
    const isRepeating = repeatCheckbox.checked;
    const notes = notesInput.value.trim();
    const attachment = attachmentInput.value.trim();
    const link = linkInput.value.trim();

    if (value === '') return;

    const li = document.createElement('li');
    li.textContent = value;
    const timeSpan = document.createElement('span');
    timeSpan.textContent = timeValue;
    li.appendChild(timeSpan);

    // 设置优先级样式
    li.classList.add(`${priority}-priority`);

    // 添加备注、附件和链接
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');

    const notesElement = document.createElement('p');
    notesElement.textContent = `备注: ${notes}`;
    detailsContainer.appendChild(notesElement);

    const attachmentElement = document.createElement('p');
    attachmentElement.textContent = `附件: <a href="${attachment}" target="_blank">${attachment}</a>`;
    detailsContainer.appendChild(attachmentElement);

    const linkElement = document.createElement('p');
    linkElement.textContent = `链接: <a href="${link}" target="_blank">${link}</a>`;
    detailsContainer.appendChild(linkElement);

    li.appendChild(detailsContainer);

    // 添加提醒功能
    const reminderTime = new Date(timeValue);
    const now = new Date();
    if (reminderTime > now) {
        setReminder(reminderTime, li, isRepeating);
    }

    todoList.appendChild(li);

    // 保存到 localStorage
    saveTodo({ text: value, time: timeValue, priority, isRepeating, notes, attachment, link });

    input.value = '';
    timeInput.value = '';
    prioritySelect.selectedIndex = 0;
    repeatCheckbox.checked = false;
    notesInput.value = '';
    attachmentInput.value = '';
    linkInput.value = '';
}

function saveTodo(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function setReminder(reminderTime, li, isRepeating) {
    const timeDifference = reminderTime.getTime() - new Date().getTime();
    setTimeout(() => {
        showNotification(li.textContent, reminderTime);
        if (isRepeating) {
            setReminder(reminderTime, li, true); // 重复提醒
        }
    }, timeDifference);
}

function showNotification(message, reminderTime) {
    if (!('Notification' in window)) {
        console.log('此浏览器不支持桌面通知');
        return;
    }

    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                createNotification(message, reminderTime);
            }
        });
    } else {
        createNotification(message, reminderTime);
    }
}

function createNotification(message, reminderTime) {
    const notification = new Notification('提醒', {
        body: `${message} - 截止时间: ${reminderTime.toLocaleString()}`
    });

    notification.onclick = () => {
        console.log(`点击了通知: ${message}`);
    };
}

// 个性化设置
themeColorSelect.addEventListener('change', function() {
    const selectedColor = this.value;
    document.body.style.backgroundColor = getBackgroundColor(selectedColor);
});

fontSizeSelect.addEventListener('change', function() {
    const selectedSize = this.value;
    document.body.style.fontSize = getFontSize(selectedSize);
});

function getBackgroundColor(color) {
    switch (color) {
        case 'blue':
            return '#e6f7ff';
        case 'green':
            return '#e6ffe6';
        case 'purple':
            return '#f5e6ff';
        default:
            return '#f4f4f9';
    }
}

function getFontSize(size) {
    switch (size) {
        case 'small':
            return '12px';
        case 'medium':
            return '16px';
        case 'large':
            return '20px';
        default:
            return '16px';
    }
}
