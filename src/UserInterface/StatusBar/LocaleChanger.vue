<script setup lang="ts">
// import i18n from '@Lang/index'

// const handleLangChange = (evt) => {
//   console.log(evt.target.value)
//   i18n.global.locale = evt.target.value
// }

</script>
<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.locale-changer {
  position: relative;
}
</style>
