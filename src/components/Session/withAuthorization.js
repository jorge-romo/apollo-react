import React from 'react';
import { Query } from '@apollo/react-components';
import { Redirect } from 'react-router-dom';

import * as routes from '../../constants/routes';
import { GET_ME } from './queries';

const withAuthorization = conditionFn => Component => props => (
  <Query query={GET_ME}>
    {({ data, networkStatus }) => {
      if (networkStatus < 7) {
        return null;
      }

      return conditionFn(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to={routes.SIGN_IN} />
      );
    }}
  </Query>
);

export default withAuthorization; // HOC(Higher Order Component) for authorization.

// data structure
// {
//   me {
//   ...
//   if(data && data.me) 