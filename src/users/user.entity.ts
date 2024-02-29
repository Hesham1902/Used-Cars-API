import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  insertLog() {
    console.log(`User with id:${this.id} inserted into database`);
  }
  @AfterUpdate()
  updateLog() {
    console.log(`User with id:${this.id} updated`);
  }
  @AfterRemove()
  removeLog() {
    console.log(`User with id:${this.id} remove from database`);
  }
}
