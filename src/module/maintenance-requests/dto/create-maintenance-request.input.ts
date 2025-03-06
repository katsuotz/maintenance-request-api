import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMaintenanceRequestInput {
  @Field()
  title: string;

  @Field()
  urgency: string;

  @Field()
  status: string;

  @Field()
  description: string;
}
