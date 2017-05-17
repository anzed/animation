import React from 'react';
import './App.css';
import ImgList from './components/img-list/img-list.js';

const images = ['./images/01.jpg', './images/02.jpg', './images/03.jpg', './images/04.jpg', './images/05.jpg', './images/06.jpg'];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
			images: []
		};
  }

  componentWillMount() {
    this.setState({
      images: images.map((imageUrl, index) => {
        return {
          url: imageUrl,
          id: index + 1,
          rate: 0
        }
      })
    });
  }

  render() {
    return (
      <div className="App">
        <ImgList images={this.state.images} />
      </div>
    );
  }
}

export default App;
