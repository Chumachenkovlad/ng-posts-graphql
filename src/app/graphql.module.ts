import { NgModule } from '@angular/core';

import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

import { AuthTokenService } from './../shared/services/auth-token.service';

const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here

export function createApollo(
  httpLink: HttpLink,
  authTokenService: AuthTokenService
) {
  const links: ApolloLink[] = [];

  if (authTokenService.check()) {
    const token = authTokenService.get();
    const auth = setContext((operation, context) => ({
      headers: {
        Authorization: `Bearer ${token}`
      }
    }));
    links.push(auth);
  }

  links.push(httpLink.create({ uri }));

  const link = ApolloLink.from(links);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthTokenService]
    }
  ]
})
export class GraphQLModule {}
