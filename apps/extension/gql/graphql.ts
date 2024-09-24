/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** The Book model */
export type Book = {
  __typename?: 'Book';
  asin?: Maybe<Scalars['String']['output']>;
  author: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  lastAnnotatedAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

/** The Highlight model */
export type Highlight = {
  __typename?: 'Highlight';
  color: HighlightColor;
  createdDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  page?: Maybe<Scalars['String']['output']>;
  text: Scalars['String']['output'];
};

export enum HighlightColor {
  Blue = 'BLUE',
  Orange = 'ORANGE',
  Pink = 'PINK',
  Yellow = 'YELLOW'
}

export type Mutation = {
  __typename?: 'Mutation';
  addBook: Book;
  addHighlight: Highlight;
};


export type MutationAddBookArgs = {
  newBookData: NewBookInput;
};


export type MutationAddHighlightArgs = {
  bookAsin: Scalars['String']['input'];
  bookId: Scalars['String']['input'];
  newHighlight: NewHighlightInput;
};

export type NewBookInput = {
  asin?: InputMaybe<Scalars['String']['input']>;
  author: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  lastAnnotatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type NewHighlightInput = {
  color: HighlightColor;
  createdDate?: InputMaybe<Scalars['DateTime']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  book: Book;
  books: Array<Book>;
  highlight: Highlight;
  me: User;
};


export type QueryBookArgs = {
  id: Scalars['String']['input'];
};


export type QueryHighlightArgs = {
  id: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pageUrl: Scalars['String']['output'];
};

export type CreateBookMutationVariables = Exact<{
  book: NewBookInput;
}>;


export type CreateBookMutation = { __typename?: 'Mutation', addBook: { __typename?: 'Book', id: string, title: string, author: string, asin?: string | null } };

export type CreateHighlightMutationVariables = Exact<{
  highlight: NewHighlightInput;
  bookId: Scalars['String']['input'];
  asin: Scalars['String']['input'];
}>;


export type CreateHighlightMutation = { __typename?: 'Mutation', addHighlight: { __typename?: 'Highlight', id: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, avatarUrl: string, pageUrl: string } };


export const CreateBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"book"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewBookInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newBookData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"book"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"asin"}}]}}]}}]} as unknown as DocumentNode<CreateBookMutation, CreateBookMutationVariables>;
export const CreateHighlightDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateHighlight"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"highlight"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewHighlightInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"asin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addHighlight"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newHighlight"},"value":{"kind":"Variable","name":{"kind":"Name","value":"highlight"}}},{"kind":"Argument","name":{"kind":"Name","value":"bookId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookId"}}},{"kind":"Argument","name":{"kind":"Name","value":"bookAsin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"asin"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateHighlightMutation, CreateHighlightMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"pageUrl"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;