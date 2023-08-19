import React, { Component } from 'react';
import NewsElement from './newsElement';
import Navbar from './navbar';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
  state = {
    articles: [],
    page: 1,
    loading: false
  };

  static defaultProps = {
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }

  componentDidMount() {
    const apiKey = 'f96b1ae9d1d048bfa0408d40cd67a38c'; // Replace with your actual API key

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=20`;
    this.fetchNewsData(url);
  }

  fetchNewsData = async (url) => {
    this.setState({loading: true});
    // console.log(url);
    console.log(this.props.category);
    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
      this.setState({loading: false});
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  search = async (query) => {
    query = document.getElementById("search").value;
    this.state.page=1;
    const apiKey = 'f96b1ae9d1d048bfa0408d40cd67a38c'; // Replace with your actual API key
    const newsurl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&page=${this.state.page}&pageSize=20`;
    console.log(newsurl)
    this.setState({loading: true});
    try {
      const newsdata = await fetch(newsurl);
      const prse = await newsdata.json();

      this.setState({ articles: prse.articles });
      this.setState({loading: false});
    } catch (error) {
      console.error('Error searching news:', error);
    }
  };

  handlePrevClick = () => {
    const apiKey = 'f96b1ae9d1d048bfa0408d40cd67a38c'; // Replace with your actual API key
   
    
    if (this.state.page > 1) {
      
      this.setState({ page: this.state.page - 1 }, () => {
        let query = document.getElementById("search").value;

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=20`;
        if(query){
   url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&page=${this.state.page}&pageSize=20`;
    
        }
        this.fetchNewsData(url);
      });
    }
  };

  handleNextClick = () => {
    const apiKey = 'f96b1ae9d1d048bfa0408d40cd67a38c'; // Replace with your actual API key
   
    
    // if (this.state.page+1 < Math.ceil(this.state.totalResults / 20)) {
      
      this.setState({ page: this.state.page + 1 }, () => {
        let query = document.getElementById("search").value;

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=20`;
        if(query){
   url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&page=${this.state.page}&pageSize=20`;
    
        }
        console.log(url)
        this.fetchNewsData(url);
        
      });
    // }
    
    
  };

  render()
   {
    return (
      <div>
        <Navbar search={this.search} />
        <h1>Headlines Of the Day</h1>
        {this.state.loading&&<Spinner/>}
        <div className='row' style={{margin:"auto"}}>
          {!this.state.loading&&this.state.articles.map((article) => (
            <div className='col-md-3' key={article.url}>
              <NewsElement
                title={article.title}
                url={article.url}
                description={article.description}
                img={article.urlToImage}
                author={article.author}
                date={article.publishedAt}
                name={article.source.name}
              />
            </div>
          ))}
        </div>
        <div className='container d-flex justify-content-between'>
          <button
            type='button'
            disabled={this.state.page <= 1}
            className='btn btn-dark'
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type='button'
            disabled={this.state.page>(this.state.totalResults/20)}
            className='btn btn-dark'
            onClick={this.handleNextClick}
            id='next'
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
