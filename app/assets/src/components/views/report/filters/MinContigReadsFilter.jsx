import React from "react";
import PropTypes from "prop-types";
import Input from "~ui/controls/Input";
import HelpIcon from "~ui/containers/HelpIcon";
import cs from "./min_contig_reads_filter.scss";
import BareDropdown from "~ui/controls/dropdowns/BareDropdown";
import DropdownTrigger from "../../../ui/controls/dropdowns/common/DropdownTrigger";

const MIN_CONTIG_READS_LOWER_BOUND = 4;

class MinContigReadsFilter extends React.Component {
  state = {
    value: this.props.value,
    error: "",
    previousValue: this.props.value,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value,
        previousValue: this.props.value,
      });
    }
  }

  handleChange = value => {
    this.setState({ value });
  };

  handleBlur = () => {
    const newValue = Number(this.state.value);

    if (isNaN(newValue) || newValue < MIN_CONTIG_READS_LOWER_BOUND) {
      // Reset back to the previous value.
      this.setState({
        value: this.state.previousValue,
        error: "Size must be at least 4.",
      });
    } else {
      this.setState({
        error: "",
      });
      if (this.props.onChange) {
        this.props.onChange(newValue);
      }
    }
  };

  renderContents = () => {
    const helpText = `
      Contig Size refers to the number of reads that covered the contig.
      Only contigs that were assembled from at least {Min Contig Reads} reads will be counted in the contig and contig r columns.
    `;

    return (
      <div className={cs.contents}>
        <div className={cs.labelContainer}>
          <span className={cs.label}>Set the Min Contig Reads:</span>
          <HelpIcon text={helpText} />
        </div>
        <Input
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          type="number"
          className={cs.input}
        />
        {this.state.error && <div className={cs.error}>{this.state.error}</div>}
      </div>
    );
  };

  render() {
    const labelText =
      "Min Contig Reads" +
      (this.state.value !== undefined && this.state.value !== null ? ":" : "");
    return (
      <BareDropdown
        className={cs.minContigReadsFilter}
        trigger={
          <DropdownTrigger
            className={cs.dropdownTrigger}
            label={labelText}
            value={this.state.value}
            rounded
          />
        }
        floating
        arrowInsideTrigger
        closeOnClick={false}
      >
        {this.renderContents()}
      </BareDropdown>
    );
  }
}

MinContigReadsFilter.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default MinContigReadsFilter;
