<template>
  <v-row>
    <v-col cols="12" xs="12" sm="12" md="12">
      <v-card class="elevation-2" :rounded="0">
        <v-card-title>Statistics Today</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="6"
              lg="3"
              v-for="(item, idx) in dayItems"
              :key="idx"
            >
              <dataBox
                :text="item.text"
                :val="item.val"
                :color="item.color"
                :icon="item.icon"
              ></dataBox>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-card class="elevation-2 mt-5" :rounded="0">
        <v-card-title>To Do</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="6"
              md="6"
              lg="3"
              v-for="(item, idx) in todoitems"
              :key="idx"
            >
              <dataBox
                :text="item.text"
                :val="item.val"
                :color="item.color"
              ></dataBox>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col
      class="pa-0"
      cols="12"
      xs="12"
      sm="12"
      md="6"
      lg="3"
      v-for="(item, index) in echartsItems"
      :key="index"
    >
      <echartsLine
        :optionVal="item.optionVal"
        :type="item.type"
        :backgroundColor="item.backgroundColor"
        :xAxisData="item.xAxisData"
        :series="item.series"
      ></echartsLine>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { dayData, todoData, echartsLineData } from "@/api/data";
import dataBox from "@/components/dataBox.vue";
import echartsLine from "@/components/echartsLine.vue";
import { reactive } from "vue-demi";
export default {
  components: { dataBox, echartsLine },
  setup() {
    const dayItems = reactive(dayData);
    const todoitems = reactive(todoData);
    const echartsItems = reactive(echartsLineData);
    return {
      dayItems,
      todoitems,
      echartsItems,
    };
  },
};
</script>
<style>
</style>