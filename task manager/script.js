// ==============================
// DOM Elements
// ==============================

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const category = document.getElementById("category");
const taskContainer = document.getElementById("taskContainer");
const themeBtn = document.getElementById("themeBtn");

const searchTask = document.getElementById("searchTask");
const filterCategory = document.getElementById("filterCategory");

const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const clearAll = document.getElementById("clearAll");

// Store Tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ==============================
// Save Tasks
// ==============================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==============================
// Update Counters
// ==============================

function updateCounters() {

    let completed = tasks.filter(task => task.completed).length;

    let pending = tasks.length - completed;

    completedCount.textContent = completed;

    pendingCount.textContent = pending;

}

// ==============================
// Display Tasks
// ==============================

function displayTasks() {

    taskContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();

    tasks.forEach(task => {

        const card = document.createElement("div");

        card.className = "task-card";

        if (task.completed) {
            card.classList.add("completed");
        }

        // Custom Attributes
        card.setAttribute("data-id", task.id);
        card.setAttribute("data-status", task.completed);
        card.setAttribute("data-category", task.category);

        const title = document.createElement("h3");
        title.textContent = task.title;

        const cat = document.createElement("p");
        cat.textContent = "Category : " + task.category;

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.className = "complete";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";

        actions.append(editBtn);
        actions.append(completeBtn);
        actions.append(deleteBtn);

        card.append(title);
        card.append(cat);
        card.append(actions);

        fragment.appendChild(card);

    });

    taskContainer.appendChild(fragment);

    updateCounters();

}

// ==============================
// Add Task
// ==============================

taskForm.addEventListener("submit", function(e){

    e.preventDefault();

    if(taskTitle.value.trim() === "") return;

    const task = {

        id: Date.now(),

        title: taskTitle.value,

        category: category.value,

        completed:false

    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    taskForm.reset();

});
// ==============================
// Event Delegation
// ==============================

taskContainer.addEventListener("click", function (e) {

    const card = e.target.closest(".task-card");

    if (!card) return;

    const id = Number(card.dataset.id);

    // Delete Task
    if (e.target.classList.contains("delete")) {

        tasks = tasks.filter(task => task.id !== id);

        saveTasks();
        displayTasks();

    }

    // Complete Task
    if (e.target.classList.contains("complete")) {

        tasks.forEach(task => {

            if (task.id === id) {

                task.completed = !task.completed;

            }

        });

        saveTasks();
        displayTasks();

    }

    // Edit Task
    if (e.target.classList.contains("edit")) {

        const task = tasks.find(t => t.id === id);

        const newTitle = prompt("Edit Task", task.title);

        if (newTitle !== null && newTitle.trim() !== "") {

            task.title = newTitle;

            saveTasks();
            displayTasks();

        }

    }

});

// ==============================
// Search Task
// ==============================

searchTask.addEventListener("keyup", function () {

    const value = searchTask.value.toLowerCase();

    document.querySelectorAll(".task-card").forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

// ==============================
// Filter Category
// ==============================

filterCategory.addEventListener("change", function () {

    const selected = filterCategory.value;

    document.querySelectorAll(".task-card").forEach(card => {

        if (
            selected === "All" ||
            card.dataset.category === selected
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

// ==============================
// Clear All
// ==============================

clearAll.addEventListener("click", function () {

    if (confirm("Delete all tasks?")) {

        tasks = [];

        saveTasks();

        displayTasks();

    }

});

// ==============================
// Theme Toggle
// ==============================

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        document.body.setAttribute("data-theme", "dark");

        themeBtn.innerHTML = "☀ Light Mode";

    } else {

        document.body.setAttribute("data-theme", "light");

        themeBtn.innerHTML = "🌙 Dark Mode";

    }

});

// ==============================
// Attributes vs Properties
// ==============================

const demoInput = document.getElementById("demoInput");
const attributeBtn = document.getElementById("attributeBtn");

attributeBtn.addEventListener("click", function () {

    console.clear();

    console.log("PROPERTY value");

    console.log(demoInput.value);

    console.log("ATTRIBUTE value");

    console.log(demoInput.getAttribute("value"));

});

/*

Difference

input.value

Returns the CURRENT value entered by user.

input.getAttribute("value")

Returns ORIGINAL value written inside HTML.

Example

HTML

<input value="Hello">

User types

Hello World

input.value
= Hello World

input.getAttribute("value")

= Hello

*/

// ==============================
// Event Bubbling
// ==============================

const grandparent = document.getElementById("grandparent");
const parent = document.getElementById("parent");
const child = document.getElementById("childBtn");

// Bubbling (default)

grandparent.addEventListener("click", () => {
    console.log("Grandparent");
});

parent.addEventListener("click", () => {
    console.log("Parent");
});

child.addEventListener("click", () => {
    console.log("Child");
});

/*

Output

Child
Parent
Grandparent

*/

// ==============================
// Event Capturing
// ==============================

grandparent.addEventListener("click", () => {

    console.log("Capture Grandparent");

}, true);

parent.addEventListener("click", () => {

    console.log("Capture Parent");

}, true);

child.addEventListener("click", () => {

    console.log("Capture Child");

}, true);

/*

Output

Capture Grandparent

Capture Parent

Capture Child

Difference

Capturing

Grandparent → Parent → Child

Bubbling

Child → Parent → Grandparent

*/

// ==============================
// Initial Load
// ==============================

displayTasks();