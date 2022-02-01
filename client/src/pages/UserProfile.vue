<template>
  <q-page padding class="flex justify-center">
    <div class="base-width">
      <page-title title="Editar Perfil" />
      <q-card class="q-pa-md">
        <q-card-section horizontal>
          <q-card-section style="width: 100%">
            <q-input
              v-model="user.nombre"
              readonly
              name="nombre"
              label="Nombre"
            />
            <q-input
              v-model="user.email"
              readonly
              type="email"
              name="email"
              label="Email"
            />
            <q-input
              v-model="user.identificador"
              readonly
              name="identificador"
              label="DNI"
            />
          </q-card-section>
          <q-separator vertical />
          <q-card-section style="width: 100%">
            <q-input
              @keyup.enter="updateUser"
              v-model="user.direccion.calle"
              name="calle"
              ref="calleRef"
              label="Calle"
              lazy-rules
              :rules="[
                (val) => !!val || 'Campo requerido',
                (val) =>
                  !!val.match(/^[a-zA-Z0-9\s]{3,}$/) ||
                  'La calle debe tener al menos 3 caracteres',
              ]"
            />
            <q-input
              @keyup.enter="updateUser"
              v-model="user.direccion.altura"
              name="altura"
              ref="alturaRef"
              label="Altura"
              lazy-rules
              :rules="[
                (val) => !!val || 'Campo requerido',
                (val) =>
                  !!val.match(/^[0-9]{1,4}$/) ||
                  'La altura debe tener entre 1 y 4 digitos',
              ]"
            />
            <q-input
              @keyup.enter="updateUser"
              v-model="user.direccion.cp"
              name="cp"
              ref="cpRef"
              label="CP"
              lazy-rules
              :rules="[
                (val) => !!val || 'Campo requerido',
                (val) =>
                  !!val.match(/^[0-9]{1,4}$/) ||
                  'El CP debe tener entre 1 y 4 digitos',
              ]"
            />
            <q-input
              @keyup.enter="updateUser"
              v-model="user.direccion.piso"
              name="piso"
              ref="pisoRef"
              label="Piso"
              lazy-rules
              :rules="[
                (val) =>
                  !!val.match(/^(\s*|\d+)$/) ||
                  'El piso debe tener entre 0 y 3 digitos',
              ]"
            />
            <q-input
              @keyup.enter="updateUser"
              v-model="user.direccion.departamento"
              name="departamento"
              ref="departamentoRef"
              label="Departamento"
              lazy-rules
              :rules="[
                (val) =>
                  !!val.match(/^[a-zA-Z]{0,3}$/) ||
                  'El departamento debe tener entre 0 y 3 letras',
              ]"
            />
            <q-input
              @keyup.enter="updateUser"
              v-model="user.password"
              :type="isPwd ? 'password' : 'text'"
              name="password"
              ref="passwordRef"
              label="Nueva Contraseña"
              lazy-rules
              :rules="[
                (val) =>
                  !!val.match(
                    /^\s*$|(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
                  ) ||
                  'La contraseña debe contener al menos 8 caracteres, 1 numero, 1 letra mayuscula y un símbolo',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>
        </q-card-section>
        <q-card-section>
          <div class="row justify-end q-py-md">
            <div class="q-mr-md">
              <q-btn
                :disable="loading"
                flat
                @click="this.$router.push('/')"
                color="primary"
                label="Cancelar"
              />
            </div>
            <div>
              <q-btn
                :disable="loading"
                :loading="loading"
                @click="updateUser"
                color="primary"
                label="Actualizar"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import PageTitle from "../components/PageTitle.vue";
export default {
  name: "RegisterPage",
  components: {
    PageTitle,
  },
  data() {
    return {
      loading: false,
      user: {
        id: "",
        nombre: "",
        email: "",
        password: "",
        direccion: {
          calle: "",
          altura: "",
          cp: "",
          piso: "",
          departamento: "",
        },
        identificador: "",
      },
      isPwd: true,
    };
  },

  created() {
    this.getUser();
  },

  methods: {
    updateUser() {
      if (this.isInvalidForm()) {
        return;
      }
      const fields = {
        direccion: {
          calle: this.user.direccion.calle,
          altura: this.user.direccion.altura,
          cp: this.user.direccion.cp,
          piso: this.user.direccion.piso,
          departamento: this.user.direccion.departamento,
        },
      };
      if (this.user.password) {
        fields.password = this.user.password;
        fields.confirmPassword = this.user.password;
      }
      this.loading = true;
      this.$axios({
        method: "PUT",
        url: "/api/user/" + this.user.id,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
        data: fields,
      })
        .then((res) => {
          this.$q.notify({
            position: "bottom-right",
            color: "positive",
            message: "Usuario actualizado",
          });
          this.loading = false;
          this.$router.push("/");
        })
        .catch((err) => {
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: "Error al actualizar el usuario",
          });
          this.loading = false;
        });
    },

    getUser() {
      this.$axios({
        method: "GET",
        url: "/api/user",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + this.$q.cookies.get("token"),
        },
      })
        .then((res) => {
          this.user = res.data.data;
        })
        .catch((err) => {
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: "Error al obtener los datos del usuario",
          });
        });
    },

    isInvalidForm() {
      if (this.user.password) {
        this.$refs.passwordRef.validate();
        if (this.$refs.passwordRef.hasError) return true;
      }
      this.$refs.calleRef.validate();
      this.$refs.alturaRef.validate();
      this.$refs.cpRef.validate();
      this.$refs.pisoRef.validate();
      this.$refs.departamentoRef.validate();
      if (
        this.$refs.calleRef.hasError ||
        this.$refs.alturaRef.hasError ||
        this.$refs.cpRef.hasError ||
        this.$refs.pisoRef.hasError ||
        this.$refs.departamentoRef.hasError
      )
        return true;
      else return false;
    },
  },
};
</script>
