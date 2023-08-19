import React, { Component } from 'react'

export default class NewsElement extends Component {
  render() {
    let {title,description,url,img,author,date,name} = this.props
    return (
     
        <div className="card my-2" >
  <img src={img?img:"https://static.vecteezy.com/system/resources/thumbnails/004/216/831/small/3d-world-news-background-loop-free-video.jpg"} style={{height:"220px"}} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title.slice(0,50)}...</h5>
    <h6 className='text-primary'> {name} <span class="badge bg-danger">New</span></h6>
    {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> {name}</span> */}
    <p className="card-text">{description?description.slice(0,80):""}...</p>
    <p className="card-text">
  <small className="text-muted">
    By {author ? author : "anonymous"} on {new Date(date).toString()}
  </small>
</p>
    <a href={url} target="_blank" className="btn btn-dark">Read Full Story</a>
  </div>
</div>
     
    )
  }
}
