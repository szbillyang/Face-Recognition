import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';







class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: 'Guest',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    // Iterate over each face data to calculate positions for each bounding box
    return data.map(face => {
      const clarifaiFace = face.boundingBox;
  
      // Get image dimensions
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
  
      return {
        leftCol: Number(clarifaiFace.leftCol) * width,
        topRow: Number(clarifaiFace.topRow) * height,
        rightCol: width - (Number(clarifaiFace.rightCol) * width),
        bottomRow: height - (Number(clarifaiFace.bottomRow) * height)
      };
    });
  };
  

  displayFaceBox = (boxes) => {
    this.setState({box: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
  
    fetch('http://localhost:3000/api/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: this.state.input })
    })
      .then(response => response.json())
      .then(result => {
        console.log('Face Data:', result);
        if (result && result.length > 0) {
          // Calculate and display bounding boxes for all detected faces
          const boxes = this.calculateFaceLocation(result);

          this.displayFaceBox(boxes);
        }
      })
      .catch(error => console.log('Error fetching Clarifai data from backend:', error)); 
         // // Send PUT request to update user entries in the backend
        // fetch('http://localhost:3000/image', {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     id: this.state.user.id
        //   })
        // })
        //   .then(response => response.json())
        //   .then(count => {
        //     this.setState(Object.assign(this.state.user, { entries: count }));
        //   })
        //   .catch(error => console.log('Error updating user entries:', error));
  };
  






  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="square" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition boxes={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
