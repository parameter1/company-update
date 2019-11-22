const name = 'config';

export function initialize(application) {
  application.inject('controller', name, `service:${name}`);
}

export default {
  name,
  initialize,
};
