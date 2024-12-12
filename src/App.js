import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import { ToastContainer, toast } from 'react-toastify';
import Instruction from './components/Instruction/Instruction';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const initialState = {
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

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    return data.map(face => {
      const clarifaiFace = face.boundingBox;

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
    this.setState({ box: boxes });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    // Fetch face detection data from backend
    fetch('https://face-recognition-back-end-ymxe.onrender.com/api/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: this.state.input }),
    })
      .then(response => response.json())
      .then(result => {
        if (result && result.length > 0) {
          // Calculate and display face bounding boxes
          const boxes = this.calculateFaceLocation(result);
          this.displayFaceBox(boxes);
  
          // Update user entries in backend
          fetch('https://face-recognition-back-end-ymxe.onrender.com/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.user.id }),
          })
            .then(response => response.json())
            .then(entries => {
              // Update the user's entries count in the state
              this.setState(Object.assign(this.state.user, { entries }));
            })
            .catch(err => console.error('Error updating entries:', err));
        } else {
          this.displayFaceBox([]);
          toast.info("No faces detected. Please try another image.");
        }
      })
      .catch(error => {
        console.error('Error fetching face data:', error);
      });
  };
  

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ ...initialState, route: 'signin' }); 
    } else if (route === 'home') {
      this.setState({ isSignedIn: true, route: 'home' });
    } else {
      this.setState({ route: route });
    }
  };
  

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Instruction />
        <ParticlesBg type="square" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        <ToastContainer position="top-center"/> 
        {route === 'home'
          ? <div>

              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition boxes={box} imageUrl={imageUrl} />
              <Logo />
            </div>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
