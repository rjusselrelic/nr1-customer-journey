import React from 'react';
import PropTypes from 'prop-types';
import KpiEval from '../../util/kpi';

function toSentenceCase(input) {
  const output = input
    .split(/(?=[A-Z])/)
    .join(' ')
    .toLowerCase();
  return output.charAt(0).toUpperCase() + output.slice(1);
}

export default class DataPoint extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    compareWith: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    label: PropTypes.string.isRequired,
    stat: PropTypes.object.isRequired,
    kpi: PropTypes.object
  };

 nFormatter(num, digits) {
   //simple number formatter from https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900/9462382#9462382
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "B" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "Q" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

  processValue() {
    const { stat, value } = this.props;
    //console.log("Processing value: ",JSON.stringify(stat),JSON.stringify(value))
    if (value === null || value === 'N/A') {
      return 'N/A';
    }
    let workingVal = value;
    if (stat.type === 'percentile') {
      //console.log("Percentile Keys:",stat.label,Object.keys(value))
      const percentileKeys = Object.keys(value);
      //console.log("Percentile value:",value[percentileKeys[0]])
      if (value[percentileKeys[0]] === null){
        workingVal = 'N/A'
      }
      else {
        workingVal = value[percentileKeys[0]].toFixed(2);
      }
     // console.log("Returning: ",workingVal)
    }
    if (stat.type === 'decimal') {
      workingVal = workingVal.toFixed(2);
      //console.log("Returning: ",workingVal)
    }
    switch (stat.value.display) {
      case 'percentage':
       // console.log("Returning: ",workingVal)
        return `${workingVal}`;
      case 'seconds':
        //console.log("Returning: ",workingVal)
        return `${workingVal} s`;
      case 'integer':
        //console.log("Returning: ",workingVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
        //return workingVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return this.nFormatter(workingVal,1);
      default:
        //console.log("Returning: ",workingVal)
        return workingVal;
    }
  }

  processClassnames() {
    const { stat, kpi, value, compareWith } = this.props;
    let classNames = `standardDataPoint ${
      stat.value.display === 'percentage' ? 'valueIsPercentage' : ''
    }`;
    if (kpi) {
      const kpiEval = new KpiEval({ stat, kpi, value, compareWith });
      if (kpiEval.isInViolation()) {
        classNames += ` inViolation`;
      } else if (kpiEval.isExceedingTarget()) {
        classNames += ` exceedingTarget`;
      }
    }
    return classNames;
  }

  render() {
    const { label } = this.props;
    const classNames = this.processClassnames();
    return (
      <div className={classNames}>
        <h5 className="value">{this.processValue()}</h5>
        <span className="label">{toSentenceCase(label)}</span>
      </div>
    );
  }
}
