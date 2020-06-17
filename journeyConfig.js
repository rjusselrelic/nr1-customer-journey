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
        label: 'North America 1',
        nrqlWhere: "appName LIKE 'EchoSign-prod-na1-%'"
      },
      {
        id: 2,
        label: 'North America 2',
        nrqlWhere: "appName LIKE 'EchoSign-prod-na2-%'"
      },
      {
        id: 3,
        label: 'Europe',
        nrqlWhere: "appName LIKE 'EchoSign-prod-eu%-%'"
      },
      {
        id: 4,
        label: 'India',
        nrqlWhere: "appName LIKE 'EchoSign-prod-in%-%'"
      },
      {
        id: 5,
        label: 'Australia',
        nrqlWhere: "appName LIKE 'EchoSign-prod-au%-%'"
      },
      {
        id: 6,
        label: 'Japan',
        nrqlWhere: "appName LIKE 'EchoSign-prod-jp%-%'"
      }

    ],
    steps: [
      {
        id: 0,
        label: 'Home',
        nrqlWhere: "pageUrl like '%'",
        altNrql: {
          Transaction: " name like '%'",
          JavaScriptError: " requestUri like '%' ",
          TransactionError:" transactionUiName like '%' "
        }
          
      },
      {
        id: 1,
        label: 'Login',
        nrqlWhere: "pageUrl like '%login%'",
        altNrql: {
          Transaction: "name like '%login%'",
          JavaScriptError: " requestUri like '%login%' ",
          TransactionError:" transactionUiName like '%login%' "
        }
      },
      {
        id: 2,
        label: 'Compose',
        nrqlWhere: "pageUrl like '%compose%'",
        altNrql: {
          Transaction: "name like '%compose%'",
          JavaScriptError: " requestUri like '%compose%' ",
          TransactionError:" transactionUiName like '%compose%' "
        }
      },
      {
        id: 3,
        label: 'Sign (Agreement)',
        nrqlWhere: "pageUrl like '%agreements%'",
        altNrql: {
          Transaction: "name like '%agreement%'",
          JavaScriptError: " requestUri like '%agreement%' ",
          TransactionError:" transactionUiName like '%agreement%' "
        }
      },
      {
        id: 4,
        label: 'Send (Agreement)',
        nrqlWhere: "pageUrl like '%send%'",
        altNrql: {
          Transaction: "name like '%send%'  ",
          JavaScriptError: " requestUri like '%send%' ",
          TransactionError:" transactionUiName like '%send%' "
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
          eventName: 'TransactionError',
          nrql:
            "SELECT count(*) FROM TransactionError",
          display: 'integer'
        }
      },
      {
        label: 'Transactions',
        ref: 'transactions',
        type: 'integer',
        value: {
          eventName: 'Transaction',
          nrql: "SELECT count(*) FROM Transaction where transactionType = 'Web'",
          display: 'integer'
        }
      }, 
      {
        label: 'Error rate',
        ref: 'errorRate',
        type: 'decimal',
        value: {
          eventName: 'Transaction',
          nrql: "SELECT round(filter(count(*), where error is true)/count(*)*100) as 'Error Rate' FROM Transaction Where transactionType = 'Web' ",
          calculation: { rate: ['errorCount', 'transactions'] },
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
        label: 'N. America 1 (*-na1-dc#)',
        nrqlWhere: "appName LIKE 'EchoSign-stage-na1-%'",
      },
      {
        id: 2,
        label: 'N. America 2 (*-na2-dc#)',
        nrqlWhere: "appName LIKE 'EchoSign-stage-na2-%'",
      },
      {
        id: 3,
        label: 'Europe (*-eu#-dc#)',
        nrqlWhere: "appName LIKE 'EchoSign-stage-eu%-%'",
      },
      {
        id: 4,
        label: 'India (*-in#-dc#)',
        nrqlWhere: "appName LIKE 'EchoSign-stage-in%-%'",
      },
      {
        id: 5,
        label: 'Australia (*-au#-dc#)',
        nrqlWhere: "appName LIKE 'EchoSign-stage-au%-%'",
      },
      {
        id: 6,
        label: 'Japan (*-jp#-dc#)',
        nrqlWhere: "appName LIKE 'EchoSign-stage-jp%-%'",
      }

    ],
    steps: [
      {
        id: 0,
        label: 'Home',
        nrqlWhere: "pageUrl like '%'",
        altNrql: {
          Transaction: " name like '%'",
          JavaScriptError: " requestUri like '%' ",
          TransactionError:" transactionUiName like '%' "
        }
          
      },
      {
        id: 1,
        label: 'Login',
        nrqlWhere: "pageUrl like '%login%'",
        altNrql: {
          Transaction: "name like '%login%'",
          JavaScriptError: " requestUri like '%login%' ",
          TransactionError:" transactionUiName like '%login%' "
        }
      },
      {
        id: 2,
        label: 'Compose',
        nrqlWhere: "pageUrl like '%compose%'",
        altNrql: {
          Transaction: "name like '%compose%'",
          JavaScriptError: " requestUri like '%compose%' ",
          TransactionError:" transactionUiName like '%compose%' "
        }
      },
      {
        id: 3,
        label: 'Sign (Agreement)',
        nrqlWhere: "pageUrl like '%agreements%'",
        altNrql: {
          Transaction: "name like '%agreement%'",
          JavaScriptError: " requestUri like '%agreement%' ",
          TransactionError:" transactionUiName like '%agreement%' "
        }
      },
      {
        id: 4,
        label: 'Send (Agreement)',
        nrqlWhere: "pageUrl like '%send%'",
        altNrql: {
          Transaction: "name like '%send%'  ",
          JavaScriptError: " requestUri like '%send%' ",
          TransactionError:" transactionUiName like '%send%' "
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
          eventName: 'TransactionError',
          nrql:
            "SELECT count(*) FROM TransactionError",
          display: 'integer'
        }
      },
      {
        label: 'Transactions',
        ref: 'transactions',
        type: 'integer',
        value: {
          eventName: 'Transaction',
          nrql: "SELECT count(*) FROM Transaction where transactionType = 'Web'",
          display: 'integer'
        }
      }, 
      {
        label: 'Error rate',
        ref: 'errorRate',
        type: 'decimal',
        value: {
          eventName: 'Transaction',
          nrql: "SELECT round(filter(count(*), where error is true)/count(*)*100) as 'Error Rate' FROM Transaction Where transactionType = 'Web' ",
          calculation: { rate: ['errorCount', 'transactions'] },
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
