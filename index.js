// index.js
//console.log("js is working today")

$(document).ready(function () {
  //console.log('dom ready');
  var getAndDisplayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=199',
      dataType: 'json',
      success: function (response, textStatus) {
        $('#todo-list').empty();    //this code clears out all the existing tasks in the HTML before injecting the latest tasks
        response.tasks.forEach(function (task) {
          //console.log(task.content);
          $('#todo-list').append('<div class = "row"><p class = "col-xs-8">' + task.content + '</p><button class = "delete" data-id="' + task.id + '">Delete</button>');
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var createTask = function () {
    $.ajax({
      type: 'POST',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=199',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#new-task-content').val()
        }
      }),
      success: function (response, textStatus) {
        $('#new-task-content').val('');
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $('#create-task').on('submit', function (e) {
    e.preventDefault();   //default behaviour of when form is submitted is to reload page
    createTask();
  });

  getAndDisplayAllTasks();

  var deleteTask = function (id) {
    $.ajax({
     type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=199',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'))
  })

});
