<template>
  <div>
    <img src="https://vuejs.org/images/logo.png" alt="Vue">
    <h1>{{ greeting }}</h1>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      greeting: 'This is some Vue.js code!',
    };
  },
};
</script>

<style scoped>
div {
  padding: 2rem;
}
h1 {
  font-size: 2em;
  color: #42b983;
  text-align: center;
}
img {
  height: 100px;
  width: auto;
  margin: 0 auto;
  display: block;
}
</style>