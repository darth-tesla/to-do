const tasks = {
  "123091234523": {
    taskName: "Помыть кота",
    taskDesc: "Он чумазый, что пиздец",
    complete: false,
    _id: "123091234523",
  },
};

const form = document.querySelector(".form");
const taskNameInput = document.querySelector(".form__task-name");
const taskDescInput = document.querySelector(".form__task-desc");
const addTaskButton = document.querySelector(".form__btn");
const taskCardsContainer = document.querySelector(".tasks-section__container");
const taskCardButtonsPattern = `<a class="task-card__complete" href="#">Выполнено</a>
                                <a class="task-card__edit" href="#">Редактировать</a>
                                <a class="task-card__remove" href="#">Удалить</a>`;

form.addEventListener("submit", addNewTask);
taskCardsContainer.addEventListener("click", deleteTask);
taskCardsContainer.addEventListener("click", completeTask);
taskCardsContainer.addEventListener("click", editTask);

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

  card.setAttribute("data-task-id", _id);

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

    editMode(parent, title, desc, e.target, completeButton);
  }
}

function editMode(taskCard, taskName, taskDesc, editButton, completeButton) {
  if (editButton.textContent === "Редактировать") {
    taskName.setAttribute("contentEditable", "");
    taskName.focus();
    taskName.classList.add("task-card__task-name_box-shadow");
    taskDesc.setAttribute("contentEditable", "");
    taskDesc.classList.add("task-card__task-desc_box-shadow");
    editButton.textContent = "Готово";
    editButton.classList.add("task-card__edit_editable");
    completeButton.classList.add("task-card__complete_inaccessible");
    completeButton.removeAttribute("href");
  } else {
    taskName.removeAttribute("contentEditable");
    taskName.classList.remove("task-card__task-name_box-shadow");
    taskDesc.removeAttribute("contentEditable");
    taskDesc.classList.remove("task-card__task-desc_box-shadow");
    editButton.textContent = "Редактировать";
    editButton.classList.remove("task-card__edit_editable");
    completeButton.classList.remove("task-card__complete_inaccessible");
    completeButton.setAttribute("href", "#");
  }
}
