import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { Role } from '@types';
import { logger } from '@utils';
import { UserRepository } from '@repositories';

interface JWT {
  sub: string;
  typ?: string;
  iat: number;
}

const ERROR_MSG = {
  AUTHENTICATION: 'Authentication required',
  FORBIDDEN: 'Forbidden: You do not have the required permissions',
} as const;

export const accessControl = (roles: Role[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    const userRepository = new UserRepository();

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWT;
      const user = await userRepository.findByIdWithRoles(decoded.sub);

      if (!user || (user.lastPasswordChange && decoded.iat * 1000 < user.lastPasswordChange.getTime())) {
        logger.error(ERROR_MSG.AUTHENTICATION);
        return res.status(401).json({ message: ERROR_MSG.AUTHENTICATION });
      }

      const userRoles = user.userRoles.map((ur) => ur.role.name);

      if (roles.length && !roles.some((role) => userRoles.includes(role))) {
        logger.error(ERROR_MSG.FORBIDDEN);
        return res.status(403).json({ message: ERROR_MSG.FORBIDDEN });
      }

      req.userId = user.id;
      req.roles = userRoles;

      next();
    } catch {
      logger.error(ERROR_MSG.AUTHENTICATION);
      return res.status(401).json({ message: ERROR_MSG.AUTHENTICATION });
    }
  };
};
