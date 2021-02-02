import Dev from '../models/Dev';
import { Request, Response } from 'express';

export default {
  async store(req: Request, res: Response) {
    const { devId } = req.params;
    const user = req.headers.user as string;

    if (!user || !devId) return res.status(404).send();

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev || !loggedDev) return res.status(400).json({error: 'Dev not exists'});

    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    if (targetDev.likes.includes(loggedDev._id)) {
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[devId];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', targetDev);
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    return res.json(loggedDev);
  }
};
