import PlaceBasic from './PlaceBasic'
import { Link } from 'react-router-dom'

// 6. In this implementation we are making a whole component to house the list of records. We start with a simple rendering of all the records, which is much the same as what we had in the App component. We need to require the <RecordBasic> component (above), and use the records send down in the props to make our list of albums. 
const PlacePage = (props) => {

    console.log("ONE RECORD page")
    console.log(props)

    // 7. I have rewritten this function in here to produce the list. When first written there are no <Link>s in it - that will come later. I've removed the albumClickShow function, as we are going to show the individual album through the routing this time around, and we'll get to that. For now we are keeping it simple and showing just a list of albums.
    // Our next step is to think about a couple more routes in the <App>, one for the single record - although we will start by cleaning things up a little, and setting a route for '/' so that we render something when people first visit the page. Head back to <App>.
    const multiplePlacesRender = (places) => {
        return places.map((place) => {
            return (
                // 10. The <Link> wrapping each album is that change. We want to link to '/records/:id', and we can do this dynamically by getting Link to change part of the URL to the record id, and you can see that in the string interpolation below. It also needs a key because React needs a unique key for each element in a list. After this change the URL will change when we click on the album (each album has become a 'link' in a way). 
                // We have to look now at how <RecordFull> is going to be rendered, and let's head back to <App> to see what needs changing.
                <Link to={ `/places/${ place.id }` } key={ place.id } >
                    <PlaceBasic province={ place.province } town={ place.town } placeId={ place.id } />
                </Link>
            )
        })
    }

    return (
        <div>
            <h3> DESTINATIONS PAGE </h3>
            {
                multiplePlacesRender(props.places)
            }
        </div>
    )
}

export default PlacePage;