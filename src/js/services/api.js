//URL and endpoint constants
const TASK_API_URL = 'api/tasks';

export default {
  deleteTask(context,task) {
    context.$http.delete(TASK_API_URL,{id: [task._id]})
      .then(function() {
        context.tasks.$remove(task);
      });
  },
  fetchResourceFromApi(context){
    context.$http.get(TASK_API_URL)
      .then( data => context.tasks = data.data );
  },
  inProgress(task){
    return !task.completed;
  },
  completedTask(task) {
    return task.completed;
  },
  deleteTasks(context, removeTaskLists) {
    return context.$http.delete(TASK_API_URL,{id: removeTaskLists})
  },
  addTask(context,task) {
    context.$http.post(TASK_API_URL,task)
      .then( data => context.tasks.push(data.data) );
  },
  updateTask(context,task) {
    return context.$http.put(TASK_API_URL,task);
  }
}
