import { Component, h } from '@stencil/core';

@Component({
  tag: 'wjh-home',
  styleUrl: 'wjh-home.scss',
})
export class WjhHome {
  render() {
    return [
      <div class="header">
        <wjh-grid><div class="header-content">wjh.dev</div></wjh-grid>
      </div>
      ,
      <wjh-grid>
        <div class="section">
          <h1>👋 I'm Will Haynes</h1>
          <p>I’ve been designing and developing websites and apps for over 10 years</p>
          <hr />
          <p>My 9-5 is in healthcare building iOS and Android apps for nurses</p>
          <p>By night I’m currently working on a better way to build WordPress themes with web components</p>
          <hr />
          <p><a href="https://twitter.com/wjhdev">Twitter</a> · <a href="https://github.com/wjhdev">Github</a></p>
        </div>
      </wjh-grid>
    ]
  }
}
