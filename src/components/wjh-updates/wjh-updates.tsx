import { Component, h, Prop, Listen, State } from '@stencil/core';
import { Query, Single } from '@webpress/core';

@Component({
  tag: 'wjh-updates',
  styleUrl: 'wjh-updates.scss',
})
export class WJHUpdates {
  @Prop() query: Query

  @State() mobile : boolean = false;

  private posts : Single[]

  async componentWillRender() {
    if(!this.query) {
      return
    }
    this.posts = await this.query.posts
  }

  @Listen('breakpointChanged', { target: 'parent' })
  breakpointChanged(event : CustomEvent<number>) {
    this.mobile = (event.detail === 1)
  }

  renderSidebar() {
    return 
  }

  render() {
    if(!this.posts) {
      return
    }
    return (
      <bhaa-wrapper class="donate">  
        {this.renderSidebar()}
        <ol class="posts center right">
          {this.posts.map(post => 
            <li>
            <wp-title post={post} permalink={true}></wp-title>
            <wp-excerpt-copy post={post}></wp-excerpt-copy>
            </li>
          )}
        </ol>
      </bhaa-wrapper>
    )
  }
}
