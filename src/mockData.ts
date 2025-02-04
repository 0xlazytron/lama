export const dataSources = [
  {
    id: 'aws',
    name: 'AWS',
    description: 'Amazon Redshift, Amazon S3, Amazon Athena, etc.',
    provider: 'AWS',
    icon: '🌩️'
  },
  {
    id: 'gcp',
    name: 'GCP',
    description: 'Google BigQuery, Google Sheets, Google Drive, Google Cloud Storage, etc.',
    provider: 'Google Cloud Platform',
    icon: '🌐'
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    description: 'Snowflake Data Warehouse, Snowflake Cloud Data Platform, etc.',
    provider: 'Snowflake',
    icon: '❄️'
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    description: 'Azure SQL Database, Azure Blob Storage, Power BI, etc.',
    provider: 'Microsoft',
    icon: '📊'
  },
  {
    id: 'databricks',
    name: 'Databricks',
    description: 'Databricks Runtime, Databricks Delta Lake, Databricks Notebooks, etc.',
    provider: 'Databricks',
    icon: '💾'
  }
];

export const mockChartData = {
  barData: {
    labels: ['Dataset 1', 'Dataset 2', 'Dataset 3'],
    datasets: [
      {
        label: 'Number of Records',
        data: [65, 45, 30],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  },
  horizontalBarData: {
    labels: ['Dataset 1', 'Dataset 2', 'Dataset 3'],
    datasets: [
      {
        label: 'Processing Time (ms)',
        data: [120, 80, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  },
  pieData: {
    labels: ['AWS', 'GCP', 'Azure', 'Snowflake', 'Databricks'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
};

export const mockTableData = [
  { id: 1, source: 'AWS', records: 1500, lastUpdated: '2024-03-10' },
  { id: 2, source: 'GCP', records: 2300, lastUpdated: '2024-03-11' },
  { id: 3, source: 'Azure', records: 1800, lastUpdated: '2024-03-09' },
  { id: 4, source: 'Snowflake', records: 900, lastUpdated: '2024-03-12' },
  { id: 5, source: 'Databricks', records: 1200, lastUpdated: '2024-03-10' },
];

export const knowledgeGraphData = {
  nodes: [
    { id: 'LLM', group: 1 },
    { id: 'AWS', group: 2 },
    { id: 'GCP', group: 2 },
    { id: 'Azure', group: 2 },
    { id: 'Data Processing', group: 3 },
    { id: 'Analytics', group: 4 },
  ],
  links: [
    { source: 'LLM', target: 'AWS', value: 1 },
    { source: 'LLM', target: 'GCP', value: 1 },
    { source: 'LLM', target: 'Azure', value: 1 },
    { source: 'AWS', target: 'Data Processing', value: 2 },
    { source: 'GCP', target: 'Data Processing', value: 2 },
    { source: 'Azure', target: 'Data Processing', value: 2 },
    { source: 'Data Processing', target: 'Analytics', value: 3 },
  ],
};