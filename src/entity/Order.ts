import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn } from 'typeorm';

import { Book } from './Book';
import { User } from './User';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn()
    user!: User;
  
    @ManyToOne(() => Book, (book: any) => book.orders)
    @JoinColumn()
    book!: Book;
  
    @Column({ default: 1 }) 
    quantity!: number;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice!: number;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  }
