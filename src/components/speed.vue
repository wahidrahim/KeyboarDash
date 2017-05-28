<template lang="html">
    <div class="speed">
        {{ speed }} WPM
    </div>
</template>

<script>
export default {
    props: ['speed']
}
</script>

<style lang="scss">
.speed {
    color: #F9E784;
    font-size: 24px;
    font-family: sans-serif;
    text-align: center;
    margin: 10px;
}
</style>
