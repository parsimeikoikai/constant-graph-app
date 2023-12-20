# Graph System with Nest.js

The system is built on Nest.js, a Node.js framework, designed to create a server specifically tailored for consistent graph data representation.

## Key Building Blocks

### Node Model
- Each status within the graph is assigned a unique number for identification.

### Edge Model
- Transitions between statuses are defined by sets of rules, each consisting of three elements: Action, Rule, and Type.

## Core Functionalities

### GraphService
- Manages the graph's nodes and edges, handling tasks such as:
  - Adding new nodes and edges to the graph structure.
  - Locating edges that match specific transition rules.
  - Determining the next status based on the current status and transition rules.

### GraphController
- Acts as the communication hub for graph-related actions, offering two main endpoints:
  - `/transition`: Retrieves the next status for a given transition.
  - `/transition-path`: Calculates the path to the next status for a given transition and a group of statuses.

## Resilience and Maintainability

### Error Handling
- The system gracefully handles potential issues like missing edges or unreachable statuses, providing informative warnings or error messages in responses.

### Testing
- Thorough testing involves sending HTTP requests to the endpoints with various transition and status data, ensuring outcomes align with the predefined graph structure and rules.

## Design Principles

- **Modularity:** The system is designed with a clear separation of concerns, organizing responsibilities between the GraphService and GraphController.

- **Organization:** This structure promotes easy expansion of features and efficient maintenance of the codebase.
