export function initialize(application) {
  application.inject('controller', 'notify', 'service:notify');
  application.inject('component', 'notify', 'service:notify');
}

export default {
  name: 'inject-notify',
  initialize
};
