<template>
    <div class="reportes">
        <h1 class="title">Lista de Reportes</h1>
        <table class="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="reporte in reportes" :key="reporte.id">
                    <td>{{ reporte.id }}</td>
                    <td>{{ reporte.title }}</td>
                    <td>{{ reporte.description }}</td>
                    <td>
                        <button @click="editReporte(reporte)" class="button is-info is-small">Editar</button>
                        <button @click="deleteReporte(reporte.id)" class="button is-danger is-small">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="editingReporte" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editar Reporte</p>
                    <button class="delete" aria-label="close" @click="cancelEdit"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">Título</label>
                        <div class="control">
                            <input v-model="editingReporte.title" class="input" type="text"
                                placeholder="Título del reporte">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Descripción</label>
                        <div class="control">
                            <textarea v-model="editingReporte.description" class="textarea"
                                placeholder="Descripción del reporte"></textarea>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button @click="updateReporte" class="button is-success">Guardar</button>
                   <!--  <button @click="cancelEdit" class="button">Cancelar</button> -->
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/init';

export default defineComponent({
    name: 'ReportesComponent',
    data() {
        return {
            reportes: [],
            editingReporte: null
        };
    },
    async created() {
        await this.fetchReportes();
    },
    methods: {
        async fetchReportes() {
            try {
                const reportsCollection = collection(db, 'reports');
                const reportsSnapshot = await getDocs(reportsCollection);
                this.reportes = reportsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error('Error fetching reports: ', error);
            }
        },
        editReporte(reporte) {
            this.editingReporte = { ...reporte };
        },
        async updateReporte() {
            try {
                const reporteDoc = doc(db, 'reports', this.editingReporte.id);
                await updateDoc(reporteDoc, {
                    title: this.editingReporte.title,
                    description: this.editingReporte.description
                });
                this.editingReporte = null;
                await this.fetchReportes();
            } catch (error) {
                console.error('Error updating report: ', error);
            }
        },
        async deleteReporte(id) {
            try {
                await deleteDoc(doc(db, 'reports', id));
                await this.fetchReportes();
            } catch (error) {
                console.error('Error deleting report: ', error);
            }
        },
        cancelEdit() {
            this.editingReporte = null;
        }
    }
});
</script>

<style scoped>
.reportes {
    padding: 1rem;
    background-color: rgb(255, 255, 255);
}

.table {
    margin-top: 1rem;
}

.modal-card {
    width: 50%;
}
</style>