"use strict";

$(document).ready(() => {
    const studentName = $('small')
    const tasks = [];

    $("#add_task").click(() => {
        const textbox = $("#task");
        const taskInput = textbox.val().trim(); // Removing leading/trailing whitespace

        if (taskInput === "") {
            alert("Please enter a task.");
            textbox.focus();
        } else {
            // Spliting  the taskInput into an array using commas as the delimiter
            const newTasks = taskInput.split(',').map(task => task.trim()).filter(task => task !== "");

            // To Add the new tasks to the tasks array
            tasks.push(...newTasks);

            // To Clear the task text box and re-display tasks
            textbox.val("");
            $("#task_list").val(tasks.join("\n"));
            textbox.focus();
        }
    });

    $("#clear_tasks").click(() => {
        tasks.length = 0;
        $("#task_list").val("");
        $("#task").focus();
    });

    $("#task").focus();
    studentName.text('\u00A9 Daniyal Mahmood/8877543 2023')
});
