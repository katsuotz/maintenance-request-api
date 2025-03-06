import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MaintenanceRequest } from './entities/maintenance-request.entity';
import { MetricsService } from '../metrics/metrics.service';
import { Sequelize } from 'sequelize-typescript';
import { getDayDiff } from '../../utils/dateUtils';
import { numberFormat } from '../../utils/generalUtils';
import { CreateMaintenanceRequestInput } from './dto/create-maintenance-request.input';
import { UpdateMaintenanceRequestInput } from './dto/update-maintenance-request.input';

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
    });

    // run update metrics in the background
    this.metricsService.newRequest(payload);

    return request;
  }

  findAll() {
    return this.requestModel.findAll({
      order: [['createdAt', 'DESC']],
    });
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
    if (payload.description) request.description = payload.description;

    if (payload.status === 'resolved') {
      request.resolvedAt = new Date();
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
