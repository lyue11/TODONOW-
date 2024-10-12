function addItem() {
    const input = document.getElementById('newItemInput');
    const timeInput = document.getElementById('newItemTime');
    const prioritySelect = document.getElementById('prioritySelect');
    const value = input.value.trim();
    const timeValue = timeInput.value;
    const priority = prioritySelect.value;

    if (value === '') return;

    const ul = document.getElementById('todoList');
    const li = document.createElement('li');
    li.textContent = value;
    const timeSpan = document.createElement('span');
    timeSpan.textContent = timeValue;
    li.appendChild(timeSpan);

    // 设置优先级样式
    li.classList.add(`${priority}-priority`);

    ul.appendChild(li);

    input.value = '';
    timeInput.value = '';
    prioritySelect.selectedIndex = 0; // 重置优先级选择
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
