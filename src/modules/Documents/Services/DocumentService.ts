import ApiService from '../../../core/Axios/ApiService';

export type Document = {
  id?: number;
  name: string;
  document: File;
  project_id: number;
};

export default class DocumentService {
  async createDocument(project_id: number, document: Document | FormData) {
    return await ApiService.post(
      //@ts-ignore
      `api/projects/${project_id}/details/documents/create`,
      document
    );
  }

  async getProjectDocuments(project_id: number): Promise<Document[]> {
    const response = await ApiService.get(`/api/documents/${project_id}`);

    return response.data;
  }

  async downloadFile(
    documentId: number
  ): Promise<{ name: string; document: string }> {
    const response = await ApiService.get(
      `/api/documents/download/${documentId}`
    );

    console.log(response);

    return response.data;
  }

  async deleteDocument(id: number) {
    try {
      ApiService.delete(`/api/documents/${id}`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
