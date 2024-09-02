import api from "axios";
const BASE_URL = "/api/member";  // 
const headers = { "Content-Type": "multipart/form-data" };
export default {
  // username 중복 체크, true: 중복(사용불가), false: 사용 가능
  async checkUsername(username) {
    const { data } = await api.get(`${BASE_URL}/checkusername/${username}`);
    console.log("AUTH GET CHECKUSERNAME", data);
    return data;
  },
  async create(member) {
    // 아바타 파일 업로드 – multipart 인코딩 필요 → FormData 객체 사용
    const formData = new FormData();
    formData.append("username", member.username);
    formData.append("email", member.email);
    formData.append("password", member.password);
    if (member.avatar) {
      formData.append("avatar", member.avatar);
    }
    const { data } = await api.post(BASE_URL, formData, headers);
    console.log("AUTH POST: ", data);
    return data;
  },
};
// axios를 사용하여 백엔드 api와 통신하고 회원가입 프로세스에서 발생하는 주요 작업들 처리
// 저 api객체를 통해  GET, POST, PUT, DELETE 등의 메서드를 통해 서버와 통신
