const name = 'notify';

export function initialize(application) {
  application.inject('controller', name, `service:${name}`);
  application.inject('component', name, `service:${name}`);
}

export default {
  name,
  initialize,
};
