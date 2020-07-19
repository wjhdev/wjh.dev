import { Component, h, Prop  } from '@stencil/core';

@Component({
  tag: 'wjh-footer-ribbon',
  styleUrl: 'wjh-footer-ribbon.scss',
})
export class WJHFooterRibbon {
  @Prop() color: string
  render() {
    return <div style={{"background": this.color}} />
  }
}
