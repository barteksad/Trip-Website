// import React from 'react';
import { useParams } from "react-router-dom";

export const TripPage = () => {
    const { id } = useParams();

    return { id };
};
