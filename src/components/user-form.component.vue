<template>
  <div>
    <q-btn
      color="primary"
      icon="add"
      label="Create user"
      @click="createUserForm = true"
    >
      <q-tooltip>create new user</q-tooltip>
    </q-btn>
    <q-dialog
      v-model="createUserForm"
      :maximized="false"
      transition-show="slide-up"
      transition-hide="slide-down"
      persistent
    >
      <q-card style="width: 400px; max-width: 80vw">
        <q-form @submit.prevent="onSubmit">
          <q-card-section class="bg-grey-2 text-primary">
            <div class="text-h6 text-capitalize">create user</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-gutter-sm">
            <q-select
              class="text-uppercase"
              label="Role"
              hint=" "
              bg-color="white"
              v-model="model.role"
              :options="roles"
              :option-value="(opt) => opt"
              :option-label="(opt) => opt.name"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'You must make selection',
              ]"
              stack-label
              outlined
              dense
              lazy-rules
            />
            <q-input
              outlined
              dense
              color="primary"
              class=""
              hint=" "
              v-model="model.name"
              label="Name"
              stack-label
              :rules="[
                (val) => (val && val.length > 0) || 'please enter valid name',
              ]"
            />
            <q-input
              outlined
              dense
              class=""
              color="primary"
              v-model="model.phone"
              label="Mobile "
              mask="(###) ### - ####"
              unmasked-value
              hint="Example : (099) 123 4567 / (088) 123 4567"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'please enter valid phone number',
              ]"
            />

            <q-input
              outlined
              dense
              stack-label
              class=""
              color="primary"
              type="email"
              v-model="model.email"
              label="Email *"
              hint=" "
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'please enter valid email',
              ]"
            />
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
            <q-btn flat class="text-capitalize" label="cancel" v-close-popup />
            <q-btn
              class="q-ml-sm text-capitalize"
              label="create"
              type="submit"
              color="primary"
            ></q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
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
const emit = defineEmits(["create"]);
//Variables
const model = reactive({
  name: "",
  phone: "",
  email: "",
  status: true,
  role: null,
  password: "",
  roleId: "",
});
const isPwd = ref(true);
const roles = reactive([]);
const confirm = ref("");
const createUserForm = ref(false);
//Mounted
onMounted(() => {
  getRoles();
});
//Functions
const onSubmit = () => {
  emit("create", model);
  model.value = {
    name: "",
    phone: "",
    email: "",
    status: true,
    role: null,
    password: "",
    roleId: "",
  };
  createUserForm.value = false;
};
const getRoles = async () => {
  $q.loading.show();
  await $store
    .dispatch("role/get")
    .then(
      (response) => {
        roles.push(...response);
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to load roles",
          caption: !reason.message
            ? " you may be experiencing bad network "
            : reason.message,
        });
      }
    )
    .finally(() => {
      $q.loading.hide();
    });
};
</script>