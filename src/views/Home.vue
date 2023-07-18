<template>
  <div>
    <NavBar></NavBar>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="curso in cursos" :key="curso.id">
          <v-card>
            <v-img :src="curso.img" height="200"></v-img>
            <v-card-title>{{ curso.nombre }}</v-card-title>
            <v-card-text>
              <p><strong>Costo:</strong> {{ curso.costo }}</p>
              <p><strong>Duración:</strong> {{ curso.duracion }}</p>
              <p><strong>Cupos:</strong> {{ curso.cupos }}</p>
              <p><strong>Inscritos:</strong> {{ curso.inscritos }}</p>
              <p><strong>Completado:</strong> {{ curso.completado ? 'Sí' : 'No' }}</p>
              <p><strong>Fecha de registro:</strong> {{ curso.fecha_registro }}</p>
              <p><strong>Descripción:</strong> {{ curso.descripcion }}</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'HomeView',

  components: {
    NavBar,
  },

  computed: {
    ...mapGetters(['getCursos']),
    cursos() {
      return this.getCursos;
    },
  },
};
</script>

