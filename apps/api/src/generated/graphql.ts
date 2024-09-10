import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigFloat: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  Date: { input: any; output: any; }
  Datetime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Opaque: { input: any; output: any; }
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  contains?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  eq?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Date']['input']>>;
  contains?: InputMaybe<Array<Scalars['Date']['input']>>;
  eq?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Date']['input']>>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  contains?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  eq?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Float']['input']>>;
  contains?: InputMaybe<Array<Scalars['Float']['input']>>;
  eq?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Float']['input']>>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Int']['input']>>;
  contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `NotionPage` collection */
  deleteFromNotionPageCollection: NotionPageDeleteResponse;
  /** Deletes zero or more records from the `NotionSecret` collection */
  deleteFromNotionSecretCollection: NotionSecretDeleteResponse;
  /** Deletes zero or more records from the `NotionUser` collection */
  deleteFromNotionUserCollection: NotionUserDeleteResponse;
  /** Adds one or more `NotionPage` records to the collection */
  insertIntoNotionPageCollection?: Maybe<NotionPageInsertResponse>;
  /** Adds one or more `NotionSecret` records to the collection */
  insertIntoNotionSecretCollection?: Maybe<NotionSecretInsertResponse>;
  /** Adds one or more `NotionUser` records to the collection */
  insertIntoNotionUserCollection?: Maybe<NotionUserInsertResponse>;
  /** Updates zero or more records in the `NotionPage` collection */
  updateNotionPageCollection: NotionPageUpdateResponse;
  /** Updates zero or more records in the `NotionSecret` collection */
  updateNotionSecretCollection: NotionSecretUpdateResponse;
  /** Updates zero or more records in the `NotionUser` collection */
  updateNotionUserCollection: NotionUserUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromNotionPageCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotionPageFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromNotionSecretCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotionSecretFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromNotionUserCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotionUserFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoNotionPageCollectionArgs = {
  objects: Array<NotionPageInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoNotionSecretCollectionArgs = {
  objects: Array<NotionSecretInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoNotionUserCollectionArgs = {
  objects: Array<NotionUserInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateNotionPageCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotionPageFilter>;
  set: NotionPageUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateNotionSecretCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotionSecretFilter>;
  set: NotionSecretUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateNotionUserCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotionUserFilter>;
  set: NotionUserUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

export type NotionPage = Node & {
  __typename?: 'NotionPage';
  created_at: Scalars['Datetime']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  notionUser?: Maybe<NotionUser>;
  page_id: Scalars['String']['output'];
  user_id: Scalars['UUID']['output'];
  workspace_icon: Scalars['String']['output'];
  workspace_id: Scalars['String']['output'];
  workspace_name: Scalars['String']['output'];
};

export type NotionPageConnection = {
  __typename?: 'NotionPageConnection';
  edges: Array<NotionPageEdge>;
  pageInfo: PageInfo;
};

export type NotionPageDeleteResponse = {
  __typename?: 'NotionPageDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<NotionPage>;
};

export type NotionPageEdge = {
  __typename?: 'NotionPageEdge';
  cursor: Scalars['String']['output'];
  node: NotionPage;
};

export type NotionPageFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<NotionPageFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<NotionPageFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<NotionPageFilter>>;
  page_id?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<UuidFilter>;
  workspace_icon?: InputMaybe<StringFilter>;
  workspace_id?: InputMaybe<StringFilter>;
  workspace_name?: InputMaybe<StringFilter>;
};

export type NotionPageInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  page_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
  workspace_icon?: InputMaybe<Scalars['String']['input']>;
  workspace_id?: InputMaybe<Scalars['String']['input']>;
  workspace_name?: InputMaybe<Scalars['String']['input']>;
};

export type NotionPageInsertResponse = {
  __typename?: 'NotionPageInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<NotionPage>;
};

export type NotionPageOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  page_id?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
  workspace_icon?: InputMaybe<OrderByDirection>;
  workspace_id?: InputMaybe<OrderByDirection>;
  workspace_name?: InputMaybe<OrderByDirection>;
};

