var Listly =  function() {
  // Listed twice so as to make it a Constructor
  function Listly() {
    this.tasks = [];

    var self = this;

    //Look for form descendant new_task, and get when fired a function (event, function call)
    $('form#new_task').on('submit', function(ev) {
      ev.preventDefault();
      // "this" is for the form element, because event handlers always come from a form
      // Add tasks to list
      var task_name = this.task_name.value;
      var result = $('#tasks').append('<li class="list-group-item">'+ task_name +'</li>');
      this.task_name.value = '';
      $(this.task_name).focus();

      // Add tasks to local storage
    });

  }
  return Listly;
}();

var listly = new Listly();
