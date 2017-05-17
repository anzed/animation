import React from 'react';
import './img-item.css';

class ImgItem extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		if (e.nativeEvent.which === 1) {
			this.props.onVote(this.props.image.id, 'upVote');
		} else if (e.nativeEvent.which === 3) {
			e.preventDefault();
			this.props.onVote(this.props.image.id, 'downVote');
		}
	}

	render() {
		return(
			<div className="img-container">
				<span className="rating">{this.props.image.rate}</span>
				<img src={this.props.image.url} onClick={this.handleClick} onContextMenu={this.handleClick} alt={this.props.image.url}></img>
			</div>
		);
	}
}

ImgItem.propTypes = {
	image: React.PropTypes.object
}

export default ImgItem;
