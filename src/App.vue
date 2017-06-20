<template>
    <div id="app">
       This is Boilerplate
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
    }),
  },
  watch: {
  },
  methods: {
    ...mapMutations({
    }),
  },
};
</script>
<style lang="scss">
@import './mixins/scss/global';
</style>
<style scoped lang="scss">
@import './mixins/scss/main';
</style>