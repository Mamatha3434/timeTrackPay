
import buttontyles from '../employee_page/css_folder/button.module.css'
import { useState,useEffect,useRef } from 'react'

export default function Divbutton(props){

    const { id,data ,isPresentcallback,disabled} = props;


    const [disabling,setDisabling]=useState(true);
    

    const buttonref = useRef(null);
    const swipingRef=useRef(null);

    const [isPresent,setIsPresent]=useState(false);

    useEffect(() => {
        console.log(" props of button compnoent --> ", data);
        console.log(" props --> ", props);

    


    }, [data]);

   let  containerclicked=()=>{


    if(isPresent)
    {
        
        isPresentcallback(id,'absent callback data');

        console.log('turning red')

        let containerElement=buttonref.current;
        containerElement.style.background='red';
        let swipeElement=swipingRef.current;
        // swipeElement.style.right='unset'
        // swipeElement.style.left='0px'
        swipeElement.classList.remove(buttontyles.moved);

        setIsPresent(false);

    }
    else{

        isPresentcallback(id,'present callback data');

        let containerElement=buttonref.current;
        containerElement.style.background='green';
        console.log('turning green')
        let swipeElement=swipingRef.current;
        // swipeElement.style.right='0px'
        // swipeElement.style.left='unset'
        setIsPresent(true);

        swipeElement.classList.add(buttontyles.moved);
        
    }

    

    }
    return (
<div className={disabled ? 'buttontyles.disabled' : ''}>
    
<div className={`${buttontyles.body} ${disabled ? buttontyles.disabled : ''}`}>
            <div ref={buttonref} onClick={containerclicked}className={buttontyles.container}>
                <span>P</span>
                <span>A</span>
               <div ref={swipingRef} className={buttontyles.swipe}></div>
            </div>
            
        </div>
        </div>
       
    )
}