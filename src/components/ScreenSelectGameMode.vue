<template>
    <transition name="fade-in" mode="out-in">
        <div class="container-fluid quiz-selection-container">
            <h2>Select theme</h2>
            <ul class="quiz-selection-list">
                <li class="list-item" v-for="(theme, index) in this.themes" :key="index"
                    @click="selectTheme(theme)">{{theme}}
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
    import {eventBus} from "@/main";

    export default {
        name: "ScreenSelectGameMode",
        props: {
            playerName : {
                type: String,
                default: 'Unknown'
            },
            themes : {
                type: Array,
                default : () => ["Geography", "History", "Culture"]
            }
        },
        methods : {
            selectTheme() {
                eventBus.startGame(this.playerName);
            }
        }
    }
</script>

<style scoped>
</style>
