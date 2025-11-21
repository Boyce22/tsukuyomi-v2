import type { Request, Response } from "express";

import { IAuthService } from "@types";
import { MissingFieldsError } from "@exceptions";

export class AuthController {
  private readonly authService: IAuthService;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  async authenticate(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new MissingFieldsError("Email and password are required");
    }

    const token = await this.authService.authenticate(email, password);

    res.json(token);
  }
}
