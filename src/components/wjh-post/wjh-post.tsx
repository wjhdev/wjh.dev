import { Component, h, Prop, State } from '@stencil/core';
import { Query, Post, QueryContextual, Media, Author } from '@webpress/core';
import '@webpress/theme'
import 'highlight.js'

@Component({
  tag: 'wjh-post',
  styleUrl: 'wjh-post.scss',
})
export class WJHPost implements QueryContextual  {
  @Prop() query: Query 
  @State() post: Post
  @State() feature: Media
  @State() author: Author

  async componentWillRender() {
    if(!this.query || this.post) {
      return
    }
    this.post = (await this.query.posts)[0] as Post
    this.feature = await this.post.featuredMedia.query
    this.author = await this.post.author.query
  }

  render() {
    console.log("feature",this.feature, this.post)
    if(!this.query || !this.post) {
      return
    }
    return <wjh-grid>
      <div slot="left" class="update right center col-7">
        <wp-media media={this.feature} class="feature-image" />
        <wp-title post={this.post} />
        <wp-subhead post={this.post} />
        <wp-author author={this.author} />, <wp-date post={this.post}/>
        
        
        <wp-running-copy post={this.post}></wp-running-copy>
      </div>
      </wjh-grid>
  }
}
