export interface StreamResponseInterface {
    id: string
    title: string
    description: string
    uploadDate: string
    uploader: string
    uploaderUrl: string
    uploaderAvatar: string
    thumbnailUrl: string
    hls: string
    dash: any
    lbryId: any
    uploaderVerified: boolean
    duration: number
    views: number
    likes: number
    dislikes: number
    uploaderSubscriberCount: number
    audioStreams: AudioStream[]
    videoStreams: VideoStream[]
    relatedStreams: RelatedStream[]
    subtitles: any[]
    livestream: boolean
    proxyUrl: string
    chapters: any[]
    previewFrames: PreviewFrame[]
  }
  
  export interface AudioStream {
    url: string
    format: string
    quality: string
    mimeType: string
    codec: string
    audioTrackId: any
    audioTrackName: any
    videoOnly: boolean
    bitrate: number
    initStart: number
    initEnd: number
    indexStart: number
    indexEnd: number
    width: number
    height: number
    fps: number
  }
  
  export interface VideoStream {
    url: string
    format: string
    quality: string
    mimeType: string
    codec?: string
    audioTrackId: any
    audioTrackName: any
    videoOnly: boolean
    bitrate: number
    initStart: number
    initEnd: number
    indexStart: number
    indexEnd: number
    width: number
    height: number
    fps: number
  }
  
  export interface RelatedStream {
    url: string
    type: string
    title?: string
    thumbnail: string
    uploaderName: string
    uploaderUrl?: string
    uploaderAvatar?: string
    uploadedDate?: string
    shortDescription: any
    duration?: number
    views?: number
    uploaded?: number
    uploaderVerified: boolean
    isShort?: boolean
    name?: string
    playlistType?: string
    videos?: number
  }
  
  export interface PreviewFrame {
    urls: string[]
    frameWidth: number
    frameHeight: number
    totalCount: number
    durationPerFrame: number
    framesPerPageX: number
    framesPerPageY: number
  }
  