export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface ArtistResponse {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    },
  ];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}

export interface AudioBookResponse {
  authors: [
    {
      name: string;
    },
  ];
  available_markets: string[];
  copyrights: [
    {
      text: string;
      type: string;
    },
  ];
  description: string;
  html_description: string;
  edition: 'Unabridged';
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    },
  ];
  languages: string[];
  media_type: string;
  name: string;
  narrators: [
    {
      name: string;
    },
  ];
  publisher: string;
  type: 'audiobook';
  uri: string;
  total_chapters: number;
  chapters: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: [
      {
        audio_preview_url: string;
        available_markets: string[];
        chapter_number: number;
        description: string;
        html_description: string;
        duration_ms: number;
        explicit: boolean;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: [
          {
            url: string;
            height: number;
            width: number;
          },
        ];
        is_playable: boolean;
        languages: ['fr', 'en'];
        name: string;
        release_date: Date;
        release_date_precision: 'day';
        resume_point: {
          fully_played: boolean;
          resume_position_ms: number;
        };
        type: 'episode';
        uri: string;
        restrictions: {
          reason: string;
        };
      },
    ];
  };
}
