import { Injectable, Logger } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  async verifyToken(token: string) {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`,
    );
    const payload = await response.json();
    return payload;
  }
}
