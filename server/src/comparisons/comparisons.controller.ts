import { Controller, Get, Body } from '@nestjs/common';
import { ComparisonsService } from './comparisons.service';

@Controller('comparisons')
export class ComparisonsController {

  constructor(private readonly comparisonService: ComparisonsService) {}

  @Get()
  async compareRepositories() {
    return await this.comparisonService.compareRepositories();
  }

}
