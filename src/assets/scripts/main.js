const tasks = {};

const themes = {
  default: {
    "--bg": "url('/default-bg.jpg') no-repeat",
    "--card": "#ffffff",
    "--default": "#1e88e5",
    "--default-hover": "#1976d2",
    "--complete": "#76ff03",
    "--complete-hover": "#64dd17",
    "--danger": "#c62828",
    "--danger-hover": "#b71c1c",
    "--borders": "hsla(242, 1%, 35%, 0.5)",
    "--fog": "rgba(0, 0, 0, 0.6)",
  },
  dark: {
    "--bg": "url('/dark-bg.jpg') no-repeat",
    "--card": "#9e9e9e",
    "--default": "#1a237e",
    "--default-hover": "#283593",
    "--complete": "#00695c",
    "--complete-hover": "#004d40",
    "--danger": "#c62828",
    "--danger-hover": "#b71c1c",
    "--borders": "hsla(242, 1%, 35%, 0.5)",
    "--fog": "rgba(0, 0, 0, 0.6)",
  },
};

const form = document.querySelector(".form");
const taskNameInput = document.querySelector(".form__task-name");
const taskDescInput = document.querySelector(".form__task-desc");
const addTaskButton = document.querySelector(".form__btn");
const changeThemeButton = document.querySelector(".header__select");
const taskCardsContainer = document.querySelector(".tasks-section__container");
const taskCardButtonsPattern = `<a class="task-card__complete" href="#">Выполнено</a>
                                <a class="task-card__edit" href="#">Редактировать</a>
                                <a class="task-card__remove" href="#">Удалить</a>`;
const themeFromLocalStorage = localStorage.getItem("theme") || "default";
const filterButtonsContainer = document.querySelector(
  ".tasks-section__filter-buttons"
);
const filterButtons = document.querySelectorAll(
  ".tasks-section__filter-button"
);

form.addEventListener("submit", addNewTask);
taskCardsContainer.addEventListener("click", deleteTask);
taskCardsContainer.addEventListener("click", completeTask);
taskCardsContainer.addEventListener("click", editTask);
changeThemeButton.addEventListener("change", changeThemeByClick);
filterButtonsContainer.addEventListener("click", switchFilter);

changeTheme(themes[themeFromLocalStorage]);
getAllTasksFromLocalStorage();
renderAllTasks(tasks);

function renderAllTasks(tasks) {
  if (!tasks) {
    console.error("Передайте объект с задачами!");
  }

  const fragment = document.createDocumentFragment();
  const arrayOfTasks = [];

  Object.values(tasks).forEach((task) => {
    arrayOfTasks.push(task);
  });

  const sortedArray = arrayOfTasks.sort(
    ({ timestamp: a }, { timestamp: b }) => b - a
  );

  sortedArray.forEach((task) => {
    const newTask = addNewTaskOnPage(task);
    fragment.appendChild(newTask);
  });

  taskCardsContainer.appendChild(fragment);
}

/* start! add task functions */

function addNewTask(e) {
  e.preventDefault();
  const taskName = taskNameInput.value;
  const taskDesc = taskDescInput.value;
  const timestamp = Date.now();

  const taskToObj = addNewTaskToObject(taskName, taskDesc, timestamp);
  addNewTaskToLocalStorage(taskToObj);
  const taskToPage = addNewTaskOnPage(taskToObj);
  taskCardsContainer.insertAdjacentElement("afterbegin", taskToPage);

  form.reset();
}

function addNewTaskToObject(taskName, taskDesc, timestamp) {
  const newTask = {
    taskName,
    taskDesc,
    creationDate: createDateString(),
    timestamp,
    completed: false,
    _id: `task-${Math.random()}`,
  };

  tasks[newTask._id] = newTask;

  return { ...newTask };
}

function addNewTaskOnPage({
  taskName,
  taskDesc,
  completed,
  creationDate,
  _id,
}) {
  const card = document.createElement("div");
  const headerRow = document.createElement("div");
  const name = document.createElement("h3");
  const date = document.createElement("span");
  const desc = document.createElement("p");
  const buttons = document.createElement("div");

  card.classList.add("task-card");
  headerRow.classList.add("task-card__header-row");
  name.classList.add("task-card__task-name");
  date.classList.add("task-card__date");
  desc.classList.add("task-card__task-desc");
  buttons.classList.add("task-card__btns");

  name.textContent = taskName;
  date.textContent = creationDate;
  desc.textContent = taskDesc;
  buttons.innerHTML = taskCardButtonsPattern;

  headerRow.appendChild(name);
  headerRow.appendChild(date);

  card.appendChild(headerRow);
  card.appendChild(desc);
  card.appendChild(buttons);

  card.setAttribute("data-task-id", _id);

  pageCompletePropertySwitcher(
    completed,
    card,
    card.querySelector(".task-card__complete")
  );

  return card;
}

