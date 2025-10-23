import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  ArtistResponse,
  AudioBookResponse,
  AuthResponse,
} from './types/spotify.types';
import * as https from 'https';
import { Agent } from 'http';

@Injectable()
export class SpotifyService {
  private accessToken: string | null;
  private tokenExpiry: number = 0;

  private readonly SPOTIFY_CLIENT_ID: string;
  private readonly SPOTIFY_CLIENT_SECRET: string;

  private readonly agent: Agent;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.SPOTIFY_CLIENT_ID = this.configService.getOrThrow('SPOTIFY_CLIENT_ID');
    this.SPOTIFY_CLIENT_SECRET = this.configService.getOrThrow(
      'SPOTIFY_CLIENT_SECRET',
    );
    this.agent = new https.Agent({
      rejectUnauthorized: false,
    });
  }

  public async getArtist(id: string): Promise<ArtistResponse> {
    await this.authenticate();

    const response = await firstValueFrom(
      this.httpService.get<ArtistResponse>(
        `https://api.spotify.com/v1/artists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          httpsAgent: this.agent,
        },
      ),
    );

    return response.data;
  }

  public async getAudioBook(id: string): Promise<AudioBookResponse> {
    await this.authenticate();

    const response = await firstValueFrom(
      this.httpService.get<AudioBookResponse>(
        `https://api.spotify.com/v1/audiobooks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
          httpsAgent: this.agent,
        },
      ),
    );

    return response.data;
  }

  private async authenticate(): Promise<void> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return;
    }

    const creds = Buffer.from(
      `${this.SPOTIFY_CLIENT_ID}:${this.SPOTIFY_CLIENT_SECRET}`,
    ).toString('base64');

    const response = await firstValueFrom(
      this.httpService.post<AuthResponse>(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${creds}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          httpsAgent: this.agent,
        },
      ),
    );

    this.accessToken = response.data.access_token;
    this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
  }
}
