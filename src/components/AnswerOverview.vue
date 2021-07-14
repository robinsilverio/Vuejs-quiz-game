<template>
    <div class="answer-container">
        <ul class="answer-list">
            <li class="list-item" v-for="(answer, index) in possibleAnswers" :key="index"
                @click="answerQuestion(answer)">{{answer}}
            </li>
        </ul>
    </div>
</template>

<script>
    import {eventBus} from "@/main";

    export default {
        name: "AnswerOverview",
        props: {
            possibleAnswers: {
                type: Set
            }
        },
        methods: {
            answerQuestion(answer) {
                eventBus.$emit('questionHasBeenAnswered', answer);
            }
        }
    }
</script>

<style scoped>

</style>
