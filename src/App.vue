<template>
  <div id="app">
    <div> 
        <div>
          <button class="button" v-if="!creating" @click="poemify()">+POEMIFY</button>
          <template v-else>
            <textarea class="texty" v-model="message"></textarea>
            <div>
          <button class="button" @click="addItem()">CREATE YO SELF</button>
          </div>
          </template>
       
        </div>
        <div>
          <todo-item v-for="(todo, index) in todos" :key="index" :todo="todo" @save="saveItems()" @delete="deleteItem(index)"/>
        </div>
    </div>
  </div>
</template>
<style>


body {
  padding: 2px 2px;
  margin: 2px 2px;
  background: #dedede;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.texty {
  width: 45%;
  height: 200px;
  margin: 7.5px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}

.editify {
  width: 320px;
  height: 200px;
  box-sizing: border-box;

  background: #fcfcfc;
  border: none;

  padding: 5px;
  margin: 0px;
  resize: none;
  font-size: 16px;
  background: #fcfcfc;
  display: inline-block;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow: scroll;
}
.button-lines {
  margin-left: 49%;
  display: inline-block;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 2px 2px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 2px 2px;
  cursor: pointer;
}
</style>
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
      creating: false,
      message: "",
      status: true,
      todos: initialTodos
    };
  },
  methods: {
    poemify() {
      this.creating = true;
    },
    addItem() {
      if (this.message.length > 0) {
        this.todos.unshift({ text: this.message });
        this.message = "";
        this.saveItems();
      }
      this.creating = false;
    },
    deleteItem(index) {
      console.log("gterfd");
      this.todos.splice(index, 1);
      this.saveItems();
    },
    saveItems() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
  }
};
</script>
