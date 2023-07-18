<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';

export default {
  name: 'App',
  vuetify: new Vuetify(),
};
</script>
