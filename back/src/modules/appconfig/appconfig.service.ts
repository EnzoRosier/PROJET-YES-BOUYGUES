import { Injectable } from '@nestjs/common';
import { AppConfigRepository } from './appconfig.repository';
import { AppConfigModel } from './appconfig.model';

@Injectable()
export class AppConfigService {
    constructor(private readonly appConfigRepository: AppConfigRepository) {}

    //Recup tout les appconfig
    public async getAll(): Promise<AppConfigModel[]> {
        return this.appConfigRepository.getAll()
    }
    
    //Recup valeur avec cle
    public async getValue(key: string): Promise<AppConfigModel | null> {
        return this.appConfigRepository.getValue(key)
    }
    
    //Cree app config
    public async create(newConfig: AppConfigModel): Promise<AppConfigModel> {
        return this.appConfigRepository.create(newConfig)
    }
    
    //set value app config
    public async set(newConfig: AppConfigModel): Promise<AppConfigModel> {
        return this.appConfigRepository.set(newConfig)
    }
}
