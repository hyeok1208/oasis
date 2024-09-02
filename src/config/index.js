export default {
  title: 'Oasis', // 메인 타이틀
  subtitle: '노래 모음집', // 서브 타이틀
  menus: [
    // 메인 메뉴 구성 정보
    {
      title: '게시판',
      url: '/board/list',
      icon: 'fa-solid fa-paste',
    },
    {
      title: '1집',
      url: '/travel/list',
      icon: 'fa-solid fa-plane-departure',
    },
    {
      title: '2집',
      url: '/gallery/list',
      icon: 'fa-regular fa-images',
    },
    {
      title: '3집',
      url: '/oasis/list',
      icon: 'fa-solid fa-bolt',
    },
  ],
  accoutMenus: {
    // 인증 관련 메뉴 정보
    login: {
      url: '/auth/login',
      title: '로그인',
      icon: 'fa-solid fa-right-to-bracket',
    },
    join: {
      url: '/auth/join',
      title: '회원가입',
      icon: 'fa-solid fa-user-plus',
    },
  },
};
