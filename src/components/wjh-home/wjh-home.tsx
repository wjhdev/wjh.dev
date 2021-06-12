import { Component, h, Prop } from "@stencil/core";
import { Theme, Template } from "@webpress/core";

@Component({
  tag: "wjh-home",
  styleUrl: "wjh-home.scss",
})
export class WjhHome {
  @Prop() theme: Theme;
  @Prop() query: Template.Query;

  render() {
    if (!this.query) {
      return;
    }
    return [
      <wjh-header-ribbon color="#A2E75A"></wjh-header-ribbon>,
      <wp-router query={this.query}>
        <wp-template
          definition={{
            type: Template.TemplateType.FrontPage,
            frontPageType: Template.FrontPageType.Page,
          }}
          component="wjh-front-page"
        ></wp-template>
        <wp-template
          definition={{
            type: Template.TemplateType.Single,
          }}
          component="wjh-post"
        ></wp-template>
        <wp-template
          definition={{
            type: Template.TemplateType.Single,
            singleType: Template.SingleType.Page,
          }}
          component="wjh-page"
        ></wp-template>
        <wp-template
          definition={{ type: Template.TemplateType.PageNotFound }}
          component="wjh-404"
        ></wp-template>
        <wp-template
          definition={{ type: Template.TemplateType.Blog }}
          component="wjh-updates"
        ></wp-template>
      </wp-router>,
      <wjh-footer-ribbon color="#E85252"></wjh-footer-ribbon>,
    ];
  }
}
