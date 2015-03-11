var Listly =  function() {
  // Listed twice so as to make it a Constructor
  function Listly() {
    // This is so you can access "this" in the event handler function. Once you get into the event handler,
    // you won't be able to because "this" refers to the form object
    var self = this;
    // We set this array up as a staging area for data we want to put into and take out of the LocalStorage
    self.tasks = [];

    function addTask(task_name) {

      // Taking the task_name string from the arguemnt and converting it to an object and then assigning
      //  that object variable to task
      var task = new Task({ name: task_name });
      self.tasks.push(task);
      // If successfully saved (no errors), we display information to user
      if (save()) {
        appendToList(task);
        // Leave this function and continue with the previous action
        return true;
      }
      else {
        // any error reporting for UI would go here
        return false;
      }
    }

    function appendToList(task) {
      // Grab the list item template from the HTML, clone so we don't modify original
      var li = $('#list_item_template').clone();
      // Remove the ID of the elemnt, so that we're not duplicating the same ID's across the multiple
      //   items we're creating
      li.removeAttr('id');

      //Find the label within the li variable, and add the text from the passed task_name argument
      li.find('label').text(task.name);

      //Unhide the new LI class tag
      li.removeClass('hidden');

      // Activate the delete button.
      li.find('button.delete').click(function() {

        //Remove it from Array
        self.tasks.splice(self.tasks.indexOf(task), 1);

        //Save the array to local storage
        save();

        // Removes it from the <ol> on the page
        li.remove();

      });


        li.find('button.edit').click(task, createEditForm);

      // jQuery, find item with #tasks ID, here the text in the field because it is passed from the task_name in "function addTask(task_name)",
      // and add this to an ordered list using <li> elements. Because it is an <ol>, jQuery knows to just add the <li> statements one after another.
      // Pushing to the end of the list
      $('#tasks').append(li);
    }



    function createEditForm(ev) {
      var task, li, edit_form, name_field;
      task = ev.data;
      li = $(this).closest('li');


      // Make the task name editable
      edit_form = $('#edit_form_template').clone().removeAttr('id');
      edit_form.removeClass('hidden');
      name_field = edit_form.find('.edit-task-name');
      name_field.data('task-id', task.id).val(task.name);


      li.find('label').replaceWith(edit_form);
      name_field.focus().select();
    }


    // Pass a form to the arguemnt show_form_error
    function show_form_error(form) {

    // Grab the passed form, and find the class "alert" tied to that form. html an error phrase to it. Remove the class
    //  hidden from the alert form.
      $(form).find('.alert')
        .html('Something went wrong')
        .removeClass('hidden');
    }

    // This is a check of the browser supports local storage
    function supportsLocalStorage() {
      try {

        // return true if localstore is supported and it's not null
        return 'localStorage' in window && window.localStorage !== null;

      } catch(err) {

      }

    }

    function load() {
      // Because local storage may not exist on the first run through or if we clear our Localstorage, then there would be
      // an error when we try to parse the data and assign it to self.tasks. So we do the if statement to check if
      // localstorage is supported and if the the localstorage has somethign in it.
      if (supportsLocalStorage() && localStorage.tasks) {
        var task;
        // Take the information we stored in localStorage.tasks and bring it back into an array we can access in
        //  our document, the self.tasks array
        var task_objects = JSON.parse(localStorage.tasks);
        // $.each is a jQuery function that iterate through an array. It takes two arguments. The first is what
        //  we will be iterating through, in this case the self.tasks array. The second is the function we will
        //  apply to each item as we go through the array. This function needs two arguments as well. In this case,
        //  index is the position of the item that determines if it exists (if it doesn't the function stops), and
        //  the variable we are passing, which is the value we wish the value in the array to have, here task_name.
        //  This allows us in the next line to insert the item as a variable called "task_name"
        $.each(task_objects, function(index, task_properties) {
        // jQuery, find item with #tasks ID, here the text in the field because it is the data gleamed from the self.tasks array,
        // and add this to an ordered list using <li> elements. Because it is an <ol>, jQuery knows to just add the <li> statements one after another.
        task = new Task(task_properties);
        self.tasks.push(task);
        appendToList(task);
      });
    }
  }


    function save() {
      // If the localstorage feature is available, then proceed
      if (supportsLocalStorage()) {
        // Save it to local storage, localstore.x where x equals anything you want to call it. It needs to be stored as JSON
        // for local storage, so we need to turn our self.tasks array into string data first.
        return (localStorage.tasks = JSON.stringify(self.tasks));
      }
      else {
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
      } else {
        show_form_error(this);
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
