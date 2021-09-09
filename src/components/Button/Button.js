import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { isLoading, title, buttonType, className, children, ...restProps } = props;
  const buttonClass = `button ${buttonType}-button ${className}`;
  return (
    <button type="button" className={buttonClass} {...restProps} disabled={isLoading}>
      {isLoading ? <span className="button-loader" /> : title || children}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  buttonType: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'bg',
    'outlined-primary',
    'outlined-secondary',
    'outlined-active',
    'outlined-primary-small',
    'outlined-red-small',
    'outlined-red',
  ]).isRequired,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.element,
};

Button.defaultProps = {
  className: '',
  title: '',
  isLoading: false,
  children: null,
};

export default Button;
