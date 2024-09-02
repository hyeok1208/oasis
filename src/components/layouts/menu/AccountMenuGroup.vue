<script setup>
import { computed } from "vue";
import MenuItem from "./MenuItem.vue";
import AccountMenuItem from "./AccountMenuItem.vue";
import LogoutMenuItem from "./LogoutMenuItem.vue";
import config from "@/config";
import { useAuthStore } from "@/stores/auth.js"; // Pinia 스토어를 가져옵니다.

// config에서 로그인과 회원가입 메뉴 항목을 가져옵니다.
const { login, join } = config.accoutMenus;

// Pinia 인증 스토어를 사용하여 인증 상태와 사용자 정보를 가져옵니다.
const auth = useAuthStore();

// 인증 상태와 사용자 이름을 계산합니다.
const islogin = computed(() => auth.isLogin);
const username = computed(() => auth.username);
</script>

<template>
  <ul class="navbar-nav ms-auto">
    <!-- 사용자가 로그인한 경우에 표시될 메뉴 항목들 -->
    <template v-if="islogin">
      <AccountMenuItem :username="username" />
      <LogoutMenuItem />
    </template>
    <!-- 사용자가 로그인하지 않은 경우에 표시될 메뉴 항목들 -->
    <template v-else>
      <MenuItem :menu="login" />
      <MenuItem :menu="join" />
    </template>
  </ul>
</template>
