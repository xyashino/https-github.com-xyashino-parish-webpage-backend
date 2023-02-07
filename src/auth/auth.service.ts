import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { compare } from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './Jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  private createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = +this.configService.get<string>('JWT_EXPIRES_SECONDS');
    const accessToken = sign(
      payload,
      this.configService.get<string>('JWT_SECRET_KEY'),
      { expiresIn },
    );
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: UserEntity): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await UserEntity.findOneBy({ currentTokenId: token });
    } while (!!userWithThisToken);

    user.currentTokenId = token;
    await user.save();
    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await UserEntity.findOneBy({
        email: req.email,
      });

      const matchPwd: boolean = user
        ? await compare(req.password, user.hashedPassword)
        : false;

      if (!user || !matchPwd) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure:
            this.configService.get<string>('JWT_PROTOCOL_SECURE') === 'true',
          domain: this.configService.get<string>('DOMAIN'),
          httpOnly: this.configService.get<string>('JWT_HTTP_ONLY') === 'true',
          maxAge: +this.configService.get('JWT_EXPIRES_SECONDS'),
        })
        .json({ logged: true, status: 200 });
    } catch (e) {
      return res.json({ error: e.message, status: e.status });
    }
  }

  async logout(user: UserEntity, res: Response): Promise<any> {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure:
          this.configService.get<string>('JWT_PROTOCOL_SECURE') === 'true',
        domain: this.configService.get<string>('DOMAIN'),
        httpOnly: this.configService.get<string>('JWT_HTTP_ONLY') === 'true',
        maxAge: +this.configService.get('JWT_EXPIRES_SECONDS'),
      });
      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
