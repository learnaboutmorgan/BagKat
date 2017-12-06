<template>
    <li>
        {{ todo.text }}
        <button @click="$emit('delete')">X</button>
        <button @click="reverse()">REVERSE</button>
        <button v-if="!editing" @click="edit()">EDIT</button>
        <template v-else>
            <button @click="save()">SAVE</button>
            <textarea v-model="draft" />
        </template>
    </li>
</template>

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