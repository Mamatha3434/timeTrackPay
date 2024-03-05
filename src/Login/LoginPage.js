import './css_folder/LoginPage.css'
import {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import empCredData from '../data_folders/employeeCredentials.json'
// import  adminCredData from '../data_folders/adminCredentials.json'

export default function LoginPage(){
     let adminCredData=[];
    let credentialsObject={
        who:'employee',
        password:'',
        userId:''

    }

    
    let [logInSuccess,setLogInSuccess]=useState(false);

    let [logInSuccessAsAdmin,setLogInSuccessAsAdmin]=useState(false);
    let [logInSuccessAsEmployee,setLogInSuccessAsEmployee]=useState(false);


    let [selectAsEmployee,setSelectAsEmployee]=useState(true);
    let [selectAsAdmin,setSelectAsAdmin]=useState(false);


    let [userId,setUserId]=useState('');
    let [password,setPassword]=useState('');
    let [logInAsData,setLogInAsData]=useState('');
    let [credentials,setCredentials]=useState(credentialsObject);


//effect for the person type

let [adminPersonClass,setAdminPersonClass]=useState('person');
let [employeePersonClass,setemployeePersonClass]=useState('personActive');


//effect for the username and password on the input
    let [focusAndValueExistClassUserId,setFocusAndValueExistClassUserId]=useState('label');
    let [focusAndValueExistClassPassword,setFocusAndValueExistClassPassword]=useState('label');

    let handleFocus = (id) => {
        if (id === "password") {
            setFocusAndValueExistClassPassword('label entering');
        }
        else if (id === "userId") {
            setFocusAndValueExistClassUserId('label entering');
        }

    }

    let handleBlur = () => {

        if (password.length=== 0)
            setFocusAndValueExistClassPassword('label');

        if (userId.length === 0)
            setFocusAndValueExistClassUserId('label');

    }

    let handleChange = (value, id) => {
   

        if (id === "password") {
            setPassword(value);

            setCredentials({...credentials,password: value})
        }

        if (id === "userId") {
            setUserId(value);
            setCredentials({...credentials,userId: value})

        }


    }
    let selectAs = (event) => {
        let id = event.target.id;
        if (id === "admin") {
            setSelectAsAdmin(true);
            setSelectAsEmployee(false);
            setCredentials({...credentials,who:'admin'})
            setAdminPersonClass('personActive');
            setemployeePersonClass('person');

            // document.documentElement.style.setProperty('--box-background','linear-gradient(45deg,#637da5,rgb(152, 172, 186))')
            document.documentElement.style.setProperty('--box-background',getComputedStyle(document.documentElement).getPropertyValue('--admin-box-background'))

        }

        if (id === "employee") {
            setSelectAsEmployee(true);
            setSelectAsAdmin(false);
            setCredentials({...credentials,who:'employee'})

            setAdminPersonClass('person');
            setemployeePersonClass('personActive');

            document.documentElement.style.setProperty('--box-background',getComputedStyle(document.documentElement).getPropertyValue('--employee-box-background'))


        }



    }

    let checkCredentialsOfEmployee=()=>{

        console.log("userid   ",userId," password ",password)
      
        if(empCredData.find((e)=>{ return  e.password==password && e.userId==userId }))
        {
            setLogInSuccessAsEmployee(true);
        }
        

    }

    let checkCredentialsOfAdmin=()=>{

        console.log("userid   ",userId," password ",password)
       

         if(adminCredData.find((e)=>{ return  e.password==password && e.userId==userId }))
         {
             setLogInSuccessAsAdmin(true);
         }
         

    }

    let logInAs = async() => {
      
        if(credentials.who=="employee")
        {
            checkCredentialsOfEmployee();
        }
        if(credentials.who=="admin")
        {


            


            let adminCredresponse =  await   fetch('http://localhost:8080/ttp-application/getAdminDetails');
            let adminCredresponseJson= await adminCredresponse.json();
            adminCredData.push(adminCredresponseJson)


                console.log("### result of admin",adminCredresponseJson);
                console.log("### adminCredData of admin",adminCredData);
             

                if(adminCredData.find((e)=>{ return e.id==userId && e.password==password}))
                {
                    setLogInSuccessAsAdmin(true);
                }




            
            // checkCredentialsOfAdmin();
        }
    }

    

    //useEffects
    const rootStyles = getComputedStyle(document.documentElement);

    useEffect(() => {
        console.log('useeffect -->', credentials);
    }, [credentials])


    useEffect(() => {
        // const rootStyles = getComputedStyle(document.documentElement);
        // const color = rootStyles.getPropertyValue('--box-background');
        // console.log(color);

    }, [])

    
   if(logInSuccessAsAdmin)
   {
        return <Navigate to="/admin" />;
   }

   if(logInSuccessAsEmployee)
   {
    return <Navigate to="/employee"state={credentials} />;
   }
    return (
        
        <div className="body">
            <div className='background'> 
             </div>


            <div className="container">


                    <div className="who">
                       
                        <div   onClick={selectAs} className={employeePersonClass} id="employee">
                        <input type='radio'  checked={selectAsEmployee}  readOnly id="employee"></input>
                          EMPLOYEE
                        </div>


                        <div  onClick={selectAs} className={adminPersonClass} id="admin">
                            <input type='radio' checked={selectAsAdmin}   readOnly id="admin"></input>
                            ADMIN
                        </div>
                    </div>

                    <div className="information">

                        <div className={focusAndValueExistClassUserId}>USER ID</div>
                        <input onFocus={()=>handleFocus('userId')} onBlur={handleBlur} onChange={(e)=>handleChange(e.target.value,'userId')} className="inputSpace"></input>


                    </div>

                    <div className="information">


                        <div className={focusAndValueExistClassPassword}>PASSWORD</div>
                        <input onFocus={()=>handleFocus('password')} onBlur={handleBlur} onChange={(e) => handleChange(e.target.value,'password')}  className="inputSpace"></input>
                    </div>

                    <div className="buttonSpace">
                        <div 
                              onClick={()=>{logInAs()}}
                              className="loginButton">
                            LOGIN
                        </div>
                    </div>


            </div>
        </div>
       
    )

}