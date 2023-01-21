import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
  SUPER_ADMIN = 'super_admin',
}

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  name: string;

  @Column('boolean', { default: false })
  active: boolean;

  @Column({
    type: 'text',
    array: true,
    default: [Role.USER],
  })
  role: Role[];

  @Column('date', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('date', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
