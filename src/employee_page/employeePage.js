

import { DataGrid } from '@mui/x-data-grid';
import empDatajson from './../data_folders/empData.json'
import { useEffect, useState } from 'react';
import Divbutton from './divButton';
import empStyles from './css_folder/employeePage.module.css'
import { useLocation } from 'react-router-dom';
import './css_folder/employeePage.css';

import AddIcon from '@mui/icons-material/Add';
import { Save } from '@mui/icons-material';


export default function EmployeePage() {
    const location = useLocation();
    const propData = location.state?.propData;




    let [employeeDbData, setEmployeeDbData] = useState([])
    let [empData, setEmpData] = useState([])
    let [empDataToShow, setEmpDataToShow] = useState([])




    let columnHeaders = [
        { field: 'actId', headerName: 'ActivityID', flex: 1, align: 'center', headerAlign: 'center' },

        { field: 'user_id', headerName: 'Username', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'id',headerName: 'UserId',flex:1,align:'center',headerAlign:'center' }, 
        { field: 'clock_in_status', headerName: 'clockIn', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => { return (<div onClick={() => { inFunction(params.row, 'clockIn') }}><Divbutton id='clockIn' buttonStatus={params.row.clock_in_status} isPresentcallback={isPresentcallback} disabled={params.row.disable_clock_in}></Divbutton></div>) } },
        { field: 'in_time', headerName: 'in_time', flex: 2, align: 'center', headerAlign: 'center' },

        { field: 'clock_out_status', headerName: 'clockOut', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => { return (<div onClick={() => { inFunction(params.row, 'clockOut') }} ><Divbutton id='clockOut' buttonStatus={params.row.clock_out_status} isPresentcallback={isPresentcallback} disabled={params.row.disable_clock_out} ></Divbutton></div>) } },
        { field: 'out_time', headerName: 'out_time', flex: 2, align: 'center', headerAlign: 'center' },

        { field: 'hours_worked', headerName: 'Hours worked', flex: 1, align: 'center', headerAlign: 'center' }

    ]

    //functions
    let isPresentcallback = (id, getdata) => {
        console.log("isPresentcallback  function in the parent--> ", id, ' & ', getdata)

    }

    let inFunction = (params, clockData) => {
        console.log("id in infunction ", params, ' ', clockData);

        if (clockData == "clockIn" && !params.disable_clock_in) {

            let setinTimeData = empData.map((e) => {
                if (e.actId == params.actId && e.disable_clock_out == true && e.disable_clock_in == false)
                {
                    let formattedDateTime = new Date().toISOString().substring(0,10) + ' ' + new Date().toISOString().substring(11,19);

                    return {
                        ...e,
                        in_time: formattedDateTime,
                    
                        clock_in_status: "P",
                        disable_clock_in: true,
                        disable_clock_out: false

                    }
                }
                    
                else
                    return {
                        ...e
                    }

            })
            setEmpData(setinTimeData);
            //save with time against the s_no

            updateEmployeeData(setinTimeData, params.actId);


        }
        if (clockData == "clockOut" && !params.disable_clock_out) {
            let setOutTime = empData.map((e) => {
                if (e.actId == params.actId && e.disable_clock_out == false && e.disable_clock_in == true) {
                    let formattedDateTime = new Date().toISOString().substring(0,10) + ' ' + new Date().toISOString().substring(11,19);
                    return {
                        ...e,
                        out_time: formattedDateTime,
                        clock_out_status: "P",
                        disable_clock_out: true
                    }
                }

                else
                    return {
                        ...e
                    }

            })
            // setEmpData(setOutTime);
            updateEmployeeData_after_calculating_hours(setOutTime, params.actId);


        }

    }
    let addNewEmpRow = () => {
        let empNewData = [...empData];
        // to check if the last row has the status of clockout P

        // console.log("this exists before",empNewData);

        // console.log("#12", empNewData[empNewData.length - 1].disable_clock_out);
        if (empData.length>0 && !(empNewData[empNewData.length - 1].disable_clock_in == true &&  empNewData[empNewData.length - 1].disable_clock_out == true)) {
            alert("Clock out the last row before adding a new row")
            return;
        }
        else
        {
            let newRow = {
                pay_scale:propData.payScale,
                employee_id: propData.employeeId,
                user_id: propData.userId,
                actId: empData.length>0?(empNewData[empNewData.length - 1].actId + 1):1,
                disable_clock_in: false,
                disable_clock_out: true,
                clock_in_status: "A",
                clock_out_status: "A"
            }
    
            save_new_row_in_db(newRow);
    
            fetchData(propData)
    
            // console.log(empNew);
            empNewData.push(newRow)
            setEmpData(empNewData)
        }
       
    }


    //use effects

    // useEffect(() => {

    //     let empData1 = [...empData];

    //     let empNew = empData1.map((e) => {

    //         if (e.in_time && e.out_time) {
    //             console.log("coming to fix time 1")

    //             if (e.in_time !== null && e.out_time != null) {
    //                 console.log("seconds calc ->" + (e.out_time - e.in_time) / 1000);
    //                 let hoursCalc = (e.out_time - e.in_time) / 1000;
    //                 return {
    //                     ...e,
    //                     hours_worked: hoursCalc
    //                 }
    //             }

    //         }
    //         else
    //             return {
    //                 ...e
    //             }

    //     })

    //     console.log('new data after time calculated', empNew);


    //     setEmpDataToShow(empNew);



    // }, [empData])



    // useEffect(() => {

    //     let empnew = empDatajson.map((e) => {
    //         return {
    //             ...e,
    //             disable_clock_in: false,
    //             disable_clock_out: true

    //         }
    //     })

    //     console.log(JSON.stringify(empnew));

    //     setEmpData(empnew);

    // }, [empDatajson])

  useEffect(() => {
    setEmpDataToShow(empData);
  },[empData])
    const save_new_row_in_db = async (newRow) => {

        let payload=newRow;

        const response = await fetch('http://localhost:8081/ttp-application/saveEmployeeDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const dataJson = await response.json();

        console.log("data saved from the employee table", JSON.stringify(dataJson));
        fetchData(propData);
    }


    const updateEmployeeData = async (empData, actId) => {
        // filter the payload which has actid

        let payload = empData.filter((e) => {
            return e.actId == actId
        })[0];
        console.log("##updateEmployeeData##", payload);
        console.log("##updateEmployeeData##", empData);
        console.log("##updateEmployeeData##", actId);
        // let payload={
        //     userId:propData.userId,
        //     actId:actId,
        //     in_time:empData.in_time,
        //     out_time:empData.out_time
        // }
        const response = await fetch('http://localhost:8081/ttp-application/updateEmployeeDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const dataJson = await response.json();

        console.log("data updated from the employee table", JSON.stringify(dataJson));
    }
    const updateEmployeeData_after_calculating_hours = async (empData, actId) => {
        // filter the payload which has actid

        let payload = empData.filter((e) => {
            return e.actId == actId
        })[0];
      
      //calculate hours difference between intime and outtime 

      
        let hoursCalc = (new Date(payload.out_time) - new Date(payload.in_time)) / 1000;

        let newPayLoad_with_time_difference={
            ...payload,
            hours_worked:hoursCalc
        }

        console.log("##newPayload##", newPayLoad_with_time_difference);
        const response = await fetch('http://localhost:8081/ttp-application/updateEmployeeDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPayLoad_with_time_difference)
        });
        const dataJson = await response.json();

        fetchData(propData);

        console.log("data updated from the employee table", JSON.stringify(dataJson));
    }

    const fetchData = async (propData) => {

        console.log("##fetchData##", propData.userId)

        let payload = {
            userId: propData.userId
        }
        const response = await fetch('http://localhost:8081/ttp-application/EmployeeDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const dataJson = await response.json();

        console.log("data fetched from the employee table", JSON.stringify(dataJson));


        let dbData = dataJson.map((e, index) => { return { ...e,
            in_time: e.in_time && e.in_time!=null?e.in_time.split('T')[0].substring(0,10)+' '+e.in_time.split('T')[1].substring(0,8):null,
            out_time: e.out_time && e.out_time!=null?e.out_time.split('T')[0].substring(0,10)+' '+e.out_time.split('T')[1].substring(0,8):null,
             actId: index + 1 } });
        setEmployeeDbData(dbData);

        setEmpData(dbData);
        // setUserData(data);

    };


    useEffect(() => {
        if (propData) {
            console.log('propData##', propData);

            fetchData(propData);//fetched data from the db

        }
    }, [propData])

    return (
        <div className='body'>

            <div className={empStyles.title}>EMPLOYEE PAGE</div>

            <div className={empStyles.tableContainer}>
                <div className={empStyles.plusIcon} onClick={addNewEmpRow}>
                    <span className={empStyles.spanText}>ADD ROW</span>

                </div>


                <DataGrid

                    autoHeight
                    columns={columnHeaders}
                    rows={empDataToShow}
                    getRowId={(row) => row.actId}

                >

                </DataGrid>
            </div>


        </div>
    )
}


