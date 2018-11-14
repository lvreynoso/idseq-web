import React from "react";
import { set } from "lodash/fp";
import { PIPELINE_INFO_FIELDS } from "./constants";
import MetadataSection from "./MetadataSection";
import ERCCScatterPlot from "~/components/ERCCScatterPlot";
import PropTypes from "~/components/utils/propTypes";
import { getDownloadLinks } from "../utils/download";
import cs from "./sample_details_sidebar.scss";

class PipelineTab extends React.Component {
  state = {
    sectionOpen: {
      pipelineInfo: true,
      erccScatterplot: false,
      downloads: false
    },
    sectionEditing: {},
    graphWidth: 0
  };

  componentDidMount() {
    this.updateGraphDimensions();
  }

  componentDidUpdate() {
    this.updateGraphDimensions();
  }

  updateGraphDimensions = () => {
    if (this._graphContainer && this.state.graphWidth === 0) {
      this.setState({
        graphWidth: this._graphContainer.offsetWidth
      });
    }
  };

  toggleSection = section => {
    const { sectionOpen } = this.state;

    this.setState({
      sectionOpen: set(section, !sectionOpen[section], sectionOpen)
    });
  };

  renderPipelineInfoField = field => {
    const { pipelineInfo } = this.props;
    const val = pipelineInfo[field.key];

    return (
      <div className={cs.field} key={field.key}>
        <div className={cs.label}>{field.name}</div>
        {val === undefined || val === null || val === "" ? (
          <div className={cs.emptyValue}>--</div>
        ) : (
          <div className={cs.metadataValue}>{val}</div>
        )}
      </div>
    );
  };

  render() {
    const { pipelineRun, assembledTaxIds, sampleId } = this.props;
    return (
      <div>
        <MetadataSection
          toggleable
          onToggle={() => this.toggleSection("pipelineInfo")}
          open={this.state.sectionOpen.pipelineInfo}
          title="Pipeline Info"
        >
          {PIPELINE_INFO_FIELDS.map(this.renderPipelineInfoField)}
        </MetadataSection>
        <MetadataSection
          toggleable
          onToggle={() => this.toggleSection("erccScatterplot")}
          open={this.state.sectionOpen.erccScatterplot}
          title="ERCC Spike in Counts"
          className={cs.erccScatterplotSection}
        >
          <div
            ref={c => (this._graphContainer = c)}
            className={cs.graphContainer}
          >
            <ERCCScatterPlot
              ercc_comparison={this.props.erccComparison}
              width={this.state.graphWidth}
              height={0.7 * this.state.graphWidth}
            />
          </div>
        </MetadataSection>
        <MetadataSection
          toggleable
          onToggle={() => this.toggleSection("downloads")}
          open={this.state.sectionOpen.downloads}
          title="Downloads"
        >
          <div className={cs.downloadSectionContent}>
            {getDownloadLinks(sampleId, pipelineRun, assembledTaxIds).map(
              option => (
                <a
                  key={option.label}
                  className={cs.downloadLink}
                  href={option.path}
                  target={option.newPage ? "_blank" : "_self"}
                >
                  {option.label}
                </a>
              )
            )}
          </div>
        </MetadataSection>
      </div>
    );
  }
}

PipelineTab.propTypes = {
  pipelineInfo: PropTypes.objectOf(PropTypes.string),
  erccComparison: PropTypes.ERCCComparison,
  pipelineRun: PropTypes.PipelineRun,
  assembledTaxIds: PropTypes.arrayOf(PropTypes.string),
  sampleId: PropTypes.number
};

export default PipelineTab;
