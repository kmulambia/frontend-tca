<template>
  <q-page class="flex flex-center">
    <q-form class="q-gutter-md" @submit="onSubmit">
      <q-card flat style="min-width: 400px">
        <q-card-section class="text-center column">
          <span class="text-h4 text grey-9">Create an account</span>
          <span class="text-caption text-grey-6"
            >By clicking on "Create Account" you agree to our Terms of Use and
            Privacy Policy</span
          >
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-input
            class="q-mb-sm"
            bottom-slots
            v-model="model.name"
            label="Name"
            ref="email"
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter your name',
            ]"
          />
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
          <q-input
            class="q-mb-sm"
            color="primary"
            v-model="model.phone"
            label="Mobile (is recommended)"
            mask="(###) ### - ####"
            unmasked-value
            hint="Example : (099) 123 4567 / (088) 123 4567"
          />
          <q-select
             class="q-mb-sm"
            color="primary"
              label="Partner"
              hint=" "
              bg-color="white"
              v-model="model.partner"
              :options="partners"
              :option-value="(opt) => opt"
              :option-label="(opt) => opt.name"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'You must make selection',
              ]"
              lazy-rules
            />

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
              (val) => val == model.password || 'passwords must be the same',
            ]"
            lazy-rules
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
            label="Create account"
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
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
//Variables
const model = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
  partner:null,
  status: true,
});
const isPwd = ref(true);
const confirm = ref("");
const iAcceptTerms = ref("");
const partners = reactive([]);
//Mounted
onMounted(() => {
  getPartners();
});
//Functions
const getPartners = async () => {
  $q.loading.show();
  
  await $store
    .dispatch("partner/get")
    .then(
      (response) => {
        partners.push(...response);
      },
      (reason) => {
        $q.notify({
          type: "error",
          message: "Failed to load partners",
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

function onSubmit() {
  $q.loading.show();
  //Process
  console.log(model)
  /***/
  var item = model 
  item.partnerId = item.partner.id;
  delete item.partner;
  /***/
  $store
    .dispatch("session/signup", item)
    .then(
      () => {
        //success
        $q.dialog({
          title: "Congratulations",
          message:
            " For creating an account , please check your email for more details to  sign in ",
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
