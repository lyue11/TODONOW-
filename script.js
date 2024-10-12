const todoList = document.getElementById('todoList');

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

    input.value = '';
    timeInput.value = '';
    prioritySelect.selectedIndex = 0;
    repeatCheckbox.checked = false;
    notesInput.value = '';
    attachmentInput.value = '';
    linkInput.value = '';
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

function updateTime() {
    const currentTimeDiv = document.getElementById('currentTime');
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    currentTimeDiv.textContent = `当前时间: ${timeStr}`;
}

// 初始化时间显示
updateTime();

// 每秒更新一次时间
setInterval(updateTime, 1000);
