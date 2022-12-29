import { Grid, Pagination, Select, TextField } from "cx/widgets";
import { Store } from "cx/data";
import { startHotAppLoop } from "cx/ui";

import "cx/dist/reset.css";
import "cx/dist/widgets.css";
import "./index.scss";

import PageController from "./Controller";

startHotAppLoop(
  module,
  document.getElementById("app"),
  new Store(),
  <cx>
    <div controller={PageController}>
      <Grid
        records:bind="$page.records"
        style={{ width: "100%" }}
        mod="bordered"
        lockColumnWidths
        columns={[
          {
            field: "fullName",
            sortable: true,
            header1: "Name",
            header2: {
              allowSorting: false,
              items: (
                <TextField
                  value:bind="$page.filter.name"
                  reactOn="enter blur"
                  style="width:100%"
                />
              )
            }
          },
          {
            header1: "Phone",
            header2: {
              items: (
                <TextField
                  value:bind="$page.filter.phone"
                  reactOn="enter blur"
                  style="width:100%"
                />
              )
            },
            field: "phone"
          },
          {
            header1: "City",
            header2: {
              allowSorting: false,
              items: (
                <TextField
                  value:bind="$page.filter.city"
                  reactOn="enter blur"
                  style="width:100%"
                />
              )
            },
            field: "city",
            sortable: true
          }
        ]}
        sorters:bind="$page.sorters"
        remoteSort
      />
      <div style={{ marginTop: "20px" }}>
        <Pagination page:bind="$page.page" pageCount:bind="$page.pageCount" />
        <Select value:bind="$page.pageSize" style={{ float: "right" }}>
          <option value="5">5</option>
          <option value={10}>10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Select>
      </div>
    </div>
  </cx>
);
