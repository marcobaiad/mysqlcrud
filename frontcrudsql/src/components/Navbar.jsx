import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    const [singin, setSingin] = useState(true);

    const inputLogin = useRef(null);

    const focusHandler = () => {
        setTimeout(() => {
            inputLogin.current.focus(); 
        }, 700);
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">HomeWorks Dashboard</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="nav navbar-nav ml-auto">
                        <Link className="nav-link active" to="/">Home</Link>
                        <Link className="nav-link" to="/Task">Task</Link>
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                User
                            </a>

                            <div class="dropdown-menu bg-dark" aria-labelledby="dropdownMenuLink">
                                <p class="dropdown-item text-white mb-0" type="button" data-toggle="modal" data-target="#singinModal" onClick={focusHandler}>Singin</p>
                                <p class="dropdown-item text-white mb-0" type="button" data-toggle="modal" data-target="#singinModal">Singup</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="singinModal" tabIndex="-1" aria-labelledby="singinModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="singinModalLabel">{singin ? 'Singin' : 'Singup'}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {singin ?
                                <>
                                    <div className="row mx-3">
                                        <label className="my-1" htmlFor="username">Username *</label>
                                        <input type="text" class="form-control my-1" id="username" name="username" placeholder="Username" aria-label="First Input" aria-describedby="inputGroup-sizing-sm" ref={inputLogin} />
                                        <label className="my-1" htmlFor="password">Password *</label>
                                        <input type="password" class="form-control my-1" id="password" name="password" placeholder="Password" aria-label="second Input" aria-describedby="inputGroup-sizing-sm" />
                                    </div>
                                </>
                                :
                                'Singup'

                            }
                        </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
                </div>
        </nav >

    );
}

export default Navbar;