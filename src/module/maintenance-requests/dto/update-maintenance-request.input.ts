import { CreateMaintenanceRequestInput } from './create-maintenance-request.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMaintenanceRequestInput extends PartialType(
  CreateMaintenanceRequestInput,
) {
  @Field({ nullable: true }) // Optional resolvedAt field
  resolvedAt?: Date;
}
