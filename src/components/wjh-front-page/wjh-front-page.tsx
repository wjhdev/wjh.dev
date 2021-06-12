import { Component, h, Prop, State } from "@stencil/core";
import { Post, Page, SingleQuery, PageQueryArgs, Query } from "@webpress/core";

@Component({
  tag: "wjh-front-page",
  styleUrl: "wjh-front-page.scss",
})
export class WJHFrontPage {
  @Prop() query: SingleQuery<Page>;

  @State() page: Page;
  @State() webpressPage: Page;
  @State() blogPage: Page;
  @State() blogPosts: Post[];

  async componentWillRender() {
    if (!this.query) {
      console.log("no query...");
      return;
    }

    this.page = await this.query.result;
    this.webpressPage = await new Query<Page>(
      this.query.connection,
      new PageQueryArgs({
        slug: "webpress",
      })
    ).result;
    this.blogPage = await new Query<Page>(
      this.query.connection,
      new PageQueryArgs({
        slug: "updates",
      })
    ).result;
    this.blogPosts = await new Query<Post>(
      this.query.connection,
      Post.QueryArgs({})
    ).results;

    console.log("webpress page", this.webpressPage);
  }

  render() {
    if (!this.page) {
      console.log("no page...");
      return;
    }
    return [
      <wjh-grid class="welcome">
        <wp-title slot="left" class="col-3" post={this.page} />
        <wp-running-copy slot="right" class="col-6" post={this.page} />
      </wjh-grid>,
      <wjh-grid class="welcome">
        <wp-title slot="left" class="col-3" post={this.webpressPage} />
        <div slot="right" class="col-6">
          <wp-excerpt-copy post={this.webpressPage}></wp-excerpt-copy>
          <p>
            <wp-link object={this.webpressPage}>Learn More</wp-link>
          </p>
        </div>
      </wjh-grid>,
      <wjh-grid class="welcome blog">
        <wp-title slot="left" class="col-3" post={this.blogPage} />
        <div slot="right" class="col-6">
          {this.blogPosts.map((post) => (
            <div class="post">
              <wp-link object={post}>
                <wp-title el="h2" post={post} />
              </wp-link>
              <wp-date post={post} />
            </div>
          ))}

          <p>
            <wp-link object={this.blogPage}>More</wp-link>
          </p>
        </div>
      </wjh-grid>,
    ];
  }
}
