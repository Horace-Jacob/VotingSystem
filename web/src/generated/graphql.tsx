import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type AccountErrorMap = {
  __typename?: 'AccountErrorMap';
  accounts?: Maybe<Account>;
  errors?: Maybe<Array<FieldError>>;
};

export type Admin = {
  __typename?: 'Admin';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type AdminErrorMap = {
  __typename?: 'AdminErrorMap';
  accounts?: Maybe<Admin>;
  errors?: Maybe<Array<FieldError>>;
};

export type CreateAccountFields = {
  email: Scalars['String'];
  password: Scalars['String'];
  secret: Scalars['String'];
  username: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: AdminErrorMap;
  adminRegister: AdminErrorMap;
  createAccount: AccountErrorMap;
  createRegion: RegionErrorMap;
  createSecret: SecretErrorMap;
  createTeam: Vote;
  login: AccountErrorMap;
  logout: Scalars['Boolean'];
  vote: Scalars['Boolean'];
};


export type MutationAdminLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationAdminRegisterArgs = {
  fields: CreateAccountFields;
};


export type MutationCreateAccountArgs = {
  fields: CreateAccountFields;
};


export type MutationCreateRegionArgs = {
  region: Scalars['String'];
};


export type MutationCreateSecretArgs = {
  permission: Scalars['String'];
  secret: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  regionId: Scalars['Int'];
  team: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVoteArgs = {
  team: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  accounts: Array<Account>;
  admin?: Maybe<Admin>;
  getRegions: Array<Region>;
  getTeam?: Maybe<Array<Vote>>;
  getVote: Array<Vote>;
  me?: Maybe<Account>;
  resetVote: Scalars['Boolean'];
};


export type QueryGetTeamArgs = {
  id: Scalars['Int'];
};

export type Region = {
  __typename?: 'Region';
  id: Scalars['Float'];
  region: Scalars['String'];
};

export type RegionErrorMap = {
  __typename?: 'RegionErrorMap';
  errors?: Maybe<Array<FieldError>>;
  regions?: Maybe<Region>;
};

export type Secret = {
  __typename?: 'Secret';
  id: Scalars['Float'];
  permission: Scalars['String'];
  secret: Scalars['Float'];
  set: Scalars['Boolean'];
};

export type SecretErrorMap = {
  __typename?: 'SecretErrorMap';
  errors?: Maybe<Array<FieldError>>;
  secrets?: Maybe<Secret>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['Float'];
  regionId: Scalars['Float'];
  regions: Region;
  team: Scalars['String'];
  vote: Scalars['Float'];
};

export type AdminResponseSnippetFragment = { __typename?: 'AdminErrorMap', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, accounts?: { __typename?: 'Admin', id: number, username: string } | null };

export type AdminSnippetFragment = { __typename?: 'Admin', id: number, username: string };

export type ErrorSnippetFragment = { __typename?: 'FieldError', field: string, message: string };

export type TeamSnippetFragment = { __typename?: 'Vote', id: number, regionId: number, team: string, vote: number };

export type UserResponseSnippetFragment = { __typename?: 'AccountErrorMap', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, accounts?: { __typename?: 'Account', id: number, username: string } | null };

export type UserSnippetFragment = { __typename?: 'Account', id: number, username: string };

export type AdminLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type AdminLoginMutation = { __typename?: 'Mutation', adminLogin: { __typename?: 'AdminErrorMap', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, accounts?: { __typename?: 'Admin', id: number, username: string } | null } };

export type AdminRegisterMutationVariables = Exact<{
  fields: CreateAccountFields;
}>;


export type AdminRegisterMutation = { __typename?: 'Mutation', adminRegister: { __typename?: 'AdminErrorMap', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, accounts?: { __typename?: 'Admin', id: number, username: string } | null } };

export type CreateTeamMutationVariables = Exact<{
  team: Scalars['String'];
  regionId: Scalars['Int'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Vote', id: number, regionId: number, team: string, vote: number } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccountErrorMap', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, accounts?: { __typename?: 'Account', id: number, username: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateAccountMutationVariables = Exact<{
  fields: CreateAccountFields;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'AccountErrorMap', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, accounts?: { __typename?: 'Account', id: number, username: string } | null } };

export type VoteMutationVariables = Exact<{
  team: Scalars['String'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type AdminQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminQuery = { __typename?: 'Query', admin?: { __typename?: 'Admin', id: number, username: string } | null };

export type GetVoteQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVoteQuery = { __typename?: 'Query', getVote: Array<{ __typename?: 'Vote', id: number, regionId: number, team: string, vote: number, regions: { __typename?: 'Region', id: number, region: string } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Account', id: number, username: string } | null };

export type RegionsQueryVariables = Exact<{ [key: string]: never; }>;


export type RegionsQuery = { __typename?: 'Query', getRegions: Array<{ __typename?: 'Region', id: number, region: string }> };

export type ResetVoteQueryVariables = Exact<{ [key: string]: never; }>;


export type ResetVoteQuery = { __typename?: 'Query', resetVote: boolean };

export type TeamQueryVariables = Exact<{
  getTeamId: Scalars['Int'];
}>;


export type TeamQuery = { __typename?: 'Query', getTeam?: Array<{ __typename?: 'Vote', id: number, regionId: number, team: string, vote: number }> | null };

export const ErrorSnippetFragmentDoc = gql`
    fragment ErrorSnippet on FieldError {
  field
  message
}
    `;
export const AdminSnippetFragmentDoc = gql`
    fragment AdminSnippet on Admin {
  id
  username
}
    `;
export const AdminResponseSnippetFragmentDoc = gql`
    fragment AdminResponseSnippet on AdminErrorMap {
  errors {
    ...ErrorSnippet
  }
  accounts {
    ...AdminSnippet
  }
}
    ${ErrorSnippetFragmentDoc}
${AdminSnippetFragmentDoc}`;
export const TeamSnippetFragmentDoc = gql`
    fragment TeamSnippet on Vote {
  id
  regionId
  team
  vote
}
    `;
export const UserSnippetFragmentDoc = gql`
    fragment UserSnippet on Account {
  id
  username
}
    `;
export const UserResponseSnippetFragmentDoc = gql`
    fragment UserResponseSnippet on AccountErrorMap {
  errors {
    ...ErrorSnippet
  }
  accounts {
    ...UserSnippet
  }
}
    ${ErrorSnippetFragmentDoc}
${UserSnippetFragmentDoc}`;
export const AdminLoginDocument = gql`
    mutation AdminLogin($email: String!, $password: String!) {
  adminLogin(email: $email, password: $password) {
    ...AdminResponseSnippet
  }
}
    ${AdminResponseSnippetFragmentDoc}`;

export function useAdminLoginMutation() {
  return Urql.useMutation<AdminLoginMutation, AdminLoginMutationVariables>(AdminLoginDocument);
};
export const AdminRegisterDocument = gql`
    mutation AdminRegister($fields: CreateAccountFields!) {
  adminRegister(fields: $fields) {
    ...AdminResponseSnippet
  }
}
    ${AdminResponseSnippetFragmentDoc}`;

export function useAdminRegisterMutation() {
  return Urql.useMutation<AdminRegisterMutation, AdminRegisterMutationVariables>(AdminRegisterDocument);
};
export const CreateTeamDocument = gql`
    mutation CreateTeam($team: String!, $regionId: Int!) {
  createTeam(team: $team, regionId: $regionId) {
    id
    regionId
    team
    vote
  }
}
    `;

export function useCreateTeamMutation() {
  return Urql.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...UserResponseSnippet
  }
}
    ${UserResponseSnippetFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const CreateAccountDocument = gql`
    mutation CreateAccount($fields: CreateAccountFields!) {
  createAccount(fields: $fields) {
    ...UserResponseSnippet
  }
}
    ${UserResponseSnippetFragmentDoc}`;

export function useCreateAccountMutation() {
  return Urql.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument);
};
export const VoteDocument = gql`
    mutation Vote($team: String!) {
  vote(team: $team)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const AdminDocument = gql`
    query Admin {
  admin {
    ...AdminSnippet
  }
}
    ${AdminSnippetFragmentDoc}`;

export function useAdminQuery(options?: Omit<Urql.UseQueryArgs<AdminQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminQuery>({ query: AdminDocument, ...options });
};
export const GetVoteDocument = gql`
    query GetVote {
  getVote {
    id
    regionId
    team
    vote
    regions {
      id
      region
    }
  }
}
    `;

export function useGetVoteQuery(options?: Omit<Urql.UseQueryArgs<GetVoteQueryVariables>, 'query'>) {
  return Urql.useQuery<GetVoteQuery>({ query: GetVoteDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserSnippet
  }
}
    ${UserSnippetFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const RegionsDocument = gql`
    query Regions {
  getRegions {
    id
    region
  }
}
    `;

export function useRegionsQuery(options?: Omit<Urql.UseQueryArgs<RegionsQueryVariables>, 'query'>) {
  return Urql.useQuery<RegionsQuery>({ query: RegionsDocument, ...options });
};
export const ResetVoteDocument = gql`
    query ResetVote {
  resetVote
}
    `;

export function useResetVoteQuery(options?: Omit<Urql.UseQueryArgs<ResetVoteQueryVariables>, 'query'>) {
  return Urql.useQuery<ResetVoteQuery>({ query: ResetVoteDocument, ...options });
};
export const TeamDocument = gql`
    query Team($getTeamId: Int!) {
  getTeam(id: $getTeamId) {
    ...TeamSnippet
  }
}
    ${TeamSnippetFragmentDoc}`;

export function useTeamQuery(options: Omit<Urql.UseQueryArgs<TeamQueryVariables>, 'query'>) {
  return Urql.useQuery<TeamQuery>({ query: TeamDocument, ...options });
};