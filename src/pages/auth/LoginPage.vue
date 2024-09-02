<script setup>
import { computed, reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth"; // Pinia 스토어에서 인증 상태를 가져옵니다.
import { useRouter } from "vue-router"; // Vue Router에서 라우터를 가져옵니다.

const router = useRouter(); // 라우터 인스턴스를 생성합니다.
const auth = useAuthStore(); // 인증 스토어를 사용하여 상태와 메서드를 가져옵니다.

const member = reactive({
  username: "", // 사용자 ID
  password: "", // 비밀번호
});

const error = ref(""); // 로그인 오류 메시지를 저장할 변수입니다.
const disableSubmit = computed(() => !(member.username && member.password)); // 사용자 ID와 비밀번호가 모두 입력되어야 제출 가능

const login = async () => {
  console.log(member); // 콘솔에 입력된 사용자 정보를 출력합니다.
  try {
    await auth.login(member); // 인증 스토어의 로그인 메서드를 호출하여 로그인 처리합니다.
    router.push("/"); // 로그인 성공 시 홈 페이지로 리다이렉트합니다.
  } catch (e) {
    // 로그인 중 오류 발생 시
    console.log("에러=======", e); // 콘솔에 오류 메시지를 출력합니다.
    // 에러 응답이 있는 경우 error 변수에 설정합니다.
    error.value = e.response?.data?.message || "로그인에 실패했습니다.";
  }
};
</script>

<template>
  <div class="mt-5 mx-auto" style="width: 500px">
    <h1 class="my-5">
      <i class="fa-solid fa-right-to-bracket"></i>
      로그인
    </h1>
    <form @submit.prevent="login">
      <!-- 폼 제출 시 login 함수 호출 -->
      <div class="mb-3 mt-3">
        <label for="username" class="form-label">
          <i class="fa-solid fa-user"></i>
          사용자 ID:
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="사용자 ID"
          v-model="member.username"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">
          <i class="fa-solid fa-lock"></i>
          비밀번호:
        </label>
        <input
          type="password"
          class="form-control"
          placeholder="비밀번호"
          v-model="member.password"
        />
      </div>
      <div v-if="error" class="text-danger">{{ error }}</div>
      <!-- 오류 메시지 표시 -->
      <button
        type="submit"
        class="btn btn-primary mt-4"
        :disabled="disableSubmit"
      >
        <i class="fa-solid fa-right-to-bracket"></i>
        로그인 
      </button>
    </form>
  </div>
</template>
