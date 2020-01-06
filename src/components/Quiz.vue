<template>
 <div class="container-fluid quiz-container">
     <Question :question="question.name"></Question>
     <AnswerOverview :possibleAnswers="possibleAnswers"></AnswerOverview>
 </div>
</template>

<script>
    import Question from "@/components/Question";
    import AnswerOverview from "@/components/AnswerOverview";
    import {Country} from "@/models/Country";
    import {eventBus} from "@/main";

    export default {
        name: "Quiz",
        data () {
            return {
                countries : [
                    new Country('Sweden', 'Stockholm'),
                    new Country('The Netherlands', 'Amsterdam'),
                    new Country('Portugal', 'Lisbon'),
                    new Country('Italy', 'Rome'),
                    new Country('Turkey', 'Ankara'),
                    new Country('Germany', 'Berlin'),
                    new Country('Russia', 'Moscow'),
                    new Country('Brazil', 'Brasilia'),
                    new Country('Argentina', 'Buenos Aires'),
                    new Country('South Africa', 'Pretoria'),
                    new Country('England', 'London'),
                    new Country('Norway', 'Oslo'),
                    new Country('China', 'Beijing'),
                    new Country('Algeria', 'Algiers'),
                    new Country('Australia', 'Canberra'),
                    new Country('Georgia', 'Tblissi'),
                    new Country('Nepal', 'Kathmandu'),
                    new Country('Canada', 'Ottawa'),
                    new Country('Bolivia', 'Sucre'),
                    new Country('Senegal', 'Dakar'),
                    new Country('Finland', 'Helsinki'),
                    new Country('Japan', 'Tokyo'),
                    new Country('USA', 'Washington DC'),
                    new Country('Chile', 'Santiago'),
                    new Country('Mexico', 'Ciudad del Mexico')
                ],
                question : '',
                possibleAnswers: new Set()
            }
        },
        props : {
            gameStarted: {
                type : Boolean,
                default : false
            },
            playerName : {
                type : String,
                default: 'Unknown'
            },
            updateQuestionRound : {
                type : Number,
                default : 0
            }
        },
        watch : {
            updateQuestionRound: function () {
                // On update question round, then load a new question plus generating another possible answers.
                this.loadQuestionAndAnswers();
            }
        },
        methods : {
            generateRandomQuestion() {
                return this.countries[this.updateQuestionRound];
            },
            generatePossibleAnswers(){

                let maximumPossibleAnswers = 3;
                let tmp_list = [];

                // Populate the array with possible answers
                for (let i = 0; i < maximumPossibleAnswers; i++) {
                    tmp_list.push(this.countries[Math.floor(Math.random() * this.countries.length)].capital);
                }

                // Add a correct answer to possible answers array.
                tmp_list.push(this.question.capital);

                // In order to make user difficult to play, let's shuffle.
                this.shuffle(tmp_list);

                return new Set(tmp_list);
            },
            shuffle(array) {
                array.sort(() => Math.random() - 0.5);
            },
            loadQuestionAndAnswers() {
                this.possibleAnswers = new Set();
                this.question = this.generateRandomQuestion();
                this.possibleAnswers = this.generatePossibleAnswers();
            },
            checkAnswer(answer) {

                let isCorrect = false;

                if (answer === this.question.capital) {
                    isCorrect = true;
                }
                return isCorrect;
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
    .quiz-container{
        width: 70%;
        margin: auto;
        border: 1px solid #eee;
        border-radius: 5px;
        padding: 0;
    }
</style>