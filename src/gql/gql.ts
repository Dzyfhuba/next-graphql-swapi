/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query allFilmsWithVariablesQuery199($first: Int!) {\n    allFilms(first: $first) {\n      edges {\n        node {\n          id\n          title\n          releaseDate\n          producers\n          director\n        }\n      }\n    }\n  }\n": types.AllFilmsWithVariablesQuery199Document,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allFilmsWithVariablesQuery199($first: Int!) {\n    allFilms(first: $first) {\n      edges {\n        node {\n          id\n          title\n          releaseDate\n          producers\n          director\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').AllFilmsWithVariablesQuery199Document;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
