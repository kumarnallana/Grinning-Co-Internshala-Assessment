export type MediaStatus = "awaiting_asset" | "ready";

export const MEDIA = {
  ritualVideo: {
    src: null, // "https://example.com/video.mp4" - Add the real video URL here when available
    poster: "/images/hero_bg_1787072201282.jpg",
    title: "The Redroot Nightly Ritual",
    status: "awaiting_asset" as MediaStatus
  }
};
