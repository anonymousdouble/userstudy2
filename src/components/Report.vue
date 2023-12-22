<template>
  <div class="container1">
    <div class="question-header">
      <h2>{{ `Question ${questionIndex + 1}:` }}</h2>
      <div class="timer">{{ `Time: ${minutes}:${seconds}` }}</div>
    </div>
    <div class="container2">
      <p class="question-title" v-html="question.title"></p>
      <p class="question-note">Note:<pre>
  <code class="question-references" v-html="question.references" style="display:block; white-space:pre-wrap">
  </code></pre></p>

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
  name: "Report",
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
title: 'Refactor the following Python code with list comprehension, e.g., a= [1 for i in range(2)]. <p><a href="https://github.com/yenchenlin/DeepLearningFlappyBird/blob/5a08d405b68facb784c7dc06ae0f6ad341c2a5a3/deep_q_network.py#L78-L204">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
         {
title: 'Refactor the following Python code with a For statement with multiple targets, e.g., <code>"for i in a: print(i[0]) can be refactored into for i_0, *i_remain in a: print(i_0)"</code>. <p><a href="https://github.com/franMarz/TexTools-Blender/blob/d2c324f9f4e986c2cdb00da6f0fd0999bb871203/utilities_uv.py#L137-L207">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
        {
title: 'Refactor the following Python code with chain comparison, e.g., <code>2 > a > 1</code>. <p><a href="https://github.com/JiaxuanYou/graph-generation/blob/3444b8ad2fd7ecb6ade45086b4c75f8e2e9f29d1/create_graphs.py#L7-L153">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
        {
title: 'Refactor the following Python code with While/For statement with else clause, e.g., <code>"for i in a:\n \ pass \n \ else: \n \ pass"</code>. <p><a href="https://github.com/forseti-security/forseti-security/blob/9069bfb04e818e51f484d860a249de0d578d4cf3/google/cloud/forseti/services/dao.py#L841-L872">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
        {
title: 'Refactor the following Python code with set comprehension, e.g., a= {i for i in range(2)}. <p><a href="https://github.com/mozilla/pontoon/blob/3a95b7bb3c3982cad3320898ee9b791dfa1267ed/pontoon/insights/tasks.py#L386-L429">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
        {
title: 'Refactor the following Python code with chain comparison, e.g., <code>2 > a > 1</code>. <p><a href="https://github.com/wbond/package_control/blob/ec6555920e41d195a1721c7a0bcb6fa68e4098aa/package_control/deps/oscrypto/trust_list.py#L65-L138">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
        {
title: 'Refactor the following Python code with an Assignment statement using a value to assign multiple targets, e.g., <code>"a=1; b=1 can be refactored into a=b=1"</code>. <p><a href="https://github.com/IntelLabs/coach/blob/2c60cb5acd8cd3c9c381a5066c208e69fc273c7b/rl_coach/dashboard_components/signals_file_base.py#L26-L39">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
        {
title: 'Refactor the following Python code with a For statement with multiple targets, e.g., <code>"for i in a: print(i[0]) can be refactored into for i_0, *i_remain in a: print(i_0)"</code>. <p><a href="https://github.com/chrismaddalena/ODIN/blob/03fb0044fe658df4d67ffbb8223060958537f17e/lib/htmlreporter.py#L551-L612">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
        {
title: 'Refactor the following Python code with While/For statement with else clause, e.g., <code>"for i in a:\n \ pass \n \ else: \n \ pass"</code>. <p><a href="https://github.com/DLLXW/data-science-competition/blob/03490a7ea8e6297211fe8709b61ddad251ae51dd/else/%E5%A4%A9%E9%A9%AC%E6%9D%AF--AI%2Bz%E6%99%BA%E8%83%BD%E8%B4%A8%E6%A3%80/code/uer/utils/tokenizer.py#L350-L397">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
        {
title: 'Refactor the following Python code with Starred in Function Calls, e.g., <code>"func(a[0],a[1]) can be refactored into func(*a[:2])"</code>. <p><a href="https://github.com/neuralchen/SimSwap/blob/a5f6dea67398eec9ee71e156f7ad15dbd7ce4977/test_video_swap_multispecific.py#L33-L98">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
        {
          title: 'Refactor the following Python code with list comprehension, e.g., a= [1 for i in range(2)]. <p><a href="https://github.com/microsoft/nni/blob/767ed7f22e1e588ce76cbbecb6c6a4a76a309805/nni/algorithms/hpo/networkmorphism_tuner/graph.py#L866-L908">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with an Assignment statement using a value to assign multiple targets, e.g., <code>"a=1; b=1 can be refactored into a=b=1"</code>. <p><a href="https://github.com/ansible/ansible-modules-extras/blob/f216ba8e0616bc8ad8794c22d4b48e1ab18886cf/cloud/rackspace/rax_mon_check.py#L144-L262">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with truth test, e.g., <code>a != [] can be refactored into a</code>. <p><a href="https://github.com/django/django/blob/c709a748ce6e0759e415a0e3544e0f4ad3d30f8b/django/http/multipartparser.py#L132-L364">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with Assignment with multiple targets, e.g., <code>"a = 1; b = c can be refactored into a, b = 1, c pass"</code>. <p><a href="https://github.com/diffgram/diffgram/blob/5bf45ff076ecc9b3192eedae94d2f515cca30edf/default/tests/methods/event/test_user_visit_history.py#L18-L36">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with Starred in Function Calls, e.g., <code>"func(a[0],a[1]) can be refactored into func(*a[:2])"</code>. <p><a href="https://github.com/open-mmlab/OpenPCDet/blob/255db8f02a8bd07211d2c91f54602d63c4c93356/pcdet/ops/pointnet2/pointnet2_batch/pointnet2_modules.py#L61-L99">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with fstring to format a string, e.g., <code>a=world; "hello: %s" % a be refactored into f"hello:{a}"</code>. <p><a href="https://github.com/speechbrain/speechbrain/blob/d71a7e018738329fe9a7951d2e9457d52f94edad/recipes/KsponSpeech/ksponspeech_prepare.py#L136-L204">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with With statement, e.g., <code>"f=open("xxx","r"); pass) can be refactored into with open("xxx","r") as f: pass "</code>. <p><a href="https://github.com/sevagas/macro_pack/blob/071fd4aa16dc74815c2a860ddafe4358d6454c89/src/modules/wsf_gen.py#L27-L48">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with set comprehension, e.g., a= {i for i in range(2)}. <p><a href="https://github.com/forseti-security/forseti-security/blob/9069bfb04e818e51f484d860a249de0d578d4cf3/google/cloud/forseti/services/dao.py#L2044-L2073">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        } ,
{
title: 'Refactor the following Python code with dict comprehension, e.g., a= {i:i for i in range(2)}. <p><a href="https://github.com/huggingface/transformers/blob/1d7773594754457ed4a79cf6d98bcaabea5bff51/tests/test_modeling_common.py#L2613-L2644">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with truth test, e.g., <code>a != [] can be refactored into a</code>. <p><a href="https://github.com/geek-ai/MAgent/blob/2144dbd4bef49a8bda499dee95956c3fa04d6a43/examples/train_single.py#L115-L210">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with Assignment with multiple targets, e.g., <code>"a = 1; b = c can be refactored into a, b = 1, c pass"</code>. <p><a href="https://github.com/facebookresearch/ReAgent/blob/57b58a8b3a6b74bb87a197b73a6cd108ddad895e/reagent/gym/envs/pomdp/pocman.py#L365-L379">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with dict comprehension, e.g., a= {i:i for i in range(2)}. <p><a href="https://github.com/DATA-DOG/taiga-back/blob/9d54dc63b52b1c5222a904c01ce272169dd26759/taiga/projects/history/models.py#L99-L242">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with With statement, e.g., <code>"f=open("xxx","r"); pass) can be refactored into with open("xxx","r") as f: pass "</code>. <p><a href="https://github.com/golemhq/golem/blob/84f51478b169cdeab73fc7e2a22a64d0a2a29263/golem/report/execution_report.py#L186-L227">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
        },
{
title: 'Refactor the following Python code with fstring to format a string, e.g., <code>a=world; "hello: %s" % a be refactored into f"hello:{a}"</code>. <p><a href="https://github.com/marin-m/pbtk/blob/777254e0fe38819fddee58ab6cb554c219f74908/utils/descpb_to_proto.py#L134-L183">Right Click the Link to See Code in A New Tab!</a></p>',
          references: "Find all code pairs consisting of non-idiomatic code and idiomatic code. Place the non-idiomatic code in the <b>'Original Code'</b> section and the corresponding idiomatic code in the <b>'Refactored Code'</b> section. <b>There is one or more code pairs. Click the '+' button to add another code pair.</b> If, within 5 minutes, you believe that there is no code to refactor or you cannot identify code that can be refactored, can skip it."
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

      if (this.questionIndex < 23) {
        this.questionIndex += 1;
        this.resetParameters()
      } else {
        this.saveAsJSON();
        this.$router.push('/thanks');
      }
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
.question-references{
font-size: 0.8rem;
width: 100%;
}
.question-note{
font-size: 0.8rem;
width: 100%;
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
.code {
  display: block;
  white-space: pre-wrap;
  font-size: 0.4rem;
}
</style>