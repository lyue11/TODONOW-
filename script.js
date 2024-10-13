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
        addTodoToList(todo);
    });
}

loadTodos();

function addTodoToList(todo) {
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

    // 添加删除按钮
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(li);
        removeTodoFromStorage(todo);
    });
    li.appendChild(deleteButton);

    // 添加编辑按钮
    const editButton = document.createElement('button');
    editButton.textContent = '编辑';
    editButton.addEventListener('click', () => {
        editTodo(li, todo);
    });
    li.appendChild(editButton);

    // 添加提醒功能
    const reminderTime = new Date(todo.time);
    const now = new Date();
    if (reminderTime > now) {
        setReminder(reminderTime, li, todo.isRepeating);
    }

    todoList.appendChild(li);
}

function addItem(event) {
    event.preventDefault();
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

    const todo = {
        text: value,
        time: timeValue,
        priority,
        isRepeating,
        notes,
        attachment,
        link
    };

    addTodoToList(todo);

    // 保存到 localStorage
    saveTodo(todo);

    input.value = '';
    timeInput.value = '';
    prioritySelect.selectedIndex = 0;
    repeatCheckbox.checked = false;
    notesInput.value = '';
    attachmentInput.value = '';
    linkInput.value = '';
}

document.getElementById('addItemForm').addEventListener('submit', addItem);

function saveTodo(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTodoFromStorage(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(t => t.text !== todo.text);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function setReminder(reminderTime, li, isRepeating) {
    const timeDifference = reminderTime.getTime() - new Date().getTime();
    if (timeDifference <= 0) return;

    setTimeout(() => {
        showNotification(li.textContent, reminderTime);
        if (isRepeating) {
            const nextReminderTime = getNextReminderTime(reminderTime);
            setReminder(nextReminderTime, li, isRepeating);
        }
    }, timeDifference);
}

function getNextReminderTime(currentTime) {
    const nextTime = new Date(currentTime);
    nextTime.setDate(nextTime.getDate() + 7); // 假设每周重复
    return nextTime;
}

function showNotification(message, time) {
    alert(`提醒: ${message} 在 ${time.toLocaleString('zh-CN')}`);
}

function editTodo(li, todo) {
    const input = document.getElementById('newItemInput');
    const timeInput = document.getElementById('newItemTime');
    const prioritySelect = document.getElementById('prioritySelect');
    const repeatCheckbox = document.getElementById('repeatCheckbox');
    const notesInput = document.getElementById('notesInput');
    const attachmentInput = document.getElementById('attachmentInput');
    const linkInput = document.getElementById('linkInput');

    input.value = todo.text;
    timeInput.value = todo.time;
    prioritySelect.value = todo.priority;
    repeatCheckbox.checked = todo.isRepeating;
    notesInput.value = todo.notes;
    attachmentInput.value = todo.attachment;
    linkInput.value = todo.link;

    li.remove();
    document.getElementById('addItemForm').addEventListener('submit', () => {
        const updatedTodo = {
            text: input.value.trim(),
            time: timeInput.value,
            priority: prioritySelect.value,
            isRepeating: repeatCheckbox.checked,
            notes: notesInput.value.trim(),
            attachment: attachmentInput.value.trim(),
            link: linkInput.value.trim()
        };

        addTodoToList(updatedTodo);
        saveTodo(updatedTodo);
    });
}

// 主题颜色选择
themeColorSelect.addEventListener('change', function() {
    document.body.style.backgroundColor = this.value;
});

// 字体大小选择
fontSizeSelect.addEventListener('change', function() {
    document.body.style.fontSize = this.value;
});
