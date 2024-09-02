import axios from 'axios';
import { useAuthStore } from '@/stores/auth'; // Pinia 스토어에서 인증 관련 메서드를 가져옵니다.
import { useRouter } from 'vue-router'; // Vue Router를 사용하여 페이지 이동

// Axios 인스턴스 생성
const instance = axios.create({
  timeout: 1000, // 요청 타임아웃 설정 (밀리초 단위)
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    // Pinia 스토어에서 인증 토큰을 가져옵니다.
    const authStore = useAuthStore();
    const token = authStore.getToken();

    // 토큰이 있는 경우, 요청 헤더에 Authorization 필드를 추가합니다.
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 요청 중 에러가 발생한 경우
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => {
    // 서버에서 정상 응답을 받은 경우 (200, 204 등)
    // 상태 코드 404에 대해 커스텀 처리를 합니다.
    if (response.status === 404) {
      return Promise.reject('404: 페이지 없음 ' + response.request);
    }
    return response;
  },
  async (error) => {
    // 응답 중 에러가 발생한 경우 (401, 403, 500 등)
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      const router = useRouter();

      // 인증 에러가 발생하면 로그아웃 처리 및 로그인 페이지로 리다이렉트합니다.
      authStore.logout();
      router.push('/auth/login?error=login_required');
      
      return Promise.reject({ error: '로그인이 필요한 서비스입니다.' });
    }
    return Promise.reject(error);
  }
);

export default instance; // 인터셉터가 적용된 axios 인스턴스