function addNewTaskToLocalStorage(task) {
  localStorage.setItem(task._id, JSON.stringify(task));
}

/* end! add task functions */

/* start! delete task functions */

function deleteTask(e) {
  if (e.target.classList.contains("task-card__remove")) {
    e.preventDefault();
    const parent = e.target.closest("[data-task-id]");
    const isConfirmed = deleteTaskFromObject(
      parent.getAttribute("data-task-id")
    );
    deleteTaskFromPage(isConfirmed, parent);
    deleteTaskFromLocalStorage(isConfirmed, parent);
  }
}

function deleteTaskFromObject(id) {
  const isConfirmed = confirm(
    `Вы действительно хотите удалить задачу "${tasks[id].taskName}"?`
  );
  if (!isConfirmed) return isConfirmed;
  delete tasks[id];
  return isConfirmed;
}

function deleteTaskFromPage(confirmed, task) {
  if (!confirmed) return;
  task.remove();
}

function deleteTaskFromLocalStorage(confirmed, task) {
  if (!confirmed) return;
  localStorage.removeItem(task.getAttribute("data-task-id"));
}

/* end! delete task functions */

/* start! complete task functions */

function completeTask(e) {
  if (
    e.target.classList.contains("task-card__complete") &&
    e.target.getAttribute("href") === "#"
  ) {
    e.preventDefault();
    const parent = e.target.closest("[data-task-id]");
    const completeProperty = objectCompletePropertySwitcher(
      parent.getAttribute("data-task-id")
    );

    pageCompletePropertySwitcher(completeProperty, parent, e.target);
  }
}

function objectCompletePropertySwitcher(id) {
  const taskFromLocalStorage = JSON.parse(
    localStorage.getItem(`${tasks[id]._id}`)
  );
  if (tasks[id].completed) {
    tasks[id].completed = false;
    if (taskFromLocalStorage) {
      localStorageCompletePropertySwitcher(
        taskFromLocalStorage,
        tasks[id].completed
      );
    }
  } else {
    tasks[id].completed = true;
    if (taskFromLocalStorage) {
      localStorageCompletePropertySwitcher(
        taskFromLocalStorage,
        tasks[id].completed
      );
    }
  }
  return tasks[id].completed;
}

function pageCompletePropertySwitcher(isComplete, taskCard, button) {
  const title = taskCard.querySelector(".task-card__task-name");
  const desc = taskCard.querySelector(".task-card__task-desc");
  const editButton = taskCard.querySelector(".task-card__edit");

  if (isComplete) {
    button.textContent = "Не выполнено";
    taskCard.classList.add("task-card_completed");
    button.classList.add("task-card__complete_is-complete");
    title.classList.add("task-card__task-name_is-complete");
    desc.classList.add("task-card__task-desc_is-complete");
    editButton.classList.add("task-card__edit_inaccessible");
    editButton.removeAttribute("href");
    if (
      filterButtons[1].classList.contains(
        "tasks-section__filter-button_is-active"
      )
    ) {
      taskCard.style = "display: none;";
    }
  } else {
    button.textContent = "Выполнено";
    taskCard.classList.remove("task-card_completed");
    button.classList.remove("task-card__complete_is-complete");
    title.classList.remove("task-card__task-name_is-complete");
    desc.classList.remove("task-card__task-desc_is-complete");
    editButton.classList.remove("task-card__edit_inaccessible");
    editButton.setAttribute("href", "#");
    if (
      filterButtons[0].classList.contains(
        "tasks-section__filter-button_is-active"
      )
    ) {
      taskCard.style = "display: none;";
    }
  }
}

function localStorageCompletePropertySwitcher(task, isCompleted) {
  task.completed = isCompleted;
  localStorage.setItem(task._id, JSON.stringify(task));
}

/* end! complete task functions */

