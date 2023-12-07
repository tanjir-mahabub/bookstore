import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // Constructor to create instances of the entity
  constructor(title: string, writer: string, coverImage: string, point: number, tags: string[]) {
    this.title = title;
    this.writer = writer;
    this.coverImage = coverImage;
    this.point = point;
    this.tags = tags;
  }
}
