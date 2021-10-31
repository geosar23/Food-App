import React from "react";

function Home(props){
    
    return(
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {props.content}
        </div>
        
    )
}

export default Home 