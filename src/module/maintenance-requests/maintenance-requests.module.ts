import { forwardRef, Module } from '@nestjs/common';
import { MaintenanceRequestsService } from './maintenance-requests.service';
import { MaintenanceRequestsResolver } from './maintenance-requests.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { MaintenanceRequest } from './entities/maintenance-request.entity';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [
    SequelizeModule.forFeature([MaintenanceRequest]),
    forwardRef(() => MetricsModule),
  ],
  providers: [MaintenanceRequestsResolver, MaintenanceRequestsService],
  exports: [MaintenanceRequestsService],
})
export class MaintenanceRequestsModule {}
