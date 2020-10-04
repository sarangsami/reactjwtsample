import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import API from '../API';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import UserDetails from './UserDetails';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            errorModal: false,
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
            login: false,
            store: null,
            userList: [{}]
        }
    }

    componentDidMount() {
        this.storeCollector()
        API.get(`/api/users?page=2`)
            .then(res => {
                console.log(res.data.data)
                this.setState({ userList: res.data.data })
            })
    }
    storeCollector() {
        let store = JSON.parse(localStorage.getItem('login'))
        if (store && store.login) {
            this.setState({ login: true, store: store })
        }
    }
    handleEmailChange = event => {
        this.setState({ email: event.target.value })
    }
    handlePasswordChange = event => {
        this.setState({ password: event.target.value })
    }
    Login = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState({ loading: true })
        API.post('api/login', data)
            .then(res => {
                console.log(res.data.token)
                localStorage.setItem('login', JSON.stringify({
                    login: true,
                    storage: res.data.token
                }))
                this.storeCollector()
                this.setState({ loading: false })
            }).catch(res => {
                this.setState({ loading: false, errorModal: true })
                console.log(res)
            })
    }
    LogOut = () => {
        this.setState({ login: false })
        localStorage.clear()
    }
    errorModalClose = ()=>{
        this.setState({errorModal:false})
    }

    render() {

        let content = (
            <div className="container">
                <Backdrop className="col-md-10 offset-2" style={{ zIndex: '100' }} open={this.state.loading} >
                    <CircularProgress color="primary" />
                </Backdrop>
                <Dialog
                    open={this.state.errorModal}
                    onClose={this.errorModalClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Sorry please check your informations</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Your Email or Your password is wrong
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.errorModalClose} color="primary">
                            Close
          </Button>
                      
                    </DialogActions>
                </Dialog>
                {
                    this.state.login === true ?
                        <div className="row">
                            <div className="col-md">
                                <div className="row mt-3 mb-3">
                                    <div className="col-md d-flex flex-row-reverse">
                                        <Button onClick={this.LogOut} margin="normal" variant="contained" color="primary" >
                                            Log Out
                                    </Button>

                                    </div>

                                </div>
                                <Paper className="p-3" elevation={3}>
                                    <div className="row">
                                        <div className="col-md">
                                            {this.state.userList.map((n, id) => {
                                                return (
                                                    <div className="row" key={id}>
                                                        <div className="col-md-12">
                                                            <div className="row mb-4">
                                                                <div className="col-md-2">
                                                                    <Avatar style={{ width: '100%', height: '100%' }} alt="Avatar" src={n.avatar} />
                                                                </div>
                                                                <div className="col-md align-self-center m-3">
                                                                    <Link to={{ pathname: `/${n.id}`, state: { data: n } }}>
                                                                        <h3>{n.id}. {n.first_name} {n.last_name}</h3>
                                                                    </Link>

                                                                    <p>{n.email}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </Paper>
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className="col-md">
                                <div className="row text-center d-flex justify-content-center">
                                    <Paper className="p-3 col-md-6" elevation={3}>
                                        <div className="row">
                                            <div className="col-md">

                                                <div className="row">
                                                    <div className="col-md">
                                                        <TextField
                                                            margin="normal"
                                                            variant="outlined"
                                                            type="email"
                                                            required
                                                            label="Email"
                                                            fullWidth
                                                            value={this.state.email}
                                                            onChange={this.handleEmailChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md">
                                                        <TextField
                                                            margin="normal"
                                                            variant="outlined"
                                                            label="Password"
                                                            required
                                                            type="password"
                                                            fullWidth
                                                            value={this.state.password}
                                                            onChange={this.handlePasswordChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-md">
                                                        <Button onClick={() => { this.Login() }} type="submit" fullWidth color="primary" variant="contained" margin="normal">
                                                            Login
                                                    </Button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </Paper>
                                </div>
                            </div>
                        </div>
                }

            </div>
        )






        console.log(this.state)
        return (
            <Router>
                <div>
                    <Route path="/:id" component={UserDetails} />
                    <Route exact={true} path="/" render={() => content} />
                </div>
            </Router>

        );
    }
}
export default HomePage;