const tasks = {
  "19246916918274": {
    taskName: "Wash cat",
    taskDesc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas cum, culpa earum animi sapiente debitis, ducimus asperiores illo ea, iure odit eligendi sed omnis deserunt. Nulla eveniet tempora veniam reprehenderit sint accusamus explicabo minima. Rem incidunt doloremque repellat dignissimos soluta facilis, velit tempore impedit voluptatibus recusandae itaque officiis? Adipisci dignissimos soluta aspernatur, sed officiis ab quis quod amet natus. Cumque voluptates iste nisi, reiciendis deserunt eum corporis rerum, commodi veniam quaerat mollitia id distinctio provident, nihil veritatis rem omnis voluptatem numquam tempore eligendi eius maxime odio repellat minus. Cumque quam tempora facere, facilis iste nihil veritatis deleniti eaque blanditiis accusantium!",
    completed: false,
    _id: "19246916918274",
  },
  "203490978023840": {
    taskName: "Eat brains",
    taskDesc:
      "Rem incidunt doloremque repellat dignissimos soluta facilis, velit tempore impedit voluptatibus recusandae itaque officiis? Adipisci dignissimos soluta aspernatur, sed officiis ab quis quod amet natus. Cumque voluptates iste nisi, reiciendis deserunt eum corporis rerum, commodi veniam quaerat mollitia id distinctio provident, nihil veritatis rem omnis voluptatem numquam tempore eligendi eius maxime odio repellat minus. Cumque quam tempora facere, facilis iste nihil veritatis deleniti eaque blanditiis accusantium!",
    completed: true,
    _id: "203490978023840",
  },
  "2938759245692436598237": {
    taskName: "Go for a walk",
    taskDesc:
      "Adipisci dignissimos soluta aspernatur, sed officiis ab quis quod amet natus. Cumque voluptates iste nisi, reiciendis deserunt eum corporis rerum, commodi veniam quaerat mollitia id distinctio provident, nihil veritatis rem omnis voluptatem numquam tempore eligendi eius maxime odio repellat minus. Cumque quam tempora facere, facilis iste nihil veritatis deleniti eaque blanditiis accusantium!",
    completed: false,
    _id: "2938759245692436598237",
  },
};

const themes = {
  default: {
    "--bg": "url('/default-bg.jpg') no-repeat",
    "--card": "#ffffff",
    "--default": "hsla(242, 60%, 35%, 1)",
    "--default-hover": "hsla(242, 90%, 35%, 1)",
    "--complete": "hsla(124, 60%, 35%, 1)",
    "--complete-hover": "hsla(124, 90%, 35%, 1)",
    "--danger": "hsla(360, 60%, 35%, 1)",
    "--danger-hover": "hsla(360, 90%, 35%, 1)",
    "--borders": "hsla(242, 1%, 35%, 0.5)",
    "--fog": "rgba(0, 0, 0, 0.6)",
  },
  dark: {
    "--bg": "url('/dark-bg.jpg') no-repeat",
    "--card": "hsla(30, 6%, 20%, 1)",
    "--default": "hsla(242, 60%, 22%, 1)",
    "--default-hover": "hsla(242, 90%, 35%, 1)",
    "--complete": "hsla(124, 60%, 35%, 1)",
    "--complete-hover": "hsla(124, 90%, 35%, 1)",
    "--danger": "hsla(360, 94%, 45%, 1)",
    "--danger-hover": "hsla(360, 94%, 60%, 1)",
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

form.addEventListener("submit", addNewTask);
taskCardsContainer.addEventListener("click", deleteTask);
taskCardsContainer.addEventListener("click", completeTask);
taskCardsContainer.addEventListener("click", editTask);
changeThemeButton.addEventListener("change", changeTheme);

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

/* start! add task functions */

function addNewTask(e) {
  e.preventDefault();
  const taskName = taskNameInput.value;
  const taskDesc = taskDescInput.value;

  const taskToObj = addNewTaskToObject(taskName, taskDesc);
  const taskToPage = addNewTaskOnPage(taskToObj);
  taskCardsContainer.insertAdjacentElement("afterbegin", taskToPage);

  form.reset();
}

function addNewTaskToObject(taskName, taskDesc) {
  const newTask = {
    taskName,
    taskDesc,
    completed: false,
    _id: `task-${Math.random()}`,
  };

  tasks[newTask._id] = newTask;

  console.log(tasks);

  return { ...newTask };
}

function addNewTaskOnPage({ taskName, taskDesc, completed, _id }) {
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

  card.setAttribute("data-task-id", _id);

  pageCompletePropertySwitcher(
    completed,
    card,
    card.querySelector(".task-card__complete")
  );

  return card;
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
  if (tasks[id].complete) {
    tasks[id].complete = false;
  } else {
    tasks[id].complete = true;
  }
  return tasks[id].complete;
}

function pageCompletePropertySwitcher(isComplete, taskCard, button) {
  const title = taskCard.querySelector(".task-card__task-name");
  const desc = taskCard.querySelector(".task-card__task-desc");
  const editButton = taskCard.querySelector(".task-card__edit");

  if (isComplete) {
    button.textContent = "Не выполнено";
    button.classList.add("task-card__complete_is-complete");
    title.classList.add("task-card__task-name_is-complete");
    desc.classList.add("task-card__task-desc_is-complete");
    editButton.classList.add("task-card__edit_inaccessible");
    editButton.removeAttribute("href");
  } else {
    button.textContent = "Выполнено";
    button.classList.remove("task-card__complete_is-complete");
    title.classList.remove("task-card__task-name_is-complete");
    desc.classList.remove("task-card__task-desc_is-complete");
    editButton.classList.remove("task-card__edit_inaccessible");
    editButton.setAttribute("href", "#");
  }
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
  }
}

/* end! edit task functions */

/* start! change theme functions */

function changeTheme(e) {
  const selectedTheme = changeThemeButton.value;
  const themeFromObject = themes[selectedTheme];
  Object.entries(themeFromObject).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

/* end! change theme functions */
