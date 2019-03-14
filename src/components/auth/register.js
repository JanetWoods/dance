import React, { Component } from "react"
import userMgr from "../../modules/userMgr"
import "../dance/dance.css"
import clubMgr from "../../modules/clubMgr"

export default class Register extends Component {
    state = {
        password: "",
        username: "",
        typeOfUserId: 1,
        nameFirst:"",
        nameLast:"",
        clubId: 0,
        phone: "",
        email:""
    }
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    handleRegistration = e => {
        e.preventDefault()
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            typeOfUserId: this.state.typeOfUserId,
            nameFirst:this.state.nameFirst,
            nameLast:this.state.nameLast,
            clubId: this.state.clubId,
            phone: this.state.phone,
            email:this.state.email
        }
        if (this.state.username && this.state.password) {
            userMgr.searchUserName(this.state.username).then(users => {
                if (users.length) {
                    alert(`username ${this.state.username} already exists!`)
                } else {
                    userMgr.addUser(newUser).then(user => {
                        sessionStorage.setItem("credentials", parseInt(user.id))
                        this.props.setAuth()
                        this.props.setPower()
                    })
                }
            })
        } else {
            alert("Something is missing here...Try filling out the form.")
        }
    }
    handleLogin = e => {

        e.preventDefault()
        if (this.state.username && this.state.password) {
            userMgr.searchUandP(this.state.username, this.state.password)
                .then(
                    user => {
                        if (!user.length) {
                            alert("Wrong username or password")
                        } else {
                            let typeOfUser = null
                            if (parseInt(user[0].typeOfUserId) === 2) {
                                typeOfUser = "PowerUser"
                                sessionStorage.setItem("credentials", parseInt(user[0].id))
                                sessionStorage.setItem("Type", typeOfUser)
                                sessionStorage.setItem("username", user[0].username)
                            }
                            if (parseInt(user[0].typeOfUserId) === 1) {
                                typeOfUser = null
                                sessionStorage.setItem("credentials", parseInt(user[0].id))
                                sessionStorage.setItem("username", user[0].username)
                                sessionStorage.setItem("Type", typeOfUser)
                            }
                            this.props.setPower()
                            this.props.setAuth()
                        }
                    }
                )
        } else {
            alert("try filling out the form.")
        }
    }
    render() {
        return (
            <form className="form-register">
                <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
                <label htmlFor="inputUserName">Username</label>
                <input onChange={this.handleFieldChange}
                    type="username"
                    id="username"
                    placeholder={`username`}
                    autoFocus=""
                    required=""
                />

                <label htmlFor="inputPassword">Password</label>
                <input onChange={this.handleFieldChange}
                    type="password"
                    id="password"
                    placeholder={`password`}
                    autoFocus=""
                    required="" />

                <label htmlFor="inputNameFirst">First Name</label>
                <input onChange={this.handleFieldChange}
                    type="nameFirst"
                    id="nameFirst"
                    placeholder={`First Name`}
                    autoFocus=""
                    required="" />

                <label htmlFor="inputNameLast">Last Name</label>
                <input onChange={this.handleFieldChange}
                    type="nameLast"
                    id="nameLast"
                    placeholder={`Last Name`}
                    autoFocus=""
                    required="" />

                <label htmlFor="inputPhone">Phone Number</label>
                <input onChange={this.handleFieldChange}
                    type="phone"
                    id="phone"
                    placeholder={`Phone Number`}
                    autoFocus=""/>

                <label htmlFor="email">email</label>
                <input onChange={this.handleFieldChange}
                    type="email"
                    id="email"
                    placeholder={`Email Address`}
                    autoFocus=""/>
                <button type="submit" onClick={this.handleRegistration}>
                    Register
            </button>
            </form>
        )
    }
}