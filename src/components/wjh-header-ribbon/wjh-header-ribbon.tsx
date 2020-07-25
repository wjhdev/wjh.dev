import { Component, h, Prop  } from '@stencil/core';

@Component({
  tag: 'wjh-header-ribbon',
  styleUrl: 'wjh-header-ribbon.scss',
})
export class WJHRibbon {
  @Prop() color: string
  render() {
    return [
      <div style={{"background": this.color}} class="ribbon" />,
      <wjh-grid>
        <h1 slot="left"><a href="/"><b>wjh.dev</b>/</a></h1>
      </wjh-grid>
    ]
  }
}
