import React from 'react'
import '../css/PhotoOrientation.css'

class PhotoOrientation extends React.Component {
	render() {
	    let className = this.props.visible ? 'porio porio--active step' : 'porio step'
	    return (
	        <div className={className}>
	            <span className="step__number">2.</span>
				<span className="step__title">
					<span>Now</span>
					<span>,&nbsp;</span>
					<span>t</span>
					<span>h</span>
					<span>e&nbsp;</span>
					<span>pho</span>
					<span>to&nbsp;</span>
					<span>ori</span>
					<span>ent</span>
					<span>atio</span>
					<span>n</span>
				</span>
				<div className="porio__orientations">
					<div className="porio__orientation porio__portrait" onClick={this.props.handleOrientationChosen.bind(this, 'portrait')}></div>
					<div className="porio__orientation porio__landscape" onClick={this.props.handleOrientationChosen.bind(this, 'landscape')}></div>
					<div className="porio__orientation porio__square" onClick={this.props.handleOrientationChosen.bind(this, 'squarish')}></div>
				</div>
	        </div>
	    )
	}
}

export default PhotoOrientation
