<template>
  <div>
    <h1><i class="fa-regular fa-pen-to-square"></i> 글 수정</h1>
    <form @submit.prevent="submit">
      <div class="mb-3 mt-3">
        <label for="title" class="form-label">제목</label>
        <input
          type="text"
          class="form-control"
          placeholder="제목"
          id="title"
          v-model="article.title"
        />
        <div class="invalid-feedback">제목은 필수 요소입니다.</div>
      </div>
      <div class="mb-3 mt-3">
        <label class="form-label">기존 첨부파일</label>
        <div v-for="file in attachments" :key="file.no" class="attach">
          <i class="fa-solid fa-paperclip"></i> {{ file.filename }}
          <i
            class="fa-solid fa-trash-can text-danger ms-2"
            @click="removeFile(file.no, file.filename)"
          ></i>
        </div>
      </div>
      <div class="mb-3 mt-3">
        <label for="files" class="form-label">첨부파일</label>
        <input
          type="file"
          class="form-control"
          placeholder="첨부파일"
          id="files"
          ref="files"
          multiple
        />
      </div>
      <div class="mb-3 mt-3">
        <label for="content" class="form-label">내용</label>
        <textarea
          class="form-control"
          placeholder="내용"
          id="content"
          v-model="article.content"
          rows="10"
        ></textarea>
      </div>
      <div class="my-5 text-center">
        <button type="submit" class="btn btn-primary me-3">
          <i class="fa-solid fa-check"></i> 확인
        </button>
        <button type="button" class="btn btn-primary me-3" @click="reset">
          <i class="fa-solid fa-undo"></i> 취소
        </button>
        <button type="button" class="btn btn-primary" @click="router.back">
          <i class="fa-solid fa-arrow-left"></i> 돌아가기
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import boardApi from "@/api/boardApi";

const route = useRoute();
const router = useRouter();
const no = route.params.no;

const article = ref({
  no: "",
  title: "",
  writer: "",
  content: "",
  files: [],
});
const orgArticle = ref({});
const attachments = ref([]);
const files = ref(null);

// 파일 삭제 함수
const removeFile = async (fileNo, filename) => {
  if (!confirm(`${filename}을 삭제할까요?`)) return;

  try {
    await boardApi.deleteAttachment(fileNo);
    const ix = attachments.value.findIndex((f) => f.no === fileNo);
    if (ix !== -1) {
      attachments.value.splice(ix, 1);
    }
  } catch (error) {
    console.error("Failed to delete file:", error);
  }
};

// 제출 함수
const submit = async () => {
  if (!confirm("수정할까요?")) return;

  if (files.value && files.value.files.length > 0) {
    article.value.files = files.value.files;
  }

  try {
    await boardApi.update(article.value);
    router.push({ name: "board/detail", params: { no }, query: route.query });
  } catch (error) {
    console.error("Failed to update article:", error);
  }
};

// 리셋 함수
const reset = () => {
  article.value = { ...orgArticle.value };
};

// 데이터 로드 함수
const load = async () => {
  try {
    const data = await boardApi.get(no);
    orgArticle.value = { ...data };
    attachments.value = data.attaches;
    reset();
  } catch (error) {
    console.error("Failed to load article:", error);
  }
};

// 초기 데이터 로드
load();
</script>

<style scoped>
.fa-trash-can {
  cursor: pointer;
}
</style>
