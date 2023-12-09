import express, { Request, Response } from 'express';
import { UserService } from '../service/UserService';
import { AppDataSource } from '../database';

const router = express.Router();
const userService = new UserService(AppDataSource);


router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Name, email, and password are required fields.',
    });
  }
  
  try {
    const newUser = await userService.registerUser({name, email, password});    
    res.status(201).json(newUser);
  } catch (error) {
    (error instanceof Error) && res.json({        
        message: error.message
      });
  }

});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required fields.',
      });
    }

    try {
      const user = await userService.loginUser({ email, password });
      res.status(201).json(user);
    } catch (error: unknown) {
      (error instanceof Error) && res.json({        
        message: error.message
      });
    }
  });

export { router as UserController };
