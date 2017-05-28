<template lang="html">
    <div class="time-elapsed">
        {{ seconds | timeElapsed }}
    </div>
</template>

<script>
import moment from 'moment'

export default {
    props: {
        seconds: { type: Number }
    },
    filters: {
        timeElapsed: function(sec) {
            return moment(`2016-06-12 00:00:00`).add(sec, 'seconds').format('HH:mm:ss')
        }
    }
}
</script>

<style lang="scss">
.time-elapsed {
    text-align: center;
    font-family: sans-serif;
}
</style>
