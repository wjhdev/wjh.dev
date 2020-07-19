import { Component, h, Prop,State  } from '@stencil/core';
import { Query, Single, TemplateType, TemplateSingleType } from '@webpress/core';

@Component({
  tag: 'wjh-front-page',
  styleUrl: 'wjh-front-page.scss',
})
export class WJHFrontPage {
  @Prop() query: Query 
  @State() post: Single

  @State() webpressPage: Single

  async componentWillUpdate() {
    if(!this.post) {
      this.post = (await this.query.posts)[0]
    }
    if(!this.webpressPage) {
      let template = {
        type : TemplateType.Single,
        singleType: TemplateSingleType.Page,
        slug: "webpress"
      }
      this.webpressPage = (await this.query.connection.single(template))[0]
      console.log(this.webpressPage)
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
        <wp-link object={this.webpressPage}>Learn More</wp-link>
        </div>
      </wjh-grid>
    ]
  }
}
