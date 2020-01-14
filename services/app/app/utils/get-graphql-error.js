import { isPresent } from '@ember/utils';

const { isArray } = Array;

const handleNetworkError = (networkError) => {
  const { response, result } = networkError;
  const message = result.errors && isArray(result.errors) ? result.errors[0].message : 'Unknown fatal.';
  return new Error(`Network Error: ${response.statusText} (${response.status}): ${message}`);
};

export default (e) => {
  if (isPresent(e.errors) && isPresent(e.errors[0])) {
    const error = e.errors[0];
    if (error.result) {
      return handleNetworkError(error);
    }
    if (error.message) {
      return new Error(error.message);
    }
  }

  if (e.networkError) {
    return handleNetworkError(e.networkError);
  }
  if (e.graphQLErrors) {
    return e;
  }
  if (e.message) {
    return e;
  }
  return new Error('An unknown, fatal error occurred.');
};
