import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getContext } from '../../helper/util/getContext';

import { actionCreators, selectors } from '../../ducks';
import Sort from '../Sort/presenter';

const mapStateToProps = (state, { sortKey, stateKey }) => {
  const { sortKey: stateSortKey, isReverse } = selectors.getSort(state, stateKey);
  const isActive = stateSortKey === sortKey;
  const selection = selectors.getSelection(state, stateKey);
  return {
    isActive,
    selection,
    isReverse,
  };
};

const mapDispatchToProps = (dispatch, { sortKey, stateKey }) => ({
  onSort: bindActionCreators((sortFn) => actionCreators.doTableSort(stateKey, sortKey, sortFn), dispatch),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { selection, ...others } = stateProps;
  const { onSort } = dispatchProps;
  const sortFn = (item) => selection.indexOf(item.id) !== -1;
  return {
    ...ownProps,
    ...others,
    onSort: () => onSort(sortFn),
  };
}

const contextTypes = {
  stateKey: PropTypes.string.isRequired
};

export default getContext(contextTypes)(connect(mapStateToProps, mapDispatchToProps, mergeProps)(Sort));
