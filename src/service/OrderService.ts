import { DataSource, getCustomRepository } from 'typeorm';
import { OrderRepository } from '../repository/OrderRepository';
import { Order } from '../entity/Order';
import { OrderDTO } from '../dto/Order';

class OrderService {
  private orderRepository: OrderRepository;

  constructor(private readonly dataSource: DataSource) {
    this.orderRepository = new OrderRepository(this.dataSource);
  }

  async createOrder({ userId, cart, totalPrice }: OrderDTO): Promise<Order> {
    try {
      const createdOrder = await this.orderRepository.createOrder({ userId, cart, totalPrice });
      return createdOrder;
    } catch (error) {      
      console.error('Error creating order:', error);
      throw new Error('Failed to create order. Please try again.');
    }
  }

  async getOrders(): Promise<Order[]> {
    return await this.orderRepository.getOrders();
  }
}

export { OrderService };
