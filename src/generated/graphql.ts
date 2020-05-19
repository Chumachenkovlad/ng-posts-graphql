import { Injectable } from '@angular/core';

import * as Apollo from 'apollo-angular';
import gql from 'graphql-tag';

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface AuthPayload {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  expires: Scalars['String'];
  user: User;
}

export interface LoginInput {
  email: Scalars['String'];
  password: Scalars['String'];
}

export interface Mutation {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  login: AuthPayload;
  register: AuthPayload;
  createPost: Post;
  updatePost: Post;
}

export interface MutationCreateUserArgs {
  entityDto: UserInput;
}

export interface MutationUpdateUserArgs {
  entityDto: UserInput;
  id: Scalars['Int'];
}

export interface MutationLoginArgs {
  loginInput: LoginInput;
}

export interface MutationRegisterArgs {
  registerInput: RegisterInput;
}

export interface MutationCreatePostArgs {
  postDto: PostInput;
}

export interface MutationUpdatePostArgs {
  entityDto: PostInput;
  id: Scalars['Int'];
}

export interface PaginationDto {
  __typename?: 'PaginationDto';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}

export interface PaginationInput {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
}

export interface Post {
  __typename?: 'Post';
  id: Scalars['Int'];
  title: Scalars['String'];
  body: Scalars['String'];
  authorId: Scalars['Int'];
}

export interface PostEntitiesListRes {
  __typename?: 'PostEntitiesListRes';
  filter?: Maybe<PostsFilterType>;
  rows?: Maybe<Array<Post>>;
  sorting?: Maybe<SortingType>;
  pagination?: Maybe<PaginationDto>;
}

export interface PostInput {
  title: Scalars['String'];
  body: Scalars['String'];
}

export interface PostsFilterInput {
  authorId: Scalars['Int'];
}

export interface PostsFilterType {
  __typename?: 'PostsFilterType';
  authorId: Scalars['Int'];
}

export interface Query {
  __typename?: 'Query';
  findAllUser: UserEntitiesListRes;
  getUser: User;
  getUserSelf: User;
  findAllPost: PostEntitiesListRes;
  getPost: Post;
}

export interface QueryFindAllUserArgs {
  pagination: PaginationInput;
  sorting: SortingInput;
  filter?: Maybe<UsersFilterInput>;
}

export interface QueryGetUserArgs {
  id: Scalars['Int'];
}

export interface QueryFindAllPostArgs {
  pagination: PaginationInput;
  sorting: SortingInput;
  filter?: Maybe<PostsFilterInput>;
}

export interface QueryGetPostArgs {
  id: Scalars['Int'];
}

export interface RegisterInput {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}

export interface SortingInput {
  prop: Scalars['String'];
  direction: Scalars['String'];
}

export interface SortingType {
  __typename?: 'SortingType';
  prop: Scalars['String'];
  direction: Scalars['String'];
}

export interface User {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
}

export interface UserEntitiesListRes {
  __typename?: 'UserEntitiesListRes';
  filter?: Maybe<UsersFilterType>;
  rows?: Maybe<Array<User>>;
  sorting?: Maybe<SortingType>;
  pagination?: Maybe<PaginationDto>;
}

export interface UserInput {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}

export interface UsersFilterInput {
  email: Scalars['String'];
}

export interface UsersFilterType {
  __typename?: 'UsersFilterType';
  email: Scalars['String'];
}

export type UserFragmentFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'email' | 'username'
>;

export interface LoginMutationVariables {
  loginInput: LoginInput;
}

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'AuthPayload' } & Pick<
    AuthPayload,
    'token' | 'expires'
  > & { user: { __typename?: 'User' } & UserFragmentFragment };
};

export interface RegisterMutationVariables {
  registerInput: RegisterInput;
}

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'AuthPayload' } & Pick<
    AuthPayload,
    'token' | 'expires'
  > & { user: { __typename?: 'User' } & UserFragmentFragment };
};

export interface GetUserSelfQueryVariables {}

export type GetUserSelfQuery = { __typename?: 'Query' } & {
  getUserSelf: { __typename?: 'User' } & UserFragmentFragment;
};

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    email
    username
  }
`;
export const LoginDocument = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      expires
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class LoginMutationService extends Apollo.Mutation<
  LoginMutation,
  LoginMutationVariables
> {
  document = LoginDocument;
}
export const RegisterDocument = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      token
      expires
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class RegisterMutationService extends Apollo.Mutation<
  RegisterMutation,
  RegisterMutationVariables
> {
  document = RegisterDocument;
}
export const GetUserSelfDocument = gql`
  query GetUserSelf {
    getUserSelf {
      ...UserFragment
    }
  }
  ${UserFragmentFragmentDoc}
`;

@Injectable({ providedIn: 'root' })
export class GetUserSelfQueryService extends Apollo.Query<
  GetUserSelfQuery,
  GetUserSelfQueryVariables
> {
  document = GetUserSelfDocument;
}
