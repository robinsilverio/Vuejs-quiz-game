<template>
    <div class="header">
        <h1>{{ title }}</h1>
        <p v-if="gameStarted">Points: {{points}}</p>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        props: {
            title: String,
            gameStarted: Boolean,
            points: Number
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
