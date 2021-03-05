import { Component, h, Prop,State  } from '@stencil/core';
import { Single, Page, SingleQuery } from '@webpress/core';

@Component({
  tag: 'wjh-front-page',
  styleUrl: 'wjh-front-page.scss',
})
export class WJHFrontPage {
  @Prop() query: SingleQuery<Page>
  @State() post: Single

  @State() webpressPage: Single
  @State() blogPage: Single

  @State() blogPosts: Single[]

  async componentWillRender() {
    if (!this.post && this.query) {
      this.post = await this.query.result
    }
  }

  render() {
    if (!this.post) {
      return
    }
    return [
      <wjh-grid class="welcome">
        <wp-title slot="left" class="col-3" post={this.post} />
        <wp-running-copy slot="right" class="col-6" post={this.post} />
      </wjh-grid>
    ]
  }
}
