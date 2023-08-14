import React from "react";

type Props = {
  error: Error;
  children?: JSX.Element;
};

const ErrorMessage = ({ error, children }: Props) => {
  return (
    <div className="error-notification">
      <p className="error-message">
        Une erreur s'est produite. Merci de contacter votre administrateur et
        vous assurer que la procédure a été respectée.
      </p>
      <div className="error-content">
        <p>Message: {error.message}</p>
        <p>Code erreur: {error.name}</p>
        {children}
      </div>
    </div>
  );
};

export default ErrorMessage;
