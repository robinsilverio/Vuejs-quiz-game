<template>
  <div id="app">
    <Header title="Capital quiz game"/>
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
import Quiz from "@/components/Quiz";
import CustomMessage from "@/components/CustomMessage";
import StartMenu from "@/components/StartMenu";
import {eventBus} from "@/main";

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
      status : ''
    };
  },
  components: {
    Header,
    StartMenu,
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
      return this.questionRound === 25;
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
    eventBus.$on('gameHasStarted', (status, firstName) => {
      this.gameStarted = status;
      this.playerName = firstName;
      this.currentComponent = 'Quiz';
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
        console.log('This game is finished');
        this.clearData();
      }
    });
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  .flip-enter-active {
    animation: flip-in 0.2s ease-out forwards;
  }

  .flip-leave-active {
    animation: flip-out 0.2s ease-out forwards;
  }

  @keyframes flip-in {
    from {
      transform: rotateY(90deg);
    }
    to {
      transform: rotateY(0deg);
    }
  }

  @keyframes flip-out {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(90deg);
    }
  }

</style>
