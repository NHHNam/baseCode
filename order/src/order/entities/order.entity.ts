import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  createdDate: Date;
}

export default Order;
