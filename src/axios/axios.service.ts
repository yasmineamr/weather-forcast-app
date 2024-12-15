import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosService {
    constructor(private readonly httpService: HttpService) {}

    async get(url){
        try {
            const { data } = await firstValueFrom(this.httpService.get(url));
            return data;
        } catch (err) {
            return {
                status: err.status,
                code: err.code,
                message: err.message
            };
        }
    }
}
