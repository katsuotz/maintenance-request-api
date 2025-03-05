import { Module } from '@nestjs/common';
import { MaintenanceRequestsService } from './maintenance-requests.service';
import { MaintenanceRequestsResolver } from './maintenance-requests.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { MaintenanceRequest } from './entities/maintenance-request.entity';

@Module({
  imports: [SequelizeModule.forFeature([MaintenanceRequest])],
  providers: [MaintenanceRequestsResolver, MaintenanceRequestsService],
})
export class MaintenanceRequestsModule {}
