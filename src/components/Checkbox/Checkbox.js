import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => {
  const { title, className, checkmarkClass, ...restProps } = props;
  return (
    <div className={className} onClick={e => e.stopPropagation()}>
      <label className="checkbox-container" style={{ paddingLeft: title ? '30px' : '24px' }}>
        {title}
        <input type="checkbox" {...restProps} />
        <span className={`checkmark ${checkmarkClass}`} />
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  title: PropTypes.element,
  className: PropTypes.string,
  checkmarkClass: PropTypes.string,
};

Checkbox.defaultProps = {
  title: '',
  className: '',
  checkmarkClass: '',
};
export default Checkbox;
