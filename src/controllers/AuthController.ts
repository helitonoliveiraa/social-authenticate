import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  async handle(request: Request, response: Response) {
    const { code } = request.body;

    const service = new AuthService();

    const result = await service.execute(code);

    return response.json(result);
  }
}