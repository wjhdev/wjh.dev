import { Component, h, Prop, State } from "@stencil/core";
import { Query, Post, QueryContextual, Media, Author } from "@webpress/core";
import "@webpress/theme";
import "highlight.js";

@Component({
  tag: "wjh-post",
  styleUrl: "wjh-post.scss",
})
export class WJHPost implements QueryContextual {
  @Prop() query: Query<Post>;
  @State() post: Post;
  @State() feature: Media;
  @State() author: Author;

  async componentWillRender() {
    if (!this.query) {
      return;
    }
    console.log(this.query);
    this.post = await this.query.result;
    this.feature = await this.post.featuredMedia;
    this.author = await this.post.author;
  }

  render() {
    if (!this.query) {
      return;
    }
    return (
      <wjh-grid>
        <div slot="left" class="update right center col-7">
          <wp-media media={this.feature} class="feature-image" />
          <wp-title post={this.post} />
          <wp-subhead post={this.post} />
          <wp-running-copy post={this.post}></wp-running-copy>
        </div>
      </wjh-grid>
    );
  }
}
