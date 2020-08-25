import React from 'react'
import './../css/ColorPicker.css'
import './../css/Step.css'
import Color from './../components/Color.js'

class ColorPicker extends React.Component {
	constructor() {
		super()
		this.state = {
			colors: [
				{name: 'black', code: '#444', selected: false},
				{name: 'white', code: '#fff', selected: false},
				{name: 'red', code: '#CD5C5C', selected: false},
				{name: 'orange', code: '#FF8C00', selected: false},
				{name: 'purple', code: '#663399', selected: false},
				//{name: 'magenta', code: '#FF00FF', selected: false},
				{name: 'green', code: '#8FBC8F', selected: false},
				{name: 'teal', code: '#008080', selected: false},
				{name: 'blue', code: '#87CEFA', selected: false}
			]
		}
		this.handleColorSelected = this.handleColorSelected.bind(this)
	}

	render() {
		const className = this.props.visible ? 'cpicker cpicker--active step' : 'cpicker step'
		return (
			<div className={className}>
				<span className="step__number">1.</span>
				<span className="step__title">
					<span>F</span>
					<span>i</span>
					<span>r</span>
					<span>s</span>
					<span>t</span>
					<span>, </span>
					<span>p</span>
					<span>i</span>
					<span>c</span>
					<span>k</span>
					<span>&nbsp;a&nbsp;</span>
					<span>c</span>
					<span>o</span>
					<span>l</span>
					<span>o</span>
					<span>r</span>
				</span>
				<div className="cpicker__colors">
					{this.state.colors.map(c => { 
						const isSelected = c.name === this.props.selected
						return <Color code={c.code} name={c.name} selected={isSelected} handleColorSelected={this.handleColorSelected} key={c.code}/> })}
				</div>
			</div>
		)
	}

	handleColorSelected(colorName) {
		this.props.handleColorPicked(colorName)
	}
}

export default ColorPicker
