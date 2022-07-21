<template>
  <v-table height="675">
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">Name</th>
        <th class="text-left">Image</th>
        <th class="text-left">Number</th>
        <th class="text-left">CreatedAt</th>
        <th class="text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.calories }}</td>
        <td width="220" class="flex-wrap">
          <v-btn size="small" variant="outlined">
            <v-icon>delete_forever</v-icon>
          </v-btn>
          <v-btn color="#333" class="ml-2" size="small" variant="outlined">
            <v-icon>draw</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-pagination v-model="page" :length="6"></v-pagination>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const page = ref(1);
    const desserts = [
      {
        name: "Frozen Yogurt",
        calories: 159,
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
      },
      {
        name: "Eclair",
        calories: 262,
      },
      {
        name: "Cupcake",
        calories: 305,
      },
      {
        name: "Gingerbread",
        calories: 356,
      },
      {
        name: "Jelly bean",
        calories: 375,
      },
      {
        name: "Lollipop",
        calories: 392,
      },
      {
        name: "Honeycomb",
        calories: 408,
      },
      {
        name: "Donut",
        calories: 452,
      },
      {
        name: "KitKat",
        calories: 518,
      },
      {
        name: "KitKat",
        calories: 518,
      },
      {
        name: "KitKat",
        calories: 518,
      },
      {
        name: "KitKat",
        calories: 518,
      },
      {
        name: "KitKat",
        calories: 518,
      },
      {
        name: "KitKat",
        calories: 518,
      },
      {
        name: "KitKat",
        calories: 518,
      },
      {
        name: "KitKat",
        calories: 518,
      },
      {
        name: "KitKat",
        calories: 518,
      },
      {
        name: "KitKat",
        calories: 518,
      },
      {
        name: "KitKat",
        calories: 518,
      },
      {
        name: "KitKat",
        calories: 518,
      },
    ];
    return {
      desserts,
      page,
    };
  },
};
</script>