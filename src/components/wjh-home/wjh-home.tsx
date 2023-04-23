import { Component, h, Prop } from "@stencil/core";
import { Theme, Template, Query } from "@webpress/core";
import { Hierarchy } from "@webpress/router";

@Component({
  tag: "wjh-home",
  styleUrl: "wjh-home.scss",
})
export class WjhHome {
  @Prop() theme: Theme;
  @Prop() query: Query<Template>;

  render() {
    let hiearchy: Hierarchy.TemplateHierarchy = {
      index: {
        component: "bhaa-main",
      },
      frontPage: {
        component: "wjh-front-page",
      },
      archive: {
        component: "bhaa-main",
        props: {
          slug: "updates",
        },
      },
      error404: {
        component: "wjh-404",
      },
      blogPage: {
        component: "wjh-updates",
      },
      singular: {
        post: {
          component: "wjh-post",
        },
        page: {
          component: "wjh-page",
        },
      },
    };
    return [
      <wjh-header-ribbon color="#A2E75A"></wjh-header-ribbon>,
      <wp-router-two query={this.query} hiearchy={hiearchy} />,
      <wjh-footer-ribbon color="#E85252"></wjh-footer-ribbon>,
    ];
  }
}
