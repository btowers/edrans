<template>
  <q-page padding class="flex flex-center">
    <q-card class="register">
      <q-card-section horizontal>
        <q-card-section style="width: 100%">
          <q-form>
            <q-input
              @keyup.enter="registerUser"
              v-model="user.nombre"
              name="nombre"
              ref="nombreRef"
              label="Nombre"
              lazy-rules
              :rules="[
                (val) => !!val || 'Campo requerido',
                (val) =>
                  val.length > 3 || 'Field must have at least 4 characters',
              ]"
            />
            <q-input
              @keyup.enter="registerUser"
              v-model="user.email"
              type="email"
              name="email"
              ref="emailRef"
              label="Email"
              lazy-rules
              :rules="[
                (val) => !!val || 'Campo requerido',
                (val) =>
                  !!val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Invalid email',
              ]"
            />
            <q-input
              @keyup.enter="registerUser"
              v-model="user.password"
              :type="isPwd ? 'password' : 'text'"
              name="password"
              ref="passwordRef"
              label="Contraseña"
              lazy-rules
              :rules="[
                (val) => !!val || 'Campo requerido',
                (val) =>
                  !!val.match(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
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
            <q-input
              @keyup.enter="registerUser"
              v-model="user.confirmPassword"
              :type="isPwd ? 'password' : 'text'"
              name="passwordRepeat"
              ref="passwordRef"
              label="Repita Contraseña"
              lazy-rules
              :rules="[
                (val) => !!val || 'Campo requerido',
                (val) =>
                  val === user.password || 'Las contraseñas no coinciden',
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
          </q-form>
        </q-card-section>
        <q-separator vertical />
        <q-card-section style="width: 100%">
          <q-input
            @keyup.enter="registerUser"
            v-model="user.identificador"
            reverse-fill-mask
            name="identificador"
            ref="identificadorRef"
            label="DNI"
            lazy-rules
            :rules="[
              (val) => !!val || 'Campo requerido',
              (val) =>
                !!val.match(/^[0-9]{7,8}$/) ||
                'El DNI debe tener entre 7 y 8 digitos',
            ]"
          />
          <q-input
            @keyup.enter="registerUser"
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
            @keyup.enter="registerUser"
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
            @keyup.enter="registerUser"
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
            @keyup.enter="registerUser"
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
            @keyup.enter="registerUser"
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
          <q-toggle label="Administrador" v-model="user.admin" />
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <div class="row justify-end q-py-md">
          <div class="q-mr-md">
            <q-btn
              :disable="loading"
              flat
              @click="this.$router.push('/login')"
              color="primary"
              label="Login"
            />
          </div>
          <div>
            <q-btn
              :disable="loading"
              :loading="loading"
              @click="registerUser"
              color="primary"
              label="Register"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      loading: false,
      user: {
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
        direccion: {
          calle: "",
          altura: "",
          cp: "",
          piso: "",
          departamento: "",
        },
        identificador: "",
        admin: false,
      },

      isPwd: true,
    };
  },

  methods: {
    async registerUser() {
      if (this.isInvalidForm()) {
        return;
      }
      this.loading = true;
      this.$axios({
        method: "POST",
        url: "/api/user/signup",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: this.user,
      })
        .then((res) => {
          this.$q.notify({
            position: "bottom-right",
            color: "positive",
            message: "Usuario registrado con exito",
          });
          this.$router.push("/login");
          this.loading = false;
        })
        .catch((err) => {
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: "email/identificador ya registrado",
          });
          this.loading = false;
        });
    },

    isInvalidForm() {
      this.$refs.nombreRef.validate();
      this.$refs.emailRef.validate();
      this.$refs.passwordRef.validate();
      this.$refs.identificadorRef.validate();
      this.$refs.calleRef.validate();
      this.$refs.alturaRef.validate();
      this.$refs.cpRef.validate();
      this.$refs.pisoRef.validate();
      this.$refs.departamentoRef.validate();
      if (
        this.$refs.nombreRef.hasError ||
        this.$refs.emailRef.hasError ||
        this.$refs.passwordRef.hasError ||
        this.$refs.identificadorRef.hasError ||
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
