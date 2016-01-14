<template>
  <li class="list-group-item" >
    <input type="checkbox" @click="completedToggle(task)" v-model="task.completed" /> 
    <span :class="{'completed': task.completed}"   @click="toggleEditTask()" v-show="!edit">{{task.name}}</span>
    <input v-show="edit" type="text" @keyup.enter="updateTask(task)" v-model="name"/>
    <span @click="edit = false" v-show="edit" class="my-btn">x</span>
    <strong @click="deleteTask(task)" class="delete-btn my-btn">x</strong>
  </li>
</template>

<script>
import apiService from './../services/api';
export default {
  props: ['task'],
  data() {
    return {
      edit: false,
      name: '' 
    };
  },
  methods: {
    completedToggle: function(task)  {
      task.completed = !task.completed;
        apiService.updateTask(this,task);
    },
    deleteTask: function(task) {
      apiService.deleteTasks(this, [task._id])
      .then(function() {
          this.$parent.tasks.$remove(task);
        }.bind(this));
    },
    updateTask: function(task) {
      task.name = this.name;
      apiService.updateTask(this,task)
        .then( function(data) {
          this.task = data.data; 
          this.edit = false;
        }.bind(this));
    },
    toggleEditTask: function() {
      this.name = this.task.name;
      this.edit = !this.edit;
    },
  } 
}
</script>

