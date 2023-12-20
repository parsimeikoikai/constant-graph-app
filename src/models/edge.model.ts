import { Node } from './node.model';
export class Edge {
  constructor(
    public action: string,
    public rule: string,
    public type: string,
    public destination: Node,
  ) {}
}
