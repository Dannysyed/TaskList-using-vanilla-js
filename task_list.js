$(document).ready(() => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const updateLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const updateTaskList = (filter = "all") => {
    const taskList = $("#task_list");
    taskList.empty();

    tasks
      .filter((task) => {
        if (filter === "all") return true;
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
      })
      .forEach((task, index) => {
        const taskItem = $(`
            <li class="${task.completed ? "completed" : ""}">
              <span>${task.name} - ${task.priority} - ${task.dueDate}</span>
              <div>
                <button class="complete">${task.completed ? "✓" : "○"}</button>
                <button class="edit">&#x270E;</button>
                <button class="delete">&#x2715;</button>
              </div>
            </li>`);
        taskList.append(taskItem);

        taskItem.find(".complete").click(() => {
          tasks[index].completed = !tasks[index].completed;
          updateLocalStorage();
          updateTaskList(filter);
        });

        taskItem.find(".delete").click(() => {
          tasks.splice(index, 1);
          updateLocalStorage();
          updateTaskList(filter);
        });

        taskItem.find(".edit").click(() => {
          const newTaskName = prompt("Edit task name:", task.name);
          const newPriority = prompt("Edit priority:", task.priority);
          const newDueDate = prompt("Edit due date:", task.dueDate);
          if (newTaskName) tasks[index].name = newTaskName;
          if (newPriority) tasks[index].priority = newPriority;
          if (newDueDate) tasks[index].dueDate = newDueDate;
          updateLocalStorage();
          updateTaskList(filter);
        });
      });
  };

  $("#add_task").click(() => {
    const taskName = $("#task").val();
    const priority = $("#priority").val();
    const dueDate = $("#due_date").val();

    if (taskName) {
      tasks.push({
        name: taskName,
        priority,
        dueDate,
        completed: false,
      });
      updateLocalStorage();
      updateTaskList();
      $("#task").val("");
      $("#priority").val("low");
      $("#due_date").val("");
      closeModal();
    } else {
      alert("Task name is required.");
    }
  });

  $("#clear_tasks").click(() => {
    tasks.length = 0;
    updateLocalStorage();
    updateTaskList();
  });

  $("#all_tasks").click(() => updateTaskList("all"));
  $("#completed_tasks").click(() => updateTaskList("completed"));
  $("#pending_tasks").click(() => updateTaskList("pending"));

  $("#sort_priority").click(() => {
    tasks.sort((a, b) => {
      const priorities = ["low", "medium", "high"];
      return priorities.indexOf(a.priority) - priorities.indexOf(b.priority);
    });
    updateTaskList();
  });

  $("#sort_due_date").click(() => {
    tasks.sort((a, b) => {
      if (a.dueDate && b.dueDate)
        return new Date(a.dueDate) - new Date(b.dueDate);
      return !a.dueDate ? 1 : -1;
    });
    updateTaskList();
  });

  const modal = $("#task_modal");
  const openModalButton = $("#open_modal");
  const closeModalButton = $(".close");

  const openModal = () => {
    modal.fadeIn();
  };

  const closeModal = () => {
    modal.fadeOut();
  };

  openModalButton.click(() => {
    openModal();
  });

  closeModalButton.click(() => {
    closeModal();
  });

  $(window).click((event) => {
    if (event.target === modal[0]) {
      closeModal();
    }
  });

  updateTaskList();

  $("#dark_mode_toggle").change(function () {
    $("body").toggleClass("dark-mode", this.checked);
  });
});
