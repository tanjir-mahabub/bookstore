import { DataSource, Repository, getRepository } from 'typeorm';
import { Order } from '../entity/Order';
import { OrderDTO } from '../dto/Order';

class OrderRepository {    
    private orderRepository: Repository<Order>;

    constructor(private readonly dataSource: DataSource) {
        this.orderRepository = dataSource.getRepository(Order);
    }

    async createOrder(order: OrderDTO): Promise<Order> {
        try {
            return await this.orderRepository.save(order);
        } catch (error) {
            console.error('Error creating order:', error);
            throw new Error('Failed to create order. Please try again.'); // Customize the error message as needed
        }
    }

     async getOrders(): Promise<Order[]> {
        return await this.orderRepository.find();
    } 
    
}

export { OrderRepository };