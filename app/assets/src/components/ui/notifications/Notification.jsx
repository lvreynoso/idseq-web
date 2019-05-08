import React from "react";
import PropTypes from "prop-types";
import AlertIcon from "~ui/icons/AlertIcon";
import CheckmarkIcon from "~ui/icons/CheckmarkIcon";
import cs from "./notification.scss";
import cx from "classnames";

class Notification extends React.Component {
  getIcon(type) {
    switch (type) {
      case "warn":
      case "error":
        return <AlertIcon />;
      case "success":
        return <CheckmarkIcon className={cs.successIcon} />;
      default:
        break;
    }
    return null;
  }

  render() {
    return (
      <div
        className={cx(
          this.props.className,
          cs.notification,
          cs[this.props.type]
        )}
      >
        <div className={cs.icon}>{this.getIcon(this.props.type)}</div>
        <div className={cs.content}>
          <div>{this.props.children}</div>
          {this.props.onClose && (
            <div className={cs.actions} onClick={this.props.onClose}>
              Dismiss
            </div>
          )}
        </div>
      </div>
    );
  }
}

Notification.defaultProps = {
  type: "info"
};

Notification.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(["success", "info", "warn", "error"])
};

export default Notification;