<template>
  <div class="content">
    <div class="btn_prev">
      <img
        src="@/assets/icons/back.svg"
        alt=""
        width="20px"
        class="BTN"
        @click="preWidth"
        v-show="this.listFiles.length > 3"
      />
    </div>
    <div class="list-file" ref="files">
      <div v-for="(item, index) in listFiles" :key="index" class="file-item">
        <div class="item-logo">
          <img
            v-if="item.type === 'application/pdf'"
            src="@/assets/icons/pdf.svg"
            alt=""
          />
          <img
            v-else-if="
              item.type ===
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            "
            src="@/assets/icons/exel.svg"
            alt=""
          />
          <img
            v-else-if="item.type === 'application/msword'"
            src="@/assets/icons/word.svg"
            alt=""
          />
          <img v-else src="@/assets/icons/file.svg" alt="" />
        </div>
        <div class="item-detail">
          <span class="name">{{ item.name }}</span>
          <p class="size">{{ item.size }}KB</p>
        </div>
        <div class="delete-icon">
          <img
            @click="removeFile(index)"
            src="@/assets/icons/close.svg"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="btn_next">
      <img
        src="@/assets/icons/next.svg"
        alt=""
        width="20px"
        class="BTN"
        @click="addWidth"
        v-show="this.listFiles.length > 3"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ListFile",
  props: {
    listFiles: {
      type: [Array, Object],
    },
    contentWidth: {
      type: String,
    },
  },
  methods: {
    removeFile(index) {
      this.$emit("onDelete", index);
    },
    addWidth() {
      console.log((this.$refs.files.scrollLeft += 200));
    },
    preWidth() {
      console.log((this.$refs.files.scrollLeft -= 200));
    },
  },
};
</script>

<style scoped lang="scss">
* {
  scroll-behavior: smooth;
}
.BTN {
  cursor: pointer;
}
.content {
  display: flex;
  margin: 0 auto;
  max-width: 50%;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  gap: 5px;
  height: 60px;
}
.list-file {
  width: 100%;
  display: flex;
  gap: 5px;
  height: 80px;
  overflow-x: scroll;
  overflow-y: hidden;
}
.file-item {
  display: flex;
  align-items: center;
  min-width: 208px;
  gap: 7px;
  border: 1px solid #ccc;
  word-break: break-word;
  white-space: nowrap;
  border-radius: 3px;
  padding: 3px;
}
.item-detail {
  width: 100%;
  line-height: 0;
  padding-top: 5px;
}
span.name {
  line-height: 20px;
  font-weight: bold;
  font-size: 14px;
  word-break: break-all;
  white-space: break-spaces;
}
p.size {
  font-size: 14px;
}
</style>
