<template>
  <div>
    <NavBar></NavBar>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1>Administración de Cursos</h1>
          <v-btn color="primary" @click="showAddModal = true">Agregar Curso</v-btn>
          <v-data-table :headers="headers" :items="cursos" :search="search" hide-default-footer>
            <template scope="props">
              <template v-if="props.header.value === 'actions'">
                <v-icon small class="mr-2" @click="editCourse(props.item.id)">mdi-pencil</v-icon>
                <v-icon small @click="confirmDeleteCourse(props.item.id)">mdi-delete</v-icon>
              </template>
              <template v-else>
                {{ props.item[props.header.value] }}
              </template>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Add Course Modal -->
    <v-dialog v-model="showAddModal" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Agregar Curso</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Agregar Curso</h2>
        </v-card-title>
        <v-card-text>
          <v-form ref="addCourseForm" @submit.prevent="addCourse">
            <v-text-field v-model="newCourse.nombre" label="Nombre"></v-text-field>
            <v-text-field v-model="newCourse.img" label="URL de la imagen"></v-text-field>
            <v-text-field v-model="newCourse.cupos" label="Cupos" type="number"></v-text-field>
            <v-text-field v-model="newCourse.inscritos" label="Inscritos" type="number"></v-text-field>
            <v-text-field v-model="newCourse.costo" label="Costo" type="number"></v-text-field>
            <v-text-field v-model="newCourse.duracion" label="Duración"></v-text-field>
            <v-text-field v-model="newCourse.descripcion" label="Descripción"></v-text-field>
            <v-btn color="primary" type="submit">Agregar</v-btn>
            <v-btn @click="cancelAddCourse">Cancelar</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Delete Course Modal -->
    <v-dialog v-model="showDeleteModal" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn color="error" dark v-on="on">Eliminar Curso</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Eliminar Curso</h2>
        </v-card-title>
        <v-card-text>
          <p>¿Estás seguro de que quieres eliminar este curso?</p>
          <v-btn color="error" @click="deleteCourse">Aceptar</v-btn>
          <v-btn @click="cancelDeleteCourse">Cancelar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Admin-view',

  components: {
    NavBar,
  },

  data() {
    return {
      headers: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Cupos', value: 'cupos' },
        { text: 'Inscritos', value: 'inscritos' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      search: '',
      showAddModal: false,
      showDeleteModal: false,
      newCourse: {
        nombre: '',
        img: '',
        cupos: null,
        inscritos: null,
        costo: null,
        duracion: '',
        descripcion: '',
      },
      deleteCourseId: null,
    };
  },

  computed: {
    ...mapGetters(['getCursos']),
  },

  methods: {
    ...mapMutations(['agregarCurso', 'eliminarCurso']),
    
    addCourse() {
      // Realizar validaciones antes de agregar el curso
      if (this.newCourse.inscritos > this.newCourse.cupos) {
        alert('La cantidad de inscritos no puede ser mayor que la cantidad de cupos disponibles.');
        return;
      }
      
      this.agregarCurso(this.newCourse);
      this.cancelAddCourse();
    },
    
    cancelAddCourse() {
      this.showAddModal = false;
      this.$refs.addCourseForm.reset();
    },
    
    editCourse(courseId) {
      // Redirigir al componente de edición de cursos con el ID del curso seleccionado
      this.$router.push({ name: 'edit-course', params: { id: courseId } });
    },
    
    confirmDeleteCourse(courseId) {
      this.showDeleteModal = true;
      this.deleteCourseId = courseId;
    },
    
    deleteCourse() {
      this.eliminarCurso(this.deleteCourseId);
      this.cancelDeleteCourse();
    },
    
    cancelDeleteCourse() {
      this.showDeleteModal = false;
      this.deleteCourseId = null;
    },
  },
};
</script>