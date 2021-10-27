import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useTransition, animated } from 'react-spring'
import Categories from "./Categories";

function Navigation(){
    const[showMenu,setShowMenu]=useState(false)

    const maskTransistions = useTransition(showMenu, {
        from:  { position:'absolute', opacity: 0 },
        enter: { opacity: 1},
        leave: { opacity: 0},
      })

      const menuTransitions = useTransition(showMenu, {
        from:  { opacity: 0, transform:'translateX(-100%)'},
        enter: { opacity: 1, transform:'translateX(0%)'},
        leave: { opacity: 0, transform:'translateX(-100%)'},
      })

    return(
        <nav className="m-1">
            <span className="text-3xl text-gray-800">
                <FontAwesomeIcon 
                    icon={faBars}
                    onClick={()=>setShowMenu(!showMenu)} //instead of true , i use the opposite of the current state to make a toggle action 
                />
            </span>

            {   //https://react-spring.io/hooks/use-transition
                maskTransistions((styles, item) => 
                item && 
                <animated.div 
                    style={styles}
                    className="bg-gray-800 fixed top-0 left-0 w-full h-full z-50 "
                    onClick={()=>setShowMenu(false)}
                >
                   
                </animated.div>)
            }
            
            {   //https://react-spring.io/hooks/use-transition
                menuTransitions((styles, item) => 
                item && 
                <animated.div 
                    style={styles}
                    className="fixed bg-white top-0 left-0 w-4/5 h-full z-50 shadow p-3 "
                >
                    <Categories closeMenu={()=>setShowMenu(false)}/>
                </animated.div>)
            }
        </nav>
    )
}

export default Navigation