export type NotionPageUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  page_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
  workspace_icon?: InputMaybe<Scalars['String']['input']>;
  workspace_id?: InputMaybe<Scalars['String']['input']>;
  workspace_name?: InputMaybe<Scalars['String']['input']>;
};

export type NotionPageUpdateResponse = {
  __typename?: 'NotionPageUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<NotionPage>;
};

export type NotionSecret = Node & {
  __typename?: 'NotionSecret';
  access_token: Scalars['String']['output'];
  created_at: Scalars['Datetime']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  notionUser?: Maybe<NotionUser>;
  user_id: Scalars['UUID']['output'];
};

export type NotionSecretConnection = {
  __typename?: 'NotionSecretConnection';
  edges: Array<NotionSecretEdge>;
  pageInfo: PageInfo;
};

export type NotionSecretDeleteResponse = {
  __typename?: 'NotionSecretDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<NotionSecret>;
};

export type NotionSecretEdge = {
  __typename?: 'NotionSecretEdge';
  cursor: Scalars['String']['output'];
  node: NotionSecret;
};

export type NotionSecretFilter = {
  access_token?: InputMaybe<StringFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<NotionSecretFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<NotionSecretFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<NotionSecretFilter>>;
  user_id?: InputMaybe<UuidFilter>;
};

export type NotionSecretInsertInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type NotionSecretInsertResponse = {
  __typename?: 'NotionSecretInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<NotionSecret>;
};

export type NotionSecretOrderBy = {
  access_token?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type NotionSecretUpdateInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type NotionSecretUpdateResponse = {
  __typename?: 'NotionSecretUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<NotionSecret>;
};

export type NotionUser = Node & {
  __typename?: 'NotionUser';
  avatar_url?: Maybe<Scalars['String']['output']>;
  bot_id: Scalars['String']['output'];
  created_at: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  notionPage?: Maybe<NotionPage>;
  notionSecret?: Maybe<NotionSecret>;
  notion_uid: Scalars['String']['output'];
};

export type NotionUserConnection = {
  __typename?: 'NotionUserConnection';
  edges: Array<NotionUserEdge>;
  pageInfo: PageInfo;
};

export type NotionUserDeleteResponse = {
  __typename?: 'NotionUserDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<NotionUser>;
};

export type NotionUserEdge = {
  __typename?: 'NotionUserEdge';
  cursor: Scalars['String']['output'];
  node: NotionUser;
};

export type NotionUserFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<NotionUserFilter>>;
  avatar_url?: InputMaybe<StringFilter>;
  bot_id?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<NotionUserFilter>;
  notion_uid?: InputMaybe<StringFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<NotionUserFilter>>;
};

export type NotionUserInsertInput = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  bot_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notion_uid?: InputMaybe<Scalars['String']['input']>;
};

export type NotionUserInsertResponse = {
  __typename?: 'NotionUserInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<NotionUser>;
};

export type NotionUserOrderBy = {
  avatar_url?: InputMaybe<OrderByDirection>;
  bot_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  notion_uid?: InputMaybe<OrderByDirection>;
};

export type NotionUserUpdateInput = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  bot_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notion_uid?: InputMaybe<Scalars['String']['input']>;
};

export type NotionUserUpdateResponse = {
  __typename?: 'NotionUserUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<NotionUser>;
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `NotionPage` */
  notionPageCollection?: Maybe<NotionPageConnection>;
  /** A pagable collection of type `NotionSecret` */
  notionSecretCollection?: Maybe<NotionSecretConnection>;
  /** A pagable collection of type `NotionUser` */
  notionUserCollection?: Maybe<NotionUserConnection>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryNotionPageCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NotionPageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NotionPageOrderBy>>;
};


/** The root type for querying data */
export type QueryNotionSecretCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NotionSecretFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NotionSecretOrderBy>>;
};


