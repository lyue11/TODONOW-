function addItem() {
    const input = document.getElementById('newItemInput');
    const timeInput = document.getElementById('newItemTime');
    const value = input.value.trim();
    const timeValue = timeInput.value;

    if (value === '') return;

    const ul = document.getElementById('todoList');
    const li = document.createElement('li');
    li.textContent = value;
    const timeSpan = document.createElement('span');
    timeSpan.textContent = timeValue;
    li.appendChild(timeSpan);

    ul.appendChild(li);

    input.value = '';
    timeInput.value = '';
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
