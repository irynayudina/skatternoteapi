# Roadmap GraphQL API

This module provides GraphQL endpoints for managing roadmaps and roadmap steps.

## GraphQL Schema

### Types

#### Roadmap
```graphql
type Roadmap {
  id: Int!
  title: String!
  description: String
  desktopId: Int!
  userId: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  steps: [RoadmapStep!]
}
```

#### RoadmapStep
```graphql
type RoadmapStep {
  id: Int!
  title: String!
  description: String
  order: Int!
  isCompleted: Boolean!
  roadmapId: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

### Queries

- `roadmaps(userId: Int!, desktopId: Int): [Roadmap!]!` - Get all roadmaps for a user, optionally filtered by desktop
- `roadmap(roadmapId: Int!, userId: Int!): Roadmap!` - Get a specific roadmap

### Mutations

- `createRoadmap(createRoadmapInput: CreateRoadmapInput!, userId: Int!): Roadmap!` - Create a new roadmap
- `updateRoadmap(roadmapId: Int!, updateRoadmapInput: UpdateRoadmapInput!, userId: Int!): Roadmap!` - Update a roadmap
- `deleteRoadmap(roadmapId: Int!, userId: Int!): String!` - Delete a roadmap
- `updateRoadmapStep(stepId: Int!, updateStepDto: UpdateRoadmapStepDto!, userId: Int!): Roadmap!` - Update a roadmap step
- `toggleStepCompletion(stepId: Int!, userId: Int!): Roadmap!` - Toggle step completion status
- `reorderSteps(roadmapId: Int!, stepIds: [Int!]!, userId: Int!): Roadmap!` - Reorder roadmap steps
- `transferRoadmap(roadmapId: Int!, targetDesktopId: Int!, userId: Int!): Roadmap!` - Transfer roadmap to another desktop

### Input Types

#### CreateRoadmapInput
```graphql
input CreateRoadmapInput {
  title: String!
  description: String
  desktopId: Int!
  steps: [CreateRoadmapStepInput!]!
}
```

#### CreateRoadmapStepInput
```graphql
input CreateRoadmapStepInput {
  title: String!
  description: String
  order: Int
  isCompleted: Boolean
}
```

#### UpdateRoadmapInput
```graphql
input UpdateRoadmapInput {
  title: String
  description: String
  steps: [UpdateRoadmapStepInput!]
}
```

#### UpdateRoadmapStepInput
```graphql
input UpdateRoadmapStepInput {
  title: String
  description: String
  order: Int
  isCompleted: Boolean
}
```

## Usage Examples

### Create a Roadmap
```graphql
mutation CreateRoadmap {
  createRoadmap(
    createRoadmapInput: {
      title: "Learn React"
      description: "Complete React learning path"
      desktopId: 1
      steps: [
        { title: "Setup development environment", order: 1 }
        { title: "Learn JSX", order: 2 }
        { title: "Build first component", order: 3 }
      ]
    }
    userId: 1
  ) {
    id
    title
    description
    steps {
      id
      title
      order
      isCompleted
    }
  }
}
```

### Get Roadmaps
```graphql
query GetRoadmaps {
  roadmaps(userId: 1, desktopId: 1) {
    id
    title
    description
    steps {
      id
      title
      order
      isCompleted
    }
  }
}
```

### Toggle Step Completion
```graphql
mutation ToggleStep {
  toggleStepCompletion(stepId: 1, userId: 1) {
    id
    title
    steps {
      id
      title
      isCompleted
    }
  }
}
```

## Features

- **CRUD Operations**: Full create, read, update, delete operations for roadmaps
- **Step Management**: Individual step updates and completion toggling
- **Step Reordering**: Reorder steps within a roadmap
- **Desktop Transfer**: Move roadmaps between desktops
- **User Isolation**: All operations are scoped to the authenticated user
- **Validation**: Input validation using class-validator decorators
- **Type Safety**: Full TypeScript support with GraphQL type generation 