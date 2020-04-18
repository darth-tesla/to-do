const form = document.querySelector(".form");
const taskNameInput = document.querySelector(".form__task-name");
const taskDescInput = document.querySelector(".form__task-desc");
const addTaskButton = document.querySelector(".form__btn");
const taskCardsContainer = document.querySelector(".tasks-section__container");
const taskCardButtonsPattern = `<a class="task-card__complete" href="#"> Выполнено</a>
                                <a class="task-card__edit" href="#"> Редактировать</a>
                                <a class="task-card__remove" href="#"> Удалить</a>`;

addTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (taskNameInput.value !== "" && taskDescInput.value !== "") {
    addNewTask(taskNameInput.value, taskDescInput.value);
    form.reset();
    return;
  }
});

function addNewTask(taskName, taskDesc) {
  const fragment = document.createDocumentFragment();

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

  fragment.appendChild(card);

  taskCardsContainer.appendChild(fragment);

  return;
}
