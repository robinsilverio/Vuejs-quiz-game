<template>
    <div class="container-fluid quiz-container">
        <Question :question="question.questionText"></Question>
        <AnswerOverview :possibleAnswers="possibleAnswers"></AnswerOverview>
    </div>
</template>

<script>
    import Question from "@/components/Question";
    import AnswerOverview from "@/components/AnswerOverview";
    import {eventBus} from "@/main";

    export default {
        name: "Quiz",
        data() {
            return {
                question: '',
                possibleAnswers: new Set()
            }
        },
        props: {
            gameStarted: {
                type: Boolean,
                default: false
            },
            updateQuestionRound: {
                type: Number,
                default: 0
            },
            questions: {
                type: Array,
                default: () => []
            },
        },
        watch: {
            updateQuestionRound: function () {
                // On update question round, then load a new question plus generating another possible answers.
                this.loadQuestionAndAnswers();
            }
        },
        methods: {
            generateRandomQuestion() {
                return this.questions[this.updateQuestionRound];
            },
            generatePossibleAnswers() {

                let maximumPossibleAnswers = 3;
                let tmp_list = [];

                // Populate the array with possible answers
                for (let i = 0; i < maximumPossibleAnswers; i++) {
                    tmp_list.push(this.questions[Math.floor(Math.random() * this.questions.length)].answer);
                }

                // Add a correct answer to possible answers array.
                tmp_list.push(this.question.answer);

                // In order to make user difficult to play, let's shuffle the questions.
                tmp_list = this.shuffleQuestions(tmp_list);

                return new Set(tmp_list);
            },
            shuffleQuestions(array) {
                return array.sort(() => Math.random() - 0.5);
            },
            loadQuestionAndAnswers() {
                this.possibleAnswers = new Set();
                this.question = this.generateRandomQuestion();
                this.possibleAnswers = this.generatePossibleAnswers();
            },
            checkAnswer(answer) {
                return answer === this.question.answer;
            }
        },
        components: {AnswerOverview, Question},
        created() {

            this.loadQuestionAndAnswers();
            // This handles the transition to other component based on correctness of the answer.
            eventBus.$on('questionHasBeenAnswered', (answer) => {
                eventBus.switchScreenBasedOnIfAnswerWasCorrect(this.checkAnswer(answer));
            });
        }
    }
</script>

<style scoped>

</style>
