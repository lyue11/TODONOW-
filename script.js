function addItem() {
    const input = document.getElementById('newItemInput');
    const timeInput = document.getElementById('newItemTime');
    const prioritySelect = document.getElementById('prioritySelect');
    const repeatCheckbox = document.getElementById('repeatCheckbox');
    const value = input.value.trim();
    const timeValue = timeInput.value;
    const priority = prioritySelect.value;
    const isRepeating = repeatCheckbox.checked;

    if (value === '') return;

    const ul = document.getElementById('todoList');
    const li = document.createElement('li');
    li.textContent = value;
    const timeSpan = document.createElement('span');
    timeSpan.textContent = timeValue;
    li.appendChild(timeSpan);

    // 设置优先级样式
    li.classList.add(`${priority}-priority`);

    // 添加提醒功能
    const reminderTime = new Date(timeValue);
    const now = new Date();
    if (reminderTime > now) {
        setReminder(reminderTime, li, isRepeating);
    }

    ul.appendChild(li);

    input.value = '';
    timeInput.value = '';
    prioritySelect.selectedIndex = 0;
    repeatCheckbox.checked = false; // 重置重复提醒选择
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
