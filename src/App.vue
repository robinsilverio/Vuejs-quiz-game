<template>
  <div id="app">
    <Header title="Quiz game" :game-started="gameStarted" :points="points"/>
    <hr>
    <!--Dynamic gamecomponent-->
    <transition name="flip" mode="out-in">
      <keep-alive>
        <component :is="currentComponent" v-bind="currentProperties"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header";
import StartMenu from "@/components/StartMenu";
import ScreenSelectGameMode from "@/components/ScreenSelectGameMode";
import Quiz from "@/components/Quiz";
import CustomMessage from "@/components/CustomMessage";
import {eventBus} from "@/main";
import {useLoadQuestions} from "@/firebase";

export default {
  name: 'app',
  data() {
    return {
      currentComponent : 'StartMenu',
      gameStarted : false,
      playerName : '',
      points : 0,
      questionRound : 0,
      message : 'Your score',
      results: {},
      status : '',
      questions: useLoadQuestions()
    };
  },
  components: {
    Header,
    StartMenu,
    ScreenSelectGameMode,
    Quiz,
    CustomMessage
  },
  computed : {
    currentProperties : function () {
      let properties = {};
      if (this.currentComponent === 'Quiz') {
        properties = {
          gameStarted : this.gameStarted,
          playerName : this.playerName,
          updateQuestionRound : this.questionRound
        }
      }
      else if (this.currentComponent === 'ScreenSelectGameMode') {
        properties = {
          playerName : this.playerName
        }
      }
      else if (this.currentComponent === 'CustomMessage') {
        properties = {
          message : this.message,
          results : this.results,
          gameStatus : this.status
        }
      }
      return properties;
    },
    gameEnded : function () {
      return this.questionRound === this.questions.length;
    }
  },
  methods : {
    clearData() {
      this.playerName = '';
      this.points = 0;
      this.questionRound = 0;
    }
  },
  created() {
    console.log(this.questions);
    eventBus.$on('gameHasStarted', (status, firstName) => {
      this.gameStarted = status;
      this.playerName = firstName;
      this.currentComponent = 'Quiz';
    });

    eventBus.$on('switchToSelectGameMode', (firstName) => {
      this.playerName = firstName;
      this.currentComponent = 'ScreenSelectGameMode';
    });

    eventBus.$on('switchScreenIfAnswerWasCorrect', (isCorrect) => {

      this.questionRound++;

      this.message =
              (isCorrect && this.gameEnded || !isCorrect && this.gameEnded) ? 'Game ended':
              (isCorrect) ? 'That\'s correct!!' : 'That\'s incorrect!!';

      this.status =
              (isCorrect && this.gameEnded || !isCorrect && this.gameEnded) ? 'ENDED':
              (isCorrect) ? 'CORRECT' : 'INCORRECT';

      if (isCorrect)
        this.points++;

      this.results = {
        amountCorrectAnsweredQuestions : this.points,
        questionRound : this.questionRound,
        percentage : (this.points / this.questionRound * 100).toFixed(2) + '%'
      };
      this.currentComponent = 'CustomMessage';
    });

    eventBus.$on('switchScreen', () => {

      this.currentComponent = (this.gameEnded) ? 'StartMenu' : 'Quiz';

      // If the game finishes, clear all player stats
      if (this.gameEnded) {
        this.clearData();
      }
    });
  }
}
</script>

<style>
  @import "styles/transition_styles.css";
  @import "styles/headers_styles.css";
  @import "styles/containers_styles.css";
  @import "styles/list.css";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>
