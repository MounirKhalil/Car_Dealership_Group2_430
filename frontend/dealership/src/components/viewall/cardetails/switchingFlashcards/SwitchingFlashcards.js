import React, { useEffect, useState } from "react";

import "./SwitchingFlashcards.css";
import D from "../../../../img/D.png";

const CARD_PEN_OFFSET = 10;
const CARD_SWITCH_RANGE = "130%";

const SwitchingFlashcards = ({ car }) => {
  console.log(car);
  const [cards, setCards] = useState([]);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const cardElements = Array.from(document.querySelectorAll(".card"));
    setCards(cardElements);
  }, []);

  const setCardOffset = () => {
    const offsetArray = cards.map((_, index) => index * CARD_PEN_OFFSET);
    cards.forEach((item, index) => {
      item.style.zIndex = Math.abs(index - cards.length);
      item.style.transform = `translate(${offsetArray[index]}px, ${offsetArray[index]}px)`;
    });
  };

  useEffect(() => {
    if (cards.length > 0) {
      setCardOffset();
    }
  }, [cards]);

  const cardSwitching = (e) => {
    if (isMoving) return;

    if (e.keyCode !== 68 && e.keyCode !== undefined) return;

    if (e.type === "wheel") {
      e.preventDefault();
      return;
    }

    let animationObject, scrolling;
    cards.forEach((item) => {
      if (
        parseInt(window.getComputedStyle(item).zIndex) === cards.length ||
        parseInt(item.style.zIndex) === cards.length
      ) {
        const prevSiblingIndex =
          (cards.indexOf(item) - 1 + cards.length) % cards.length;
        const prevSibling = cards[prevSiblingIndex];

        if (e.deltaY > 0 || e.keyCode === 68) {
          animationObject = item;
          scrolling = "down";
        }

        animationObject.style.transform = `translate(0px, -${CARD_SWITCH_RANGE})`;
        setIsMoving(true);
      }
    });

    if (animationObject) {
      animationObject.addEventListener(
        "transitionend",
        () => {
          if (scrolling === "down") {
            animationObject.style.zIndex = 0;
            animationObject.style.transform = `translate(${
              CARD_PEN_OFFSET * cards.length
            }px, ${CARD_PEN_OFFSET * cards.length}px)`;
          } else if (scrolling === "up") {
            animationObject.style.zIndex = cards.length;
            animationObject.style.transform = "translate(0px, 0px)";
          }

          cards.forEach((item) => {
            item.style.zIndex =
              scrolling === "down"
                ? parseInt(item.style.zIndex) + 1
                : parseInt(item.style.zIndex) - 1;
            const offsetIndex = Math.abs(
              parseInt(item.style.zIndex) - cards.length
            );
            item.style.transform = `translate(${
              CARD_PEN_OFFSET * offsetIndex
            }px, ${CARD_PEN_OFFSET * offsetIndex}px)`;

            item.addEventListener("transitionend", () => setIsMoving(false), {
              once: true,
            });
          });
        },
        { once: true }
      );
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", cardSwitching);
    window.addEventListener("keydown", cardSwitching);

    return () => {
      window.removeEventListener("wheel", cardSwitching);
      window.removeEventListener("keydown", cardSwitching);
    };
  }, [cards, isMoving]);

  return (
    <div className="card-container">
      <div className="card first">
        <div className="press-d">
          <div className="press-d-text">
            <p>PRESS</p>
          </div>
          <img src={D} className="press-d-image" />
        </div>
      </div>

      <div className="card second">
        <div className="card-text-1">
          <div className="card-text-1-a">
            <p>MAKE</p>
          </div>
          <div className="card-text-1-b">
            <p>{car.make}</p>
          </div>
        </div>
      </div>

      <div className="card second">
        <div className="card-text-2">
          <div className="card-text-2-a">
            <p>MODEL</p>
          </div>
          <div className="card-text-2-b">
            <p>{car.model}</p>
          </div>
        </div>
      </div>

      <div className="card second">
        <div className="card-text-1">
          <div className="card-text-1-a">
            <p>YEAR</p>
          </div>
          <div className="card-text-1-b">
            <p>{car.year}</p>
          </div>
        </div>
      </div>

      <div className="card second">
        <div className="card-text-2">
          <div className="card-text-2-a">
            <p>PRICE USD</p>
          </div>
          <div className="card-text-2-b">
            <p>{car.price}</p>
          </div>
        </div>
      </div>

      <div className="card second">
        <div className="card-text-1">
          <div className="card-text-1-a">
            <p>COLOR</p>
          </div>
          <div className="card-text-1-b">
            <p>{car.color}</p>
          </div>
        </div>
      </div>

      <div className="card second">
        <div className="card-text-2">
          <div className="card-text-2-a">
            <p>DESCRIPTION</p>
          </div>
          <div className={"card-text-2-b description"}>
            <p>{car.description}</p>
          </div>
        </div>
      </div>

      <div className="card second">
        <div className="card-text-1">
          <div className="card-text-1-a">
            <p>AVAILABILITY</p>
          </div>
          <div className="card-text-1-b">
            <p>{car.quantity ? "YES" : "NO"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchingFlashcards;
