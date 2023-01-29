import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';

import { UserService } from '../services/UserService';
import { getGoogleOAuthTokens } from "../utils/getGoogleOAuthTokens";
import { setIntoRedis } from "../utils/redis.config";


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

      let user = await this.userService.findByEmail(payload.email);

      if (!user) {
        return 'User already registered!'
      }

      user = await this.userService.register({
        avatar_url: payload.picture || '',
        email: payload.email,
        name: payload.name || '',
      });

      return { user };
    } catch (err) {
      console.log(err);
    }
  }
}