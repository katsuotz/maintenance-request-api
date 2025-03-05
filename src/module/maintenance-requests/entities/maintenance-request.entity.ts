import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'maintenance_requests' })
export class MaintenanceRequest extends Model {
  @Field(() => ID)
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

  @Field({ nullable: true })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare resolvedAt?: Date;
}
