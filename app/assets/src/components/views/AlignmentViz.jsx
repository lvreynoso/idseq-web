import React from "react";
import cx from "classnames";
import { Popup } from "semantic-ui-react";
import { getAlignmentData } from "~/api";
import { getSampleMetadata } from "~/api/metadata";
import AccessionViz from "../AccessionViz";
import { pipelineVersionHasAssembly } from "../utils/sample";
import cs from "./alignment_viz.scss";

class AlignmentViz extends React.Component {
  constructor(props) {
    super();
    this.sampleId = props.sampleId;
    this.alignmentQuery = props.alignmentQuery;
    this.taxId = props.taxId;
    this.taxLevel = props.taxLevel;
    this.taxName = props.taxName;
    this.pipelineVersion = props.pipelineVersion;
    this.readsPerPage = props.readsPerPage || 20;
    this.state = {
      alignmentData: [],
      pipelineRun: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const { sampleId } = this.props;

    // TODO(mark): Remove the metadata call once the alignment viz takes assembly into account.
    const [alignmentData, metadata] = await Promise.all([
      getAlignmentData(sampleId, this.alignmentQuery, this.pipelineVersion),
      getSampleMetadata(sampleId, this.pipelineVersion),
    ]);

    this.setState({
      loading: false,
      alignmentData,
      pipelineRun: metadata.additional_info.pipeline_run,
    });
  }

  render() {
    const { loading, alignmentData, pipelineRun } = this.state;
    if (loading) {
      return (
        <div>
          <h2 className={cs.heading}>
            Loading alignment data for {this.taxName} ({this.taxLevel}) ...
          </h2>
        </div>
      );
    } else if (Array.isArray(alignmentData)) {
      return (
        <div>
          <h2 className={cs.heading}>
            {this.taxName ? this.taxName + " (" + this.taxLevel + ")" : ""}
            Alignment ({alignmentData.length} unique accessions)
            {pipelineRun &&
              pipelineVersionHasAssembly(pipelineRun.pipeline_version) && (
                <Popup
                  trigger={
                    <i
                      className={cx("fa fa-exclamation-circle", cs.warningIcon)}
                    />
                  }
                  position="bottom left"
                  content={`
                Only alignments of individual reads are listed. Contig assembly is not currently included.
              `}
                  inverted
                  wide="very"
                  horizontalOffset={4}
                  className={cs.popup}
                />
              )}
          </h2>
          <div className={cs.accessionViz}>
            {alignmentData.map(function(item, i) {
              return (
                <AccessionViz
                  key={`accession_${i}`}
                  readsPerPage={this.readsPerPage}
                  {...item}
                />
              );
            }, this)}
          </div>
        </div>
      );
    } else {
      return <div>{alignmentData.error}</div>;
    }
  }
}

export default AlignmentViz;
