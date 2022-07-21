<template>
  <v-container fluid class="py-0">
    <v-card class="" :rounded="0" :color="color">
      <v-card-text>
        <div class="d-flex justify-center align-center">
          <div v-if="icon">
            <v-icon size="28" color="#FFFFFF">{{ icon }}</v-icon>
          </div>
          <div :class="icon ? 'ml-5' : ''">
            <p class="text-body-1 text-center text-white">{{ text }}</p>
            <p class="text-h6 text-center text-white">{{ val }}</p>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
export default {
  props: {
    text: String,
    val: Number,
    color: String,
    icon: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  setup() {},
};
</script>
