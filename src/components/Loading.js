import React from 'react'
import '../css/Loading.css'

class Loading extends React.Component {
	render() {
		const className = this.props.visible ? 'lds-ripple lds-ripple--active' : 'lds-ripple'
		return (
			<div className={className}><div></div><div></div></div>
		)
	}
}

export default Loading
