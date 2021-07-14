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

</style>
