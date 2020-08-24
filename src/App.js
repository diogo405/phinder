import React from 'react'
import './App.css'
import ColorPicker from './components/ColorPicker.js'
import PhotoOrientation from './components/PhotoOrientation.js'
import Loading from './components/Loading.js'
import Feedback from './components/Feedback.js'
import Gallery from './components/Gallery.js'
import axios from 'axios'

class App extends React.Component {
	constructor() {
		super()
		this.handleColorPicked = this.handleColorPicked.bind(this)
		this.handleOrientationChosen = this.handleOrientationChosen.bind(this)
		this.findPhotos = this.findPhotos.bind(this)
		this.reset = this.reset.bind(this)
		this.state = {
			color: '',
			orientation: '',
			photos: [],
			feedback: {feedbackText: '', actionText: '', actionCallback: null},
			isColorPickerVisible: true,
			isPhotoOrientationVisible: false,
			isLoadingVisible: false,
			isResultsVisible: false,
			isFeedbackVisible: false,
			isGalleryVisible: false,
			isNewSearchVisible: false,
			isColorPickerReseted: false
		}
	}

	render() {
	    return (
	        <div className="app">
	        	<div className="app__logo">
	        		<img className="app__logo-img" src={require('./images/streamline-icon-lab-tube-experiment@20x20.png')} alt="Logo"/>
	        		<span className="app__logo-text">phinder</span>
	        	</div>
	            <h1 className="app__title">Let's find photos together!</h1>
	            <ColorPicker visible={this.state.isColorPickerVisible} handleColorPicked={this.handleColorPicked} reset={this.state.isColorPickerReseted}/>
	            <PhotoOrientation visible={this.state.isPhotoOrientationVisible} handleOrientationChosen={this.handleOrientationChosen}/>
	            <Loading visible={this.state.isLoadingVisible}/>
	            <Gallery visible={this.state.isGalleryVisible} photos={this.state.photos}/>
	            <div className={this.state.isNewSearchVisible ? 'app__new-search app__new-search--active' : 'app__new-search'} onClick={this.reset}>
	            	<span className="app__new-searchi" role="img" aria-label="Search icon">🔎</span>
	            	<span className="app__new-searcht">new search</span>
	            </div>
	            <Feedback visible={this.state.isFeedbackVisible} feedback={this.state.feedback}/>
	        </div>
	    )
	}

	handleColorPicked(colorName) {
		this.setState({ 
			isPhotoOrientationVisible: true,
			color: colorName
		})
	}

	handleOrientationChosen(orientation) {
		this.setState({ 
			isColorPickerVisible: false,
			isPhotoOrientationVisible: false,
			orientation: orientation,
			isLoadingVisible: true,
			isColorPickerReseted: true
		}, () => {
			this.findPhotos()
		})
	}

	findPhotos() {
		axios.get(`https://api.unsplash.com/search/photos?query=minimal&color=${this.state.color}&page=1&orientation=${this.state.orientation}`,
			{ headers: { 'Authorization': `Client-ID ${process.env.REACT_APP_CLIENT_ID}` }}
		).then(async (response) => {
			let photos = response.data.results.map(r => {
				return {
					title: r.alt_description,
					url: r.urls.small,
					link: r.links.html,
					photographer: {
						name: `${r.user.first_name} ${r.user.last_name}`,
						url: `${r.user.links.html}?utm_source=Phinder&utm_medium=referral`,
					},
					tags: r.tags.map(t => t.title),
					likes: r.likes
				}
			})
			this.setState({
				isLoadingVisible: false,
				isGalleryVisible: true,
				isNewSearchVisible: true,
				photos: photos
			})
			
		}).catch(error => {
			console.log(error)
			this.setState({
				feedback: {
					feedbackText: 'Oops something went wrong 🤷🏻‍♀️',
					actionText: 'Click here to start over',
					actionCallback: this.reset
				},
				isFeedbackVisible: true
			})
		}).finally(() => {
			this.setState({isLoadingVisible: false})
		})
	}

	reset() {
		this.setState({
			color: '',
			orientation: '',
			photos: [],
			feedback: {feedbackText: '', actionText: '', actionCallback: null},
			isColorPickerVisible: true,
			isPhotoOrientationVisible: false,
			isLoadingVisible: false,
			isResultsVisible: false,
			isFeedbackVisible: false,
			isNewSearchVisible: false			
		})
	}
}

export default App
