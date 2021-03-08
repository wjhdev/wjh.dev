import { Component, h, Prop, Listen, State } from '@stencil/core';
import { Query, Single, Post } from '@webpress/core';

@Component({
  tag: 'wjh-updates',
  styleUrl: 'wjh-updates.scss',
})
export class WJHUpdates {
  @Prop() query: Query<Post>
  @State() mobile : boolean = false;

  private posts : Single[]

  async componentWillRender() {
    if(!this.query) {
      return
    }

    this.posts = await this.query.results
    console.log("posty posts", this.posts)
  }

  @Listen('breakpointChanged', { target: "document" })
  breakpointChanged(event : CustomEvent<number>) {
    this.mobile = (event.detail === 1)
  }

  renderSidebar() {
    return <div slot="left">sidebar...</div>
  }

  render() {
    if(!this.posts) {
      return
    }
    return (
      <wjh-grid>  
        {this.renderSidebar()}
        <ol slot="right">
          {this.posts.map(post => 
            <li>
            <wp-title post={post} permalink={true}></wp-title>
            <wp-excerpt-copy post={post}></wp-excerpt-copy>
            </li>
          )}
        </ol>
      </wjh-grid>
    )
  }
}