/** The root type for querying data */
export type QueryNotionUserCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NotionUserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NotionUserOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
  containedBy?: InputMaybe<Array<Scalars['String']['input']>>;
  contains?: InputMaybe<Array<Scalars['String']['input']>>;
  eq?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Time']['input']>>;
  contains?: InputMaybe<Array<Scalars['Time']['input']>>;
  eq?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Time']['input']>>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
  containedBy?: InputMaybe<Array<Scalars['UUID']['input']>>;
  contains?: InputMaybe<Array<Scalars['UUID']['input']>>;
  eq?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['UUID']['input']>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Node: ( NotionPage ) | ( NotionSecret ) | ( NotionUser );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BigFloat: ResolverTypeWrapper<Scalars['BigFloat']['output']>;
  BigFloatFilter: BigFloatFilter;
  BigFloatListFilter: BigFloatListFilter;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BigIntFilter: BigIntFilter;
  BigIntListFilter: BigIntListFilter;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BooleanFilter: BooleanFilter;
  BooleanListFilter: BooleanListFilter;
  Cursor: ResolverTypeWrapper<Scalars['Cursor']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateFilter: DateFilter;
  DateListFilter: DateListFilter;
  Datetime: ResolverTypeWrapper<Scalars['Datetime']['output']>;
  DatetimeFilter: DatetimeFilter;
  DatetimeListFilter: DatetimeListFilter;
  FilterIs: FilterIs;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FloatFilter: FloatFilter;
  FloatListFilter: FloatListFilter;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IDFilter: IdFilter;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  IntFilter: IntFilter;
  IntListFilter: IntListFilter;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  NotionPage: ResolverTypeWrapper<NotionPage>;
  NotionPageConnection: ResolverTypeWrapper<NotionPageConnection>;
  NotionPageDeleteResponse: ResolverTypeWrapper<NotionPageDeleteResponse>;
  NotionPageEdge: ResolverTypeWrapper<NotionPageEdge>;
  NotionPageFilter: NotionPageFilter;
  NotionPageInsertInput: NotionPageInsertInput;
  NotionPageInsertResponse: ResolverTypeWrapper<NotionPageInsertResponse>;
  NotionPageOrderBy: NotionPageOrderBy;
  NotionPageUpdateInput: NotionPageUpdateInput;
  NotionPageUpdateResponse: ResolverTypeWrapper<NotionPageUpdateResponse>;
  NotionSecret: ResolverTypeWrapper<NotionSecret>;
  NotionSecretConnection: ResolverTypeWrapper<NotionSecretConnection>;
  NotionSecretDeleteResponse: ResolverTypeWrapper<NotionSecretDeleteResponse>;
  NotionSecretEdge: ResolverTypeWrapper<NotionSecretEdge>;
  NotionSecretFilter: NotionSecretFilter;
  NotionSecretInsertInput: NotionSecretInsertInput;
  NotionSecretInsertResponse: ResolverTypeWrapper<NotionSecretInsertResponse>;
  NotionSecretOrderBy: NotionSecretOrderBy;
  NotionSecretUpdateInput: NotionSecretUpdateInput;
  NotionSecretUpdateResponse: ResolverTypeWrapper<NotionSecretUpdateResponse>;
  NotionUser: ResolverTypeWrapper<NotionUser>;
  NotionUserConnection: ResolverTypeWrapper<NotionUserConnection>;
  NotionUserDeleteResponse: ResolverTypeWrapper<NotionUserDeleteResponse>;
  NotionUserEdge: ResolverTypeWrapper<NotionUserEdge>;
  NotionUserFilter: NotionUserFilter;
  NotionUserInsertInput: NotionUserInsertInput;
  NotionUserInsertResponse: ResolverTypeWrapper<NotionUserInsertResponse>;
  NotionUserOrderBy: NotionUserOrderBy;
  NotionUserUpdateInput: NotionUserUpdateInput;
  NotionUserUpdateResponse: ResolverTypeWrapper<NotionUserUpdateResponse>;
  Opaque: ResolverTypeWrapper<Scalars['Opaque']['output']>;
  OpaqueFilter: OpaqueFilter;
  OrderByDirection: OrderByDirection;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  StringFilter: StringFilter;
  StringListFilter: StringListFilter;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  TimeFilter: TimeFilter;
  TimeListFilter: TimeListFilter;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UUIDFilter: UuidFilter;
  UUIDListFilter: UuidListFilter;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BigFloat: Scalars['BigFloat']['output'];
  BigFloatFilter: BigFloatFilter;
  BigFloatListFilter: BigFloatListFilter;
  BigInt: Scalars['BigInt']['output'];
  BigIntFilter: BigIntFilter;
  BigIntListFilter: BigIntListFilter;
  Boolean: Scalars['Boolean']['output'];
  BooleanFilter: BooleanFilter;
  BooleanListFilter: BooleanListFilter;
  Cursor: Scalars['Cursor']['output'];
  Date: Scalars['Date']['output'];
  DateFilter: DateFilter;
  DateListFilter: DateListFilter;
  Datetime: Scalars['Datetime']['output'];
  DatetimeFilter: DatetimeFilter;
  DatetimeListFilter: DatetimeListFilter;
  Float: Scalars['Float']['output'];
  FloatFilter: FloatFilter;
  FloatListFilter: FloatListFilter;
  ID: Scalars['ID']['output'];
  IDFilter: IdFilter;
  Int: Scalars['Int']['output'];
  IntFilter: IntFilter;
  IntListFilter: IntListFilter;
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  NotionPage: NotionPage;
  NotionPageConnection: NotionPageConnection;
  NotionPageDeleteResponse: NotionPageDeleteResponse;
  NotionPageEdge: NotionPageEdge;
  NotionPageFilter: NotionPageFilter;
  NotionPageInsertInput: NotionPageInsertInput;
  NotionPageInsertResponse: NotionPageInsertResponse;
  NotionPageOrderBy: NotionPageOrderBy;
  NotionPageUpdateInput: NotionPageUpdateInput;
  NotionPageUpdateResponse: NotionPageUpdateResponse;
  NotionSecret: NotionSecret;
  NotionSecretConnection: NotionSecretConnection;
  NotionSecretDeleteResponse: NotionSecretDeleteResponse;
  NotionSecretEdge: NotionSecretEdge;
  NotionSecretFilter: NotionSecretFilter;
  NotionSecretInsertInput: NotionSecretInsertInput;
  NotionSecretInsertResponse: NotionSecretInsertResponse;
  NotionSecretOrderBy: NotionSecretOrderBy;
  NotionSecretUpdateInput: NotionSecretUpdateInput;
  NotionSecretUpdateResponse: NotionSecretUpdateResponse;
  NotionUser: NotionUser;
  NotionUserConnection: NotionUserConnection;
  NotionUserDeleteResponse: NotionUserDeleteResponse;
  NotionUserEdge: NotionUserEdge;
  NotionUserFilter: NotionUserFilter;
  NotionUserInsertInput: NotionUserInsertInput;
  NotionUserInsertResponse: NotionUserInsertResponse;
  NotionUserOrderBy: NotionUserOrderBy;
  NotionUserUpdateInput: NotionUserUpdateInput;
  NotionUserUpdateResponse: NotionUserUpdateResponse;
  Opaque: Scalars['Opaque']['output'];
  OpaqueFilter: OpaqueFilter;
  PageInfo: PageInfo;
  Query: {};
  String: Scalars['String']['output'];
  StringFilter: StringFilter;
  StringListFilter: StringListFilter;
  Time: Scalars['Time']['output'];
  TimeFilter: TimeFilter;
  TimeListFilter: TimeListFilter;
  UUID: Scalars['UUID']['output'];
  UUIDFilter: UuidFilter;
  UUIDListFilter: UuidListFilter;
};

