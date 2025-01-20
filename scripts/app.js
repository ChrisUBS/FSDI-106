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

    // Display the data recieved from the server
    displayTask(taskToSave);
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

    // Hook events
    $('#btnSave').click(saveTask);
}

window.onload = init;

// Variable Scope