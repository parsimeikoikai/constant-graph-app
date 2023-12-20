import { Controller, Post, Body } from '@nestjs/common';
import { GraphService } from '../services/graph.service';
import { Edge } from '../models/edge.model';

@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Post('transition')
  findNextStatus(@Body('transition') transition: string[]): number | null {
    const matchingArch: Edge | undefined =
      this.graphService.findMatchingArch(transition);

    if (matchingArch) {
      return matchingArch.destination.status;
    } else {
      return null;
    }
  }

  @Post('transition-path')
  findPathToNextStatus(
    @Body('transition') transition: string[],
    @Body('statuses') statuses: number[],
  ): number[] {
    const path: number[] = [];

    for (const status of statuses) {
      const nextStatus = this.graphService.findNextStatus(transition, status);

      if (nextStatus !== null) {
        path.push(nextStatus);
      } else {
        console.warn(`No transition path found for status ${status}`);
      }
    }

    return path;
  }
}
