import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// var style = {
//     backgroundColor: 'orange',
//     color: 'white',
//     fontFamily: 'Arial'
// };
//
// const title = React.createElement(
//     'h1',
//     {id: 'title', className: 'header', style: style},
//     'Hello World'
// );
let bookList = [
    {"title": "Hunger", "author":"Roxane Gay", "pages":320},
    {"title": "The Sun Also Rises", "author":"Ernest Hemingway", "pages":260},
    {"title": "White Teeth", "author":"Zadie Smith", "pages":480},
    {"title": "Cat's Cradle", "author":"Kurt Vonnegut", "pages":304}
];

const Book = ({title="No title provided", author="No author provided", pages=0}) => {
    return(
        <section>
            <h2>{title}</h2>
            <p>by: {author}</p>
            <p>Pages: {pages} pages</p>
        </section>
    )
};

const Hiring = () =>
    <div>
        <p>The library is hiring. Go to www.library.com/jobs for more.</p>
    </div>

const NotHiring = () =>
    <div>
        <p>The library is not hiring. Check back later for more info.</p>
    </div>

class Library extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            hiring: true,
            data: [],
            loading: false
        };
        this.toggleOpenClose = this.toggleOpenClose.bind(this);
    }
    componentDidMount() {
        this.setState({loading: true})
        fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/1')
            .then(data => data.json())
            .then(data => this.setState({data, loading: false}))
    }

    toggleOpenClose(){
        this.setState({
            open: !this.state.open
        })
    }

    render(){
        const { books } = this.props;
        return(
            <div>
                {this.state.hiring ? <Hiring /> : <NotHiring />}
                {this.state.loading
                ? "loading..."
                : <div>
                        {this.state.data.map(product => {
                            return (
                                    <div key={product.id}>
                                        <h3>Library Product of the Week</h3>
                                        <h4>{product.name}</h4>
                                        <img src={product.image} height={100} alt={product.name}/>
                                    </div>
                                )
                        })}
                    </div>
                }
                <h1>The library is {this.state.open ? 'open' : 'closed'}</h1>
                <button onClick={this.toggleOpenClose}>Change</button>
                {books.map(
                    (book, i) =>
                        <Book key={i} title={book.title} author={book.author} pages={book.pages} />
                )}
            </div>
        )
    }
}

Library.propTypes = {
    books: PropTypes.array
};

ReactDOM.render(<Library books={bookList}/>, document.getElementById('root'));
