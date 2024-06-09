"use strict";

$(document).ready(() => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  $("#signin").click(() => {
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      $("#signin_message")
        .text("Sign in successful. Redirecting to task list...")
        .css("color", "green");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      $("#signin_message")
        .text("Invalid email or password. Please try again.")
        .css("color", "red");
    }
  });

  $("#signup").click(() => {
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();

    if (name === "" || email === "" || password === "") {
      $("#signup_message").text("All fields are required.").css("color", "red");
    } else if (users.find((user) => user.email === email)) {
      $("#signup_message")
        .text("Email is already registered.")
        .css("color", "red");
    } else {
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      $("#signup_message")
        .text("Sign up successful. Redirecting to sign in...")
        .css("color", "green");
      setTimeout(() => {
        window.location.href = "signin.html";
      }, 1000);
    }
  });
});
