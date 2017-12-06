<template>
  <div id="app">
        <p>{{message}}</p>
        <textarea v-model="message"></textarea>
        <button @click="addItem()">CREATE YO SELF</button>
        <ol>
          <todo-item v-for="(todo, index) in todos" :key="index" :todo="todo" @save="saveItems()" @delete="deleteItem(index)"/>
        </ol>
    </div>
</template>

<script>
import TodoItem from "./components/TodoItem.vue";

let initialTodos = [];
let storeTodos = localStorage.getItem("todos");
if (storeTodos) {
  initialTodos = JSON.parse(storeTodos);
}

export default {
  name: "app",
  components: {
    TodoItem
  },
  data() {
    return {
      message: "",
      status: true,
      todos: initialTodos
    };
  },
  methods: {
    addItem() {
      if (this.message.length > 0) {
        this.todos.push({ text: this.message });
        this.message = "";
        this.saveItems();
      }
    },
    deleteItem(index) {
       console.log("gterfd")
        this.todos.splice(index, 1);
        this.saveItems();
    },
    saveItems() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  }
};
</script>

<style>

</style>
