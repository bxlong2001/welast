import React, { useEffect, useState } from 'react';
import Table from './Table';
import Modal from './Modal';
const filterData = [
  'TypeScript',
  'Python',
  'Jupyter Notebook',
  'R',
  'JavaScript',
  'CSS'
]
const App: React.FC = () => {
  const [data, setData] = useState<any>([])
  const [dataFilter, setDataFilter] = useState<any>([])
  const [filterSelect, setFilterSelect] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (filterSelect) {
      console.log({ filterSelect });
      const newData = data.filter((d: any) => d.language == filterSelect)
      setDataFilter(newData)
    } else {
      setDataFilter(data)
    }
  }, [filterSelect])

  async function getData() {
    try {
      const response = await fetch("http://localhost:3001/repos", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();

      const sortedData = result ? result.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) : [];

      setData(sortedData)
      setDataFilter(sortedData)
    } catch (error) {
      console.log(error);
    }
  }

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <h1 className="header">List</h1>
      <label htmlFor="filter">Filter by Language: </label>

      <select
        id="filter"
        value={filterSelect}
        onChange={(e) => setFilterSelect(e.target.value)}
      >
        <option value="">All</option>
        {filterData.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <Table data={dataFilter} onRowClick={handleRowClick} />

      {isModalOpen && selectedItem && (
        <Modal item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
