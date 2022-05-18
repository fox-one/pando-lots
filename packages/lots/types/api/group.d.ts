declare namespace API {
  export type GroupMode = "free" | "lecture" | "mute" | "stream";

  export interface User {
    active_at: string;
    avatar_url: string;
    bio: string;
    blocked: number;
    created_at: string;
    divided_at: string;
    expired_at: string;
    full_name: string;
    group_id: string;
    identity_number: number;
    joined_at: string;
    phone_code: string;
    phone_number: string;
    role: Role;
    state: UserState;
    subscribed_at: string;
    token: string;
    uiam_id: number;
    user_id: string;
    version: number;
    policies: Array<any>;
  }

  export interface GroupInfo {
    identity_number: string;
    client_id: string;
    name: string;
    announcement: string;
    members_count: {
      paid: number;
      unverified: number;
      pending: number;
      total: number;
    };
    mode: string;
    chat_rate_limit: number;
    pay_to_join: boolean;
    invite_to_join: boolean;
    invite_code_required: boolean;
    renew_enabled: boolean;
    lots_history_messages_count: number;
    payments: {
      type: string;
      payment_url: string;
      asset: {
        asset_id: string;
        chain_id: string;
        updated_at: string;
        symbol: string;
        name: string;
        icon_url: string;
        price_btc: string;
        price_usd: string;
        price_cny: string;
        balance: string;
      };
      price: string;
      price_estimated: string;
      estimated_currency: string;
    }[];
    features: string[];
    product_id: number;
    product: {
      id: number;
      icon: string;
      name: string;
      type: string;
      desc: string;
      quantity: number;
      status: string;
      unit: string;
      price: {
        asset_id: string;
        amount: string;
        original_amount: string;
        channels: {
          channel: string;
          asset_id: string;
        }[];
      };
      group_id: string;
      external_id: string;
      series: string;
      service_fee: number;
      created_at: string;
      updated_at: string;
      extra_info: null | Record<string, any>;
    };
    wechat_app_id: string;
    group_bio: string;
    app_info: {
      name: string;
      download_url_ios: string;
      download_url_android: string;
    };
    mixin_oauth_scope: string;
    terms_of_use_url: string;
    privacy_policies_url: string;
    group_agreement_enabled: boolean;
    group_agreement_modal: boolean;
    group_agreement_url: string;
    talkee: {
      client_id: string;
      site_id: number;
    };
    custom_theme: string;
    active_users: User[];
  }

  export interface GroupSettings {
    account_entry_disabled: boolean;
    appearance_home_shortcut_groups: ShortCutsGroup[];
    "audio-message-enabled": boolean;
    auto_schedule_class_enabled: boolean;
    badge_one_year_enabled: boolean;
    "broadcast-chat-disabled": boolean;
    "chat-rate-limit": number;
    "contact-message-enabled": boolean;
    "coupon-enabled": boolean;
    coupon_entry_disabled: boolean;
    "course-enabled": boolean;
    course_comment_reply_permission: boolean;
    custom_enabled: boolean;
    custom_theme: string;
    custom_page_url: string;
    "data-message-enabled": boolean;
    deny_words: string[];
    deny_words_enabled: boolean;
    discussion_enabled: boolean;
    discussion_post_permission: "all" | "ops";
    discussion_reply_permission: "all" | "ops";
    "group-mode": GroupMode;
    group_agreement_enabled: boolean;
    group_agreement_modal: boolean;
    group_badges: string[];
    group_bio: string;
    group_entry_disabled: boolean;
    group_entry_kyc_enabled: boolean;
    group_entry_quiz_id: number;
    group_name: string;
    home_enabled: boolean;
    "guide-message-url": string;
    "image-message-enabled": boolean;
    "invitation-enabled": boolean;
    invitation_entry_disabled: boolean;
    invitation_poster_url: string;
    "invoice-enabled": boolean;
    kyc_entry_disabled: boolean;
    lecturing_or_streaming_started_at: string;
    "link-message-enabled": boolean;
    link_message_prefix_lists: { allow: string[] };
    "luckycoin-enabled": boolean;
    "luckycoin-max-count": number;
    "luckycoin-min-value": string;
    luckycoin_all_assets: boolean;
    max_renewal_period: number;
    notification_user_joined: boolean;
    notification_user_renewed: boolean;
    pay_standard_assets: string[];
    pay_accept_channels: API.Channel[];
    permanent_invitation_code_enable: boolean;
    profile_enabled: boolean;
    provide_public_random_invitation_codes: boolean;
    public_stream_enabled: boolean;
    reward_entry_disabled: boolean;
    "sticker-message-enabled": boolean;
    "stream-enabled": boolean;
    stream_screen_orientation: "portrait" | "landscape";
    system_active_threshold_days: number;
    system_block_duration: string;
    system_default_language: string;
    system_invite_to_join: boolean;
    system_invite_code_required: boolean;
    system_pay_to_join: boolean;
    system_renew_duration: string;
    system_renew_enable: boolean;
    "tip-enabled": boolean;
    "tip-min-value": string;
    tip_all_assets: boolean;
    "video-message-enabled": boolean;
    "welcome-message-url": string;
    lots_history_messages_count: number;
  }
}
