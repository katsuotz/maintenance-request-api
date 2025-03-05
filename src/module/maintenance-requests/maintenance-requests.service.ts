import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMaintenanceRequestInput } from './dto/create-maintenance-request.input';
import { UpdateMaintenanceRequestInput } from './dto/update-maintenance-request.input';
import { InjectModel } from '@nestjs/sequelize';
import { MaintenanceRequest } from './entities/maintenance-request.entity';

@Injectable()
export class MaintenanceRequestsService {
  constructor(
    @InjectModel(MaintenanceRequest)
    private requestModel: typeof MaintenanceRequest,
  ) {}

  create(payload: CreateMaintenanceRequestInput) {
    return this.requestModel.create({
      ...payload,
      status: 'open',
    });
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
      // throwHttpError('Maintenance Request not found', HttpStatus.NOT_FOUND);
    }

    if (request.status === 'resolved') {
      throw new BadRequestException('Cannot update a resolved request');
    }

    if (payload.title) request.title = payload.title;
    if (payload.status) request.status = payload.status;
    if (payload.urgency) request.urgency = payload.urgency;

    if (payload.status === 'resolved') {
      request.resolvedAt = new Date();
    }

    await request.save();
    return request;
  }
}
