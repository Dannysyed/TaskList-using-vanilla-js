"use strict";

$(document).ready(() => {
  const studentName = $("small");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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
        const taskItem = $(`<li ${task.completed ? 'class="completed"' : ""}>
                                <span>${task.name} - ${task.priority} - ${
          task.dueDate ? task.dueDate : "No due date"
        }</span>
                                <button class="complete">&#x2713;</button>
                                <button class="edit">&#9998;</button>
                                <button class="delete">&#x2715;</button></li>`);
        taskItem.find(".complete").click(() => {
          tasks[index].completed = !tasks[index].completed;
          updateLocalStorage();
          updateTaskList(filter);
        });
        taskItem.find(".edit").click(() => {
          const newTaskName = prompt("Edit Task Name", task.name);
          const newTaskPriority = prompt(
            "Edit Task Priority (low, medium, high)",
            task.priority
          );
          const newTaskDueDate = prompt(
            "Edit Task Due Date (yyyy-mm-dd)",
            task.dueDate
          );
          if (newTaskName) tasks[index].name = newTaskName.trim();
          if (newTaskPriority) tasks[index].priority = newTaskPriority.trim();
          if (newTaskDueDate) tasks[index].dueDate = newTaskDueDate.trim();
          updateLocalStorage();
          updateTaskList(filter);
        });
        taskItem.find(".delete").click(() => {
          tasks.splice(index, 1);
          updateLocalStorage();
          updateTaskList(filter);
        });
        taskList.append(taskItem);
      });
  };

  const sortTasksByPriority = () => {
    tasks.sort((a, b) => {
      const priorities = { low: 1, medium: 2, high: 3 };
      return priorities[b.priority] - priorities[a.priority];
    });
    updateLocalStorage();
    updateTaskList();
  };

  const sortTasksByDueDate = () => {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    updateLocalStorage();
    updateTaskList();
  };

  $("#add_task").click(() => {
    const taskName = $("#task").val().trim();
    const taskPriority = $("#priority").val();
    const taskDueDate = $("#due_date").val();

    if (taskName === "") {
      alert("Please enter a task.");
      $("#task").focus();
    } else {
      tasks.push({
        name: taskName,
        priority: taskPriority,
        dueDate: taskDueDate,
        completed: false,
      });
      updateLocalStorage();
      updateTaskList();

      $("#task").val("");
      $("#priority").val("low");
      $("#due_date").val("");
      $("#task").focus();
    }
  });

  $("#clear_tasks").click(() => {
    tasks.length = 0;
    updateLocalStorage();
    updateTaskList();
    $("#task").focus();
  });

  $("#all_tasks").click(() => updateTaskList("all"));
  $("#completed_tasks").click(() => updateTaskList("completed"));
  $("#pending_tasks").click(() => updateTaskList("pending"));

  $("#sort_priority").click(sortTasksByPriority);
  $("#sort_due_date").click(sortTasksByDueDate);

  $("#dark_mode_toggle").change(() => {
    $("body").toggleClass("dark-mode");
  });

  $("#task").focus();
  studentName.text("\u00A9 Daniyal Mahmood/8877543 2023");
  updateTaskList();
});
