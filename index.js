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

        var activeCounter = 0;
        //console.log(tasks.content);
        response.tasks.forEach(function (task) {

          //modify code below. if complete !== true, create div class "active", vice versa for incomplete
          if (task.completed == true) {
            $('#todo-list').append('<div class = "row completedTask allTask"><p class = "col-xs-8">' + task.content + '</p><button class = "delete" data-id="' + task.id + '">Delete</button><input type = "checkbox" class = "mark-complete" data-id = "' + task.id + '"' + (task.completed ? ' checked' : '') + '>');
          } else {
            $('#todo-list').append('<div class = "row activeTask allTask"><p class = "col-xs-8">' + task.content + '</p><button class = "delete" data-id="' + task.id + '">Delete</button><input type = "checkbox" class = "mark-complete" data-id = "' + task.id + '"' + (task.completed ? ' checked' : '') + '>');

            activeCounter++;
          }
          console.log(task);

          /*if (task.completed == true) {
            console.log(task.content);
            $('#todo-list').append('<div class = "row"><p class = "col-xs-8">' + task.content + '</p><button class = "delete" data-id="' + task.id + '">Delete</button><input type = "checkbox" class = "mark-complete" data-id = "' + task.id + '"' + (task.completed? 'checked' : '') + '>');

            activeCounter++;
          }*/
        });

          //var counterAct = _.countBy($(''));
          $('.activeCount').html('<p>' + activeCounter + ' items left;</p>');




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

  //getAndDisplayAllTasks();

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

  var markTaskComplete = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=199',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var markTaskActive = function (id) {
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=199',
      dataType: 'json',
      success: function (response, textStatus) {
        getAndDisplayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      markTaskComplete($(this).data('id'));
    } else {
      markTaskActive($(this).data('id'));
    }
  });

  getAndDisplayAllTasks();

});

var showAll = function () {
  $('div.activeTask').show();
  $('div.completedTask').show();
}

var showActive = function () {
  $('div.activeTask').show();
  $('div.completedTask').hide();
}

var showCompleted = function () {
  $('div.activeTask').hide();
  $('div.completedTask').show();
}

$(document).on('click', '.buttonForAll', function (e) {
  e.preventDefault();
  showAll();
});

$(document).on('click', '.buttonForActive', function (e) {
  e.preventDefault();
  showActive();
});

$(document).on('click', '.buttonForCompleted', function (e) {
  e.preventDefault();
  showCompleted();
});
