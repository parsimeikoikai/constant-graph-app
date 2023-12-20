import { Injectable } from '@nestjs/common';
import { Node } from '../models/node.model';
import { Edge } from '../models/edge.model';

@Injectable()
export class GraphService {
  private nodes: Node[] = [];
  private edges: Edge[] = [];

  addNode(node: Node): void {
    this.nodes.push(node);
  }

  addEdge(edge: Edge): void {
    this.edges.push(edge);
  }
  findMatchingArch(transition: string[]): Edge | undefined {
    return this.edges.find((edge) =>
      this.areArraysEqual([edge.action, edge.rule, edge.type], transition),
    );
  }

  private areArraysEqual(arr1: string[], arr2: string[]): boolean {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  }
  findNextStatus(transition: string[], currentStatus: number): number {
    const matchingEdge = this.edges.find(
      (edge) =>
        edge.action === transition[0] &&
        edge.rule === transition[1] &&
        edge.type === transition[2] &&
        edge.destination.status === currentStatus,
    );

    if (matchingEdge) {
      return matchingEdge.destination.status;
    } else {
      // Handle the case where no matching edge is found (e.g., return a default value, log it, etc.)
      console.warn(
        `No matching edge found for transition ${transition} and status ${currentStatus}`,
      );
      return -1; // Or any other default value
    }
  }
}
