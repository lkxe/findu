// src/components/DuplicateTable.tsx
import React, { useState, useCallback, useRef } from 'react';
import { ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon, ChevronRightIcon as ChevronRightIconPagination } from 'lucide-react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface Duplicate {
    id: string;
    name: string;
    size: number;
    type: string;
    preview: string;
    occurrences: string[];
}

interface DuplicateTableProps {
    duplicates: Duplicate[];
}

const ITEMS_PER_PAGE = 10;
const ROW_HEIGHT = 50;
const EXPANDED_ROW_HEIGHT = 200; // Increased to accommodate more content

const DuplicateTable: React.FC<DuplicateTableProps> = ({ duplicates }) => {
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOccurrences, setSelectedOccurrences] = useState<Set<string>>(new Set());
    const listRef = useRef<List>(null);

    const toggleRow = useCallback((id: string) => {
        setExpandedRows(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
        if (listRef.current) {
            listRef.current.resetAfterIndex(0);
        }
    }, []);

    const toggleOccurrence = useCallback((path: string) => {
        setSelectedOccurrences(prev => {
            const newSet = new Set(prev);
            if (newSet.has(path)) {
                newSet.delete(path);
            } else {
                newSet.add(path);
            }
            return newSet;
        });
    }, []);

    const paginatedDuplicates = duplicates.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(duplicates.length / ITEMS_PER_PAGE);

    const getItemSize = (index: number) => {
        const duplicate = paginatedDuplicates[index];
        return expandedRows.has(duplicate.id) ? EXPANDED_ROW_HEIGHT : ROW_HEIGHT;
    };

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const duplicate = paginatedDuplicates[index];
        const isExpanded = expandedRows.has(duplicate.id);

        return (
            <div style={style} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div
                    className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleRow(duplicate.id)}
                >
                    <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-10 h-10 rounded-full" src={duplicate.preview} alt="" />
                    </div>
                    <div className="ml-4 flex-grow">
                        <div className="text-sm font-medium text-gray-900">{duplicate.name}</div>
                    </div>
                    <div className="w-24 text-sm text-gray-500">
                        {(duplicate.size / 1024).toFixed(2)} KB
                    </div>
                    <div className="w-24 text-sm text-gray-500">
                        {duplicate.type}
                    </div>
                    <div className="w-24 flex items-center text-sm text-gray-500">
                        {isExpanded ? (
                            <ChevronDownIcon className="h-5 w-5 mr-2" />
                        ) : (
                            <ChevronRightIcon className="h-5 w-5 mr-2" />
                        )}
                        {duplicate.occurrences.length}
                    </div>
                </div>
                {isExpanded && (
                    <div className="px-4 py-2 bg-gray-100">
                        <ul className="space-y-2">
                            {duplicate.occurrences.map((path, pathIndex) => (
                                <li key={pathIndex} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedOccurrences.has(path)}
                                        onChange={() => toggleOccurrence(path)}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-gray-600 break-all">{path}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Duplicate Files</h3>
            </div>
            <div className="h-96">
                <AutoSizer>
                    {({ height, width }: { height: number, width: number }) => (
                        <List
                            ref={listRef}
                            height={height}
                            itemCount={paginatedDuplicates.length}
                            itemSize={getItemSize}
                            width={width}
                        >
                            {Row}
                        </List>
                    )}
                </AutoSizer>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, duplicates.length)} of {duplicates.length} results
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                    >
                        <ChevronRightIconPagination className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DuplicateTable;