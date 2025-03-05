import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MaintenanceRequestsService } from './maintenance-requests.service';
import { MaintenanceRequest } from './entities/maintenance-request.entity';
import { CreateMaintenanceRequestInput } from './dto/create-maintenance-request.input';
import { UpdateMaintenanceRequestInput } from './dto/update-maintenance-request.input';

@Resolver(() => MaintenanceRequest)
export class MaintenanceRequestsResolver {
  constructor(
    private readonly maintenanceRequestsService: MaintenanceRequestsService,
  ) {}

  @Mutation(() => MaintenanceRequest)
  createMaintenanceRequest(@Args('data') data: CreateMaintenanceRequestInput) {
    return this.maintenanceRequestsService.create(data);
  }

  @Query(() => [MaintenanceRequest], { name: 'maintenanceRequests' })
  findAll() {
    return this.maintenanceRequestsService.findAll();
  }

  @Query(() => MaintenanceRequest, { name: 'maintenanceRequest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.maintenanceRequestsService.findOne(id);
  }

  @Mutation(() => MaintenanceRequest)
  updateMaintenanceRequest(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: UpdateMaintenanceRequestInput,
  ) {
    return this.maintenanceRequestsService.update(id, data);
  }
}
