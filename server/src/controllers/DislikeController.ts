import Dev from '../models/Dev';
import { Request, Response } from 'express';

export default {
  async store(req: Request, res: Response) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev || !loggedDev ) return res.status(400).json({error: 'Dev not exists'});

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};
