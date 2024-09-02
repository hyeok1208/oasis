<script setup>
import { useRouter } from 'vue-router'; // vue-router에서 useRouter를 가져옵니다.
import { useAuthStore } from '@/stores/auth'; // Pinia 스토어에서 인증 상태를 가져옵니다.

const store = useAuthStore(); // 인증 스토어를 사용하여 상태와 메서드를 가져옵니다.
const router = useRouter(); // 라우터 인스턴스를 생성합니다.

const logout = (e) => {
    console.log("abc")
  e.preventDefault(); // 링크의 기본 동작 방지
  store.logout(); // 인증 스토어에서 로그아웃 처리
  router.push('/'); // 홈 페이지로 리다이렉트합니다.
 
};
</script>

<template>
  <a href="#" class="nav-link" @click="logout"> <!-- 클릭 시 logout 함수 호출 -->
    <i class="fa-solid fa-right-from-bracket"></i> <!-- 아이콘 표시 -->
    로그아웃zzzz
  </a>
</template>
