let taskForm = document.getElementById("task-form");
let taskTitleInput = document.getElementById("task-title");
let taskList = document.getElementById("task-list");
let contactForm = document.getElementById("contact-form");
let errorMessage = document.getElementById("error-message");

function loadTasks() {
    taskList.innerHTML = ""; 
    let tasks = localStorage.getItem("tasks");

    if (tasks) {
        tasks.split(";").forEach(function(task) {
            let li = document.createElement("li");
            li.innerHTML = task + " <button onclick=\"deleteTask('" + task + "')\">Supprimer</button>";
            taskList.appendChild(li);
        });
    }
}

function submitTaskForm(event) {
    event.preventDefault();

    let title = taskTitleInput.value.trim();

    if (title !== "") {
        let tasks = localStorage.getItem("tasks");
        tasks = tasks ? tasks + ";" + title : title; 
        localStorage.setItem("tasks", tasks);

        loadTasks(); 
        taskTitleInput.value = "";
    } else {
        alert("Le titre de la tâche ne peut pas être vide.");
    }
}

function submitContactForm(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();

    if (name === "" || email === "") {
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
        alert("Formulaire envoyé!");
    }
}

function deleteTask(taskToDelete) {
    let tasks = localStorage.getItem("tasks").split(";");
    tasks = tasks.filter(task => task !== taskToDelete); 
    localStorage.setItem("tasks", tasks.join(";")); 

    loadTasks();
}

taskForm.onsubmit = submitTaskForm;
contactForm.onsubmit = submitContactForm;

window.onload = loadTasks;