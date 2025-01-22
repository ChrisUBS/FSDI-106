function saveTask() {
    console.log("Saving task...");

    // Get values
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const number = $("#numBudget").val();
    // console.log(title, description, color, date, status, number);

    // Build an object
    let taskToSave = new Task(title, description, color, date, status, number);
    console.log(taskToSave);

    // Save to server
    $.ajax({
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
    displayTask(taskToSave);
}

function loadTask() {
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function (response) {
            // console.log(response);
            let data = JSON.parse(response);
            // console.log(data);
            // console.log only those elements that were created by your on the server
            data.forEach(element => {
                if (element.name === "cubs") {
                    console.log(element);
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function displayTask(task) {
    let syntax = `
    <div class='task'>
        <div class='info'>
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>
        
        <label class='status'>${task.status}</label>

        <div class='date-budget'>
            <label>${task.date}</label>
            <label>${task.budget}</label>
        </div>
    </div>
    `;

    $("#list").append(syntax);
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