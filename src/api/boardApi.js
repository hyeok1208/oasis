import api from "@/api";

const BASE_URL = "/api/board";

// 헤더를 정의
const headers = { "Content-Type": "multipart/form-data" };

export default {
  // 게시글 목록을 가져오는 메서드
  async getList(params) {
    try {
      const { data } = await api.get(BASE_URL, { params });
      console.log("BOARD GET LIST: ", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch list:", error);
      throw error;
    }
  },

  // 게시글을 작성하는 메서드
  async create(article) {
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("writer", article.writer);
    formData.append("content", article.content);

    if (article.files) {
      for (let i = 0; i < article.files.length; i++) {
        formData.append("files", article.files[i]);
      }
    }

    try {
      const { data } = await api.post(BASE_URL, formData, { headers });
      console.log("BOARD POST: ", data);
      return data;
    } catch (error) {
      console.error("Failed to create article:", error);
      throw error;
    }
  },

  // 게시글 상세를 가져오는 메서드
  async get(no) {
    try {
      const { data } = await api.get(`${BASE_URL}/${no}`);
      console.log("BOARD GET", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch article:", error);
      throw error;
    }
  },

  // 게시글 삭제
  async delete(no) {
    try {
      const { data } = await api.delete(`${BASE_URL}/${no}`);
      console.log("BOARD DELETE: ", data);
      return data;
    } catch (error) {
      console.error("Failed to delete article:", error);
      throw error;
    }
  },

  // 게시글 수정
  async update(article) {
    const formData = new FormData();
    formData.append("no", article.no);
    formData.append("title", article.title);
    formData.append("writer", article.writer);
    formData.append("content", article.content);

    if (article.files) {
      // 첨부파일이 있는 경우
      for (let i = 0; i < article.files.length; i++) {
        formData.append("files", article.files[i]);
      }
    }

    try {
      const { data } = await api.put(`${BASE_URL}/${article.no}`, formData, {
        headers,
      });
      console.log("BOARD PUT: ", data);
      return data;
    } catch (error) {
      console.error("Failed to update article:", error);
      throw error;
    }
  },

  // 첨부파일 삭제
  async deleteAttachment(no) {
    try {
      const { data } = await api.delete(`${BASE_URL}/deleteAttachment/${no}`);
      console.log("ATTACHMENT DELETE: ", data);
      return data;
    } catch (error) {
      console.error("Failed to delete attachment:", error);
      throw error;
    }
  },
};
