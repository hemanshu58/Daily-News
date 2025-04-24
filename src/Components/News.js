import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    pageSize : 6,
    caregory: 'general'
  }

  static propTypes ={
    pageSize: PropTypes.number, 
    caregory: PropTypes.string,
  }

  capitalizeFirstLetter = (val)=> {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

constructor(props){
    super(props);
   
    this.state = {
        articles : [],
        loading : false,
        page:1
    }

    document.title = `${this.capitalizeFirstLetter(this.props.category)} - DailyNews`;
}

async updateNews(){
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=c8c280c1f3ed40e0b349a6eefe485b79&page=${this.state.page}&pageSize=${this.props.pageSize}`
  this.setState({loading: true})
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  this.setState({
    articles: parsedData.articles , 
    totalResults: parsedData.totalResults,
    loading: false 
  
  })
}

async componentDidMount(){
 this.updateNews();
}

handlePreviousClick = async ()=>{
  // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=c8c280c1f3ed40e0b349a6eefe485b79&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
  // this.setState({loading: true})
  // let data = await fetch(url);
  // let parsedData = await data.json();
  // console.log(parsedData);
  // this.setState({
  //   page: this.state.page - 1,
  //   articles: parsedData.articles,
  //   loading: false
  // })
  this.setState({page: this.state.page - 1});
  this.updateNews();
}

handleNextClick = async ()=>{
//   if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
//     let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=c8c280c1f3ed40e0b349a6eefe485b79&page=${this.state.page +1}&pageSize=${this.props.pageSize}`
//     this.setState({loading: true})
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({
//     page: this.state.page + 1,
//     articles: parsedData.articles,
//     loading: false
//   })
// }
    this.setState({page: this.state.page +1});
    this.updateNews();
}

  render() {
    return (
      <div className='container my-5'>
        <hr />
        <h2 className="text-center">DailyNews - Top { document.title = `${this.capitalizeFirstLetter(this.props.category)}`} Headlines</h2><hr />
        {this.state.loading && <Spinner/>}

        <div className="row ">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4 "  key={element.url}>
               <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>
          &larr; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        
        
      </div>
    )
  }
}

export default News
