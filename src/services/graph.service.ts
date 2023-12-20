import { Injectable } from '@nestjs/common';
import { Node } from '../models/node.model';
import { Edge } from '../models/edge.model';

@Injectable()
export class GraphService {
  private nodes: Node[] = [
    new Node(0),
    new Node(1),
    new Node(2),
    new Node(3),
    new Node(4),
    new Node(5),
  ];
  private edges: Edge[] = [
    new Edge('S', 'A', 'S', this.nodes[1]),
    new Edge('R', 'P', 'S', this.nodes[1]),
    new Edge('S', 'P', 'S', this.nodes[1]),
    new Edge('R', 'P', 'S', this.nodes[1]),
    new Edge('R', 'U', 'S', this.nodes[0]),
    new Edge('R', 'A', 'S', this.nodes[2]),
    new Edge('R', 'P', 'B', this.nodes[4]),
    new Edge('R', 'A', 'S', this.nodes[3]),
  ];
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
