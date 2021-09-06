import React from 'react';
import PropTypes from 'prop-types';

const Checklist = props => {
  const { detail } = props;
  return (
    <div>
      {detail.title ?? detail}
      {detail?.list?.map(point => (
        <div className="d-flex">
          <span className="mr-10">-</span> <span>{point}</span>
        </div>
      ))}
    </div>
  );
};

Checklist.propTypes = {
  detail: PropTypes.element,
};

Checklist.defaultProps = {
  detail: null,
};

export default Checklist;
