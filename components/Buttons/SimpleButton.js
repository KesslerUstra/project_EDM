import React from 'react';
import PropTypes from 'prop-types';
import styles from './SimpleButton.module.css';

function CustomButton({ icon, text, type, onClick }){
  
    return (
        <button
            className={`${styles.simpleButton} ${styles[type]}`}
            onClick={onClick}
        >
            {text}
            {icon && icon}
        </button>
    );
};

CustomButton.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default CustomButton;
