import { useState } from 'react';
import {
  Search,
  Database,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  ThumbsUp,
  MessageSquare,
  Share2,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import ForceGraph2D from 'react-force-graph-2d';
import { dataSources, mockChartData, mockTableData, knowledgeGraphData } from './mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const llmOptions = [
  { id: 'codex', name: 'Codex', icon: <Database className="w-5 h-5" /> },
  { id: 'dalle', name: 'DALL-E', icon: <PieChart className="w-5 h-5" /> },
  { id: 'gpt3', name: 'GPT-3', icon: <BarChart3 className="w-5 h-5" /> },
];

function App() {
  const [selectedLLM, setSelectedLLM] = useState(llmOptions[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDataSource, setSelectedDataSource] = useState('');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM llm_data\nWHERE model = "gpt-3"\nLIMIT 10;');

  const metrics = [
    { id: 1, name: 'Tables', value: 500, icon: <FileSpreadsheet className="w-6 h-6" /> },
    { id: 2, name: 'Bar Charts', value: 200, icon: <BarChart3 className="w-6 h-6" /> },
    { id: 3, name: 'Pie Charts', value: 300, icon: <PieChart className="w-6 h-6" /> },
  ];

  const filteredLLMs = llmOptions.filter(llm =>
    llm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDataSources = dataSources.filter(source =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">LLM Dashboard</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* LLM Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">LLMs</h3>
          <nav className="space-y-2">
            {filteredLLMs.map((llm) => (
              <button
                key={llm.id}
                onClick={() => setSelectedLLM(llm)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${selectedLLM.id === llm.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700'
                  }`}
              >
                {llm.icon}
                <span>{llm.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Data Sources */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Data Sources</h3>
          <nav className="space-y-2">
            {filteredDataSources.map((source) => (
              <button
                key={source.id}
                onClick={() => setSelectedDataSource(source.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${selectedDataSource === source.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700'
                  }`}
              >
                <span className="text-xl">{source.icon}</span>
                <div className="text-left">
                  <p className="text-sm font-medium">{source.name}</p>
                  <p className="text-xs text-gray-400">{source.provider}</p>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-gray-800 p-6 rounded-xl hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-400">{metric.name}</h3>
                {metric.icon}
              </div>
              <p className="text-3xl font-bold">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Visualizations */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Data Distribution</h3>
            <Bar data={mockChartData.barData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                  labels: { color: 'white' }
                }
              },
              scales: {
                y: { ticks: { color: 'white' } },
                x: { ticks: { color: 'white' } }
              }
            }} />
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Data Source Usage</h3>
            <Pie data={mockChartData.pieData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                  labels: { color: 'white' }
                }
              }
            }} />
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Data Source Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-3">Source</th>
                  <th className="pb-3">Records</th>
                  <th className="pb-3">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {mockTableData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-700">
                    <td className="py-3">{row.source}</td>
                    <td className="py-3">{row.records.toLocaleString()}</td>
                    <td className="py-3">{row.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Knowledge Graph */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Knowledge Graph</h3>
          <div className="h-[400px]">
            <ForceGraph2D
              graphData={knowledgeGraphData}
              nodeAutoColorBy="group"
              linkDirectionalParticles={2}
              linkDirectionalParticleSpeed={0.005}
              backgroundColor="transparent"
              nodeRelSize={6}
              linkWidth={2}
              linkColor={() => 'rgba(255, 255, 255, 0.2)'}
            />
          </div>
        </div>

        {/* SQL IDE Section */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">SQL Query Editor</h3>
          <textarea
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            className="w-full h-40 bg-gray-900 p-4 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your SQL query here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <ThumbsUp className="w-5 h-5" />
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors ml-auto">
            <Share2 className="w-5 h-5" />
            <span>Push to BI Tool</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;