
import { DataGrid } from '@mui/x-data-grid';
import adminDatajson from './../data_folders/adminData.json'
import { useEffect, useState } from 'react';
import admstyles from './css-folder/AdminPage.module.css'
export default function AdminPage(){

    let [empData,setEmpData]=useState([]);
    // let [earnings]
    let columnHeaders = [
        { field: 'name', headerName: 'Username', flex: 1, align: 'center', headerAlign: 'center' }, 
        { field: 'date', headerName: 'Username', flex: 1, align: 'center', headerAlign: 'center' }, 

        { field: 'activity_id', headerName: 'UserId', flex: 1, align: 'center', headerAlign: 'center' }, 
        { field: 'hours', headerName: 'Hours worked', flex: 1, align: 'center', headerAlign: 'center' },

        { field: 'earnings', headerName: 'earnings', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'ofPerson',headerName: 'person' ,flex:1,align:'center',headerAlign:'center',renderCell:(params)=>{ }},

    ]

    useEffect(()=>{

        let adminData=adminDatajson.map((e)=>{
            return {
                ...e,
                earnings: '$'+e.hours*10
            }
        })


   setEmpData(adminData);

    },[adminDatajson])

    return(
        <div className={admstyles.body}>
           <div className={admstyles.title}>ADMIN PAGE</div>
            <div className={admstyles.tableContainer}>
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