import './App.css';
import { Component, Fragment } from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import PlaceBasic from './components/PlaceBasic'
import PlaceFull from './components/PlaceFull'

import AboutPage from './components/AboutPage'
import PlacePage from './components/PlacePage'

class App extends Component {

    state = {
        formData:[
          {
          province:"",
          town:"",
          hotels:"",
          sites:""
          }
        ],
        showPlace: null,
        places:[
          {
            id: Math.round(Math.random() * 1000000),
            province: 'Central',
            town: 'Port Moresby',
            hotels: 'Grand Papua Hotel, Loloata Resort',
            sites: 'Kokoda, Nature Park',
            },
          {
            id: Math.round(Math.random() * 1000000),
            province: 'Morobe',
            town: 'Lae',
            hotels: 'Lae International Hotel, Lae City Hotel',
            sites: 'Siassi waterfalls',
            },
          {
            id: Math.round(Math.random() * 1000000),
            province: 'Eastern Highlands',
            town: 'Goroka',
            hotels: 'Bird of Paradise Hotel',
            sites: 'Yonki',
            },
          {
            id: Math.round(Math.random() * 1000000),
            province: 'East New Britain',
            town: 'Kokopo',
            hotels: 'Kokopo Beach Resort, Rapopo resort',
            sites: 'Volcanic sites',
            }
        ]
    }

    // 13. This is the function I'll use. It takes an id and returns the related data. We have seen similar searching functions before. We have made this function here in the App component so it has access to state. (This is an example of a closure, which is part of how JS operates: the function has knowledge of the environment in which it was defined.) We send this function through as a prop to the <RecordFull> component, so head to that point. 
    findPlace = (id) => {
        const thePlace = this.state.places.find(place => place.id === id)
        // console.log(theRecord)
        return thePlace
    }

    placeClickToShow = (id) => {
        console.log(id)
        this.setState({
            showPlace: id
        })
    }

    singlePlaceRender = (id) => {
        const thePlace = this.state.places.find(place => place.id === id)
        return <PlaceFull place={ thePlace } shut={ this.shutSingleView } />
    }

    multiplePlacesRender = (places) => {
        return this.state.places.map((place) => {
            return <PlaceBasic key={ place.id } province={ place.province } clickShow={ this.placeClickToShow } placeId={ place.id } />
        })
    }

    shutSingleView = () => {
        this.setState({
            showPlace: null
        })
    }

    changeHandler1 = (event) => {
      this.setState({                 // is an async function
          province: event.target.value
      }, () => {                      // optional callback that runs after state is updated
          // console.log("Callback")
          // console.log(this.state.title) 
      })
      // console.log("Regular")
      console.log(this.state.province) // hit before state is updated (due to async)
  }

  changeHandler2 = (event) => {
    this.setState({                 // is an async function
        town: event.target.value
    })
    console.log(this.state.town) // hit before state is updated (due to async)
}

changeHandler3 = (event) => {
  this.setState({                 // is an async function
      hotels: event.target.value
  })
  console.log(this.state.hotels) // hit before state is updated (due to async)
}

changeHandler4 = (event) => {
  this.setState({                 // is an async function
      sites: event.target.value
  })
  console.log(this.state.sites) // hit before state is updated (due to async)
}

multipleInputHandler = (event) => {
  this.setState({                 // is an async function
      [event.target.name]: event.target.value
  })
  // console.log(this.state.sites) // hit before state is updated (due to async)
}
getData = () => {
    const newPlace = {
      id: Math.round(Math.random() * 1000000),
      province: this.state.province,
      town: this.state.town,
      hotels: this.state.hotels,
      sites: this.state.sites
    }
    console.log(newPlace)
    const newPlaces = this.state.places.map(place => place)
    newPlaces.push(newPlace)
    this.setState({
      places: newPlaces
    })
}

