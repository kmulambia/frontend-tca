<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <div class="column flex-center q-mt-xl">
        <q-btn
          color="white"
          text-color="blue"
          unelevated
          to="/"
          label="Go Home"
          no-caps
        />
        <p class="q-ma-md">or</p>
        <q-btn
          flat
          unelevated
          @click="onSignout()"
          label="Clear session and exit"
          no-caps
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
//Declarations
const $q = useQuasar();
const $store = useStore();
const $router = useRouter();
//Loaders
//Functions
function onSignout() {
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
