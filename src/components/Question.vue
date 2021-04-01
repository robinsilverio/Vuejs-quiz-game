<template>
    <div class="question-header">
        <h2 class="question-header-title">Capital of {{ question }}</h2>
    </div>
</template>

<script>
    export default {
        name: "Question",
        props: {
            question: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    .question-header {
        text-align: center;
        background-color: #eee;
        padding: 10px;
    }

    .question-header h2 {
        margin: 0;
        font-weight: bold;
    }
</style>
