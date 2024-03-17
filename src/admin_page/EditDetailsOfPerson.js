
import { useEffect, useState } from 'react';
import admstyles from './css-folder/AdminPage.module.css'




const EditDetailsOfPerson = (params) => {

    let { close, data } = params;
    let [empObj, setEmpObj] = useState({
        employeeId: '',
        userId: '',
        payscale: '',
        newpayscale: ''
    })



    useEffect(() => {
        console.log('data', data);


        setEmpObj((prev) => {
            let newObj = { ...prev };
            newObj.employeeId = data.employee_id;
            newObj.userId = data.user_id;
            return newObj;
        })

        fetchPersonDetails(data.employee_id);
    }, [data])

    let fetchPersonDetails = async (employeeId) => {

        let response = await fetch('http://localhost:8081/ttp-application/getEmployeeDetails');
        let responseJson = await response.json();
        console.log("##person response", responseJson);
        console.log(responseJson.filter((e) => { return e.id == employeeId })[0].payscale);
        // responseJson.filter((e)=>{return e.id==empObj.employeeId})[0].payscale
        setEmpObj((prev) => {
            let newObj = { ...prev };
            newObj.payscale = responseJson.filter((e) => { return e.id == employeeId })[0].payscale
            return newObj;
        })

    }


    let changeNewEmpObj = (e) => {

        let { value } = e.target;
        setEmpObj((prev) => {
            let newObj = { ...prev };
            newObj.newpayscale = value;
            return newObj;
        })
    }


     let saveEmployeeDetails =async()=>{
        let payload = {
            newpayscale: empObj.newpayscale,
            employeeId: empObj.employeeId
        }
        const response = await fetch('http://localhost:8081/ttp-application/updatePersonPayRoll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        close();

     }

    return (
        <div>
            <div className={admstyles.closeButton}>
                <button onClick={close}>Back</button>
            </div>


            <div className={admstyles.box_container}>
                <div className={admstyles.boxy}>
                    <label>EMPLOYEE ID:</label>
                    <span>{empObj.employeeId}</span>
                </div>
                <div className={admstyles.boxy}>
                    <label>USER ID:</label>
                    <span>{empObj.userId}</span>
                </div>
                <div className={admstyles.boxy}>
                    <label>CURRENT PAYROLL:</label>
                    <span>
                        {empObj.payscale}
                    </span>
                </div>

                <div className={admstyles.boxy}>
                    <label>EDIT PAYROLL:</label>
                    <span>
                        Enter PayScale
                        <input className={admstyles.boxyInput} onChange={(e) => changeNewEmpObj(e)} defaultValue={empObj.payscale} id='payroll'></input>
                    </span>
                </div>

            </div>

            <div className={admstyles.saveButton}>
                <button onClick={saveEmployeeDetails}>save</button>
            </div>

        </div>
    )

}


export default EditDetailsOfPerson;