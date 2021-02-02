import axios from 'axios';
import { Request, Response } from 'express';

import Dev from '../models/Dev';

interface ResponseGithub {
  name: string;
  bio: string;
  avatar_url: string;
}

export default {

  async index(req: Request, res: Response) {
      const { user } = req.headers;

      if (!user) return res.status(404).send();

      const loggedDev = await Dev.findById(user);
      
      if (!loggedDev) return res.status(404).send();

      const users = await Dev.find({ 
        $and: [
          {_id: { $ne: user }},
          {_id: { $nin: loggedDev.likes }},
          {_id: { $nin: loggedDev.dislikes }}
        ]
      });

      return res.json(users);
  },

  async store(req: Request, res: Response) {
      const { username } = req.body;
      
      if (!username) return res.status(404).send();
      
      const usersExists = await Dev.findOne({ user: username });
      
      if (usersExists) return res.json(usersExists);
      
      const response = await axios.get(`https://api.github.com/users/${username}`);
      
      const { name, bio, avatar_url: avatar } = response.data as ResponseGithub;

      const user = await Dev.create({
        name,
        user: username,
        bio,
        avatar,
        likes: [],
        dislikes: []
      });

      return res.json(user);
  }
};