import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api';

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);

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
