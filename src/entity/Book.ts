import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;

  @Column()
  writer: string;

  @Column()
  coverImage: string;

  @Column('decimal', { precision: 10, scale: 2 })
  point: number;

  @Column('simple-array')
  tags: string[];

  @ManyToMany(() => User, (user: User) => user.books)
  users: User[];

  // Constructor to create instances of the entity
  constructor(title: string, writer: string, coverImage: string, point: number, tags: string[], users: User[]) {
    this.title = title;
    this.writer = writer;
    this.coverImage = coverImage;
    this.point = point;
    this.tags = tags;
    this.users = users;
  }
}
