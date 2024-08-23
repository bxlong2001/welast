import React from 'react';

interface Data {
    id: number;
    name: string;
    language: string;
    description: string;
    forks: number;
}

interface DataProps {
    data: Data[];
    onRowClick: (item: any) => void;
}

const Table: React.FC<DataProps> = ({ data, onRowClick }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Language</th>
                    <th>Forks count</th>
                </tr>
            </thead>
            <tbody>
                {data.map(d => (
                    <tr key={d.id} onClick={() => onRowClick(d)} style={{ cursor: 'pointer' }}>
                        <td>{d.name}</td>
                        <td>{d.description}</td>
                        <td>{d.language}</td>
                        <td>{d.forks}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
