<template>
  <q-page class="flex flex-center">
    <q-card class="login">
      <q-card-section>
        <q-input
          @keyup.enter="loginUser"
          v-model="user.email"
          label="Usuario"
        />
        <q-input
          @keyup.enter="loginUser"
          v-model="user.password"
          :type="isPwd ? 'password' : 'text'"
          label="Contraseña"
        />
        <div class="row justify-end q-py-md">
          <div class="q-mr-md">
            <q-btn
              :disable="loading || fbLoading"
              flat
              @click="this.$router.push('/register')"
              color="primary"
              label="Registrarse"
            />
          </div>
          <div>
            <q-btn
              :disable="loading || fbLoading"
              @click="loginUser"
              color="primary"
              label="Login"
              :loading="loading"
            />
          </div>
        </div>
        <q-separator />
        <div class="row justify-center q-pt-md">
          <div>
            <q-btn
              :disable="loading || fbLoading"
              @click="facebookLogin"
              icon="fab fa-facebook-f"
              color="primary"
              label="Facebook Login"
              :loading="fbLoading"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      fbLoading: false,
      loading: false,
      isPwd: true,
      user: { email: "", password: "" },
    };
  },
  methods: {
    ...mapMutations({
      setAdmin: "user/setAdmin",
    }),

    loginUser() {
      this.loading = true;
      this.$axios({
        method: "POST",
        url: "/api/user/login",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: this.user,
      })
        .then((res) => {
          this.loading = false;
          if (res.data.token) {
            //  localStorage.setItem("token", res.data.token);
            this.$q.cookies.set("token", res.data.token);
            this.$router.push("/");
          } else {
            this.$q.notify({
              position: "bottom-right",
              color: "negative",
              message: res.data.message,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$q.notify({
            position: "bottom-right",
            color: "negative",
            message: "Error al iniciar sesión",
          });
        });
    },

    facebookLogin() {
      this.fbLoading = true;
      window.location.replace(
        "https://edranschallenge.herokuapp.com/api/user/facebook"
      );
    },
  },
};
</script>
