import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'maintenance_requests' })
export class MaintenanceRequest extends Model {
  @Field(() => Int)
  @Column({ primaryKey: true, autoIncrement: true })
  declare id: number;

  @Field()
  @Column({ allowNull: false })
  declare title: string;

  @Field()
  @Column({ allowNull: false })
  declare status: string;

  @Field()
  @Column({ allowNull: false })
  declare urgency: string;

  @Field()
  @Column({ allowNull: false })
  declare description: string;

  @Field({ nullable: true })
  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  declare totalResolvedDays?: number;

  @Field({ nullable: true })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare resolvedAt?: Date;

  averageDays?: number;

  @Field()
  @CreatedAt
  declare createdAt: Date;

  @Field()
  @UpdatedAt
  declare updatedAt: Date;
}
