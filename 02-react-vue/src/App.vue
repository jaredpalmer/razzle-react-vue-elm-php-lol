<template>
  <div class="app">
    <!-- <nav>
      My Razzle Dazzle Application
    </nav> -->
    <div class="section">
      <img src="https://vuejs.org/images/logo.png" alt="Vue">
      <h1>{{ greeting }}</h1>
    </div>
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
nav {
  width: 100%;
  height: 50px;
  line-height: 49px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}

.section {
  padding: 2rem;
  background: #e4f5ef;
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