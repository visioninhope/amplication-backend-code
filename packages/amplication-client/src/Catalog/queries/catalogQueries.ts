import { gql } from "@apollo/client";

export const SEARCH_CATALOG = gql`
  query searchCatalog(
    $where: ResourceWhereInputWithPropertiesFilter
    $take: Int
    $skip: Int
  ) {
    catalog(
      where: $where
      take: $take
      skip: $skip
      orderBy: [{ createdAt: Desc }]
    ) {
      totalCount
      data {
        id
        name
        description
        createdAt
        updatedAt
        resourceType
        githubLastSync
        gitRepositoryOverride
        codeGeneratorStrategy
        codeGeneratorVersion
        codeGenerator
        licensed
        projectId
        properties
        blueprint {
          id
          name
          color
        }
        project {
          id
          name
        }
        owner {
          ... on User {
            id
            account {
              id
              email
              firstName
              lastName
            }
          }
          ... on Team {
            id
            name
            description
            color
          }
        }
        version {
          id
          createdAt
          version
          message
        }
        serviceTemplate {
          id
          name
          projectId
        }
        serviceTemplateVersion
        gitRepository {
          id
          name
          groupName
          baseBranchName
          gitOrganization {
            id
            name
            type
            provider
            useGroupingForRepositories
          }
        }
        entities {
          id
          name
        }
        builds(orderBy: { createdAt: Desc }, take: 1) {
          id
          version
          createdAt
          status
          codeGeneratorVersion
          commit {
            user {
              account {
                id
                lastName
                firstName
                email
              }
            }
          }
          action {
            id
            createdAt
            steps {
              id
              name
              createdAt
              message
              status
              completedAt
              logs {
                id
                createdAt
                message
                meta
                level
              }
            }
          }
        }
      }
    }
  }
`;
