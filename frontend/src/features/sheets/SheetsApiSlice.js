import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const sheetsAdapter = createEntityAdapter({});

const initialState = sheetsAdapter.getInitialState();

export const sheetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSheets: builder.query({
      query: () => "/sheets",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 60,
      transformResponse: (responseData) => {
        const loadedSheets = responseData.map((sheet) => {
          // do this because mongodb saves id as _id
          sheet.id = sheet._id;
          return sheet;
        });
        return sheetsAdapter.setAll(initialState, loadedSheets);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "sheet", id: "LIST" },
            ...result.ids.map((id) => ({ type: "sheet", id })),
          ];
        } else return [{ type: "sheet", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetSheetsQuery } = sheetsApiSlice;

// return query result object
export const selectSheetsResult = sheetsApiSlice.endpoints.getSheets.select();

// create selector
const selectSheetsData = createSelector(
  selectSheetsResult,
  (sheetsResult) => sheetsResult.data
);

// getSelectors already creates these selectors for us, we only rename them
export const {
  selectAll: selectAllSheets,
  selectById: selectSheetById,
  selectIds: selectSheetIds,
} = sheetsAdapter.getSelectors(
  (state) => selectSheetsData(state) ?? initialState
);
