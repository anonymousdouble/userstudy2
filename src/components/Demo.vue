<template>
  <div class="container1">
    <div class="question-header">
      <h2>{{ `Question ${questionIndex + 1}:` }}</h2>
      <div class="timer">{{ `Time: ${minutes}:${seconds}` }}</div>
    </div>
    <div class="container2">
      <p class="question-title" v-html="question.title"></p>
      <div v-for="index in tupleIndex" >
        <ReportTuple :question="question" :able-edit="ableEdit" :key="index" :name="index" :ref="'reportTuples_'+index"/>
        <hr>
      </div>
      <button @click="addQuestion" :disabled="!ableEdit">+</button>
    </div>
    <div class="container3">
      <button @click="nextQuestion" class="next-button">Next</button>
    </div>
  </div>
</template>

<script>
import ReportTuple from './ReportTuple.vue'
import { saveAs } from 'file-saver';

export default {
  name: "Demo",
  components: {
    ReportTuple
  },
  data() {
    return {
      questionIndex: 0,
      minutes: 5,
      seconds: 0,
      tupleIndex: 1,
      ableEdit: true,
      answers: [],
      finalStoredData:{},
      questions: [
        {
          title: 'Please compare the products: <b>amd processor</b> vs <b>intel processor</b>',
          options: ['amd processor is better', 'intel processor is better', 'they are equal', 'hard to say']
        },
      ],
    }
  },
  created() {
    this.createAnswer(this.tupleIndex);
  },
  computed: {
    question() {
      return this.questions[this.questionIndex]
    },
  },
  methods: {
    startTimer() {
      setInterval(() => {
        if (this.seconds > 0) {
          this.seconds--
        } else if (this.minutes > 0) {
          this.minutes--
          this.seconds = 59
        } else {
          // Time is up
          this.ableEdit = false
        }
      }, 1000)
    },
    addQuestion() {
      // Code to add a new question
      this.tupleIndex += 1;
      this.createAnswer(this.tupleIndex);
    },
    createAnswer(index) {
      var answer = {'tuple_id':index};
      this.answers.push(answer);
    },
    resetParameters() {
      this.minutes = 5;
      this.seconds = 0;
      this.tupleIndex = 1;
      this.ableEdit = true;
      this.answers = [];
      this.$refs['reportTuples_1'][0].resetParameters();
      this.createAnswer(this.tupleIndex);
    },
    nextQuestion(){
      console.log(this.$refs)
      for (var i=0;i<this.tupleIndex;i++) {
        this.answers[i]['selectedOption'] = this.$refs['reportTuples_'+(i+1)][0].selectedOption
        this.answers[i]['reason'] = this.$refs['reportTuples_'+(i+1)][0].reason
        this.answers[i]['references'] = this.$refs['reportTuples_'+(i+1)][0].references
      }
      console.log(this.answers)
      this.finalStoredData['answers_'+(this.questionIndex+1)] = {'answers':this.answers, 'min':4-this.minutes,
        'sec':60-this.seconds}

      this.saveAsJSON();
      this.$router.push('/thanks');

    },
    saveAsJSON() {
      const data = JSON.stringify(this.finalStoredData, null, 2);
      const filename = this.$route.params.name + '.json';
      const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, filename);
    }

  },
  mounted() {
    this.startTimer();
  }
}
</script>

<style scoped>
.container1 {
  width: 66.67%;
  margin: auto;
}
.container2 {
  width: 90%;
  margin: auto;
  text-align: left;
  font-size: 1.2rem;
}
.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.question-title {
  margin-bottom: 1.5rem;
}
.timer {
  font-size: 1.2rem;
}
.container3 {
  display: flex;
  width: 100%;
  margin-top: 1.5rem;
}
.next-button {
  margin-left: auto;
}
</style>