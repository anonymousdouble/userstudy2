<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div class="intro">
      <p v-html="introduction1"></p>
      <p v-html="introduction2"></p>
      <p v-html="introduction3"></p>
    </div>
    <form>
      <div class="name_input">
        <span>Your name: </span>
        <label>
          <input type="text" v-model="name" required>
        </label>
      </div>
      <div>
        <button @click="pracQuestionnaire" class="start">Practice</button>
      </div>
      <button @click="startQuestionnaire" class="start">Start</button>
    </form>

  </div>
</template>

<script>

export default {
  data() {
    return {
      title: 'User Study about Code Refactorings using Pythonic Idioms',
      introduction1: 'Welcome to our user study! In this study, In this study, you\'ll be presented with Python code, and your task is to identify pairs of code — one with non-idiomatic practices and its counterpart refactored with Pythonic idioms. \ \n There are <b>24</b> questions. Each question should be completed within a <b>5-minute</b> time frame, and once the time is up, you will not be able to make any further changes and must move on to the next question.  <b>Feel free to search the internet to assist in answering questions, but refrain from executing or writing code during the process. </b>',
      introduction3: 'To start the study, please enter your name and click start. The first question will commence, and the timer will begin counting down.',
      name: ''
    }
  },
  methods: {
    startQuestionnaire() {
      // Code to start the questionnaire
      if (this.name.trim() !== '') {
        this.$router.push({name: 'report', params: {name: this.name}});
        // this.$router.push({name: 'demo', params: {name: this.name}});
      }
    },
    pracQuestionnaire () {
      if (this.name.trim() !== '') {
        // this.$router.push({name: 'report', params: {name: this.name}});
        this.$router.push({name: 'demo', params: {name: this.name}});
      }
    }
  }
}
</script>

<style>
/* Add your CSS styles here */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.intro {
  width: 66.67%;
  text-align: left;
}

.start {
  font-size: 1.25rem;
  margin-top: 1.5rem;
  padding: 0.2rem 0.4rem;
}

.name_input {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}
</style>
