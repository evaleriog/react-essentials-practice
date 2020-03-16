import React from 'react';
import {Link} from 'react-router-dom';
import './Card.css';
import LazyLoad from 'react-lazyload';

const Card = (props) => (
    <LazyLoad height={650} offset={-100}>
        <div className={props.card.animation}>
            <Link to={`/product/${props.card.id}`}>
                <div className="front" onClick={() => props.showBack(props.card)}>
                    <img src="juice.jpg" alt="Vitamin Juice" className="card-image" />
                    <div className="container">
                        <h3>Vitamin Juice <span className="price">$24.99</span></h3>
                        <p>{props.card.description}</p>
                    </div>
                </div>
                <div className="container-back back" onClick={() => props.showFront(props.card)}>
                    <h3>Vitamin Juice <span className="price">$24.99</span></h3>
                    <p>{props.card.description}</p>
                </div>
            </Link>
        </div>
    </LazyLoad>
);

export default Card;