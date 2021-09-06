import React from 'react';
import PropTypes from 'prop-types';

const Switch = props => {
  const { id, className, switchContainerClass, ...restProps } = props;
  const switchClass = `common-switch ${className}`;
  return (
    <span className={switchContainerClass}>
      <input type="checkbox" id={id} className={switchClass} {...restProps} />
      <label htmlFor={id}>
        <div />
      </label>
    </span>
  );
};

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  switchContainerClass: PropTypes.string,
};

Switch.defaultProps = {
  className: 'common-switch ',
  switchContainerClass: '',
};

export default Switch;
