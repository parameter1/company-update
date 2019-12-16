import Service from '@ember/service';

export default Service.extend({
  isShowing: false,
  show() {
    if (!this.get('isShowing')) {
      document.getElementsByTagName('body')[0].classList.add('transitioning');
      this.set('isShowing', true);
    }
  },
  hide() {
    window.setTimeout(() => {
      this.set('isShowing', false);
      document.getElementsByTagName('body')[0].classList.remove('transitioning');
    }, 100);
  },
});
