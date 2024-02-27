

import { DataGrid } from '@mui/x-data-grid';
import empDatajson from './../data_folders/empData.json'
import { useEffect, useState } from 'react';
import Divbutton from './divButton';
import empStyles from './css_folder/employeePage.module.css'

export default function EmployeePage(){

    let isPresentcallback=(id,getdata)=>{
        console.log("isPresentcallback  function in the parent--> ",id,' & ' ,getdata)

    }
    let inFunction=(params,clockData)=>{
        console.log("id in infunction ",params,' ',clockData);

        if(clockData=="clockIn")
        {

        let setinTime=empData.map((e)=>{
            if(e.id== params.id && e.disableClockOut==true && e.disableClockIn==false)
            return {
                ...e,
                inTime: new Date(),
                disableClockOut:false,
                disableClockIn:true
            }
            else
            return {
        ...e}
            
        })
        setEmpData(setinTime);
      }
      if(clockData=="clockOut")
        {
        let setinTime=empData.map((e)=>{
            if(e.id== params.id && e.disableClockOut==false && e.disableClockIn==true)
            return {
                ...e,
                outTime: new Date(),
                disableClockOut:true
            }
            else
            return {
        ...e}
            
        })
        setEmpData(setinTime);
      }

    }

    let [empData,setEmpData]=useState([])
    let columnHeaders=[
        { field: 'name',headerName: 'Username',flex:1,align:'center',headerAlign:'center' }, 
        // { field: 'id',headerName: 'UserId',flex:1,align:'center',headerAlign:'center' }, 
        { field: 'clockIn',headerName:'clockIn' ,flex:1,align:'center',headerAlign:'center',renderCell:(params)=>{ return ( <div onClick={()=>{inFunction(params.row,'clockIn')}}><Divbutton id='clockIn' data={params.row.hours} isPresentcallback={isPresentcallback} disabled={params.row.disableClockIn}></Divbutton></div>)}},
        { field: 'inTime',headerName: 'inTime',flex:1,align:'center',headerAlign:'center' }, 

        { field: 'clockOut',headerName: 'clockOut' ,flex:1,align:'center',headerAlign:'center',renderCell:(params)=>{ return (<div  onClick={()=>{inFunction(params.row,'clockOut')}} ><Divbutton id='clockOut'  data={params.row.hours} isPresentcallback={isPresentcallback} disabled={params.row.disableClockOut} ></Divbutton></div>)}},
        { field: 'outTime',headerName: 'outTime',flex:1,align:'center',headerAlign:'center' }, 

        { field: 'hours',headerName: 'Hours worked' ,flex:1,align:'center',headerAlign:'center'}

    ]


    useEffect(()=>{

        let empnew=empDatajson.map((e)=>{
            return {
                ...e,
                disableClockIn:false,               
                 disableClockOut: true

            }
        })

        console.log(JSON.stringify(empnew));

   setEmpData(empnew);

    },[empDatajson])

    return(
        <div className='body'>
          
          <div className={empStyles.title}>EMPLOYEE PAGE</div>
            <div className={empStyles.tableContainer}>
                <DataGrid

                    autoHeight
                    columns={columnHeaders}
                    rows={empData}
                >

                </DataGrid>
            </div>

            
        </div>
    )
}


