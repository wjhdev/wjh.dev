import { Component, Listen, h, State, Host } from "@stencil/core"

@Component({
	tag: "wjh-grid",
	styleUrl: "wjh-grid.scss",
})
export class WjhGrid {
	@State() grid: boolean

	@Listen('keydown', { target: 'document' })
	handleKeyDown(ev: KeyboardEvent) {
		if (ev.key == "~") {
			this.grid = !this.grid
		}
		console.log(ev.key)
	}

	render() {
		return (
			<Host>
				<div class="wrap">
				<slot name="left" />
				<slot name="right" />
				<div style={{"clear": "both"}} />
				</div>
			</Host>
		)
	}
}
