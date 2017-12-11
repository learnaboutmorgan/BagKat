<template>
    <div class="todo-card-wrap">
    <div class="outter-todo-card">
        <div class="todo-card">
           <vue-markdown v-if="!editing" :source="todo.text"/>
             <textarea v-else class="editify" v-model="draft"/>

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
    </div>
  
</template>
<style lang="scss">
.todo-card-wrap {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;

  @media screen and (min-width: 600px) {
    width: 50%;
  }

  @media screen and (min-width: 960px) {
    width: 33.33%;
  }

  @media screen and (min-width: 1400px) {
    width: 25%;
  }
}

.outter-todo-card {
  width: 100%;
  height: 250px;
  background: #fcfcfc;
  box-shadow: 0px 7.5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  display: inline-block;
}
.todo-card {
  width: 100%;
  height: 205px;
  box-sizing: border-box;

  background: #fcfcfc;

  border-radius: 4px;
  padding: 15px;
  margin: 0px;
  display: inline-block;
  word-wrap: break-word;
  overflow: auto;
}

.editify {
  width: calc(100% - 30px);
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
  height: 40px;
  border-top: 1px solid #ddd;
  display: flex;

  .button {
    height: 41px;
    background: none;
    flex-grow: 1;
    border: none;
    border-right: 1px solid #ddd;
    border-radius: 0;

    &:last-child {
      border-right: none;
    }
  }
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