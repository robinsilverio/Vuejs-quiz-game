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
                eventBus.switchToSelectTheme();
            }
        }
    }
</script>

<style scoped>
    .menu-container {
        text-align: center;
    }

</style>
