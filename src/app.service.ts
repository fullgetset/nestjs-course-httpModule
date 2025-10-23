import { Injectable } from '@nestjs/common';
import { SpotifyService } from './spotify/spotify.service';

@Injectable()
export class AppService {
  constructor(private readonly spotifyService: SpotifyService) {}

  async getArtist(id: string) {
    const artist = await this.spotifyService.getArtist(id);

    return artist;
  }

  async getAudioBook(id: string) {
    const audioBook = await this.spotifyService.getAudioBook(id);

    return audioBook;
  }
}
