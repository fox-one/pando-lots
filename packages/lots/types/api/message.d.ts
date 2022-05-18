declare namespace API {
  export type MessageType =
    | "PLAIN_TEXT"
    | "PLAIN_IMAGE"
    | "PLAIN_VIDEO"
    | "PLAIN_DATA"
    | "PLAIN_AUDIO"
    | "PLAIN_STICKER";

  export interface Attachment {
    id: string;
    size: number;
    mime_type: string;
    view_url: string;
    thumb_url: string;
  }

  export interface Message {
    id: string;
    speaker_name: string;
    speaker_avatar: string;
    speaker_id: string;
    category: MessageType;
    data: string;
    text: string;
    attachment: Attachment;
    created_at: string;
  }

  export interface LiveStream {
    converts: string[];
    disabled: boolean;
    key: string;
    is_open: boolean;
    is_charge: boolean;
    is_paid?: boolean;
    product_id?: number;
    orientation: "portrait" | "landscape";
    live_viewer_count: string | "-";
    product: API.Product | null;
    state: "RUNNING" | "STARTING" | "STOPPING" | "IDLE";
    course_id: number;
  }

  export interface LiveStreamUrls {
    flv: string;
    "flv@480p": string;
    "flv@720p": string;
    hls: string;
    "hls@480p": string;
    "hls@720p": string;
    rtmp: string;
    "rtmp@480p": string;
    "rtmp@720p": string;
  }

  export interface UploadAttachmentResp {
    attachment_id: string;
    view_url: string;
  }
}
