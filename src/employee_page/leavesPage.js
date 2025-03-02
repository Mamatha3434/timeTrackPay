
import { useEffect, useState } from 'react';
import empStyles from './css_folder/employeePage.module.css'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



let LeavesPage = (params) => {

    let { close, propData } = params;


    useEffect(() => {
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.employeeId = propData.employeeId;
            return prevObj;
        })
    }, [propData])



    let [value, setValue] = useState();

    let [payload, setPayload] = useState({
        employeeId: '',
        startDate: '',
        endDate: '',
        reason: '',
        status: 'Pending'

    })

    let [startDt, setStartDt] = useState('');
    let [endDt, setEndDt] = useState('');

    let submitFunction = async () => {


        const response = await fetch('http://localhost:8081/ttp-application/submit/leaves', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const responsejson = await response.json();
        console.log(responsejson);
        // {
        //     "success": false,
        //     "message": "Leave dates clash with existing leaves."
        // }
        if (responsejson) {
            if (responsejson.success == false) {
                alert(responsejson.message);
            }
            if (responsejson.success == true) {
                alert('Leave request submitted successfully');
            }
        }
        console.log('submitted leaves')
    }

    let handleChange = (name, value) => {
        if (name == 'reason') {
            console.log('name', name);
            console.log('value', value);

            setPayload((prev) => {
                let prevObj = { ...prev };
                prevObj.reason = value;
                return prevObj;

            })
        }
        else {

            if (name == "startDate") {
                //get value in format of 2024/04/03
                let date = value.format('YYYY-MM-DD');
                setStartDt(date);

                setPayload((prev) => {
                    let prevObj = { ...prev };
                    prevObj.startDate = date;
                    return prevObj;

                })
                console.log('start date', date);
            }

            if (name == "endDate") {
                //get value in format of 2024/04/03
                let date = value.format('YYYY-MM-DD');
                setEndDt(date);
                console.log('end date', date);

                setPayload((prev) => {
                    let prevObj = { ...prev };
                    prevObj.endDate = date;
                    return prevObj;
                });

            }
            console.log(name);
            console.log(value);
        }


    }

    return (
        
        <div className={empStyles.body}>
            <div className={empStyles.closeButton}>
                    <button onClick={close}>Back</button>

                </div>
                    <div className={empStyles.leaveContainer}>


             
            <div className={empStyles.leavesPageHeading} >REQUEST LEAVES</div>
            {/* <div className={empStyles.leavesForm} >leaves forms</div> */}

            <div className={empStyles.leavesForm} >
                <div className={empStyles.leavesFormRow} >
                    <div className={empStyles.leavesLabel}>
                        <label>FROM THE DATE </label>
                    </div>

                    <div className={empStyles.leavesInput}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="STARTS FROM "
                                    name="startDate"
                                    // value={value}
                                    onChange={(newValue) => handleChange('startDate', newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className={empStyles.leavesFormRow} >
                    <div className={empStyles.leavesLabel}>
                        <label>TILL THE  DATE</label>
                    </div>
                    <div className={empStyles.leavesInput}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="ENDS TILL"
                                    // value={value}
                                    name="endDate"
                                    onChange={(event) => handleChange('endDate', event)}
                                // onChange={handleChange}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className={empStyles.leavesFormRow} >
                    <div className={empStyles.leavesLabel}>
                        <label>REASON</label>
                    </div>

                    <div className={empStyles.leavesInputTextbox}>
                        <input className={empStyles.leaveReason} name='reason' id='leave_reason'
                            onChange={(event) => handleChange('reason', event.target.value)}
                        ></input>
                    </div>
                </div>

                <div className={empStyles.leavesFormRow} >

                    <div className={empStyles.submitLeaves} onClick={submitFunction} >
                        SUBMIT
                    </div>
                </div>
            </div>

            </div>

        </div>
    )
}

export default LeavesPage;