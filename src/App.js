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
			isColorPickerReseted: false
		}
	}

	render() {
	    return (
	        <div className="app">
	            <h1 className="app__title">Let's find photos together!</h1>
	            <ColorPicker visible={this.state.isColorPickerVisible} handleColorPicked={this.handleColorPicked} reset={this.state.isColorPickerReseted}/>
	            <PhotoOrientation visible={this.state.isPhotoOrientationVisible} handleOrientationChosen={this.handleOrientationChosen}/>
	            <Loading visible={this.state.isLoadingVisible}/>
	            <Gallery visible={this.state.isGalleryVisible} photos={this.state.photos}/>
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
					url: r.urls.small,
					link: r.links.html,
					photographer: {
						name: `${r.user.first_name} ${r.user.last_name}`,
						url: `${r.user.links.html}?utm_source=Phinder&utm_medium=referral`,
					}
				}
			})
			this.setState({
				isLoadingVisible: false,
				isGalleryVisible: true,
				photos: photos
			})
			
		}).catch(error => {
			console.log(error)
			this.setState({
				feedback: {
					feedbackText: 'Oops something went wrong 🤷🏻‍♀️',
					actionText: 'Click here to start over',
					actionCallback: this.reset
				}
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
			isFeedbackVisible: false			
		})
	}
}

export default App
