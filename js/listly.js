var Listly =  function() {
  // Listed twice so as to make it a Constructor
  function Listly() {
    // This is so you can access "this" in the event handler function. Once you get into the event handler,
    // you won't be able to because "this" refers to the form object
    var self = this;
    self.tasks = [];

    function addTask(task_name) {

      // Add task name to task array - Did not reset task_name variable, so can use here
      // Self is the object. Self.tasks is the actual array.
      self.tasks.push(task_name);
      // add tasks to list
      if (save()) {
        $('#tasks').append('<li class="list-group-item">'+ task_name +'</li>');
      }

    }

    function save() {
      try {
        //Save it to local storage, localstore.x where x equals anything you want to call it
        localStorage.tasks = JSON.stringify(self.tasks);
      } catch(err) {
        return false;
      }
        return true;
      }

    function clearAndFocusField(field) {
      field = $(field);
      //Reset Form Field
      field.val('');
      field.focus();
    }


    //Look for form descendant new_task, and get when fired a function (event, function call)
    $('form#new_task').on('submit', function(ev) {
      ev.preventDefault();
      var form_field = $(this.task_name)

      // "this" is for the form element, because event handlers always come from a form
      var task_name = this.task_name.value;

      //The call method needs a "call"
      addTask(task_name);
      clearAndFocusField(form_field);

    });

  }
  return Listly;
}();

var listly = new Listly();
