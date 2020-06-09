const journeyConfig = [
  {
    id: 0,
    title: '[Prod] Sign - Customer Journey (Shard)',
    accountId: 476672,
    funnel: {
      event: 'PageView',
      measure: 'session'
    },
    kpis: [
      {
        label: 'Error Rate',
        ref: 'errorRate',
        value: 3.0,
        bound: 'higherViolation',
        description:
          'If the error rate is higher that 3%, mark that as a notable.'
      },
      {
        label: 'Page views',
        ref: 'clickCount',
        value: 5.0,
        bound: 'percentage',
        description: 'If the percentage change is plus or minus 10%, flag that.'
      },
      {
        label: 'Page Load Avg.',
        ref: 'averageDuration',
        value: 1,
        bound: 'lowerTarget',
        description: "We're targeting sub-second load times."
      }
    ],
    series: [
      {
        id: 0,
        label: 'All Shards',
        nrqlWhere: "appName like 'EchoSign-prod%'",
      },
      {
        id: 1,
        label: 'North America',
        nrqlWhere: "appName LIKE 'EchoSign-prod-na%-%'"
      },
      {
        id: 2,
        label: 'Europe',
        nrqlWhere: "appName LIKE 'EchoSign-prod-eu%-%'"
      },
      {
        id: 3,
        label: 'India',
        nrqlWhere: "appName LIKE 'EchoSign-prod-in%-%'"
      },
      {
        id: 4,
        label: 'Australia',
        nrqlWhere: "appName LIKE 'EchoSign-prod-au%-%'"
      }

    ],
    steps: [
      {
        id: 0,
        label: 'Home',
        nrqlWhere:
          "pageUrl like '%'",
        altNrql: {
          JavaScriptError: " requestUri like '%' "
        }
      },
      {
        id: 1,
        label: 'Login',
        nrqlWhere:
          "pageUrl like '%login%'",
        altNrql: {
            JavaScriptError: " requestUri like '%/login' "
        }
      },
      {
        id: 2,
        label: 'Compose',
        nrqlWhere: "pageUrl like '%compose%'",
        altNrql: {
          JavaScriptError: " requestUri like '%/compose' "
        }
      },
      {
        id: 3,
        label: 'Sign (Agreement)',
        nrqlWhere: "pageUrl like '%agreements%'",
        altNrql: {
          JavaScriptError: " requestUri like '%/agreements' "
        }
      },
      {
        id: 4,
        label: 'Send (Agreement)',
        nrqlWhere: "pageUrl like '%send%'",
        altNrql: {
          JavaScriptError: " requestUri like '%/%send' "
        }
      }
    ],
    stats: [
      {
        label: 'Page views',
        ref: 'clickCount',
        type: 'integer',
        value: {
          nrql: "SELECT count(*) FROM PageView ",
          display: 'integer'
        }
      },
      {
        label: 'Sessions',
        ref: 'sessionCount',
        type: 'integer',
        value: {
          nrql:
            "FROM PageView SELECT uniqueCount(session) ",
          display: 'integer'
        }
      },
      {
        label: 'Error count',
        ref: 'errorCount',
        type: 'integer',
        value: {
          eventName: 'JavaScriptError',
          nrql:
            "SELECT count(*) FROM JavaScriptError ",
          display: 'integer'
        }
      },
      {
        label: 'Error rate',
        ref: 'errorRate',
        type: 'decimal',
        value: {
          calculation: { rate: ['errorCount', 'clickCount'] },
          display: 'percentage'
        }
      },
      {
        label: 'Avg perf',
        ref: 'averageDuration',
        type: 'decimal',
        value: {
          nrql:
            "FROM PageView SELECT average(duration) ",
          display: 'seconds'
        }
      },
      {
        label: '99th perc',
        ref: 'nnthPercentile',
        type: 'percentile',
        value: {
          nrql:
            "FROM PageView SELECT percentile(duration, 99) ",
          display: 'seconds'
        }
      }
    ]
  },
  {
    id: 1,
    title: '[Stage] Sign - Customer Journey (Shard)',
    accountId: 476672,
    funnel: {
      event: 'PageView',
      measure: 'session'
    },
    kpis: [
      {
        label: 'Error Rate',
        ref: 'errorRate',
        value: 3.0,
        bound: 'higherViolation',
        description:
          'If the error rate is higher that 3%, mark that as a notable.'
      },
      {
        label: 'Page views',
        ref: 'clickCount',
        value: 5.0,
        bound: 'percentage',
        description: 'If the percentage change is plus or minus 10%, flag that.'
      },
      {
        label: 'Page Load Avg.',
        ref: 'averageDuration',
        value: 1,
        bound: 'lowerTarget',
        description: "We're targeting sub-second load times."
      }
    ],
    series: [
      {
        id: 0,
        label: 'All Shards',
        nrqlWhere: "appName like 'EchoSign-stage%'",
      },
      {
        id: 1,
        label: 'N. America (*-na#-dc#)',
        nrqlWhere: "appName LIKE 'EchoSign-stage-na%-%'"
      },
      {
        id: 2,
        label: 'Europe (*-eu#-dc#)',
        nrqlWhere: "appName LIKE 'EchoSign-stage-eu%-%'"
      },
      {
        id: 3,
        label: 'India (*-in#-dc#)',
        nrqlWhere: "appName LIKE 'EchoSign-stage-in%-%'"
      },
      {
        id: 4,
        label: 'Australia (*-au#-dc#)',
        nrqlWhere: "appName LIKE 'EchoSign-stage-au%-%'"
      }

    ],
    steps: [
      {
        id: 0,
        label: 'Home',
        nrqlWhere:
          "pageUrl like '%'"
      },
      {
        id: 1,
        label: 'Login',
        nrqlWhere:
          "pageUrl like '%login%'"
      },
      {
        id: 2,
        label: 'Compose',
        nrqlWhere: "pageUrl like '%compose%'"
      },
      {
        id: 3,
        label: 'Sign (Agreement)',
        nrqlWhere: "pageUrl like '%agreements%'",
      },
      {
        id: 4,
        label: 'Send (Agreement)',
        nrqlWhere: "pageUrl like '%send%'",
      }
    ],
    stats: [
      {
        label: 'Page views',
        ref: 'clickCount',
        type: 'integer',
        value: {
          nrql: "SELECT count(*) FROM PageView ",
          display: 'integer'
        }
      },
      {
        label: 'Sessions',
        ref: 'sessionCount',
        type: 'integer',
        value: {
          nrql:
            "FROM PageView SELECT uniqueCount(session) ",
          display: 'integer'
        }
      },
      {
        label: 'Error count',
        ref: 'errorCount',
        type: 'integer',
        value: {
          eventName: 'JavaScriptError',
          nrql:
            "SELECT count(*) FROM JavaScriptError ",
          display: 'integer'
        }
      },
      {
        label: 'Error rate',
        ref: 'errorRate',
        type: 'decimal',
        value: {
          calculation: { rate: ['errorCount', 'clickCount'] },
          display: 'percentage'
        }
      },
      {
        label: 'Avg perf',
        ref: 'averageDuration',
        type: 'decimal',
        value: {
          nrql:
            "FROM PageView SELECT average(duration) ",
          display: 'seconds'
        }
      },
      {
        label: '99th perc',
        ref: 'nnthPercentile',
        type: 'percentile',
        value: {
          nrql:
            "FROM PageView SELECT percentile(duration, 99) ",
          display: 'seconds'
        }
      }
    ]
  },
  {
    id: 2,
    title: '[Prod] Sign Customer Journey (Browser)',
    accountId: 476672,
    funnel: {
      event: 'PageView',
      measure: 'session'
    },
    kpis: [
      {
        label: 'Error Rate',
        ref: 'errorRate',
        value: 3.0,
        bound: 'higherViolation',
        description:
          'If the error rate is higher that 3%, mark that as a notable.'
      },
      {
        label: 'Page views',
        ref: 'clickCount',
        value: 5.0,
        bound: 'percentage',
        description: 'If the percentage change is plus or minus 10%, flag that.'
      },
      {
        label: 'Page Load Avg.',
        ref: 'averageDuration',
        value: 1,
        bound: 'lowerTarget',
        description: "We're targeting sub-second load times."
      }
    ],
    series: [
      {
        id: 0,
        label: 'Chrome',
        nrqlWhere: "appName LIKE 'EchoSign-prod%' AND userAgentName = 'Chrome' "
      },
      {
        id: 1,
        label: 'Internet Explorer',
        nrqlWhere: "appName LIKE 'EchoSign-prod%' AND userAgentName = 'IE' "
      },
      {
        id: 2,
        label: 'Microsoft Edge',
        nrqlWhere: "appName LIKE 'EchoSign-prod%' AND userAgentName = 'Microsoft Edge' "
      },
      {
        id: 3,
        label: 'Firefox',
        nrqlWhere: "appName LIKE 'EchoSign-prod%' AND userAgentName = 'Firefox' "
      },
      {
        id: 4,
        label: 'Safari',
        nrqlWhere: "appName LIKE 'EchoSign-prod%' AND userAgentName = 'Safari' "
      }

    ],
    steps: [
      {
        id: 0,
        label: 'Home',
        nrqlWhere:
          "pageUrl like '%admin%'"
      },
      {
        id: 1,
        label: 'Login',
        nrqlWhere:
          "pageUrl like '%login%'"
      },
      {
        id: 2,
        label: 'Compose',
        nrqlWhere: "pageUrl like '%compose%'"
      },
      {
        id: 3,
        label: 'Sign (Agreement)',
        nrqlWhere: "pageUrl like '%agreements%'",
      },
      {
        id: 4,
        label: 'Send (Agreement)',
        nrqlWhere: "pageUrl like '%send%'",
      }
    ],
    stats: [
      {
        label: 'Page views',
        ref: 'clickCount',
        type: 'integer',
        value: {
          nrql: "SELECT count(*) FROM PageView ",
          display: 'integer'
        }
      },
      {
        label: 'Sessions',
        ref: 'sessionCount',
        type: 'integer',
        value: {
          nrql:
            "FROM PageView SELECT uniqueCount(session) ",
          display: 'integer'
        }
      },
      {
        label: 'Error count',
        ref: 'errorCount',
        type: 'integer',
        value: {
          eventName: 'JavaScriptError',
          nrql:
            "SELECT count(*) FROM JavaScriptError ",
          display: 'integer'
        }
      },
      {
        label: 'Error rate',
        ref: 'errorRate',
        type: 'decimal',
        value: {
          calculation: { rate: ['errorCount', 'clickCount'] },
          display: 'percentage'
        }
      },
      {
        label: 'Avg perf',
        ref: 'averageDuration',
        type: 'decimal',
        value: {
          nrql:
            "FROM PageView SELECT average(duration) ",
          display: 'seconds'
        }
      },
      {
        label: '99th perc',
        ref: 'nnthPercentile',
        type: 'percentile',
        value: {
          nrql:
            "FROM PageView SELECT percentile(duration, 99) ",
          display: 'seconds'
        }
      }
    ]
  },
  {
    id: 3,
    title: '[Prod] Sign - Customer Journey (Shard) DC Only ',
    accountId: 476672,
    funnel: {
      event: 'PageView',
      measure: 'session'
    },
    kpis: [
      {
        label: 'Error Rate',
        ref: 'errorRate',
        value: 3.0,
        bound: 'higherViolation',
        description:
          'If the error rate is higher that 3%, mark that as a notable.'
      },
      {
        label: 'Page views',
        ref: 'clickCount',
        value: 5.0,
        bound: 'percentage',
        description: 'If the percentage change is plus or minus 10%, flag that.'
      },
      {
        label: 'Page Load Avg.',
        ref: 'averageDuration',
        value: 1,
        bound: 'lowerTarget',
        description: "We're targeting sub-second load times."
      }
    ],
    series: [
      {
        id: 1,
        label: 'North America',
        nrqlWhere: "appName LIKE 'EchoSign-prod-na%-%'"
      },
      {
        id: 2,
        label: 'Europe',
        nrqlWhere: "appName LIKE 'EchoSign-prod-eu%-%'"
      },
      {
        id: 3,
        label: 'India',
        nrqlWhere: "appName LIKE 'EchoSign-prod-in%-%'"
      },
      {
        id: 4,
        label: 'Australia',
        nrqlWhere: "appName LIKE 'EchoSign-prod-au%-%'"
      }

    ],
    steps: [
      {
        id: 0,
        label: 'Home',
        nrqlWhere:
          "pageUrl like '%'",
        altNrql: {
          JavaScriptError: " requestUri like '%' "
        }
      },
      {
        id: 1,
        label: 'Login',
        nrqlWhere:
          "pageUrl like '%login%'",
        altNrql: {
            JavaScriptError: " requestUri like '%/login' "
        }
      },
      {
        id: 2,
        label: 'Compose',
        nrqlWhere: "pageUrl like '%compose%'",
        altNrql: {
          JavaScriptError: " requestUri like '%/compose' "
        }
      },
      {
        id: 3,
        label: 'Sign (Agreement)',
        nrqlWhere: "pageUrl like '%agreements%'",
        altNrql: {
          JavaScriptError: " requestUri like '%/agreements' "
        }
      },
      {
        id: 4,
        label: 'Send (Agreement)',
        nrqlWhere: "pageUrl like '%send%'",
        altNrql: {
          JavaScriptError: " requestUri like '%/%send' "
        }
      }
    ],
    stats: [
      {
        label: 'Page views',
        ref: 'clickCount',
        type: 'integer',
        value: {
          nrql: "SELECT count(*) FROM PageView ",
          display: 'integer'
        }
      },
      {
        label: 'Sessions',
        ref: 'sessionCount',
        type: 'integer',
        value: {
          nrql:
            "FROM PageView SELECT uniqueCount(session) ",
          display: 'integer'
        }
      },
      {
        label: 'Error count',
        ref: 'errorCount',
        type: 'integer',
        value: {
          eventName: 'JavaScriptError',
          nrql:
            "SELECT count(*) FROM JavaScriptError ",
          display: 'integer'
        }
      },
      {
        label: 'Error rate',
        ref: 'errorRate',
        type: 'decimal',
        value: {
          calculation: { rate: ['errorCount', 'clickCount'] },
          display: 'percentage'
        }
      },
      {
        label: 'Avg perf',
        ref: 'averageDuration',
        type: 'decimal',
        value: {
          nrql:
            "FROM PageView SELECT average(duration) ",
          display: 'seconds'
        }
      },
      {
        label: '99th perc',
        ref: 'nnthPercentile',
        type: 'percentile',
        value: {
          nrql:
            "FROM PageView SELECT percentile(duration, 99) ",
          display: 'seconds'
        }
      }
    ]
  },

];
export const getJourneys = () => {
  return journeyConfig;
};
