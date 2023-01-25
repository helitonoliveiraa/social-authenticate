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
      // const { id_token } = await getGoogleOAuthTokens({ code });
// 
      // console.log({ id_token });

      const ticket = await this.googleService.verifyIdToken({ idToken: token });
      // const user = await getGoogleUser({ access_token, id_token });
      console.log('Get from database!');

      const payload = ticket.getPayload();

      if (!payload?.email) {
        throw new Error('Error getting user payload.');
      }

      let user = await this.userService.findByEmail(payload.email);

      if (!user) {
        user = await this.userService.create({
          avatar_url: payload.picture || '',
          email: payload.email,
          name: payload.name || '',
        });
      }

      // const token = jwt.sign(
      //   {
      //     user: {
      //       name: user.name,
      //       avatar_url: user.avatar_url,
      //       id: user.id,
      //     }
      //   },
      //   process.env.JWT_SECRET,
      //   {
      //     subject: user.id,
      //     expiresIn: '1d'
      //   }
      // );

      // await setIntoRedis(`user-${user.id}`, JSON.stringify(user))

      return { user, payload };
    } catch (err) {
      console.log(err);
    }
  }
}