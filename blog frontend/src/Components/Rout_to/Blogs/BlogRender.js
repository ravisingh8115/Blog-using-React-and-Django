import React from 'react'
import { Button, Card, Col, Container, Row, ButtonGroup  } from 'react-bootstrap'
import ShowMoreText from 'react-show-more-text'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FaEdit } from "react-icons/fa";
import {FcNext} from 'react-icons/fc'
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri'
import { connect } from 'react-redux'
import secureAxios from '../../../secureAxios'

class BlogRender extends React.Component{

    constructor(props){
        super(props)
    }

    handleDelete=(id, index)=>{
        secureAxios.delete(`/blog/${id}`)
            .then(res => {
                console.log(res.data)
                this.props.deleteBlog(index)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleEdit=(blog)=>{
        console.log(blog)
        this.props.editBlog({...blog, edit:true})
        this.props.history.push('/detailblog')
        // window.location.href = '/detailblog'
    }

    viewDetails =(blog)=>{
        this.props.viewBlog({...blog, edit:false})
        this.props.history.push('/detailblog')
        // window.location.href = '/detailblog'
    }

    likeBlog = (id, index) =>{
        const postData = JSON.stringify({blog_likes :true})

        secureAxios.put(`/blog/${id}/`, postData, {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("access")}`,
        }
        }).then(res => {
            console.log(res.data)
            this.props.likeBlog(index)
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        console.log(this.props.userDetails, "props in BlogRender")
        return(
            <div>
                <Card className="bg-warning" style={{ backGroundColor:"palegoldenrod" }}>
                    <Card.Img src={`http://127.0.0.1:8000${this.props.item.image}`} alt="Card image" />
                        <Card.Title className="m-2" style={{ margin: "auto", alignContent:"center"}}>{this.props.item.title}</Card.Title>
                        <hr/>
                        <Card.Text className="m-2">
                            <ShowMoreText 
                                lines={3} more='...' less='Show less' expanded={false}> 
                                {this.props.item.body}
                            </ShowMoreText>
                        </Card.Text>
                        <hr/>
                        <Card.Footer className="m-2">
                            <Row className='mt-3'>
                                <ButtonGroup className="m-auto" lg = {{ span: 4 }} sm = {{ span: 2 }}>
                                    <Button className="m-auto" onClick={()=>{this.likeBlog(this.props.item.id, this.props.index)}}><RiHeart3Fill/> <strong>{this.props.item.blog_likes}</strong></Button>
                                    
                                    {this.props.userDetails.is_superuser ||
                                    this.props.userDetails.id === this.props.item.author?
                                        <>
                                            <Button className='m-2' variant='outline-success' onClick={()=>{this.props.handleEdit(this.props.item)}}> <FaEdit className="m-auto"/></Button>
                                            <Button className='m-2' variant='outline-danger' onClick = {()=>this.props.handleDelete(this.props.item.id, this.props.index)}><RiDeleteBinLine className="m-auto" /></Button>
                                        </>
                                        :
                                        <></>
                                    }
                                    <Button className='m-2' variant='outline-success' onClick = {()=>{this.props.viewDetails(this.props.item)}}> <FcNext/></Button>
                                </ButtonGroup>
                            </Row>
                            <footer>
                                <Row>
                                    <Col sm='5'><small>Posted On:</small></Col>
                                    <Col sm='7'><small>{new Date(this.props.item.date_published).toDateString()}</small></Col>
                                </Row>
                            </footer>
                        </Card.Footer>
                </Card>
                <hr/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        userDetails: state.userDetails,
        bearerToken: state.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        allBlogs: (val) => dispatch({type:'ALL_BLOGS',payload:val}),
        deleteBlog: (val)=>dispatch({type: "DELETE_BLOG", payload: val}),
        editBlog:(val)=>dispatch({type:'EDIT_BLOG', payload:val}),
        viewBlog: (val)=>{
            dispatch({type:'VIEW_BLOG', payload:val})
        },
        likeBlog:(val)=>{
            dispatch({type:"LIKE_THIS_BLOG", payload:val})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogRender)