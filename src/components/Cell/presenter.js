import PropTypes from 'prop-types';
import React from 'react';

import '../style.less';

const Cell = ({
  style,
  className = '',
  children
}) =>
  <div
    className={className || ['react-redux-composable-list-cell', 'react-redux-composable-list-cell-body'].join(' ')}
    style={style}
    role="gridcell"
  >
    {children}
  </div>;

Cell.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Cell;
