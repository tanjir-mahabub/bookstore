import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { eager: true, cascade: true })
  @JoinColumn()
  user!: User;

  @Column('jsonb', { nullable: true })
  cart!: { id: number; quantity: number }[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice!: number;

  @CreateDateColumn({ type: 'timestamptz' }) 
  createdAt!: Date;
}
