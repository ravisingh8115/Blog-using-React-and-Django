import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class ImageTest extends Component{
    constructor(props){
        super(props)
        this.state = {
            image: null,
            title: null,
            body: null,
            author: 2,
            blogs:[]
        }
    }

    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleImageChange = (evt) =>{
        this.setState({image:evt.target.files[0]})
    }

    handleSubmit = (evt) =>{
        evt.preventDefault()
        const postData = JSON.stringify({
            title:this.state.title,
            body:this.state.body,
            image:this.state.image,
            date:new Date(),
            author:this.state.author
        })

        let postForm = new FormData()
        postForm.append("title", this.state.title)
        postForm.append("body", this.state.body)
        // for(var i=0; i <this.state.image.length; i++){
        //     postForm.append("images[]", this.state.image[i], this.state.image.name[i])
        // }
        postForm.append("image", this.state.image, this.state.image.name)
        postForm.append("author", 1)
        console.log(postForm)

        // let url = 'http://localhost:8000/blog/';
        axios.post('http://127.0.0.1:8000/blog/', postForm, {
        headers: {
            'content-type': 'multipart/form-data'
        }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })


        console.log(postData)
    }

    showBlogs =() =>{
        axios.get('http://127.0.0.1:8000/blog/')
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    blogs:res.data
                })
            })
            .catch((err)=>console.log(err))
    }

    render(){
        console.log(this.state)
        return(
            <div>
                <form enctype="multipart/form-data" method="post" name="fileinfo">
                    <input type="text" name="title" onChange = {(evt)=> this.handleChange(evt)} placeholder = "Title"></input>
                    <br/>

                    <textarea name="body" onChange = {(evt)=> this.handleChange(evt)} placeholder = "Body"></textarea>
                    <br/>

                    <input type="file" multiple="true" name="body" onChange = {(evt)=> this.handleImageChange(evt)} placeholder = "Body"></input>
                    <br/>

                    <button onClick={(evt)=>this.handleSubmit(evt)}>Submit</button>
                </form>

                {this.state.blogs ? 
                    this.state.blogs.map((item, index)=>{
                        return(
                            <div key={index}>
                                <h1>{item.image}</h1>
                                {console.log(item.image)}
                                <img src = {`http://127.0.0.1:8000${item.image}`} alt="Image_Test" ></img>
                            </div>
                        )
                    }) : ""
                
                }

                <button onClick={()=>this.showBlogs()}>Show Blogs</button>
            </div>
        )
    }
}

export default connect()(ImageTest)