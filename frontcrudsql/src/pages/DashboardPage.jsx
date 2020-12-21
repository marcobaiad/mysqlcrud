import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import clienteAxios from '../utils/axios';

const DashboardPage = () => {

    const [value, onChange] = useState(new Date());
    const [task, setTask] = useState([]);

    const getHomeworks = async () => {
        try {
            const result = await clienteAxios.get('/api/v1/homeworks');
            setTask(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    console.log(task);

    const taskMap = () => {
        task.map(t => (
            <div class="card">
                <div class="card-body">
                    {t}
                </div>
            </div>
        ))
    }

    useEffect(() => {
        getHomeworks()
    }, []);

    return (
        <>
            <div className="container my-4">
                <p>Día: {value.toLocaleString("es-AR")}</p>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Change Date
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Change a Date</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row justify-content-center">
                                    <Calendar
                                        locale=""
                                        onChange={onChange}
                                        value={value}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                Here the task
                {task && 'hay task' &&
                    task.map(t =>
                        <div class="card my-2">
                            <div class="card-body">
                                {t.work}
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default DashboardPage;