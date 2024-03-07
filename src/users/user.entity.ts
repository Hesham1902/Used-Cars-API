// import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: false })
  admin: boolean;

  @Column()
  // @Exclude()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
