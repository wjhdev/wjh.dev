import { Component, h, Prop } from '@stencil/core';
import { Theme, TemplateQuery, TemplateType, TemplateFrontPageType, TemplateSingleType } from '@webpress/core';

@Component({
  tag: 'wjh-home',
  styleUrl: 'wjh-home.scss',
})
export class WjhHome {
  @Prop() theme : Theme
  @Prop() query : TemplateQuery

  render() {
    return (
      [
      <wjh-header-ribbon color="#A2E75A"></wjh-header-ribbon>,
      <wp-router query={this.query}>
        <wp-template args={ { type : TemplateType.FrontPage, frontPageType: TemplateFrontPageType.Page  } } component="wjh-front-page"></wp-template>
        <wp-template args={ { 
          type : TemplateType.Single
        } } component="wjh-post"></wp-template>
        <wp-template args={ { 
          type : TemplateType.Single,
          singleType: TemplateSingleType.Page 
        } }  component="wjh-page"></wp-template>
        <wp-template args={ { type : TemplateType.PageNotFound} }  component="wjh-404"></wp-template>
        <wp-template args={ { type : TemplateType.Blog} }  component="wjh-updates"></wp-template>
      </wp-router>,
      <wjh-footer-ribbon color="#E85252"></wjh-footer-ribbon>,
      ]
    )
  }
}
