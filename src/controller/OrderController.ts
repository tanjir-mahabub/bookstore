import express, { Request, Response } from 'express';
import { UserService } from '../service/UserService';
import { AppDataSource } from '../database';
import { OrderService } from '../service/OrderService';

const router = express.Router();
const userService = new UserService(AppDataSource);
const orderService = new OrderService(AppDataSource);


router.post('/order', async (req: Request, res: Response) => {
    const cart = req.body;
    const auth = req.headers.authorization;
    const token = auth?.split(" ")[1];
  
    try {
      if (token) {
        const userId = await userService.verifyToken(token);
        cart.userId = userId;
        console.log(cart, userId);
        const order = await orderService.createOrder(cart);
        res.status(201).json(order);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({
          message: error.message
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error"
        });
      }
    }
  });

router.get('/orders', async (req: Request, res: Response) => {
    try {
        // Assuming you have a method in OrderService to fetch orders
        const orders = await orderService.getOrders();

        res.status(200).json(orders);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message
            });
        } else {
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
});

  export { router as OrderController }
  