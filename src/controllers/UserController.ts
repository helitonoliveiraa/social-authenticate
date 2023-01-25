import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { updateUserValidate } from '../validations';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async get(request: Request, response: Response) {
    const users = await this.userService.getAll();

    return response.json(users);
  };

  async getId(request: Request, response: Response) {
    const { id } = request.params;

    const user = await this.userService.findById(id);

    if (!user) {
      throw new Error('User not found!');
    }

    return response.json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, avatarUrl, admin } = updateUserValidate.parse(request.body);

    console.log({ name, avatarUrl, admin });

    const user = await this.userService.update({
      id, 
      name, 
      avatar_url: avatarUrl,
      admin,
    });

    if (!user) {
      throw new Error('User not found!');
    }

    return response.json(user);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const { userId } = request;
  
    try {
      const loggedUser = await this.userService.findById(userId);

      if (loggedUser && !loggedUser.admin) {
        return response.status(401).json({
          message: "You don't have enough permission!"
        });
      }

      await this.userService.delete(id);

      return response.send();
    } catch (err) {
      return response.status(400).json({
        errorCode: 'Some thing was wrong and was not possible delete this user, try later'
      });
    }
  }
}