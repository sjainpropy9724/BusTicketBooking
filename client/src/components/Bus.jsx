import { IndianRupee } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Bus({ bus }) {
  const navigate = useNavigate();
  return (
    <div className="card p-3">
      <h1 className="text-lg primary-text">{bus.name}</h1>
      <hr />
      <div className="d-flex justify-content-between">
        <div>
          <p className="text-sm"><b>From</b></p>
          <p className="text-sm">{bus.from}</p>
        </div>
        <div>
          <p className="text-sm"><b>To</b></p>
          <p className="text-sm">{bus.to}</p>
        </div>
        <div>
          <p className="text-sm"><b>Fare</b></p>
          <p className="text-sm"><IndianRupee />{bus.fare} /-</p>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <p className="text-sm"><b>Journey Date</b></p>
          <p className="text-sm">{bus.journeyDate}</p>
        </div>
        <h1 className="text-lg underline secondary-text" onClick={()=>{
            navigate(`/book-now/${bus._id}`)
        }}>Book Now</h1>
      </div>
    </div>
  );
}

export default Bus;
