import { useParams, Link } from 'react-router-dom'

const PlaceFull = (props) => {

    console.log("RECORD FULL")
    console.log(props)

    // 12a. Getting closer. Because now we are changing the URL and reacting to it, we aren't able to pass down the data as we did before. Instead we can find out what the URL looks like through the 'useParams' hook. More on hooks tomorrow or later this week. What you need to know now is that 'useParams' returns an object, and we use destructuring to get the 'id' out. We know it will be 'id' because we set it as 'records/:id' (and we could make it whatever we like). We know we set the URL with the id using the <Link> that we wrap around each component. We saw params just like this in Express.
    // 12b. Now we have the id, we need a way to get the data that the id matches. This will depend on many things about how you are storing and retrieving your data (usually in a DB), but in our case at this time the data is in state. That may be the case in a 'real' app, although you may potentially make another call to the DB here. However, in this instance we will get it from state. We need a way to do that, and again there are choices. For now we will get it via a function. That function should have access to state, so let's go back to the App component where state is. 
    const { id } = useParams()
    console.log("PARAMS")
    console.log(id)

    // 15. Because I called it 'findRecord' as a prop key, we can get hold of that function via 'props.findRecord' and call it as below. As we know (because we designed it just now), we need to send it an id as an argument, but we also need to make sure it's the integer version of the id, as that's what's in our data. It should return the data as expected. 
    const aPlace = props.findPlace(parseInt(id))
    console.log(aPlace)

    return (
        <div className="place-full">
            {/* 17. The finishing touch is to change the close button. Previously this changed something in state, and then we reacted to this change. Now we are going to use the new paradigm and change the URL. Then the router will react to that and render the correct component. We use the <Link> to set the URL to '/records' and the router takes over.
            
            And we are done! (Although I will also get rid of all the horrible anchor-tag defaults that we now have by changing the CSS.) */}
            <Link to={ '/places' } >
                <div>CLOSE</div> 
            </Link>
            {/* 16. We make the appropriate changes here so that we can render that data we found. */}
            <h2> Province: { aPlace.province } </h2> 
            <h3> Town: { aPlace.town } </h3>
            <h3> Hotels: { aPlace.hotels } </h3>
            <h3> Sites: { aPlace.sites } </h3>
        </div>
    )
}

export default PlaceFull