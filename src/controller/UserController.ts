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
    res.status(201).json({newUser});
  } catch (error) {    
    (error instanceof Error) && res.status(403).json({        
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
      res.status(201).json({ token: user});
    } catch (error: unknown) {
      (error instanceof Error) && res.status(404).json({        
        message: error.message
      });
    }
  });

  router.get('/profile', async (req: Request, res: Response) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(" ")[1];
        if(token) {
          const user = await userService.userProfile(token);
          res.status(200).json(user);
        }
        
      } catch (error: unknown) {
        (error instanceof Error) && res.status(404).json({        
          message: error.message
        });
      }
      
  });

export { router as UserController };
