import React from "react";

const Title = ({ text }) => {
    return (
        <div className="text-center mb-4">
            <h1 className="display-4 text-primary font-weight-bold">{text}</h1>
        </div>
    );
};

export default Title;
