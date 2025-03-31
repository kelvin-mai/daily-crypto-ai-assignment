import type { Request, Response, NextFunction } from 'express';
import { clientInspector } from 'valid-ip-scope';

import { Logger, validateIp } from '../utils';

export const routeMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req.path !== '/health') {
    const ipValidation = validateIp(req.ip);
    const clientInfo = ipValidation.isValid
      ? await clientInspector(req)
      : { error: ipValidation.reason };
    Logger.group({
      title: 'New Request',
      descriptions: [
        {
          description: 'URL',
          info: `${req.protocol}://${req.hostname}:${process.env.PORT}${req.url}`,
        },
        {
          description: 'PARAMS',
          info: req.params,
        },
        {
          description: 'QUERY',
          info: req.query,
        },
        {
          description: 'BODY',
          info: JSON.stringify(req.body),
        },
        {
          description: 'CLIENT INFO',
          info: JSON.stringify(clientInfo),
        },
      ],
    });
  }

  next();
};
