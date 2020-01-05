<template>
    <div class="alert custom-alert" :class="status">
        <h2>{{message}}</h2>
        <p v-if="isGameEnded">You had {{results.amountCorrectAnsweredQuestions}} of {{results.questionRound}} questions good, which gives you a percentage of {{this.results.percentage}}</p>
        <hr>
        <button class="btn btn-primary" @click="switchScreen">{{(isGameEnded) ? 'Start again' : 'Continue'}}</button>
    </div>
</template>

<script>
    import {eventBus} from "@/main";

    export default {
        name: "CustomMessage",
        props : {
            message : {
                type : String
            },
            results : {
                type : Object,
                default : function () {
                    return {
                        amountCorrectAnsweredQuestions : 'aaa',
                        questionRound : 0,
                        percentage : 0 + '%'
                    }
                }
            },
            gameStatus : {
                type : String,
                validator : (val) => ['INCORRECT', 'CORRECT', 'ENDED'].includes(val)
            }
        },
        computed : {
            status : function () {
                return {
                    'alert-success' : this.gameStatus === 'CORRECT',
                    'alert-danger' : this.gameStatus === 'INCORRECT',
                    'alert-info' : this.gameStatus === 'ENDED'
                }
            },
            isGameEnded : function () {
                return this.gameStatus === 'ENDED';
            }
        },
        methods : {
            switchScreen() {
                eventBus.$emit('switchScreen');
            }
        }
    }
</script>

<style scoped>
    .custom-alert {
        width: 70%;
        margin: auto;
        border: 1px solid #eee;
        border-radius: 5px;
        text-align: center;
    }
</style>