import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { registerUserValidate } from '../validations';

export class RegisterController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(request: Request, response: Response) {
    const { name, email, avatarUrl } = registerUserValidate.parse(request.body);

    const userExists = await this.userService.findByEmail(email);

    if (userExists) {
      return response.status(409).json({
        message: 'User already exists!',
        isRegisteredUser: true,
      });
    }

    const user = await this.userService.register({
      name,
      email,
      avatar_url: avatarUrl,
    });

    if (!user) {
      return response.status(400).json({
        errorCode: 'fail on register user!'
      });
    }

    return response.status(200).json(user);
  }
}