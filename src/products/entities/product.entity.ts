import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NormalizeSlugUtil } from '../../shared/util/normalize-slug.util';

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

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
    nullable: true,
  })
  sizes: string[];

  @Column('text', {
    nullable: true,
  })
  gender: string;

  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

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
    this.slug = NormalizeSlugUtil.normalize(this.slug);
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    if (!this.slug) {
      this.slug = this.name;
    }
    this.slug = NormalizeSlugUtil.normalize(this.slug);
  }
}
