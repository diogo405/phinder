import React from 'react'
import './../css/Color.css'

class Color extends React.Component {
	render() {
		let className = this.props.selected ? 'color color--selected' : 'color'
		return (
			<div className={className} style={{backgroundColor: this.props.code}} onClick={this.props.handleColorSelected.bind(this, this.props.name)}></div>
		)
	}
}

export default Color