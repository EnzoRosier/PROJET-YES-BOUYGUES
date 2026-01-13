import { Injectable } from '@nestjs/common';
import { AppConfigRepository } from './appconfig.repository';
import { AppConfigModel } from './appconfig.model';

@Injectable()
export class AppConfigService {
    constructor(private readonly appConfigRepository: AppConfigRepository) {}

    public async getAll(): Promise<AppConfigModel[]> {
        return this.appConfigRepository.getAll()
    }
    
    public async getValue(key: string): Promise<AppConfigModel | null> {
        return this.appConfigRepository.getValue(key)
    }
    
    public async create(newConfig: AppConfigModel): Promise<AppConfigModel> {
        return this.appConfigRepository.create(newConfig)
    }
    
    public async set(newConfig: AppConfigModel): Promise<AppConfigModel> {
        return this.appConfigRepository.set(newConfig)
    }
}
