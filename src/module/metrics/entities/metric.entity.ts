import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Model, Table } from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'metrics' })
export class Metric extends Model {
  @Field(() => ID)
  @Column({ primaryKey: true, autoIncrement: true })
  declare id: number;

  @Field()
  @Column({ allowNull: false })
  declare openRequests: number;

  @Field()
  @Column({ allowNull: false })
  declare urgentRequests: number;

  @Field()
  @Column({ allowNull: false })
  declare avgDaysToResolve: number;
}
