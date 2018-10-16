import Service from '@ember/service';
import { set } from '@ember/object';

export default Service.extend({
  load(data) {
    Object.keys(data).forEach(key => set(this, key, data[key]));
  },
});
