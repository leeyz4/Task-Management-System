class User{
    constructor(
      public id: number, 
      public name: string, 
      public age: number,
      public email: string
      ) {}
}

class Task{
    constructor(
        public id: number,
        public title: string,
        public startDate: string,
        public endDate: string, 
        public assignedTo?: User
    ) {}
}

class TaskManager {
    public users: User[] = [];
    public tasks: Task[] = [];

   createUser(id: number, name: string, age: number, email: string ): User{
    const user = new User(id, name, age, email);
    this.users.push(user);
    return user;
   }

   createTask(id: number, title: string, startDate: string, endDate: string ): Task{
    const task = new Task(id, title,  startDate, endDate);
    this.tasks.push(task);
    return task;
}

   getAllUsers(): User[]{
    return this.users;
   }

   getAllTasks(): Task[]{
    return this.tasks;
}

   getUsersByID(id: number): User | undefined{
    return this.users.find(user => user.id === id);
   }

   getUsersByAge(age: number): User | undefined{
    return this.users.find(user => user.age === age);
   }

   getTaskByID(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
    
    }

   updateUser(id: number, updateDetails:{name: string, age: number, email: string}): boolean{
     const user = this.getUsersByID(id);
        if(user) {
            user.name = updateDetails.name;
            user.age = updateDetails.age;
            user.email = updateDetails.email;
            return true;
        }
        return false;
    }

    deleteUser(id: number): boolean{
        const userIndex = this.users.findIndex(user => user.id === id);
        if(userIndex !== -1){
            this.users.splice(userIndex, 1);
            return true;
        }

        return false;
    }

    updateTask(id: number, newTitle: string) : boolean {
        const task = this.getTaskByID(id);
        if (task) {
          task.title = newTitle;
          return true;
        }
        return false;
      }
    
      deleteTask(id: number): boolean {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
          this.tasks.splice(taskIndex, 1);
          return true;
        }
        return false;
      }
    
      assignTask(taskId: number, userId: number): boolean {
        const task = this.getTaskByID(taskId);
        const user = this.getUsersByID(userId);
        if (task && user) {
            task.assignedTo = user;
            return true;
        }
            return false;
    }
    
      unassignTask(taskId: number): boolean {
        const task = this.getTaskByID(taskId);
        if (task) {
          task.assignedTo = undefined;
          return true;
        }
        return false;
      }
    
      getTasksByUser(userId: number): Task[] {
        return this.tasks.filter(task => task.assignedTo?.id === userId);
      }
}

const manager = new TaskManager();

const userIdInput = document.getElementById("userId") as HTMLInputElement;
const userNameInput = document.getElementById("userName") as HTMLInputElement;
const userEmailInput = document.getElementById("userEmail") as HTMLInputElement;

const taskIdInput = document.getElementById("taskId") as HTMLInputElement;
const taskTitleInput = document.getElementById("taskTitle") as HTMLInputElement;
const taskStartInput = document.getElementById("start") as HTMLInputElement;
const taskEndInput = document.getElementById("end") as HTMLInputElement;

const assignTaskIdInput = document.getElementById("assignTaskId") as HTMLInputElement;
const assignUserIdInput = document.getElementById("assignUserId") as HTMLInputElement;

const usersList = document.getElementById("usersList")!;
const tasksList = document.getElementById("tasksList")!;

function renderUsers() {
    usersList.innerHTML = manager.getAllUsers().map(user =>
       `<div>User ID: ${user.id}, Name: ${user.name}, Email: ${user.email}</div>`).join("");
}

function renderTasks() {
    tasksList.innerHTML = manager.getAllTasks().map(task =>
        `<div>Task ID: ${task.id}, Title: ${task.title}, Assigned To: ${task.assignedTo?.name ?? 'None'}</div>`).join("");
}



// Create User
document.getElementById("createUser")?.addEventListener("click", () => {
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
document.getElementById("updateUser")?.addEventListener("click", () => {
    const id = Number(userIdInput.value);
    const name = userNameInput.value;
    const email = userEmailInput.value;
    const age = 20; // default or add age input

    if (manager.updateUser(id, { name, age, email })) {
        renderUsers();
    }
});

// Delete User
document.getElementById("deleteUser")?.addEventListener("click", () => {
    const id = Number(userIdInput.value);
    if (manager.deleteUser(id)) {
        renderUsers();
        renderTasks(); // refresh to remove assigned info
    }
});

// Create Task
document.getElementById("create")?.addEventListener("click", () => {
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
document.getElementById("delete")?.addEventListener("click", () => {
    const id = Number(taskIdInput.value);
    if (manager.deleteTask(id)) {
        renderTasks();
    }
});

// Assign Task
document.getElementById("assignTask")?.addEventListener("click", () => {
    const taskId = Number(assignTaskIdInput.value);
    const userId = Number(assignUserIdInput.value);
    if (manager.assignTask(taskId, userId)) {
        renderTasks();
    }
});

// Unassign Task
document.getElementById("unassignTask")?.addEventListener("click", () => {
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
    