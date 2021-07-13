import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

export const eventBus = new Vue({
    methods: {
        startGame(firstName) {
            this.$emit('gameHasStarted', true, firstName);
        },
        switchToSelectGameMode(firstName) {
            this.$emit("switchToSelectGameMode", firstName);
        },
        switchScreenBasedOnIfAnswerWasCorrect(isCorrect) {
            this.$emit('switchScreenIfAnswerWasCorrect', isCorrect);
        },
    }
});

new Vue({
    render: h => h(App),
}).$mount('#app')
