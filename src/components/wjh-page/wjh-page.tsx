import { Component, h, Prop, State } from "@stencil/core";
import { Query, Single, Author, Media, Page } from "@webpress/core";

@Component({
  tag: "wjh-page",
  styleUrl: "wjh-page.scss",
})
export class WJHPage {
  @Prop() query: Query<Page>;

  @State() post: Single;
  @State() author: Author;
  @State() feature: Media;

  async componentWillRender() {
    if (!this.query) {
      return;
    }
    this.post = await this.query.result;
    this.feature = await this.post.featuredMedia;
    // this.author = await this.post.author
  }

  render() {
    if (!this.post) {
      return;
    }
    return (
      <wjh-grid>
        <div slot="left">
          <wp-title post={this.post}></wp-title>
          <wp-media media={this.feature} class="feature-image" />
          <wp-running-copy post={this.post}></wp-running-copy>
          <div style={{ clear: "both" }} />
        </div>
      </wjh-grid>
    );
  }
}
