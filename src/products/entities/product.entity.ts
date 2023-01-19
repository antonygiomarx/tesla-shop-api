import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column('int', {
    default: 0,
  })
  price: number;

  @Column('text', {
    nullable: true,
  })
  image: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('text', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column('date', {
    default: new Date(),
  })
  createdAt: Date;

  @Column('date', {
    default: new Date(),
  })
  updatedAt: Date;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.name;
    }
    this.slug = this.slug.replace(/\s/g, '_').toLowerCase();
  }
}
