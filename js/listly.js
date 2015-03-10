var Listly =  function() {
  // Listed twice so as to make it a Constructor
  function Listly() {
    // This is so you can access "this" in the event handler function. Once you get into the event handler,
    // you won't be able to because "this" refers to the form object
    var self = this;
    // We set this array up as a staging area for data we want to put into and take out of the LocalStorage
    self.tasks = [];

    function addTask(task_name) {

      // Add task name to task array - Did not reset task_name variable in the event handler, so can use here
      // Self is the object. Self.tasks is the actual array.
      self.tasks.push(task_name);
      // If successfully saved (no errors), we display information to user
      if (save()) {
        // jQuery, find item with #tasks ID, here the text in the field because it is passed from the task_name in "function addTask(task_name)",
        // and add this to an ordered list using <li> elements. Because it is an <ol>, jQuery knows to just add the <li> statements one after another.
        $('#tasks').append('<li class="list-group-item">' + task_name + '</li>');
        // Leave this function and continue with the previous action
        return true;
      }
      else {
        // any error reporting for UI would go here
        return false;
      }
    }

    function load() {
      // Take the information we stored in localStorage.tasks and bring it back into an array we can access in
      //  our document, the self.tasks array
      self.tasks = JSON.parse(localStorage.tasks);
      // $.each is a jQuery function that iterate through an array. It takes two arguments. The first is what
      //  we will be iterating through, in this case the self.tasks array. The second is the function we will
      //  apply to each item as we go through the array. This function needs two arguments as well. In this case,
      //  index is the position of the item that determines if it exists (if it doesn't the function stops), and
      //  the variable we are passing, which is the value we wish the value in the array to have, here task_name.
      //  This allows us in the next line to insert the item as a variable called "task_name"
      $.each(self.tasks, function(index, task_name) {
      // jQuery, find item with #tasks ID, here the text in the field because it is the data gleamed from the self.tasks array,
      // and add this to an ordered list using <li> elements. Because it is an <ol>, jQuery knows to just add the <li> statements one after another.
        $('#tasks').append('<li class="list-group-item">' + task_name + '</li>');
      });
    }

    function save() {
      try {
        // Save it to local storage, localstore.x where x equals anything you want to call it. It needs to be stored as JSON
        // for local storage, so we need to turn our self.tasks array into string data first.
        return (localStorage.tasks = JSON.stringify(self.tasks));
      }
      catch(err) {
        // any error reporting for UI would go here
        return false;
      }
    }

    // Load any data from data storage on to screen. Do this before loading the event handler
    load();

    //Look for form child with ID new_task, and get when "ev" event fires a submit action.
    $('form#new_task').on('submit', function(ev) {
      // Prevent any default action the event handler uses so we have more control over it
      ev.preventDefault();
      // set the variable field to jQuery selector of this (here the form since because of cloture it is what this corrseponds to), and it's
      //  method(attribute?) task_name. The reason we can call this is because it is jQuery and it figures that part out for you.
      var field = $(this.task_name);

      // jQuery, setting variable "task_name" to the value of the field we declared earlier in "form#task_name"
      var task_name = field.val();

      // If we successfully return the addTask function (line 21 fires), and in which we need to pass our item to since addTask requires
      //  an argument to be passed (See line 10), then we clear the field string value using jQuery method field.val()
      if (addTask(task_name)) {
        field.val('');
      }
      // after the event handler fires, jQuery focus on the field and make it selected. Just good UI.
      field.focus().select();
    });
  }

  //End all actions that may be in place.
  return Listly;
}(); // Execute the function. Works here because of the way we set up the constructor

// Final constructor piece
var listly = new Listly();
