# Desktop GraphQL API

This module provides GraphQL endpoints for managing desktops and their associated notes.

## GraphQL Schema

### Types

#### Desktop
```graphql
type Desktop {
  id: Int!
  name: String!
  description: String
  userId: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  notes: [Note!]
  _count: DesktopCount
}

type DesktopCount {
  notes: Int!
}
```

#### Note
```graphql
type Note {
  id: Int!
  title: String!
  isPinned: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

#### DesktopStats
```graphql
type DesktopStats {
  totalDesktops: Int!
  totalNotes: Int!
  desktops: [Desktop!]!
}
```

### Queries

- `desktops(userId: Int!): [Desktop!]!` - Get all desktops for a user
- `desktop(desktopId: Int!, userId: Int!): Desktop!` - Get a specific desktop with its notes
- `desktopStats(userId: Int!): DesktopStats!` - Get desktop statistics for a user

### Mutations

- `createDesktop(createDesktopInput: CreateDesktopInput!, userId: Int!): Desktop!` - Create a new desktop
- `updateDesktop(desktopId: Int!, updateDesktopInput: UpdateDesktopInput!, userId: Int!): Desktop!` - Update a desktop
- `deleteDesktop(desktopId: Int!, userId: Int!): String!` - Delete a desktop

### Input Types

#### CreateDesktopInput
```graphql
input CreateDesktopInput {
  name: String!
  description: String
}
```

#### UpdateDesktopInput
```graphql
input UpdateDesktopInput {
  name: String
  description: String
}
```

## Usage Examples

### Create a Desktop
```graphql
mutation CreateDesktop {
  createDesktop(
    createDesktopInput: {
      name: "Work Projects"
      description: "Desktop for work-related projects"
    }
    userId: 1
  ) {
    id
    name
    description
    createdAt
  }
}
```

### Get All Desktops
```graphql
query GetDesktops {
  desktops(userId: 1) {
    id
    name
    description
    createdAt
    _count {
      notes
    }
  }
}
```

### Get Specific Desktop with Notes
```graphql
query GetDesktop {
  desktop(desktopId: 1, userId: 1) {
    id
    name
    description
    notes {
      id
      title
      isPinned
      createdAt
    }
  }
}
```

### Update Desktop
```graphql
mutation UpdateDesktop {
  updateDesktop(
    desktopId: 1
    updateDesktopInput: {
      name: "Updated Work Projects"
      description: "Updated description"
    }
    userId: 1
  ) {
    id
    name
    description
    updatedAt
  }
}
```

### Delete Desktop
```graphql
mutation DeleteDesktop {
  deleteDesktop(desktopId: 1, userId: 1)
}
```

### Get Desktop Statistics
```graphql
query GetDesktopStats {
  desktopStats(userId: 1) {
    totalDesktops
    totalNotes
    desktops {
      id
      name
      _count {
        notes
      }
    }
  }
}
```

## Features

- **CRUD Operations**: Full create, read, update, delete operations for desktops
- **Note Integration**: Desktops include their associated notes with pinning status
- **Statistics**: Get comprehensive desktop and note statistics
- **User Isolation**: All operations are scoped to the authenticated user
- **Validation**: Input validation using class-validator decorators
- **Type Safety**: Full TypeScript support with GraphQL type generation
- **REST Compatibility**: Maintains existing REST endpoints alongside GraphQL 