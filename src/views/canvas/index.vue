<script lang="ts">
import { nextTick, reactive, ref } from "@vue/runtime-core";
import img1 from "@/assets/image/1.png";
import img2 from "@/assets/image/2.png";
export default {
  setup() {
    // 起始坐标
    let mousedownXy: { x: number; y: number }[] = reactive([]);
    // 是否移动canvas
    let isMove = ref(false);
    let enableLine = ref(false);
    let moveStartXy: { x: number; y: number } = reactive({ x: 0, y: 0 }); // 点击记录当前位置
    let moveLogXy: { x: number; y: number } = reactive({ x: 0, y: 0 }); // 移动记录当前位置
    // 是否可开始画图
    let isStart = ref(false);
    // 放大缩小
    let zoom = ref(1);
    nextTick(async () => {
      const canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
      const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      const xNumber = 50; // x 轴网格数量
      const yNumber = 50; // y 轴网格数量
      canvas.width = 500;
      canvas.height = 500;
      canvas.style.width = "500px";
      canvas.style.height = "500px";
      const block = 10; // 网格大小
      ctx.fillStyle = "#f9f9f9";
      // ctx.strokeStyle = "#f1f1f1"; // 边框的颜色
      // const imgObj = new Image();
      // imgObj.src =
      //   "https://nft-1259661131.cos.ap-hongkong.myqcloud.com/test/fang-test/map-hk.jpeg";
      // imgObj.onload = async function () {
      // for (let i = 0; i < xNumber; i++) {
      //   for (let j = 0; j < yNumber; j++) {
      //     // const mapBit = await createImageBitmap(
      //     //   imgObj,
      //     //   i * block,
      //     //   j * block,
      //     //   block,
      //     //   block
      //     // );
      //     ctx.fillRect(i * block, j * block, block, block);
      //     // 绘制边框;
      //     // ctx.strokeRect(i * block, j * block, block, block);
      //     // ctx.drawImage(mapBit, i * block, j * block);
      //     console.log("----" + i, j);
      //   }
      // }
      // }

      darw("#F1f1f1");

      // 画图
      function darw(color: string = "#f9f9f9") {
        ctx.fillStyle = color;
        ctx.strokeStyle = "#f1f1f1"; // 边框的颜色
        const imgObj = new Image();
        if (zoom.value > 2) {
          imgObj.src = img2;
        } else {
          imgObj.src = img1;
        }
        imgObj.onload = async function () {
          ctx.drawImage(imgObj, 0, 0);
          for (let i = 0; i < xNumber; i++) {
            for (let j = 0; j < yNumber; j++) {
              // const mapBit = await createImageBitmap(
              //   imgObj,
              //   i * block,
              //   j * block,
              //   block,
              //   block
              // );
              if (checkXy(i * block + 10, j * block, mousedownXy)) {
                ctx.fillStyle = "red";
                ctx.fillRect(i * block, j * block, block, block);
              } else {
                // ctx.fillStyle = color;
              }
              // ctx.fillRect(i * block, j * block, block, block);
              // 绘制边框;
              // ctx.strokeRect(i * block, j * block, block, block);
            }
          }
        };
      }

      // 键盘事件
      document.addEventListener("keydown", (res: KeyboardEvent) => {
        if (!isStart.value || !["w", "s", "a", "d"].includes(res.key)) {
          return;
        }
        let mXy = mousedownXy[mousedownXy.length - 1];
        switch (res.key) {
          case "w":
            mXy = { x: mXy.x, y: mXy.y - 10 };
            break;
          case "s":
            mXy = { x: mXy.x, y: mXy.y + 10 };
            break;
          case "a":
            mXy = { x: mXy.x - 10, y: mXy.y };
            break;
          case "d":
            mXy = { x: mXy.x + 10, y: mXy.y };
            break;
        }

        // 移动起始位置
        const startXy = {
          x: mousedownXy[mousedownXy.length - 1].x,
          y: mousedownXy[mousedownXy.length - 1].y,
        };
        // 移动坐标是否以存在
        const isInclude = mousedownXy.find((resXy) => {
          return mXy.x == resXy.x && mXy.y == resXy.y;
        });
        if (mXy.x == mousedownXy[0].x && mXy.y == mousedownXy[0].y) {
          isStart.value = false;
          // 闭环结束 计算可用坐标
          darw("#F1f1f1");
        } else if (isInclude) {
          return false;
        } else {
          mousedownXy.push(mXy);
        }

        // 画选择的方块
        // ctx.fillStyle = "red";
        // ctx.fillRect(mXy.x, mXy.y, 10, 10);

        ctx.beginPath();
        ctx.moveTo(startXy.x, startXy.y);
        ctx.lineTo(mXy.x, mXy.y);
        ctx.stroke();
      });

      // 计算圈地坐标
      function checkXy(x: number, y: number, poly: { x: number; y: number }[]) {
        let iSum = 0;
        let iCount = 0;
        let dLon1, dLon2, dLat1, dLat2, dLon;
        if (poly.length < 3) {
          return false;
        }
        iCount = poly.length;
        for (let i = 0; i < iCount; i++) {
          if (i == iCount - 1) {
            dLon1 = poly[i].x;
            dLat1 = poly[i].y;
            dLon2 = poly[0].x;
            dLat2 = poly[0].y;
          } else {
            dLon1 = poly[i].x;
            dLat1 = poly[i].y;
            dLon2 = poly[i + 1].x;
            dLat2 = poly[i + 1].y;
          }
          //以下语句判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上
          if ((y >= dLat1 && y < dLat2) || (y >= dLat2 && y < dLat1)) {
            if (Math.abs(dLat1 - dLat2) > 0) {
              //得到 A点向左射线与边的交点的x坐标：
              dLon = dLon1 - ((dLon1 - dLon2) * (dLat1 - y)) / (dLat1 - dLat2);
              if (dLon < x) iSum++;
            }
          }
        }
        if (iSum % 2 != 0) {
          return true;
        }
        return false;
      }

      // 鼠标按下弹起事件
      canvas.addEventListener("mouseup", (res: MouseEvent) => {
        // 移动了取消不画画
        isMove.value = false;
        if (!enableLine.value) {
          return;
        }
        // 鼠标按下弹起开始画地图
        mousedownXy = [
          {
            x: Math.floor(res.offsetX / 10) * 10,
            y: Math.floor(res.offsetY / 10) * 10,
          },
        ];
        // ctx.fillStyle = "red";
        // ctx.fillRect(mousedownXy[0].x, mousedownXy[0].y, 10, 10);
        isStart.value = true;
        // 点击坐标点 画点
        const clickRes = mousedownXy[0];
        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        ctx.fillRect(clickRes.x - 2, clickRes.y - 2, 4, 4);
        ctx.strokeRect(clickRes.x - 2, clickRes.y - 2, 4, 4);
      });

      // 鼠标按下时
      canvas.addEventListener("mousedown", (res) => {
        // 计算移动开始位置
        moveStartXy = {
          x: res.clientX - moveLogXy.x,
          y: res.clientY - moveLogXy.y,
        };
        isMove.value = true;
        enableLine.value = true;
      });

      // 鼠标移动
      canvas.addEventListener("mousemove", (e) => {
        if (isMove.value) {
          const leftVal = e.clientX - moveStartXy.x;
          const topVal = e.clientY - moveStartXy.y;
          canvas.style.marginLeft = leftVal + "px";
          canvas.style.marginTop = topVal + "px";
          moveLogXy = { x: leftVal, y: topVal };
          enableLine.value = false;
        }
      });

      // 放大缩小
      canvas.addEventListener("mousewheel", (e: any) => {
        if (e.wheelDeltaY < 0 && zoom.value < 3) {
          zoom.value = Number((zoom.value + 0.1).toFixed(2));
          canvas.style.transform = "scale(" + zoom.value + ")";
        } else if (e.wheelDeltaY > 0 && zoom.value > 1) {
          zoom.value = Number((zoom.value - 0.1).toFixed(2));
          canvas.style.transform = "scale(" + zoom.value + ")";
        } else {
          return;
        }
        darw("green");
      });
    });
    return {};
  },
};
</script>
<template>
  <div>
    <canvas id="canvas" style="width: 320px; height: 240px"></canvas>
  </div>
</template>

<style scoped>
</style>