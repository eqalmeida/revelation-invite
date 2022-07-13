import React from "react";
import "./index.css";

export default function GiftBanner({ className = "", giftList = [] }) {
  return (
    <div className={`gift-banner ${className}`}>
      <p className="gift-banner-header">Ficaremos gratos se você trouxer:</p>

      <ul>
        {giftList.map((gift) => (
          <li>{gift}</li>
        ))}
      </ul>
    </div>
  );
}
