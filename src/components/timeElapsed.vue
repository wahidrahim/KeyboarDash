<template lang="html">
    <div class="time-elapsed">
        {{ time | timeElapsed }}
    </div>
</template>

<script>
import moment from 'moment'

export default {
    props: ['time'],
    filters: {
        timeElapsed: function(sec) {
            return moment(`2016-06-12 00:00:00`).add(sec, 'seconds').format('HH:mm:ss')
        }
    }
}
</script>

<style lang="scss">
.time-elapsed {
    color: #07A6EF;
    text-align: center;
    font-family: sans-serif;
}
</style>
