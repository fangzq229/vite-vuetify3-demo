<template>
  <v-card class="mt-4 mx-auto elevation-0" width="100%">
    <v-sheet
      id="sheet_id"
      class="ml-4"
      :rounded="10"
      max-width="calc(100% - 32px)"
      elevation="3"
    >
      <div class="line-charts" ref="lineCharts"></div>
      <v-card-text class="pt-0">
        <div class="text-h6">
          {{ optionVal.title }}
        </div>
        <div class="text-body-1">{{ optionVal.subheading }}</div>
        <v-divider class="my-2"></v-divider>
        <v-icon small>{{ optionVal.icon }}</v-icon>
        <span class="text-body-1 pl-2">{{ optionVal.caption }}</span>
      </v-card-text>
    </v-sheet>
  </v-card>
</template>
<script lang="ts">
import {
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "vue";
export default {
  props: {
    // 描述等参数
    optionVal: {
      type: Object,
      required: true,
      default: function () {
        return {
          title: "",
          subheading: "",
          icon: "",
          caption: "",
        };
      },
    },

    // 背景颜色
    backgroundColor: {
      type: String,
      default: function () {
        return "#43A047";
      },
    },

    // x轴数据
    xAxisData: {
      type: Array,
      default: function () {
        return [];
      },
    },

    // y轴数据
    yAxisData: {
      type: Array,
      default: function () {
        return [];
      },
    },

    // 曲线使用
    series: {
      type: Array,
      default: function () {
        return [];
      },
    },

    type: {
      type: String,
      default: function () {
        return "line"; // bar 柱状图
      },
    },
  },
  setup(props: any) {
    const { proxy } = getCurrentInstance() as any;
    const lineCharts = ref(null);
    const onSheetDom: any = reactive({});
    // 监听 sheet dom 元素变化回调
    function onResize(myEchars: any, e?: any) {
      nextTick(() => {
        if (e) {
          const dom = e[0].target;
          const width = dom.clientWidth;
          const height = width * 0.46;
          myEchars.resize({
            width: width,
            height: height,
          });
        }
      });
    }
    // 页面加载完执行
    onMounted(() => {
      // 获取dom
      const myEchars = proxy.$echarts.init(lineCharts.value);
      // 监听元素大小变化
      onSheetDom.value = new ResizeObserver((e) => {
        onResize(myEchars, e);
      });
      const sheetDom = document.getElementById("sheet_id")!;
      onSheetDom.value.observe(sheetDom);
      myEchars.setOption({
        legend: { borderRadius: [10, 10, 10, 10] },
        grid: {
          left: 28,
          right: 28,
          top: 28,
          bottom: 28,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: props.xAxisData,
          axisLine: {
            lineStyle: {
              color: "#FFFFFF", // 颜色 x轴颜色
            },
          },
        },
        yAxis: {
          type: "value",
          data: props.yAxisData,
          axisLine: {
            lineStyle: {
              color: "#FFFFFF", // 颜色 y轴颜色
            },
          },
          axisLabel: {
            show: true,
          },
        },
        series: [
          {
            data: props.series,
            type: props.type, // bar 柱状图 line 曲线图
            // smooth: true
          },
        ],
        color: ["#FFFFFF"], //曲线颜色
        backgroundColor: [props.backgroundColor], //背景颜色
        textStyle: {
          color: "#FFFFFF", // font颜色
        },
      });
    });
    // 销毁前
    onBeforeUnmount(() => {
      onSheetDom.value.disconnect();
    });
    return {
      lineCharts,
    };
  },
};
</script>
<style>
.line-charts {
  width: 100%;
}
</style>