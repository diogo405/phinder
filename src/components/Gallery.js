import React from 'react'
import './../css/Gallery.css'

class Gallery extends React.Component {
	render() {
		const className = this.props.visible ? 'gallery gallery--active' : 'gallery'
		return (
			<div className={className}>
				{this.props.photos.map(p => {
					return (
						<div className="gallery__photo" key={p.link}>
							<div className="gallery__photo-data">
								<h2 className="gallery__photo-title">{p.title}</h2>
								<div className="gallery__photo-attr">
									By <a className="gallery__link" href={p.photographer.url} target="_blank" rel="noopener noreferrer">{p.photographer.name}</a> on <a className="gallery__link" href="https://unsplash.com/?utm_source=Phinder&utm_medium=referral" target="_blank" rel="noopener noreferrer">Unsplash</a>
								</div>
								<div className="gallery__tags">
								{p.tags.map(t => <span className="gallery__tag" key={t}>{t}</span>)}
								</div>
							</div>
							<a href={p.link} target="_blank" rel="noopener noreferrer">
								<img src={p.url} className="gallery__photo-img" alt="p.title"/>
							</a>
						</div>
					)
				})}
			</div>
		)
	}
}

export default Gallery