import React from 'react'
import '../css/Feedback.css'

class Feedback extends React.Component {
	render() {
		const className = this.props.visible ? 'feedb feedb--active' : 'feedb'
		return (
			<div className={className}>
				<span className="feedb__text">
					{this.props.feedback.feedbackText}
				</span>
				<span className="feedb__action-text" onClick={this.props.feedback.actionCallback}>
					{this.props.feedback.actionText}
				</span>
			</div>
		)
	}
}

export default Feedback
