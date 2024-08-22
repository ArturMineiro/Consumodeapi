// Button.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'; // Certifique-se de que o caminho para o CSS está correto

function Button({ to, children }) {
  return (
    <Link to={to} className="botao">
      {children}
    </Link>
  );
}

export default Button;