export interface BigFloatScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigFloat'], any> {
  name: 'BigFloat';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface CursorScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Cursor'], any> {
  name: 'Cursor';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DatetimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Datetime'], any> {
  name: 'Datetime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  deleteFromNotionPageCollection?: Resolver<ResolversTypes['NotionPageDeleteResponse'], ParentType, ContextType, RequireFields<MutationDeleteFromNotionPageCollectionArgs, 'atMost'>>;
  deleteFromNotionSecretCollection?: Resolver<ResolversTypes['NotionSecretDeleteResponse'], ParentType, ContextType, RequireFields<MutationDeleteFromNotionSecretCollectionArgs, 'atMost'>>;
  deleteFromNotionUserCollection?: Resolver<ResolversTypes['NotionUserDeleteResponse'], ParentType, ContextType, RequireFields<MutationDeleteFromNotionUserCollectionArgs, 'atMost'>>;
  insertIntoNotionPageCollection?: Resolver<Maybe<ResolversTypes['NotionPageInsertResponse']>, ParentType, ContextType, RequireFields<MutationInsertIntoNotionPageCollectionArgs, 'objects'>>;
  insertIntoNotionSecretCollection?: Resolver<Maybe<ResolversTypes['NotionSecretInsertResponse']>, ParentType, ContextType, RequireFields<MutationInsertIntoNotionSecretCollectionArgs, 'objects'>>;
  insertIntoNotionUserCollection?: Resolver<Maybe<ResolversTypes['NotionUserInsertResponse']>, ParentType, ContextType, RequireFields<MutationInsertIntoNotionUserCollectionArgs, 'objects'>>;
  updateNotionPageCollection?: Resolver<ResolversTypes['NotionPageUpdateResponse'], ParentType, ContextType, RequireFields<MutationUpdateNotionPageCollectionArgs, 'atMost' | 'set'>>;
  updateNotionSecretCollection?: Resolver<ResolversTypes['NotionSecretUpdateResponse'], ParentType, ContextType, RequireFields<MutationUpdateNotionSecretCollectionArgs, 'atMost' | 'set'>>;
  updateNotionUserCollection?: Resolver<ResolversTypes['NotionUserUpdateResponse'], ParentType, ContextType, RequireFields<MutationUpdateNotionUserCollectionArgs, 'atMost' | 'set'>>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'NotionPage' | 'NotionSecret' | 'NotionUser', ParentType, ContextType>;
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type NotionPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionPage'] = ResolversParentTypes['NotionPage']> = {
  created_at?: Resolver<ResolversTypes['Datetime'], ParentType, ContextType>;
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notionUser?: Resolver<Maybe<ResolversTypes['NotionUser']>, ParentType, ContextType>;
  page_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  workspace_icon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workspace_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workspace_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionPageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionPageConnection'] = ResolversParentTypes['NotionPageConnection']> = {
  edges?: Resolver<Array<ResolversTypes['NotionPageEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionPageDeleteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionPageDeleteResponse'] = ResolversParentTypes['NotionPageDeleteResponse']> = {
  affectedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  records?: Resolver<Array<ResolversTypes['NotionPage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionPageEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionPageEdge'] = ResolversParentTypes['NotionPageEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['NotionPage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionPageInsertResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionPageInsertResponse'] = ResolversParentTypes['NotionPageInsertResponse']> = {
  affectedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  records?: Resolver<Array<ResolversTypes['NotionPage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionPageUpdateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionPageUpdateResponse'] = ResolversParentTypes['NotionPageUpdateResponse']> = {
  affectedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  records?: Resolver<Array<ResolversTypes['NotionPage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionSecretResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionSecret'] = ResolversParentTypes['NotionSecret']> = {
  access_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Datetime'], ParentType, ContextType>;
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notionUser?: Resolver<Maybe<ResolversTypes['NotionUser']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionSecretConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionSecretConnection'] = ResolversParentTypes['NotionSecretConnection']> = {
  edges?: Resolver<Array<ResolversTypes['NotionSecretEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionSecretDeleteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionSecretDeleteResponse'] = ResolversParentTypes['NotionSecretDeleteResponse']> = {
  affectedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  records?: Resolver<Array<ResolversTypes['NotionSecret']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionSecretEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionSecretEdge'] = ResolversParentTypes['NotionSecretEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['NotionSecret'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionSecretInsertResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionSecretInsertResponse'] = ResolversParentTypes['NotionSecretInsertResponse']> = {
  affectedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  records?: Resolver<Array<ResolversTypes['NotionSecret']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionSecretUpdateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionSecretUpdateResponse'] = ResolversParentTypes['NotionSecretUpdateResponse']> = {
  affectedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  records?: Resolver<Array<ResolversTypes['NotionSecret']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionUser'] = ResolversParentTypes['NotionUser']> = {
  avatar_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bot_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['Datetime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nodeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notionPage?: Resolver<Maybe<ResolversTypes['NotionPage']>, ParentType, ContextType>;
  notionSecret?: Resolver<Maybe<ResolversTypes['NotionSecret']>, ParentType, ContextType>;
  notion_uid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionUserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionUserConnection'] = ResolversParentTypes['NotionUserConnection']> = {
  edges?: Resolver<Array<ResolversTypes['NotionUserEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionUserDeleteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionUserDeleteResponse'] = ResolversParentTypes['NotionUserDeleteResponse']> = {
  affectedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  records?: Resolver<Array<ResolversTypes['NotionUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionUserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionUserEdge'] = ResolversParentTypes['NotionUserEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['NotionUser'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionUserInsertResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionUserInsertResponse'] = ResolversParentTypes['NotionUserInsertResponse']> = {
  affectedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  records?: Resolver<Array<ResolversTypes['NotionUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotionUserUpdateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotionUserUpdateResponse'] = ResolversParentTypes['NotionUserUpdateResponse']> = {
  affectedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  records?: Resolver<Array<ResolversTypes['NotionUser']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface OpaqueScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Opaque'], any> {
  name: 'Opaque';
}

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'nodeId'>>;
  notionPageCollection?: Resolver<Maybe<ResolversTypes['NotionPageConnection']>, ParentType, ContextType, Partial<QueryNotionPageCollectionArgs>>;
  notionSecretCollection?: Resolver<Maybe<ResolversTypes['NotionSecretConnection']>, ParentType, ContextType, Partial<QueryNotionSecretCollectionArgs>>;
  notionUserCollection?: Resolver<Maybe<ResolversTypes['NotionUserConnection']>, ParentType, ContextType, Partial<QueryNotionUserCollectionArgs>>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type Resolvers<ContextType = any> = {
  BigFloat?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Cursor?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  Datetime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NotionPage?: NotionPageResolvers<ContextType>;
  NotionPageConnection?: NotionPageConnectionResolvers<ContextType>;
  NotionPageDeleteResponse?: NotionPageDeleteResponseResolvers<ContextType>;
  NotionPageEdge?: NotionPageEdgeResolvers<ContextType>;
  NotionPageInsertResponse?: NotionPageInsertResponseResolvers<ContextType>;
  NotionPageUpdateResponse?: NotionPageUpdateResponseResolvers<ContextType>;
  NotionSecret?: NotionSecretResolvers<ContextType>;
  NotionSecretConnection?: NotionSecretConnectionResolvers<ContextType>;
  NotionSecretDeleteResponse?: NotionSecretDeleteResponseResolvers<ContextType>;
  NotionSecretEdge?: NotionSecretEdgeResolvers<ContextType>;
  NotionSecretInsertResponse?: NotionSecretInsertResponseResolvers<ContextType>;
  NotionSecretUpdateResponse?: NotionSecretUpdateResponseResolvers<ContextType>;
  NotionUser?: NotionUserResolvers<ContextType>;
  NotionUserConnection?: NotionUserConnectionResolvers<ContextType>;
  NotionUserDeleteResponse?: NotionUserDeleteResponseResolvers<ContextType>;
  NotionUserEdge?: NotionUserEdgeResolvers<ContextType>;
  NotionUserInsertResponse?: NotionUserInsertResponseResolvers<ContextType>;
  NotionUserUpdateResponse?: NotionUserUpdateResponseResolvers<ContextType>;
  Opaque?: GraphQLScalarType;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Time?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
};


export type GetUserByIdQueryVariables = Exact<{
  arg: Scalars['UUID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', notionUserCollection?: { __typename?: 'NotionUserConnection', edges: Array<{ __typename?: 'NotionUserEdge', node: { __typename?: 'NotionUser', id: any, name?: string | null, bot_id: string, avatar_url?: string | null, notion_uid: string, notionPage?: { __typename?: 'NotionPage', page_id: string, workspace_id: string, workspace_icon: string, workspace_name: string } | null } }> } | null };
