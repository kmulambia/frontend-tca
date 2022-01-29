<template>
  <q-page class="flex flex-center">
    <q-form class="q-gutter-md" @submit.prevent="onSubmit">
      <q-card flat style="min-width: 400px">
        <q-card-section class="text-center column">
          <span class="text-h4 text grey-9 text-capitalize">welcome back!</span>
          <span class="text-caption text-grey-6"
            >Enter your email and password to sign in to your account</span
          >
        </q-card-section>
        <q-card-section>
          <q-input
            class="q-mb-sm"
            bottom-slots
            stack-label
            v-model="model.email"
            label="Email"
            type="email"
            :rules="[
              (val) => (val && val.length > 0) || 'please enter valid email',
            ]"
          >
            <template v-slot:before>
              <q-icon name="mail" />
            </template>
          </q-input>

          <q-input
            class="q-mb-sm"
            bottom-slots
            stack-label
            :type="isPwd ? 'password' : 'text'"
            v-model="model.password"
            label="Password"
            :rules="[
              (val) => (val && val.length > 0) || 'your password is required',
            ]"
          >
            <template v-slot:before>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <!-- <q-toggle dense v-model="model.remember" label="Keep me signed in" /> -->
          <div class="text-center">
            <q-btn
              flat
              size="md"
              to="/forgot-password"
              class="q-mt-sm text-capitalize"
              label="forgot your password ?"
              no-caps
              color="primary"
            />
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            size="md"
            class="q-ml-sm q-mr-sm full-width text-capitalize"
            label="sign in"
            type="submit"
            :loading="submitting"
            no-caps
            color="primary"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
    <q-footer class="bg-white">
      <q-toolbar class="flex flex-center text-grey-9 q-mb-lg">
        are you new ?
        <q-btn
          flat
          size="md"
          class="text-capitalize"
          label="sign up"
          to="/signup"
          no-caps
          color="primary"
        />
        <!-- <div class="q-mt-md">
          <q-select
            dense
            v-model="$i18n.locale"
            option-value="id"
            option-label="name"
            emit-value
            map-options
            style="width: 150px"
            :options="[
              { id: 'en-US', name: 'English' },
              { id: 'ny', name: 'Chichewa' },
            ]"
            ><template v-slot:prepend>
              <q-icon name="g_translate" />
            </template>
          </q-select>
        </div> -->
      </q-toolbar>
    </q-footer>
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
//Variables
const submitting = ref(false);
const model = reactive({
  email: "",
  password: "",
});
const isPwd = ref(true);
// const remember = ref(false);
//Mounted
onMounted(() => {
  checkSession();
});
//Functions
function onSubmit() {
  $q.loading.show();
  $store
    .dispatch("session/signin", model)
    .then(
      (response) => {
        $q.notify({
          type: "success",
          message: "You have successfully signed in",
          caption:
            "welcome '<span class='text-bold text-capitalize'>" +
            response.name +
            "</span>'",
        });
        // redirect
        $router.push({ path: "/" + response.role.name });
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Sorry sign in failed",
          caption: !reason.message
            ? " you may be experiencing bad network "
            : reason.message,
        });
      }
    )
    .finally(() => {
      $q.loading.hide();
    });
}
function checkSession() {
  $q.loading.show();
  $store
    .dispatch("session/ping")
    .then(
      (response) => {
        if (response)
          // redirect
          $router.push({ path: "/" + response.role.name });
      },
      (reason) => {}
    )
    .finally(() => {
      $q.loading.hide();
    });
}
</script>