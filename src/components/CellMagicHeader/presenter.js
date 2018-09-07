import PropTypes from 'prop-types';
import React from 'react';

import './style.less';

import SortCaret from '../../helper/components/SortCaret';
import { sort } from '../../helper/services';

const getLinkClass = (sortKey, isActive) => {
  const linkClass = ['react-redux-composable-list-row-magic-header-inline'];

  if (isActive(sortKey)) {
    linkClass.push('react-redux-composable-list-row-magic-header-active');
  }

  return linkClass.join(' ');
}

const CellMagicHeader = ({
  primarySort,
  magicSorts,
  isActive,
  isReverse,
  onSort,
  onSetMagic,
  suffix,
  children
}) =>
  <div className={[
      'react-redux-composable-list-row-magic-header-custom-column',
      'react-redux-composable-list-row-magic-header'
    ].join(' ')}>
    <a
      onClick={() => onSort(primarySort.sortKey, primarySort.sortFn)}
      className={getLinkClass(primarySort.sortKey, isActive)}
      role="button"
      aria-sort={sort.getAriaSort(isActive(primarySort.sortKey), isReverse)}>
      {primarySort.label}
      &nbsp;
      <SortCaret suffix={suffix} isActive={isActive(primarySort.sortKey)} isReverse={isReverse} />
    </a>
    <a className={[
        'react-redux-composable-list-row-magic-header-column-selector-sign',
        getLinkClass(primarySort.sortKey, isActive)
      ].join(' ')}
      role="button"
      aria-label="Toggle column data">
      {children}
    </a>
    <ul className="react-redux-composable-list-row-magic-header-custom-column-selector"
      role="menu">
      <li
        key="react-redux-composable-list-row-magic-header-custom-column-selector-heading"
        className="react-redux-composable-list-row-magic-header-custom-column-selector-info"
        aria-hidden={true}>
        <small>Toggle column data to:</small>
      </li>
      {magicSorts.map(({ sortKey, label }, key) =>
        <li key={key}>
          <a
            onClick={() => onSetMagic(sortKey)}
            role="menuitemradio"
            aria-checked={primarySort.sortKey === sortKey}
            className={getLinkClass(sortKey, isActive)}>
            {label}
          </a>
        </li>
      )}
    </ul>
  </div>;

CellMagicHeader.propTypes = {
  primarySort: PropTypes.object.isRequired,
  magicSorts: PropTypes.array.isRequired,
  isActive: PropTypes.func.isRequired,
  isReverse: PropTypes.bool,
  onSort: PropTypes.func.isRequired,
  onSetMagic: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default CellMagicHeader;
