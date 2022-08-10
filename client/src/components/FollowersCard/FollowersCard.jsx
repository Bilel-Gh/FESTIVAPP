import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";

const FollowersCard = ({ location }) => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  return (
    <>
      {
        persons && persons.length > 1 ? (
              <div className="FollowersCard">
      <h3> Les festivaliers à suivre </h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
    </div> ) : <div>Pas de personnes à suivre</div>
      }
    </>
  )
}

export default FollowersCard