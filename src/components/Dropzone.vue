<template>
  <div>
    <div class="wrapper">
      <form action="">
        <label for="image_upload">
          <img src="@/assets/upload3.png" class="icons" />
        </label>
        <input
          type="file"
          name="image_upload"
          id="image_upload"
          @change="uploadImage"
          accept="image/*"
        />
        <h4>Hãy kéo và thả ảnh vào đây hoặc</h4>
        <p @change="uploadImage">nhấn vào đây</p>
      </form>
    </div>

    <div class="selected-file" v-if="selectedFile">
      <!-- <img src="@/assets/files/file.svg" alt="file_icon" /> -->
      <div class="selected-file-info">
        <div class="selected-file-title">{{ selectedFile.name }}</div>
        <div class="selected-file-size">{{ formatBytes }}</div>
      </div>
      <img
        src=""
        alt="close_icon"
        @click="removeFile"
        class="selected-file-remove"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DropzoneComp",
  data: function () {
    return {
      imageShow: "",
      showValidate: "",
      validateSize: "",
      selectedFile: null,
    };
  },
  methods: {
    async uploadImage() {
      const fileUpload = document.querySelector("#image_upload");
      const file = fileUpload.files[0];
      const fileSize = file.size;
      console.log(file);
      console.log(fileSize);
      const CLOUDINARY_API =
        "https://api.cloudinary.com/v1_1/asm-ph13269/image/upload";
      const CLOUDINARY_PRESET = "m1lkf3uy";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      //validate image
      const allowedExtensions =
        /(\.jpg|\.jpeg|\.png|\.gif|\.pdf|.\.doc|.\.docx)$/i;
      if (allowedExtensions.exec(file)) {
        file.value = "";
        this.showValidate =
          "Chỉ được chọn file có đuôi .jpg , .jpeg, .gif, .png";
      } else if (fileSize > 100000) {
        file.value = "";
        this.validateSize = "File không vượt quá 10KB";
      } else
        axios
          .post(CLOUDINARY_API, formData, {
            headers: {
              "Content-Type": "application/form-data",
            },
          })
          .then((res) => {
            console.log(res);
            this.imageShow = res.data.url;
          });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid #dcdcdc;
  width: 450px;
  height: 130px;
  text-align: center;
  margin-top: 20px;
  display: grid;
  align-content: center;
  line-height: 0;

  border-radius: 5px;
  margin: 0 auto;

  p {
    font-size: 15px;
    text-decoration: underline;
  }
  label {
    cursor: pointer;
  }

  #image_upload {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
  .icons {
    height: 25px;
  }
}
.show_res {
  margin: 20px 0px;
  small {
    color: red;
  }
}
</style>
