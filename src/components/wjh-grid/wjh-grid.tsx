import { Component, Listen, h, State } from "@stencil/core";

@Component({
  tag: "wjh-grid",
  styleUrl: "wjh-grid.scss",
})
export class WjhGrid {
  @State() grid: boolean;

  @Listen("keydown", { target: "document" })
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key == "~") {
      this.grid = !this.grid;
    }
  }

  render() {
    return (
      <div class="wrap">
        <slot name="left" />
        <slot name="right" />
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}
