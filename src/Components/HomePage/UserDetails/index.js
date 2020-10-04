import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
class UserDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            avatar: '',
            email: '',
            first_name: '',
            id: '',
            last_name: ''
        }
    }
    componentDidMount() {
        const global = this.props.location.state.data
        this.setState({
            avatar: global.avatar,
            email: global.email,
            first_name: global.first_name,
            id: global.id,
            last_name: global.last_name,
        })
    }
    render() {
        console.log(this.props.location.state.data)
        return (
            <div className="container">
                <div className="row">
                
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <Link to="/">
                                    <IconButton color="primary">
                                        <KeyboardBackspaceIcon fontSize="large" />
                                    </IconButton>
                                </Link>
                            </div>
                        </div>
                        <hr />
                        <Paper className="p-3" elevation={3}>
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-4">
                                        <Avatar className="text-center" style={{ width: '100%', height: '100%' }} alt="Avatar" src={this.state.avatar} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md text-center">
                                <h3>{this.state.id}. {this.state.first_name} {this.state.last_name}</h3>
                                <p>{this.state.email}</p>
                            </div>
                        </div>
                    </Paper>
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default UserDetails;