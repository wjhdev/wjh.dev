import { Component, h, Prop  } from '@stencil/core';

@Component({
  tag: 'wjh-footer-ribbon',
  styleUrl: 'wjh-footer-ribbon.scss',
})
export class WJHFooterRibbon {
  @Prop() color: string
  render() {
    return [
      <wjh-grid><div slot="left" class="colophon"><b>Colophon</b> / &copy; 2020 <a href="https://twitter.com/wjhdev">Will Haynes</a> · Fonts <a href="https://typography.com">typography.com</a> · Powered by <a href="https://wordpress.org">WordPress</a> · Built with <a href="https://wjh.dev/webpress">webpress</a></div> </wjh-grid>,
      <div style={{"background": this.color}} class="ribbon" />
    ]
  }
}
