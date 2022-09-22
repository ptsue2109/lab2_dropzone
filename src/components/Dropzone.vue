<template>
  <div>
    <div>
      <div
        class="upload-file-box"
        :class="{ 'warning-dropzone': warningStatus }"
      >
        <div @drop.prevent="handleDrop" @dragover.prevent class="chose-file">
          <img src="@/assets/upload3.png" alt="" class="image" />
          <p>Drag and drop files</p>
          <label class="button-upload" for="file">Browse files</label>
          <input type="file" id="file" @change="handleChangeFile" multiple />
        </div>
        <h3 v-if="warningStatus" class="error">{{ errorFile }}</h3>
      </div>
      <FileSelected
        @onDelete="handleDelete"
        :listFiles="listFiles"
        contentWidth="300px"
      />
      <div class="submit-box">
        <button @click="onUploadFile" :disabled="disabledButton">
          Upload File
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import useStorage from "../firebase/upload";
import FileSelected from "./FileSelected.vue";
const { uploadFile } = useStorage("files");
export default {
  name: "DropzoneComp",
  data: function () {
    return {
      listFiles: [],
      numberOfFiles: 0,
      errorFile: null,
      warningStatus: false,
    };
  },

  components: { FileSelected },
  methods: {
    condition(selected) {
      const typesFile = [
        "image/png",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "text/plain",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      const ERRORS = {
        TOO_LARGE: "Please select files less than 10MB in size.",
        LIMIT_FILES: "Exceed the limit of 10 file",
        REQUIRED: "Please select txt, png, jpg, pdf, doc file.",
      };
      const MAX_SIZE = 10000000;
      const MAX_FILE = 10;
      if (selected) {
        console.log('selected',selected);
        if (typesFile.includes(selected.type)) {
          if (this.listFiles.length > MAX_FILE) {
            this.errorFile = ERRORS.LIMIT_FILES;
            this.warningStatus = true;
          } else if (selected.size > MAX_SIZE) {
            this.errorFile = ERRORS.TOO_LARGE;
            this.warningStatus = true;
          } else {
            this.listFiles.push(selected);
            this.warningStatus = false;
          }
        } else {
          this.errorFile = ERRORS.REQUIRED;
          this.warningStatus = true;
        }
      }
    },
    handleChangeFile(e) {
      const selected = e.target.files[0]
      this.condition(selected);
    },
    onUploadFile() {
      uploadFile(this.listFiles);
      this.listFiles = [];
    },
    handleDrop(e) {
      console.log(e);
      const item = e?.dataTransfer.files;
      this.condition(item);
    },
    handleDelete(index) {
      this.listFiles.splice(index, 1);
    },
  },

  computed: {
    disabledButton() {
      return !(this.listFiles.length > 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
#file[type="file"] {
  display: none;
}
.upload-file-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  background: #f8f8f8;
  border: 1px solid #dcdcdc;
  border-radius: 7px;
  min-height: 232px;
}
.upload-file-box .chose-file {
  text-align: center;
}
.upload-file-box .chose-file .button-upload {
  font-weight: 400;
  text-decoration: underline;
  cursor: pointer;
  font-size: 18px;
  line-height: 22px;
}
.submit-box {
  text-align: center;
  margin-top: 30px;
  button {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #dcdcdc;
    outline: none;
    border-radius: 3px;
    cursor: pointer;
  }
}

.warning-dropzone {
  border-color: #ed5d5d;
}
.error {
  position: absolute;
  top: 102%;
  left: 10px;
  color: red;
  font-size: 14px;
  margin: 10px;
}
.chose-file {
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 0;
}
</style>
