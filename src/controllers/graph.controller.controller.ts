import {
  Controller,
  Post,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { GraphService } from '../services/graph.service';
import { Edge } from '../models/edge.model';
import { TransitionDto } from '../dto/transition.dto';
import { TransitionPathDto } from '../dto/transition-path.dto';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Post('transition')
  findNextStatus(@Body() transitionDto: TransitionDto): number | null {
    const matchingArch: Edge | undefined = this.graphService.findMatchingArch(
      transitionDto.transition,
    );
    if (!matchingArch) {
      throw new NotFoundException('No transition found for given rules');
    }

    return matchingArch.destination.status;
  }

  @Post('transition-path')
  findPathToNextStatus(@Body() transitionPathDto: TransitionPathDto): number[] {
    const path: number[] = [];
    for (const status of transitionPathDto.statuses) {
      const nextStatus = this.graphService.findNextStatus(
        transitionPathDto.transition,
        status,
      );

      if (nextStatus === null) {
        throw new BadRequestException(
          'No transition path found for given statuses',
        );
      }
      path.push(nextStatus);
    }

    return path;
  }
}
