async function saveTask() {
    // console.log("Saving task...");

    // Get values
    const title = $("#txtTitle").val().trim();
    const description = $("#txtDescription").val().trim();;
    const color = $("#selColor").val().trim();
    const date = $("#selDate").val().trim();
    const status = $("#selStatus").val().trim();;
    const number = $("#numBudget").val().trim();;
    // console.log(title, description, color, date, status, number);

    // Validate
    if (title === "" || description === "" || date === "" || number === "") {
        alert("You must complete all the fields");
        return;
    }

    // Build an object
    let taskToSave = new Task(title, description, color, date, status, number);
    // console.log(taskToSave);

    // Save to server
    await $.ajax({
        type: 'POST',
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    });

    // Display the data recieved from the server
    $("#items").empty();
    loadTask();

    // Clean the form
    cleanForm();
}

function cleanForm() {
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#selColor").val("black");
    $("#selDate").val("");
    $("#selStatus").val("new");
    $("#numBudget").val("");
}

function loadTask() {
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function (response) {
            let data = JSON.parse(response);
            let counter = 0;
            data.forEach(element => {
                if (element.name === "chris") {
                    console.log(element);
                    displayTask(element, counter);
                    counter++;
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function displayTask(task, counter) {
    let syntax = `
    <div class="card mb-3 mx-4">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                </div>
                <span class="badge bg-${getStatusClass(task.status)}">${task.status}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
                <small class="text-muted">Date: ${task.date}</small>
                <small class="text-muted">Budget: $${task.budget}</small>
                <button class="btn btn-danger btn-sm" onclick="deleteTask('${counter}')">Delete</button>
            </div>
        </div>
    </div>
    `;

    $("#items").append(syntax);
}

// Helper function to assign Bootstrap classes based on the status
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case "new":
            return "info";
        case "in-progress":
            return "warning";
        case "completed":
            return "success";
        case "cancel":
            return "secondary";
        default:
            return "primary";
    }
}

function deleteTask(taskId) {
    console.log(`Task with ID ${taskId} deleted`);
    $(`#list .card:has(button[onclick="deleteTask('${taskId}')"])`).remove();
}

function testFunction() {
    $.ajax({
        url: 'http://fsdiapi.azurewebsites.net',
        type: 'GET',
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function init() {
    console.log('init');

    // Load data
    loadTask();

    // Hook events
    $('#btnSave').click(saveTask);
}

window.onload = init;

// Variable Scope