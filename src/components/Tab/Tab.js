import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Tab = props => {
  const tabRef = useRef(null);
  const prevPaddle = useRef(null);
  const nextPaddle = useRef(null);
  const [isTabOverflow, setIsTabOverflow] = useState(false);
  const [tabInvisiblePart, setTabInvisiblePart] = useState(0);
  const { tabs, className, activeTabIndex, tabActive, ...restProps } = props;
  const tabClass = `tab-wrapper ${className}`;
  const tabContainer = useMemo(() => tabRef?.current, [tabRef?.current, tabs]);
  const tabContentWidth = useMemo(() => tabContainer?.scrollWidth, [tabContainer, tabs]);
  const tabTotalWidth = useMemo(() => tabContainer?.offsetWidth, [tabContainer, tabs]);

  useLayoutEffect(() => {
    setIsTabOverflow(tabContentWidth > tabTotalWidth);
    setTabInvisiblePart(tabContentWidth - tabTotalWidth);
  }, [tabContentWidth, tabTotalWidth, tabs]);

  const scrollTab = (speed, direction, step) => {
    let scrollAmount = 0;
    const scroll = setInterval(() => {
      scrollAmount += step;
      if (direction === 'left') {
        tabContainer.scrollLeft -= step;
      } else {
        tabContainer.scrollLeft += step;
      }
      if (scrollAmount >= tabTotalWidth * 0.6) {
        window.clearInterval(scroll);
      }
    }, speed);
  };

  const onPrevClicked = useCallback(() => {
    scrollTab(10, 'left', 10);
  }, [tabContainer, isTabOverflow, tabInvisiblePart, tabTotalWidth]);

  const onNextClicked = useCallback(() => {
    scrollTab(10, 'right', 10);
  }, [tabContainer, isTabOverflow, tabInvisiblePart, tabTotalWidth]);

  return (
    <div className={tabClass}>
      {isTabOverflow && (
        <div
          type="button"
          ref={prevPaddle}
          className="tab-prev-next-button tab-prev-button material-icons"
          onClick={onPrevClicked}
        >
          arrow_left
        </div>
      )}

      {isTabOverflow && (
        <div
          type="button"
          ref={nextPaddle}
          className="tab-prev-next-button tab-next-button material-icons"
          onClick={onNextClicked}
        >
          arrow_right
        </div>
      )}

      <div ref={tabRef} className="tab-container" {...restProps}>
        {isTabOverflow && <div className="dummy-tab-div" />}
        {tabs?.length > 0 &&
          tabs.map((tab, index) => (
            <div
              key={index.toString()}
              className={`tab ${activeTabIndex === index && 'active-tab'}`}
              onClick={() => tabActive(index)}
            >
              {tab}
            </div>
          ))}
        {isTabOverflow && <div className="dummy-tab-div" />}
      </div>
    </div>
  );
};

Tab.propTypes = {
  tabs: PropTypes.array.isRequired,
  activeTabIndex: PropTypes.number,
  tabActive: PropTypes.func,
  className: PropTypes.string,
};

Tab.defaultProps = {
  className: '',
  activeTabIndex: 0,
  tabActive: '',
};

export default Tab;
