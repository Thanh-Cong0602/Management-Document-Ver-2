/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, vi } from "vitest";
import { getDocument } from '../../../Api/Service/document.service';
import DocumentList from './DocumentList';

const mockDocuments = [
  { id: 1, name: 'Document my test', description: 'My description test 1', lastVersion: 1.1, lastModified: '2023-12-10T16:38:33.011079' },
  { id: 2, name: 'Document 2', description: 'Description 2', lastVersion: 2.1, lastModified: '10/12/2023' },
  { id: 3, name: 'Document 3', description: 'Description 3', lastVersion: 1, lastModified: new Date() },
  { id: 4, name: 'Document 4', description: 'Description 4', lastVersion: 2.1, lastModified: new Date() },
  { id: 5, name: 'Document 5', description: 'Description 5', lastVersion: 1, lastModified: new Date() },
  { id: 6, name: 'Document 6', description: 'Description 6', lastVersion: 2.1, lastModified: new Date() },
  { id: 7, name: 'Document 7', description: 'Description 7', lastVersion: 1, lastModified: new Date() },
  { id: 8, name: 'Document 8', description: 'Description 8', lastVersion: 2.1, lastModified: new Date() },
  { id: 9, name: 'Document 9', description: 'Description 9', lastVersion: 1, lastModified: new Date() },
  { id: 10, name: 'Document 10', description: 'Description 10', lastVersion: 2.1, lastModified: new Date() },
  { id: 11, name: 'Document 11', description: 'Description 11', lastVersion: 1, lastModified: new Date() },
  { id: 12, name: 'Document 12', description: 'Description 12', lastVersion: 11.1, lastModified: new Date() },
  { id: 13, name: 'Document 13', description: 'Description 13', lastVersion: 1, lastModified: new Date() },
  { id: 14, name: 'Document 14', description: 'Description 14', lastVersion: 14.1, lastModified: new Date() },

];

vi.mock("../../../Api/Service/document.service");


describe('DocumentList Component', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    getDocument.mockReset();
  });

  it('renders documents correctly', async () => {
    // Mock the getDocument function to resolve with the sample data
    getDocument.mockResolvedValue({ data: { content: mockDocuments, totalPages: 15 } });

    render(<DocumentList />);

    // Wait for the component to render and make API call
    await waitFor(() => {
      expect(getDocument).toHaveBeenCalledWith('document?pageNo=0&pageSize=10');
    });

    // Assert that the documents are rendered on the page
    expect(screen.getByText('Document my test')).toBeInTheDocument();
    expect(screen.getByText('Document 2')).toBeInTheDocument();
    expect(screen.getByText('1.1')).toBeInTheDocument();
    expect(screen.getByText('My description test 1')).toBeInTheDocument();
    expect(screen.getByText('14.1')).toBeInTheDocument();
    expect(screen.getByText('Document 2')).toBeInTheDocument();
    expect(screen.getByText('Document 4')).toBeInTheDocument();
    expect(screen.getByText('Document 5')).toBeInTheDocument();
    expect(screen.getByText('Document 6')).toBeInTheDocument();
    expect(screen.getByText('Document 7')).toBeInTheDocument();
    expect(screen.getByText('Description 14')).toBeInTheDocument();
    expect(screen.getByText('11.1')).toBeInTheDocument();
    // expect(screen.getByText('15.1')).toBeInTheDocument(); 
    // error because no vevsion 15.1 in data
    // Add more assertions as needed
  });

  it('handles pagination correctly', async () => {
    // Mock the getDocument function to resolve with the sample data
    getDocument.mockResolvedValueOnce({ data: { content: mockDocuments.slice(0, 10), totalPages: 10 } });
    getDocument.mockResolvedValueOnce({ data: { content: mockDocuments.slice(10,15), totalPages: 5 } });

    render(<DocumentList />);

    // Wait for the component to render and make the initial API call
    await waitFor(() => {
      expect(getDocument).toHaveBeenCalledWith('document?pageNo=0&pageSize=10');
    });

    // Simulate clicking the next page button
    fireEvent.click(screen.getByText('next >'));

    // Wait for the component to make the second API call for the next page
    await waitFor(() => {
      expect(getDocument).toHaveBeenCalledWith('document?pageNo=1&pageSize=10');
    });

   // Assert that the documents from the second page are rendered on the page
    expect(screen.getByText('Document 11')).toBeInTheDocument();
    expect(screen.getByText('11.1')).toBeInTheDocument();
    
  });

});