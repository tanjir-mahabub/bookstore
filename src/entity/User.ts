import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, CreateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Book } from './Book';
import { Order } from './Order';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  name!: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Column()
  @IsString()
  @MinLength(4)
  @MaxLength(20) 
  @IsNotEmpty() 
  password!: string;

  @Column({ default: 100 })
  points!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @OneToMany(() => Order, (order: Order) => order.user)
  orders!: Order[];
  
  @ManyToMany(() => Book, (book: Book) => book.users)
  books!: Book[];
}
