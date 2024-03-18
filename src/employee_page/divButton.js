
import buttontyles from '../employee_page/css_folder/button.module.css'
import { useState,useEffect,useRef } from 'react'

export default function Divbutton(props){

    const { id,buttonStatus ,isPresentcallback,disabled} = props;

    const buttonref = useRef(null);
    const swipingRef=useRef(null);


    useEffect(() => {
        // console.log(" ButtonStatus --> ", buttonStatus);
        // console.log(" props --> ", props);

        // containerclicked();

        if(buttonStatus=='P')
        {
            // console.log('turning green because of P')
        }
        else if(buttonStatus=='A'){
            // console.log('turning red because of A')
        }
        
        containerclicked();

    }, [buttonStatus]);

   let  containerclicked=()=>{


    if(buttonStatus==='A')
    {
        

        console.log('turning red')

        let containerElement=buttonref.current;
        containerElement.style.background='red';

        let swipeElement=swipingRef.current;
        swipeElement.classList.remove(buttontyles.moved);


    }
    else{


        let containerElement=buttonref.current;
        containerElement.style.background='green';
        // console.log('turning green')
        let swipeElement=swipingRef.current;
        // swipeElement.style.right='0px'
        // swipeElement.style.left='unset'
        swipeElement.classList.add(buttontyles.moved);
        
    }

    

    }
    return (
<div className={disabled ? 'buttontyles.disabled' : ''}>
    
<div className={`${buttontyles.body} ${disabled ? buttontyles.disabled : ''}`}>
            <div ref={buttonref} className={buttontyles.container}>
                <span>P</span>
                <span>A</span>
               <div ref={swipingRef} className={buttontyles.swipe}></div>
            </div>
            
        </div>
        </div>
       
    )
}