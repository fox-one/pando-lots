import Http from "@foxone/utils/http";

export default function (http: Http) {
  return {
    getMessages(groupId: string): Promise<API.Message[]> {
      return http.get("/lots/latest_messages", {
        headers: { group_id: groupId }
      });
    },

    getGroupInfo(groupId: string): Promise<API.GroupInfo> {
      return http.get(`/groups/${groupId}/public`);
    },

    sendMessage(data: { category: API.MessageType; data: string }) {
      return http.post("/lots/messages", { data });
    },

    authFennec(groupId: string, token: string): Promise<API.User> {
      return http.post(`/groups/${groupId}/auth/fennec`, {
        data: { token }
      });
    },

    authMixin(groupId: string, code: string): Promise<API.User> {
      return http.post(`/groups/${groupId}/auth/mixin`, {
        data: { code }
      });
    },

    getProfile(): Promise<API.User> {
      return http.get("/users/me");
    },

    getSettings(): Promise<API.GroupSettings> {
      return http.get("/settings/full");
    },

    getStreamInfo(): Promise<API.LiveStream> {
      return http.get("/stream/info");
    },

    getStreams(): Promise<API.LiveStreamUrls> {
      return http.get("/stream/urls");
    },

    uploadAttachment(data: FormData): Promise<API.UploadAttachmentResp> {
      return http.post("/lots/upload_attachment", { data });
    },

    config(options) {
      http.config(options);
    }
  };
}
