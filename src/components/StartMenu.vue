<template>
    <transition name="fade" mode="out-in">
        <div class="container-fluid menu-container">
            <button class="btn btn-primary" @click="startGame">Start the game</button>

        </div>
    </transition>
</template>

<script>
    import {eventBus} from "@/main";

    export default {
        name: "StartMenu",
        methods : {
            startGame() {
                let firstName = "";
                while (firstName === "") {
                    firstName = prompt('Insert your username');
                }
                eventBus.switchToSelectGameMode(firstName);
            }
        }
    }
</script>

<style scoped>
    .menu-container {
        text-align: center;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>
