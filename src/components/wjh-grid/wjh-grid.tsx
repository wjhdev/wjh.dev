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
				{this.grid ? (
					<div class="guides">
						{[...Array(24)].map((_, index) => (
							<span>
								<span>{index + 1}</span>
							</span>
						))}
					</div>
				) : undefined}
				<slot />
			</Host>
		)
	}
}
