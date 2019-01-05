import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "react-table/react-table.css";
import cn from "classnames";
import "./events.css";

const columns = [
  {
    accessor: "id",
    filterable: false
  },
  {
    accessor: "component"
  },
  {
    accessor: "method",
    filterable: false
  }
];
const Events = ({ events, onRowClick, className }) => {
  return (
    <div className={cn('events', className)}>
      <ReactTable
        data={events}
        columns={columns}
        filterable={true}
        getTrProps={(state, rowInfo) => {
          return {
            onClick: (e, handleOriginal) => {
              onRowClick(rowInfo.index);
              if (handleOriginal) {
                handleOriginal();
              }
            }
          };
        }}
        noDataText="No events found"
        showPageJump={false}
        showPageSizeOptions={false}
        sortable={false}
      />
    </div>
  );
};

Events.defaultProps = {
  events: []
};

Events.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      method: PropTypes.string,
      component: PropTypes.string
    })
  )
};

export default Events;
