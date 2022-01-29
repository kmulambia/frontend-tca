<template>
  <div class="flex flex-center">
    <q-card flat bordered style="width: 500px; max-width: 80vw">
      <q-form @submit.prevent="updatePassword">
            <!-- <q-card-section class="bg-grey-2 text-primary">
            <div class="text-h6 text-capitalize">Update your credentials</div>
          </q-card-section> -->
        <q-card-section class="q-gutter-sm">
           <q-input
              class=""
              v-model="model.password"
              outlined
              dense
              color="primary"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              hint=" "
              stack-label
              counter
              :rules="[
                (val) => !!val || 'your password is required',
                (val) =>
                  val.length >= 6 ||
                  'password must have a minimum of 6 characters',
              ]"
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
              class=""
              v-model="confirm"
              outlined
              dense
              stack-label
              color="primary"
              type="password"
              label="Confirm password"
              hint=" "
              :rules="[
                (val) => !!val || 'your password is required',
                (val) =>
                  val.length >= 6 ||
                  'password must have a minimum of 6 characters',
                (val) => val == model.password || 'password must be the same',
              ]"
            />
        </q-card-section>
        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn
            class="q-ml-sm text-capitalize"
            label="update"
            type="submit"
            color="primary"
          ></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
const $route = useRoute();
//Variables
const id = ref(null);
const user = reactive($store.getters["session/getUser"]);
const model = ref({
  password: "",
});
const isPwd = ref(true);
const confirm = ref("");
//Mounted
onMounted(() => {
  id.value = user.id;
});
//Functions
//Update User
async function updatePassword() {
  let item = Object.assign({}, model.value);
  $q.loading.show();

  await $store
    .dispatch("session/changePassword", item)
    .then(
      (response) => {
        $q.loading.hide();
        $q.dialog({
          title: "successfully updated credentials",
          message: "you will be momentarily logged out of your account",
          cancel: false,
          persistent: true,
        }).onOk(() => {
          signout();
        });
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to update your User credentials",
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
//Logout
function signout() {
  $q.loading.show();
  $store
    .dispatch("session/signout")
    .then(
      () => {},
      (reason) => {}
    )
    .finally(() => {
      $q.loading.hide();
      // redirect
      $router.push({ path: "/" });
    });
}
</script>