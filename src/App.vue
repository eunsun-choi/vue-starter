<template>
    <div id="app" v-align="'center center'">
      This is Boilerplate
      <div class="bounceInOut"></div>
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
@import '~rk-kit/style/global';
</style>
<style scoped lang="scss">
@import '~rk-kit/style/size';
@import '~rk-kit/style/easewizz';

canvas{
  margin-top: 100px;
}
.bounceInOut {
  position: relative;
  height: 100px;
  @include bounceInOut('width', 0px, 100px);
  background:grey;
  animation-duration: 1.1s;
}
</style>