    render() {
        console.log("The page is rendering..")
        return (
            <div className="App">
                {/* 1. We start by wrapping everything in BrowserRouter, and our routing can take place anywhere within these tags. It will help to hold a history object that will help with various aspects here, including the back and forward button. */}
                <BrowserRouter> 
                    {/* 2. We need some links to work with, and the traditional way is with a <nav> and some links. Here they can be anything, and I've made them <divs>. I have made them part of the header, and it's also a good chance to practice a little bit of Flexbox. */}
                    <header> 
                        <h2>TRAVEL ITENARY</h2> 
                        <nav>
                            {/* 3. We wrap these <div>s with <Link>s. This is a bit like turning them into anchor tags. Now they will change the URL when clicked, and it's this change that other elements will react to. You'll see the URL change as these are clicked. */}
                            <Link to={ '/places' }>
                                <div> Destinations </div>
                            </Link>
                            <Link to={ '/about' }>
                                <div> About </div>
                            </Link>
                        </nav> 
                    </header>
                    <div className="form-area">
                        <h2> Add a new place form </h2>
                        <form>
                            Province: <input  type="text" 
                                    name="province"   
                                    value={this.state.province} 
                                    onChange={ this.multipleInputHandler } 
                            />
                            Town: <input  type="text" 
                                    name="town"   
                                    value={this.state.town} 
                                    onChange={ this.multipleInputHandler } 
                            />
                            Hotels: <input  type="text" 
                                    name="hotels"   
                                    value={this.state.hotels} 
                                    onChange={ this.multipleInputHandler } 
                            />
                            Sites: <input  type="text" 
                                    name="sites"   
                                    value={this.state.sites} 
                                    onChange={ this.multipleInputHandler } 
                            />
                            <button onClick={this.getData}> submit </button>
                        </form>
                    </div>
                    {/* 4a. I make a simple <div> as a container section for the components we are going to switch in and out as the links are clicked. */}
                    <div className="content-section">
                        {/* 4b. This <Switch> means that _at most_ *one* of the following components will be rendered. If we are happy for more than one to render, we can leave this off. I'm starting with a fairly traditional version of a webpage, so this works best here. */}
                        <Switch>
                            {/* 8. We need to add the 'exact' prop to this route so that when people first come to the site ('/') we can render something, and here we have decided to render all the records. The exact stops this '/' matching too many routes (as it will match all of the routes because there all start with '/').
                            Next we will make a route for the single album below. */}
                            <Route exact path={ '/' } >
                                <PlacePage aProp="This is a prop" places={ this.state.places } />
                            </Route>
                            {/* 5. '/records' and the '/about' were the only two routes at the start. The 'path' prop will pattern match against the URL to see which of the routes and the children should be rendered. At the start we only had two routes, and so there was no need for the 'exact' prop in the beginning. These match to the values that the <Link>s give to the URL. I have decided on the <RecordPage> component for this job, so we need to make that and do some work in there. */}
                            <Route exact path={ '/places' } >
                                <PlacePage aProp="This is a prop" places={ this.state.places } />
                            </Route>
                            {/* 9. Here is a new route that will contain the single record view with more information. We are using the traditional routing of having '/records/:id' where the id will be the id of the record we are going to show. At this point we have nothing in the app that will change the URL in this way, and we can't do this through the nav because we don't know which album until it is clicked. We need to somehow get the URL to change when we click an album, and we will do that in <RecordsPage>. */}
                            <Route path={ '/places/:id' } >
                                {/* 11. Originally we were rendering the <FullAlbum> by adding a click event to an album, and passing along the relevant information (the record data) - but we can't do that in this new paradigm. Now we are changing the URL (with the <Link> wrapping each album), and we will have access to that URL through a hook (which we will explain later). Let's look at that in <RecordFull> and see what else we need. */}
                                {/* 14. Here I'm sending the function we just made through into <RecordFull>. I gave it the key 'findRecord' because I decided to, and because it shows that we can call it whatever we like. */}
                                <PlaceFull findPlace={ this.findPlace } />
                            </Route>
                            <Route path={ '/about' } >
                                <AboutPage content="Sending down some content" />
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>            
            </div>
    );
  }
}

export default App;

