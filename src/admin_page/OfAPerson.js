import { useEffect } from 'react';
import admstyles from './css-folder/AdminPage.module.css'
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const OfPerson = (params) => {
    let { close,data,attendanceData } = params;

    let [personName,setPersonName]=useState('');


    let [filterOption, setFilterOption] = useState('Daily');
    let [perDayData, setPerDayData] = useState([]);
    let [dbData, setDbData] = useState([]);


    let [analyticsData, setAnalyticsData] = useState([]);
    useEffect(() => {


        console.log('data', data);
        console.log('attendanceData', attendanceData);

        if(data && attendanceData){

            setPersonName(data['user_id'])


            let fromDb=attendanceData.filter((event) => { return event.employee_id == data.employee_id }).map((e)=>{
               
                let newObj=e;
                newObj['in_time']=e['in_time'].split('T')[0];
                newObj['out_time']=e['out_time'].split('T')[0];

                return newObj;
              
            });
            setAnalyticsData(fromDb)

            setDbData(fromDb)

        }
    },[data,attendanceData]);


   

let handleChange = (event) => {
        console.log(event.target.value);
        setFilterOption(event.target.value);

    }

    useEffect(() => {

        setDataInBarGraph(); 


    }, [filterOption,dbData])

    let setDataInBarGraph=()=>{

        if (filterOption === 'Daily') {
            let dataToShow = [...dbData];
        
            let groupedDataObject = dataToShow.reduce((acc, e) => {
                let day = e['in_time'];
                
                if (!acc[day]) {
                    acc[day] = {
                        in_time: day,
                        earnings: e['hours_worked'] * e['pay_scale'],
                        hours_worked: e['hours_worked']
                    };
                } else {
                    acc[day].hours_worked += e['hours_worked'];
                    acc[day].earnings += e['hours_worked'] * e['pay_scale'];
                }
                return acc;
            }, {});
        
            let dataArray = Object.values(groupedDataObject);
        
            let sortedAnalyticsData = dataArray.sort((a, b) => {
                let dateA = new Date(a.in_time);
                let dateB = new Date(b.in_time);
                return dateA - dateB;
            });
        
            console.log(sortedAnalyticsData);
        
            setAnalyticsData(sortedAnalyticsData);
            setPerDayData(sortedAnalyticsData);
        }
        if (filterOption === 'Monthly') {
            let dataToShow = [...dbData];
        
            let groupedDataObject = dataToShow.reduce((acc, e) => {
                let yearMonth = e['in_time'].substring(0, 7);
        
                if (!acc[yearMonth]) {
                    acc[yearMonth] = {
                        in_time: yearMonth,
                        earnings: e['hours_worked'] * e['pay_scale'],
                        hours_worked: e['hours_worked']
                    };
                } else {
                    acc[yearMonth].hours_worked += e['hours_worked'];
                    acc[yearMonth].earnings += e['hours_worked'] * e['pay_scale'];
                }
                return acc;
            }, {});
        
            let dataArray = Object.values(groupedDataObject);
        
            let sortedAnalyticsData = dataArray.sort((a, b) => {
                let dateA = new Date(a.in_time);
                let dateB = new Date(b.in_time);
                return dateA - dateB;
            });
        
            console.log(sortedAnalyticsData);
        
            setAnalyticsData(sortedAnalyticsData);
        }

        if (filterOption === 'Weekly') {
        
            let groupedDataObject = perDayData.reduce((acc, e) => {
                let yearMonth = e.in_time.substring(0, 7);
                let day = parseInt(e.in_time.substring(8, 10)); 
        
                let weekNumber = Math.ceil(day / 7);
        
                let weekLabel = `${yearMonth}-week${weekNumber}`;
        
                if (!acc[weekLabel]) {
                    acc[weekLabel] = {
                        in_time: weekLabel,
                        earnings: e.earnings,
                        hours_worked: e.hours_worked
                    };
                } else {
                    acc[weekLabel].earnings += e.earnings;
                    acc[weekLabel].hours_worked += e.hours_worked;
                }
                return acc;
            }, {});
        
            let sortedAnalyticsData = Object.values(groupedDataObject).sort((a, b) => {
                let weekA = parseInt(a.in_time.match(/\d+$/)[0]);
                let weekB = parseInt(b.in_time.match(/\d+$/)[0]);
        
                return weekA - weekB; 
            });
        
            console.log(sortedAnalyticsData);
        
            setAnalyticsData(sortedAnalyticsData);
        }

       
        

    }



    return (
        //return a div with pie chart from the table
        <div className={admstyles.statsBody}>




            <div className={admstyles.closeButton}>
                <button onClick={close}>Back</button>

            </div>



            <h1>Stats of '{personName}'</h1>
            <div className={admstyles.filterSpace}>
                    <Box sx={{ minWidth: 10 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose Filter</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={filterOption}
                                label="Choose Filter"
                                onChange={handleChange}
                            >
                                {/* <MenuItem value={'Last3weeks'}>Last 3 weeks</MenuItem>
                                <MenuItem value={'Last3Months'}>Last 3 Months</MenuItem> */}
                                <MenuItem value={'Weekly'}>Weekly</MenuItem>
                                <MenuItem value={'Monthly'}>Monthly</MenuItem>
                                <MenuItem value={'Daily'}>Daily</MenuItem>


                            </Select>
                        </FormControl>
                    </Box>
                </div>
            {analyticsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart
                        width={900}
                        height={400}
                        data={analyticsData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="in_time" label={{ value: 'In Time', position: 'insideBottom', offset: -10 }} />
            <YAxis label={{ value: 'Hours Worked', angle: -90, position: 'insideLeft' }} />
                        {/* <XAxis dataKey="in_time" />
                        <YAxis /> */}
                        <Tooltip />
                        <Area type="monotone" dataKey="hours_worked" stroke="#8884d8" fill="#8884d8" />
                        {/* <Area type="monotone" dataKey="earnings" stroke="#8884d8" fill="#8884d8" /> */}

                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <div>Loading...</div>
            )}

        </div>
    )
}
export default OfPerson;