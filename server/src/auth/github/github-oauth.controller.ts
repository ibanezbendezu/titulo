import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { User } from '../../shared';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { GithubOauthGuard } from './github-oauth.guard';

@Controller('auth/github')
export class GithubOauthController {
	constructor(private jwtAuthService: JwtAuthService) {}

	@Get()
	@UseGuards(GithubOauthGuard)
	async githubAuth() {
	}

	@Get('callback')
	@UseGuards(GithubOauthGuard)
	async githubAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const user = req.user as User;

		console.log(
			`${this.githubAuthCallback.name}(): req.user = ${JSON.stringify(user, null, 4)}`,
		);

		const { accessToken } = this.jwtAuthService.login(user);
		res.cookie('jwt', accessToken);
		return { access_token: accessToken };

		// res.setHeader('user', JSON.stringify(user));

		// let FRONTEND_URL = process.env.FRONTEND_URL;

		// try {
		// 	res.redirect(`${FRONTEND_URL}/oauth`);
		// } catch (err) {
		// 	res.status(500).send({ success: false, message: err.message });
		// }
	}
}
