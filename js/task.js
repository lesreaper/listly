var Task = function() {
  var self = this;
  function Task(name) {
    this.name = name;



  }
  return Task;
}();

var task_name = 'Task 1';
var my_task = new Task(task_name);
