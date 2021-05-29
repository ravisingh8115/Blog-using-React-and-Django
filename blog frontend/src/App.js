import React, { Component } from 'react'
import './App.css';
import Header from './Components/HeaderAndFooter/Header'
import Footer from './Components/HeaderAndFooter/Footer'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './Components/Rout_to/Login'
import { connect } from 'react-redux';
import Home from './Components/Rout_to/HomePage'
import Logout from './Components/Rout_to/Logout';
import SignUp from './Components/Rout_to/SignUp';
import CreateBlog from './Components/Rout_to/Blogs/CreateBlog';
import ViewBlogs from './Components/Rout_to/Blogs/ViewBlogs';
import DetailBlog from './Components/Rout_to/Blogs/DetailBlog';
import RefreshToken from './Components/Rout_to/RefreshToken';
import MyBlogs from './Components/Rout_to/Blogs/myBlogs'
import ImageTest from './Components/Rout_to/ImageTest'
import BlogRender from './Components/Rout_to/Blogs/BlogRender'


class App extends Component {

	// constructor(props){
	// 	super(props)
	// }

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Header/>
					<Switch>
						<Route exact path = "/" component = {Home}/>
						<Route path = "/login" component = {Login}/>
						<Route path="/logout" component = {Logout}/>
						<Route path="/signup" component = {SignUp}/>
						<Route path="/createblog" component = {CreateBlog}/>
						<Route path="/viewblogs" component = {ViewBlogs}/>
						<Route path="/detailblog" component = {DetailBlog}/>
						<Route path="/refreshtoken" component = {RefreshToken}/>
						<Route path="/myblogs" component = {MyBlogs}/>
						<Route path="/imagetest" component = {ImageTest} />
						<BlogRender/>
					</Switch>
					<Footer/>
				</BrowserRouter>
			</div>
    	)
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
		pageLoaded:()=>dispatch({type:"PAGE_LOADED"})
	}
}

export default connect(null, mapDispatchToProps)(App);

//export default withRouter(App)