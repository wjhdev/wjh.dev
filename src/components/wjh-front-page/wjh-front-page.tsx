import { Component, h, Prop,State  } from '@stencil/core';
import { Query, Single, TemplateType, TemplateSingleType, Post } from '@webpress/core';

@Component({
  tag: 'wjh-front-page',
  styleUrl: 'wjh-front-page.scss',
})
export class WJHFrontPage {
  @Prop() query: Query 
  @State() post: Single

  @State() webpressPage: Single
  @State() blogPage: Single

  @State() blogPosts: Single[]

  async componentWillUpdate() {
    if (!this.post) {
      this.post = (await this.query.posts)[0]
    }

    if (!this.webpressPage) {
      let template = {
        type : TemplateType.Single,
        singleType: TemplateSingleType.Page,
        slug: "webpress"
      }
      this.webpressPage = (await this.query.connection.single(template))[0]
      console.log(this.webpressPage)
    }

    if (!this.blogPage) {
      let template = {
        type : TemplateType.Single,
        singleType: TemplateSingleType.Page,
        slug: "blog"
      }
      console.log("!!",await this.query.connection.single(template))
      this.blogPage = (await this.query.connection.single(template))[0]
      console.log(this.blogPage)
    }

    if (!this.blogPosts) {
      this.blogPosts = (await this.query.connection.getMulti("Posts",{
        args: undefined,
        type: Post
      }))
      console.log("!~",this.blogPosts)
    }

  }

  render() {
    if(!this.post) {
      return
    }
    return [
      <wjh-grid class="welcome">
        <wp-title slot="left" class="col-3" post={this.post} />
        <wp-running-copy slot="right" class="col-6" post={this.post} />
      </wjh-grid>,
      <wjh-grid class="welcome">
        <wp-title slot="left" class="col-3" post={this.webpressPage} />
        <div slot="right" class="col-6">
        <wp-excerpt-copy post={this.webpressPage}>

        </wp-excerpt-copy>
        <p><wp-link object={this.webpressPage}>Learn More</wp-link></p>
        </div>
      </wjh-grid>,
      <wjh-grid class="welcome blog">
        <wp-title slot="left" class="col-3" post={this.blogPage} />
        <div slot="right" class="col-6">
          
            {this.blogPosts.map(post => <div class="post">
              <wp-link object={post}><wp-title el="h2" post={post} /></wp-link>
              <wp-date post={post} />
              </div>
            )}
          
        <p><wp-link object={this.blogPage}>More</wp-link></p>
        </div>
      </wjh-grid>
    ]
  }
}
