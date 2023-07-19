<template>
  <div>
    <v-app-bar color="black" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Universidad de Los Andes</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item v-for="route in routes" :key="route.name" @click="redirectTo(route.name)" :disabled="currentRoute === route.name">
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <div class="info-section">
        <p>Total de alumnos permitidos: {{ totalStudents }}</p>
        <p>Total de alumnos inscritos: {{ totalEnrolledStudents }}</p>
        <p>Total de cupos restantes: {{ remainingSpots }}</p>
        <p>Total de cursos terminados: {{ totalCompletedCourses }}</p>
        <p>Total de cursos activos: {{ totalActiveCourses }}</p>
        <p>Total de cursos: {{ totalCourses }}</p>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',

  data() {
    return {
      drawer: false,
      group: null,
      routes: [
        { icon: 'mdi-home', title: 'Home', name: 'home' },
        { icon: 'mdi-cog', title: 'Administración', name: 'admin' },
        { icon: 'mdi-pencil', title: 'Editar Curso', name: 'edit-course' },
      ],
    };
  },

  computed: {
    ...mapGetters([
      'totalStudents',
      'totalEnrolledStudents',
      'remainingSpots',
      'totalCompletedCourses',
      'totalActiveCourses',
      'totalCourses',
    ]),

    currentRoute() {
      return this.$route.name;
    },
  },

  methods: {
    redirectTo(nameRoute) {
      this.$router.push({ name: nameRoute });
    },
  },
};
</script>

<style scoped>
.info-section {
  padding: 16px;
}
</style>

