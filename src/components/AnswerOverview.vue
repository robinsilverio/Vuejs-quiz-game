<template>
    <div class="container">
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
    .container {
        width: 100%;
        padding: 15px;
    }

    .answer-list {
        list-style: none;
        padding: 0;
    }

    .answer-list li {
        background: #286090;
        color: #FFF;
        padding: 10px;
        width: 48%;
        float: left;
        margin: 0 0 20px 9px;
        text-align: center;
        cursor: pointer;
    }

    /*Smartphones*/
    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
        .answer-list li {
            width: 90%;
        }
    }

</style>
