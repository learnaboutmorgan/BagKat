<template>

    <div class="outter-todo-card">
        <div class="todo-card">
            <template v-if="!editing">
                 {{ todo.text }}
            </template>
            <template v-else>
             <textarea class="editify" v-model="draft"/>
            </template>
    
        </div>
        <div class="button-lines">
        <button class="button" @click="$emit('delete')">DELETE</button>
        <button class="button" @click="reverse()">REVERSE</button>
        <button  class="button" v-if="!editing" @click="edit()">EDIT</button>
        <template v-else>

            <button  class="button" @click="save()">SAVE</button>
        </template>
        </div>
        </div>
    
  
</template>
<style>


.outter-todo-card {
  width: 350px;
  height: 250px;
  box-sizing: border-box;

  background: #fcfcfc;
  box-shadow: 0px 7.5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 10.5px;
  display: inline-block;
  margin: 7.5px 15px;
}
.todo-card {
  width: 320px;
  height: 200px;
  box-sizing: border-box;

  background: #fcfcfc;

  border-radius: 4px;
  padding: 5px;
  margin: 0px;
  display: inline-block;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow: scroll;
}
</style>
<script>
export default {
  props: {
    todo: Object
  },
  data() {
    return {
      editing: false,
      draft: null
    };
  },
  methods: {
    emitSave() {
      this.$emit("save");
    },
    edit() {
      this.draft = this.todo.text;
      this.editing = true;
    },
    save() {
      this.todo.text = this.draft;
      this.editing = false;
      this.emitSave();
    },
    reverse() {
      this.todo.text = this.todo.text
        .split("")
        .reverse()
        .join("");
      this.emitSave();
    }
  }
};
</script>