import React from "react";
import { ViewMode } from "../types";

type Props = {
  onSelect: (arg: ViewMode) => void;
  current: ViewMode;
};

function ViewSelect({ current, onSelect }: Props) {
  return (
    <div className="flex items-center">
      <div className="inline-flex items-center">
        <span>List</span>

        <label
          className="relative flex items-center p-3 rounded-full cursor-pointer"
          htmlFor="list"
        >
          <input
            name="view"
            type="radio"
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-sky-500 before:opacity-0 before:transition-opacity checked:border-sky-500 checked:before:bg-sky-500 hover:before:opacity-10"
            id="list"
            value={ViewMode.list}
            checked={current === ViewMode.list}
            onChange={() => onSelect(ViewMode.list)}
          />
          <span className="absolute text-sky-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </span>
        </label>
      </div>
      <div className="inline-flex items-center">
        <label
          className="relative flex items-center p-3 rounded-full cursor-pointer"
          htmlFor="map"
        >
          <input
            name="view"
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-sky-500 before:opacity-0 before:transition-opacity checked:border-sky-500 checked:before:bg-sky-500 hover:before:opacity-10"
            type="radio"
            id="map"
            value={ViewMode.map}
            checked={current === ViewMode.map}
            onChange={() => onSelect(ViewMode.map)}
          />
          <span className="absolute text-sky-500 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </span>
        </label>
        <span>Map</span>
      </div>
    </div>
  );
}

export default ViewSelect;
