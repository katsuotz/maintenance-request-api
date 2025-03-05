import { forwardRef, Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Metric } from './entities/metric.entity';
import { MetricsResolver } from './metrics.resolver';
import { MaintenanceRequestsModule } from '../maintenance-requests/maintenance-requests.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Metric]),
    forwardRef(() => MaintenanceRequestsModule),
  ],
  providers: [MetricsResolver, MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
