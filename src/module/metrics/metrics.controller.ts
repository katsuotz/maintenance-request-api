import { Controller, Get, Res } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Response } from 'express';
import { Metric } from './entities/metric.entity';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('events')
  async sendMetricsEvents(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const printMetric = async (metric?: Metric) => {
      let data: any = metric;
      if (!metric) {
        data = await this.metricsService.findOne();
      }
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    await printMetric();

    const subscription = (metric?: Metric): any => printMetric(metric);
    this.metricsService.subscribe(subscription);

    res.on('close', () => {
      this.metricsService.unsubscribe(subscription);
      res.end();
    });
  }
}
