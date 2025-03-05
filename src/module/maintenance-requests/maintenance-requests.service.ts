import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMaintenanceRequestInput } from './dto/create-maintenance-request.input';
import { UpdateMaintenanceRequestInput } from './dto/update-maintenance-request.input';
import { InjectModel } from '@nestjs/sequelize';
import { MaintenanceRequest } from './entities/maintenance-request.entity';
import { MetricsService } from '../metrics/metrics.service';
import { Sequelize } from 'sequelize-typescript';
import { URGENT } from '../../utils/const';
import { getDayDiff } from '../../utils/dateUtils';
import { numberFormat } from '../../utils/generalUtils';

@Injectable()
export class MaintenanceRequestsService {
  constructor(
    @InjectModel(MaintenanceRequest)
    private requestModel: typeof MaintenanceRequest,
    private readonly metricsService: MetricsService,
  ) {}

  async create(payload: CreateMaintenanceRequestInput) {
    const request = await this.requestModel.create({
      ...payload,
      status: 'open',
    });

    // run update metrics in the background
    this.metricsService.newRequest(URGENT.includes(payload.urgency));

    return request;
  }

  findAll() {
    return this.requestModel.findAll();
  }

  findOne(id: number) {
    return this.requestModel.findByPk(id);
  }

  async update(id: number, payload: UpdateMaintenanceRequestInput) {
    const request = await this.requestModel.findByPk(id);
    if (!request) {
      throw new NotFoundException('Maintenance Request not found');
    }

    if (request.status === 'resolved') {
      throw new BadRequestException('Cannot update a resolved request');
    }

    if (payload.title) request.title = payload.title;
    if (payload.status) request.status = payload.status;
    if (payload.urgency) request.urgency = payload.urgency;

    if (payload.status === 'resolved') {
      request.resolvedAt = new Date();
      console.log(typeof request.createdAt, typeof request.resolvedAt);
      request.totalResolvedDays = numberFormat(
        getDayDiff(request.createdAt, request.resolvedAt),
        1,
      );

      // run update metrics in the background
      this.metricsService.finishRequest();
    }

    await request.save();

    return request;
  }

  async getAverageResolutionTime(): Promise<number> {
    const result = await this.requestModel.findOne({
      attributes: [
        [
          Sequelize.fn('AVG', Sequelize.col('totalResolvedDays')),
          'averageDays',
        ],
      ],
      raw: true,
    });

    return result?.averageDays || 0;
  }
}
