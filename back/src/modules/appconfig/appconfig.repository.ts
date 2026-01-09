import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppConfigEntity } from '../database/entities/appconfig.entity';
import { AppConfigModel } from './appconfig.model';

@Injectable()
export class AppConfigRepository {
  private readonly appConfigRepository =
    this.dataSource.getRepository(AppConfigEntity);

  constructor(private readonly dataSource: DataSource) {}

  public async getAll(): Promise<AppConfigModel[]> {
    return this.appConfigRepository.find();
  }

  public async getValue(key: string): Promise<AppConfigModel | null> {
    return this.appConfigRepository.findOne({
      where: { key: key }
    });
  }

  public async create(
    newConfig: AppConfigModel
  ): Promise<AppConfigModel> {
    return await this.appConfigRepository.save(newConfig)
  }

  public async set(
    newConfig: AppConfigModel
  ): Promise<AppConfigModel> {
    if (newConfig == null || typeof newConfig.key !== 'string') {
      throw new BadRequestException('key not specified');
    }

    const config = await this.appConfigRepository.findOneOrFail({
      where: { key: newConfig.key },
    });

    config.value = newConfig.value

    return await this.appConfigRepository.save(newConfig)
  }

}
