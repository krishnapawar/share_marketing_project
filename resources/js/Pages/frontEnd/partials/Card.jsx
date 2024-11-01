import React from 'react';

const Card = ({ card, className=''}) => {
  return (
    <div className={className+' c_card'}>
      <h6 className="card-title">{card?.title ?? ''}</h6>
      <p className="card-text">{card?.description ?? ''}</p>
      <p className="d-flex justify-content-between mb-0 border-top">
        <span className="text-start">Date:- {card.createdAt}</span>
        <span className="text-end">User:- {card.userName}</span>
      </p>
    </div>
  );
};

export default Card;
