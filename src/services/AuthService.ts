import { OAuth2Client } from 'google-auth-library';

import { UserService } from '../services/UserService';

export class AuthService {
  private googleService: OAuth2Client;
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.googleService = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
  }

  async execute(token: string) {
    try {
      const ticket = await this.googleService.verifyIdToken({ idToken: token });

      const payload = ticket.getPayload();
      if (!payload?.email) {
        throw new Error('Error getting user payload.');
      }

      const exists = await this.userService.findByEmail(payload.email);
      if (exists) {
        throw new Error('User already exists!');
      }

      const user = await this.userService.register({
        avatar_url: payload.picture || '',
        email: payload.email,
        name: payload.name || '',
      });
      if (!user) {
        throw new Error('User created failed.');
      }

      return { user };
    } catch (err) {
      console.log(err);
    }
  }
}