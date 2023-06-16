import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(userId: any): Promise<string> {
    return this.jwtService.sign({ sub: userId });
  }

  async generateRefreshToken(userId: any): Promise<string> {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '7d' });
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      return null;
    }
  }
}
