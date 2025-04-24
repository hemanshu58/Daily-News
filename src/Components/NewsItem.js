import React, { Component } from 'react'
// import img from "./hem.jpg";

export class NewsItem extends Component {

   
    render() {
        let {title,description,imageUrl,newsUrl,author , date,source} = this.props;
        return (
            <div className='my-4'>
                <div className="card" style={{width: "20rem" }}>
                    <span className='position-absolute top-0  translate-middle badge rounded-pill bg-danger'
                     style={{ left: '95%' ,  zIndex: '1'}}>{source}</span>
                    <img src={!imageUrl?"https://techcrunch.com/wp-content/uploads/2024/05/Checkfirst-team.webp":imageUrl}   alt="img not fouhnd" />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} On {new Date(date).toGMTString()}</small></p>
                        <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
