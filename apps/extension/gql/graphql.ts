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
};


export type QueryBookArgs = {
  id: Scalars['String']['input'];
};


export type QueryHighlightArgs = {
  id: Scalars['String']['input'];
};

export type CreateBookMutationVariables = Exact<{
  book: NewBookInput;
}>;


export type CreateBookMutation = { __typename?: 'Mutation', addBook: { __typename?: 'Book', id: string, title: string, author: string } };


export const CreateBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"book"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewBookInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newBookData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"book"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}}]}}]} as unknown as DocumentNode<CreateBookMutation, CreateBookMutationVariables>;