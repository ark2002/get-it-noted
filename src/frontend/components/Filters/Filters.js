import React from "react";
import { useFilter } from "../../context";
import "./Filters.css";

const Filters = ({ ref }) => {
  const {
    filters: { sortBy, categories, rating, maxPrice },
    dispatchFilters,
  } = useFilter();

  return (
    <div className="filter__dropdown secondary__font" autoFocus ref={ref}>
      <h2
        className="filter__headings filter__reset"
        onClick={() => dispatchFilters({ type: "RESET" })}
      >
        Reset Filters
      </h2>
      <div className="filter__selections  flex--row">
        <div className="filter__labels flex--column">
          <h3 className="filter__headings">Label</h3>
          <label className="filter__input-label flex--row">
            <input
              type="radio"
              name="label"
              onChange={() =>
                dispatchFilters({ type: "LABELSFILTER", payload: "LABEL 1" })
              }
              autoFocus
            />
            Label 1
          </label>
          <label className="filter__input-label flex--row">
            <input
              type="radio"
              name="label"
              onChange={() =>
                dispatchFilters({ type: "LABELSFILTER", payload: "LABEL 2" })
              }
            />
            Label 2
          </label>
        </div>
        <div className="filter__priority flex--column">
          <h3 className="filter__headings">Priority</h3>
          <label className="filter__input-label flex--row">
            <input
              type="radio"
              name="priority"
              onChange={() =>
                dispatchFilters({ type: "PRIORITYFILTER", payload: "HIGH" })
              }
            />
            High
          </label>
          <label className="filter__input-label flex--row">
            <input
              type="radio"
              name="priority"
              onChange={() =>
                dispatchFilters({ type: "PRIORITYFILTER", payload: "MEDIUM" })
              }
            />
            Medium
          </label>
          <label className="filter__input-label flex--row">
            <input
              type="radio"
              name="priority"
              onChange={() =>
                dispatchFilters({ type: "PRIORITYFILTER", payload: "LOW" })
              }
            />
            Low
          </label>
        </div>
        <div className="filter__time flex--column">
          <h3 className="filter__headings">Time</h3>
          <label className="filter__input-label flex--row">
            <input
              type="radio"
              name="time"
              onChange={() =>
                dispatchFilters({ type: "TIMESORT", payload: "old-to-new" })
              }
            />
            Old to New
          </label>
          <label className="filter__input-label flex--row">
            <input
              type="radio"
              name="time"
              onChange={() =>
                dispatchFilters({ type: "TIMESORT", payload: "new-to-old" })
              }
            />
            New to Old
          </label>
        </div>
      </div>
    </div>
  );
};

export { Filters };
