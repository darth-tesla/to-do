const tasks = {};

const form = document.querySelector(".form");
const taskNameInput = document.querySelector(".form__task-name");
const taskDescInput = document.querySelector(".form__task-desc");
const addTaskButton = document.querySelector(".form__btn");
const taskCardsContainer = document.querySelector(".tasks-section__container");
const taskCardButtonsPattern = `<a class="task-card__complete" href="#"> Выполнено</a>
                                <a class="task-card__edit" href="#"> Редактировать</a>
                                <a class="task-card__remove" href="#"> Удалить</a>`;

form.addEventListener("submit", addNewTask);

renderAllTasks(tasks);

function renderAllTasks(tasks) {
  if (!tasks) {
    console.error("Передайте объект с задачами!");
  }

  const fragment = document.createDocumentFragment();

  Object.values(tasks).forEach((task) => {
    const newTask = addNewTaskOnPage(task);
    fragment.appendChild(newTask);
  });

  taskCardsContainer.appendChild(fragment);
}

function addNewTask(e) {
  e.preventDefault();
  const taskName = taskNameInput.value;
  const taskDesc = taskDescInput.value;

  const taskToObj = addNewTaskToObject(taskName, taskDesc);
  const taskToPage = addNewTaskOnPage(taskToObj);
  taskCardsContainer.insertAdjacentElement("afterbegin", taskToPage);
}

function addNewTaskToObject(taskName, taskDesc) {
  const newTask = {
    taskName,
    taskDesc,
    completed: false,
    _id: `task-${Math.random()}`,
  };

  tasks[newTask._id] = newTask;

  return { ...newTask };
}

function addNewTaskOnPage({ taskName, taskDesc, _id }) {
  const card = document.createElement("div");
  const name = document.createElement("h3");
  const desc = document.createElement("p");
  const buttons = document.createElement("div");

  card.classList.add("task-card");
  name.classList.add("task-card__task-name");
  desc.classList.add("task-card__task-desc");
  buttons.classList.add("task-card__btns");

  name.textContent = taskName;
  desc.textContent = taskDesc;
  buttons.innerHTML = taskCardButtonsPattern;

  card.appendChild(name);
  card.appendChild(desc);
  card.appendChild(buttons);

  return card;
}


