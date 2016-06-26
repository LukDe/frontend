import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import autobind from 'autobind-decorator'

import { loadNotifications } from '.././actions/notifications'
import NotificationList from '.././components/NotificationList'

class NotificationsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadNotifications()
  }

  @autobind
  handleTouchTapItem(notification) {
    browserHistory.push(`/notifications/${ notification.ID }`)
  }

  render() {
    const { notifications } = this.props;
    if (!notifications) {
      return <h1><i>Loading your notifications...</i></h1>
    }

    return (
      <div>
        <h1>Your Notifications</h1>
        <NotificationList notifications={notifications} onTouchTapItem={this.handleTouchTapItem} />
      </div>
    )
  }
}

NotificationsPage.propTypes = {
  notifications: PropTypes.array.isRequired,
  loadNotifications: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const { entities: { notifications } } = state;

  return {
    notifications: Object.values(notifications)
  }
}

export default connect(mapStateToProps, {
  loadNotifications
})(NotificationsPage)