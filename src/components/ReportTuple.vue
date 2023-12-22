<template>
  <div class="question-details">

    <p>Original Code:</p>
    <div class="form-group">
      <label>
        <textarea rows="3" v-model="reason" :disabled="!ableEdit"></textarea>
      </label>
    </div>
    <p>Refactored Code:</p>
    <div class="form-group-refactored">
      <label>
        <textarea rows="5" v-model="references" :disabled="!ableEdit"></textarea>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportTuple",
  props: {
    question: {
      type: Object,
      required: true
    },
    ableEdit: {
      type:Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedOption: null,
      reason: "",
      references: ""
    }
  },
  methods: {
    resetParameters() {
      this.selectedOption = null;
      this.reason = "";
      this.references = "";
    }
  }
}
</script>

<style scoped>

.question-details {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group textarea{
  width: 45rem;
  max-width: 100%;
  min-height: 10rem;
overflow-y: auto;
word-wrap:break-word
}
.form-group-refactored textarea{
  width: 45rem;
  max-width: 100%;
  min-height: 3rem;
overflow-y: auto;
word-wrap:break-word
}
.selections label{
  margin-right: 4rem;
}
</style>