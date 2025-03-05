import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Metric } from './entities/metric.entity';
import { MaintenanceRequestsService } from '../maintenance-requests/maintenance-requests.service';
import { numberFormat } from '../../utils/generalUtils';

@Injectable()
export class MetricsService {
  constructor(
    @InjectModel(Metric)
    private metricModel: typeof Metric,

    @Inject(forwardRef(() => MaintenanceRequestsService))
    private readonly maintenanceRequestsService: MaintenanceRequestsService,
  ) {}

  findOne() {
    return this.metricModel.findOne();
  }

  async newRequest(isUrgent: boolean = false) {
    const metrics = await this.metricModel.findOne();
    if (metrics) {
      metrics.openRequests = metrics.openRequests + 1;
      if (isUrgent) {
        metrics.urgentRequests = metrics.urgentRequests + 1;
      }
      await metrics.save();
    }
  }

  async finishRequest() {
    const metrics = await this.metricModel.findOne();
    const averageDays =
      await this.maintenanceRequestsService.getAverageResolutionTime();
    if (metrics) {
      metrics.openRequests = metrics.openRequests - 1;
      metrics.avgDaysToResolve = numberFormat(averageDays, 1);
      await metrics.save();
    }
    return metrics;
  }
}
