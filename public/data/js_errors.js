export default {
  "aliasColors": {
    "time_window": "rgba(249, 217, 249, 0.01)"
  },
  "bars": false,
  "dashLength": 10,
  "dashes": false,
  "datasource": "Johnny5 - Realtime data",
  "fill": 1,
  "gridPos": {
    "h": 5,
    "w": 15,
    "x": 0,
    "y": 3
  },
  "id": 10,
  "legend": {
    "avg": false,
    "current": false,
    "max": false,
    "min": false,
    "show": true,
    "total": false,
    "values": false
  },
  "lines": true,
  "linewidth": 1,
  "links": [],
  "nullPointMode": "null",
  "percentage": false,
  "pointradius": 5,
  "points": false,
  "renderer": "flot",
  "seriesOverrides": [
    {
      "alias": "time_window",
      "yaxis": 2
    },
    {
      "alias": "Error Rate",
      "yaxis": 2
    },
    {
      "alias": "Origin Error Rate",
      "yaxis": 2
    },
    {
      "alias": "Optimized Error Rate",
      "yaxis": 2
    }
  ],
  "spaceLength": 10,
  "stack": false,
  "steppedLine": false,
  "targets": [
    {
      "alias": "",
      "expr": "",
      "format": "time_series",
      "hide": false,
      "intervalFactor": 1,
      "rawSql": "SELECT \nsum(js_errors[1]) as \"Optimized Errors\", \ntime, \n(sum(js_errors[1])/sum(event_count)) as \"Optimized Error Rate\"\nFROM aggregations.qoe_aggregation WHERE $__timeFilter(time) AND site_id = regexp_replace('$site_id', '(.*)_', '')::int \nAND opt_state = 1 AND device_type = 0 and browser_vendor = 0 and page_category_id = 0\nGROUP BY time ORDER BY time;",
      "refId": "A"
    },
    {
      "alias": "",
      "format": "time_series",
      "rawSql": "SELECT \nsum(js_errors[1]) as \"Origin Errors\", \ntime, \n(sum(js_errors[1])/sum(event_count)) as \"Origin Error Rate\"\nFROM aggregations.qoe_aggregation WHERE $__timeFilter(time) AND site_id = regexp_replace('$site_id', '(.*)_', '')::int \nAND opt_state != 1 AND device_type = 0 and browser_vendor = 0 and page_category_id = 0\nGROUP BY time ORDER BY time;\n",
      "refId": "B"
    }
  ],
  "thresholds": [],
  "timeFrom": null,
  "timeShift": null,
  "title": "Java Script Errors",
  "tooltip": {
    "shared": true,
    "sort": 0,
    "value_type": "individual"
  },
  "type": "graph",
  "xaxis": {
    "buckets": null,
    "mode": "time",
    "name": null,
    "show": true,
    "values": []
  },
  "yaxes": [
    {
      "format": "short",
      "label": "",
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    },
    {
      "format": "short",
      "label": "Minutes",
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    }
  ],
  "yaxis": {
    "align": false,
    "alignLevel": null
  }
}
