import React from 'react'
import './../css/Gallery.css'

class Gallery extends React.Component {
	render() {
		const className = this.props.visible ? 'gallery gallery--active' : 'gallery'
		return (
			<div className={className}>
				{this.props.photos.map(p => {
					return (
						<div className="gallery__photo">
							<a href={p.link} target="_blank">
								<img src={p.url} className="gallery__photo-img"/>
							</a>
							<div className="gallery__attr">
								Photo by <a className="gallery__link" href={p.photographer.url} target="_blank">{p.photographer.name}</a> on <a className="gallery__link" href="https://unsplash.com/?utm_source=Phinder&utm_medium=referral" target="_blank">Unsplash</a>
							</div>
						</div>
					)
				})}
			</div>
		)
	}
}

export default Gallery