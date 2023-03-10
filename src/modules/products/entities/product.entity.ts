import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NormalizeSlugUtil } from '../../util/normalize-slug.util';
import { ProductImage } from './product-image.entity';
import { User } from '../../users/entities';

@Entity({
  name: 'products',
})
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
  description?: string;

  @Column('int', {
    default: 0,
  })
  price?: number;

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('int', {
    default: 0,
  })
  stock?: number;

  @Column('text', {
    array: true,
    nullable: true,
  })
  sizes?: string[];

  @Column('text', {
    nullable: true,
  })
  gender?: string;

  @Column('text', {
    array: true,
    default: [],
  })
  tags?: string[];

  @Column('date', {
    default: new Date(),
  })
  createdAt: Date;

  @Column('date', {
    default: new Date(),
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.products, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user?: User;

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
