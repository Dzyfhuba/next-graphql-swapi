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
    "\n  query characterByIdQuery($id: ID!) {\n    person(id: $id) {\n      name\n      gender\n      birthYear\n      height\n      mass\n      skinColor\n      eyeColor\n      hairColor\n      filmConnection {\n        totalCount\n        edges {\n          node {\n            id\n            title\n          }\n        }\n      }\n      homeworld {\n        id\n        name\n      }\n      species {\n        id\n        name\n      }\n      starshipConnection {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n      vehicleConnection {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.CharacterByIdQueryDocument,
    "\n  query filmByIdQuery ($id: ID!) {\n    film (id: $id) {\n      id\n      title\n      director\n      producers\n      releaseDate\n      created\n      characterConnection {\n          totalCount\n          edges {\n              node {\n                  id\n                  name\n              }\n          }\n      }\n      speciesConnection {\n          totalCount\n          edges {\n              node {\n                  id\n                  name\n              }\n          }\n      }\n      planetConnection {\n          totalCount\n          edges {\n              node {\n                  id\n                  name\n              }\n          }\n      }\n      starshipConnection {\n          totalCount\n          edges {\n              node {\n                  id\n                  name\n              }\n          }\n      }\n      vehicleConnection {\n          totalCount\n          edges {\n              node {\n                  id\n                  name\n              }\n          }\n      }\n    }\n  }\n": types.FilmByIdQueryDocument,
    "\n  query allFilmsWithVariablesQuery199($first: Int!) {\n    allFilms(first: $first) {\n      edges {\n        node {\n          id\n          title\n          releaseDate\n          producers\n          director\n        }\n      }\n    }\n  }\n": types.AllFilmsWithVariablesQuery199Document,
    "\n  query allPeopleQuery($first: Int, $after: String){\n    allPeople(first: $first, after: $after){\n      totalCount\n      edges {\n        cursor\n        node {\n          id\n          name\n          gender\n          birthYear\n          height\n          mass\n          species {\n            name\n            classification\n          }\n          filmConnection {\n            edges {\n              node {\n                id\n                title\n                releaseDate\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.AllPeopleQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query characterByIdQuery($id: ID!) {\n    person(id: $id) {\n      name\n      gender\n      birthYear\n      height\n      mass\n      skinColor\n      eyeColor\n      hairColor\n      filmConnection {\n        totalCount\n        edges {\n          node {\n            id\n            title\n          }\n        }\n      }\n      homeworld {\n        id\n        name\n      }\n      species {\n        id\n        name\n      }\n      starshipConnection {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n      vehicleConnection {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').CharacterByIdQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query filmByIdQuery ($id: ID!) {\n    film (id: $id) {\n      id\n      title\n      director\n      producers\n      releaseDate\n      created\n      characterConnection {\n          totalCount\n          edges {\n              node {\n                  id\n                  name\n              }\n          }\n      }\n      speciesConnection {\n          totalCount\n          edges {\n              node {\n                  id\n                  name\n              }\n          }\n      }\n      planetConnection {\n          totalCount\n          edges {\n              node {\n                  id\n                  name\n              }\n          }\n      }\n      starshipConnection {\n          totalCount\n          edges {\n              node {\n                  id\n                  name\n              }\n          }\n      }\n      vehicleConnection {\n          totalCount\n          edges {\n              node {\n                  id\n                  name\n              }\n          }\n      }\n    }\n  }\n"): typeof import('./graphql').FilmByIdQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allFilmsWithVariablesQuery199($first: Int!) {\n    allFilms(first: $first) {\n      edges {\n        node {\n          id\n          title\n          releaseDate\n          producers\n          director\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').AllFilmsWithVariablesQuery199Document;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allPeopleQuery($first: Int, $after: String){\n    allPeople(first: $first, after: $after){\n      totalCount\n      edges {\n        cursor\n        node {\n          id\n          name\n          gender\n          birthYear\n          height\n          mass\n          species {\n            name\n            classification\n          }\n          filmConnection {\n            edges {\n              node {\n                id\n                title\n                releaseDate\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').AllPeopleQueryDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