/* start! edit task functions */

function editTask(e) {
  if (
    e.target.classList.contains("task-card__edit") &&
    e.target.getAttribute("href") === "#"
  ) {
    e.preventDefault();
    const parent = e.target.closest("[data-task-id]");
    const title = parent.querySelector(".task-card__task-name");
    const desc = parent.querySelector(".task-card__task-desc");
    const completeButton = parent.querySelector(".task-card__complete");

    toggleEditMode(title, desc, e.target, completeButton);
  }
}

function toggleEditMode(taskName, taskDesc, editButton, completeButton) {
  if (editButton.textContent === "Редактировать") {
    taskName.setAttribute("contentEditable", "");
    taskName.setAttribute("spellcheck", "false");
    taskName.focus();
    taskName.classList.add("task-card__task-name_box-shadow");
    taskDesc.setAttribute("contentEditable", "");
    taskDesc.setAttribute("spellcheck", "false");
    taskDesc.classList.add("task-card__task-desc_box-shadow");
    editButton.textContent = "Готово";
    editButton.classList.add("task-card__edit_editable");
    completeButton.classList.add("task-card__complete_inaccessible");
    completeButton.removeAttribute("href");
  } else {
    if (taskName.textContent === "" || taskDesc.textContent === "") {
      alert("Название и описание задачи не могут быть пустыми!");
    } else {
      taskName.removeAttribute("contentEditable");
      taskName.removeAttribute("spellcheck");
      taskName.classList.remove("task-card__task-name_box-shadow");
      taskDesc.removeAttribute("contentEditable");
      taskDesc.removeAttribute("spellcheck");
      taskDesc.classList.remove("task-card__task-desc_box-shadow");
      editButton.textContent = "Редактировать";
      editButton.classList.remove("task-card__edit_editable");
      completeButton.classList.remove("task-card__complete_inaccessible");
      completeButton.setAttribute("href", "#");
      saveEditedTaskInLocalStorage(
        taskName.textContent,
        taskDesc.textContent,
        editButton
      );
    }
  }
}

function saveEditedTaskInLocalStorage(taskName, taskDesc, editButton) {
  const taskCard = editButton.closest(".task-card");
  const id = taskCard.getAttribute("data-task-id");
  const localStorageTask = JSON.parse(localStorage.getItem(id));
  localStorageTask.taskName = taskName;
  localStorageTask.taskDesc = taskDesc;
  localStorage.setItem(id, JSON.stringify(localStorageTask));
}

/* end! edit task functions */

/* start! change theme functions */

function changeThemeByClick(e) {
  const selectedTheme = changeThemeButton.value;
  const themeFromObject = themes[selectedTheme];
  changeTheme(themeFromObject);
  localStorage.setItem("theme", selectedTheme);
}

function changeTheme(themeFromObject) {
  Object.entries(themeFromObject).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

/* end! change theme functions */

/* start! localStorage functions */

function getAllTasksFromLocalStorage() {
  for (let key in localStorage) {
    if (key.split("-")[0] === "task") {
      tasks[key] = JSON.parse(localStorage.getItem(key));
    }
  }
}

/* end! localStorage functions */

/* start! date functions */

function createDateString() {
  const date = new Date();
  const min = date.getMinutes();
  const hour = date.getHours();
  const dd = date.getDate();
  const mm = date.getMonth();
  const yyyy = date.getFullYear();
  return `${String(dd).length === 1 ? "0" + dd : dd}.${
    String(mm).length === 1 ? "0" + (mm + 1) : mm + 1
  }.${yyyy} ${hour}:${min}`;
}

/* end! date functions */

/* start! filter functions */

function switchFilter(e) {
  if (e.target) {
    e.preventDefault();
    const target = e.target;
    filterButtons.forEach((item, index) => {
      item.classList.remove("tasks-section__filter-button_is-active");
      if (item === target) {
        filterCards(index);
        item.classList.add("tasks-section__filter-button_is-active");
      }
    });
  }
}

function filterCards(index) {
  const cards = document.querySelectorAll(".task-card");
  cards.forEach((card) => {
    card.style = "display: block";
    if (!card.classList.contains("task-card_completed") && index === 0) {
      card.style = "display: none;";
    } else if (card.classList.contains("task-card_completed") && index === 1) {
      card.style = "display: none;";
    }
  });
}

/* end! date functions */
