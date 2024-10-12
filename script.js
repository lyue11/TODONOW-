function addItem() {
    const input = document.getElementById('newItemInput');
    const value = input.value.trim();

    if (value === '') return;

    const ul = document.getElementById('todoList');
    const li = document.createElement('li');
    li.textContent = value;
    ul.appendChild(li);

    input.value = '';
}
