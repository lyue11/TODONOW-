document.addEventListener('DOMContentLoaded', function() {
    const data = {
        todos: [],
        courses: [],
        assignments: [],
        exams: [],
        collaborations: [],
        schedule: [],
        notes: [],
        grades: [],
        resources: []
    };

    function saveData() {
        localStorage.setItem('data', JSON.stringify(data));
    }

    function loadData() {
        const storedData = localStorage.getItem('data');
        if (storedData) {
            data.todos = JSON.parse(storedData).todos || [];
            data.courses = JSON.parse(storedData).courses || [];
            data.assignments = JSON.parse(storedData).assignments || [];
            data.exams = JSON.parse(storedData).exams || [];
            data.collaborations = JSON.parse(storedData).collaborations || [];
            data.schedule = JSON.parse(storedData).schedule || [];
            data.notes = JSON.parse(storedData).notes || [];
            data.grades = JSON.parse(storedData).grades || [];
            data.resources = JSON.parse(storedData).resources || [];
        }
    }

    function renderTodos() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';
        data.todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo;
            todoList.appendChild(li);
        });
    }

    function renderCourses() {
        const courseList = document.getElementById('courseList');
        courseList.innerHTML = '';
        data.courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course;
            courseList.appendChild(li);
        });
    }

    function renderAssignments() {
        const assignmentList = document.getElementById('assignmentList');
        assignmentList.innerHTML = '';
        data.assignments.forEach(assignment => {
            const li = document.createElement('li');
            li.textContent = assignment;
            assignmentList.appendChild(li);
        });
    }

    function renderExams() {
        const examList = document.getElementById('examList');
        examList.innerHTML = '';
        data.exams.forEach(exam => {
            const li = document.createElement('li');
            li.textContent = exam;
            examList.appendChild(li);
        });
    }

    function renderCollaborations() {
        const collaborationList = document.getElementById('collaborationList');
        collaborationList.innerHTML = '';
        data.collaborations.forEach(collaboration => {
            const li = document.createElement('li');
            li.textContent = collaboration;
            collaborationList.appendChild(li);
        });
    }

    function renderSchedule() {
        const scheduleList = document.getElementById('scheduleList');
        scheduleList.innerHTML = '';
        data.schedule.forEach(schedule => {
            const li = document.createElement('li');
            li.textContent = schedule;
            scheduleList.appendChild(li);
        });
    }

    function renderNotes() {
        const noteList = document.getElementById('noteList');
        noteList.innerHTML
