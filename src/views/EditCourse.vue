<template>
  <div class="edit-course">
    <h1>Editar Curso</h1>
    <v-form ref="editCourseForm" @submit.prevent="updateCourse">
      <v-container>
        <v-text-field v-model="editedCourse.nombre" label="Nombre"></v-text-field>
        <v-text-field v-model="editedCourse.img" label="URL de la imagen"></v-text-field>
        <v-text-field v-model="editedCourse.cupos" label="Cupos" type="number"></v-text-field>
        <v-text-field v-model="editedCourse.inscritos" label="Inscritos" type="number"></v-text-field>
        <v-text-field v-model="editedCourse.costo" label="Costo" type="number"></v-text-field>
        <v-text-field v-model="editedCourse.duracion" label="Duración"></v-text-field>
        <v-text-field v-model="editedCourse.descripcion" label="Descripción"></v-text-field>
        <v-btn color="primary" type="submit">Guardar</v-btn>
        <v-btn @click="cancelEdit">Cancelar</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'EditCourse',

  data() {
    return {
      editedCourse: {},
    };
  },

  computed: {
    ...mapGetters(['getCursoById']),
  },

  methods: {
    ...mapMutations(['editarCurso']),

    fetchCourse() {
      const courseId = parseInt(this.$route.params.id);
      this.editedCourse = { ...this.getCursoById(courseId) };
    },

    updateCourse() {
      // Validaciones
      if (this.editedCourse.inscritos > this.editedCourse.cupos) {
        alert('La cantidad de inscritos no puede ser mayor que la cantidad de cupos disponibles.');
        return;
      }

      if (this.editedCourse.estado === 'Terminado') {
        this.editedCourse.inscritos = 0;
      }

      this.editarCurso(this.editedCourse); // Actualiza el curso en el estado Vuex
      this.$router.push({ name: 'admin' }); // Redirige a la página de administración
    },

    cancelEdit() {
      this.$router.push({ name: 'admin' }); // Redirige a la página de administración
    },
  },

  mounted() {
    this.fetchCourse();
  },
};
</script>

<style scoped>
.edit-course {
  max-width: 500px;
  margin: 0 auto;
}
</style>
