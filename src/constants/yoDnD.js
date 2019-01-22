import shortid from 'shortid';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
export const dndTypes = {
  YO_COMP: 'yoComp'
};

export const GRID_SPACING = 40;

const prefix = 'DND__';
export const REG_DRAGGABLE = `${prefix}REG_DRAGGABLE`;
export const REFRESH_PALETTE = `${prefix}REFRESH_PALETTE`;
export const DROP_DRAGGABLE = `${prefix}DROP_DRAGGABLE`;
export const REMOVE_DRAGGABLE = `${prefix}REMOVE_DRAGGABLE`;

export const DRAGGABLES = [
    {tag: 'YoDropTarget', title: 'Canvas'},
    {tag: 'DonutChart'},
    {tag: 'HcDonutChart'},
    {tag: 'HcLineChart'},
    {tag: 'Iframe', title: 'Third Party Drill down',
      src: 'https://j5dash.yottaa.com/d/o7AbP05mk/third-party-drill-down?orgId=1&refresh=5m&panelId=2&fullscreen&from=now-7d&to=now'
      },
    {tag: 'Iframe', title: 'Traffic Last Hour',
      src: 'https://j5dash.yottaa.com/d/s2hx68Tiz/site-dashboard?refresh=5m&panelId=11&fullscreen&orgId=1'
      },
    {tag: 'Iframe', title: 'Site Performance',
      src: 'https://j5dash.yottaa.com/d/s2hx68Tiz/site-dashboard?refresh=5m&panelId=27&fullscreen&orgId=1'
      },
    {tag: 'Iframe', title: 'Performance by Geo',
      src: 'https://j5dash.yottaa.com/d/s2hx68Tiz/site-dashboard?refresh=5m&panelId=29&fullscreen&orgId=1'
      },
    {tag: 'Iframe', title: 'Performance Improvement',
      src: 'https://j5dash.yottaa.com/d/s2hx68Tiz/site-dashboard?refresh=5m&panelId=25&fullscreen&orgId=1'
      },
    {tag: 'Iframe', title: 'Sample',
      src: 'https://snapshot.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4',
      frameborder: 0
    }
  ];

