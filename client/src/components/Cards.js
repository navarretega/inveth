import React from "react";
import Card from "./Card";

import { cards } from "../data";

function Cards() {
  return (
    <div className="mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c, index) => (
          <Card
            key={index}
            imageUrl={c.imageUrl}
            location={c.location}
            title={c.title}
            subTitle={c.subTitle}
            minTokens={c.minTokens}
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;
