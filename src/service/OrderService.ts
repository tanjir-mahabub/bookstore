import { DataSource, getCustomRepository } from 'typeorm';
import { OrderRepository } from '../repository/OrderRepository';
import { Order } from '../entity/Order';
import { OrderDTO } from '../dto/Order';
import { UserRepository } from '../repository/UserRepository';

class OrderService {
  private orderRepository: OrderRepository;
  private userRepository: UserRepository;

  constructor(private readonly dataSource: DataSource) {
    this.orderRepository = new OrderRepository(this.dataSource);
    this.userRepository = new UserRepository(this.dataSource);
  }

  async createOrder({ userId, cart, totalPrice }: OrderDTO): Promise<Order> {
    try {
      const createdOrder = await this.orderRepository.createOrder({ userId, cart, totalPrice });
      
      await this.deductPointsFromUser(userId, totalPrice);
      
      return createdOrder;
    } catch (error) {      
      console.error('Error creating order:', error);
      throw new Error('Failed to create order. Please try again.');
    }
  }

  async getOrders(): Promise<Order[]> {
    return await this.orderRepository.getOrders();
  }

  private async deductPointsFromUser(userId: number, amount: number): Promise<void> {
    try {
      const user = await this.userRepository.findById(userId);

      if (user && user.points >= amount) {
        user.points -= amount;

        await this.userRepository.createUser(user);
      } else {
        throw new Error('Insufficient points to deduct.');
      }
    } catch (error) {
      console.error('Error deducting points from user:', error);
      throw new Error('Failed to deduct points from user.');
    }
  }
}

export { OrderService };
