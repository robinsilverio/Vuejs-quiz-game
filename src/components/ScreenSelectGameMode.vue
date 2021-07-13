<template>
    <transition name="fade-in" mode="out-in">
        <div class="quiz-selection-container">
            <h2>Test Select Mode</h2>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "ScreenSelectGameMode",
        props: {
            playerName : {
                type: String,
                default: 'Unknown'
            }
        }
    }
</script>

<style scoped>
    @import "../styles/containers_styles.css";

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
