import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

// 초기 상태를 정의합니다.
const initState = {
  token: '', // JWT 토큰을 저장할 변수입니다.
  user: {
    username: '', // 사용자의 ID를 저장할 변수입니다.
    email: '', // 사용자의 이메일을 저장할 변수입니다.
    roles: [], // 사용자의 권한 목록을 저장할 변수입니다.
  },
};

// Pinia 스토어를 정의합니다.
export const useAuthStore = defineStore('auth', () => {
  // 반응형 상태를 정의합니다. 초기 상태는 initState를 복사합니다.
  const state = ref({ ...initState });

  // 사용자 ID가 존재하면 로그인된 것으로 간주합니다.
  const isLogin = computed(() => !!state.value.user.username);

  // 현재 로그인한 사용자의 ID를 계산하는 computed 속성입니다.
  const username = computed(() => state.value.user.username);

  // 현재 로그인한 사용자의 이메일을 계산하는 computed 속성입니다.
  const email = computed(() => state.value.user.email);

  // 사용자를 로그인시키는 함수입니다.
  const login = async (member) => {
    try {
      // 서버에 로그인 요청을 보냅니다.
      const { data } = await axios.post('/api/auth/login', member);
      // 응답 데이터로 상태를 업데이트합니다.
      state.value = { ...data };
      // 상태를 localStorage에 저장합니다.
      localStorage.setItem('auth', JSON.stringify(state.value));
    } catch (error) {
      console.error('로그인 오류:', error);
      throw error; // 호출한 컴포넌트에서 에러를 처리할 수 있도록 예외를 던집니다.
    }
  };

  // 사용자를 로그아웃시키는 함수입니다.
  const logout = () => {
    localStorage.removeItem('auth'); // localStorage에서 'auth' 항목만 삭제합니다.
    state.value = { ...initState }; // 상태를 초기 상태로 재설정합니다.
  };

  // 현재 저장된 토큰을 반환하는 함수입니다.
  const getToken = () => state.value.token;

  // 페이지 로드 시 저장된 인증 정보를 상태로 복원하는 함수입니다.
  const load = () => {
    // localStorage에서 'auth' 항목을 가져옵니다.
    const auth = localStorage.getItem('auth');
    if (auth != null) {
      // 가져온 데이터를 상태로 설정합니다.
      state.value = JSON.parse(auth);
      console.log(state.value); // 디버깅을 위해 상태를 콘솔에 출력합니다.
    }
  };

  // 컴포넌트 로드 시 상태를 로드합니다.
  load();

  // 컴포넌트에서 사용할 수 있도록 상태와 메서드를 반환합니다.
  return { state, username, email, isLogin, login, logout, getToken };
});
