<template>
  <q-page class="flex flex-center">
    <q-form class="q-gutter-md" @submit="onSubmit">
      <q-card flat style="min-width: 400px">
        <q-card-section class="text-center column">
          <span class="text-h4 text grey-9">Let's find your password ?</span>
          <span class="text-caption text-grey-6"
            >What’s your email address ?</span
          >
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-input
            class="q-mb-sm"
            bottom-slots
            v-model="model.email"
            label="Email"
            type="email"
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter a valid email',
            ]"
          />
        </q-card-section>
        <!-- <div class="text-grey text-subtitle2 q-ml-lg">Terms of use</div>
        <q-card-section>
          <q-checkbox v-model="iAcceptTerms" /> I agree to the Terms
        </q-card-section> -->
        <q-card-actions align="right">
          <q-btn
            size="md"
            class="q-ml-sm q-mr-sm full-width text-capitalize"
            label="Reset password"
            type="submit"
            no-caps
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-form>
    <q-footer class="bg-white">
      <q-toolbar class="flex flex-center text-grey-9 q-mb-lg">
        Have an account ?
        <q-btn
          flat
          size="md"
          class="text-capitalize"
          label="sign in"
          to="/signin"
          no-caps
          color="primary"
        />
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
//Variables
const model = reactive({
  email: "",
});
//Functions
function onSubmit() {
  $q.loading.show();
  //Process
  $store
    .dispatch("session/forgotPassowrd", model)
    .then(
      () => {
        //success
        $q.dialog({
          title: "Congratulations",
          message: "Recovery code has just been sent to your email addresss ",
          html: true,
        }).onOk(() => {
          // redirect
          $router.push({ path: "/reset-password" });
        });
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Sorry sign in failed , something wrong happed ",
          caption: !reason.message ? "potential network error" : reason.message,
        });
      }
    )
    .finally(() => {
      $q.loading.hide();
    });
}
</script>
