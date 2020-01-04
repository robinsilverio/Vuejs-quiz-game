import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

export const eventBus = new Vue({
  methods : {
    startGame(firstName) {
      this.$emit('gameHasStarted', true, firstName);
    },
    switchScreenBasedOnIfAnswerWasCorrect(isCorrect, questionRound, currentResults) {
      this.$emit('switchScreenIfAnswerWasCorrect', isCorrect, questionRound, currentResults);
    }
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
