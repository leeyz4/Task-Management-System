"use strict";
var _a, _b, _c, _d, _e, _f, _g;
class User {
    constructor(id, name, age, email) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
    }
}
class Task {
    constructor(id, title, startDate, endDate, assignedTo) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.assignedTo = assignedTo;
    }
}
class TaskManager {
    constructor() {
        this.users = [];
        this.tasks = [];
    }
    createUser(id, name, age, email) {
        const user = new User(id, name, age, email);
        this.users.push(user);
        return user;
    }
    createTask(id, title, startDate, endDate) {
        const task = new Task(id, title, startDate, endDate);
        this.tasks.push(task);
        return task;
    }
    getAllUsers() {
        return this.users;
    }
    getAllTasks() {
        return this.tasks;
    }
    getUsersByID(id) {
        return this.users.find(user => user.id === id);
    }
    getUsersByAge(age) {
        return this.users.find(user => user.age === age);
    }
    getTaskByID(id) {
        return this.tasks.find((task) => task.id === id);
    }
    updateUser(id, updateDetails) {
        const user = this.getUsersByID(id);
        if (user) {
            user.name = updateDetails.name;
            user.age = updateDetails.age;
            user.email = updateDetails.email;
            return true;
        }
        return false;
    }
    deleteUser(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }
    updateTask(id, newTitle) {
        const task = this.getTaskByID(id);
        if (task) {
            task.title = newTitle;
            return true;
        }
        return false;
    }
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            return true;
        }
        return false;
    }
    assignTask(taskId, userId) {
        const task = this.getTaskByID(taskId);
        const user = this.getUsersByID(userId);
        if (task && user) {
            task.assignedTo = user;
            return true;
        }
        return false;
    }
    unassignTask(taskId) {
        const task = this.getTaskByID(taskId);
        if (task) {
            task.assignedTo = undefined;
            return true;
        }
        return false;
    }
    getTasksByUser(userId) {
        return this.tasks.filter(task => { var _a; return ((_a = task.assignedTo) === null || _a === void 0 ? void 0 : _a.id) === userId; });
    }
}
const manager = new TaskManager();
const userIdInput = document.getElementById("userId");
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");
const taskIdInput = document.getElementById("taskId");
const taskTitleInput = document.getElementById("taskTitle");
const taskStartInput = document.getElementById("start");
const taskEndInput = document.getElementById("end");
const assignTaskIdInput = document.getElementById("assignTaskId");
const assignUserIdInput = document.getElementById("assignUserId");
const usersList = document.getElementById("usersList");
const tasksList = document.getElementById("tasksList");
function renderUsers() {
    usersList.innerHTML = manager.getAllUsers().map(user => `<div>User ID: ${user.id}, Name: ${user.name}, Email: ${user.email}</div>`).join("");
}
function renderTasks() {
    tasksList.innerHTML = manager.getAllTasks().map(task => { var _a, _b; return `<div>Task ID: ${task.id}, Title: ${task.title}, Assigned To: ${(_b = (_a = task.assignedTo) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'None'}</div>`; }).join("");
}
// Create User
  (_a = document.getElementById("createUser")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const id = Number(userIdInput.value);
    const name = userNameInput.value;
    const email = userEmailInput.value;
    const age = 20; // default or ask user for input
    if (id && name && email) {
        manager.createUser(id, name, age, email);
        renderUsers();
    }
  });
// Update User
  (_b = document.getElementById("updateUser")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    const id = Number(userIdInput.value);
    const name = userNameInput.value;
    const email = userEmailInput.value;
    const age = 20; // default or add age input
    if (manager.updateUser(id, { name, age, email })) {
        renderUsers();
    }
  });
// Delete User
  (_c = document.getElementById("deleteUser")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    const id = Number(userIdInput.value);
    if (manager.deleteUser(id)) {
        renderUsers();
        renderTasks(); // refresh to remove assigned info
    }
  });
// Create Task
  (_d = document.getElementById("create")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    const id = Number(taskIdInput.value);
    const title = taskTitleInput.value;
    const startDate = taskStartInput.value;
    const endDate = taskEndInput.value;
    if (id && title && startDate && endDate) {
        manager.createTask(id, title, startDate, endDate);
        renderTasks();
    }
  });
// Delete Task
  (_e = document.getElementById("delete")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    const id = Number(taskIdInput.value);
    if (manager.deleteTask(id)) {
        renderTasks();
    }
  });
// Assign Task
  (_f = document.getElementById("assignTask")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
    const taskId = Number(assignTaskIdInput.value);
    const userId = Number(assignUserIdInput.value);
    if (manager.assignTask(taskId, userId)) {
        renderTasks();
    }
  });
// Unassign Task
  (_g = document.getElementById("unassignTask")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
    const taskId = Number(assignTaskIdInput.value);
    if (manager.unassignTask(taskId)) {
        renderTasks();
    }
  });
// Initial render
renderUsers();
renderTasks();


// const user1 = manager.createUser(1, "Patt", 30, "patt@gmail.com");
// const user2 = manager.createUser(2, "John", 25, "john@gmail.com" );
// const user3 = manager.createUser(3, "Liz", 23, "liz@gmail.com");
// const user4 = manager.createUser(4, "Ann", 32, "ann@gmail.com");
// const user5 = manager.createUser(5, "Joy", 18, "joy@gmail.com");
// const task1 = manager.createTask(11, "Revise for Maths", "2025-05-20","2025-05-20");
// const task2 = manager.createTask(12, "Complete the Html and Css work", "2025-05-20","2025-05-20");
// const task3 = manager.createTask(13, "Learn javascript", "2025-05-20","2025-05-20");
// const task4 = manager.createTask(14, "Practice public speaking", "2025-05-20","2025-05-20");
// manager.assignTask(11, 1);
// manager.assignTask(12, 4);
// manager.assignTask(13, 3);
// manager.assignTask(14, 2);
// manager.deleteUser(4);
// manager.updateTask(13, "Learn javascript and do a project");
// // manager.unassignTask(14);
// console.info("All Users:", manager.getAllUsers());
// console.info("All Tasks:", manager.getAllTasks());
