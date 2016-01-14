<template>
  <div>
    <div class="my-container">
      <span class="btn btn-success" @click="filterTask('completed')" v-show="completed > 0">Completed: {{completed}} </span> 
      <span class="btn btn-warning" @click="filterTask('incompleted')" v-show="incompleted > 0">Incompleted: {{incompleted}}</span>
      <span class="btn btn-info" @click="filterTask()" v-show="tasks.length > 0">All: {{tasks.length}}</span>
    </div>
    <div> 
        <div class="form-inline my-container">
          <input type="text" @keyup.enter="addTask" class="form-control" v-model="newTask" />
          <button @click="addTask" class="btn btn-default">add</button>
        </div>
        <ul v-show="tasks.length > 0" class="list-group">
          <task-item v-for="task in tasks | task status" :task="task"></task-item>
        </ul>
        <div v-else>
            No Tasks available 
        </div>
        <button v-show="this.completed > 0" @click="clearClipboard" class="btn btn-default">Clear Clipboard</button>
    </div>
  </div>    
</template>

<script>

import apiService from './../services/api';

export default {
    data(){
        return {
            tasks: [],
            completed: 0,
            incompleted: 0,
            newTask: '',
            status: 'all'
        };
    },
    computed: {
        completed: function(){
            return this.tasks.filter(function(task) {
                return task.completed;
            }).length;
        },
        incompleted: function() {
            return this.tasks.filter(function(task){
                return !task.completed;
            }).length;
        }
    },
    created(){
      apiService.fetchResourceFromApi(this);
    },
    methods: {
        filter: function(status) {
          if( status === "completed") {
            this.tasks = this.originalTasks.filter(apiService.completedTask);
          } else if( status === "incompleted") {
            this.tasks = this.originalTasks.filter(apiService.inProgress);
          } else {
            this.tasks = this.originalTasks; 
          }
        },
        completedToggle: function(task)  {
            task.completed = !task.completed;
            apiService.updateTask(this,task)
              .then( data => console.log(data) );
        },
        filterTask: function(status) {
          if(status === "completed") {
            this.status = "completed";
          } else if( status === "incompleted" ) {
            this.status = "incompleted";
          } else {
            this.status = "all";
          }
        },
        deleteTask: function(task) {
          apiService.deleteTasks(this, [task._id])
            .then(function() {
              this.tasks.$remove(task);
            }.bind(this));
        },
        clearClipboard: function(){
          var removeTaskLists = this.tasks
            .filter(apiService.completedTask).
            map(function(task){
              return task._id;
            });
          apiService.deleteTasks(this,removeTaskLists)
            .then(function(){
              this.tasks = this.tasks.filter(apiService.inProgress);
            }.bind(this));
        },
        addTask: function() {
          var task = {name: this.newTask, completed: false};
          this.newTask = "";
          apiService.addTask(this,task);
       }
    }
}
</script>

