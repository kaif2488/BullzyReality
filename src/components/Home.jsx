import FlatList from "./FlatList"
import Banner from "./Banner"
import React from "react"
import TeamList from "./TeamList"
import Subscribe from "./Subscribe"
import propertySearchData from "../data/propertySearchData"

const Home=()=>{
    return (
        <React.Fragment>
            <Banner />
            <FlatList properties={propertySearchData} />
            <Subscribe/>
            <TeamList/>
        </React.Fragment>
    )
}

export default Home;
