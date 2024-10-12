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
