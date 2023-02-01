import { Request, Response } from "express";

import { AuthService } from '../services/AuthService';
import { UserService } from "../services/UserService";
import { registerUserValidate } from '../validations';

export class SessionController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  async create(request: Request, response: Response) {
    const { authorization } = request.headers;
    const { email } = registerUserValidate.parse(request.body);
    
    let user = await this.userService.findByEmail(email);
    
    if (!user && authorization) {
      const [, token] = authorization?.split(' ');
      const result = await this.authService.execute(token);

      if (!result) {
        return response.status(400).json({
          error: 'User register failed!'
        });
      }

      user = result.user;
    }

    return response.status(200).json(user);
  }
}