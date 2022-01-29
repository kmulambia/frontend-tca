<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-card flat style="max-width: 80vw; width: 500px">
        <q-card-section class="text-center column">
          <span class="text-h4 text grey-9">Reset password ?</span>
          <span class="text-caption text-grey-6"
            >Enter recovery code and new password to reset your account ?</span
          >
        </q-card-section>
        <q-card-section>
          <q-stepper flat v-model="step" vertical color="primary" animated>
            <q-step
              :name="1"
              title="Recovery code "
              icon="settings"
              :done="step > 1"
            >
              <q-input
                v-model="model.token"
                color="primary"
                mask="# - # - # - # - # - # - #"
                unmasked-value
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please enter recovery code',
                ]"
                hint=""
              />

              <q-stepper-navigation>
                <q-btn @click="step = 2" color="primary" label="Continue" />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="2" title="Reset password" icon="add_comment">
              <q-input
                class="q-mb-sm"
                bottom-slots
                :type="isPwd ? 'password' : 'text'"
                v-model="model.password"
                label="Password "
                counter
                :rules="[
                  (val) => !!val || 'your password is required',
                  (val) =>
                    val.length >= 6 ||
                    'password must have a minimum of 6 characters',
                ]"
                hint="(6+ characters)"
                lazy-rules
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
                class="q-mb-sm"
                bottom-slots
                v-model="confirm"
                type="password"
                label="Confirm password"
                :rules="[
                  (val) => !!val || 'your password is required',
                  (val) =>
                    val.length >= 6 ||
                    'password must have a minimum of 6 characters',
                  (val) =>
                    val == model.password || 'passwords must be the same',
                ]"
                lazy-rules
              />
              <q-stepper-navigation>
                <q-btn
                  color="primary"
                  label="Reset password"
                  v-on:click="onSubmit"
                />
                <q-btn
                  flat
                  @click="step = 1"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-card-section>
      </q-card>
    </div>

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
const step = ref(1);
const isPwd = ref(true);
const confirm = ref("");
const model = reactive({
  token: null,
  resetPassowrd: null,
});
//Functions
function onSubmit() {
  $q.loading.show();
  //Process
  $store
    .dispatch("session/resetPassowrd", model)
    .then(
      () => {
        //success
        $q.dialog({
          title: "Congratulations",
          message:
            "you have successfully reseted your password . You  will now be redirected to the sign in page ",
          html: true,
        }).onOk(() => {
          // redirect
          $router.push({ path: "/signin" });
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
