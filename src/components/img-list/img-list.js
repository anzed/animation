import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ImgItem from './img-item/img-item.js';
import { orderBy, findIndex } from 'lodash';
import './img-list.css';

class ImgList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: this.props.images
		};

		this.handleVote = this.handleVote.bind(this);
	}

	handleVote(imageId, voteResult) {
		const sortedImages = orderBy(this.state.images, ['rate'], ['desc']);
		const indexOfClicked = findIndex(sortedImages, (o) => o.id === imageId);

		const clickedImage = this.state.images.find(image => image.id === imageId);
		const nextImage = voteResult === 'upVote' ? sortedImages[indexOfClicked - 1] : sortedImages[indexOfClicked + 1];
		voteResult === 'upVote' ? clickedImage.rate += 1 : clickedImage.rate -= 1;

		const shouldAnimate = this.checkAnimationsNeed(nextImage, clickedImage, voteResult);

		if (shouldAnimate) {
			const newImages = this.state.images.filter(image => image.id !== imageId && image.id !== nextImage.id);

			this.setState({
				images: [...newImages]
			}, () => setTimeout(() => {
				this.setState({
					images: [...newImages, clickedImage, nextImage]
				})
			}, 300));
		} else {
			const newImages = this.state.images.filter(image => image.id !== imageId);

			this.setState({
				images: [...newImages, clickedImage]
			});
		}
	}

	checkAnimationsNeed(nextImage, clickedImage, voteResult) {
		if (nextImage) {
			switch(voteResult) {
				case 'upVote':
					return clickedImage.rate > nextImage.rate;
				case 'downVote':
					return clickedImage.rate <= nextImage.rate;
				default:
					console.error('Something went wrong...');
			}
		}
		return false;
	}

	render() {
		const sortedImages = orderBy(this.state.images, ['rate'], ['desc']);

		return(
			<div className="images">
				<CSSTransitionGroup
					transitionName="animated-list"
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}>
					{sortedImages.map(
						image => <ImgItem image={image} key={image.id} onVote={this.handleVote} />
					)}
				</CSSTransitionGroup>
			</div>
		);
	}
}

ImgList.propTypes = {
	images: React.PropTypes.array
}

export default ImgList;
