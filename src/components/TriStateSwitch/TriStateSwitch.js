import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useWindowWidth } from '../../hooks/useWindowWidth';

const TriStateSwitch = props => {
  const { className, onChange, state, disabled, title } = props;
  const switchContainerClass = `${className} tri-state-switch-container`;

  const [triState, setTriState] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const onTriStateChange = () => {
    setTriState(val => (val < 2 ? val + 1 : 0));
    setIsClicked(true);
  };

  useEffect(() => {
    if (state === 'true') setTriState(1);
    else if (state === 'false') setTriState(2);
    else setTriState(0);
  }, [state]);

  useEffect(() => {
    if (isClicked) {
      let switchState;
      if (triState === 0) {
        switchState = 'none';
      } else if (triState === 1) {
        switchState = 'true';
      } else {
        switchState = 'false';
      }
      onChange(switchState);
      setIsClicked(false);
    }
  }, [triState, isClicked]);

  return (
    <div className={`d-flex align-center just-center ${useWindowWidth() < 640 && 'flex-column'}`}>
      <div
        className={`${switchContainerClass} ${triState === 1 && 'yes-switch'} ${triState === 2 && 'no-switch'} ${
          disabled && 'cursor-not-allowed'
        }`}
        onClick={() => !disabled && onTriStateChange()}
      >
        <div />
      </div>
      {title && <span>{title}</span>}
    </div>
  );
};

TriStateSwitch.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  state: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

TriStateSwitch.defaultProps = {
  className: '',
  disabled: false,
  title: undefined,
};

export default TriStateSwitch;
