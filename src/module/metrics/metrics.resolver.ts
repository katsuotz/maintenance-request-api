import { Resolver, Query } from '@nestjs/graphql';
import { MetricsService } from './metrics.service';
import { Metric } from './entities/metric.entity';

@Resolver(() => Metric)
export class MetricsResolver {
  constructor(private readonly metricsService: MetricsService) {}

  @Query(() => Metric, { name: 'metric' })
  findOne() {
    return this.metricsService.findOne();
  }
}
