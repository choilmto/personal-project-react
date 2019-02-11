import React from 'react';
import { connect } from 'react-redux';
import { eventFilter } from './AppProps';

const mapDispatchToProps = (dispatch) => ({
  setSelection: dispatch(setSelection(selection))
});

const mapStateToProps = (state) => ({
  selection: state.display.selection
});

const Selection = ({ val, unselect }) =>
  (
    <div>
      {eventFilter.map((element) =>
        [<input type="radio"
          checked={this.props.selection === element.githubEventName}
          onChange={() => this.props.setSelection(element.githubEventName)}>
        </input>,
        <label>{element.radioLabel}</label>
      ])}
    </div>
  )

const ConnectedSelection = connect(mapStateToProps, mapDispatchToProps)(Selection);

export { ConnectedSelection };
